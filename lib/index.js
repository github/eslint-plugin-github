module.exports = {
  rules: {
    'array-foreach': require('./rules/array-foreach'),
    'async-currenttarget': require('./rules/async-currenttarget'),
    'async-preventdefault': require('./rules/async-preventdefault'),
    'authenticity-token': require('./rules/authenticity-token'),
    'dependency-graph': require('./rules/dependency-graph'),
    'get-attribute': require('./rules/get-attribute'),
    'js-class-name': require('./rules/js-class-name'),
    'no-blur': require('./rules/no-blur'),
    'no-d-none': require('./rules/no-d-none'),
    'no-dataset': require('./rules/no-dataset'),
    'no-implicit-buggy-globals': require('./rules/no-implicit-buggy-globals'),
    'no-innerText': require('./rules/no-innerText'),
    'no-then': require('./rules/no-then'),
    'unescaped-html-literal': require('./rules/unescaped-html-literal'),
    'unused-export': require('./rules/unused-export'),
    'unused-module': require('./rules/unused-module')
  },
  configs: {
    app: require('./configs/app'),
    browser: require('./configs/browser'),
    es6: require('./configs/es6'),
    node: require('./configs/node'),
    recommended: require('./configs/recommended'),
    typescript: require('./configs/typescript')
  }
}
