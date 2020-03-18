const rule = require('../lib/rules/get-attribute')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('get-attribute', rule, {
  valid: [
    {code: "el.getAttribute('src')"},
    {code: "el.hasAttribute('src')"},
    {code: "el.setAttribute('src', 'https://github.com/')"},
    {code: "el.removeAttribute('src')"},
    {code: "el.getAttribute('data-foo')"},
    {code: "el.hasAttribute('data-foo')"},
    {code: "el.setAttribute('data-foo', 'bar')"},
    {code: "el.removeAttribute('data-foo')"},
    {code: "el.getAttribute('data-foo1')"},
    // some SVG attributes must preserve case
    {code: "el.getAttribute('preserveAspectRatio')"},
    {code: "el.getAttribute('viewBox')"}
  ],
  invalid: [
    {
      code: "el.getAttribute('SRC')",
      errors: [
        {
          message: 'Attributes should be lowercase and hyphen separated, or part of the SVG whitelist.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "el.hasAttribute('SRC')",
      errors: [
        {
          message: 'Attributes should be lowercase and hyphen separated, or part of the SVG whitelist.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "el.getAttribute('onClick')",
      errors: [
        {
          message: 'Attributes should be lowercase and hyphen separated, or part of the SVG whitelist.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "el.getAttribute('viewbox')",
      errors: [
        {
          message: 'Attributes should be lowercase and hyphen separated, or part of the SVG whitelist.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "el.getAttribute('preserveaspectratio')",
      errors: [
        {
          message: 'Attributes should be lowercase and hyphen separated, or part of the SVG whitelist.',
          type: 'Literal'
        }
      ]
    }
  ]
})
