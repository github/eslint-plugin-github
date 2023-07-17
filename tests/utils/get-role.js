const {getRole} = require('../../lib/utils/get-role')
const {mockJSXAttribute, mockJSXConditionalAttribute, mockJSXOpeningElement} = require('./mocks')
const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const expect = require('chai').expect

describe('getRole', function () {
  it('returns undefined when polymorphic prop is set with a non-literal expression', function () {
    // <Box as={isNavigationOpen ? 'div' : 'nav'} />
    const node = mockJSXOpeningElement('Box', [mockJSXConditionalAttribute('as', 'isNavigationOpen', 'div', 'nav')])
    expect(getRole({}, node)).to.equal(undefined)
  })

  it('returns undefined when role is set to non-literal expression', function () {
    // <Box role={isNavigationOpen ? 'generic' : 'navigation'} />
    const node = mockJSXOpeningElement('Box', [
      mockJSXConditionalAttribute('role', 'isNavigationOpen', 'generic', 'navigation'),
    ])
    expect(getRole({}, node)).to.equal(undefined)
  })

  it('returns `role` when set to a literal expression', function () {
    // <Box role="generic" />
    const node = mockJSXOpeningElement('Box', [mockJSXAttribute('role', 'generic')])
    expect(getRole({}, node)).to.equal('generic')
  })

  it('returns generic role for <span> regardless of attribute', function () {
    const node = mockJSXOpeningElement('span', [mockJSXAttribute('aria-label', 'something')])
    expect(getRole({}, node)).to.equal('generic')
  })

  it('returns generic role for <div> regardless of attribute', function () {
    const node = mockJSXOpeningElement('div', [mockJSXAttribute('aria-describedby', 'something')])
    expect(getRole({}, node)).to.equal('generic')
  })

  it('returns generic role for <a> without href', function () {
    const node = mockJSXOpeningElement('a')
    expect(getRole({}, node)).to.equal('generic')
  })

  it('returns link role for <a> with href', function () {
    const node = mockJSXOpeningElement('a', [mockJSXAttribute('href', '#')])
    expect(getRole({}, node)).to.equal('link')
  })

  it('returns link role for <Foo> with polymorphic prop set to "a" and conditional href', function () {
    const node = mockJSXOpeningElement('Foo', [
      mockJSXAttribute('as', 'a'),
      mockJSXConditionalAttribute('href', 'getUrl', '#', 'https://github.com/'),
    ])
    expect(getRole({}, node)).to.equal('link')
  })

  it('returns link role for <Foo> with polymorphic prop set to "a" and literal href', function () {
    const node = mockJSXOpeningElement('Foo', [
      mockJSXAttribute('as', 'a'),
      mockJSXAttribute('href', 'https://github.com/'),
    ])
    expect(getRole({}, node)).to.equal('link')
  })

  it('returns generic role for <Foo> with polymorphic prop set to "a" and no href', function () {
    const node = mockJSXOpeningElement('Foo', [mockJSXAttribute('as', 'a')])
    expect(getRole({}, node)).to.equal('generic')
  })

  it('returns region role for <section> with aria-label', function () {
    const node = mockJSXOpeningElement('section', [mockJSXAttribute('aria-label', 'something')])
    expect(getRole({}, node)).to.equal('region')
  })

  it('returns region role for <section> with aria-labelledby', function () {
    const node = mockJSXOpeningElement('section', [mockJSXAttribute('aria-labelledby', 'something')])
    expect(getRole({}, node)).to.equal('region')
  })

  it('returns complementary role for <aside> with aria-label', function () {
    const node = mockJSXOpeningElement('aside', [mockJSXAttribute('aria-label', 'something')])
    expect(getRole({}, node)).to.equal('complementary')
  })

  it('returns complementary role for <aside> with aria-labelledby', function () {
    const node = mockJSXOpeningElement('aside', [mockJSXAttribute('aria-labelledby', 'something')])
    expect(getRole({}, node)).to.equal('complementary')
  })

  it('returns img role for <img> with alt set explicitly', function () {
    const node = mockJSXOpeningElement('img', [mockJSXAttribute('alt', 'Cute cat')])
    expect(getRole({}, node)).to.equal('img')
  })

  it('returns img role for <img> with no alt', function () {
    const node = mockJSXOpeningElement('img')
    expect(getRole({}, node)).to.equal('img')
  })

  it('returns presentation role for <img> with alt set to empty', function () {
    const node = mockJSXOpeningElement('img', [mockJSXAttribute('alt', '')])
    expect(getRole({}, node)).to.equal('presentation')
  })

  it('returns form role for <form> with aria-label', function () {
    const node = mockJSXOpeningElement('form', [mockJSXAttribute('aria-label', 'registration')])
    expect(getRole({}, node)).to.equal('form')
  })

  it('returns form role for <form> with name attrribute', function () {
    const node = mockJSXOpeningElement('form', [mockJSXAttribute('name', 'registration')])
    expect(getRole({}, node)).to.equal('form')
  })

  it('returns undefined role for <form> with no attributes', function () {
    const node = mockJSXOpeningElement('form')
    expect(getRole({}, node)).to.equal(undefined)
  })

  it('returns explicitly set role', function () {
    const spanButton = mockJSXOpeningElement('span', [mockJSXAttribute('role', 'button')])
    expect(getRole({}, spanButton)).to.equal('button')

    const divNav = mockJSXOpeningElement('div', [mockJSXAttribute('role', 'navigation')])
    expect(getRole({}, divNav)).to.equal('navigation')

    const listMenu = mockJSXOpeningElement('ul', [mockJSXAttribute('role', 'menu')])
    expect(getRole({}, listMenu)).to.equal('menu')
  })

  it('returns heading role for heading tags', function () {
    const h1 = mockJSXOpeningElement('h1')
    expect(getRole({}, h1)).to.equal('heading')

    const h2 = mockJSXOpeningElement('h2')
    expect(getRole({}, h2)).to.equal('heading')

    const h3 = mockJSXOpeningElement('h3')
    expect(getRole({}, h3)).to.equal('heading')

    const h4 = mockJSXOpeningElement('h4')
    expect(getRole({}, h4)).to.equal('heading')

    const h5 = mockJSXOpeningElement('h5')
    expect(getRole({}, h5)).to.equal('heading')

    const h6 = mockJSXOpeningElement('h6')
    expect(getRole({}, h6)).to.equal('heading')
  })

  it('returns navigation role for <nav>', function () {
    const node = mockJSXOpeningElement('nav')
    expect(getRole({}, node)).to.equal('navigation')
  })

  it('returns option role for <opt>', function () {
    const node = mockJSXOpeningElement('option')
    expect(getRole({}, node)).to.equal('option')
  })

  it('returns textbox role for <textarea>', function () {
    const node = mockJSXOpeningElement('textarea')
    expect(getRole({}, node)).to.equal('textbox')
  })

  it('returns listbox role for <select>', function () {
    const node = mockJSXOpeningElement('textarea')
    expect(getRole({}, node)).to.equal('textbox')
  })

  it('returns group role for <details>', function () {
    const node = mockJSXOpeningElement('details')
    expect(getRole({}, node)).to.equal('group')
  })

  it('returns group role for <details>', function () {
    const node = mockJSXOpeningElement('details')
    expect(getRole({}, node)).to.equal('group')
  })

  // <input>
  it('returns slider role for <input> with type range', function () {
    const node = mockJSXOpeningElement('input', [mockJSXAttribute('type', 'range')])
    expect(getRole({}, node)).to.equal('slider')
  })

  it('returns spinbutton for <input> with type number', function () {
    const node = mockJSXOpeningElement('input', [mockJSXAttribute('type', 'number')])
    expect(getRole({}, node)).to.equal('spinbutton')
  })

  it('returns checkbox for <input> with type checkbox', function () {
    const node = mockJSXOpeningElement('input', [mockJSXAttribute('type', 'checkbox')])
    expect(getRole({}, node)).to.equal('checkbox')
  })

  it('returns button for <input> with type button, image, reset, submit', function () {
    const button = mockJSXOpeningElement('input', [mockJSXAttribute('type', 'button')])
    expect(getRole({}, button)).to.equal('button')

    const image = mockJSXOpeningElement('input', [mockJSXAttribute('type', 'image')])
    expect(getRole({}, image)).to.equal('button')

    const reset = mockJSXOpeningElement('input', [mockJSXAttribute('type', 'reset')])
    expect(getRole({}, reset)).to.equal('button')

    const submit = mockJSXOpeningElement('input', [mockJSXAttribute('type', 'submit')])
    expect(getRole({}, submit)).to.equal('button')
  })

  it('returns rowheader role for <th scope="row">', function () {
    const node = mockJSXOpeningElement('th', [mockJSXAttribute('scope', 'row')])
    expect(getRole({}, node)).to.equal('rowheader')
  })

  it('returns rowheader role for <th scope="rowgroup">', function () {
    const node = mockJSXOpeningElement('th', [mockJSXAttribute('scope', 'rowgroup')])
    expect(getRole({}, node)).to.equal('rowheader')
  })

  // Hard-coded mapping
  it('returns listitem role for <li>', function () {
    const node = mockJSXOpeningElement('li')
    expect(getRole({}, node)).to.equal('listitem')
  })

  it('returns complementary role for <aside>', function () {
    const node = mockJSXOpeningElement('aside')
    expect(getRole({}, node)).to.equal('complementary')
  })

  // <link> does not map to anything.
  it('returns undefined role for <link>', function () {
    const node = mockJSXOpeningElement('link')
    expect(getRole({}, node)).to.equal(undefined)
  })

  it('returns undefined role for <link href="#">', function () {
    const node = mockJSXOpeningElement('link', [mockJSXAttribute('href', '#')])
    expect(getRole({}, node)).to.equal(undefined)
  })
})
