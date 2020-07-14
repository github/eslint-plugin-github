const rule = require('../lib/rules/prefer-observers-over-events')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('prefer-observers-over-events', rule, {
  valid: [
    {
      code: 'document.addEventListener("touchstart", function(event) {})'
    }
  ],
  invalid: [
    {
      code: 'document.addEventListener("scroll", function(event) {})',
      errors: [
        {
          message: 'Avoid using "scroll" event listener. Consider using IntersectionObserver instead',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'document.addEventListener("resize", function(event) {})',
      errors: [
        {
          message: 'Avoid using "resize" event listener. Consider using ResizeObserver instead',
          type: 'CallExpression'
        }
      ]
    }
  ]
})
