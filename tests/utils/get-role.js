const {getRole} = require('../../lib/utils/get-role')
const {mockJSXAttribute, mockJSXOpeningElement} = require('./helpers')
const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const expect = require('chai').expect

describe('getRole', function () {
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
