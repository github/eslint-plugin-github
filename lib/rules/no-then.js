module.exports = function(context) {
  return {
    MemberExpression: function(node) {
      if (node.property && node.property.name === 'then') {
        context.report(node.property, 'Prefer async/await to Promise.then()')
      }
    }
  }
}
