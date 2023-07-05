const {getProp, getPropValue} = require('jsx-ast-utils')
const {getElementType} = require('../utils/get-element-type')

const INTERACTIVELEMENTS = ['a', 'button', 'summary', 'select', 'input', 'option', 'textarea']

const checkIfInteractiveElement = (context, node) => {
  const elementType = getElementType(context, node.openingElement)
  const asProp = getPropValue(getProp(node.openingElement.attributes, 'as'))

  for (const interactiveElement of INTERACTIVELEMENTS) {
    if ((asProp ?? elementType) === interactiveElement) {
      return true
    }
  }
  return false
}

// if the node is VisuallyHidden or Sr-only recursively check if it has interactive children
const checkIfVisuallyHiddenAndInteractive = (context, node, isParentVisuallyHidden) => {
  if (node.type === 'JSXElement') {
    const className = getPropValue(getProp(node.openingElement.attributes, 'className'))
    const isVisuallyHiddenElement = node.openingElement.name.name === 'VisuallyHidden'
    const hasSROnlyClass = typeof className !== 'undefined' && className.includes('sr-only')
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
          checkIfVisuallyHiddenAndInteractive(context, child, !!isParentVisuallyHidden || isHidden),
        ) !== 'undefined'
      )
    }
  }
  return false
}

module.exports = {
  meta: {
    docs: {
      description: 'Ensures that interactive elements are not visually hidden',
      url: require('../url')(module),
    },
    schema: [],
  },

  create(context) {
    return {
      JSXElement: node => {
        if (checkIfVisuallyHiddenAndInteractive(context, node, false)) {
          context.report({
            node,
            message:
              'Avoid adding the "sr-only" class to interactive elements. Visually hiding interactive elements can be confusing to sighted keyboard users as it appears their focus has been lost when they navigate to an sr-only element.',
          })
          return
        }
      },
    }
  },
}
