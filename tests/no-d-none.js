var rule = require('../lib/rules/no-d-none')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('no-d-none', rule, {
  valid: [
    {
      code: 'el.classList.add("dnone")'
    },
    {
      code: 'el.classList.toggle("responsive-d-none")'
    },
    {
      code: '[].pop()'
    }
  ],
  invalid: [
    {
      code: 'el.classList.add("d-none")',
      errors: [
        {
          message: 'Prefer hidden property to d-none class',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'el.classList.add("another-class", "d-none")',
      errors: [
        {
          message: 'Prefer hidden property to d-none class',
          type: 'CallExpression'
        }
      ]
    }
  ]
})
