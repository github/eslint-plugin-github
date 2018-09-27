var rule = require('../lib/rules/get-attribute')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('get-attribute', rule, {
  valid: [
    {code: "el.getAttribute('src')"},
    {code: "el.hasAttribute('src')"},
    {code: "el.setAttribute('src', 'https://github.com/')"},
    {code: "el.removeAttribute('src')"},
    {code: "el.getAttribute('data-foo')"},
    {code: "el.hasAttribute('data-foo')"},
    {code: "el.setAttribute('data-foo', 'bar')"},
    {code: "el.removeAttribute('data-foo')"}
  ],
  invalid: [
    {
      code: "el.getAttribute('SRC')",
      errors: [
        {
          message: 'Attributes should be lowercase and hyphen separated.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "el.hasAttribute('SRC')",
      errors: [
        {
          message: 'Attributes should be lowercase and hyphen separated.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "el.getAttribute('onClick')",
      errors: [
        {
          message: 'Attributes should be lowercase and hyphen separated.',
          type: 'Literal'
        }
      ]
    }
  ]
})
