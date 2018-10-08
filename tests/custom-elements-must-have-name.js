var rule = require('../lib/rules/custom-elements-must-have-name')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('custom-elements-must-have-name', rule, {
  valid: [
    {
      code: 'class FooElement extends HTMLElement { static get name() { return "FooElement" } }',
      parserOptions: {ecmaVersion: 2017}
    },
    {
      code: 'class FooElement { }',
      parserOptions: {ecmaVersion: 2017}
    },
    {
      code: 'class FooBar { doThing() { return "thing" } }',
      parserOptions: {ecmaVersion: 2017}
    }
  ],
  invalid: [
    {
      code: 'class FooElement extends HTMLElement {}',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Custom elements need to implement `static get name()`',
          type: 'ClassDeclaration'
        }
      ],
      output: "class FooElement extends HTMLElement { static get name() { return 'FooElement' } }"
    },
    {
      code: 'class FooElement extends HTMLElement { static get name() { return "Foo" } }',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: '`static get name()` should return the name of the class',
          type: 'ReturnStatement'
        }
      ],
      output: "class FooElement extends HTMLElement { static get name() { return 'FooElement' } }"
    },
    {
      code: 'class FooElement extends HTMLElement { static get name() { const name = "Foo"; return name; } }',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: '`static get name()` should only return string',
          type: 'VariableDeclaration'
        }
      ],
      output: "class FooElement extends HTMLElement { static get name() { return 'FooElement'  } }"
    },
    {
      code: 'class FooElement extends HTMLElement { static get thing() { return "Foo"; } }',
      parserOptions: {ecmaVersion: 2017},
      errors: [
        {
          message: 'Custom elements need to implement `static get name()`',
          type: 'ClassDeclaration'
        }
      ],
      output: `class FooElement extends HTMLElement { static get name() { return 'FooElement'} static get thing() { return "Foo"; } }`
    }
  ]
})
