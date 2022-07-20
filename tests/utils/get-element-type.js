const {getElementType} = require('../../lib/utils/get-element-type')
const expect = require('chai').expect

function mockJSXAttribute(prop, propValue) {
  return {
    type: 'JSXAttribute',
    name: {
      type: 'JSXIdentifier',
      name: prop
    },
    value: {
      type: 'Literal',
      value: propValue
    }
  }
}

function mockJSXOpeningElement(tagName, attributes = [], children = []) {
  return {
    type: 'JSXOpeningElement',
    name: {
      type: 'JSXIdentifier',
      name: tagName
    },
    attributes
  }
}

function mockSetting(componentSetting = {}) {
  return {
    settings: {
      github: {
        components: componentSetting
      }
    }
  }
}

describe('getElementType', function () {
  it('gets element type', function () {
    const node = mockJSXOpeningElement('a')
    expect(getElementType({}, node)).to.equal('a')
  })

  it('gets element type from default', function () {
    const node = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'summary')])
    const setting = mockSetting({
      Link: {
        default: 'button'
      }
    })
    expect(getElementType(setting, node)).to.equal('button')
  })

  it('gets element type from matching props setting', function () {
    const setting = mockSetting({
      Link: {
        default: 'a',
        props: {
          as: {summary: 'summary'}
        }
      }
    })
    const node_1 = mockJSXOpeningElement('Link')
    expect(getElementType(setting, node_1)).to.equal('a')

    const node_2 = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'p')])
    expect(getElementType(setting, node_2)).to.equal('a')

    const node_3 = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'summary')])
    expect(getElementType(setting, node_3)).to.equal('summary')
  })

  it('uses original type if no default or matching prop setting', function () {
    const setting = mockSetting({
      Link: {
        props: {
          as: {summary: 'summary'}
        }
      }
    })
    const node = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'p')])
    expect(getElementType(setting, node)).to.equal('Link')
  })

  it('allows undefined prop to be mapped to a type', function () {
    const setting = mockSetting({
      Link: {
        props: {
          as: {undefined: 'a'}
        }
      }
    })
    const node = mockJSXOpeningElement('Link')
    expect(getElementType(setting, node)).to.equal('a')
  })

  it('falls back to original type if no default and prop does not match props setting', function () {
    const setting = mockSetting({
      Link: {
        props: {
          as: {undefined: 'a'}
        }
      }
    })

    const node = mockJSXOpeningElement('Link', [mockJSXAttribute('as', 'p')])
    expect(getElementType(setting, node)).to.equal('Link')
  })
})
