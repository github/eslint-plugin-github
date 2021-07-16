module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    es6: true,
    node: true
  },
  extends: [require.resolve('./lib/configs/recommended'), 'plugin:eslint-plugin/all'],
  plugins: ['eslint-plugin'],
  rules: {
    'import/no-commonjs': 'off',
    'filenames/match-regex': 'off',
    'i18n-text/no-en': 'off',
    'eslint-plugin/prefer-placeholders': 'off',
    'eslint-plugin/test-case-shorthand-strings': 'off',
    'eslint-plugin/require-meta-docs-url': 'off'
  }
}
