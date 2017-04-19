module.exports = {
  rules: {
    "array-foreach": require('./rules/array-foreach'),
    "async-preventdefault": require('./rules/async-preventdefault'),
    "authenticity-token": require('./rules/authenticity-token'),
    "js-class-name": require('./rules/js-class-name'),
    "no-dataset": require('./rules/no-dataset'),
    "no-flow-weak": require('./rules/no-flow-weak'),
    "no-flowfixme": require('./rules/no-flowfixme'),
    "no-implicit-buggy-globals": require('./rules/no-implicit-buggy-globals'),
    "no-noflow": require('./rules/no-noflow'),
    "no-sprockets-directives": require('./rules/no-sprockets-directives'),
    "no-unused-disabled-rules": require('./rules/no-unused-disabled-rules')
  },
  configs: {
    es6: require('./configs/es6'),
    recommended: require('./configs/recommended')
  }
}
