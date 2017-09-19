var rule = require('../lib/rules/no-flow-weak')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('no-flow-weak', rule, {
  valid: [
    {code: '/* @flow */'}
  ],
  invalid: [
    {
      code: '/* @flow weak */',
      errors: [
        {
          message: 'Do not use Flow \'weak\' mode checking, use @flow instead.',
          type: 'Block'
        }
      ]
    }
  ]
})
