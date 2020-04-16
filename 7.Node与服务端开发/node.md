---
title: node
date: 2016-3-6
tags:
  - node
categories:
  - node
---

## node 常见问题

### node 中 cluster 是怎样开启多进程的，并且一个端口可以被多个进程监听吗

### node 接口转发有无做什么优化

### node 起服务如何保证稳定性，平缓降级，重启等

### 服务端怎么做统一的状态处理

### node 文件查找优先级

### npm2 和 npm3+有什么区别

## pm2

[深入浅出 Node.js Cluster](https://juejin.im/post/5c87760fe51d4507534c88e5)

PM2 其实利用的是 Node.js Cluster 模块来实现的，这个模块的出现就是为了解决 Node.js 实例单线程运行，无法利用多核 CPU 的优势而出现的。

### pm2 怎么做进程管理，进程挂掉怎么处理

### 不用 pm2 怎么做进程管理

### master 挂了的话 pm2 怎么处理

### 如何和 MySQL 进行通信

## 对Node或V8有深入理解
