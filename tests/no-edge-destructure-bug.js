var rule = require('../lib/rules/no-edge-destructure-bug')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-edge-destructure-bug', rule, {
  valid: [
    {code: '({a}) => a'},
    {code: '({a}, {b}) => a + b'},
    {code: '({a = 1}, {b}) => a + b'},
    {code: '({a = 1}, {b = 1}) => a + b'},
    {code: '({a = 1}, {b = 1}, {c = 1}) => a + b'},
    {code: '({a = 1}, {b}, {c = 1}) => a + b'},
    {code: '([a], {b}) => a + b'},
    {code: '([a], {b}) => a + b'},
    {code: '([a=1], {b}) => a + b'},
    {code: '(a, {b = 1} = {b: 1}) => a + b'},
    {code: '(a, {b}) => a + b'},
    {code: 'var f = function (a, {b = 1}) { return a + b }'}
  ],
  invalid: [
    {
      code: '(a, {b = 1}) => a + b',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '([a], {b=1}) => a + b',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '([a=1], {b=1}) => a + b',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '({a}, {b=1}) => a + b',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '({a}, {b}, {c=1}) => a + b + c',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    },
    {
      code: '({a}, {b=1}, {c=1}) => a + b + c',
      errors: [
        {
          message:
            'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
        }
      ]
    }
  ]
})
