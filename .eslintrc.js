module.exports = {
  "parserOptions": {
    "ecmaVersion": 6
  },
  "rules": {
    "github/no-implicit-buggy-globals": 0,
    "github/no-sprockets-directives": 0,
  },
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    require.resolve('./lib/configs/recommended')
  ]
}
