const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = require('./scripts/plugins/index.js');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./public/config')[isDev ? 'dev' : 'build'];

console.log('process.env.NODE_ENV', process.env.NODE_ENV, config);

module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js',
    ast: './src/ast.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash:6].js',
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
            loader: path.resolve(__dirname, './scripts/loader-modify.js'),
            options: {
              name: '[name]',
            },
          },
        ],
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hmr: isDev,
              // reloadAll: true,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')()];
              },
            },
          },
          'less-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|eot|ttf|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets',
              esModule: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      chunks: ['index', 'ast'],
      config: config.template,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/js/*.js',
          to: path.resolve(__dirname, 'dist', './'),
          // flatten: true,
          globOptions: {
            ignore: ['other.js'],
          },
        },
      ],
    }),
    new webpack.ProvidePlugin({
      _map: ['lodash', 'map'],
      Vue: ['vue/dist/vue.esm.js', 'default'],
      $: 'jquery',
      React: 'react',
    }),
    ...plugins,
  ],

  resolve: {
    extensions: ['.js', '.json', '.css', '.html'],
  },
};
