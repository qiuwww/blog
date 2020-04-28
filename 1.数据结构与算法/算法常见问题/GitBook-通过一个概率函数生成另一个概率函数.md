---
title: 通过一个概率函数生成另一个概率函数
date: 2018-6-8
categories:
  - [算法, 通过一个概率函数生成另一个概率函数]
  - [算法, 概率计算]
---

## 问题描述

一直一个函数 g，会有 30%返回‘A’，70%返回‘B’，构造一个新的函数，使其 50% 返回‘C’，50% 返回 ‘B’。

## 问题分析

这个问题本质是一个数学计算的问题，就是**要找到可能出现的概率相等的情况**，**剩余的情况重新生成**。

如 var a = g(); var b = g(); 调用两次总共有四种结果：AA, AB, BA, BB，这里就有 AB 的概率等于 BA。

当调用 3 次的时候，就会有 8 中结果：

AAA
AAB
ABA
ABB

BAA
BAB
BBA
BBB

很明显，出现字母次数一样多的情况，概率是相等的。2A+B 有三种，2B+A 也有三种，AAA 和 BBB，都有一种，所以这里就可以构建，三等分与二等分。

这里与起始的概率无关。

[参考题目： 用 Rand7() 实现 Rand10()](https://leetcode-cn.com/problems/implement-rand10-using-rand7/)

## 代码实现

```js
// 30%返回A，70%返回B
var g = () => {
  return Math.random() < 0.3 ? 'A' : 'B';
};

var f = () => {
  // 需要执行g函数三次，三次的结果相互不影响，都是 A 30%，B 70%
  var a = g();
  var b = g();
  // 这里 只有AB的概率等于BA的概率，所以剩余的部分舍弃，重新求
  while ((a === 'A' && b === 'A') || (a === 'B' && b === 'B')) {
    a = g();
    b = g();
  }
  return a === 'A' && b === 'B' ? 'C' : 'D';
};

// 测试代码
function test(len) {
  var arr = new Array(len).fill('').map((item) => f());
  var res = {};
  arr.forEach((item) => {
    if (res[item]) {
      res[item]++;
    } else {
      res[item] = 1;
    }
  });
  console.log(len, res);
}

test(1000000);
```
