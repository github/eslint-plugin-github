import jsxAstUtils from 'jsx-ast-utils'
import {getElementType} from '../utils/get-element-type.js'
import {generateObjSchema} from 'eslint-plugin-jsx-a11y/lib/util/schemas.js'
import url from '../url.js'

const {getProp, getLiteralPropValue} = jsxAstUtils
const defaultClassName = 'sr-only'
const defaultcomponentName = 'VisuallyHidden'

const schema = generateObjSchema({
  className: {type: 'string'},
  componentName: {type: 'string'},
})

/** Note: we are not including input elements at this time
 * because a visually hidden input field might cause a false positive.
 * (e.g. fileUpload https://github.com/primer/react/pull/3492)
 */
const INTERACTIVE_ELEMENTS = ['a', 'button', 'summary', 'select', 'option', 'textarea']

const checkIfInteractiveElement = (context, node) => {
  const elementType = getElementType(context, node.openingElement)

  for (const interactiveElement of INTERACTIVE_ELEMENTS) {
    if (elementType === interactiveElement) {
      return true
    }
  }
  return false
}

// if the node is visually hidden recursively check if it has interactive children
const checkIfVisuallyHiddenAndInteractive = (context, options, node, isParentVisuallyHidden) => {
  const {className, componentName} = options
  if (node.type === 'JSXElement') {
    const classes = getLiteralPropValue(getProp(node.openingElement.attributes, 'className'))
    const isVisuallyHiddenElement = node.openingElement.name.name === componentName
    let hasSROnlyClass = false
    if (classes != null) {
      hasSROnlyClass = classes.includes(className)
    }
    let isHidden = false
    if (hasSROnlyClass || isVisuallyHiddenElement || !!isParentVisuallyHidden) {
      if (checkIfInteractiveElement(context, node)) {
        return true
      }
      isHidden = true
    }
    if (node.children && node.children.length > 0) {
      return (
        typeof node.children?.find(child =>
          checkIfVisuallyHiddenAndInteractive(context, options, child, !!isParentVisuallyHidden || isHidden),
        ) !== 'undefined'
      )
    }
  }
  return false
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce that interactive elements are not visually hidden',
      url: url(import.meta.url),
      recommended: false,
    },
    schema: [schema],
    messages: {
      avoid:
        'Avoid visually hidding interactive elements. Visually hiding interactive elements can be confusing to sighted keyboard users as it appears their focus has been lost when they navigate to the hidden element.',
    },
  },

  create(context) {
    const {options} = context
    const config = options[0] || {}
    const className = config.className || defaultClassName
    const componentName = config.componentName || defaultcomponentName

    return {
      JSXElement: node => {
        if (checkIfVisuallyHiddenAndInteractive(context, {className, componentName}, node, false)) {
          context.report({
            node,
            messageId: 'avoid',
          })
        }
      },
    }
  },
}
