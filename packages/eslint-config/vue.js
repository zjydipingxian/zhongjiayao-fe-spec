module.exports = {
  extends: ['./lib/eslint-config.js', './rules/vue.js'].map(require.resolve),
  parserOptions: {
    // https://github.com/mysticatea/vue-eslint-parser#parseroptionsparser
    parser: '@babel/eslint-parser',
  },
}
