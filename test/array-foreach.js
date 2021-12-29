const rule = require('../lib/rules/array-foreach')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('array-foreach', rule, {
  valid: [
    {
      code: 'for (const el of els) { el }',
      parserOptions: {ecmaVersion: 6}
    },
    {
      code: 'els.map(el => el)',
      parserOptions: {ecmaVersion: 6}
    },
    {code: 'forEach()'}
  ],
  invalid: [
    {
      code: 'els.forEach(el => el)',
      parserOptions: {ecmaVersion: 6},
      errors: [
        {
          message: 'Prefer for...of instead of Array.forEach',
          type: 'CallExpression'
        }
      ]
    }
  ]
})
