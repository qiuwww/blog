const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash:6].js',
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: 'plugin title',
      filename: 'index.html',
      template: './public/index.html',
      chunks: ['index'],
    }),
  ],

  resolve: {
    extensions: ['.js', '.json', '.css', '.html'],
  },
};
