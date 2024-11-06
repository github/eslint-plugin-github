import {FlatCompat} from '@eslint/eslintrc'
import js from '@eslint/js'
import eslintPlugin from 'eslint-plugin-eslint-plugin'
import globals from 'globals'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends('./lib/configs/recommended.js', 'plugin:eslint-plugin/all'),
  {
    plugins: {
      'eslint-plugin': eslintPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 2022,
      sourceType: 'module',
    },

    rules: {
      'import/extensions': 'off',
      'import/no-commonjs': 'off',
      'filenames/match-regex': 'off',
      'i18n-text/no-en': 'off',
      'eslint-plugin/prefer-placeholders': 'off',
      'eslint-plugin/test-case-shorthand-strings': 'off',
      'eslint-plugin/require-meta-docs-url': 'off',
      'prettier/prettier': 'off',
      'no-unused-vars': 'off',
    },
  },
]
