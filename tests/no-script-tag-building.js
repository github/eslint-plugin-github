const rule = require('../lib/rules/no-script-tag-building')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('no-script-tag-building', rule, {
  valid: [
    {
      code: 'document.createElement("div")'
    },
    {
      code: 'document.createElement("span")'
    },
    {
      code: 'document.createElement("span").type = "foo"'
    }
  ],
  invalid: [
    {
      code: 'document.createElement("script")',
      errors: [
        {
          message: "Don't create dynamic script tags, add them in the server template instead.",
          type: 'Literal'
        }
      ]
    },
    {
      code: 'document.createElement("span").type = "text/javascript"',
      errors: [
        {
          message: "Don't create dynamic script tags, add them in the server template instead.",
          type: 'Literal'
        }
      ]
    }
  ]
})
