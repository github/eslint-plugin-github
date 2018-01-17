const eslint = require('eslint')
const fs = require('fs')
const minimatch = require('minimatch')
const moduleVisitor = require('eslint-module-utils/moduleVisitor')
const parse = require('eslint-module-utils/parse').default
const resolve = require('eslint-module-utils/resolve').default

exports.detectUsedModuleExports = function(files) {
  return Promise.all(files.map(exports.load)).then(results => {
    const imported = new Map()

    for (const {path, ignore, exports} of results) {
      if (ignore) {
        continue
      }

      const usedExports = new Map()
      imported.set(path, usedExports)
      for (const identifier of exports) {
        usedExports.set(identifier, false)
      }
    }

    for (const {imports} of results) {
      for (const [importedPath, importedIdentifiers] of imports) {
        if (imported.has(importedPath)) {
          for (const importedIdentifier of importedIdentifiers) {
            if (importedIdentifier === '*') {
              imported.set(importedPath, true)
            } else {
              imported.get(importedPath).set(importedIdentifier, true)
            }
          }
        }
      }
    }

    const unusedImports = new Map()

    for (const [path, exports] of imported) {
      if (exports === true) {
        continue
      } else if (exports.size === 0) {
        unusedImports.set(path, true)
      } else {
        const unusedIdentifiers = new Set()
        for (const [identifier, used] of exports) {
          if (!used) unusedIdentifiers.add(identifier)
        }
        if (unusedIdentifiers.size !== 0) {
          unusedImports.set(path, unusedIdentifiers)
        }
      }
    }

    return unusedImports
  })
}

exports.load = function(path) {
  return readFile(path, {encoding: 'utf8'}).then(content => exports.parse(path, content))
}

exports.parse = function(path, content) {
  const result = {
    path,
    entry: false,
    imports: new Map(),
    exports: new Set()
  }

  const cli = new eslint.CLIEngine()
  const options = cli.getConfigForFile(path)

  if (!options.settings) options.settings = {}

  if (options.settings.unusedModulesEntries) {
    const patterns = options.settings.unusedModulesEntries
    result.ignore = matchPatterns(path, patterns)
  }

  options.parserPath = options.parser
  options.getFilename = () => path

  const ast = parse(path, content, options)

  let currentSource

  const visitor = source => {
    currentSource = source
  }

  const visitors = moduleVisitor.default(visitor, {
    amd: true,
    esmodule: true,
    commonjs: true
  })

  visitors['ExportDefaultDeclaration'] = visitor

  traverse(ast, node => {
    if (visitors[node.type]) {
      currentSource = null
      visitors[node.type](node)

      if (currentSource) {
        switch (node.type) {
          case 'ExportDefaultDeclaration': {
            result.exports.add('default')
            break
          }
          case 'ImportDeclaration':
          case 'CallExpression': {
            const resolvedPath = resolve(currentSource.value, options) || currentSource.value
            const specifiers = result.imports.get(resolvedPath) || new Set()
            result.imports.set(resolvedPath, specifiers)

            if (node.type === 'ImportDeclaration') {
              node.specifiers.forEach(specifier => {
                if (specifier.type === 'ImportDefaultSpecifier') {
                  specifiers.add('default')
                } else if (specifier.type === 'ImportSpecifier') {
                  specifiers.add(specifier.imported.name)
                }
              })
            } else {
              specifiers.clear()
              specifiers.add('*')
            }
            break
          }
        }
      }
    }
  })

  return result
}

function traverse(node, visitor) {
  if (node && typeof node === 'object' && 'type' in node) {
    visitor(node)
    for (const key in node) {
      traverse(node[key], visitor)
    }
  } else if (Array.isArray(node)) {
    for (const child of node) {
      traverse(child, visitor)
    }
  }
}

function matchPatterns(str, patterns) {
  for (const pattern of patterns) {
    if (minimatch(str, pattern)) {
      return true
    }
  }
  return false
}

function readFile(path, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}
