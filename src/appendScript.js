import getNewScript from './getNewScript'

export default function appendScript (options = {}, success, failure) {
  const script = getNewScript(options)

  script.onload = success
  script.onerror = failure

  document.head.appendChild(script)
}