const readPkgUp = require('read-pkg-up')
const path = require('path')

const dependencyGraph = new Map()
exports.dependencyGraph = dependencyGraph

exports.entries = new Set()

const entryWhitelist = [/\/tests?\//, /prettier.config.js$/]

exports.checkEntriesWhitelist = filename => {
  for (const re of entryWhitelist) {
    if (re.test(filename)) {
      exports.entries.add(filename)
    }
  }
}

const packageJSON = readPkgUp.sync()

if (packageJSON) {
  exports.entries.add(path.resolve(packageJSON.path, '..', packageJSON.pkg.main))
}

function gatherImported() {
  const filenames = new Set()
  const identifiers = new Set()

  for (const {imports} of dependencyGraph.values()) {
    for (const [importedFilename, importedIdentifiers] of imports) {
      filenames.add(importedFilename)

      for (const importedIdentifier of importedIdentifiers) {
        identifiers.add(`${importedFilename}#${importedIdentifier}`)
      }
    }
  }

  return {filenames, identifiers}
}

let importedCache = null

exports.imported = function() {
  if (!importedCache) {
    importedCache = gatherImported()
  }
  return importedCache
}
