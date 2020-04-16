---
title: 实现进制转换
date: 2018-5-6
tags:
  - 数据结构与算法
  - 实现进制转换
categories:
  - [数据结构与算法, 实现进制转换]
---

## JS 默认的进制转换

1. 通过[toString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)实现十进制转别的进制，这里 Number 重写了 toString，`numObj.toString([radix])`，指定要用于数字到字符串的转换的基数(从 2 到 36)。如果未指定 radix 参数，则默认值为 10。；
2. 通过 parseInt，转换别的进制字符串到十进制，`parseInt(string, radix)` 将一个字符串 string 转换为 radix 进制的整数， radix 为介于 2-36 之间的数；
3. `String.fromCharCode`，静态 String.fromCharCode() 方法返回由指定的 UTF-16 代码单元序列创建的字符串。

```js
// 十进制转其他进制
var x = 110;
console.log(x.toString(8));
console.log(x.toString(32));
console.log(x.toString(16));

// 其他进制字符串转十进制
var x = '110';
console.log(parseInt(x, 2));
console.log(parseInt(x, 8));
console.log(parseInt(x, 16));

// 其他进制转其他进制
// 先用parseInt转成十进制再用toString转到目标进制
console.log(String.fromCharCode(parseInt(141, 8)));
console.log(parseInt('ff', 16).toString(2));

// 转换为字符
String.fromCharCode(65, 66, 67); // returns "ABC"
String.fromCharCode(0x2014); // returns "—"
String.fromCharCode(0x12014); // also returns "—"; the digit 1 is truncated and ignored
```

## js 算法实现进制转换

```js
/*
 * 十进制转为其他进制(二进制~十进制、十六进制)
 */

/*
    Unicode编码中，第33～126号(共94个)是字符，其中第48～57号为0～9十个阿拉伯数字；
    65～90号为26个大写英文字母，97～122号为26个小写英文字母，其余为一些标点符号、运算符号等。
 */

function dec2(num, base) {
  // 保存最终结果的字符串
  var arr = [];
  // 结果字符串
  var res = '';
  var mod;
  do {
    // 余数，也就是最后一位
    mod = num % base;
    // 大于9的使用字符a-z表示
    mod = mod > 9 ? String.fromCharCode(mod + 55) : mod; // 将大于9的余数转为对应的字符
    arr.push(mod);
    // 逐级求余数和相除的结果
    num = Math.floor(num / base); // 此处向下取整不可少
  } while (num > 0);

  while (arr.length > 0) {
    res += arr.pop();
  }
  // res = arr.join("");

  return res;
}

console.log(dec2(32, 2)); // 100000
console.log(dec2(125, 8)); // 175
console.log(dec2(32, 16)); // 20
console.log(dec2(32, 10)); // 32
// console.log(dec2(32,1)); // 没有1进制
console.log(dec2(173, 16)); // AD
console.log(dec2(173, 32)); // AD

/*
 * 二进制转十进制
 */

function bin2dec(binStr) {
  var arr = binStr.split('');
  var len = arr.length;
  var res = 0;
  arr.forEach(function (item, index) {
    // 索引就是进制单位
    res += item * Math.pow(2, len - index - 1);
  });
  return res;
}

console.log(bin2dec('100000')); //32
```

## 可能遇到的问题

### 算法：实现 36 进制转换
