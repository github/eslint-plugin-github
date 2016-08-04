module.exports = {
  "rules": {
    "block-spacing": [2, "always"],
    "brace-style": [2, "1tbs", { "allowSingleLine": true }],
    "camelcase": [2, {"properties": "always"}],
    "eol-last": 2,
    "eqeqeq": [2, "smart"],
    "func-style": [2, "declaration"],
    "github/no-implicit-buggy-globals": 2,
    "github/no-sprockets-directives": 2,
    "github/no-unused-disabled-rules": 2,
    "indent": [2, 2, {"SwitchCase": 1}],
    "no-extra-parens": 2,
    "no-implicit-globals": 2,
    "no-multi-spaces": 2,
    "no-spaced-func": 2,
    "no-throw-literal": 2,
    "no-trailing-spaces": 2,
    "no-unexpected-multiline": 2,
    "semi": [2, "never"],
    "space-before-blocks": 2,
    "space-before-function-paren": [2, "never"],
    "space-in-parens": [2, "never"],
    "wrap-iife": [2, "inside"]
  },
  "extends": "eslint:recommended"
}
