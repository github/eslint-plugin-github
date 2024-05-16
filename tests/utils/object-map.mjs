// @ts-check
import {expect} from 'chai'
import ObjectMap from '../../lib/utils/object-map.js'
import {describe, it} from 'mocha'

describe('ObjectMap', function () {
  it('constructs an ObjectMap', function () {
    const objectMap = new ObjectMap()
    expect(objectMap instanceof ObjectMap).to.be.true
  })

  it('extends Map', function () {
    const objectMap = new ObjectMap()
    expect(objectMap instanceof Map).to.be.true
  })

  it('populates data from constructor argument', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    expect(Array.from(objectMap.entries())).to.deep.equal(iterable)
  })

  it('clears data', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    objectMap.clear()
    expect(Array.from(objectMap.entries())).to.be.empty
  })

  it('deletes data that exists', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    const returnValue = objectMap.delete({name: 'form'})
    expect(Array.from(objectMap.entries())).to.be.empty
    expect(returnValue).to.be.true
  })

  it('doesn’t delete data that doesn’t exist', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    const returnValue = objectMap.delete({name: ''})
    expect(Array.from(objectMap.entries())).to.deep.equal(iterable)
    expect(returnValue).to.be.false
  })

  it('lists entries that exist', function () {
    const iterable = [
      [{name: 'form'}, ['form']],
      [{name: 'span'}, ['generic']],
    ]
    const objectMap = new ObjectMap(iterable)
    const iterator = objectMap.entries()
    expect(typeof iterator[Symbol.iterator]).to.equal('function')
    expect(iterator.next()).to.deep.equal({value: iterable[0], done: false})
    expect(iterator.next()).to.deep.equal({value: iterable[1], done: false})
    expect(iterator.next()).to.deep.equal({value: undefined, done: true})
  })

  it('doesn’t list entries that don’t exist', function () {
    const objectMap = new ObjectMap()
    const iterator = objectMap.entries()
    expect(typeof iterator[Symbol.iterator]).to.equal('function')
    expect(iterator.next()).to.deep.equal({value: undefined, done: true})
  })

  it('finds key that exists', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    expect(objectMap.has({name: 'form'})).to.be.true
  })

  it('finds key that exists in a different order', function () {
    const iterable = [[{name: 'form', attributes: [{name: 'action', value: 'POST'}]}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    expect(objectMap.has({attributes: [{value: 'POST', name: 'action'}], name: 'form'})).to.be.true
  })

  it('doesn’t find key that doesn’t exist', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    expect(objectMap.has({name: ''})).to.be.false
  })

  it('doesn’t find key when none exist', function () {
    const objectMap = new ObjectMap()
    expect(objectMap.has({name: ''})).to.be.false
  })

  it('calls callback for each datum', function () {
    const iterable = [
      [{name: 'form'}, ['form']],
      [{name: 'span'}, ['generic']],
    ]
    const objectMap = new ObjectMap(iterable)
    const values = []
    const keys = []
    // eslint-disable-next-line github/array-foreach
    objectMap.forEach((value, key) => {
      values.push(value)
      keys.push(key)
    })
    expect(values).to.deep.equal([['form'], ['generic']])
    expect(keys).to.deep.equal([{name: 'form'}, {name: 'span'}])
  })

  it('finds value given key that exists', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    expect(objectMap.get({name: 'form'})).to.deep.equal(['form'])
  })

  it('finds value given key that exists in a different order', function () {
    const iterable = [[{name: 'form', attributes: [{name: 'action', value: 'POST'}]}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    expect(objectMap.get({attributes: [{value: 'POST', name: 'action'}], name: 'form'})).to.deep.equal(['form'])
  })

  it('doesn’t find value given key that doesn’t exist', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const objectMap = new ObjectMap(iterable)
    expect(objectMap.get({name: ''})).to.be.undefined
  })

  it('doesn’t find value when none exist', function () {
    const objectMap = new ObjectMap()
    expect(objectMap.get({name: ''})).to.be.undefined
  })

  it('lists keys', function () {
    const iterable = [
      [{name: 'form'}, ['form']],
      [{name: 'span'}, ['generic']],
    ]
    const objectMap = new ObjectMap(iterable)
    const iterator = objectMap.keys()
    expect(typeof iterator[Symbol.iterator]).to.equal('function')
    expect(iterator.next()).to.deep.equal({value: iterable[0][0], done: false})
    expect(iterator.next()).to.deep.equal({value: iterable[1][0], done: false})
    expect(iterator.next()).to.deep.equal({value: undefined, done: true})
  })

  it('sets value when none exist', function () {
    const key = {name: 'form'}
    const value = ['form']
    const objectMap = new ObjectMap()
    objectMap.set(key, value)
    expect(Array.from(objectMap.entries())).to.deep.equal([[key, value]])
  })

  it('sets value when some exist', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const key = {name: 'span'}
    const value = ['generic']
    const objectMap = new ObjectMap(iterable)
    objectMap.set(key, value)
    expect(Array.from(objectMap.entries())).to.deep.equal([iterable[0], [key, value]])
  })

  it('replaces value under existing key', function () {
    const iterable = [[{name: 'form'}, ['form']]]
    const key = {name: 'form'}
    const value = ['generic']
    const objectMap = new ObjectMap(iterable)
    objectMap.set(key, value)
    expect(Array.from(objectMap.entries())).to.deep.equal([[key, value]])
  })

  it('lists values', function () {
    const iterable = [
      [{name: 'form'}, ['form']],
      [{name: 'span'}, ['generic']],
    ]
    const objectMap = new ObjectMap(iterable)
    const iterator = objectMap.values()
    expect(typeof iterator[Symbol.iterator]).to.equal('function')
    expect(iterator.next()).to.deep.equal({value: iterable[0][1], done: false})
    expect(iterator.next()).to.deep.equal({value: iterable[1][1], done: false})
    expect(iterator.next()).to.deep.equal({value: undefined, done: true})
  })
})
