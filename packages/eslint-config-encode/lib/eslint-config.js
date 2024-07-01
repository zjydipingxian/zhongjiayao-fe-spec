module.exports = {
  root: true,
  extends: [
    '../rules/base/best-practices',
    '../rules/base/possible-errors',
    '../rules/base/style',
    '../rules/base/variables',
    '../rules/base/es6',
    '../rules/base/strict',
    '../rules/imports',
  ].map(require.resolve),
  parser: '@babel/eslint-parser', // 解析器
  parserOptions: {
    requireConfigFile: false, // 禁用配置文件检查
    ecmaVersion: 'latest', // 支持的 ECMAScript 版本可以是任何年份（即 2022）或版本（即 5）。对于最新支持的版本，设置为 "latest"。（默认："latest"）
    sourceType: 'module', // ECMAScript 模块 (ESM) 和 "commonjs" 用于 CommonJS 文件。（默认："module" 用于 .js 和 .mjs 文件；"commonjs" 用于 .cjs 文件）
    // 一个对象，指示你要使用哪些附加语言功能
    ecmaFeatures: {
      globalReturn: false, // 表示不允许在全局作用域中使用return语句
      impliedStrict: true, // 表示在没有使用"use strict"的情况下，也采用严格模式。
      jsx: true, // 表示支持JSX语法。
    },
  },
}
