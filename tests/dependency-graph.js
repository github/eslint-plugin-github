const dependencyGraph = require('../lib/dependency-graph')
const assert = require('assert')
const {describe, it, before, after} = require('mocha')
const rimraf = require('rimraf')
const {resolve} = require('path')
const {mkdirSync, writeFileSync, symlinkSync} = require('fs')
describe('dependency-graph', () => {
  it('has entries set', () => {
    assert(dependencyGraph.entries instanceof Set)
  })
  it('has dependencyGraph map', () => {
    assert(dependencyGraph.dependencyGraph instanceof Map)
  })
  it('has imported function', () => {
    assert.equal(typeof dependencyGraph.imported, 'function')
  })
  describe('imported', () => {
    before(() => {
      rimraf.sync('./fixtures')
      mkdirSync('./fixtures')
      writeFileSync('./fixtures/index.js', ``)
      writeFileSync('./fixtures/one.js', ``)
      symlinkSync('./fixtures/one.js', './fixtures/link.js')
      const graph = {imports: new Map(), exports: new Set()}
      graph.imports.set(resolve('./fixtures/one.js'), new Set(['a', 'b']))
      dependencyGraph.dependencyGraph.set('./fixtures/index.js', graph)
    })
    after(() => {
      rimraf.sync('./fixtures')
      dependencyGraph.dependencyGraph.clear()
    })
    it('gathers all imported files from dependencyGraph', () => {
      const {filenames} = dependencyGraph.imported()
      assert.deepEqual([...filenames], [
        resolve('./fixtures/one.js')
      ])
    })
    it('gathers all imported identifiers from dependencyGraph', () => {
      const {identifiers} = dependencyGraph.imported()
      assert.deepEqual([...identifiers], [
        resolve('./fixtures/one.js#a'),
        resolve('./fixtures/one.js#b')
      ])
    })
    it('follows symlinks', () => {
      const graph = dependencyGraph.dependencyGraph.get('./fixtures/index.js')
      graph.imports.delete('./fixtures/one.js')
      graph.imports.set('./fixtures/link.js', new Set(['a', 'b']))
      const {filenames} = dependencyGraph.imported()
      assert.deepEqual([...filenames], [
        resolve('./fixtures/one.js'),
      ])
    })
  })
})
