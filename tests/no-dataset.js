import rule from '../lib/rules/no-dataset.js'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester()

ruleTester.run('no-dataset', rule, {
  valid: [
    {code: "el.getAttribute('data-cool-thing')"},
    {code: "var dataset = 'this is cool'"},
    {code: 'function dataset() { }'},
  ],
  invalid: [
    {
      code: 'el.dataset.coolThing',
      errors: [
        {
          message: "Use getAttribute('data-your-attribute') instead of dataset.",
        },
      ],
    },
    {
      code: "el.dataset['cool-thing']",
      errors: [
        {
          message: "Use getAttribute('data-your-attribute') instead of dataset.",
        },
      ],
    },
  ],
})
