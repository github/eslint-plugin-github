var rule = require('../lib/rules/flow-to-typescript')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('flow-to-typescript', rule, {
  valid: [{code: '/* @flow */'}, {code: '/* @flow weak */'}, {code: '/* @flow strict */'}, {code: '// @ts-check'}],
  invalid: [
    {
      code: '/* @closure-compiler */',
      errors: [
        {
          message: 'File must be type checked by TypeScript or Flow.',
          type: 'Program'
        }
      ]
    }
  ]
})
