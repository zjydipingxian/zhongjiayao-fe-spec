---
title: '@zhongjiayao/markdownlint-config'
tags:
  - markdownlint 编码规范
author:
  name: ZhongJiaYao
---

# @zhongjiayao/markdownlint-config-encode

支持配套的 [markdownlint 可共享配置](https://www.npmjs.com/package/markdownlint#optionsconfig)。

## 安装

需要先行安装 [markdownlint](https://www.npmjs.com/package/markdownlint)：

:::code-group

```sh [安装 PNPM]
pnpm install @zhongjiayao/commitlint-config @commitlint/cli --save-dev
```

```sh [安装 NPM]
npm install @zhongjiayao/commitlint-config @commitlint/cli --save-dev
```

:::

## 使用

在 `.markdownlint.json` 中继承本包:

```json
{
  "extends": "markdownlint-config-encode"
}
```
