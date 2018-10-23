var rule = require('../lib/rules/no-blur')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

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
