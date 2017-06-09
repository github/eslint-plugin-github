'use strict'

const childProcess = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')
const SourceCodeFixer = require('eslint/lib/util/source-code-fixer')
const table = require('text-table')

module.exports = function(results) {
  let output = '\n'
  let errors = 0
  let warnings = 0
  const rootPath = process.cwd()

  for (const result of results) {
    const messages = result.messages

    if (messages.length === 0) {
      continue
    }

    errors += result.errorCount
    warnings += result.warningCount

    const relativePath = path.relative(rootPath, result.filePath)

    output += `${relativePath}\n`

    const rows = messages.map(message => {
      return [
        '',
        message.line || 0,
        message.column || 0,
        '',
        message.message.replace(/\.$/, ''),
        message.ruleId || ''
      ]
    })

    output += table(rows, {
      align: ['', 'r', 'l'],
      stringLength(str) { return str.length }
    })
    .split('\n')
    .map(el => el.replace(/(\d+)\s+(\d+)/, (m, p1, p2) => `${p1}:${p2}`))
    .join('\n')

    if (messages.some(msg => msg.fix)) {
      const fixResult = SourceCodeFixer.applyFixes({text: result.source}, messages)
      output += `\n\n$ eslint --fix ${relativePath}\n`
      output += diff(result.source, fixResult.output)
    }

    output += '\n\n'
  }

  const total = errors + warnings

  if (total > 0) {
    output += [
      '\u2716 ', total, pluralize(' problem', total),
      ' (', errors, pluralize(' error', errors), ', ',
      warnings, pluralize(' warning', warnings), ')\n'
    ].join('')
  }

  return total > 0 ? output : ''
}

function pluralize(word, count) {
  return count === 1 ? word : `${word}s`
}

function diff(a, b) {
  const aPath = path.join(os.tmpdir(), 'a.js')
  const bPath = path.join(os.tmpdir(), 'p.js')
  fs.writeFileSync(aPath, a, {encoding: 'utf8'})
  fs.writeFileSync(bPath, b, {encoding: 'utf8'})
  const result = childProcess.spawnSync('diff', ['-U5', aPath, bPath], {encoding: 'utf8'})
  return result.stdout.split("\n").slice(2).join("\n")
}
