module.exports = {
  parser: 'typescript-eslint-parser',
  plugins: ['tslint', 'github'],
  rules: {
    "tslint/config": ["warn", {
      "lintFile": "./tslint.json",
      "configFile": "./tsconfig.json"
    }]
  }
}
