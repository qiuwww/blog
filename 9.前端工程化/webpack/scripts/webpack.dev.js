const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require('webpack');
const MyPlugin = require('./MyPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 这里可以访问到cross-env注入的变量
console.log(process.env.year);

const devConfig = merge(base, {
  // mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new BundleAnalyzerPlugin(),
    // 变量会被注入到window对象上边，使用process.env.ENV访问
    // DefinePlugin 插件可以从打包运行的 node 环境 给 代码注入变量
    // [使用参考文档](https://www.jianshu.com/p/887f0454ef96)

    new webpack.DefinePlugin({
      'process.env.ENV': '"dev"',
      __DEV__: '"hahaha"',
      // "process.env": require("../config/dev.env")
      // "process.env.BASE_URL": '"' + process.env.BASE_URL + '"'
    }),
    // new MyPlugin({
    //   name: "MyPlugin"
    // })
  ],
  devServer: {
    // 启动热更新，这里不能设置，设置就报错
    // hot: true,
    inline: true,
    host: 'localhost',
    port: '1314',
    // open: true,
    // proxy： xxx,
    // 在页面上全屏输出报错信息
    overlay: {
      warnings: true,
      errors: true,
    },
    // 显示 webpack 构建进度
    progress: true,
    // dev-server 服务路径
    contentBase: false,
    publicPath: '/',
    // 服务于webpack-dev-server  内部封装了一个express
    before(app) {
      app.get('/api/test.json', (req, res) => {
        res.json({
          code: 200,
          message: 'Hello World',
        });
      });
    },
  },
});
console.log('devConfig:', devConfig);

// 测试打包速度
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(devConfig);
