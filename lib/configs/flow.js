module.exports = {
  'plugins': [
    'flowtype',
    'github'
  ],
  'rules': {
    'flowtype/define-flow-type': 2,
    'flowtype/require-valid-file-annotation': [2, 'always', {'annotationStyle': 'block'}],
    'flowtype/use-flow-type': 2,
    'github/no-flow-weak': 2,
    'github/no-flowfixme': 2,
    'github/no-noflow': 2
  }
}
