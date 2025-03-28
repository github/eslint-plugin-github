// @ts-check
import {aria, roles} from 'aria-query'
import jsxAstUtils from 'jsx-ast-utils'
import {getRole} from '../utils/get-role.js'
import url from '../url.js'

const {getPropValue, propName} = jsxAstUtils

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'enforce that elements with explicit or implicit roles defined contain only `aria-*` properties supported by that `role`.',
      url: url(import.meta.url),
      recommended: false,
    },
    schema: [],
    messages: {
      notSupported: 'The attribute {{attr}} is not supported by the role {{role}}.',
    },
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        // Get the element’s explicit or implicit role
        const role = getRole(context, node)

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
          // Return early if prohibited ARIA attribute is set to an ignorable value
          if (getPropValue(prop) == null || prop.type === 'JSXSpreadAttribute') return

          if (prohibitedProps?.includes(propName(prop))) {
            context.report({
              node,
              messageId: 'notSupported',
              data: {
                attr: propName(prop),
                role,
              },
            })
          }
        }
      },
    }
  },
}
