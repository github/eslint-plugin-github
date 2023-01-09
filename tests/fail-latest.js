/* globals describe, it*/
const assert = require('assert')

describe('node version', () => {
  it('is not latest', () => {
    assert.ok(process.version < 'v19.0.0')
  })
})
