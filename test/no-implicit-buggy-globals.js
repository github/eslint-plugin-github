const rule = require('../lib/rules/no-implicit-buggy-globals')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('no-implicit-buggy-globals', rule, {
  valid: [
    {
      code: '(function() { var foo = 1; })();'
    },
    {
      code: '(function() { let foo = 1; })();',
      parserOptions: {ecmaVersion: 6}
    },
    {
      code: '(function() { const foo = 1; })();',
      parserOptions: {ecmaVersion: 6}
    },
    {
      code: 'var foo = 1;',
      parserOptions: {sourceType: 'module', ecmaVersion: 2015}
    },
    {
      code: 'let foo = 1;',
      parserOptions: {sourceType: 'module', ecmaVersion: 2015}
    },
    {
      code: 'const foo = 1;',
      parserOptions: {sourceType: 'module', ecmaVersion: 2015}
    }
  ],
  invalid: [
    {
      code: 'const foo = 1;',
      parserOptions: {ecmaVersion: 6},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
          type: 'VariableDeclarator'
        }
      ]
    },
    {
      code: 'let foo = 1;',
      parserOptions: {ecmaVersion: 6},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
          type: 'VariableDeclarator'
        }
      ]
    },
    {
      code: 'let foo = function() {};',
      parserOptions: {ecmaVersion: 6},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
          type: 'VariableDeclarator'
        }
      ]
    },
    {
      code: 'const foo = function() {};',
      parserOptions: {ecmaVersion: 6},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
          type: 'VariableDeclarator'
        }
      ]
    },
    {
      code: 'class Foo {}',
      parserOptions: {ecmaVersion: 6},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
          type: 'ClassDeclaration'
        }
      ]
    }
  ]
})
