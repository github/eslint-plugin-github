import globals from 'globals'
import eslintPlugin from 'eslint-plugin-eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import i18nTextPlugin from 'eslint-plugin-i18n-text'
import recommendedGitHub from './lib/configs/flat/recommended.js'
import {fixupPluginRules} from '@eslint/compat'

export default [
  recommendedGitHub,
  {
    files: ['lib/rules/**/*.js'],
    ...eslintPlugin.configs['flat/all'],
  },
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
      import: importPlugin,
      'i18n-text': fixupPluginRules(i18nTextPlugin),
    },
    rules: {
      'import/extensions': 'off',
      'import/no-commonjs': 'off',
      'github/filenames-match-regex': 'off',
      'i18n-text/no-en': 'off',
      'eslint-plugin/prefer-placeholders': 'off',
      'eslint-plugin/test-case-shorthand-strings': 'off',
      'eslint-plugin/require-meta-docs-url': 'off',
      'eslint-plugin/require-meta-default-options': 'off',
    },
  },
]
