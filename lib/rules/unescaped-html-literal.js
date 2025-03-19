module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow unescaped HTML literals',
      url: require('../url')(module),
      recommended: false,
    },
    schema: [],
    messages: {
      unescapedHtmlLiteral: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
    },
  },

  create(context) {
    const htmlOpenTag = /^<[a-zA-Z]/

    return {
      Literal(node) {
        if (!htmlOpenTag.test(node.value)) return

        context.report({
          node,
          messageId: 'unescapedHtmlLiteral',
        })
      },
      TemplateLiteral(node) {
        if (!htmlOpenTag.test(node.quasis[0].value.raw)) return

        if (!node.parent.tag || node.parent.tag.name !== 'html') {
          context.report({
            node,
            messageId: 'unescapedHtmlLiteral',
          })
        }
      },
    }
  },
}
