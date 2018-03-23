module.exports = {
  plugins: ['github'],
  rules: {
    'require-await': 'error'
  },
  extends: [require.resolve('./recommended')]
}
