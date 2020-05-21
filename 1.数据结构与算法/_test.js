console.time('init');
var arr = Array.from({ length: 1 << 24 });
console.log('###length', arr.length);
console.timeEnd('init');

var length = 0;
console.time('for1');
for (var i = 0; i < arr.length; i++) {
  length++;
}
console.timeEnd('for1');

// 这里最慢
length = 0;
console.time('forin');
for (var j in arr) {
  length++;
}
console.timeEnd('forin');

// 如下最快
length = 0;
console.time('for2');
for (var i = 0, len = arr.length; i < len; i++) {
  length++;
}
console.timeEnd('for2');

// ###length 16777216
// init: 2114.401ms
// for1: 18.421ms
// forin: 11848.458ms
// for2: 17.481ms
