const globals = require('globals')
const eslintPlugin = require('eslint-plugin-eslint-plugin')
const importPlugin = require('eslint-plugin-import')
const i18nTextPlugin = require('eslint-plugin-i18n-text')
const recommendedGitHub = require('./lib/configs/flat/recommended')
const {fixupPluginRules} = require('@eslint/compat')

module.exports = [
  recommendedGitHub,
  eslintPlugin.configs['flat/all'],
  {
    ignores: ['test-examples/**'],
  },
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
      'i18n-text': fixupPluginRules(i18nTextPlugin),
    },
    rules: {
      'importPlugin/extensions': 'off',
      'importPlugin/no-commonjs': 'off',
      'github/filenames-match-regex': 'off',
      'i18n-text/no-en': 'off',
      'eslint-plugin/prefer-placeholders': 'off',
      'eslint-plugin/test-case-shorthand-strings': 'off',
      'eslint-plugin/require-meta-docs-url': 'off',
    },
  },
]
