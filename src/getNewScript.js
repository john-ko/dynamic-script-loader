/**
 * getNewScript
 * returns a new HTMLScriptElement
 * with options key values set as attriubutes
 *
 * example options object
 * options = {
 *  src: '//www.example.com/asdf.js', // required
 *  crossorigin: true, // anything you want to add to the script tag
 *  async: true, // by default,
 *  defer: true, // by default,
 * }
 * @param {Object} options
 * @returns {HTMLScriptElement} script
 */
export default function getNewScript (options = {}) {
  const script = document.createElement('script')
  script.type = 'text/javascript'

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