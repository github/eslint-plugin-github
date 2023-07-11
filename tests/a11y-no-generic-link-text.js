const rule = require('../lib/rules/a11y-no-generic-link-text')
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

const errorMessage =
  'Avoid setting generic link text like `Here`, `Click here`, `Read more`. Make sure that your link text is both descriptive and concise.'

ruleTester.run('a11y-no-generic-link-text', rule, {
  valid: [
    {code: "<a href='#'>GitHub Home</a>;"},
    {code: "<Box><a href='#'>GitHub Home</a></Box>;"},
    {code: "<a aria-label='Read more about our project' href='#'>Read more</a>;"},
    {code: "<a aria-labelledby='someId' href='#'>Read more</a>;"},
    {code: '<summary>Read more</summary>;'},
    {
      code: '<Link as="button" href="#">Read more</Link>',
      settings: {
        github: {
          components: {
            Link: 'a',
          },
        },
      },
    },
  ],
  invalid: [
    {
      code: '<ButtonLink href="#">Read more</ButtonLink>',
      errors: [{message: errorMessage}],
      settings: {
        github: {
          components: {
            ButtonLink: 'a',
          },
        },
      },
    },
    {
      code: '<Link href="#">Read more</Link>',
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
      code: '<Test as="a" href="#">Read more</Test>',
      errors: [{message: errorMessage}],
    },
    {
      code: "<Box><a href='#'>Click here</a></Box>;",
      errors: [{message: errorMessage}],
    },
    {code: '<a>Click here*</a>;', errors: [{message: errorMessage}]},
    {code: '<a>Learn more.</a>;', errors: [{message: errorMessage}]},
    {code: "<a aria-label='read more!!!'></a>;", errors: [{message: errorMessage}]},
    {code: "<a aria-label='click here.'></a>;", errors: [{message: errorMessage}]},
    {code: "<a aria-label='Here'></a>;", errors: [{message: errorMessage}]},
    {
      code: "<a aria-label='Does not include visible label'>Read more!</a>;",
      errors: [
        {
          message: 'When using ARIA to set a more descriptive text, it must fully contain the visible label.',
        },
      ],
    },
  ],
})
