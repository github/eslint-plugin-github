module.exports = function(context) {
  function checkSprocketsDirectives(node) {
    if (node.value.match(/\s*=\s*(require|require_tree|require_directory|require_self|stub)/)) {
      context.report(node, "Sprockets directive found, use ES import instead.");
    }
  }

  return {
    "LineComment": checkSprocketsDirectives,
    "BlockComment": checkSprocketsDirectives
  };
};

module.exports.schema = [];
