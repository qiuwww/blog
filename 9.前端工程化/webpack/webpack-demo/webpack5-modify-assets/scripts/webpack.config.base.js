const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const PluginModify = require('./plugin-modify');

module.exports = {
  entry: {
    index: './src/index.js',
    ast: './src/ast.js',
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
            options: {},
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      chunks: ['index', 'ast', 'modifyByPlugin'],
    }),

    new PluginModify({
      appid: '123456',
    }),
  ],
};
