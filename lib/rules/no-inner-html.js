module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow `Element.prototype.innerHTML` in favor of `Element.prototype.textContent`',
      url: require('../url')(module)
    },
    fixable: 'code',
    schema: []
  },

  create(context) {
    return {
      MemberExpression(node) {
        if (node.property && node.property.name === 'innerHTML') {
          context.report({
            node: node.property,
            meta: {
              fixable: 'code'
            },
            message:
              'Using innerHTML poses a potential security risk and should not be used. Prefer using textContent.',
            fix(fixer) {
              return fixer.replaceText(node.property, 'textContent')
            }
          })
        }
      }
    }
  }
}
