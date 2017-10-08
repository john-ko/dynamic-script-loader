[![Coverage Status](https://coveralls.io/repos/github/john-ko/script-loader/badge.svg?branch=master)](https://coveralls.io/github/john-ko/script-loader?branch=master)
[![Build Status](https://travis-ci.org/john-ko/dynamic-script-loader.svg?branch=master)](https://travis-ci.org/john-ko/dynamic-script-loader)


# Script Loader
a script loader for modular components in es6 (build process coming soon)
this is built with each components being responsible for what 3rd party dependencies they need

# Usage
simple

```
const ScriptLoader = require('dynamic-script-loader')
const script = new ScriptLoader()

script.load({
  src: '//path/to/someExternalJS.js',
  async: true,  // default to true, you can leave this out
}), function oneTimeSetUp () {
  // window.someExternalJS setup here
})
  .then(function externalJSSuccessResolver () {
    // this runs after one time setup
  })
  .catch(function scriptDidntLoad () {
    console.log(':(')
  })
```

## Vue
creating a vue wrapper for 3rd party libraries

heres a couple of ways you can use the script loader

### using it as a method
```
import ScriptLoader from 'dynamic-script-loader'

Vue.use({
  install: function (Vue, options) {
    Vue.prototype.$loader = new ScriptLoader()
  }
})

// inside a Vue component
data () {
  return {
    message: '',
    error: ''
  }
},

mounted () {
  // loader.load sounds weird... rename?
  this.$loader.load({
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

# TODO
- build process and export to dist folder

would like to use this as

```
script.load('//path/to/someExternalJS.js')
  .once(() => {
    // one time setup
  })
  .then(() => {
    // success! :D
  })
  .catch(() => {
    // failure! D:
  })
```

or instead of `once` maybe `setup` ?
