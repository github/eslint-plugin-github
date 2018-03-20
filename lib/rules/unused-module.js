const {entries, imported} = require('../dependency-graph')

module.exports = function(context) {
  const filename = context.getFilename()

  if (entries.has(filename)) {
    return {}
  }

  return {
    Program(node) {
      const {filenames} = imported()
      if (!filenames.has(filename)) {
        context.report(node, 'Module was not imported by any files.')
      }
    }
  }
}
