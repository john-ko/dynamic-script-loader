import loadScript from '../../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { expect } from 'chai'
import browserMock from 'mock-browser'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

const MockBrowser = browserMock.mocks.MockBrowser

chai.use(sinonChai)
chai.use(chaiAsPromised)

const URL = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
describe('dynamic script loader', () => {
  describe('when run on serverside', () => {
    it('should fail with a promise rejection', () => {
      expect(loadScript()).to.be.rejectedWith('sorry bro client side only')
    })
  })

  describe('when src is not set', () => {
    beforeEach(() => {
      global.window = new MockBrowser().getWindow()
      global.document = new MockBrowser().getDocument()
    })

    afterEach(() => {
      global.window = {}
      global.document = {}
    })

    it('should fail with a promise rejection', () => {
      expect(loadScript()).to.be.rejectedWith('src must be set!')
    })
  })

  describe('initial callback', () => {
    let callback
    let thennable

    beforeEach(() => {
      callback = sinon.spy()
      thennable = sinon.spy()
      global.window = new MockBrowser().getWindow()
      global.document = new MockBrowser().getDocument()
    })

    afterEach(() => {
      global.window = {}
      global.document = {}
    })

    it('it runs initial callback', (done) => {
      loadScript({ src: URL }, callback)
        .then(() => {
          expect(callback).to.have.been.called
          done()
        })
    })

    it('loader runs callback only once', (done) => {
      loadScript({ src: URL }, callback)
        .then(thennable)

      loadScript({ src: URL }, callback)
        .then(thennable)
        .then(() => {
          expect(callback).to.have.been.calledOnce
          done()
        })
    })

    it('loader runs then after each load call', (done) => {
      loadScript({ src: URL }, callback)
        .then(thennable)

      loadScript({ src: URL }, callback)
        .then(thennable)
        .then(() => {
          expect(thennable).to.have.been.calledTwice
          done()
        })
    })
  })

})