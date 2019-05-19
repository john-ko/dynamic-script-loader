import { getNewScript } from '../../src/index'
import { expect } from 'chai'

describe('getNewScript (options = {})', () => {
  // mock document
  beforeEach(() => {
    const MockBrowser = require('mock-browser').mocks.MockBrowser
    global.document = new MockBrowser().getDocument()
  })

  afterEach(() => {
    global.document = {}
  })

  it('defaults options into empty object', () => {
    const script = getNewScript()

    expect(script.tagName).to.be.equal('SCRIPT')
  })

  it('returns a HTMLScriptElement', () => {
    const script = getNewScript({})

    expect(script.tagName).to.be.equal('SCRIPT')
  })

  it('defaults async and defer to true', () => {
    const script = getNewScript({
      src: 'https://www.google.com/script.js',
    })

    expect(script.async).to.be.true
    expect(script.defer).to.be.true
  })

  it('sets defer to true when defer is set', () => {
    const script = getNewScript({
      src: '//www.google.com/script.js',
      defer: true,
    })

    expect(script.async).to.be.true
    expect(script.defer).to.be.true
  })

  it('sets key value pairs if set', () => {
    const script = getNewScript({
      src: '//www.google.com/script.js',
      async: true
    })

    expect(script.src).to.be.equal('//www.google.com/script.js')
    expect(script.async).to.be.true
  })

  it('skips over keys that value are falsy', () => {
    const script = getNewScript({
      src: '//www.google.com/script.js',
      async: false,
      defer: false
    })

    // expect to be falsy, (false || undefined)
    expect(script.async).to.be.not.ok
    expect(script.defer).to.be.not.ok
  })
})