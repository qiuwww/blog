---
title: HTTP请求方式及GET请求与POST请求
date: 2017-3-6
tags:
  - GET
  - POST
categories:
  - [HTTP网络基础与网络协议, HTTP请求方式及GET请求与POST请求]
---

## HTTP 的几种请求方法的用途：Request Method

1. GET 方法：发送一个请求来**取得**服务器上的某一资源
2. POST 方法：向 URL 指定的资源**提交**数据或附加新的数据
3. PUT 方法：跟 POST 方法很像，也是想服务器提交数据。但是，它们之间有不同。**PUT 指定了资源在服务器上的位置**，而 POST 没有
4. HEAD 方法：**只请求页面的首部**
5. DELETE 方法：删除服务器上的某资源
6. OPTIONS 方法：**它用于获取当前 URL 所支持的方法。**如果请求成功，会有一个 **Allow 的头包含类似“GET,POST”这样的信息**，在 get|post 前，都会有一个 options 请求

7. TRACE 方法：TRACE 方法被用于激发一个远程的，应用层的请求消息回路
8. CONNECT 方法：把请求连接转换到透明的 TCP/IP 通道

## GET 请求与 POST 请求的区别

HTTP 的底层是 TCP/IP。所以 GET 和 POST 的底层也是 TCP/IP，也就是说，GET/POST 都是 TCP 链接的**特定封装**。

GET 和 POST 能做的事情是一样一样的。

你要给 GET 加上 request body，给 POST 带上 url 参数，技术上是完全行的通的。

**只是对不同类型的请求的一种包装**。

具体细节上讲：

1. **语义上讲**，get 主要用于从服务器请求数据，post 主要用于向服务端发送数据；
2. **请求参数**，**携带信息上讲**，get 一般通过 url 传递信息(query)，有限制 2k，post 请求有请求体，可以携带数据(body)，基本无限制。
3. 在**缓存应用**上，**GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置**。
4. GET 比 POST**更不安全**，**因为参数直接暴露在 URL 上**，更容易模拟。
5. **浏览器操作历史**，GET 在浏览器回退时是无害的，而 POST 会再次提交请求。
6. 接受的**编码字符方面**，GET 请求只接受 ASCII 字符的参数，而 POST 则没有限制。
