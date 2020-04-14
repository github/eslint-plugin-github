#!/usr/bin/env node

// this could be improved... (ex. ignore interfaces/type aliases that describe a parameter type in the same file)
const {Project, TypeGuards} = require('ts-morph')

const paths = process.argv.slice(2)

const project = new Project({tsConfigFilePath: 'tsconfig.json'})

if (paths) {
  project.addSourceFilesAtPaths(paths)
}

for (const file of project.getSourceFiles()) {
  file.forEachChild(child => {
    if (TypeGuards.isVariableStatement(child)) {
      if (isExported(child)) {
        for (const node of child.getDeclarations()) {
          checkNode(node)
        }
      }
    } else if (isExported(child)) checkNode(child)
  })
}

function isExported(node) {
  return TypeGuards.isExportableNode(node) && node.isExported()
}

function checkNode(node) {
  if (!TypeGuards.isReferenceFindableNode(node)) return

  const file = node.getSourceFile()
  if (node.findReferencesAsNodes().filter(n => n.getSourceFile() !== file).length === 0) {
    const name = TypeGuards.hasName(node) ? node.getName() : node.getText()
    // eslint-disable-next-line no-console
    console.log(`${file.getFilePath()}:${node.getStartLineNumber()}: ${name}`)
  }
}
