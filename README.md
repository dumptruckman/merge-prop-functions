# Merge Prop Functions
`merge-prop-functions` is a simple utility for merging two functions
that produce React props objects into a single function. Any function
props will be merged into a single function that calls both functions.

## Installation
Install `merge-prop-functions` as a dependency
```bash
# Yarn
$ yarn add merge-prop-functions

# NPM
$ npm install merge-prop-functions
```

## Usage
Usage is simple.
```js
var newPropsFunc = mergeProps(originalPropsFunc, additionalPropsFunc);
```
