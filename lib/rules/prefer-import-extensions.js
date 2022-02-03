module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow file imports with out a `.js` extension',
      url: require('../url')(module)
    },
    schema: [
      {
        enum: ['always', 'never']
      },
      {
        type: 'object',
        properties: {
          extensions: {
            type: 'array'
          }
        },
        additionalProperties: false
      }
    ],
    fixable: 'code'
  },
  create(context) {
    const extensions = (context.options[1] && context.options[1].extensions) || ['js']
    return {
      ImportDeclaration(node) {
        const source = node.source

        if (!source.value.startsWith('.')) return

        const extension = source.value.split('.').pop()
        if (extensions.includes(extension)) return

        console.log(extensions)

        context.report({
          meta: {
            fixable: 'code'
          },
          node: source,
          message: `The imported file is missing a file extension. Consider adding a valid extension: "${extensions.join(
            ', '
          )}"`,
          fix(fixer) {
            const newValue = `'${source.value}.js'`
            return fixer.replaceText(source, `${newValue}`)
          }
        })
      }
    }
  }
}
