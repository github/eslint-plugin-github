var rule = require('../lib/rules/no-dataset')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('no-dataset', rule, {
  valid: [
    {code: "el.getAttribute('data-cool-thing')"},
    {code: "var dataset = 'this is cool'"},
    {code: 'function dataset() { }'}
  ],
  invalid: [
    {
      code: 'el.dataset.coolThing',
      errors: [
        {
          message: "Use getAttribute('data-your-attribute') instead of dataset."
        }
      ]
    },
    {
      code: "el.dataset['cool-thing']",
      errors: [
        {
          message: "Use getAttribute('data-your-attribute') instead of dataset."
        }
      ]
    }
  ]
})
