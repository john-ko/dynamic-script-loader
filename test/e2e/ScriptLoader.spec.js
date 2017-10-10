import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'


chai.use(sinonChai)

const expect = chai.expect

import ScriptLoader from '../../src/ScriptLoader'

// TODO: have a better way of testing

describe('ScriptLoader', () => {
  let loader

  describe('on first load', () => {
    let callback, success, failure

    before((done) => {
      callback = sinon.spy()
      success = sinon.spy()
      failure = sinon.spy()

      loader = new ScriptLoader()

      loader.load({
        src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.4/vue.min.js',
        async: true,
      }, callback)
        .then(() => {
          success()
          done()
        })
        .catch(() => {
          failure()
          done()
        })
    })

    describe('when the script first successfully loads', () => {
      it('should call the callback', () => {
        expect(callback).to.have.been.calledOnce
      })

      it('should have called success', () => {
        expect(success).to.have.been.calledOnce
      })

      it('should not have failed', () => {
        expect(failure).to.have.not.been.called
      })
    })
  })

  describe('on second load', () => {
    let callback, success, failure

    before((done) => {
      callback = sinon.spy()
      success = sinon.spy()
      failure = sinon.spy()

      loader = new ScriptLoader()

      loader.load({
        src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.4/vue.min.js',
        async: true,
      }, callback)
        .then(() => {
          success()
          done()
        })
        .catch(() => {
          failure()
          done()
        })
    })

    describe('when the script has already been loaded', () => {
      it('should not have called the callback', () => {
        expect(callback).to.have.not.been.called
      })

      it('should have called the success callback', () => {
        expect(success).to.have.been.calledOnce
      })

      it('should not have failed', () => {
        expect(failure).to.have.not.been.called
      })
    })
  })

  describe('when no callback is given', () => {
    let success, failure
    before((done) => {
      success = sinon.spy()
      failure = sinon.spy()
      loader = new ScriptLoader()

      loader.load({
        src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js',
        async: true,
      })
        .then(() => {
          success()
          done()
        })
        .catch(() => {
          failure()
          done()
        })
    })

    it('should call the success handler', () => {
      expect(success).to.have.been.called
    })

    it('should not call the failure handler', () => {
      expect(failure).to.have.not.been.called
    })
  })
})