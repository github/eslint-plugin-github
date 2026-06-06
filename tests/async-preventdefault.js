import rule from '../lib/rules/async-preventdefault.js'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester()

ruleTester.run('async-preventdefault', rule, {
  valid: [
    {
      code: 'document.addEventListener(function(event) { event.preventDefault() })',
    },
    {
      code: 'document.addEventListener(function(event) { event.target })',
    },
    {
      code: 'document.addEventListener(async function(event) { event.preventDefault() })',
      languageOptions: {ecmaVersion: 2017},
    },
  ],
  invalid: [
    {
      code: 'document.addEventListener(async function(event) { await delay(); event.preventDefault() })',
      languageOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'event.preventDefault() inside an async function is error prone',
        },
      ],
    },
    {
      code: 'document.addEventListener(async function(event) { await delay(); foo(() => event.preventDefault()) })',
      languageOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'event.preventDefault() inside an async function is error prone',
        },
      ],
    },
  ],
})
