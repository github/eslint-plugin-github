var rule = require('../lib/rules/unescaped-html-literal')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('unescaped-html-literal', rule, {
  valid: [
    {
      code: '`Hello World!`;',
      parserOptions: {ecmaVersion: 2017}
    },
    {
      code: "'Hello World!'",
      parserOptions: {ecmaVersion: 2017}
    },
    {
      code: '"Hello World!"',
      parserOptions: {ecmaVersion: 2017}
    },
    {
      code: 'const helloTemplate = () => html`<div>Hello World!</div>`;',
      parserOptions: {ecmaVersion: 2017}
    },
    {
      code: 'const helloTemplate = (name) => html`<div>Hello ${name}!</div>`;',
      parserOptions: {ecmaVersion: 2017}
    }
  ],
  invalid: [
    {
      code: "const helloHTML = '<div>Hello, World!</div>'",
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'const helloHTML = "<h1>Hello, World!</h1>"',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'const helloHTML = `<div>Hello ${name}!</div>`',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
          type: 'TemplateLiteral'
        }
      ]
    },
    {
      code: 'const helloHTML = foo`<div>Hello ${name}!</div>`',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Unescaped HTML literal. Use html`` tag template literal for secure escaping.',
          type: 'TemplateLiteral'
        }
      ]
    }
  ]
})
