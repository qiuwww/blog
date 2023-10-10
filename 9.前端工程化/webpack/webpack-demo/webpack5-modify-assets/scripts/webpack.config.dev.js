const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: '3000',
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});
