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
    {
      // Note: we are only checking semantic elements. We cannot make assumptions about how a React Components is using the title prop.
      code: '<Link title="some title">Submit</Link>',
      settings: {
        github: {
          components: {
            Link: 'a',
          },
        },
      },
    },
    {
      // Note: we are only checking semantic elements. We cannot make assumptions about how a React Components is using the title prop.
      code: '<Link as="a" title="some title">Submit</Link>',
    },
  ],
  invalid: [
    {code: '<a title="some title" href="github.com">GitHub</a>', errors: [{message: errorMessage}]},
    {code: '<span><button title="some title">submit</button></span>', errors: [{message: errorMessage}]},
  ],
})
