const rule = require('../lib/rules/prefer-import-extensions')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

const parserOptions = {sourceType: 'module', ecmaVersion: 2021}

ruleTester.run('prefer-import-extensions', rule, {
  valid: [
    {
      code: "import './something.js'",
      parserOptions
    },
    {
      code: "import 'left-pad'",
      parserOptions
    },
    {
      code: "import '@github/eslint-plugin-github'",
      parserOptions
    },
    {
      code: "import {controller, target} from '@github/catalyst'",
      parserOptions
    }
  ],
  invalid: [
    {
      code: "import './something'",
      output: "import './something.js'",
      parserOptions,
      errors: [
        {
          message: 'The imported file is missing a file extension. Consider adding the `.js` extension.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "import './something/very/important'",
      output: "import './something/very/important.js'",
      parserOptions,
      errors: [
        {
          message: 'The imported file is missing a file extension. Consider adding the `.js` extension.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "import something from './somewhere'",
      output: "import something from './somewhere.js'",
      parserOptions,
      errors: [
        {
          message: 'The imported file is missing a file extension. Consider adding the `.js` extension.',
          type: 'Literal'
        }
      ]
    }
  ]
})
