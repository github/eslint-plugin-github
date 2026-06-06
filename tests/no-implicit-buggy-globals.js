import rule from '../lib/rules/no-implicit-buggy-globals.js'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester()

ruleTester.run('no-implicit-buggy-globals', rule, {
  valid: [
    {
      code: '(function() { var foo = 1; })();',
    },
    {
      code: '(function() { let foo = 1; })();',
      languageOptions: {ecmaVersion: 6},
    },
    {
      code: '(function() { const foo = 1; })();',
      languageOptions: {ecmaVersion: 6},
    },
    {
      code: 'var foo = 1;',
      languageOptions: {ecmaVersion: 2015, sourceType: 'module'},
    },
    {
      code: 'let foo = 1;',
      languageOptions: {ecmaVersion: 2015, sourceType: 'module'},
    },
    {
      code: 'const foo = 1;',
      languageOptions: {ecmaVersion: 2015, sourceType: 'module'},
    },
  ],
  invalid: [
    {
      code: 'const foo = 1;',
      languageOptions: {ecmaVersion: 6, sourceType: 'script'},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
        },
      ],
    },
    {
      code: 'let foo = 1;',
      languageOptions: {ecmaVersion: 6, sourceType: 'script'},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
        },
      ],
    },
    {
      code: 'let foo = function() {};',
      languageOptions: {ecmaVersion: 6, sourceType: 'script'},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
        },
      ],
    },
    {
      code: 'const foo = function() {};',
      languageOptions: {ecmaVersion: 6, sourceType: 'script'},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
        },
      ],
    },
    {
      code: 'class Foo {}',
      languageOptions: {ecmaVersion: 6, sourceType: 'script'},
      errors: [
        {
          message: 'Implicit global variable, assign as global property instead.',
        },
      ],
    },
  ],
})
