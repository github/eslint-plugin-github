var rule = require('../lib/rules/no-noflow')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run("no-noflow", rule, {
  valid: [
    { code: "/* @flow */" }
  ],
  invalid: [
    {
      code: "/* @noflow */",
      errors: [
        {
          message: "Do not disable Flow type checker, use @flow instead.",
          type: "Block"
        }
      ]
    }
  ]
})
