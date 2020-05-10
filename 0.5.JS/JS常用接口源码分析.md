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
for (var i = 0; i < arr.length; i++)
// 这里最慢
for (var i in arr)
// 如下最快
for (var i = 0, len = arr.length; i < len; i++)
```
