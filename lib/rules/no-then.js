module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce using `async/await` syntax over Promises',
      url: 'https://github.com/github/eslint-plugin-github/blob/main/docs/rules/no-then.md'
    },
    schema: []
  },

  create(context) {
    return {
      MemberExpression(node) {
        if (node.property && node.property.name === 'then') {
          context.report(node.property, 'Prefer async/await to Promise.then()')
        } else if (node.property && node.property.name === 'catch') {
          context.report(node.property, 'Prefer async/await to Promise.catch()')
        }
      }
    }
  }
}
