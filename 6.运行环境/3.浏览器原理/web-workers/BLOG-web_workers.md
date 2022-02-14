---
title: web workers
date: 2018-6-6
tags:
  - 浏览器原理
  - web workers
categories:
  - [JS, web workers]
  - [浏览器原理]
---

[TOC]

## 是什么

[使用 Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

[菜鸟教程](https://www.runoob.com/html/html5-webworkers.html)

web worker 是运行在后台的 JavaScript，不会影响页面的性能。

当在 HTML 页面中执行脚本时，页面的状态是不可响应的，**直到脚本已完成**。

web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。
