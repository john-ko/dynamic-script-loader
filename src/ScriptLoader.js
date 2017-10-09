
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
   *   
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
   * @param  {[type]}  src        [description]
   * @param  {Boolean} asyncronus [description]
   * @param  {[type]}  success    [description]
   * @param  {[type]}  failure    [description]
   * @return {[type]}             [description]
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

  hasScriptBeenLoaded (src) {
    return this.scripts[src]
  }

  setScript (src) {
    this.scripts[src] = true
  }

  getScriptLoaderPromise (src, asyncronus, callback) {
    return new Promise(this.promiseFunction(src, asyncronus, callback))
  }

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

