

const Mock = require('mockjs');
// serverMock
const express = require('express');
const opn = require('opn');

module.exports = function () {
	var app = express();

	// 拦截fetch，mock, 可以
	app.get('/express/getdata', function (req, res) {
		res.header('Access-Control-Allow-Origin', '*');
		// 同样
		var data = Mock.mock({
			'datafrom': 'express',
			'data|10-20': [{
				'id|+1': 1,
				'name': '@cname'
			}]
		});

		var jsonObj = JSON.stringify(data);

		setTimeout(function () {
			res.send(jsonObj);
		}, 500);

	});

	var server = app.listen(3000, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('Example app listening at http://%s:%s', host, port);
	});
}
