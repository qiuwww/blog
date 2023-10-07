const { defineConfig } = require('@vue/cli-service');
const MyModifyOutput = require('./plugins/MyModifyOutput/index.js');
const MyModifyOutput2 = require('./plugins/MyModifyOutput2/index.js');
const PluginHooksTest = require('./plugins/PluginHooksTest.js');
// https://cli.vuejs.org/zh/config/#vue-config-js
const AssetsReplacePlugin = require('./plugins/assets-replace-plugin.js');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // configureWebpack 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {
    plugins: [
      // new MyModifyOutput(),
      new MyModifyOutput2(),
      // new PluginHooksTest(),

      // 找到目标文件project.config.json，然后替换APPID为process.env.VUE_APP_MP_APPID字符串

      // new AssetsReplacePlugin({
      //   assetsName: 'js/about.js',
      //   target: /\[APPID\]/g,
      //   value: 'process.env.VUE_APP_MP_APPID',
      // }),
    ],
  },
});
