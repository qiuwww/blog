const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: './',
  },
  devtool: 'source-map',
});
