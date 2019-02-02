const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './test/js/index.js'),
  output: {
    path: path .resolve(__dirname, './test/dist'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    }]
  }
}
