// .eslintrc.js

// https://eslint.org/docs/user-guide/configuring
module.exports = {
  // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  parserOptions: {
    // 对Babel解析器的包装使其与 ESLint 兼容。
    parser: 'babel-eslint',
  },
  //可配置全局变量
  globals: {},
  env: {
    // 浏览器环境中的全局变量
    browser: true,
    // Node.js 全局变量和 Node.js 作用域
    node: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // 扩展一个流行的风格指南，即 eslint-config-standard
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off', // 取消generator 函数中 * 号周围使用一致空格的规则
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁用debugger
    semi: ['error', 'always'], //必须使用分号
  },
};
