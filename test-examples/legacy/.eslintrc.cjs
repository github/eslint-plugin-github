module.exports = {
  root: true,
  env: { es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:github/browser',
    'plugin:github/recommended',
    'plugin:github/react',
    'plugin:github/typescript',
  ],
  settings: {},
  ignorePatterns: ['.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['github'],
  rules: {
    'no-unused-vars': 'off',
    'github/no-blur': 'error',
    'github/no-innerText': 'warn',
  },
};