module.exports = {
  extends: ['../lib/eslint-config', '../rules/typescript'].map(require.resolve),
}
