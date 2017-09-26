var rule = require('../lib/rules/no-then')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('no-then', rule, {
  valid: [
    {
      code: '(async function() { const data = await read(); console.log(data) })()',
      parserOptions: {ecmaVersion: 2017}
    }
  ],
  invalid: [
    {
      code: '(function() { read().then(data => console.log(data)) })()',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Prefer async/await to Promise.then()',
          type: 'Identifier'
        }
      ]
    }
  ]
})