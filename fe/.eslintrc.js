// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "space-before-function-paren": [
      2,
      "never"
    ],
    "no-cond-assign": [2],
    "no-constant-condition": [2],
    "no-control-regex": [2],
    "no-debugger": [2],
    "no-dupe-args": [2],
    "no-dupe-keys": [2],
    "no-duplicate-case": [2],
    "no-empty-character-class": [2],
    "no-empty": [2],
    "no-ex-assign": [2],
    "no-extra-boolean-cast": [2],
    "no-func-assign": [2],
    "no-inner-declarations": [2],
    "no-invalid-regexp": [2],
    "no-irregular-whitespace": [2],
    "no-negated-in-lhs": [2],
    "no-obj-calls": [2],
    "no-regex-spaces": [2],
    "no-sparse-arrays": [2],
    "no-unexpected-multiline": [2],
    "no-unreachable": [2],
    "use-isnan": [2],
    "no-octal": [2],
    "no-empty-pattern": [2],
    "no-multi-spaces": [2],
    "no-unused-labels": [1],
    "no-void": [2],
    "semi": [2, "always"],
    "quotes": [2, "single"],
    "strict": [2, "safe"],
    "dot-location": [2, "property"],
    "no-label-var": [2],
    "no-shadow-restricted-names": [2],
    "no-undef": [2],
    "init-declarations": [2, "always"],
    "no-catch-shadow": [2],
    "no-delete-var": [2],
    "constructor-super": [1],
    "no-const-assign": [2],
    "no-dupe-class-members": [2],
    "no-new-symbol": [2],
    "no-this-before-super": [2],
    "no-class-assign": [2]
  }
}
