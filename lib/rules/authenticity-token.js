module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow usage of CSRF tokens in JavaScript',
      url: 'https://github.com/github/eslint-plugin-github/blob/main/docs/rules/authenticity-token.md'
    },
    schema: []
  },

  create(context) {
    function checkAuthenticityTokenUsage(node, str) {
      if (str.includes('authenticity_token')) {
        context.report(
          node,
          'Form CSRF tokens (authenticity tokens) should not be created in JavaScript and their values should not be used directly for XHR requests.'
        )
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          checkAuthenticityTokenUsage(node, node.value)
        }
      }
    }
  }
}
