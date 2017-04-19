module.exports = {
  "parserOptions": {
    "ecmaVersion": 6
  },
  "rules": {
    "github/no-flow-weak": 0,
    "github/no-flowfixme": 0,
    "github/no-implicit-buggy-globals": 0,
    "github/no-noflow": 0,
    "github/no-sprockets-directives": 0,
    "github/no-unused-disabled-rules": 0
  },
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    require.resolve('./lib/configs/recommended')
  ]
}
