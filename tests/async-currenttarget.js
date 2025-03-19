import rule from '../lib/rules/async-currenttarget.js'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester()

ruleTester.run('async-currenttarget', rule, {
  valid: [
    {
      code: 'document.addEventListener(function(event) { event.currentTarget })',
    },
    {
      code: 'document.addEventListener(async function(event) { event.currentTarget; await delay() })',
      parserOptions: {ecmaVersion: 2017},
    },
    {
      code: 'document.addEventListener(async function(event) { const currentTarget = event.currentTarget; await delay(); foo(() => currentTarget) })',
      parserOptions: {ecmaVersion: 2017},
    },
  ],
  invalid: [
    {
      code: 'document.addEventListener(async function(event) { await delay(); event.currentTarget })',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'event.currentTarget inside an async function is error prone',
          type: 'MemberExpression',
        },
      ],
    },
    {
      code: 'document.addEventListener(async function(event) { await delay(); foo(() => e.currentTarget) })',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'event.currentTarget inside an async function is error prone',
          type: 'MemberExpression',
        },
      ],
    },
  ],
})
