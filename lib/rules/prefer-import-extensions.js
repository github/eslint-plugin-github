module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow file imports with out a `.js` extension',
      url: require('../url')(module)
    },
    schema: [],
    fixable: 'code'
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source

        if (!source.value.startsWith('.')) return
        if (source.value.endsWith('.js')) return

        context.report({
          meta: {
            fixable: 'code'
          },
          node: source,
          message: 'The imported file is missing a file extension. Consider adding the `.js` extension.',
          fix(fixer) {
            const newValue = `'${source.value}.js'`
            return fixer.replaceText(source, `${newValue}`)
          }
        })
      }
    }
  }
}
