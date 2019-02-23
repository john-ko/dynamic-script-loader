import { createPromise } from '../../src/index'
import { expect } from 'chai'


describe('createPromise ()', () => {
  beforeEach(() => {
    const MockBrowser = require('mock-browser').mocks.MockBrowser
    global.document = new MockBrowser().getDocument()
  })

  afterEach(() => {
    global.document = {}
  })

  it('returns a promise', () => {
    // cant really test this... dont want to use rewire
    const promise = createPromise({})

    expect(promise instanceof Promise).to.be.true
  })
})