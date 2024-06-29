---
title: HTML 编码规范
tags:
  - 编码规范
author:
  name: ZhongJiaYao
---

# `@zhongjiayao/commitlint-config`

> Git 提交规范

支持配套的 [commitlint 配置](https://commitlint.js.org/#/concepts-shareable-config)，用于对 `git commit message` 进行校验。

## 安装

使用时，需要安装 [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)：

:::code-group

```sh [安装 PNPM]
pnpm install @zhongjiayao/commitlint-config @commitlint/cli --save-dev
```

```sh [安装 npm]
npm install @zhongjiayao/commitlint-config @commitlint/cli --save-dev
```

:::

## 使用

在 `commitlint.config.js` 中集成本包:

```javascript
module.exports = {
  extends: ['@zhongjiayao/commitlint-config'],
}
```

## 设置 git hook

可通过 [husky](https://www.npmjs.com/package/husky) 设置在 `git commit` 时触发 `commitlint`。

- 首先安装 husky：

:::code-group

```sh [安装 PNPM]
pnpm install husky --save-dev
```

```sh [安装 npm]
npm install husky --save-dev
```

:::

然后执行添加`commit-msg`:

:::code-group

```sh [安装 PNPM]
pnpm husky add .husky/commit-msg 'npx commitlint --edit $1'
```

```sh [安装 npm]
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

:::

更多信息可参考 [commitlint 文档](https://commitlint.js.org/#/guides-local-setup?id=install-husky)。

- 再安装 cz-commitlint 触发 commit 自动提示：如下

:::code-group

```sh [安装 PNPM]
pnpm install --save-dev @commitlint/cz-commitlint commitizen
```

```sh [安装 npm]
npm install --save-dev @commitlint/cz-commitlint commitizen
```

:::

```js
{
  "scripts": {
    "commit": "git-cz"
  },
  // 理论上这个可以不写， 以及集成在 @zhongjiayao/commitlint-config
  "config": {
    "commitizen": {
      "path": "cz-git"
    }
  }
}
```
