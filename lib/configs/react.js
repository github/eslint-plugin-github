module.exports = {
  env: {
    browser: true
  },
  plugins: ['github', 'jsx-a11y'],
  extends: ['plugin:jsx-a11y/recommended'],
  rules: {
    'github/no-generic-link-text': 'error'
  }
}
