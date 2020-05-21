---
title: url编解码方法比较
date: 2017-2-6
tags:
  - JS
  - 编码
categories:
  - [JS, url编码]
---

[TOC]

## url 编码方式

- escape()
- encodeURI()
- encodeURIComponent()

escape 和 encodeURI 都属于 Percent-encoding，基本功能都是把 URI 非法字符转化成合法字符，转化后形式类似。

## escape() <该特性已经从 Web 标准中删除>

废弃的 escape() 方法生成新的由十六进制转义序列替换的字符串. 使用 encodeURI 或 encodeURIComponent 代替.

如果只是编码字符串，不和 URL 有半毛钱关系，那么用 escape。

## encodeURI，编码整个 url

encodeURI() 函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。

**参数是一个完整的 uri**。

encodeURI 是基于 UTF-8 的，编码本身理论上可以支持 0x10ffff 内的字符。

encodeURI(Component) 一般用在 URI 上，但是不是一定就要用在 URL 上。

比如如果 POST 请求的 Request Header 中 Content-Type 为`application/x-www-form-urlencoded`。

那么 Request Payload 里面的数据一般就是使用 encodeURI(Component) 编码的。（和 URL 的 querystring 一样）。

## encodeURIComponent，认为是 url 部分编码

encodeURI 自身无法产生能适用于 HTTP GET 或 POST 请求的 URI，

例如对于 XMLHTTPRequests, 因为 **"&", "+", 和 "=" &, ?, /, =** 不会被编码，然而在 GET 和 POST 请求中它们是特殊字符。

然而 encodeURIComponent 这个方法会对这些字符编码。

## 解析 query 查询参数

### 使用正则匹配查询参数

```js
var parseQuery = function (query) {
  var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
  var obj = {};
  while (reg.exec(query)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj;
};
var jerry = parseQuery('name=jerry&age=1');
console.log(jerry);

var tom = parseQuery('name=tom&age=12&gender&');
console.info(tom);
```

### 使用 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) 来解析查询字符串

```js
var paramsString = 'q=URLUtils.searchParams&topic=api';
var searchParams = new URLSearchParams(paramsString);
console.log(searchParams);

searchParams.has('topic') === true; // true
searchParams.get('topic') === 'api'; // true
searchParams.getAll('topic'); // ["api"]
searchParams.get('foo') === ''; // true
searchParams.append('topic', 'webdev');
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set('topic', 'More webdev');
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete('topic');
searchParams.toString(); // "q=URLUtils.searchParams"
```
