const globals = require('globals')
const eslintPlugin = require('eslint-plugin-eslint-plugin')
const importPlugin = require('eslint-plugin-import')
const filenamesPlugin = require('eslint-plugin-filenames')
const i18nTextPlugin = require('eslint-plugin-i18n-text')
const recommendedGitHub = require('./lib/configs/recommended')

module.exports = [
  ...recommendedGitHub,
  eslintPlugin.configs['flat/all'],
  {
    languageOptions: {
      ecmaVersion: 13,
      globals: {
        ...globals.es6,
        ...globals.node,
      },
    },
    plugins: {
      eslintPlugin,
      importPlugin,
      filenamesPlugin,
      i18nTextPlugin,
    },
    rules: {
      'importPlugin/extensions': 'off',
      'importPlugin/no-commonjs': 'off',
      'filenamesPlugin/match-regex': 'off',
      'i18nTextPlugin/no-en': 'off',
      'eslint-plugin/prefer-placeholders': 'off',
      'eslint-plugin/test-case-shorthand-strings': 'off',
      'eslint-plugin/require-meta-docs-url': 'off',
    },
  },
]
