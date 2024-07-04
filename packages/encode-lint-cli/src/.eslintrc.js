module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint', // 添加TypeScript ESLint插件
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-require-imports': 0,
    'no-console': 0,
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
