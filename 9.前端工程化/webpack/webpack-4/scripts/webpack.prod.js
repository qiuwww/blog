const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');
const webpack = require('webpack');

// 压缩插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 压缩css，需要单独的包
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// src下其他的文件直接复制到dist目录下
const CopyWebpackPlugin = require('copy-webpack-plugin');
const prodConfig = merge(base, {
  // mode: 'production',
  devtool: 'eval-source-map',
  // optimization: {
  // 压缩js，打包的时候去掉console.log 与 debugger
  // minimizer: [
  //   new UglifyJsPlugin({
  //     uglifyOptions: {
  //       // 缓存，并行，提高打包速度
  //       cache: true,
  //       parallel: true,
  //       warnings: false,
  //       ie8: false,
  //       compress: true,
  //       output: {
  //         comments: false,
  //       },
  //     }
  //   })
  // ]
  // },
  plugins: [
    // 打包前清理源目录文件
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false,
    }),
    // src下其他的文件直接复制到dist目录下
    new CopyWebpackPlugin([
      {
        from: 'src/assets/favicon.ico',
        to: 'favicon.ico',
      },
    ]),
    // new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin({
      'process.env.ENV': '"prod"',
      __DEV__: '"hahahahahaha"',
      // "process.env": require("../config/dev.env")
      // "process.env.BASE_URL": '"' + process.env.BASE_URL + '"'
    }),
  ],
});
console.log('prodConfig:', prodConfig);
module.exports = prodConfig;
