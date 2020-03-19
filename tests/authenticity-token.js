const rule = require('../lib/rules/authenticity-token')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('authenticity-token', rule, {
  valid: [],
  invalid: [
    {
      code: "document.querySelector('form').elements['authenticity_token'].value",
      errors: [
        {
          message:
            'Form CSRF tokens (authenticity tokens) should not be created in JavaScript and their values should not be used directly for XHR requests.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "document.querySelector('input[name=authenticity_token]').value",
      errors: [
        {
          message:
            'Form CSRF tokens (authenticity tokens) should not be created in JavaScript and their values should not be used directly for XHR requests.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "(new FormData()).append('authenticity_token', 'asdf')",
      errors: [
        {
          message:
            'Form CSRF tokens (authenticity tokens) should not be created in JavaScript and their values should not be used directly for XHR requests.',
          type: 'Literal'
        }
      ]
    }
  ]
})
