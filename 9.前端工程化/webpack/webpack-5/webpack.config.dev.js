const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const webpack = require('webpack');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    publicPath: '/', // 通常是CDN地址
  },
  devServer: {
    port: '3000',
    // stats: "errors-only",
    //有服务端，不使用代理来处理，在服务端中启用webpack，端口使用服务端端口
    //模拟数据
    // before(app){
    //     apiMocker(app, path.resolve('./mock/mocker.js'))
    //     // app.get('/user', (req, res) => {
    //     //     res.json({name: '刘小夕'});
    //     // })
    // }
    // proxy: {
    //     "/api": "http://localhost:4000"
    // }
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DEV: JSON.stringify('development'), //字符串
      FLAG: 'true', //FLAG 是个布尔类型
    }),
  ],
});
