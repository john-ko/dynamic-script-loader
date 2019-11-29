export function getNewScript (options = {}) {
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
      script[key] = value
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

  return script
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
 * callback = function
 */
export default function (options = {}, callback) {
  if (typeof window !== 'object') {
    return Promise.reject('sorry bro client side only')
  }

  window.scriptLoader = window.scriptLoader || Object.create(null)

  const src = options.src || ''

  if (!src) {
    return Promise.reject('src must be set!')
  }

  // create a promise that will return when resolved
  if (!window.scriptLoader.src) {
    window.scriptLoader.src = createPromise(options)
      .then(callback) // call the main callback first
      .catch(console.error)
  }

  // return promise
  return window.scriptLoader.src
}
