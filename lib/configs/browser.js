module.exports = {
  env: {
    browser: true
  },
  plugins: ['github'],
  rules: {
    'github/async-preventdefault': 'error',
    'github/no-innerText': 'error'
  },
  extends: [require.resolve('./recommended')]
}
