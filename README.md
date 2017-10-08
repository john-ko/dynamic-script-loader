# Script Loader
a script loader for modular components

# Usage
simple

```
const script = new ScriptLoader()
script.load('//path/to/someExternalJS.js', function oneTimeSetUp () {
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
  // 
})
.catch(() => {
  // 
})
```

or instead of `once` maybe `setup` ?
