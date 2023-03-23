const rule = require('../lib/rules/a11y-aria-label-is-well-formatted')
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
'[aria-label] text should be formatted the same as you would visual text. Use sentence case and make sure you are not using hyphens.'

ruleTester.run('a11y-aria-label-is-well-formatted', rule, {
  valid: [
    {code: "<a aria-labelledby='someId' href='#'>Read more</a>;"},
    {code: "<a aria-label={someName} href='#'>Read more</a>;"},
    {code: "<a aria-label='This is a label'></a>;"},
    {code: '<Link aria-label="Valid" href="#">Read more</Link>'},
  ],
  invalid: [
    {code: "<a aria-label='close modal'></a>;", errors: [{message: errorMessage}]},
    {code: "<a aria-label='submit'></a>;", errors: [{message: errorMessage}]},
    {code: "<a aria-label='this-is-not-an-id'></a>;", errors: [{message: errorMessage}]},
  ],
})
