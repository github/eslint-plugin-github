const rule = require('../lib/rules/a11y-no-title-attribute')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

const errorMessage = 'The title attribute is not accessible and should never be used unless for an `<iframe>`.'

ruleTester.run('a11y-no-title-attribute', rule, {
  valid: [
    {code: '<button>Submit</button>'},
    {code: '<iframe title="an allowed title">GitHub</iframe>'},
    {code: '<span>some information</span>'},
    {code: '<a href="github.com">GitHub</a>'},
    {
      code: '<Component title="some title">Submit</Component>',
      settings: {
        github: {
          components: {
            Component: 'iframe',
          },
        },
      },
    },
  ],
  invalid: [
    {code: '<a title="some title" href="github.com">GitHub</a>', errors: [{message: errorMessage}]},
    {code: '<span><button title="some title">submit</button></span>', errors: [{message: errorMessage}]},
    {
      code: '<Link title="some title">Submit</Link>',
      errors: [{message: errorMessage}],
      settings: {
        github: {
          components: {
            Link: 'a',
          },
        },
      },
    },
    {
      code: '<Component as="a" title="some title">Submit</Component>',
      errors: [{message: errorMessage}],
      settings: {
        github: {
          components: {
            Component: 'iframe',
          },
        },
      },
    },
  ],
})
