const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(baseConfig, {
  output: {
    // 这里设置为/，本地开发才能生效，才会走HtmlWebpackPlugin
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    client: {
      progress: true,
    },
    // port: '3000', // auto
    port: 'auto', // auto
    hot: true,
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
      DEV: JSON.stringify('development'), // 字符串
      FLAG: JSON.stringify(true), // FLAG 是个布尔类型
    }),
  ],
});
