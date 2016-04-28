module.exports = {
  "rules": {
    "github/no-implicit-buggy-globals": 0,
    "github/no-sprockets-directives": 0,
  },
  "env": {
    "node": true
  },
  "extends": [
    require.resolve('./lib/configs/recommended')
  ]
}
