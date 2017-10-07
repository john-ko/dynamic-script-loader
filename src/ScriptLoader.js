
export default class ScriptLoader {
  constructor () {
    this.scripts = (this.isBrowser() && window.ScriptLoader)
      ? window.ScriptLoader : {}
  }

  /**
   * isBrowser
   * @return {Boolean}
   */
  isBrowser () {
    return typeof window === 'object'
  }

  /**
   * @param  {Object}
   * @param  {Function}
   * @return {Promise}
   */
  load (options = {}, callback = () => {}) {
    if (this.scripts[options.src]) {
      return Promise.resolve()
    }

    return new Promise ((resolve, reject) => {
      this.appendScript(options.src, options.async, function success () {
        resolve(callback())
      }, function onError () {
        reject('error')
      })
    })
  }

  appendScript(src, asyncronus = true, success, failure) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    script.async = asyncronus
    script.onload = success
    script.onerror = failure
    document.head.appendChild(script)
  }
}

