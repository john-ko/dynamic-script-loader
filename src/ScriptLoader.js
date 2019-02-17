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
   *     src: '//cdn/javascript/library.js',
   *     async: true,
   *     crossorigin: 'anonymous'
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

    return new Promise(this.promiseResolver(options, callback))
  }

  /**
   * appendScript
   *
   * @param  {Object}  options    [description]
   * @param  {[type]}  success    [description]
   * @param  {[type]}  failure    [description]
   * @return {[type]}             [description]
   */
  appendScript(options, success, failure) {
    const script = document.createElement('script')
    script.type = 'text/javascript'


    if (options.async === false) {
      delete options.async
    } else {
      options.async = true
      options.defer = true
    }

    for (const key in options) {
      script[key] = options[key]
    }

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
    return this.scripts[src] === true
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
   * promiseResolver
   *
   * @param  {Object}   options
   * @param  {Function} callback
   * @return {Function}
   */
  promiseResolver (options, callback = () => {}) {
    return (resolve, reject) => {
      this.appendScript(options, () => {
        this.setScript(options.src, true)
        resolve(callback())
      }, function onError () {
        reject('error')
      })
    }
  }

}

