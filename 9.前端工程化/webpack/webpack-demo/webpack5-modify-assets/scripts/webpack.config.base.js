const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const PluginModify = require('./plugin-modify');

module.exports = {
  entry: {
    index: './src/index.js',
    modifyByLoader: './src/modify-by-loader.js',
    modifyByLoader2: './src/modify-by-loader2.js',
    modifyByPlugin: './src/modify-by-plugin.js',
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash:6].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: path.resolve(__dirname, './loader-modify.js'),
            options: {
              appId: '123456',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      chunks: ['index', 'modifyByLoader', 'modifyByLoader2', 'modifyByPlugin'],
    }),

    new PluginModify({
      appid: '123456',
    }),
  ],
};
