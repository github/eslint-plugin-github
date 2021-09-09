const rule = require('../lib/rules/no-inner-html')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('no-innter-html', rule, {
  valid: [
    {
      code: 'document.createElement("js-flash-text").innerHTML = ""'
    }
  ],
  invalid: [
    {
      code: 'document.createElement("js-flash-text").innerHTML = "foo"',
      errors: [
        {
          message:
            'Using innerHTML poses a potential security risk and should not be used other than cleaning content.',
          type: 'AssignmentExpression'
        }
      ]
    },
    {
      code: 'document.querySelector("js-flash-text").innerHTML = "<div>code</div>"',
      errors: [
        {
          message:
            'Using innerHTML poses a potential security risk and should not be used other than cleaning content.',
          type: 'AssignmentExpression'
        }
      ]
    }
  ]
})
