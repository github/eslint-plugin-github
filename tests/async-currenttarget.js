var rule = require('../lib/rules/async-currenttarget')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('async-currenttarget', rule, {
  valid: [
    {
      code: 'document.addEventListener(function(event) { event.currentTarget })'
    }
  ],
  invalid: [
    {
      code: 'document.addEventListener(async function(event) { await delay(); event.currentTarget })',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'event.currentTarget inside an async function is error prone',
          type: 'MemberExpression'
        }
      ]
    }
  ]
})
