import getNewScript from './getNewScript'

/**
 * appendScript
 * attaches onload and onerror methods to the HTMLScriptElement
 * and places in the HEAD of the document
 *
 * @param {Object} options
 * @param {Function} success
 * @param {Function} failure
 */
export default function appendScript (options = {}, success, failure) {
  const script = getNewScript(options)

  script.onload = success
  script.onerror = failure

  document.head.appendChild(script)
}