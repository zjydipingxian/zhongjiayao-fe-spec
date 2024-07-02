// 建议 将 http 转为 https

const RULE_NAME = 'no-http-url'

module.exports = {
  name: RULE_NAME,
  meta: {
    name: RULE_NAME,
    type: 'suggestion', // 规则是确定可以以更好的方式完成的事情，但如果不更改代码就不会发生错误
    // (string)如果 命令行 上的 --fix 选项自动修复规则报告的问题，则为 "code" 或 "whitespace"。
    // eslint-disable-next-line max-len
    fixable: null, // 对于可修复规则，fixable 属性是强制性的。如果未指定此属性，ESLint 将在规则尝试生成修复时抛出错误。如果规则不可修复，则省略 fixable 属性。
    messages: {
      noHttpUrl: 'Recommended "{{url}}" switch to HTTPS', // 错误信息 建议 切换到 https
    },
  },
  create(context) {
    return {
      Literal: function handleRequires(node) {
        // 查看 是不是 http： 开头
        if (
          node.value &&
          typeof node.value === 'string' &&
          node.value.indexOf('http:') === 0
        ) {
          context.report({
            node,
            messageId: 'noHttpUrl',
            data: {
              url: node.value,
            },
          })
        }
      },
    }
  },
}
