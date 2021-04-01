module.exports = function (context) {
  return {
    meta: {
      type: 'problem',
      docs: {
        description: 'disallow usage of `Element.prototype.blur()`',
        url: require('../url')(module)
      },
      schema: []
    },
    CallExpression(node) {
      if (node.callee.property && node.callee.property.name === 'blur') {
        context.report(node, 'Do not use element.blur(), instead restore the focus of a previous element.')
      }
    }
  }
}
