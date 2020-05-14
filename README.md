[![Coverage Status](https://coveralls.io/repos/github/john-ko/dynamic-script-loader/badge.svg?branch=master)](https://coveralls.io/github/john-ko/dynamic-script-loader?branch=master)
[![Build Status](https://travis-ci.org/john-ko/dynamic-script-loader.svg?branch=master)](https://travis-ci.org/john-ko/dynamic-script-loader)
[![Maintainability](https://api.codeclimate.com/v1/badges/02c81a936fa398a32842/maintainability)](https://codeclimate.com/github/john-ko/dynamic-script-loader/maintainability)

# Script Loader
A script loader for modular components in es6 (build process coming soon). This is built so that each components being responsible for what 3rd party dependencies they need.
- if script has not been loaded, it will load  the script, and return a promise
- `onLoadHandler` and `onErrorHandler` will execute on script load and on script error
- script promise will be resolved when the script is loaded, rejects if it errors
- if a script has already been requested to load throught dynamic script loader, it will return the existing promise
- all script proimses are added to `window.dynamicScriptLoader` global object

# Install
`npm i -S dynamic-script-loader`

# Usage
simple

```
const scriptLoader = require('dynamic-script-loader')

scriptLoader({
    src: ''//path/to/someExternalJS.js'
  },
  onLoadHandler, // optional
  onErrorHandler // optional
  )
  .then(resolverFunction)
  .catch(catchFunction)
```

## Vue
creating a vue wrapper for 3rd party libraries

heres a couple of ways you can use the script loader

### using it as a method
```
import scriptLoader from 'dynamic-script-loader'

Vue.use({
  install: function (Vue, options) {
    Vue.prototype.$scriptLoader = scriptLoader
})

// inside a Vue component
data () {
  return {
    message: '',
    error: ''
  }
},

mounted () {
  // the loader will not load libraries if they have already been loaded
  this.$scriptLoader({
    src: '//some-cdn/src/js/library.js',
    async: true
  }, () => {
    // one time setup
    some3rdPartyLib.credentials('123')
    some3rdPartyLib.partyTime = true
    some3rdPartyLib.breakRandomly = Math.random() % 2 === 1
  })
    .then(() => {
      // something to run everytime this component is mounted
      this.message = some3rdPartyLib.getMessage()
    })
    .catch(() => {
      // script failed to load
      this.error = 'oops'
    })
}
```

# CAVEATS
script loading uses URL's as unique keys so if urls change by for example, query string, then the script will try to load it again.
**example:**
- urlA = `//www.example.com/script.js`
- urlB = `https://www.example.com/script.js`
- urlC = `https://www.example.com/script.js?hi`

the script loader will treat these as separate javascript files

# TODO
- use typescript!

# Contributing

- `git clone git@github.com:john-ko/dynamic-script-loader.git`
- `cd dynamic-script-loader`
- `npm install`
- `add changes`
- `npm test`
