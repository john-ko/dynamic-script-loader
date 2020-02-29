import appendScript from './appendScript'

/**
 * createPromise
 * returns a promise that is resolved/rejected when loads/fails
 * HTMLScriptElement.onerror (reject)
 * HTMLScriptElement.onload (resolve)
 *
 * @param {Object} options
 * @returns {Promise}
 */
export default function createPromise (options = {}) {
  return new Promise((resolve, reject) => {
    // append script to head
    appendScript(options, resolve, reject)
  })
}
