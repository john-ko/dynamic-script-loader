import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

const expect = chai.expect

import ScriptLoader from '../../src/ScriptLoader'

describe('ScriptLoader', () => {
  let loader
  beforeEach(() => {

    /**
     * mocking the window object
     * too lazy to implment mocha client side
     */
    global.window = {}
  })

  /**
   * Constructor
   *
   */
  describe('Constructor ()', () => {
    describe('when script does not run in the browser', () => {
      beforeEach(() => {
        global.window = undefined
        loader = new ScriptLoader()
      })

      it('sets scripts as empty object', () => {
        expect(loader.scripts).to.be.deep.equal({})
      })
    })

    describe('when script runs in the browser', () => {
      describe('if ScriptLoader has not been set', () => {
        beforeEach(() => {
          loader = new ScriptLoader()
        })

        it('sets scripts as an empty object', () => {
          expect(loader.scripts).to.be.deep.equal({})
        })
      })

      describe('if ScriptLoader is already present', () => {
        beforeEach(() => {
          global.window = {
            ScriptLoader: 'the scriptloader object'
          }

          loader = new ScriptLoader()
        })

        it('sets scripts as the ScriptLoader Object', () =>{
          expect(loader.scripts).to.be.equal('the scriptloader object')
        })
      })

    })
  })

  /**
   * isBrowser
   *
   */
  describe('isBrowser ()', () => {
    describe('when window is present', () => {
      beforeEach(() => {
        loader = new ScriptLoader()
      })

      it('returns true', () => {
        expect(loader.isBrowser()).to.be.equal(true)
      })
    })

    describe('when window is not present', () => {
      beforeEach(() => {
        global.window = undefined
        loader = new ScriptLoader()
      })

      it('returns false', () => {
        expect(loader.isBrowser()).to.be.equal(false)
      })
    })
  })

  /**
   * load
   *
   */
  describe('load (options, callback)', () => {
    let options, callback

    beforeEach(() => {
      options = {
        async: sinon.spy(),
        src: sinon.spy()
      }
      callback = sinon.spy()
      loader = new ScriptLoader()
      loader.hasScriptBeenLoaded = sinon.stub()
      loader.setScript = sinon.stub()
      loader.getScriptLoaderPromise = sinon.stub()
    })

    describe('checks if script has been loaded', () => {
      describe('if script has been loaded', () => {
        beforeEach(() => {
          loader.hasScriptBeenLoaded.returns(true)
          loader.load(options, callback)
        })

        it('checks if script has been loaded', () => {
          expect(loader.hasScriptBeenLoaded).to.have.been.calledWithExactly(options.src)
        })

        it('returns early and does not run the setScript', () => {
          expect(loader.setScript).to.have.not.been.called
        })
      })
    })

    describe('when script has not been loaded', () => {
      let response
      beforeEach(() => {
        loader.hasScriptBeenLoaded.returns(false)
        loader.getScriptLoaderPromise.returns('a promise!')
        response = loader.load(options, callback)
      })

      it('calls setScript with the script src', () => {
        expect(loader.setScript).to.have.been.calledWithExactly(options.src)
      })

      describe('calls the getScriptLoaderPromise with params', () => {
        /*
         * duplicate but if any fail, will be easier to find where
         */

        it('calls with the getScriptLoaderPromise with options param', () => {
          expect(loader.getScriptLoaderPromise).to.have.been.calledWith(options)
        })

        it('calls with the getScriptLoaderPromise with callback', () => {
          expect(loader.getScriptLoaderPromise).to.have.been.calledWith(options, callback)
        })
      })

      it('returns a promise', () => {
        expect(response).to.be.equal('a promise!')
      })
    })
  })

  /**
   * appendScript
   *
   */
  describe('appendScript (src, asyncrouns, success, failure)', () => {
    let options, success, failure

    beforeEach(() => {
      global.document = {
        createElement: sinon.stub(),
        head: {
          appendChild: sinon.stub()
        }
      }
      document.createElement.returns({})
      loader = new ScriptLoader()
      options = {}
      success = sinon.spy()
      failure = sinon.spy()
    })

    it('calls document.createElement with script', () => {
      loader.appendScript(options, success, failure)
      expect(document.createElement).to.have.been.calledWithExactly('script')
    })

    it('appends the script inside the head tag', () => {
      loader.appendScript(options, success, failure)
      expect(document.head.appendChild).to.have.been.calledWithExactly({
        type: 'text/javascript',
        async: true,
        onload: success,
        onerror: failure
      })
    })

    describe('when async flag is set to false', () => {
      it('should append the script without async flag', () => {
        options.async = false
        loader.appendScript(options, success, failure)
        expect(document.head.appendChild).to.have.been.calledWithExactly({
          type: 'text/javascript',
          onload: success,
          onerror: failure
        })
      })
    })

    describe('when optional variables are adde to options', () => {
      it('should appear on the script', () => {
        options.hello = 'world'
        loader.appendScript(options, success, failure)
        expect(document.head.appendChild).to.have.been.calledWithExactly({
          async: true,
          type: 'text/javascript',
          onload: success,
          onerror: failure,
          hello: 'world',
        })
      })
    })
  })

  /**
   * hasScriptBeenLoaded
   *
   */
  describe('hasScriptBeenLoaded (src)', () => {
    let src = '/some/src/to/javascript.js'
    beforeEach(() => {
      loader = new ScriptLoader()
    })

    describe('when script has already been loaded', () => {
      beforeEach(() => {
        loader.scripts[src] = true
      })

      it('should return true', () => {
        expect(loader.hasScriptBeenLoaded(src)).to.be.true
      })
    })

    describe('when script has not been loaded', () => {
      it('should return falsy', () => {
        // falsy
        expect(loader.hasScriptBeenLoaded(src)).not.to.be.ok
      })
    })
  })

  /**
   * setScript
   *
   */
  describe('setScript (src)', () => {
    let src = '/some/src/to/javascript.js'
    beforeEach(() => {
      loader = new ScriptLoader()
      loader.setScript(src)
    })

    it('should set the src in the scripts object to true', () => {
      expect(loader.scripts[src]).to.be.true
    })
  })

  describe('getScriptLoaderPromise (src, async, callback)', () => {
    let promise, src, async, callback
    beforeEach(() => {
      src = sinon.spy()
      async = sinon.spy()
      callback = sinon.spy()
      loader = new ScriptLoader()
      promise = loader.getScriptLoaderPromise(src, async, callback)
    })

    it('returns a new promise?', () => {})
  })

  describe('promiseFunction (src, async, callback)', () => {
    let resolve, reject, options, asyncrouns, callback, appendScript
    let success, onerror
    let resolver

    beforeEach(() => {
      resolve = sinon.spy()
      reject = sinon.spy()
      options = sinon.spy()
      asyncrouns = sinon.spy()
      callback = sinon.spy()
      appendScript = sinon.spy()

      success = sinon.spy()
      onerror = sinon.spy()

      loader = new ScriptLoader()
      loader.appendScript = appendScript
    })

    describe('when resolver gets called', () => {
      beforeEach(() => {
        resolver = loader.promiseFunction(options, asyncrouns, callback)
        resolver(resolve, reject)
      })

      it('should call appendScript with options param', () => {
        expect(appendScript).to.have.been.calledWith(options)
      })
    })

    describe('when script runs and will either succeed or fail', () => {
      let boolean

      beforeEach(() => {
        loader.appendScript = (options, successCallback, failureCallback) => {
          if (boolean) {
            successCallback()
          } else {
            failureCallback()
          }
        }
        resolver = loader.promiseFunction(options, callback)
      })

      describe('when it succeeds', () => {
        beforeEach(() => {
          boolean = true
          resolver(resolve, reject)
        })

        it('should call the callback', () => {
          expect(callback).to.have.been.called
        })

        it('should call the resolve function', () => {
          expect(resolve).to.have.been.called
        })
      })

      describe('when it fails', () => {
        beforeEach(() => {
          boolean = false
          resolver(resolve, reject)
        })

        it('should not have called the callback', () => {
          expect(callback).to.have.not.been.called
        })

        it('should have called the reject function', () => {
          expect(reject).to.have.been.called
        })
      })
    })
  })
})