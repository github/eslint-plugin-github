module.exports = function(context) {
  return {
    CallExpression(node) {
      if (node.callee.property && node.callee.property.name === 'forEach') {
        context.report(node, 'Prefer for...of instead of Array.forEach')
      }
    }
  }
}

module.exports.schema = []
