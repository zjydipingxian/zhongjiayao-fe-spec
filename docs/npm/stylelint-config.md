---
title: 'stylelint-config-code'
tags:
  - stylelint 编码规范
author:
  name: ZhongJiaYao
---

# stylelint-config-code

支持配套的 [stylelint 可共享配置](https://stylelint.io/user-guide/configure)。

## 安装

需要先行安装

- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-config-prettier](https://www.npmjs.com/package/stylelint-config-prettier)

:::code-group

```sh [安装 PNPM]
pnpm install stylelint-config-code  stylelint stylelint-scss stylelint-config-standard stylelint-config-prettier --save-dev
```

```sh [安装 npm]
npm install stylelint-config-code  stylelint stylelint-scss stylelint-config-standard stylelint-config-prettier --save-dev
```

:::

## 作用

```js
'stylelint-config-standard', // 配置 stylelint 扩展插件
'stylelint-config-standard-scss', // 配置 stylelint scss
'stylelint-config-prettier', // 配置 stylelint 和 prettier 兼容  关闭所有不必要或可能与 Prettier 冲突的规则
```

## 使用

在 `.stylelintrc.js` 中继承本包:

```js
// 如果要在 vue 中使用 scss，需要安装 stylelint-config-recommended-vue/scss
// ！！！注意 这是 两个  stylelint-config-recommended （vue 丶 scss 包）
module.exports = {
  extends: [
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-code',
  ],

  ...
}
```
