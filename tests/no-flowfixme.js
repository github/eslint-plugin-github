var rule = require('../lib/rules/no-flowfixme')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('no-flowfixme', rule, {
  valid: [{code: '// OK\nvar x = 123;'}],
  invalid: [
    {
      code: '// $FlowFixMe: suppressing this error until we can refactor\nvar x = 123;',
      errors: [
        {
          message: 'Files with $FlowFixMe comments must also include /* eslint-disable github/no-flowfixme */',
          type: 'Line'
        }
      ]
    }
  ]
})
