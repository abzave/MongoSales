module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parseOptions: {
    ecmaFetures: {
      jsx: true
    },
    sourceType: "module"
  },
  plugins: [
    "react"
  ],
  rules: {
    
  }
};