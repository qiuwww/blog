---
layout: post
title: HTML页面meta标签
date: 2019-1-28
tags:
  - HTML
  - meta标签
categories:
  - [HTML, meta标签]
comments: true
---

[TOC]

## 基础的字符声明、刷新、过期时间、页面缓存的声明

### `<meta charset="utf-8" />`

声明用来指定文档的编码，其他编码 gb2312、ISO-8859-1、BIG5、iso-8859-2, iso-2022-jp, iso-2022-kr。这里是 HTML5 才可以使用，

老式的写法：`<meta http-equiv="content-type" content="text/html; charset=utf-8" />`

### `<meta http-equiv="refresh" content="10" />`||`<meta http-equiv="refresh" content="10; url=http://www.doyoe.com" />`　　

该声明用来指定页面自**刷新或者跳转到其它页面**，其中的时间单位是 s。不规定 url 就是自刷新，规定 url 则在时间到了之后会跳转到制定的页面。

### `<meta http-equiv="expires" content="0" />`||`<meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT" />`

该声明用来指定页面的**过期时间**，一旦网页过期，从服务器上重新请求，其中时间必须使用 GMT 格式，或者直接是 0（即不缓存）。

### `<meta http-equiv="pragma" content="no-cache" />`||`<meta http-equiv="cache-control" content="no-cache" />`

上述语句都可以用来指定文档不被**缓存**。一些仍然在使用 HTTP/1.0 的可以使用第 1 条，第 2 条由 HTTP/1.1 提供，常用值还有：public, no-cache, no-store 等。

### 主动缓存标签：`<meta http-equiv="Cache-Control" content="max-age=7200"/>`

### 声明文档关键字：`<meta name="keywords" content="CSS, HTML, JavaScript, 前端" />`

### 声明作者信息： `<meta name="author" content="joy, dooyoe@gmail.com" />`

### 声明文档描述： `<meta name="description" content="这是一份meta列表" />`

### 声明使用的浏览器及版本 `<meta http-equiv="x-ua-compatible" content="IE=7" />`

客户端的 IE 将会使用 IE7.0 标准模式对页面进行渲染，并忽略 Doctype 定义。x-ua-compatible 设置是从 IE8 开始增加的（很明显，只适用于 IE），对于过往的版本无法识别。开发者可以通过设置 x-ua-compatible 来指定渲染引擎的类型和版本，并且因为需求不同可以有多种不同的设置。当指定的 IE 版本在客户端 IE 中不存在时，IE 将会尝试将该值转换为最为接近的版本。

### `<meta http-equiv="x-ua-compatible" content="IE=Edge, chrome=1" />`

当指定的 content 值仅为**IE=Edge**时，如上述代码，客户端的 IE 将会使用**最高的标准模式对页面进行渲**染。
当指定的 content 值为 IE=Edge, chrome=1 时，如上述代码，假定客户端安装了 Google Chrome Frame，则在 IE 中使用 chrome 的渲染引擎来渲染页面，否则，将会使用客户端 IE 最高的标准模式对页面进行渲染。比较实用。声明浏览器比较复杂，还需要具体分析一下。

### `<meta name="robots" content="index" />`

通知搜索引擎文档是否需要被索引。

### 声明搜索引擎抓取间隔

`<meta name="revisit-after" content="10 days" />`。

### 声明添加到主屏幕的 Web App 标题

`<meta name="apple-mobile-web-app-title" content="Web App名称" />`

如果你想统一 iOS 和 Android 平台定义 Web app 名称的方式，可以使用 title 标签来定义。

### 电话号码识别自动识别。

关闭的方法：`<meta name="format-detection" content="telephone=no" />`

开启拨打电话功能：`<a href="tel:123456">123456`</a>

开启发送短信功能：`<a href="sms:123456">123456`</a>

在 Android （iOS 不会）上，浏览器会自动识别看起来像邮箱地址的字符串，不论有你没有加上邮箱链接，当你在这个字符串上长按，会弹出发邮件的提示。

关闭邮箱地址识别：`<meta name="format-detection" content="email=no" />`

开启的方法：`<a href="mailto:dooyoe@gmail.com">dooyoe@gmail.com`</a>||`<meta name="format-detection" content="telephone=no,email=no" />`
