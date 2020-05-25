---
title: JS常用接口源码分析
---

## indexOf 原理

1. indexOf 查询，肯定是会又一次迭代计算的。

2. 在 js 中提供了 indexOf()函数以获取某个字符在字符串中的 index,可以通过它也判断某个字符或字符串是否存在。

3. 相对于 for 循环，用 indexOf()性能要好很多。

## for 循环的效率对比

一共三种写法 如下：

```js
console.time('init');
var arr = Array.from({ length: 1 << 23 });
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

length = 0;
console.time('while');
var i = 0,
  len = arr.length;
while (i < len) {
  length++;
  i++;
}
console.timeEnd('while');

length = 0;
console.time('forEach');
arr.forEach((item) => {
  length++;
});
console.timeEnd('forEach');

length = 0;
console.time('map');
// 为啥与forEach差别这么大
arr.map((item) => {
  length++;
});
console.timeEnd('map');

// init: 1064.593ms
// for1: 25.479ms
// forin: 4038.878ms
// for2: 24.405ms
// while: 23.723ms
// forEach: 110.855ms
// map: 1283.296ms
```
