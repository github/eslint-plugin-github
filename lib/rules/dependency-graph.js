const resolve = require('eslint-module-utils/resolve').default

const DEFAULT = 'default'

const dependencyGraph = new Map()

module.exports = function(context) {
  const filename = context.getFilename()

  const imports = new Map()
  const exports = new Set()

  function recordImport(filename, symbol) {
    let symbols = imports.get(filename)
    if (!symbols) {
      symbols = new Set()
      imports.set(filename, symbols)
    }

    if (symbol) {
      symbols.add(symbol)
    }
  }

  function recordExport(symbol) {
    if (symbol) {
      exports.add(symbol)
    }
  }

  return {
    ImportDeclaration(node) {
      const resolvedPath = resolve(node.source.value, context)
      if (!resolvedPath) {
        return
      }

      recordImport(resolvedPath)

      node.specifiers.forEach(specifier => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          recordImport(resolvedPath, DEFAULT)
        } else if (specifier.type === 'ImportSpecifier') {
          recordImport(resolvedPath, specifier.imported.name)
        }
      })
    },
    ExportDefaultDeclaration() {
      recordExport(DEFAULT)
    },
    ExportNamedDeclaration(node) {
      if (node.declaration == null) return

      if (node.declaration.id != null) {
        recordExport(node.declaration.id.name)
      }

      if (node.declaration.declarations != null) {
        for (const declaration of node.declaration.declarations) {
          recordExport(declaration.id.name)
        }
      }
    },
    'Program:exit': function() {
      dependencyGraph.set(filename, {imports, exports})
    }
  }
}

let importedCache = null

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

module.exports.imported = function() {
  if (!importedCache) {
    importedCache = gatherImported()
  }
  return importedCache
}
