module.exports = function(context) {
  return {
    "MemberExpression Identifier": function(node) {
      if (node.name === 'dataset') {
        context.report(node, "Due to camel-case transformations, using dataset is not easily greppable. Instead, use el.getAttribute('data-what-ever').")
      }
    }
  }
}

module.exports.schema = []
