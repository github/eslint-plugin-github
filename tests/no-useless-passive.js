const rule = require('../lib/rules/no-useless-passive')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('no-useless-passive', rule, {
  valid: [
    {
      code: 'document.addEventListener("scroll", function(event) {})',
    },
    {
      code: 'document.addEventListener("resize", function(event) {})',
    },
    {
      code: 'document.addEventListener("resize", function(event) {}, { passive: false })',
    },
  ],
  invalid: [
    {
      code: 'document.addEventListener("scroll", function(event) {}, { passive: true })',
      output: 'document.addEventListener("scroll", function(event) {} )',
      errors: [
        {
          message: '"scroll" event listener is not cancellable and so `passive: true` does nothing.',
          type: 'Property',
        },
      ],
    },
    {
      code: 'document.addEventListener("scroll", function(event) {}, { passive: true, foo: 1 })',
      output: 'document.addEventListener("scroll", function(event) {}, {  foo: 1 })',
      errors: [
        {
          message: '"scroll" event listener is not cancellable and so `passive: true` does nothing.',
          type: 'Property',
        },
      ],
    },
  ],
})
