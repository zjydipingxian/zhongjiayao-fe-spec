import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ZhongJiaYao',
  description: '前端工程化 简单版',
  base: '/zhongjiayao-fe-spec/',
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
            text: 'Node 编码规范',
            link: '/coding/node',
          },
          {
            text: 'Typescript 编码规范',
            link: '/coding/typescript',
          },
        ],
      },
      {
        text: 'NPM包',
        items: [
          {
            text: 'commitlint-config-encode',
            link: '/npm/commitlint-config',
          },
          {
            text: 'markdownlint-config-encode',
            link: '/npm/markdownlint-config',
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
            text: 'Node 编码规范',
            link: '/coding/node',
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
            text: 'commitlint-config-encode',
            link: '/npm/commitlint-config',
          },
          {
            text: 'markdownlint-config-encode',
            link: '/npm/markdownlint-config',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
