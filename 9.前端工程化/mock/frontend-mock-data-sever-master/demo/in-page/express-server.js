

const path = require('path');

const express = require('express');

const app = express();

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 被拦截了
app.get('/mock', function(req, res){
    res.send('from express-server');
});


app.get('/express-server', function(req, res){
    res.send('express-server');
});


app.get('/index', function(req, res){
    res.sendfile('index.html');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
