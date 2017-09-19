var rule = require('../lib/rules/async-preventdefault')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('async-preventdefault', rule, {
  valid: [
    {
      code: 'document.addEventListener(function(event) { event.preventDefault() })',
    },
    {
      code: 'document.addEventListener(function(event) { event.target })',
    }
  ],
  invalid: [
    {
      code: 'document.addEventListener(async function(event) { event.preventDefault() })',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'event.preventDefault() inside an async function is error prone',
          type: 'CallExpression'
        }
      ]
    }
  ]
})
