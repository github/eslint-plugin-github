module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    es6: true,
    node: true
  },
  extends: [require.resolve('./lib/configs/recommended')]
}
