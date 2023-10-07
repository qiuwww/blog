// webpack.config.js
// 生产模式
const path = require('path');
const ExtracTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const config = require('./package.json');
const projectName = config.name;
const hwp = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './'), // 输出文件的根目录
    publicPath: '/', // 访问文件的地址
    filename: 'js/' + projectName + '/[name].js', // 文件名，前面可以添加一部分路径
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css|\.styl$/,
        use: ExtracTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'stylus-loader',
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|jif)$/,
        use: [
          {
            loader: 'url-loader?limit=10000&name=images/' + projectName + '/[name].[ext]',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // 公共计算文件提取
      name: 'vendor',
      filename: 'js/' + projectName + '/vendor.js',
      minChunks: function (modules) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new ExtracTextPlugin('css/' + projectName + '/[name].css'),
    new hwp({
      template: path.resolve(__dirname, 'read.html'),
      filename: '123.html',
      chunks: [index],
    }),
  ],
  resolve: {
    extensions: ['.js', '.css', '.html', '.styl'],
  },
  externals: {
    mock: 'window.Mock',
    jquery: 'window.jQuery', // 用于文件直接页面引入，在需要使用的js中，需要 let $ = require('jquery');
  },
};
