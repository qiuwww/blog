---
title: cluster模块
date: 2019-3-6
tags:
  - Node
  - cluster
categories:
  - [Node, cluster]
---

## 是什么，集群

cluster **模块可以创建共享服务器端口的子进程**。

**单个 Node.js 实例运行在单个线程中**。 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。

Node 提供了 [cluster](http://nodejs.cn/api/cluster.html) 模块，该模块提供了更完善的 API，除了能够实现多进程充分利用 CPU 资源以外，还能够帮助我们更好地进行进程管理和处理进程的健壮性问题。

利用 child_process 和 cluster 模块能够很好地实现 **Master-Worker 模式多进程架构，实现单机服务器集群**，充分利用了多核 CPU 资源。

通过进程通信能够实现进程管理、重启以及负载均衡，从而提高集群的稳定性和健壮性。

## 如何使用

查看 demo/cluster。

## cluster 的工作原理

[cluster 的工作原理](http://nodejs.cn/api/cluster.html#cluster_how_it_works)

工作进程**由 child_process.fork() 方法创建**，因此它们**可以使用 IPC 和父进程通信，从而使各进程交替处理连接服务**。

cluster 模块支持两种分发连接的方法。

第一种方法（也是除 Windows 外所有平台的默认方法）是循环法，由**主进程负责监听端口**，接收新连接后再将连接循环分发给工作进程，在分发中使用了一些内置技巧防止工作进程任务过载。

第二种方法是，主进程创建监听 socket 后发送给感兴趣的工作进程，由工作进程负责直接接收连接。
