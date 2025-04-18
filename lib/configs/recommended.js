export default {
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 6,
    },
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
  plugins: ['github', 'prettier', 'eslint-comments', 'import', 'filenames', 'i18n-text', 'no-only-tests'],
  rules: {
    'constructor-super': 'error',
    'eslint-comments/disable-enable-pair': 'off',
    'eslint-comments/no-aggregating-enable': 'off',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/no-unused-enable': 'error',
    'eslint-comments/no-use': ['error', {allow: ['eslint', 'eslint-disable-next-line', 'eslint-env', 'globals']}],
    'filenames/match-regex': ['error', '^[a-z0-9-]+(.[a-z0-9-]+)?$'],
    'func-style': ['error', 'declaration', {allowArrowFunctions: true}],
    'github/array-foreach': 'error',
    'github/no-implicit-buggy-globals': 'error',
    'github/no-then': 'error',
    'github/no-dynamic-script-tag': 'error',
    'i18n-text/no-en': ['error'],
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'error',
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowArray: true,
        allowArrowFunction: false,
        allowLiteral: true,
        allowObject: true,
      },
    ],
    'import/no-commonjs': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': [0, {devDependencies: false}],
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-namespace': 'error',
    'import/no-unresolved': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-const-assign': 'error',
    'no-constant-condition': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': 'error',
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'error',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-invalid-this': 'error',
    'no-irregular-whitespace': 'error',
    'no-new-symbol': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-only-tests/no-only-tests': [
      'error',
      {
        block: ['describe', 'it', 'context', 'test', 'tape', 'fixture', 'serial', 'suite'],
      },
    ],
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-return-assign': 'error',
    'no-self-assign': 'error',
    'no-sequences': ['error'],
    'no-shadow': 'error',
    'no-sparse-arrays': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-undef': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'always', {avoidQuotes: true}],
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'prettier/prettier': 'error',
    'require-yield': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    camelcase: ['error', {properties: 'always'}],
    eqeqeq: ['error', 'smart'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
}
