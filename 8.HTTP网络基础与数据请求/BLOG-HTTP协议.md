---
title: HTTP协议
date: 2017-3-6
tags:
  - HTTP协议
  - HTTP2.0
  - HTTPS
categories:
  - [HTTP, HTTP2.0]
  - [HTTP, HTTPS]
---

## 2. HTTP 协议的主要特点

- 简单快速
- 灵活
- **无连接**
- **无状态**

通常我们要答出以上四个内容。如果实在记不住，一定要记得后面的两个：**无连接、无状态**。

我们分别来解释一下。

### 2.1 简单快速

**简单**：每个资源（比如图片、页面）都通过 url 来定位。这都是固定的，在`http`协议中，处理起来也比较简单，想访问什么资源，直接输入 url 即可。

### 2.2 灵活

`http`协议的头部有一个`数据类型`，通过`http`协议，就可以完成不同数据类型的传输。

### 2.3 无连接

连接一次，就会断开，不会继续保持连接。

HTTP 协议是无状态的，指的是协议对于事务处理没有记忆能力，服务器不知道客户端是什么状态。也就是说，打开一个服务器上的网页和上一次打开这个服务器上的网页之间没有任何联系。HTTP 是一个无状态的面向连接的协议，无状态不代表 HTTP 不能保持 TCP 连接，更不能代表 HTTP 使用的是 UDP 协议（无连接）。

### 2.4 无状态

客户端和服务器端是两种身份。第一次请求结束后，就断开了，第二次请求时，**服务器端并没有记住之前的状态**，也就是说，服务器端无法区分客户端是否为同一个人、同一个身份。

有的时候，我们访问网站时，网站能记住我们的账号，这个是通过其他的手段（比如 `session`）做到的，并不是`http`协议能做到的。

## HTTP request 报文结构是怎样的

[rfc2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html)中进行了定义：

1. 首行是**Request-Line**包括：**请求方法**，**请求 URI**，**协议版本**，**CRLF**
2. 首行之后是若干行**请求头**，包括**general-header**，**request-header**或者**entity-header**，每个一行以 CRLF 结束
3. 请求头和消息实体之间有一个**CRLF 分隔**
4. 根据实际请求需要可能包含一个**消息实体**
   一个请求报文例子如下：

```
GET /Protocols/rfc2616/rfc2616-sec5.html HTTP/1.1
Host: www.w3.org
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36
Referer: https://www.google.com.hk/
Accept-Encoding: gzip,deflate,sdch
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6
Cookie: authorstyle=yes
If-None-Match: "2cc8-3e3073913b100"
If-Modified-Since: Wed, 01 Sep 2004 13:24:52 GMT

name=qiu&age=25
```

### Http 报文的请求会有几个部分

- Server
- Last-Modified
- Content-Length
- Cache-Control
- Expires
- Content-Type
- Date

## HTTP response 报文结构是怎样的

[rfc2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html)中进行了定义：

1. 首行是状态行包括：**HTTP 版本，状态码，状态描述**，后面跟一个 CRLF
2. 首行之后是**若干行响应头**，包括：**通用头部，响应头部，实体头部**
3. 响应头部和响应实体之间用**一个 CRLF 空行**分隔
4. 最后是一个可能的**消息实体**
   响应报文例子如下：

```
HTTP/1.1 200 OK
Date: Tue, 08 Jul 2014 05:28:43 GMT
Server: Apache/2
Last-Modified: Wed, 01 Sep 2004 13:24:52 GMT
ETag: "40d7-3e3073913b100"
Accept-Ranges: bytes
Content-Length: 16599
Cache-Control: max-age=21600
Expires: Tue, 08 Jul 2014 11:28:43 GMT
P3P: policyref="http://www.w3.org/2001/05/P3P/p3p.xml"
Content-Type: text/html; charset=iso-8859-1

{"name": "qiu", "age": 25}
```

## 持久链接/http1.1 长连接

如果你能答出持久链接，这是面试官很想知道的一个点。

- **轮询**：`http1.0`中，客户端每隔很短的时间，都会对服务器发出请求，查看是否有新的消息，只要轮询速度足够快，例如`1`秒，就能给人造成交互是实时进行的印象。这种做法是无奈之举，实际上对服务器、客户端双方都造成了大量的性能浪费。
- **长连接**：`HTTP1.1`中，通过使用`Connection:keep-alive`进行长连接，。客户端只请求一次，但是服务器会将继续保持连接，**当再次请求时，避免了重新建立连接(复用 tcp 连接)**。

