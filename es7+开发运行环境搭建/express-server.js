// express-server.js

const path = require('path');

const express = require('express');

const app = express();

app.use(express.static('dist'));

// 被拦截了, 直接在服务端是可以使用的
// app.get('/mock', function(req, res){
//     res.send('from express-server');
// });

app.get('/', function(req, res){
    res.sendfile('index.html');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});