---
title: WebSocket原理
date: 2017-2-6
tags:
  - WebSocket原理
  - socket.io
  - HTTP网络基础与网络协议
categories:
  - [HTTP网络基础与网络协议, WebSocket原理]
---

## WebSocket 是什么

1. WebSocket 是 HTML5 开始提供的**一种在单个 TCP 连接上进行全双工通讯的协议**。
2. WebSocket 使得**客户端和服务器**之间的数据交换变得更加简单，**允许服务端主动向客户端推送数据**。
3. 在 WebSocket API 中，**浏览器和服务器只需要完成一次握手**，两者之间就直接可以创建持久性的连接，并**进行双向数据传输**。
4. 浏览器通过 JavaScript **向服务器发出建立 WebSocket 连接的请求**，连接建立以后，客户端和服务器端就可以**通过 TCP 连接直接交换数据**。
5. 当你获取 Web Socket 连接后，你可以通过 **send**() 方法来向服务器发送数据，并通过 **onmessage** 事件来接收服务器返回的数据。
6. `var Socket = new WebSocket(url, [protocol] );`

## WebSocket 的本质

1. WebSocket 协议**本质上是一个基于 TCP 的协议，应用层协议**。
2. Websocket 使用 ws 或 wss 的**统一资源标志符**，类似于 HTTPS，其中 wss 表示在 TLS 之上的 Websocket。
3. Websocket **使用和 HTTP 相同的 TCP 端口，可以绕过大多数防火墙的限制**。默认情况下，Websocket 协议使用 80 端口；运行在 TLS 之上时，默认使用 443 端口。

## WebSocket 如何建立链接

1. 为了建立一个 WebSocket 连接，客户端浏览器**首先要向服务器发起一个 HTTP 请求**，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中**附加头信息"Upgrade: WebSocket**"表明这是一个**申请协议升级的 HTTP 请求**，
2. 服务器端解析这些附加的头信息**然后产生应答信息返回给客户端**，客户端和服务器端的 WebSocket 连接就建立起来了，
3. 双方就可以通过这个连接通道**自由的传递信息**，并且这个连接会持续存在直到客户端或者服务器端的**某一方主动的关闭连接**。

```js
const ws = new WebSocket('ws//:xxx.xx', [protocol]);

ws.onopen = () => {
  ws.send('hello');
  console.log('send');
};

ws.onmessage = (ev) => {
  console.log(ev.data);
  ws.close();
};

ws.onclose = (ev) => {
  console.log('close');
};

ws.onerror = (ev) => {
  console.log('error');
};
```

## WebSocket 的优点

1. 相对于传统的轮询：HTML5 定义的 WebSocket 协议，**能更好的节省服务器资源和带宽**，并且能够更实时地进行通讯。

## WebSocket 与 Socket.io

1. 实际应用中，如果需要 WebSocket 进行**双向数据通信**，Socket.io 是一个非常好的选择。
2. 其实 github 上面也有通过 JS 封装好的 Websocket 库，ws 可用于 client 和基于 node 搭建的服务端使用，但是用起来相对繁琐，star 相对 Socket.io 较少，所以不推荐使用。
3. **Socket.io 不是 Websocket**，它只是将 Websocket 和轮询 （Polling）机制以及其它的实时通信方式**封装成了通用的接口**，**并且在服务端实现了这些实时机制的相应代码**。
4. 也就是说，Websocket 仅仅是 Socket.io **实现实时通信的一个子集**。因此 Websocket 客户端连接不上 Socket.io 服务端，当然 Socket.io 客户端也连接不上 Websocket 服务端。

## 常见问题

### 如何知道是否断开了链接，服务端推送的时候

1. 心跳包：加一个**回传机制**，server 推送后，**客户端回传一个消息**，当 server 多次推送后，没有收到回传消息，**就删除这个客户端**；

### WebSocket 与 socket 的区别

1. 软件通信有七层结构，下三层结构偏向于数据通信，上三层更偏向于数据处理，**中间的传输层则是连接上三层与下三层之间的桥梁**，每一层都做不同的工作，上层协议依赖与下层协议。基于这个通信结构的概念。
2. Socket 其实并不是一个协议，**是应用层与 TCP/IP 协议族通信的中间软件抽象层，它是一组接口**。当两台主机通信时，让 Socket 去组织数据，以符合指定的协议。
3. TCP 连接则更依靠于底层的 IP 协议，IP 协议的连接则依赖于链路层等更低层次。
4. WebSocket 则是一个**典型的应用层协议**。

总的来说：**Socket 是传输控制层协议**，WebSocket 是应用层协议。

## 参考资料

[HTML5 WebSocket](https://www.runoob.com/html/html5-websocket.html)
[MDN WebSocket()](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket/WebSocket)
[Websocket 和 Socket.io 的区别及应用](https://www.jianshu.com/p/970dcfd174dc)
