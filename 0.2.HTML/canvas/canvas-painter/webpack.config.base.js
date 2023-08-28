const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
  entry: {
    index: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash:6].js',
    publicPath: './', // 通常是CDN地址
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin({ inject: true, template: './public/index.html', chunks: ['index'] })],

  resolve: {
    extensions: ['.js', '.json', '.css', '.html'],
  },
};
