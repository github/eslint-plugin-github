const rule = require('../lib/rules/no-innerText')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

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
      output: 'document.createElement("js-flash-text").textContent = "foo"',
      errors: [
        {
          message: 'Prefer textContent to innerText',
          type: 'Identifier'
        }
      ]
    },
    {
      code: 'document.querySelector("js-flash-text").innerText = "bar"',
      output: 'document.querySelector("js-flash-text").textContent = "bar"',
      errors: [
        {
          message: 'Prefer textContent to innerText',
          type: 'Identifier'
        }
      ]
    }
  ]
})
