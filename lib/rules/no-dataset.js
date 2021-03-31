module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce usage of `Element.prototype.getAttribute` instead of `Element.prototype.datalist`',
      url: 'https://github.com/github/eslint-plugin-github/blob/main/docs/rules/no-dataset.md'
    },
    schema: []
  },

  create(context) {
    return {
      MemberExpression(node) {
        if (node.property && node.property.name === 'dataset') {
          context.report(node, "Use getAttribute('data-your-attribute') instead of dataset.")
        }
      }
    }
  }
}
