/* globals describe, it*/
const config = require('../lib/index')
const fs = require('fs')
const assert = require('assert')
const path = require('path')

const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({env: {es2020: true}, parserOptions: {sourceType: 'module'}})

function rulesFromDir(dir) {
  try {
    return fs.readdirSync(`./${dir}`).map(f => path.basename(f, path.extname(f)))
  } catch {
    return []
  }
}

function makeTitle(name) {
  return name
    .replace(/-/g, ' ')
    .replace(/\w\S*/g, x => x.charAt(0).toUpperCase() + x.substr(1))
    .replace(/\b(The|An?|And|To|In|On|With)\b/g, x => x.toLowerCase())
    .replace(/\b(Dom|Html|Js)\b/g, x => x.toUpperCase())
}

function* extractCodeblocks(lines) {
  let inCodeBlock = false
  let codeLines = []
  let startLine = 0
  let endLine = 0
  let lang = ''
  for (const i in lines) {
    const line = lines[i]
    if (!inCodeBlock && line.startsWith('```')) {
      lang = line.slice(3)
      startLine = i
      codeLines = []
      inCodeBlock = true
      continue
    } else if (inCodeBlock && line.startsWith('```')) {
      endLine = i
      yield {code: codeLines, startLine, endLine, lang}
      inCodeBlock = false
      continue
    }
    if (inCodeBlock) {
      codeLines.push(line)
    }
  }
}

describe('smoke tests', () => {
  it('has file for each exported rule and rule for each exported file', () => {
    assert.deepStrictEqual(
      Object.keys(config.rules),
      rulesFromDir('lib/rules'),
      'Expected lib/rules/*.js to be inside lib/index.js#rules'
    )
  })

  it('has export for each config and config for each import', () => {
    assert.deepStrictEqual(
      Object.keys(config.configs),
      rulesFromDir('lib/configs'),
      'Expected lib/configs/*.js to be inside lib/index.js#configs'
    )
  })

  for (const flavour in config.configs) {
    describe(`${flavour} config`, () => {
      it('exports valid rules', () => {
        const exportedRules = new Set(Object.keys(config.rules))
        const ceRules = Object.keys(config.configs[flavour].rules).filter(rule => rule.startsWith('custom-elements/'))
        const violations = ceRules.filter(rule => !exportedRules.has(rule.replace(/^custom-elements\//, '')))
        assert.deepStrictEqual(violations, [], 'All custom-elements/ rules should exist in lib/index.js#rules')
      })
    })
  }
})

describe('test coverage', () => {
  it('has tests for each rule and rules for each test', () => {
    const tests = rulesFromDir('tests').filter(name => name !== 'check-rules')
    assert.deepStrictEqual(rulesFromDir('lib/rules'), tests, 'Expected lib/rules/*.js to have same files as tests/*.js')
  })
})

describe('documentation', () => {
  it('has rule for each doc file and doc file for each rule', () => {
    assert.deepStrictEqual(rulesFromDir('docs/rules'), rulesFromDir('lib/rules'))
  })

  it('has readme link to each doc', () => {
    const contents = fs.readFileSync(`./README.md`, 'utf-8').split('\n')
    const i = contents.indexOf('### Rules')
    let n = contents.findIndex((line, index) => index > i && line.startsWith('#'))
    if (n < i) n = contents.length
    const ruleLinks = contents
      .slice(i + 1, n)
      .filter(Boolean)
      .map(x => x.trim())
    const desiredRuleLinks = rulesFromDir('docs/rules').map(rule => `- [${makeTitle(rule)}](./docs/rules/${rule}.md)`)
    assert.deepStrictEqual(desiredRuleLinks, ruleLinks, 'Expected each rule in docs/rules/*.md to have README link')
  })

  for (const doc of rulesFromDir('docs/rules')) {
    it(`has correct headings in ${doc}.md`, () => {
      const contents = fs.readFileSync(`./docs/rules/${doc}.md`, 'utf-8').split('\n')
      let consume = true
      const headings = contents.filter(line => {
        // Discard lines that aren't headers or thumbs
        if (!(line.startsWith('#') || line.startsWith('\ud83d'))) return false
        // Ignore all sub headings/thumbs between `### Options` and `## When Not To Use It`
        if (line === '### Options') {
          consume = false
          return true
        } else if (line === '## When Not To Use It') {
          consume = true
        }
        return consume
      })
      const desiredHeadings = [
        `# ${makeTitle(doc)}`,
        '## Rule Details',
        '👎 Examples of **incorrect** code for this rule:',
        '👍 Examples of **correct** code for this rule:',
        config.rules?.[doc]?.schema?.length ? '### Options' : '',
        '## When Not To Use It',
        '## Version'
      ].filter(Boolean)
      assert.deepStrictEqual(headings, desiredHeadings, 'Expected doc to have correct headings')
    })

    it(`has working examples in ${doc}.md`, () => {
      const rules = {valid: [], invalid: []}
      const lines = fs.readFileSync(`./docs/rules/${doc}.md`, 'utf-8').split('\n')

      for (const {code, startLine} of extractCodeblocks(lines)) {
        const validIndex = lines.lastIndexOf('👍 Examples of **correct** code for this rule:', startLine)
        const invalidIndex = lines.lastIndexOf('👎 Examples of **incorrect** code for this rule:', startLine)

        if (validIndex === invalidIndex) {
          continue
        }

        let filename = ''
        if (code[0].match(/\s*\/\/ .*\.[jt]s$/)) {
          filename = code[0].replace('// ', '').trim()
        }

        if (validIndex > invalidIndex) {
          rules.valid.push({code: code.join('\n')})
        } else {
          rules.invalid.push({code: code.join('\n'), errors: 1, filename})
        }
      }

      // eslint-disable-next-line import/no-dynamic-require
      const rule = require(`../lib/rules/${doc}`)
      ruleTester.run(doc, rule, rules)
    })

    it(`has javascript examples in ${doc}.md`, () => {
      const lines = fs.readFileSync(`./docs/rules/${doc}.md`, 'utf-8').split('\n')
      assert(
        Array.from(extractCodeblocks(lines)).find(x => x.lang === 'js'),
        'Expected documentation to include a JavaScript codeblock'
      )
    })
  }
})
