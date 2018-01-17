#!/usr/bin/env node

const {detectUsedModuleExports} = require('../lib/module-utils')
const {resolve, join} = require('path')
const glob = require('glob')

function globP(pattern, options) {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (error, files) => {
      if (error) {
        reject(error)
      }
      resolve(files)
    })
  })
}

function printUsedModuleExports(unused) {
  for (const [path, identifiers] of unused) {
    if (identifiers === true) {
      process.stdout.write(`${path}\n`)
    } else {
      for (const identifier of identifiers) {
        process.stdout.write(`${path}\t${identifier}\n`)
      }
    }
  }

  if (unused.size !== 0) {
    process.exit(1)
  }
}

globP(join(resolve(process.argv[2] || '.'), '**/*.js'))
  .then(detectUsedModuleExports)
  .then(printUsedModuleExports)
