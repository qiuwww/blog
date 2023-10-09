const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const isDev = process.env.NODE_ENV === 'development';
const config = require('./config.env')[isDev ? 'dev' : 'build'];

console.log('config', config);

module.exports = {
  entry: {
    index: './src/index.js',
    // login: './src/login.js',
    jquery: './src/jquery/index.js',
    vue: './src/vue/main.js',
    react: './src/react/main.js',
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash:6].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     hmr: isDev,
          //     reloadAll: true,
          //   },
          // },
          'style-loader',
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

      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      chunks: ['index', 'jquery', 'vue', 'react'],
      config: config.template,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'public/js/*.js',
    //       to: path.resolve(__dirname, 'dist', './'),
    //       // flatten: true,
    //       globOptions: {
    //         ignore: ['other.js'],
    //       },
    //     },
    //   ],
    // }),
    // new webpack.ProvidePlugin({
    //   _map: ['lodash', 'map'],
    //   Vue: ['vue/dist/vue.esm.js', 'default'],
    //   $: 'jquery',
    //   React: 'react',
    // }),
    // ...plugins,

    new webpack.ProvidePlugin({
      $: 'jquery',
    }),

    new VueLoaderPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.json', '.css', '.html', '.ts', '.vue', '.jsx', '.tsx'],
  },
};
