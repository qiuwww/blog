---
title: 浏览器存储
date: 2017-1-3
tags:
  - 浏览器存储
  - cookie
  - session
  - localStorage
  - sessionStorage
  - 本地存储
categories:
  - [浏览器原理, 浏览器存储]
---

[TOC]

## 浏览器存储方式 ｜ 本地存储方式

1. cookie
   1. 在进行页面 cookie 操作的时候，应该尽量保证**每个域 cookie 个数小于 50 个**；
   2. **单条 cookie 总长度 4KB**（包阔键和值以及等号）。
   3. Expires 或者 Max-Age：设置有效期。
   4. HttpOnly：不能使用 js 获取 cookie。
   5. Secure ：使用 https 协议。
   6. Domain 标识指定了哪些主机可以接受 Cookie。
2. localStorage(diskCache)
   1. 大小，chrome 5M；
   2. 除非清除，否则长期有效；
3. sessionStorage(memoryCache)
   1. 在页面会话结束时会被清除；
4. IndexedDB，事务型的数据库系统
5. Web SQL

## Cookie

1. 每个特定的域名下最多生成的 cookie 个数有限制，20 个，不同浏览器不同
2. IE 和 Opera 会清理近期最少使用的 cookie，Firefox 会随机清理 cookie
3. cookie 的**最大大约为 4096 字节**，为了兼容性，一般设置不超过 4095 字节
4. 如果 cookie 被人拦截了，就可以取得所有的 session 信息

### cookie 通常都有哪些字段

1. Domain
2. cookiename
3. Max-Age
4. Path
5. HTTPOnly
6. expires

### 如何禁止 js 读取 cookie

1. 设置**HttpOnly**，如果您在 cookie 中设置了 HttpOnly 属性，那么通过 js 脚本将无法读取到 cookie 信息，这样能**有效的防止 XSS 攻击**。

```js
// javaEE
response.setHeader(
  'Set-Cookie',
  'cookiename=value;Path=/;Domain=domainvalue;Max-Age=seconds;HTTPOnly',
);
```

## 浏览器本地存储，localStorage/sessionStorage

1. 在较高版本的浏览器中，js 提供了 sessionStorage 和 globalStorage。在 HTML5 中提供了 localStorage 来取代 globalStorage
2. html5 中的 Web Storage 包括了两种存储方式：**sessionStorage 和 localStorage**
3. sessionStorage 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此 sessionStorage 不是一种持久化的本地存储，仅仅是会话级别的存储
4. 而 localStorage 用于持久化的本地存储，**除非主动删除数据，否则数据是永远不会过期的**

## web storage 和 cookie 的区别

1. **Web Storage** 的概念和 cookie 相似，区别是它是为了更大容量存储设计的。Cookie 的大小是受限的，并且每次你请求一个新的页面的时候 Cookie 都会被发送过去，这样无形中浪费了带宽，另外 cookie 还需要指定作用域，不可以跨域调用
2. 除此之外，WebStorage 拥有 setItem,getItem,removeItem,clear 等方法，不像 cookie 需要前端开发者自己封装 setCookie，getCookie
3. 但是 cookie 也是不可以或缺的：cookie 的作用是与服务器进行交互，作为 HTTP 规范的一部分而存在 ，而 Web Storage 仅仅是为了在本地“存储”数据而生
4. 浏览器的支持除了 IE ７及以下不支持外，其他标准浏览器都完全支持(ie 及 FF 需在 web 服务器里运行)，值得一提的是 IE 总是办好事，例如 IE7、IE6 中的 userData 其实就是 javascript 本地存储的解决方案。通过简单的代码封装可以统一到所有的浏览器都支持 web storage
5. localStorage 和 sessionStorage 都具有相同的操作方法，例如 setItem、getItem 和 removeItem 等

## cookie 和 session 的区别，用来做登陆保持的区别

1. cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
2. cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗
   1. 考虑到安全应当使用 session。
3. session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
   1. 考虑到减轻服务器性能方面，应当使用 COOKIE。
4. 单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。
5. 所以个人建议：
   1. 将登陆信息等重要信息存放为 SESSION
   2. 其他信息如果需要保留，可以放在 COOKIE 中
6. 登陆保持的原理：
   1. cookie：
      1. **存储用户登录的 sessionId**，每次请求的时候，带上，服务器通过 sessionId 来查询登陆信息；
      2. 直接存储登陆信息，每次直接带过去，这样真的很危险呀；
   2. session：请求的时候会将前一次服务器响应中的 Session ID**放在请求中**一并发送到服务器上。

## 描述 cookies、sessionStorage 和 localStorage 的区别

1. 与服务器交互：
   1. cookie 是网站为了**标示用户身份而储存在用户本地终端上的数据**（通常经过加密）
   2. cookie **始终会在同源 http 请求头中携带（即使不需要）**，在浏览器和服务器间来回传递
   3. sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存
2. 存储大小：
   1. cookie 数据根据不同浏览器限制，单条大小一般不能超过 4k，个数还有限制；
   2. sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。
3. 有期时间：
   1. localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
   2. sessionStorage 数据在当前浏览器窗口关闭后自动删除；
   3. cookie 设置的 cookie 过期时间之前一直有效，与浏览器是否关闭无关。
