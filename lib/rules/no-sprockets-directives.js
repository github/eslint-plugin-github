module.exports = function(context) {
  function checkSprocketsDirectives(node) {
    if (node.value.match(/\s*=\s*(require|require_tree|require_directory|require_self|stub)/)) {
      context.report(node, 'Sprockets directive found, use ES import instead.')
    }
  }

  return {
    'LineComment': checkSprocketsDirectives,
    'BlockComment': checkSprocketsDirectives,
    'Program': function() {
      const comments = context.getSourceCode().getAllComments()
      comments.forEach(checkSprocketsDirectives)
    }
  }
}

module.exports.schema = []
