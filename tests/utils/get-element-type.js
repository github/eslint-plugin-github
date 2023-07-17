const {getElementType} = require('../../lib/utils/get-element-type')
const {mockJSXAttribute, mockJSXConditionalAttribute, mockJSXOpeningElement} = require('./mocks')

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const expect = require('chai').expect

function mockSetting(componentSetting = {}) {
  return {
    settings: {
      github: {
        components: componentSetting,
        polymorphicPropName: 'as',
      },
    },
  }
}

describe('getElementType', function () {
  it('returns raw element type', function () {
    const node = mockJSXOpeningElement('a')
    expect(getElementType({}, node)).to.equal('a')
  })

  it('returns polymorphic element type', function () {
    const node = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'button')])
    const setting = mockSetting({
      Link: 'a',
    })
    expect(getElementType(setting, node)).to.equal('button')
  })

  it('returns raw type if no default or matching prop setting', function () {
    const setting = mockSetting({})

    const node = mockJSXOpeningElement('Link')
    expect(getElementType(setting, node)).to.equal('Link')
  })

  it('returns default type if no polymorphic prop is passed in', function () {
    const setting = mockSetting({
      Link: 'a',
    })
    const node = mockJSXOpeningElement('Link')
    expect(getElementType(setting, node)).to.equal('a')
  })

  it('if rendered as another component check its default type', function () {
    const setting = mockSetting({
      Link: 'a',
      Button: 'button',
    })

    const node = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'Button')])
    expect(getElementType(setting, node)).to.equal('button')
  })

  it('returns raw type when polymorphic prop is set to non-literal expression', function () {
    // <Box as={isNavigationOpen ? 'generic' : 'navigation'} />
    const node = mockJSXOpeningElement('Box', [
      mockJSXConditionalAttribute('as', 'isNavigationOpen', 'generic', 'navigation'),
    ])
    expect(getElementType({}, node)).to.equal('Box')
  })
})