注意，`HTTP 1.1`默认进行持久连接。在一次 `TCP` 连接中可以完成多个 `HTTP` 请求，但是对**每个请求仍然要单独发 header**，`Keep-Alive`不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如`Apache`）中设定这个时间。

### Keep-Alive

在下载某些站点的时候，看到返回的 http 头中，有明确的对长连接的 timeout 限制。

`Keep-Alive: timeout=1, max=100`

timeout：过期时间 1 秒（对应 httpd.conf 里的参数是：KeepAliveTimeout），max 是最多一百次请求。这两个限制条件，只要满足一个就会强制断掉连接。

就是在 timeout 时间内又有新的请求过来，同时 max 会自动减 1，直到为 0，强制断掉。

## 简述 http 1.1 与 http 1.0 的区别

- http 1.0 对于每个连接都得建立一次连接, **一次只能传送一个请求和响应**, 请求就会关闭, http1.0 没有 Host 字段

- 而 http1.1 在**同一个连接（tcp）中可以传送多个请求和响应**, 多个请求可以重叠和同时进行, http1.1 必须有 host 字段

- http1.1 中引入了 ETag 头, 它的值 entity tag 可以用来唯一的描述一个资源. 请求消息中可以使用 If-None-Match 头域来匹配资源的 entitytag 是否有变化

- http1.1 新增了 Cache-Control 头域(消息请求和响应请求都可以使用), 它支持一个可扩展的指令子集

- http1.0 中只定义了 16 个状态响应码, 对错误或警告的提示不够具体. http1.1 引入了一个 Warning 头域, 增加对错误或警告信息的描述. 且新增了 24 个状态响应码

## HTTP 与 HTTPS 的区别

Http 协议**运行在 TCP** 之上，**明文传输，客户端与服务器端都无法验证对方的身份**；

Https 是身披 SSL(Secure Socket Layer)外壳的 Http，**运行于 SSL 上**，SSL 运行于 TCP 之上，是添加了加密和认证机制的 HTTP。二者之间存在如下不同：

- 端口不同：Http 与 Https 使用不同的连接方式，用的端口也不一样，前者是 80，后者是 443；

- 资源消耗：和 HTTP 通信相比，Https 通信会由于加减密处理消耗更多的 CPU 和内存资源；

- 开销：**Https 通信需要证书**，而证书一般需要向认证机构购买；

- Https 的加密机制是一种**共享密钥加密和公开密钥加密并用的混合加密机制**。

## http2.0

**http2.0 不是 https**，它相当于是 http 的下一代规范（譬如 https 的请求可以是 http2.0 规范的）。

然后简述下 http2.0 与 http1.1 的**显著不同点**：

- http1.1 中，每请求一个资源，**都是需要开启一个 tcp/ip 连接的**，所以对应的结果是，每一个资源对应一个 tcp/ip 请求，由于 tcp/ip 本身**有并发数限制**，所以当资源一多，速度就显著慢下来
- **http2.0 中，一个 tcp/ip 请求可以请求多个资源，也就是说，只要一次 tcp/ip 请求，就可以请求若干个资源，分割成更小的帧请求，速度明显提升**。多个请求合成一个。
- 如果 http2.0 全面应用，**很多 http1.1 中的优化方案就无需用到了**（譬如打包成精灵图，静态资源多域名拆分等）。

**然后简述下 http2.0 的一些特性：**（感觉还需要很久啊）

- **多路复用**（即一个 tcp/ip 连接可以请求多个资源）href||src；
- **首部压缩**（http 头部压缩，减少体积）；
- **二进制分帧**（**在应用层跟传送层之间增加了一个二进制分帧层**，改进传输性能，实现低延迟和高吞吐量）；
- **服务器端推送**（服务端可以**对客户端的一个请求发出多个响应，可以主动通知客户端 websocket 替代**）；
- **请求优先级**（如果流**被赋予了优先级**，**它就会基于这个优先级来处理**，由服务器决定需要多少资源来处理该请求。）

## https

简单来看，https 与 http 的区别就是： **在请求前，会建立 ssl 链接，确保接下来的通信都是加密的，无法被轻易截取分析。**

**如果要将网站升级成 https，需要后端支持（后端需要申请证书等），然后 https 的开销也比 http 要大（因为需要额外建立安全链接以及加密等），**所以一般来说 http2.0 配合 https 的体验更佳（因为 http2.0 更快了）。

### [HTTPS 的加密过程](https://blog.csdn.net/qq_32998153/article/details/80022489)

SSL 和 TLS。
