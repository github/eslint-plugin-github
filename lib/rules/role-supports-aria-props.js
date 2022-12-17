// @ts-check
const {aria, elementRoles, roles} = require('aria-query')
const {getProp, getPropValue, propName} = require('jsx-ast-utils')
const {getElementType} = require('../utils/get-element-type')
const ObjectMap = require('../utils/object-map')

// Clean-up `elementRoles` from `aria-query`
const elementRolesMap = new ObjectMap()
for (const [key, value] of elementRoles.entries()) {
  delete key.constraints
  key.attributes = key.attributes?.filter(attribute => !('constraints' in attribute))
  if (!key.attributes || key.attributes?.length === 0) {
    delete key.attributes
  }
  elementRolesMap.set(key, value)
}
elementRolesMap.delete({name: 'menuitem'})
elementRolesMap.set({name: 'menuitem', attributes: [{name: 'type', value: 'toolbar'}]}, ['toolbar'])

module.exports = {
  meta: {
    docs: {
      description:
        'Enforce that elements with explicit or implicit roles defined contain only `aria-*` properties supported by that `role`.',
      url: require('../url')(module)
    },
    schema: []
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        // Get the element’s explicit or implicit role
        const key = {name: getElementType(context, node)}
        for (const prop of ['aria-expanded', 'type', 'size', 'role', 'href', 'multiple', 'scope']) {
          const value = getPropValue(getProp(node.attributes, prop))
          if (!('attributes' in key)) {
            key.attributes = []
          }
          if (value) {
            if (prop === 'href') {
              key.attributes.push({name: prop})
            } else {
              key.attributes.push({name: prop, value})
            }
          }
        }
        const role = getPropValue(getProp(node.attributes, 'role')) ?? elementRolesMap.get(key)?.[0]

        // Return early if role could not be determined
        if (!role) return

        // Get allowed ARIA attributes:
        // - From the role itself
        let allowedProps = Object.keys(roles.get(role)?.props || {})
        // - From parent roles
        for (const parentRole of roles.get(role)?.superClass.flat() ?? []) {
          allowedProps = allowedProps.concat(Object.keys(roles.get(parentRole)?.props || {}))
        }
        // Dedupe, for performance
        allowedProps = Array.from(new Set(allowedProps))

        // Get prohibited ARIA attributes:
        // - From the role itself
        let prohibitedProps = roles.get(role)?.prohibitedProps || []
        // - From parent roles
        for (const parentRole of roles.get(role)?.superClass.flat() ?? []) {
          prohibitedProps = prohibitedProps.concat(roles.get(parentRole)?.prohibitedProps || [])
        }
        // - From comparing allowed vs all ARIA attributes
        prohibitedProps = prohibitedProps.concat(aria.keys().filter(x => !allowedProps.includes(x)))
        // Dedupe, for performance
        prohibitedProps = Array.from(new Set(prohibitedProps))

        for (const prop of node.attributes) {
          if (getPropValue(prop) == null || prop.type === 'JSXSpreadAttribute') return

          if (prohibitedProps?.includes(propName(prop))) {
            context.report({
              node,
              message: `The attribute ${propName(prop)} is not supported by the role ${role}.`
            })
          }
        }
      }
    }
  }
}
