module.exports = {
  env: {
    browser: true
  },
  plugins: ['github'],
  rules: {
    'github/async-currenttarget': 'error',
    'github/async-preventdefault': 'error',
    'github/no-innerText': 'error'
  },
  extends: [require.resolve('./recommended')]
}
