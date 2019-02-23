import { appendScript } from '../../src/index'
import chai from 'chai'
import { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('appendScript (options, success, failure)', () => {
  beforeEach(() => {
    const MockBrowser = require('mock-browser').mocks.MockBrowser
    global.document = new MockBrowser().getDocument()
  })

  afterEach(() => {
    global.document = {}
  })

  describe('success / failure arguments', () => {
    let success
    let failure

    beforeEach(() => {
      success = sinon.spy()
      failure = sinon.spy()
    })

    it('should set the onload to the success callback', () => {
      const script = appendScript({}, success, failure)

      expect(script.onload).to.be.equal(success)
    })

    it('should set the onerror to the failure callback', () => {
      const script = appendScript({}, success, failure)

      expect(script.onerror).to.be.equal(failure)
    })
  })

  describe('appends the script to the head', () => {
    let appendChild

    beforeEach(() => {
      appendChild = sinon.stub(document.head, 'appendChild')
    })

    it('appends script to the head', () => {
      const script = appendScript({}, () => {}, () => {})

      expect(appendChild).to.have.been.calledWith(script)
    })
  })
})