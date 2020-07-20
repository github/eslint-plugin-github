/* globals describe, it*/
const config = require('../lib/index.js')
const fs = require('fs')
const assert = require('assert')
const path = require('path')

describe('smoke tests', () => {
  it('ensure all rules in lib/rules are included in index', () => {
    const exportedRules = new Set(Object.keys(config.rules))
    const files = new Set(fs.readdirSync('./lib/rules').map(f => path.basename(f, path.extname(f))))
    assert.deepEqual(files, exportedRules)
  })

  it('exports every config in lib/config as .configs', () => {
    const exportedConfigs = new Set(Object.keys(config.configs))
    const files = new Set(fs.readdirSync('./lib/configs').map(f => path.basename(f, path.extname(f))))
    assert.deepEqual(files, exportedConfigs)
  })

  it('exports valid rules in each config', () => {
    const exportedRules = new Set(Object.keys(config.rules))
    for (const flavour in config.configs) {
      for (const rule in config.configs[flavour].rules) {
        if (rule.startsWith('github/')) {
          assert(exportedRules.has(rule.replace(/^github\//, '')), `rule ${rule} is not a valid rule`)
        }
      }
    }
  })
})
