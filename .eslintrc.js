// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    // 'plugin:jest/recommended',
  ],
  plugins: ['prettier', 'import'],
  rules: {
    'import/no-default-export': 1,
    'space-before-function-paren': 0,
    'generator-star-spacing': 0,
    'jest/expect-expect': 0,
  },
}
