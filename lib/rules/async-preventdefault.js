module.exports = function(context) {
  return {
    CallExpression(node) {
      if (node.callee.property && node.callee.property.name === 'preventDefault') {
        const scope = context.getScope()
        if (scope.block.async) {
          context.report(node, "event.preventDefault() inside an async function is error prone")
        }
      }
    }
  }
}

module.exports.schema = []
