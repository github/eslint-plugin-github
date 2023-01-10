const rule = require('../lib/rules/async-currenttarget')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('async-currenttarget', rule, {
  valid: [
    {
      code: 'document.addEventListener(function(event) { event.currentTarget })',
    },
    {
      code: 'document.addEventListener(async function(event) { event.currentTarget; await delay() })',
      parserOptions: {ecmaVersion: 2017},
    },
  ],
  invalid: [
    {
      code: 'document.addEventListener(async function(event) { await delay(); event.currentTarget })',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'event.currentTarget inside an async function is error prone',
          type: 'MemberExpression',
        },
      ],
    },
  ],
})
