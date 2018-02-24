const {imported} = require('./dependency-graph')

module.exports = function(context) {
  const filename = context.getFilename()
  const {identifiers} = imported()

  return {
    ExportDefaultDeclaration(node) {
      if (!identifiers.has(`${filename}#default`)) {
        context.report(node, 'Export was not imported by any modules.')
      }
    },
    ExportNamedDeclaration(node) {
      if (node.declaration == null) return

      if (node.declaration.id != null) {
        if (!identifiers.has(`${filename}#${node.declaration.id.name}`)) {
          context.report(node, 'Export was not imported by any modules.')
        }
      }

      if (node.declaration.declarations != null) {
        for (const declaration of node.declaration.declarations) {
          if (!identifiers.has(`${filename}#${declaration.id.name}`)) {
            context.report(node, 'Export was not imported by any modules.')
          }
        }
      }
    }
  }
}
