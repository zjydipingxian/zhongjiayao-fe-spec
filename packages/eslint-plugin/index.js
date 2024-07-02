const path = require('path')
const requireAll = require('require-all')

// 插件是一个 JavaScript 对象，它向 ESLint 公开某些属性：

// 1 .meta - 有关插件的信息。

// 2. configs - 包含命名配置的对象。

// 3. rules - 包含自定义规则定义的对象。

// 3. processors - 包含命名处理器的对象。

exports.rules = requireAll({
  dirname: path.join(__dirname, 'rules'),
})

exports.configs = requireAll({
  dirname: path.resolve(__dirname, 'configs'),
})

exports.processors = {
  '.json': {
    preprocess(text) {
      // 转为js文件
      return [`module.exports = ${text}`]
    },
  },
}
