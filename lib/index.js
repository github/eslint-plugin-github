module.exports = {
  rules: {
    "no-implicit-buggy-globals": require('./rules/no-implicit-buggy-globals'),
    "no-sprockets-directives": require('./rules/no-sprockets-directives')
  },
  configs: {
    es6: require('./configs/es6'),
    recommended: require('./configs/recommended')
  }
}
