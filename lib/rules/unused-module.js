const {imported} = require('./dependency-graph')

module.exports = function(context) {
  return {
    Program(node) {
      const {filenames} = imported()
      if (!filenames.has(context.getFilename())) {
        context.report(node, 'Module was not imported by any files.')
      }
    }
  }
}
