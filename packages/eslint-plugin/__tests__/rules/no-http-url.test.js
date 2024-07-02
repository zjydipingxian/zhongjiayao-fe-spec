const rule = require('../../rules/no-http-url')
const { RuleTester } = require('eslint')

const ruleTester = new RuleTester()
// https://eslint.nodejs.cn/docs/latest/integrate/nodejs-api#ruletester
ruleTester.run('no-http-url', rule, {
  valid: [
    {
      code: "var test = 'https://baidu.com';",
    },
  ],
  invalid: [
    {
      code: "var test = 'http://baidu.com';",
      output: "var test = 'http://baidu.com';",
      errors: [
        {
          message: 'Recommended "http://baidu.com" switch to HTTPS',
        },
      ],
    },
    // jsx
    {
      code: "<a href='http://baidu.com'>test</a>",
      output: "<a href='http://baidu.com'>test</a>",
      errors: [
        {
          message: 'Recommended "http://baidu.com" switch to HTTPS',
        },
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
})
