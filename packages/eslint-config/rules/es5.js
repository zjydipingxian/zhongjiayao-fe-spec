/**
 * 本文件用于覆盖掉个别 ES5 与 ES6 不同的规则
 *
 * v8.53.0 被弃用了
 */

module.exports = {
  rules: {
    // 逗号风格 - ES5 中不加最后一个逗号
    // @unessential
    'comma-dangle': ['error', 'never'],
  },
}
