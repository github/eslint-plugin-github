const {describe, beforeEach, afterEach} = require('mocha')
const depGraph = require('../lib/dependency-graph')
var rule = require('../lib/rules/unused-export')
var RuleTester = require('eslint').RuleTester
var ruleTester = new RuleTester()

describe('dependency-graph', () => {
  const originalDepGraphImport = depGraph.imported
  beforeEach(() => {
    depGraph.imported = () => ({
      identifiers: new Set(['a.js#*', 'b.js#foo', 'c.js#default'])
    })
  })

  afterEach(() => {
    depGraph.imported = originalDepGraphImport
  })

  ruleTester.run('unused-export', rule, {
    valid: [
      {
        code: 'export const foo = 1',
        parserOptions: {ecmaVersion: 2015, sourceType: 'module'},
        filename: 'a.js'
      },
      {
        code: 'export const foo = 1',
        parserOptions: {ecmaVersion: 2015, sourceType: 'module'},
        filename: 'b.js'
      },
      {
        code: 'export default 1',
        parserOptions: {ecmaVersion: 2015, sourceType: 'module'},
        filename: 'c.js'
      }
    ],
    invalid: [
      {
        code: 'export default 1',
        parserOptions: {ecmaVersion: 2015, sourceType: 'module'},
        filename: 'b.js',
        errors: [
          {
            message: 'Export was not imported by any modules.',
            type: 'ExportDefaultDeclaration'
          }
        ]
      },
      {
        code: 'export const bar = 1',
        parserOptions: {ecmaVersion: 2015, sourceType: 'module'},
        filename: 'b.js',
        errors: [
          {
            message: 'Export was not imported by any modules.',
            type: 'ExportNamedDeclaration'
          }
        ]
      },
      {
        code: 'export const foo = 1',
        parserOptions: {ecmaVersion: 2015, sourceType: 'module'},
        filename: 'c.js',
        errors: [
          {
            message: 'Export was not imported by any modules.',
            type: 'ExportNamedDeclaration'
          }
        ]
      },
      {
        code: 'export default 1',
        parserOptions: {ecmaVersion: 2015, sourceType: 'module'},
        filename: 'd.js',
        errors: [
          {
            message: 'Export was not imported by any modules.',
            type: 'ExportDefaultDeclaration'
          }
        ]
      },
      {
        code: 'export const foo = 1',
        parserOptions: {ecmaVersion: 2015, sourceType: 'module'},
        filename: 'd.js',
        errors: [
          {
            message: 'Export was not imported by any modules.',
            type: 'ExportNamedDeclaration'
          }
        ]
      }
    ]
  })
})
