module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce `for..of` loops over `Array.forEach`',
      url: 'https://github.com/github/eslint-plugin-github/blob/main/docs/rules/array-foreach.md'
    },
    schema: []
  },

  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.property && node.callee.property.name === 'forEach') {
          context.report(node, 'Prefer for...of instead of Array.forEach')
        }
      }
    }
  }
}
