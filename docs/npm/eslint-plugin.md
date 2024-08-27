# null-eslint-plugin

> eslint 插件

## 安装

除了本包，你需要同时安装 [ESlint](https://eslint.org/)

```shell
$ npm install null-eslint-plugin eslint --save-dev
```

## 使用

### 引入插件

```js
// eslint.config.js
const eslintPluginNull = require('null-eslint-plugin')
module.exports = {
  plugins: { eslintPluginNull },
  rules: {
    'eslintPluginNull/no-http-url': 'error',
    'eslintPluginNull/no-secret-info': 'error',
  },
}

var test = 'http://baidu.com' // error  Recommended "http://chenghuai.com" switch to HTTPS

var accessKeySecret = 'xxxx' //  Detect that the "xxxx" might be a secret token, Please check!

var client = {
  accessKeyToken: 'xxxx',
}

// npx eslint 文件地址
```

## 支持的规则

- [`no-http-url`](https://github.com/zjydipingxian/zhongjiayao-fe-spec/blob/master/packages/eslint-plugin/rules/no-http-url.js) 使用 HTTPS 协议头的 URL，而不是 HTTP
- [`no-secret-info`](https://github.com/zjydipingxian/zhongjiayao-fe-spec/blob/master/packages/eslint-plugin/rules/no-secret-info.js) 不要在代码中直接设置 `password` `token` and `secret` 信息
