module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'prettier/@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'github']
}
