const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const config = require('./config')[isDev ? 'dev' : 'build'];

module.exports = {
  // mode: string = 'production': 'none' | 'development' | 'production'
  mode: 'development',
  // https://webpack.docschina.org/concepts/entry-points/
  // entry: { <entryChunkName> string | [string] } | {}
  entry: {
    react: './react/index.js',
    vue: './vue/index.js',
    jquery: './jquery/index.js',

    // 这样你就可以在 vendor.js 中存入未做修改的必要 library 或文件（例如 Bootstrap, jQuery, 图片等），然后将它们打包在一起成为单独的 chunk。内容哈希保持不变，这使浏览器可以独立地缓存它们，从而减少了加载时间。
    // vendor: './src/vendor.js',
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', // 打包后的文件名
      config: config.template,
      chunks: ['vue', 'jquery', 'react'],
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    port: 8888, // 第三部分会使用 portfinder 自动获取可用端口号
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
  },
};
