import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ZhongJiaYao',
  description: '前端工程化 简单版',
  base: '/zhongjiayao-fe-spec/',
  head: [
    [
      'script',
      {
        charset: 'UTF-8',
        id: 'LA_COLLECT',
        src: '//sdk.51.la/js-sdk-pro.min.js',
      },
    ],
    [
      'script',
      {},
      `
      LA.init({id:"3Jx5jPuPSYftx1ly",ck:"3Jx5jPuPSYftx1ly",autoTrack:true,hashMode:true})
     
      `,
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '编码规范',
        items: [
          { text: 'HTML 编码规范', link: '/coding/html.md' },
          { text: 'CSS 编码规范', link: '/coding/css.md' },
          { text: 'JavaScript 编码规范', link: '/coding/javascript.md' },
          { text: 'Typescript 编码规范', link: '/coding/typescript.md' },
        ],
      },

      {
        text: '工程规范',
        items: [
          {
            text: 'Git 规范',
            link: '/engineering/git',
          },
          {
            text: '文档规范',
            link: '/engineering/doc',
          },
          {
            text: 'CHANGELOG 规范',
            link: '/engineering/changelog',
          },
        ],
      },

      {
        text: 'NPM包',
        items: [
          {
            text: 'commitlint-config-code',
            link: '/npm/commitlint-config',
          },
          {
            text: 'markdownlint-config-code',
            link: '/npm/markdownlint-config',
          },
          {
            text: 'stylelint-config-code',
            link: '/npm/stylelint-config',
          },
          {
            text: 'eslint-config-code',
            link: '/npm/eslint-config',
          },
          {
            text: 'eslint-plugin',
            link: '/npm/eslint-plugin',
          },
        ],
      },

      {
        text: '脚手架',
        items: [
          {
            text: 'encode-lint-cli',
            link: '/cli/encode-lint-cli',
          },
        ],
      },
    ],

    sidebar: [
      {
        text: '编码规范',
        items: [
          {
            text: 'HTML 编码规范',
            link: '/coding/html',
          },
          {
            text: 'CSS 编码规范',
            link: '/coding/css',
          },
          {
            text: 'JavaScript 编码规范',
            link: '/coding/javascript',
          },
          {
            text: 'Typescript 编码规范',
            link: '/coding/typescript',
          },
        ],
      },

      {
        text: '工程规范',
        items: [
          {
            text: 'Git 规范',
            link: '/engineering/git',
          },
          {
            text: '文档规范',
            link: '/engineering/doc',
          },
          {
            text: 'CHANGELOG 规范',
            link: '/engineering/changelog',
          },
        ],
      },

      {
        text: 'NPM包',
        items: [
          {
            text: 'commitlint-config',
            link: '/npm/commitlint-config',
          },
          {
            text: 'markdownlint-config',
            link: '/npm/markdownlint-config',
          },
          {
            text: 'stylelint-config',
            link: '/npm/stylelint-config',
          },
          {
            text: 'eslint-config',
            link: '/npm/eslint-config',
          },
          {
            text: 'eslint-plugin',
            link: '/npm/eslint-plugin',
          },
        ],
      },

      {
        text: '脚手架',
        items: [
          {
            text: 'encode-lint-cli',
            link: '/cli/encode-lint-cli',
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zjydipingxian/zhongjiayao-fe-spec',
      },
    ],
  },
})
