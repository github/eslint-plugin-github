const {elementType, getProp, getPropValue} = require('jsx-ast-utils')

const bannedLinkText = ['read more', 'here', 'click here', 'learn more', 'more', 'here']

/* Downcase and strip extra whitespaces and punctuation */
const stripAndDowncaseText = text => {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

module.exports = {
  meta: {
    docs: {
      description: 'disallow generic link text',
      url: require('../url')(module)
    },
    schema: []
  },

  create(context) {
    return {
      JSXOpeningElement: node => {
        if (elementType(node) !== 'a') return
        if (getProp(node.attributes, 'aria-labelledby')) return

        const ariaLabel = getPropValue(getProp(node.attributes, 'aria-label'))
        const cleanAriaLabelValue = ariaLabel && stripAndDowncaseText(ariaLabel)

        if (ariaLabel) {
          if (bannedLinkText.includes(cleanAriaLabelValue)) {
            context.report({
              node,
              message:
                'Avoid setting generic link text like `Here`, `Click here`, `Read more`. Make sure that your link text is both descriptive and concise.'
            })
          }
        } else {
          const parent = node.parent
          if (parent.children && parent.children.length === 1 && parent.children[0].type === 'JSXText') {
            const textContent = stripAndDowncaseText(parent.children[0].value)
            if (!bannedLinkText.includes(textContent)) return
            context.report({
              node,
              message:
                'Avoid setting generic link text like `Here`, `Click here`, `Read more`. Make sure that your link text is both descriptive and concise.'
            })
          }
        }
      }
    }
  }
}
