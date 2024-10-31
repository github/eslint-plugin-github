module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow `event.preventDefault` calls inside of async functions',
      url: require('../url')(module),
    },
    schema: [],
  },

  create(context) {
    const scopeDidWait = new WeakSet()

    return {
      AwaitExpression() {
        scopeDidWait.add(context.getScope())
      },
      CallExpression(node) {
        if (node.callee.property && node.callee.property.name === 'preventDefault') {
          let scope = context.getScope()
          while (scope) {
            if (scopeDidWait.has(scope)) {
              context.report({
                node,
                message: "event.preventDefault() inside an async function is error prone",
              })
              break
            }
            scope = scope.upper
          }
        }
      },
    }
  },
}
