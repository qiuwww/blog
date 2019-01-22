
{
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:react/recommended', 'prettier', 'prettier/react'],
  plugins: ['react', 'prettier'],
  rules: {
    // prettier 配置用于自动化格式代码
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: true,
      },
    ],
    // 一个函数的复杂性不超过 10，所有分支、循环、回调加在一起，在一个函数里不超过 10 个
    complexity: [2, 10],
    // 一个函数的嵌套不能超过 4 层，多个 for 循环，深层的 if-else，这些都是罪恶之源
    'max-depth': [2, 4],
    // 一个函数最多有 3 层 callback，使用 async/await
    'max-nested-callbacks': [2, 3],
    // 一个函数最多 5 个参数。参数太多的函数，意味着函数功能过于复杂，请拆分
    'max-params': [2, 5],
    // 一个函数最多有 50 行代码，如果超过了，请拆分之，或者精简之
    'max-statements': [2, 50],
    // 坚定的 semicolon-less 拥护者
    semi: [2, 'never'],
  },
  env: {
    browser: true,
  },
}