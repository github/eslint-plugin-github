module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce using `async/await` syntax over Promises',
      url: require('../url')(module),
      recommended: true,
    },
    schema: [],
    messages: {
      preferAsyncAwait: 'Prefer async/await to Promise.{{method}}()',
    },
  },

  create(context) {
    return {
      MemberExpression(node) {
        if (node.property && node.property.name === 'then') {
          context.report({
            node: node.property,
            messageId: 'preferAsyncAwait',
            data: {method: 'then'},
          })
        } else if (node.property && node.property.name === 'catch') {
          context.report({
            node: node.property,
            messageId: 'preferAsyncAwait',
            data: {method: 'catch'},
          })
        }
      },
    }
  },
}
