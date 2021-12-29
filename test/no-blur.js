const rule = require('../lib/rules/no-blur')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('no-blur', rule, {
  valid: [{code: 'target.focus()'}],
  invalid: [
    {
      code: 'el.blur()',
      errors: [
        {
          message: 'Do not use element.blur(), instead restore the focus of a previous element.'
        }
      ]
    }
  ]
})
