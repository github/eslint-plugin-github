module.exports = function(context) {
  const attributeCalls = /^(get|has|set|remove)Attribute$/
  const validAttributeName = /^[a-z][a-z-]*$/

  return {
    CallExpression(node) {
      if (!node.callee.property) return

      const calleeName = node.callee.property.name
      if (!attributeCalls.test(calleeName)) return

      const attributeNameNode = node.arguments[0]
      if (!attributeNameNode) return

      if (!validAttributeName.test(attributeNameNode.value)) {
        context.report({
          meta: {
            fixable: 'code'
          },
          node: attributeNameNode,
          message: 'Attributes should be lowercase and hyphen separated.',
          fix(fixer) {
            return fixer.replaceText(attributeNameNode, `'${attributeNameNode.value.toLowerCase()}'`)
          }
        })
      }
    }
  }
}
