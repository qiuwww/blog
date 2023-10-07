const { defineConfig } = require('@vue/cli-service');
const MyModifyOutput = require('./plugins/MyModifyOutput/index.js');
const MyModifyOutput2 = require('./plugins/MyModifyOutput2/index.js');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // configureWebpack 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {
    plugins: [
      new MyModifyOutput(),
      // new MyModifyOutput2(),
    ],
  },
});
