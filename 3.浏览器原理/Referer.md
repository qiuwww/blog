---
title: Referer
date: 2020-03-05
---

[参考文章](http://www.ruanyifeng.com/blog/2019/06/http-referer.html)

HTTP 请求的头信息里面，Referer 是一个常见字段，**提供访问来源的信息**。

## Referer 字段的逻辑

浏览器向服务器请求资源的时候，Referer 字段的逻辑是这样的，用户在地址栏输入网址，或者选中浏览器书签，就不发送 Referer 字段。

主要是以下三种场景，会发送 Referer 字段。

（1）用户点击网页上的链接。

（2）用户发送表单。

（3）网页加载静态资源，比如加载图片、脚本、样式。

## document.referrer

浏览器的 JavaScript 引擎提供 document.referrer 属性，可以查看当前页面的引荐来源。

## Referer 的作用

一个典型的应用是，有些网站不允许图片外链，只有自家的网站才能显示图片，外部网站加载图片就会报错。它的实现就是基于 Referer 字段，如果该字段的网址是自家网址，就放行。

## rel 属性

浏览器提供一系列手段，允许改变默认的 Referer 行为。

对于开发者来说，`rel="noreferrer"`属性是最简单的一种方法。<a>、<area>和<form>三个标签可以使用这个属性，一旦使用，该元素就不会发送 Referer 字段。
