#!/usr/bin/env node
// Disables eslint rules in a JavaScript file with global comments. This is
// useful when introducing a new rule that causes many failures. The comments
// can be fixed and removed at while updating the file later.
//
// Usage:
//
//  eslint-ignore-errors app/assets/javascripts/something.js

const fs = require('fs')
const execFile = require('child_process').execFile

execFile('eslint', ['--format', 'json', process.argv[2]], (error, stdout) => {
  JSON.parse(stdout).forEach(result => {
    const filename = result.filePath

    const ruleIds = new Set()
    result.messages.forEach(message => ruleIds.add(message.ruleId))

    const js = fs.readFileSync(filename, 'utf8')
    const comments = Array.from(ruleIds).map(ruleId => `/* eslint-disable ${ruleId} */`)
    if (comments.length) {
      fs.writeFileSync(filename, `${comments.join('\n')}\n${js}`, 'utf8')
    }
  })
})
