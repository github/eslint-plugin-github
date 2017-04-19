module.exports = function(context) {
  return {
    "MemberExpression": function(node) {
      if (node.property.name === 'dataset') {
        context.report(node, "Use getAttribute('data-your-attribute') instead of dataset.")
      }
    }
  }
}

module.exports.schema = []
