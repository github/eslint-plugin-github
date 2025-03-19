module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow usage the `d-none` CSS class',
      url: require('../url')(module),
      recommended: false,
    },
    schema: [],
    messages: {
      preferHidden: 'Prefer hidden property to d-none class',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.property &&
          node.callee.object.property.name === 'classList'
        ) {
          const invalidArgument = node.arguments.some(arg => {
            return arg.type === 'Literal' && arg.value === 'd-none'
          })
          if (invalidArgument) {
            context.report({
              node,
              messageId: 'preferHidden',
            })
          }
        }
      },
    }
  },
}
