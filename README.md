[![Coverage Status](https://coveralls.io/repos/github/john-ko/script-loader/badge.svg?branch=master)](https://coveralls.io/github/john-ko/script-loader?branch=master)
[![Build Status](https://travis-ci.org/john-ko/script-loader.svg?branch=master)](https://travis-ci.org/john-ko/script-loader)


# Script Loader
a script loader for modular components

# Usage
simple

```
const script = new ScriptLoader()
script.load({
  src: '//path/to/someExternalJS.js',
  async: true,
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

# TODO
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
