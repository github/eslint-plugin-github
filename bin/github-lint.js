#!/usr/bin/env node
// usage: github-lint
//
// Run ESLint and Flow on project.

const fs = require('fs')
const childProcess = require('child_process')

function execFile(command, args) {
  return new Promise(resolve => {
    childProcess.execFile(command, args, (error, stdout, stderr) => {
      resolve({code: error ? error.code : 0, stdout, stderr})
    })
  })
}

;(async function() {
  let runs = 0
  const codes = []
  const commands = []

  commands.push(['eslint', ['--report-unused-disable-directives', '.']])

  if (fs.existsSync('.flowconfig')) {
    commands.push(['flow', ['check']])
  }

  for (const [command, args] of commands) {
    if (runs > 0) process.stderr.write('\n')
    process.stderr.write(`> ${command} ${args.join(' ')}\n`)

    const {code, stdout, stderr} = await execFile(command, args)
    codes.push(code)
    if (stderr) process.stderr.write(stderr)
    if (stdout) process.stdout.write(stdout)

    runs++
  }

  const nonzero = codes.find(code => code !== 0)
  if (nonzero) {
    process.stderr.write(`\nCommand failed: ${nonzero}\n`)
    process.exit(nonzero)
  }
})().catch(error => {
  setTimeout(() => {
    throw error
  })
})
