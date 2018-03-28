// webpack.config.dev.js
// 开发模式
const devConfig = require('./webpack.config.js'); // 开发模式基于prod（base）
const path = require('path');
const webpack = require('webpack');
const ExtracTextPlugin = require('extract-text-webpack-plugin');
const opn = require('opn');
const serverMock = require("./server-mock.js");

devConfig.plugins.push(
	new webpack.HotModuleReplacementPlugin()
);

devConfig.plugins.push(
	new ExtracTextPlugin({
		filename: 'style.css', // 必须配置的文件名，插入到html中的
		disable: true // 不生成
	})
);

devConfig.devtool = 'source-map';

devConfig.devServer = {
	// 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
	contentBase: path.join(__dirname, "dist"),
	hot: true,
	inline: true,
	port: 3003,
	proxy: { // 只是代理js，对应的css，直接带入
		'/js/webpack-config/vendor.js': 'http://127.0.0.1:3003',
		'/js/webpack-config/index.js': 'http://127.0.0.1:3003'
	}
}
if (true) {
	serverMock();
}
opn('http://127.0.0.1:3003').then(function () {
	console.log('http://127.0.0.1:3003');
});

module.exports = devConfig;
