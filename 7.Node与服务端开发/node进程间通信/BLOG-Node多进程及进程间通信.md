---
title: Node多进程及进程间通信
date: 2017-6-6
tags:
  - Node
  - 多进程
  - 进程间通信
categories:
  - [Node, 多进程]
  - [Node, 进程间通信]
---

Node.js 以单线程的模式运行，使用事件驱动来处理异步 IO 并发（底层是多线程的线程池）。

然而，要是 Node 运行在一个**多核 CPU 上**，如何**让 Node 充分利用多核的优势**，并行地处理任务？我们可以使用**多进程**。由于 Node 的单线程特性，开启多进程后，Node 也获得多线程的执行能力。

1. Node 的**主进程**，process，是一个 node 环境全局可访问的对象；
2. Node 提供了 **child_process 模块来创建子进程**。

## Node 的模型 ｜ Node 中的进程与线程

1. Node.js 里通过 `childProcess` 开启一个**服务进程**，多进程就是**进程的复制（fork）**，fork 出来的每个进程都拥有自己的独立空间地址、数据栈，**一个进程无法访问另外一个进程里定义的变量、数据结构**，只有建立了 **IPC 通信**，进程之间才可数据共享。

2. Node.js 是 Javascript 在服务端的运行环境，**构建在 chrome 的 V8 引擎之上**，基于**事件驱动**、非阻塞 I/O 模型，充分利用操作系统提供的异步 I/O 进行多任务的执行，**适合于 I/O 密集型的应用场景**，因为异步，程序无需阻塞等待结果返回，而基于回调通知的机制，原本同步模式等待的时间，则可以用来处理其它任务，在 Web 服务器方面，**著名的 Nginx 也是采用此模式（事件驱动）**，Nginx 采用 C 语言进行编写，主要用来做高性能的 Web 服务器，不适合做业务。Web 业务开发中，**如果你有高并发应用场景那么 Node.js 会是你不错的选择**。

3. 在单核 CPU 系统之上我们采用 单进程 + 单线程 的模式来开发。**在多核 CPU 系统之上，可以通过 child_process.fork 开启多个进程**（Node.js 在 v0.8 版本之后新增了 Cluster 来实现多进程架构） ，即 **多进程 + 单线程 模式**。注意：开启多进程不是为了解决高并发，主要是解决了单进程模式下 Node.js CPU 利用率不足的情况，充分利用多核 CPU 的性能。

## Node 的 process 模块

process 对象是一个**全局变量**，它提供有关当前 Node.js 进程的信息并对其进行控制。 作为一个全局变量，它始终可供 Node.js 应用程序使用，无需使用 require()。

