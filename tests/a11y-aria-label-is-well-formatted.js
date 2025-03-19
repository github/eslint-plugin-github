import rule from '../lib/rules/a11y-aria-label-is-well-formatted.js'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

const errorMessage = '[aria-label] text should be formatted the same as you would visual text. Use sentence case.'

ruleTester.run('a11y-aria-label-is-well-formatted', rule, {
  valid: [
    {code: "<a aria-labelledby='someId' href='#'>Read more</a>;"},
    {code: "<a aria-label={someName} href='#'>Read more</a>;"},
    {code: "<a aria-label='This is a label'></a>;"},
    {code: "<a aria-label='Valid'></a>;"},
    {code: "<a aria-label='VALID'></a>;"},
    {code: '<Link aria-label="Valid" href="#">Read more</Link>'},
  ],
  invalid: [
    {code: "<a aria-label='close modal'></a>;", errors: [{message: errorMessage}]},
    {code: "<a aria-label='submit'></a>;", errors: [{message: errorMessage}]},
    {code: "<a aria-label='submit.yml'></a>;", errors: [{message: errorMessage}]},
    {code: "<a aria-label='this-is-not-an-id'></a>;", errors: [{message: errorMessage}]},
  ],
})
