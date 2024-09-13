/* eslint-env node */
module.exports = {
  defaultSeverity: 'warning',
  extends: [
    'stylelint-config-standard', // 配置 stylelint 扩展插件
    'stylelint-config-html/vue', // 配置 vue 中 template
    'stylelint-config-standard-scss', // 配置 stylelint scss
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-prettier', // 配置 stylelint 和 prettier 兼容
  ],
  plugins: ['stylelint-order'],

  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],

  rules: {
    // 不允许使用无效的十六进制颜色。
    'color-no-invalid-hex': true,
    // 禁止未知的 at 规则。
    'at-rule-no-unknown': null,
    // 不允许使用空块
    'block-no-empty': null,
    // 禁止空注释
    'comment-no-empty': true,

    // 禁止重复的属性
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    // 禁止覆盖相关长手属性的速记属性
    'declaration-block-no-shorthand-property-overrides': true,
    //  不允许在字体系列中使用重复名称
    'font-family-no-duplicate-names': true,
    // 禁止在函数中 calc 禁用无效的无间隔运算符（可自动修复）
    'function-calc-no-unspaced-operator': true,
    // 禁止在关键帧声明中无效 !important 。
    'keyframe-declaration-no-important': true,
    // 禁止未知媒体功能名称
    'media-feature-name-no-unknown': true,
    // 关闭禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'no-descending-specificity': null,
    // 关闭禁止存在空的源码，即样式代码块中可以为空
    'no-empty-source': null,
    // 禁止使用未知的伪类选择器
    'selector-pseudo-class-no-unknown': [
      // 不允许使用未知的伪类选择器
      true,
      {
        // 忽略属性，对于配置在 ignorePseudoClasses 中的伪类选择器允许使用
        // 修改element默认样式的时候能使用到
        ignorePseudoClasses: ['global', 'v-deep', 'deep'],
      },
    ],
    'order/order': ['custom-properties', 'declarations'],

    // 指定样式的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
    ],
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
}
