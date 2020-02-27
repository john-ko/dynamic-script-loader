const scriptLoader = {}

export function getNewScript (options) {
  const script = document.createElement('script')
  script.type = 'text/javascript'

  if (options.async !== false) {
    options.async = true
  }

  if (options.defer !== false) {
    options.defer = true
  }

  Object.entries(options).forEach(([key, value]) => {
    if (value) {
      script.setAttribute(key, value)
    }
  })

  return script
}

export function createPromise (options) {
  return new Promise((resolve, reject) => {
    // append script to head
    appendScript(options, resolve, reject)
  })
}

export function appendScript (options, success, failure) {
  const script = getNewScript(options)

  script.onload = success
  script.onerror = failure

  document.head.appendChild(script)
}

export function getScriptLoader () {
  return scriptLoader
}

/**
 * usual signature
 * options = {
 *  src: '//www.example.com/asdf.js', // required
 *  crossorigin: true, // anything you want to add to the script tag
 *  async: true, // by default,
 *  defer: true, // by default,
 * }
 *
 * onLoadHandler = function, will only execute once on load
 * orErrorHandler = function,  will only execute once on error
 *
 * return Promise (resolves when the script is loaded, rejects when the script errors)
 */
export default function (
  options,
  onLoadHandler = () => {},
  orErrorHandler = () => {}
) {
  if (typeof window !== 'object') {
    return Promise.reject('sorry bro client side only')
  }

  // window.scriptLoader = window.scriptLoader || Object.create(null)

  const src = options.src || ''

  if (!src) {
    return Promise.reject('src must be set!')
  }

  // create a promise that will return when resolved
  if (!scriptLoader[src]) {
    scriptLoader[src] = createPromise(options)
      .then(onLoadHandler)
      .catch(orErrorHandler)
  }

  // return promise
  return scriptLoader[src]
}
