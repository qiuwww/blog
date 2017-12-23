// webpack.config.dev.js
// 开发模式
const devConfig = require('./webpack.config.js'); // 开发模式基于prod（base）
const path = require('path');
const webpack = require('webpack');
const ExtracTextPlugin = require('extract-text-webpack-plugin');
const opn = require('opn');

devConfig.plugins.push(
	new webpack.HotModuleReplacePlugin()
);

devConfig.plugins.push(
	new ExtracTextPlugin({
		filename: 'style.css', // 必须配置的文件名，插入到html中的
		disable: true // 不生成
	})
);

devConfig.devtool = 'source-map';

devConfig.devServer = {
	contentBase: path.resolve('./'),
	hot: true,
	inline: true,
	port: 3000,
	proxy: { // 只是代理js，对应的css，直接带入
		'/thsft/js/': 'http://127.0.0.1:3000'
		'**': 'http://172.19.80.62.81/'
	}
}
opn('http://127.0.0.1:3000');

modules.exports = devConfig;