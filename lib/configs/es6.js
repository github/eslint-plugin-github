module.exports = {
  "parserOptions": {
    "ecmaFeatures": {
      "ecmaVersion": 6
    }
  },
  "env": {
    "es6": true
  },
  "plugins": [
    "github",
    "import"
  ],
  "rules": {
    "github/array-foreach": 2,
    "import/default": 2,
    "import/export": 2,
    "import/first": 2,
    "import/named": 2,
    "import/namespace": 2,
    "import/newline-after-import": 2,
    "import/no-absolute-path": 2,
    "import/no-deprecated": 2,
    "import/no-duplicates": 2,
    "import/no-mutable-exports": 2,
    "import/no-named-as-default-member": 2,
    "import/no-named-as-default": 2,
    "import/no-namespace": 2,
    "no-var": 2,
    "prefer-const": 2
  }
}
