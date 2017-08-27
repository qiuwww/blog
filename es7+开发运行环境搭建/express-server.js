// express-server.js

const path = require('path');

const express = require('express');

const app = express();

const request = require('request');

app.use(express.static('dist'));

// 被拦截了, 直接在服务端是可以使用的
// app.get('/mock', function(req, res){
//     res.send('from express-server');
// });

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'src/page/index.html'));
});
app.get('/index2', function(req, res){
    res.sendFile(path.join(__dirname, 'src/page/index2.html'));
});
// 这里的路径只能匹配到当前的文件夹下，如果需要支持的更多文件夹下，需要配置模板引擎



// 找不到文件就转发请求

// http://172.20.0.107:81
// /thsft/js/Realty/realty-js/area.js
// 没有被处理的请求会到这里
app.get('*', function(sreq, sres, snext){
	console.log(sreq.url)
	if(/^\/thsft\//.test(sreq.url)){

		sres.redirect('http://172.20.0.107:81'+ sreq.url);
		// request('http://172.20.0.107:81'+ sreq.url, function(err, res, body){
		// 	console.log(typeof res);
		// 	sres.send(res)
		// });
		// console.log("req: ", sreq.url);
	}else{
		console.log("请求得不到匹配")
	}
	snext();
});




var server = app.listen(3001, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});