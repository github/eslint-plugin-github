const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({ resolvePluginsRelativeTo: __dirname })

const typescriptModule = {
  ...compat.config({
    extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:escompat/typescript-2020'],
    plugins: ['@typescript-eslint', 'escompat'],
    parser: '@typescript-eslint/parser',
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
}
// Need to merge to get the appropriate structure for the config
const mergedConfig = {}

Object.values(typescriptModule).forEach(obj => {
  Object.assign(mergedConfig, {
    languageOptions: { ...mergedConfig.languageOptions, ...obj.languageOptions },
    plugins: { ...mergedConfig.plugins, ...obj.plugins },
    rules: { ...mergedConfig.rules, ...obj.rules },
    files: [...(mergedConfig.files || []), ...(obj.files || [])]
  })
})

module.exports = mergedConfig
