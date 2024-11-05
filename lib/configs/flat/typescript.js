const tseslint = require('typescript-eslint')
const eslintConfigPrettier = require('eslint-config-prettier')
const escompatPlugin = require('eslint-plugin-escompat')
const github = require('../../../lib')

module.exports = tseslint.config({
  extends: [eslintConfigPrettier, ...tseslint.configs.recommended, ...escompatPlugin.configs['flat/typescript-2020']],
  languageOptions: {parser: tseslint.parser},
  plugins: {'@typescript-eslint': tseslint.plugin, escompatPlugin, github},
  rules: {
    camelcase: 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': ['error'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/array-type': ['error', {default: 'array-simple'}],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
})
