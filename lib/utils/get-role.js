const {getProp, getPropValue} = require('jsx-ast-utils')
const {elementRoles} = require('aria-query')
const {getElementType} = require('./get-element-type')
const ObjectMap = require('./object-map')

// Clean-up `elementRoles` from `aria-query`
const elementRolesMap = new ObjectMap()
for (const [key, value] of elementRoles.entries()) {
  // - Remove unused `constraints` key
  delete key.constraints
  // - Remove empty `attributes` key
  if (!key.attributes || key.attributes?.length === 0) {
    delete key.attributes
  }
  elementRolesMap.set(key, value)
}
// - Remove insufficiently-disambiguated `menuitem` entry
elementRolesMap.delete({name: 'menuitem'})
// - Disambiguate `menuitem` and `menu` roles by `type`
elementRolesMap.set({name: 'menuitem', attributes: [{name: 'type', value: 'command'}]}, ['menuitem'])
elementRolesMap.set({name: 'menuitem', attributes: [{name: 'type', value: 'radio'}]}, ['menuitemradio'])
elementRolesMap.set({name: 'menuitem', attributes: [{name: 'type', value: 'toolbar'}]}, ['toolbar'])
elementRolesMap.set({name: 'menu', attributes: [{name: 'type', value: 'toolbar'}]}, ['toolbar'])

/*
  Determine role of an element, based on its name and attributes.
*/
function getRole(context, node) {
  // Early return if role is explicitly set
  const explicitRole = getPropValue(getProp(node.attributes, 'role'))
  if (explicitRole) {
    return explicitRole
  }

  // Assemble a key for looking-up the element’s role in the `elementRolesMap`
  // - Get the element’s name
  const key = {name: getElementType(context, node)}

  for (const prop of [
    'aria-label',
    'aria-labelledby',
    'alt',
    'type',
    'size',
    'role',
    'href',
    'multiple',
    'scope',
    'name',
  ]) {
    if ((prop === 'aria-labelledby' || prop === 'aria-label') && !['section', 'aside', 'form'].includes(key.name))
      continue
    if (prop === 'name' && key.name !== 'form') continue
    if (prop === 'href' && key.name !== 'a' && key.name !== 'area') continue
    if (prop === 'alt' && key.name !== 'img') continue

    const propOnNode = getProp(node.attributes, prop)

    if (!('attributes' in key)) {
      key.attributes = []
    }
    // Disambiguate "undefined" props
    if (propOnNode === undefined && prop === 'alt' && key.name === 'img') {
      key.attributes.push({name: prop, constraints: ['undefined']})
      continue
    }

    const value = getPropValue(propOnNode)
    if (value || (value === '' && prop === 'alt')) {
      if (
        prop === 'href' ||
        prop === 'aria-labelledby' ||
        prop === 'aria-label' ||
        prop === 'name' ||
        (prop === 'alt' && value !== '')
      ) {
        key.attributes.push({name: prop, constraints: ['set']})
      } else {
        key.attributes.push({name: prop, value})
      }
    }
  }

  // - Remove empty `attributes` key
  if (!key.attributes || key.attributes?.length === 0) {
    delete key.attributes
  }

  // Get the element’s implicit role
  return elementRolesMap.get(key)?.[0]
}

module.exports = {getRole}
