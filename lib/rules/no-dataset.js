module.exports = function(context) {
  return {
    "MemberExpression Identifier": function(node) {
      if (node.name === 'dataset') {
        context.report(node, "Use getAttribute('data-your-attribute') instead of dataset.")
      }
    }
  }
}

module.exports.schema = []
