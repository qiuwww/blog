// express-server.js

const path = require('path');

const express = require('express');

const app = express();

const request = require('request');

app.use(express.static('task'));

// 被拦截了, 直接在服务端是可以使用的
// app.get('/mock', function(req, res){
//     res.send('from express-server');
// });

app.get('/', function (req, res) {
  res.sendfile('task/panorama.html');
});

// 代理文件需要next，使用res.redirect()
app.get('*', function (req, res, next) {
  console.log(req.url);
  // 判断一下区分代理文件与代理请求
  request('http://172.19.80.62:81/' + req.url, function (error, response, body) {
    res.send(body);
    console.log(body);
  });
  // res.redirect('http://172.19.80.62:81/' + req.url);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
