module.exports = function(context) {
  function handleComment(comment) {
    var value = comment.value.trim()
    if (value.match(/\$FlowFixMe/)) {
      context.report(comment, 'Files with $FlowFixMe comments must also include /* eslint-disable github/no-flowfixme */')
    }
  }

  return {
    'LineComment': handleComment,
    'BlockComment': handleComment,
    'Program:exit': function() {
      const comments = context.getSourceCode().getAllComments()
      comments.forEach(handleComment)
    }
  }
}

module.exports.schema = []
