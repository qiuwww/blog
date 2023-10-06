const { defineConfig } = require('@vue/cli-service');
const MyModifyOutput = require('./plugins/MyModifyOutput/index.js');
// https://cli.vuejs.org/zh/config/#vue-config-js

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  // configureWebpack 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {
    plugins: [new MyModifyOutput()],
  },
});
