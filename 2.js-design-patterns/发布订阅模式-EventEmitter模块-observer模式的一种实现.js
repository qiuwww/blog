// EventEmitter模块-observer模式的一种实现.js
// 发布订阅模式 EventEmitter
/**
 * 基本用法，感觉与$.Callbacks()类似
 */

var EventEmitter = require("events").EventEmitter;
// 当然可以实例化很对的对象
var ee = new EventEmitter();

ee.on("someEvent", function() {
  console.log("event has occured");
});

ee.emit("someEvent");
// 结果只有一句

ee.on("someEvent", function() {
  console.log("event 1");
});
ee.on("someEvent", function() {
  console.log("event 2");
});
ee.on("someEvent", function() {
  console.log("event 3");
});

// 某些条件达成之后需要触发的一组函数，参数需要一一对应，按需提取
setTimeout(function() {
  ee.emit("someEvent");
}, 5000);
// 执行结果有四句

// 设置监听函数组的最大长度
// ee.setMaxListeners(20);
