module.exports = function(context) {
  const attributeCalls = /^(get|has|set|remove)Attribute$/
  const validAttributeName = /^[a-z][a-z0-9-]*$/
  // these are common SVG attributes that *must* have the correct case to work
  const attributeWhitelist = new Set(['clipPath', 'preserveAspectRatio', 'viewBox'])
  
  function isValidAttribute(name) {
    return attributeWhitelist.has(name) || validAttributeName.test(name)
  }

  return {
    CallExpression(node) {
      if (!node.callee.property) return

      const calleeName = node.callee.property.name
      if (!attributeCalls.test(calleeName)) return

      const attributeNameNode = node.arguments[0]
      if (!attributeNameNode) return

      if (!isValidAttribute(attributeNameNode.value)) {
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
