
// event.js 文件
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event', function () {
  console.log('some_event 事件触发');
});

setTimeout(function () {
  event.emit('some_event');
}, 1000);

// 就是回调函数中间套了一层

// function cb1() {
//   console.log('cb1 some_event 事件触发');
// }
// function cb2() {
//   console.log('cb2 some_event 事件触发');
// }

// setTimeout(function () {
//   cb1()
//   cb2()
// }, 1000);

// RxJS v6+

import {
  Observable, timer
} from 'rxjs';
/*
  创建在订阅函数中发出 'Hello' 和 'World' 的 observable 。
*/
const hello = Observable.create(function (observer) {
  observer.next('Hello');
  observer.next('World');
});

// 输出: 'Hello'...'World'
const subscribe = hello.subscribe(val => console.log("Observable",
  val));

