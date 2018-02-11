const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
// 读取同一目录下的 base config
const config = require('./webpack.base.config');
 
config.module.rules.push(
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract(
      {
        use: [
          'css-loader',
          'less-loader'
        ],
        fallback: 'style-loader'
      }
    ),
    exclude: /node_modules/
  }
);
 
config.plugins.push(
  // 官方文档推荐使用下面的插件确保 NODE_ENV
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }),
  // 启动 minify
  new webpack.LoaderOptionsPlugin({ minimize: true }),
  // 抽取 CSS 文件
  new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true,
    ignoreOrder: true
  })
);
 
module.exports = config;