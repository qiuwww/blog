// 观察者模式.js


本质上就是一个函数内执行其他一堆函数；可以随时添加和删除；

一个subject(目标对象)对应(注册)多个observer(观察者),当subject状态改变时，通知其的observer执行；

实现方式：

1、 自定义类来实现，可以参考设计模式上的内容；
2、 jq的内部类-$.Callbacks();(工厂模式)来创建对象；
3、 event模块的EventEmitter对象的on与emit方法；
`
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

//event.js 文件
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
event.on('some_event', function() { 
    console.log('some_event 事件触发'); 
}); 
setTimeout(function() { 
    event.emit('some_event'); 
}, 1000); 
`