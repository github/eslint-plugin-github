module.exports = {
  rules: {
    "no-implicit-buggy-globals": require('./rules/no-implicit-buggy-globals')
  },
  configs: {
    es6: require('./configs/es6')
  }
}
