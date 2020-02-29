export default function getNewScript (options = {}) {
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