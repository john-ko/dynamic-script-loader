import appendScript from './appendScript'

export default function createPromise (options = {}) {
  return new Promise((resolve, reject) => {
    // append script to head
    appendScript(options, resolve, reject)
  })
}
