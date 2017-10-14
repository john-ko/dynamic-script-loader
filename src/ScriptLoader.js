
export default class ScriptLoader {
  constructor () {
    if (!this.isBrowser()) {
      this.scripts = {}
      return
    }

    this.scripts = window.ScriptLoader || {}
    window.ScriptLoader = this.scripts
  }

  /**
   * isBrowser
   * @return {Boolean}
   */
  isBrowser () {
    return typeof window === 'object'
  }

  /**
   * load
   *
   * arguments:
   *   options = {
   *     src: '//cdn/javascript/library.js'
   *     async: true
   *   }
   *
   *   callback = () => {}
   *
   * @param  {Object}
   * @param  {Function}
   * @return {Promise}
   */
  load (options = {}, callback) {
    if (this.hasScriptBeenLoaded(options.src)) {
      return Promise.resolve()
    }

    this.setScript(options.src)

    return this.getScriptLoaderPromise(options.src, options.async, callback)
  }

  /**
   * appendScript
   * @param  {String}  src
   * @param  {Boolean} asyncronus
   * @param  {Function}  success
   * @param  {Function}  failure
   */
  appendScript(src, asyncronus = true, success, failure) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    script.async = asyncronus
    script.onload = success
    script.onerror = failure
    document.head.appendChild(script)
  }

  /**
   * hasScriptBeenLoaded
   *
   * checks to see if script has already been loaded
   *
   * @param  {String}  src
   * @return {Boolean} returns either true | undefined
   */
  hasScriptBeenLoaded (src) {
    return this.scripts[src]
  }

  /**
   * setScript
   *
   * sets key (src) and value to true
   *
   * @param {String} src
   */
  setScript (src) {
    this.scripts[src] = true
  }

  /**
   * getScriptLoaderPromise
   * 
   * @param  {String}   src
   * @param  {Boolean}   asyncronus
   * @param  {Function} callback
   * @return {Promise}
   */
  getScriptLoaderPromise (src, asyncronus, callback) {
    return new Promise(this.promiseFunction(src, asyncronus, callback))
  }

  /**
   * [description]
   * @param  {String}   src
   * @param  {Boolean}   asyncronus
   * @param  {Function} callback
   * @return {Function}
   */
  promiseFunction (src, asyncronus, callback = () => {}) {
    return (resolve, reject) => {
      this.appendScript(src, asyncronus, function success () {
        resolve(callback())
      }, function onError () {
        reject('error')
      })
    }
  }

}

