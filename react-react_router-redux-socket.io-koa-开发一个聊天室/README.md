##  This is a chat room application implemented using react+redux+socket.io+koa.

 ![](./dist/resource/preview.png)

### An online demo is here: [online demo](https://desolate-fortress-76848.herokuapp.com/)

###  how to use
  * npm install
  * npm start
  * access "localhost:5000" in your browser

### socket.io
由于是一个即时聊天应用，websocket协议自然是首选。而http://socket.io就是基于websocket实现的一套基于事件订阅与发布的js通信库。

在http://socket.io中，主要有server端和client端。创建一个server和client都非常容易，对于server端，配合koa，只需要如下代码：

var app=require('koa')();
var server = require('http').Server(app.callback());
var io = require('socket.io')(server);
client端更简单：

var io=require('socket.io-client');
var socket = io();
一旦连接建立，client和server即可通过时间订阅与发布来彼此通信，http://socket.io提供的api非常类似于nodejs中的event对象的使用，对于server端：

io.on('connection',function(socket){
  socket.on('some event',function(data){
    //do something here....
    socket.emit('another event',{some data here});
  });
});
对于client端，同样通过socket.on以及socket.emit来订阅和发布事件。比如说，某一个client端口emit了event A，而如果server端口订阅了event A，那么在server端，对应的回调函数就会被执行。通过这种方式，可以方便的编写即时通信程序。
