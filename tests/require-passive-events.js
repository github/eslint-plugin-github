const rule = require('../lib/rules/require-passive-events')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('require-passive-events', rule, {
  valid: [
    {
      code: 'document.addEventListener("load", function(event) {})'
    },
    {
      code: 'document.addEventListener("click", function(event) {})'
    },
    {
      code: 'document.addEventListener("touchstart", function(event) {}, { passive: true })'
    },
    {
      code: 'el.addEventListener("touchstart", function(event) {}, { passive: true })'
    }
  ],
  invalid: [
    {
      code: 'document.addEventListener("touchstart", function(event) {})',
      errors: [
        {
          message: 'High Frequency Events like "touchstart" should be `passive: true`',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'el.addEventListener("wheel", function(event) {})',
      errors: [
        {
          message: 'High Frequency Events like "wheel" should be `passive: true`',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'document.addEventListener("wheel", function(event) {})',
      errors: [
        {
          message: 'High Frequency Events like "wheel" should be `passive: true`',
          type: 'CallExpression'
        }
      ]
    },
    {
      // Intentionally mispelled!
      code: 'document.addEventListener("wheel", function(event) {}, { pssive: true })',
      errors: [
        {
          message: 'High Frequency Events like "wheel" should be `passive: true`',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'document.addEventListener("wheel", function(event) {}, { passive: false })',
      errors: [
        {
          message: 'High Frequency Events like "wheel" should be `passive: true`',
          type: 'CallExpression'
        }
      ]
    }
  ]
})
