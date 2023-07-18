const rule = require('../lib/rules/a11y-no-visually-hidden-interactive-element')
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
  'Avoid visually hidding interactive elements. Visually hiding interactive elements can be confusing to sighted keyboard users as it appears their focus has been lost when they navigate to the hidden element.'

ruleTester.run('a11y-no-visually-hidden-interactive-element', rule, {
  valid: [
    {code: '<VisuallyHidden as="h2">Submit</VisuallyHidden>'},
    {code: "<div className='sr-only'>Text</div>;"},
    {code: '<VisuallyHidden><div>Text</div></VisuallyHidden>'},
    {code: "<div className='other visually-hidden'>Text</div>;"},
    {code: "<span className='sr-only'>Text</span>;"},
    {code: "<button className='other'>Submit</button>"},
    {code: "<input className='sr-only' />"},
    {
      code: "<Foo className={({isOn}) => { return isOn || isOnProps ? `${className} selected`.trim() : className ?? ''}}/>",
    },
    {code: "<a className='other show-on-focus'>skip to main content</a>"},
    {code: '<button>Submit</button>'},
    {
      code: "<button className='sr-only'>Submit</button>",
      options: [
        {
          className: 'visually-hidden',
        },
      ],
    },
    {
      code: "<VisuallyHidden as='button'>Submit</VisuallyHidden>",
      options: [
        {
          componentName: 'Hidden',
        },
      ],
      errors: [{message: errorMessage}],
    },
    {
      code: "<VisuallyHidden as='button'>Submit</VisuallyHidden>",
      settings: {
        github: {
          polymorphicPropName: 'html',
        },
      },
    },
  ],
  invalid: [
    {code: '<VisuallyHidden as="button">Submit</VisuallyHidden>', errors: [{message: errorMessage}]},
    {code: '<VisuallyHidden><button>Submit</button></VisuallyHidden>', errors: [{message: errorMessage}]},
    {
      code: '<VisuallyHidden><button class="sr-only">Submit</button></VisuallyHidden>',
      errors: [{message: errorMessage}],
    },
    {code: "<button className='sr-only'>Submit</button>", errors: [{message: errorMessage}]},
    {code: '<VisuallyHidden><div><button>Submit</button></div></VisuallyHidden>', errors: [{message: errorMessage}]},
    {code: "<a className='other sr-only' href='github.com'>GitHub</a>", errors: [{message: errorMessage}]},
    {code: "<summary className='sr-only'>Toggle open</summary>", errors: [{message: errorMessage}]},
    {code: "<textarea className='sr-only' />", errors: [{message: errorMessage}]},
    {code: "<select className='sr-only' />", errors: [{message: errorMessage}]},
    {code: "<option className='sr-only' />", errors: [{message: errorMessage}]},
    {code: "<a className='sr-only'>Read more</a>", errors: [{message: errorMessage}]},
    {
      code: "<button className='visually-hidden'>Submit</button>",
      options: [
        {
          className: 'visually-hidden',
        },
      ],
      errors: [{message: errorMessage}],
    },
    {
      code: "<Hidden as='button'>Submit</Hidden>",
      options: [
        {
          componentName: 'Hidden',
        },
      ],
      errors: [{message: errorMessage}],
    },
    {
      code: "<VisuallyHidden html='button'>Submit</VisuallyHidden>",
      errors: [{message: errorMessage}],
      settings: {
        github: {
          polymorphicPropName: 'html',
        },
      },
    },
  ],
})
