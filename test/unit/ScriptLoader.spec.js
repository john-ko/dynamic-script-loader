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

        it('calls with the src param in options', () => {
          expect(loader.getScriptLoaderPromise).to.have.been.calledWith(options.src)
        })

        it('calls with the async param in options', () => {
          expect(loader.getScriptLoaderPromise).to.have.been.calledWith(options.src, options.async)
        })

        it('calls with the callback param', () => {
          expect(loader.getScriptLoaderPromise).to.have.been.calledWith(options.src, options.async, callback)
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
    let src, async, success, failure

    beforeEach(() => {
      global.document = {
        createElement: sinon.stub(),
        head: {
          appendChild: sinon.stub()
        }
      }
      document.createElement.returns({})
      loader = new ScriptLoader()
      src = sinon.spy()
      async = sinon.spy()
      success = sinon.spy()
      failure = sinon.spy()
      loader.appendScript(src, async, success, failure)
    })

    it('calls document.createElement with script', () => {
      expect(document.createElement).to.have.been.calledWithExactly('script')
    })

    it('appends the script inside the head tag', () => {
      expect(document.head.appendChild).to.have.been.calledWithExactly({
        type: 'text/javascript',
        src: src,
        async: async,
        onload: success,
        onerror: failure
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

    it('asdf', () => {
      
    })
  })
})