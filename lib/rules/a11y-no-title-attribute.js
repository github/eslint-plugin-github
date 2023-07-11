const {getProp, getPropValue} = require('jsx-ast-utils')
const {getElementType} = require('../utils/get-element-type')

module.exports = {
  meta: {
    docs: {
      description: 'Guards against developers using the title attribute',
      url: require('../url')(module),
    },
    schema: [],
  },

  create(context) {
    return {
      JSXElement: node => {
        const elementType = getElementType(context, node.openingElement)
        if (elementType !== `iframe`) {
          const titleProp = getPropValue(getProp(node.openingElement.attributes, `title`))
          if (titleProp) {
            context.report({
              node,
              message:
                "The title attribute is not accessible and should never be used unless for an `<iframe>`. If you cannot convey the information in another way, replace the title attribute with an accessible tooltip like, Primer React's Tooltip.",
            })
          }
        }
      },
    }
  },
}
