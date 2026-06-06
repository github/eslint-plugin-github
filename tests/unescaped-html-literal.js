import rule from '../lib/rules/unescaped-html-literal.js'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester()

ruleTester.run('unescaped-html-literal', rule, {
  valid: [
    {
      code: '`Hello World!`;',
      languageOptions: {ecmaVersion: 2017},
    },
    {
      code: "'Hello World!'",
      languageOptions: {ecmaVersion: 2017},
    },
    {
      code: '"Hello World!"',
      languageOptions: {ecmaVersion: 2017},
    },
    {
      code: 'const helloTemplate = () => html`<div>Hello World!</div>`;',
      languageOptions: {ecmaVersion: 2017},
    },
    {
      code: 'const helloTemplate = (name) => html`<div>Hello ${name}!</div>`;',
      languageOptions: {ecmaVersion: 2017},
    },
  ],
  invalid: [
    {
      code: "const helloHTML = '<div>Hello, World!</div>'",
      languageOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
        },
      ],
    },
    {
      code: 'const helloHTML = "<h1>Hello, World!</h1>"',
      languageOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
        },
      ],
    },
    {
      code: 'const helloHTML = `<div>Hello ${name}!</div>`',
      languageOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
        },
      ],
    },
    {
      code: 'const helloHTML = ` \n\t<div>Hello ${name}!</div>`',
      languageOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
        },
      ],
    },
    {
      code: 'const helloHTML = foo`<div>Hello ${name}!</div>`',
      languageOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
        },
      ],
    },
  ],
})