[Process，主进程，相当于浏览器的主进程](http://nodejs.cn/api/process.html)

1. process.env：环境变量，例如通过 process.env.NODE_ENV 获取不同环境项目配置信息
2. process.nextTick：这个在谈及 Event Loop 时经常为会提到，相当于 setTimeout
3. process.pid：获取当前进程 id
4. process.ppid：当前进程对应的**父进程**
5. process.cwd()：获取**当前进程工作目录**
6. process.platform：获取**当前进程运行的操作系统平台**
7. process.uptime()：当前进程已运行时间，例如：pm2 守护进程的 uptime 值
   进程事件：process.on(‘uncaughtException’, cb) 捕获异常信息、process.on(‘exit’, cb）进程推出监听
8. 三个标准流：
   1. process.stdout 标准输出、
   2. process.stdin 标准输入、
   3. process.stderr 标准错误输出

## Node 的 child_process 模块

[child_process（子进程）](http://nodejs.cn/api/child_process.html)

child_process 模块提供了衍生子进程的能力（以一种与 popen(3) 类似但不相同的方式）。

### 子进程创建方式

1. child_process.spawn()：适用于**返回大量数据**，例如图像处理，二进制数据处理。
2. [child_process.exec()](http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback)：适用于**小量数据**，**maxBuffer 默认值为 200 \* 1024 超出这个默认值将会导致程序崩溃**，数据量过大可采用 spawn。
3. child_process.execFile()：类似 child_process.exec()，区别是不能通过 shell 来执行，不支持像 I/O 重定向和文件查找这样的行为
4. [child_process.fork(modulePath[, args][, options])](http://nodejs.cn/api/child_process.html#child_process_child_process_fork_modulepath_args_options)： **衍生新的进程，进程之间是相互独立的**，每个进程**都有自己的 V8 实例、内存**，系统资源是有限的，不建议衍生太多的子进程出来，通长根据系统 CPU 核心数设置。

#### exec

**衍生一个 shell 然后在该 shell 中执行 command，并缓冲任何产生的输出**。 传给 exec 函数的 command 字符串由 shell 直接处理，特殊字符（因 shell 而异）需要相应地处理。

#### spawn

child_process.spawn() 方法**使用给定的 command 衍生一个新进程**，并带上 args 中的命令行参数。

#### fork

child_process.fork() 方法是 child_process.spawn() 的一个特例，专门用于衍生新的 Node.js 进程。 与 child_process.spawn() 一样返回 ChildProcess 对象。 返回的 ChildProcess 将会内置一个额外的通信通道，允许消息在父进程和子进程之间来回传递。

## Node 开启多进程及进程间通信

1. 可以使用 exec 或者 spawn 或者 fork 来开启子进程。参考`demo/exec-process`和`demo/fork-process`；

### 通信方式

1. 1.通过 stdin/stdout 传递 json，最直接的通信方式，拿到子进程的 handle 后，可以访问其 stdio 流，然后约定一种 message 格式开始愉快地通信；
2. 原生 IPC 方式，如 spawn()及 fork()的例子，进程之间可以借助内置的 IPC 机制通信；
3. 通过网络 Sockets，**借助网络完成进程通信**,不仅能跨进程还能跨机器，node-ipc 就采用这种方案；

### IPC 通信

IPC 全称是 **Inter-Process Communication，即进程间通信**，Node 实现 IPC 使用**管道(pipe)技术**，具体实现细节由 libuv 提供。在 Windows 下由命名管道（named pipe）实现，Linux 下采用 Unix Domain Socket 实现。表现在应用层上的进程间通信只有简单的 message 事件和 send() 方法。父进程在实际创建子进程之前，会创建 IPC 通道并监听它，然后才真正创建出子进程，并且通过环境变量 NODE_CHANNEL_FD 告诉子进程这个 IPC 通道的文件描述符。子进程通过这个文件描述符去连接这个已存在的 IPC 通道，从而完成父子进程之间的连接。

由于 IPC 管道是用命名管道或者 Domain Socket 创建的，**与网络 socket 比较类似，属于双向通行**。不同的是它们在系统内核中就完成了进程间的通信，而不是通过网络层，非常高效。

当父进程和子进程之间已建立了一个 **IPC 通道**时（例如，使用 child_process.fork()），

1. subprocess.send() 方法可用于发送消息到子进程。
2. 当子进程是一个 Node.js 实例时，则消息可以**通过 'message' 事件接收**。

[1. subprocess.send(message[, sendHandle[, options]][, callback])](http://nodejs.cn/api/child_process.html#child_process_subprocess_send_message_sendhandle_options_callback)
[2. 'message' 事件](http://nodejs.cn/api/child_process.html#child_process_event_message)

### 1.父子进程间通信

参考 demo/ipc-message。

如 spawn()及 fork()的例子，进程之间可以借助内置的 IPC 机制通信。

父进程：

1. process.on('message')收
2. child.send()发

子进程：

1. process.on('message')收
2. process.send()发

限制同上，同样要有一方能够拿到另一方的 handle 才行

1. Node 父子进程之间可以通过 `on('message')`和 `send()`来实现通信，on('message')其实是**监听 message 事件**，当该进程收到其他进程发送的消息时，便会触发 message 事件。
2. send()方法则是用于向其他进程发送信息。
3. master 进程中调用 child_process 的 **fork()方法**后会得到一个子进程的实例 worker，通过这个实例可以监听来自子进程的消息或者向子进程发送消息。worker 进程则**通过 process 对象接口监听来自父进程的消息或者向父进程发送消息**。

### 2.Node 子进程之间通信 ｜ 兄弟进程间通信

1. 通过主进程中转，不过效率也太低了，参考 demo/ipc-message。；
2. Sockets，借助网络通信。

## 守护进程

Node.js 开发的同学们可能熟悉，当我们打开终端执行  node app.js  开启一个服务进程之后，这个终端就会一直被占用，**如果关掉终端，服务就会断掉，即前台运行模式**。如果采用守护进程进程方式，这个终端我执行  node app.js  开启一个服务进程之后，我还可以在这个终端上做些别的事情，且不会相互影响。

在实际工作中对于守护进程并不陌生，例如 **PM2、Egg-Cluster** 等。

## 参考文章

[试玩 NodeJS 多进程](https://blog.csdn.net/hongchh/article/details/79898816)

[Nodejs 进程之间通信方式](https://www.jianshu.com/p/4e5007b55117)

[Nodejs 进程间通信](http://www.ayqy.net/blog/nodejs%E8%BF%9B%E7%A8%8B%E9%97%B4%E9%80%9A%E4%BF%A1/)
