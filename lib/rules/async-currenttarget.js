module.exports = function(context) {
  return {
    MemberExpression(node) {
      if (node.property && node.property.name === 'currentTarget') {
        const scope = context.getScope()
        if (scope.block.async) {
          context.report(node, 'event.currentTarget inside an async function is error prone')
        }
      }
    }
  }
}

module.exports.schema = []
