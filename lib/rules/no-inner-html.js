module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow `Element.prototype.innerHTML``',
      url: require('../url')(module)
    },
    schema: []
  },

  create(context) {
    return {
      AssignmentExpression(node) {
        if (node.operator === '=') {
          const leftNode = node.left
          const rightNode = node.right

          if (leftNode.property && leftNode.property.name === 'innerHTML') {
            if (rightNode.type === 'Literal' && rightNode.value === '') {
              return
            }

            context.report({
              node,
              message:
                'Using innerHTML poses a potential security risk and should not be used other than clearing content.'
            })
          }
        }
      }
    }
  }
}
