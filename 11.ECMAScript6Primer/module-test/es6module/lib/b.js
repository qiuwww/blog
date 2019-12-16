"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// b.js
var num = 1; // 导出基础类型
var obj = {
  a: 1
};
console.log("b.js-1", { num: num, obj: obj });

var changeValue = function changeValue() {
  exports.num = num = 2;
  obj.a = 3;
  console.log("b.js-2", { num: num, obj: obj });
};

setTimeout(function () {
  console.log("b.js-3", { num: num, obj: obj });
}, 1000);

exports.num = num;
exports.obj = obj;
exports.changeValue = changeValue;