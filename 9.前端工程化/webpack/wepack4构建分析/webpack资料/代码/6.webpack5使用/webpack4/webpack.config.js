const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build')
  },
  mode: 'production'
};
