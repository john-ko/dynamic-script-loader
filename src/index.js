import createPromise from './createPromise'

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

  // Gloable namespace to prevent mismatch with different versions
  window.dynamicScriptLoader = window.dynamicScriptLoader || Object.create(null)

  const src = options.src || ''

  if (!src) {
    return Promise.reject('src must be set!')
  }

  // create a promise that will return when resolved
  if (!window.dynamicScriptLoader[src]) {
    window.dynamicScriptLoader[src] = createPromise(options)
      .then(onLoadHandler)
      .catch(orErrorHandler)
  }

  // return promise
  return window.dynamicScriptLoader[src]
}
