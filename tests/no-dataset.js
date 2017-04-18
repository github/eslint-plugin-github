var rule = require('../lib/rules/no-dataset')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run("no-dataset", rule, {
  valid: [
    { code: "el.getAttribute('data-cool-thing')" },
  ],
  invalid: [
    {
      code: "el.dataset.coolThing",
      errors: [
        {
          message: "Due to camel-case transformations, using dataset is not easily greppable. Instead, use el.getAttribute('data-what-ever').",
        }
      ]
    },
    {
      code: "el.dataset['cool-thing']",
      errors: [
        {
          message: "Due to camel-case transformations, using dataset is not easily greppable. Instead, use el.getAttribute('data-what-ever').",
        }
      ]
    },
  ]
})
