const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: './', // 通常是相对html的地址
  },
  devtool: 'source-map',
  // optimization: {
  //     //优化项
  //     minimizer: [
  //         new TerserWebpackPlugin({
  //             test: /\.js(\?.*)?$/i,
  //             cache: true, //指定cache第一次构建时会略慢
  //             parallel: 3,
  //             sourceMap: true
  //         }),
  //         new OptimizeCssPlugin()
  //     ]
  // },
  plugins: [
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']
    }),

    new OptimizeCssPlugin(),

    new webpack.DefinePlugin({
      DEV: JSON.stringify('production'), //字符串
    }),
  ],
});
