/* globals describe, it*/
import {configs, getFlatConfigs, rules} from '../lib/index.js'
import {ESLint} from 'eslint'
import fs from 'node:fs'
import assert from 'node:assert'
import path from 'node:path'

describe('smoke tests', () => {
  it('ensure all rules in lib/rules are included in index', () => {
    const exportedRules = new Set(Object.keys(rules))
    const files = new Set(fs.readdirSync('./lib/rules').map(f => path.basename(f, path.extname(f))))
    assert.deepEqual(files, exportedRules)
  })

  it('exports every config in lib/config as .configs', () => {
    const exportedConfigs = new Set(Object.keys(configs))
    const files = new Set(
      fs
        .readdirSync('./lib/configs', {withFileTypes: true})
        .filter(file => file.isFile() && path.extname(file.name) === '.js')
        .map(file => path.basename(file.name, path.extname(file.name))),
    )
    assert.deepEqual(files, exportedConfigs)
  })

  it('exports valid rules in each config', () => {
    const exportedRules = new Set(Object.keys(rules))
    for (const flavour in configs) {
      for (const rule in configs[flavour].rules) {
        if (rule.startsWith('github/')) {
          assert(exportedRules.has(rule.replace(/^github\//, '')), `rule ${rule} is not a valid rule`)
        }
      }
    }
  })

  it('runs the flat react config with jsx-a11y rules', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [getFlatConfigs().react, {files: ['**/*.jsx']}],
    })
    const [result] = await eslint.lintText('const link = <a href="/settings">read more</a>', {
      filePath: 'example.jsx',
    })

    assert(result.messages.some(message => message.ruleId === 'jsx-a11y/anchor-ambiguous-text'))
  })
})
