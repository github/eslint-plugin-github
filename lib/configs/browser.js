module.exports = {
  env: {
    browser: true
  },
  plugins: ['github'],
  rules: {
    'github/async-currenttarget': 'error',
    'github/async-preventdefault': 'error',
    'github/get-attribute': 'error',
    'github/no-blur': 'error',
    'github/no-dataset': 'error',
    'github/no-innerText': 'error',
    'github/unescaped-html-literal': 'error'
  }
}
