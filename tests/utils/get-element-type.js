const {getElementType} = require('../../lib/utils/get-element-type')
const {mockJSXAttribute, mockJSXOpeningElement} = require('./helpers')

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const expect = require('chai').expect

function mockSetting(componentSetting = {}) {
  return {
    settings: {
      github: {
        components: componentSetting,
      },
    },
  }
}

describe('getElementType', function () {
  it('returns raw element type', function () {
    const node = mockJSXOpeningElement('a')
    expect(getElementType({}, node)).to.equal('a')
  })

  it('returns element type from default if set', function () {
    const node = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'summary')])
    const setting = mockSetting({
      Link: {
        default: 'button',
      },
    })
    expect(getElementType(setting, node)).to.equal('button')
  })

  it('returns element type from matching props setting if set', function () {
    const setting = mockSetting({
      Link: {
        default: 'a',
        props: {
          as: {summary: 'summary'},
        },
      },
    })

    const node = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'summary')])
    expect(getElementType(setting, node)).to.equal('summary')
  })

  it('returns raw type if no default or matching prop setting', function () {
    const setting = mockSetting({
      Link: {
        props: {
          as: {summary: 'summary'},
        },
      },
    })
    const node = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'p')])
    expect(getElementType(setting, node)).to.equal('Link')
  })

  it('allows undefined prop to be mapped to a type', function () {
    const setting = mockSetting({
      Link: {
        props: {
          as: {undefined: 'a'},
        },
      },
    })
    const node = mockJSXOpeningElement('Link')
    expect(getElementType(setting, node)).to.equal('a')
  })

  it('returns raw type if prop does not match props setting and no default type', function () {
    const setting = mockSetting({
      Link: {
        props: {
          as: {undefined: 'a'},
        },
      },
    })

    const node = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'p')])
    expect(getElementType(setting, node)).to.equal('Link')
  })
})
