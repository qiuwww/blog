

const Mock = require('mockjs');
// serverMock
const express = require('express');
const opn = require('opn');

module.exports = function(){
var app = express();

// 拦截fetch，mock, 可以
app.get('/express/getdata', function (req, res){
    res.header('Access-Control-Allow-Origin', '*');
	// 同样
	var data = Mock.mock({
		'fetch-2': '@cname',
		'list|1-2': [{
		        // 属性 id 是一个自增数，起始值为 1，每次增 1
		        'id|+1': 1, // 添加索引
		        'name'	   : '@cname',
		        'age|1-100': 100,
		        'color'	   : '@color',
		        'hehe'     : '@name',
		        'index|+1' : 1,
		        'index_name|5-10' : '@string',
		        'new_value|50000-60000' : 1,
		    	// 后边的是控制小数点位数的
		    	'x|-20-50.1-10': 50,
		    	'y|-20-30.1-10': 30,
		    	'name': '@cname',
		    	'jc': '@string',
		    	'zdf|1-100.2': 100,
		    	'zcb|1-200.2': 200,
		    	'q5|5000-10000': 10000,
		    	'q10|2000-5000': 5000,
		    	'q20|1000-2000': 2000
		    }]
	})
	var jsonObj = JSON.stringify(data, null, 4);
	setTimeout(function() {
		res.send(jsonObj);
	}, 500);
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;	
	console.log('Example app listening at http://%s:%s', host, port);
});



    

}
