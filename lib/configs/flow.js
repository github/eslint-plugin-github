module.exports = {
  parser: 'babel-eslint',
  plugins: ['flowtype', 'github'],
  rules: {
    'flowtype/define-flow-type': 'error',
    'flowtype/require-valid-file-annotation': ['error', 'always', {annotationStyle: 'block'}],
    'flowtype/use-flow-type': 'error',
    'github/no-flow-weak': 'error',
    'github/no-flowfixme': 'error',
    'github/no-noflow': 'error'
  }
}
