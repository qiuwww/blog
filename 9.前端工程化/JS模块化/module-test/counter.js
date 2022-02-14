// counter.js
// 定义无差，引用有差
var count = 0;
var obj = {
  a: 1,
};
// 1s后自动改变当前模块的值
setTimeout(function() {
  count += 1;
  obj.a = 3;
}, 1000);

module.exports = {
  count,
  obj,
};
