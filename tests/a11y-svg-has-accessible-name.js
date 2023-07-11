const rule = require('../lib/rules/a11y-svg-has-accessible-name')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

const errorMessage =
  'SVG elements should have an accessible name. Add a `<title>` element as the first descendant of the `<svg>` or add an `aria-label` or `aria-labelledby` to the `<svg>` element.'

ruleTester.run('a11y-aria-label-is-well-formatted', rule, {
  valid: [
    {code: "<svg height='100' width='100'><title>Circle with a black outline and red fill</title><circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/></svg>"},
    {code: "<svg aria-label='Circle with a black outline and red fill' height='100' width='100'><circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/></svg>"},
    {code: "<svg aria-labelledby='circle_text' height='100' width='100'><circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/></svg>"},
  ],
  invalid: [
    {code: "<svg height='100' width='100'><circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='red'/></svg>;", errors: [{message: errorMessage}]},
  ],
})
