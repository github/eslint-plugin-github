const {describe, beforeEach, afterEach} = require('mocha')
const depGraph = require('../lib/dependency-graph')
var rule = require('../lib/rules/unused-module')
var RuleTester = require('eslint').RuleTester
var ruleTester = new RuleTester()

describe('dependency-graph', () => {
  const originalDepGraphImport = depGraph.imported
  beforeEach(() => {
    depGraph.entries.add('a.js')
    depGraph.imported = () => ({
      filenames: new Set(['b.js'])
    })
  })

  afterEach(() => {
    depGraph.entries.clear()
    depGraph.imported = originalDepGraphImport
  })

  ruleTester.run('unused-modules', rule, {
    valid: [
      {
        code: 'foo',
        filename: 'a.js'
      },
      {
        code: 'foo',
        filename: 'b.js'
      }
    ],
    invalid: [
      {
        code: 'foo',
        filename: 'c.js',
        errors: [
          {
            message: 'Module was not imported by any files.',
            type: 'Program'
          }
        ]
      }
    ]
  })
})
