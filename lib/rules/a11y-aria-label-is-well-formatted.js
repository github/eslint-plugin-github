const {getProp} = require('jsx-ast-utils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce [aria-label] text to be formatted as you would visual text.',
      url: require('../url')(module),
      recommended: false,
    },
    schema: [],
    messages: {
      formatting: '[aria-label] text should be formatted the same as you would visual text. Use sentence case.',
    },
  },

  create(context) {
    return {
      JSXOpeningElement: node => {
        const prop = getProp(node.attributes, 'aria-label')
        if (!prop) return

        const propValue = prop.value
        if (propValue.type !== 'Literal') return

        const ariaLabel = propValue.value
        if (ariaLabel.match(/^[a-z]+.*$/)) {
          context.report({
            node,
            messageId: 'formatting',
          })
        }
      },
    }
  },
}
