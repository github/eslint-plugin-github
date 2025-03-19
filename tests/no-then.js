import rule from '../lib/rules/no-then.js'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester()

ruleTester.run('no-then', rule, {
  valid: [
    {
      code: '(async function() { const data = await read(); console.log(data) })()',
      parserOptions: {ecmaVersion: 2017},
    },
    {
      code: '(async function() { try { await read() } catch(error) { console.error(error) } })()',
      parserOptions: {ecmaVersion: 2017},
    },
  ],
  invalid: [
    {
      code: '(function() { read().then(data => console.log(data)) })()',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Prefer async/await to Promise.then()',
          type: 'Identifier',
        },
      ],
    },
    {
      code: '(function() { read().catch(error => console.error(error)) })()',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Prefer async/await to Promise.catch()',
          type: 'Identifier',
        },
      ],
    },
  ],
})
