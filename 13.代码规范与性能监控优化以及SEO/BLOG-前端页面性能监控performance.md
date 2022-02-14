---
title: 前端页面性能监控performance
date: 2017-7-7
tags:
  - performance
  - Performance monitoring
categories:
  - [前端性能优化, 前端页面性能监控]
---

[TOC]

性能优化，除了很多能直接观测的到的点，对于深层次的页面性能评估还是需要用到一些工具，这里举例使用 chrome 的 performance 来测试页面性能。

## 前端性能分析

[Performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance) 接口**可以获取到当前页面中与性能相关的信息**。它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。

该类型的对象可以**通过调用只读属性 Window.performance 来获得**。

1. Performance 接口**没有继承任何属性**。
2. 常用到的属性：
   1. performance.**navigation** 对象提供了**在指定的时间段里发生的操作相关信息，包括页面是加载还是刷新、发生了多少次重定向等等**。Not available in workers.
   2. [performance.timing](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/timing) 对象包含**延迟相关的性能信息**。Not available in workers.
      1. [PerformanceTiming 对象](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)的具体属性可查看。
   3. performance.**timeOrigin**，返回性能**测量开始时的时间的高精度时间戳**。

[Performance — 前端性能监控利器](https://www.cnblogs.com/bldxh/p/6857324.html)

Performance 是一个做前端性能监控离不开的 API，最好在页面完全加载完成之后再使用，因为很多值必须在页面完全加载之后才能得到。最简单的办法是在 **window.onload 事件中读取各种数据**。

## performance.timing，延迟相关的性能信息

![performance.timing](./imgs/performance.timing.png)
[performance.timing](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/timing)

### 主要阶段的参数

1. unloadEvent，当前窗口加载的前一个页面卸载过程，不确定完成时间：
   1. **unloadEventStart**: 前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，**则值为 0**；
   2. **unloadEventEnd**: 和 unloadEventStart 相对应，返回前一个网页 unload 事件绑定的回调函数执行完毕的时间戳。
2. **navigationStart**: 表征了从同一个浏览器上下文的上一个文档卸载(unload)结束时的 UNIX 时间戳。
3. fetch，开始准备下载的时间：
   1. **fetchStart**: **浏览器准备好使用 HTTP 请求抓取文档的时间**，这发生在**检查本地缓存之前**。
4. dns 查询，查询 ip，为请求服务做准备：
   1. **domainLookupStart**: DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等。
   2. **domainLookupEnd**: DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等。
5. redirect，重定向的时间：
   1. **redirectStart**: 第一个 HTTP 重定向发生时的时间。**有跳转且是同域名内的重定向才算**，否则值为 0；
   2. **redirectEnd**: 最后一个 HTTP 重定向完成时的时间。**有跳转且是同域名内的重定向才算**，否则值为 0。
6. connect，链接构建的时间：
   1. **connectStart**: HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等,如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间；
   2. **connectEnd**: HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等,如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间；
      1. 这里**握手结束，包括安全连接建立完成、SOCKS 授权通过**。
   3. **secureConnectionStart**: HTTPS 连接开始的时间，如果不是安全连接，则值为 0；
7. request/response，请求与返回：
   1. **requestStart**: HTTP 请求读取**真实文档**开始的时间（完成建立连接），包括从本地读取缓存,连接错误重连时，这里显示的也是新建立连接的时间；
   2. **responseStart**: HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存。
   3. **responseEnd**: HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存。
8. domLoading/domInteractive，**dom 开始解析及完成时间**，domTree：
   1. **domLoading**: **开始解析渲染 DOM 树的时间**，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件；
   2. **domInteractive**: **完成解析 DOM 树的时间**，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件。
      1. **只是 DOM 树解析完成，这时候并没有开始加载网页内的资源，比如图片资源等**；
9. domContentLoadedEvent，页面资源加载：
   1. **domContentLoadedEventStart**: DOM 解析完成后，**网页内资源（img）加载开始的时间**，文档发生 **DOMContentLoaded** 事件的时间；
   2. **domContentLoadedEventEnd**: DOM 解析完成后，**网页内资源加载完成的时间**（如 JS 脚本加载执行完毕），文档的 DOMContentLoaded 事件的结束时间；
   3. **domComplete**: **DOM 树解析完成**，**且资源也准备就绪的时间，Document.readyState 变为 complete**，并将**抛出 readystatechange 相关事件**。
10. loadEvent，load 事件：
    1. **loadEventStart**: load 事件发送给文档，也**即 load 回调函数开始执行的时间**，如果没有绑定 load 事件，值为 0；
    2. **loadEventEnd**: load 事件的回调函数**执行完毕的时间**，如果没有绑定 load 事件，值为 0；

### 对这些时间参数的简单排序

```js
const timing = performance.timing;
const propsArr = [];
for (let key in timing) {
  propsArr.push({ key: key, value: timing[key] });
}
propsArr.sort((a, b) => a.value - b.value);
console.log('这里打印当前timing对象的属性，如果为0，则使用的是缓存，或者未经过这个过程：', timing);
propsArr.forEach((item) => {
  console.log('##: ', item.key, '---', item.value);
});
```

### 常用计算指标，timing

1. DNS 查询耗时：`domainLookupEnd - domainLookupStart`
2. TCP 链接耗时：`connectEnd - connectStart`
3. **request 请求(html 下载)耗时**：`responseEnd - responseStart`
4. **解析 dom 树耗时**： `domComplete - domInteractive`
5. **白屏时间**：**domLoading - navigationStart**
   1. 用户从打开页面开始到**页面开始有东西呈现为止**；
   2. 很多地方说是以 responseStart 为结束时间，但是我觉得还是 domLoading。
6. domready 时间(用户**可操作时间节点**) ：`domContentLoadedEventEnd - navigationStart`
7. **onload 时间/首屏时间**(**总下载时间**) ：`loadEventEnd - navigationStart`

```js
const timing = performance.timing;
const {
  domainLookupEnd,
  domainLookupStart,
  connectEnd,
  connectStart,
  responseEnd,
  responseStart,
  domComplete,
  domInteractive,
  domContentLoadedEventEnd,
  navigationStart,
  loadEventEnd,
  domLoading,
} = timing;

console.log('1. Redirect 网页重定向的耗时: ', `${redirectEnd - redirectStart}`);
console.log('2. AppCache 检查本地缓存的耗时: ', `${domainLookupStart - fetchStart}`);
console.log('3. DNS 查询耗时: ', `${domainLookupEnd - domainLookupStart}`);
console.log('4. TCP 链接耗时: ', `${connectEnd - connectStart}`);
console.log(
  'Waiting(TTFB) 从客户端发起请求到接收到响应的时间: ',
  `${responseStart - requestStart}`,
);
console.log('5. Content Download 下载服务端返回数据的时间: ', `${responseEnd - responseStart}`);
console.log('6. HTTP Total Time http请求总耗时: ', `${responseEnd - requestStart}`);
console.log('7. 白屏时间: ', `${domLoading - navigationStart}`);
console.log('8. 解析 dom 树耗时: ', `${domComplete - domInteractive}`);
console.log('9. Loaded 时间/首屏时间（页面load的总耗时）: ', `${loadEventEnd - navigationStart}`);
```

查看实例，[简书控制台](https://www.jianshu.com/p/94d0fa7c427a)：

```js
// 0: {key: "Redirect", desc: "网页重定向的耗时", value: 0}
// 1: {key: "AppCache", desc: "检查本地缓存的耗时", value: 0}
// 2: {key: "DNS", desc: "DNS查询的耗时", value: 0}
// 3: {key: "TCP", desc: "TCP连接的耗时", value: 186.84499996015802}
// 4: {key: "Waiting(TTFB)", desc: "从客户端发起请求到接收到响应的时间 / Time To First Byte", value: 610.4949999717064}
// 5: {key: "Content Download", desc: "下载服务端返回数据的时间", value: 74.48000001022592}
// 6: {key: "HTTP Total Time", desc: "http请求总耗时", value: 684.9749999819323}
// 7: {key: "DOMContentLoaded", desc: "dom加载完成的时间", value: 919.5949999848381}
// 8: {key: "Loaded", desc: "页面load的总耗时", value: 2809.980000020005}

const t = performance.timing;
const r = t.navigationStart;

// 简书的测试策略
var n = [
  {
    key: 'Redirect',
    desc: '\u7f51\u9875\u91cd\u5b9a\u5411\u7684\u8017\u65f6',
    value: t.redirectEnd - t.redirectStart,
  },
  {
    key: 'AppCache',
    desc: '\u68c0\u67e5\u672c\u5730\u7f13\u5b58\u7684\u8017\u65f6',
    value: t.domainLookupStart - t.fetchStart,
  },
  {
    key: 'DNS',
    desc: 'DNS\u67e5\u8be2\u7684\u8017\u65f6',
    value: t.domainLookupEnd - t.domainLookupStart,
  },
  {
    key: 'TCP',
    desc: 'TCP\u8fde\u63a5\u7684\u8017\u65f6',
    value: t.connectEnd - t.connectStart,
  },
  {
    key: 'Waiting(TTFB)',
    desc:
      '\u4ece\u5ba2\u6237\u7aef\u53d1\u8d77\u8bf7\u6c42\u5230\u63a5\u6536\u5230\u54cd\u5e94\u7684\u65f6\u95f4 / Time To First Byte',
    value: t.responseStart - t.requestStart,
  },
  {
    key: 'Content Download',
    desc: '\u4e0b\u8f7d\u670d\u52a1\u7aef\u8fd4\u56de\u6570\u636e\u7684\u65f6\u95f4',
    value: t.responseEnd - t.responseStart,
  },
  {
    key: 'HTTP Total Time',
    desc: 'http\u8bf7\u6c42\u603b\u8017\u65f6',
    value: t.responseEnd - t.requestStart,
  },
  {
    key: 'DOMContentLoaded',
    desc: 'dom\u52a0\u8f7d\u5b8c\u6210\u7684\u65f6\u95f4',
    value: t.domContentLoadedEventEnd - r,
  },
  {
    key: 'Loaded',
    desc: '\u9875\u9762load\u7684\u603b\u8017\u65f6',
    value: t.loadEventEnd - r,
  },
];
```

## performance.navigation，表明通过什么方式导航过来的，只有两个属性：type，redirectCount

[performance.navigation](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceNavigation)

1. type：表示是如何导航到这个页面的
   1. TYPE_NAVIGATE (0)：当前页面是通过**点击链接，书签和表单提交，或者脚本操作**，或者在 url 中直接输入地址，type 值为 0；
   2. TYPE_RELOAD (1)：**点击刷新页面按钮**或者通过 Location.reload()方法显示的页面，type 值为 1；
   3. TYPE_BACK_FORWARD (2)：页面**通过历史记录和前进后退访问时**。type 值为 2；
   4. TYPE_RESERVED (255)：**任何其他方式**，type 值为 255。
2. redirectCount：表示在到达这个页面之前重定向了多少次。
   1. 表示到达最终页面前，重定向的次数，**但是这个接口有同源策略限制**，即仅能检测同源的重定向。

```js
const navigation = performance.navigation;
console.log('navigation: ', navigation);
```

## performance.memory

其是 Chrome 添加的一个**非标准扩展**，这个属性提供了一个**可以获取到基本内存使用情况的对象**。不应该使用这个非标准的 API。

## performance.timeOrigin

返回**性能测量开始时**的时间的高精度时间戳。

## 性能优化实例

1. [Chrome 运行时性能瓶颈分析](https://mp.weixin.qq.com/s/0JPASL4Y2hTj-onroZ1R_g)

2. [谷歌性能测试页面](https://googlechrome.github.io/devtools-samples/jank/)

### fps

1. fps：是指页面**每秒帧数**；
2. fps = 60 性能极佳；
3. fps < 24 会**让用户感觉到卡顿**，因为人眼的识别主要是 24 帧。

### 调出 fps 查看器

setting -> more tools -> rendering -> FPS meter。

这样就可以**明显的看到页面的刷新帧率与卡顿的情况**。

## 具体优化原则及策略

1. [避免大型、复杂的布局和布局抖动](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoidforcedsynchronous_layouts)
2. [Web 性能领域常见的专业术语](https://zhuanlan.zhihu.com/p/98880815)
