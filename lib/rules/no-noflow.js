module.exports = function(context) {
  function handleComment(comment) {
    var value = comment.value.trim()
    if (value.match(/@noflow/)) {
      context.report(comment, "Do not disable Flow type checker, use @flow instead.")
    }
  }

  return {
    "LineComment": handleComment,
    "BlockComment": handleComment
  }
}

module.exports.schema = []
