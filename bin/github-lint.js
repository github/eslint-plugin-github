#!/usr/bin/env node
// usage: github-lint
//
// Run ESLint and Flow on project.

const childProcess = require('child_process')
const fs = require('fs')
const supportsColors = require('supports-color')

const hasBasicColorSupport = supportsColors.stdout.hasBasic && supportsColors.stderr.hasBasic

function execFile(command, args) {
  return new Promise(resolve => {
    childProcess.execFile(command, args, {maxBuffer: 1024 ** 2}, (error, stdout, stderr) => {
      resolve({code: error ? error.code : 0, stdout, stderr})
    })
  })
}

try {
  ;(async function() {
    let runs = 0
    const codes = []
    const commands = []

    let eslintOptions = ['--report-unused-disable-directives', '.']

    if (hasBasicColorSupport) {
      eslintOptions = eslintOptions.concat(['--color'])
    }

    const isTypeScriptProject = fs.existsSync('tsconfig.json')

    if (isTypeScriptProject) {
      eslintOptions = eslintOptions.concat(['--ext', '.js,.ts,.tsx'])
    }

    commands.push(['eslint', eslintOptions])

    if (isTypeScriptProject) {
      commands.push(['tsc', ['--noEmit']])
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
  })
} catch (error) {
  setTimeout(() => {
    throw error
  })
}
