module.exports = {
  rules: {
    "authenticity-token": require('./rules/authenticity-token'),
    "js-class-name": require('./rules/js-class-name'),
    "no-implicit-buggy-globals": require('./rules/no-implicit-buggy-globals'),
    "no-sprockets-directives": require('./rules/no-sprockets-directives'),
    "no-unused-disabled-rules": require('./rules/no-unused-disabled-rules')
  },
  configs: {
    es6: require('./configs/es6'),
    recommended: require('./configs/recommended')
  }
}
