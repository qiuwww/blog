---
title: 浏览器存储
date: 2017-1-3
tags:
  - 浏览器存储
  - cookie
  - session
  - localStorage
  - sessionStorage
categories:
  - [浏览器, 浏览器存储]
---

## Cookie

Cookie 的弊端

- 每个特定的域名下最多生成的 cookie 个数有限制，20 个，不同浏览器不同
- IE 和 Opera 会清理近期最少使用的 cookie，Firefox 会随机清理 cookie
- cookie 的**最大大约为 4096 字节**，为了兼容性，一般设置不超过 4095 字节
- 如果 cookie 被人拦截了，就可以取得所有的 session 信息

## 浏览器本地存储，localStorage/sessionStorage

- 在较高版本的浏览器中，js 提供了 sessionStorage 和 globalStorage。在 HTML5 中提供了 localStorage 来取代 globalStorage
- html5 中的 Web Storage 包括了两种存储方式：**sessionStorage 和 localStorage**
- sessionStorage 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此 sessionStorage 不是一种持久化的本地存储，仅仅是会话级别的存储
- 而 localStorage 用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的

## web storage 和 cookie 的区别

- **Web Storage** 的概念和 cookie 相似，区别是它是为了更大容量存储设计的。Cookie 的大小是受限的，并且每次你请求一个新的页面的时候 Cookie 都会被发送过去，这样无形中浪费了带宽，另外 cookie 还需要指定作用域，不可以跨域调用
- 除此之外，WebStorage 拥有 setItem,getItem,removeItem,clear 等方法，不像 cookie 需要前端开发者自己封装 setCookie，getCookie
- 但是 cookie 也是不可以或缺的：cookie 的作用是与服务器进行交互，作为 HTTP 规范的一部分而存在 ，而 Web Storage 仅仅是为了在本地“存储”数据而生
- 浏览器的支持除了 IE ７及以下不支持外，其他标准浏览器都完全支持(ie 及 FF 需在 web 服务器里运行)，值得一提的是 IE 总是办好事，例如 IE7、IE6 中的 userData 其实就是 javascript 本地存储的解决方案。通过简单的代码封装可以统一到所有的浏览器都支持 web storage
- localStorage 和 sessionStorage 都具有相同的操作方法，例如 setItem、getItem 和 removeItem 等

## cookie 和 session 的区别

- 1、cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
- 2、cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗
  - 考虑到安全应当使用 session。
- 3、session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
  - 考虑到减轻服务器性能方面，应当使用 COOKIE。
- 4、单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。
- 5、所以个人建议：
  - 将登陆信息等重要信息存放为 SESSION
  - 其他信息如果需要保留，可以放在 COOKIE 中

## 描述 cookies、sessionStorage 和 localStorage 的区别

- 与服务器交互：

  - cookie 是网站为了**标示用户身份而储存在用户本地终端上的数据**（通常经过加密）
  - cookie **始终会在同源 http 请求头中携带（即使不需要）**，在浏览器和服务器间来回传递
  - sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存

- 存储大小：

  - cookie 数据根据不同浏览器限制，大小一般不能超过 4k
  - sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大

- 有期时间：
  - localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
  - sessionStorage 数据在当前浏览器窗口关闭后自动删除
  - cookie 设置的 cookie 过期时间之前一直有效，与浏览器是否关闭无关
