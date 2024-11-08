module.exports = {
  root: true,
  env: { es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:github/recommended',
    'plugin:github/react',
    'plugin:github/typescript',
  ],
  settings: {},
  ignorePatterns: ['.eslintrc.cjs', '**/exports-unused.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['github'],
  rules: {
    'no-unused-vars': 'off',
    'github/no-blur': 'warn',
    'github/no-innerText': 'warn',
  },
};