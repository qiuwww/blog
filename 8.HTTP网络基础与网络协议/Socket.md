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

可以理解为**应用层与 TCP/IP 协议族通信**的接口封装，让人们更方便的使用。

Socket 是**应用层与 TCP/IP 协议族通信**的**中间软件抽象层**，它**是一组接口**。

在设计模式中，Socket 其实就是一个**门面模式**，**它把复杂的 TCP/IP 协议族隐藏在 Socket 接口后面**，对用户来说，一组简单的接口就是全部，让 Socket 去组织数据，以符合指定的协议。

![socket](./imgs/socket.gif)

而 WebSocket 则不同，它是一个完整的 应用层协议，包含一套标准的 API 。
