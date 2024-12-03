const rule = require('../lib/rules/async-preventdefault')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('async-preventdefault', rule, {
  valid: [
    {
      code: 'document.addEventListener(function(event) { event.preventDefault() })',
    },
    {
      code: 'document.addEventListener(function(event) { event.target })',
    },
    {
      code: 'document.addEventListener(async function(event) { event.preventDefault() })',
      parserOptions: {ecmaVersion: 2017},
    },
  ],
  invalid: [
    {
      code: 'document.addEventListener(async function(event) { await delay(); event.preventDefault() })',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'event.preventDefault() inside an async function is error prone',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: 'document.addEventListener(async function(event) { await delay(); foo(() => event.preventDefault()) })',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'event.preventDefault() inside an async function is error prone',
          type: 'CallExpression',
        },
      ],
    },
  ],
})
