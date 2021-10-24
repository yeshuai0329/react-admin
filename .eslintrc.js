module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    semi: ['error', 'never'],
    'no-var': 0, // 禁用var，用let和const代替
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'react/prop-types': 0, // 防止在react组件定义中缺少props验证
    'no-new': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/display-name': [0],
    'max-len': ['error', { code: 140 }]
  }
}
