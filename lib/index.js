module.exports = {
  rules: {
    'array-foreach': require('./rules/array-foreach'),
    'async-preventdefault': require('./rules/async-preventdefault'),
    'authenticity-token': require('./rules/authenticity-token'),
    'dependency-graph': require('./rules/dependency-graph'),
    'js-class-name': require('./rules/js-class-name'),
    'no-dataset': require('./rules/no-dataset'),
    'no-flow-weak': require('./rules/no-flow-weak'),
    'no-implicit-buggy-globals': require('./rules/no-implicit-buggy-globals'),
    'no-innerText': require('./rules/no-innerText'),
    'no-noflow': require('./rules/no-noflow'),
    'no-then': require('./rules/no-then'),
    'unused-export': require('./rules/unused-export'),
    'unused-module': require('./rules/unused-module')
  },
  configs: {
    app: require('./configs/app'),
    browser: require('./configs/browser'),
    es6: require('./configs/es6'),
    flow: require('./configs/flow'),
    react: require('./configs/react'),
    recommended: require('./configs/recommended'),
    relay: require('./configs/relay')
  }
}
