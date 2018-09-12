module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true
  },
  plugins: ['github'],
  rules: {
    'no-console': 'allow'
  },
  extends: [require.resolve('./recommended')]
}
