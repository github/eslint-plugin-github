var rule = require('../lib/rules/no-innerText')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('no-innerText', rule, {
  valid: [
    {
      code: 'document.createElement("js-flash-text").textContent = "foo"'
    },
    {
      code: 'document.querySelector("js-flash-text").textContent = "bar"'
    }
  ],
  invalid: [
    {
      code: 'document.createElement("js-flash-text").innerText = "foo"',
      errors: [
        {
          message: 'Prefer textContent to innerText',
          type: 'Identifier'
        }
      ],
      output: 'document.createElement("js-flash-text").textContent = "foo"'
    },
    {
      code: 'document.querySelector("js-flash-text").innerText = "bar"',
      errors: [
        {
          message: 'Prefer textContent to innerText',
          type: 'Identifier'
        }
      ],
      output: 'document.querySelector("js-flash-text").textContent = "bar"'
    }
  ]
})
