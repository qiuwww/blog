---
title: prefligh request预检请求
date: 2020-03-05
tag:
  - http
  - ajax
---

[prefligh request 预检请求](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)，HTTP 的 [OPTIONS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 方法 用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为“\*”）使用该方法。

`curl -X OPTIONS http://example.org -i`

## 为什么要发预检请求

出于安全考虑，浏览器会限制从脚本发起的跨域 HTTP 请求，像 XMLHttpRequest 和 Fetch 都遵循**同源策略**。

**浏览器限制**跨域请求一般有两种方式：

- 浏览器**限制发起跨域请求**
- 跨域请求可以正常发起，但是**返回的结果被浏览器拦截**了

一般浏览器都是**第二种方式**限制跨域请求，那就是说请求已到达服务器，并有可能对数据库里的数据进行了操作，但是返回的结果被浏览器拦截了，那么我们就获取不到返回结果，这是一次失败的请求，**但是可能对数据库里的数据产生了影响**。

为了防止这种情况的发生，规范要求，对这种可能对服务器数据产生副作用的 HTTP 请求方法，**浏览器必须先使用 OPTIONS 方法发起一个预检请求**，

从而获知服务器**是否允许该跨域请求**：**如果允许，就发送带数据的真实请求；如果不允许，则阻止发送带数据的真实请求。**

## 什么时候发预检请求

HTTP 请求包括： 简单请求 和 需预检的请求

### 简单请求，简单请求不会触发 CORS 预检请求

- GET
- HEAD
- POST
  - Content-Type: (**仅当** POST 方法的 Content-Type 值等于下列之一才算做简单需求)
    - text/plain
    - multipart/form-data
    - application/x-www-form-urlencoded

### 需预检的请求

“需预检的请求”要求必须首先使用 OPTIONS 方法发起一个预检请求到服务区，**以获知服务器是否允许该实际请求**。

如下需要发送预检请求：

使用了下面任一 HTTP 方法：

- PUT
- DELETE
- CONNECT
- OPTIONS
- TRACE
- PATCH

人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：

- Accept
- Accept-Language
- Content-Language
- Content-Type
- DPR
- Downlink
- Save-Data
- Viewport-Width
- Width
- Content-Type 的值不属于下列之一:
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain
