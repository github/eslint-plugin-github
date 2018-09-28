module.exports = {
  env: {
    browser: true
  },
  plugins: ['github'],
  rules: {
    'github/async-currenttarget': 'error',
    'github/async-preventdefault': 'error',
    'github/get-attribute': 'error',
    'github/no-innerText': 'error'
  },
  extends: [require.resolve('./recommended')]
}
