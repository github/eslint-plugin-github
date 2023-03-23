const {getProp} = require('jsx-ast-utils')

module.exports = {
  meta: {
    docs: {
      description: '[aria-label] text should be formatted as you would visible text, in a human-readable format.',
      url: require('../url')(module),
    },
    schema: [],
  },

  create(context) {
    return {
      JSXOpeningElement: node => {
        const prop = getProp(node.attributes, 'aria-label')
        if (!prop) return

        const propValue = prop.value
        if (propValue.type !== 'Literal') return

        const ariaLabel = propValue.value
        if (ariaLabel.match(/^[a-z]+[a-z\-\s]*$/)) {
          context.report({
            node,
            message:
              '[aria-label] text should be formatted the same as you would visible text. Use sentence case and make sure you are not using hyphens.',
          })
        }
      },
    }
  },
}
