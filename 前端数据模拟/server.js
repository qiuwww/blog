

var express = require('express');
var path = require('path');
var opn = require('opn');
// 用于在服务端
var fetchMock = require('fetch-mock');
var Mock = require('mockjs');
// .setup({timeout: '3000'}) 一直提示不是一个函数
var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});


// 拦截fetch，mock, 可以
app.get('/api/fetch', function (req, res){
	setTimeout(function() {
		res.send(JSON.stringify(Mock.mock({'hello': '@cname'}),null, 4));
	}, 3000);	
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;	
	opn('http://127.0.0.1:' + port).then(function(){
		console.log('opn');
	});
	console.log('Example app listening at http://%s:%s', host, port);
});