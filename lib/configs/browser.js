module.exports = {
  env: {
    browser: true
  },
  plugins: ['github'],
  rules: {
    'github/async-preventdefault': 'error',
    'github/authenticity-token': 'error',
    'github/js-class-name': 'error',
    'github/no-dataset': 'error'
  },
  extends: [require.resolve('./recommended')]
}
