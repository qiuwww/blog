# HTTP请求方式及GET请求与POST请求

## HTTP 的几种请求方法的用途

- GET 方法：发送一个请求来取得服务器上的某一资源
- POST 方法：向 URL 指定的资源提交数据或附加新的数据
- PUT 方法：跟 POST 方法很像，也是想服务器提交数据。但是，它们之间有不同。PUT 指定了资源在服务器上的位置，而 POST 没有
- HEAD 方法：只请求页面的首部
- DELETE 方法：删除服务器上的某资源
- OPTIONS 方法：**它用于获取当前 URL 所支持的方法。**如果请求成功，会有一个 Allow 的头包含类似“GET,POST”这样的信息，get|post前，都会有一个options请求
- TRACE 方法：TRACE 方法被用于激发一个远程的，应用层的请求消息回路
- CONNECT 方法：把请求连接转换到透明的 TCP/IP 通道

## 区别

1.GET 在浏览器回退时是无害的，而 POST 会再次提交请求。
2.GET 产生的 URL 地址可以被 Bookmark，而 POST 不可以。
3.GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置。
4.GET 请求只能进行 url 编码，而 POST 支持多种编码方式。
5.GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留。
6.GET 请求在 URL 中传送的参数是有长度限制的，而 POST 么有。 7.对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制。
8.GET 比 POST**更不安全**，因为参数直接暴露在 URL 上（post 的参数也可以通过 url 传递啊），所以不能用来传递敏感信息。
9.GET 参数通过 URL 传递，POST（可以）放在 Request body 中。

## GET 和 POST 本质上没有区别

HTTP 的底层是 TCP/IP。所以 GET 和 POST 的底层也是 TCP/IP，也就是说，GET/POST 都是 TCP 链接。

GET 和 POST 能做的事情是一样一样的。

你要给 GET 加上 request body，给 POST 带上 url 参数，技术上是完全行的通的。

只是对不同类型的请求的一种包装。

> 业界不成文的规定是，（大多数）浏览器通常都会限制 url 长度在 2K 个字节，而（大多数）服务器最多处理 64K 大小的 url。

## 具体的区别

1. GET 产生一个 TCP 数据包；POST 产生两个 TCP 数据包。
   - 对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 200（返回数据）；
   - 而对于 POST，浏览器先发送 header，**服务器响应 100 continue**，浏览器再发送 data，服务器响应 200 ok（返回数据）。
