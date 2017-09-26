module.exports = {
  'parserOptions': {
    'ecmaFeatures': {
      'ecmaVersion': 6
    }
  },
  'env': {
    'es6': true
  },
  'plugins': [
    'github',
    'import'
  ],
  'rules': {
    'github/array-foreach': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-as-default': 'error',
    'import/no-namespace': 'error',
    'no-var': 'error',
    'prefer-const': 'error'
  }
}
