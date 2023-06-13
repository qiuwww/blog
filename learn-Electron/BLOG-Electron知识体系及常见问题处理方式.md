---
title: Electron
date: 2020-3-10
---

[TOC]

## 是什么

[Electron](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)，是一个能让你使用传统前端技术（Nodejs, Javascript, HTML, CSS）开发一个**跨平台桌面应用的框架**。这里所说的桌面应用指的是在 Windows、OSX 及 Linux 系统上运行的程序，也能上架到 Mac 和 Windows 的 App Store。

Atom 编辑器问世，作为实现它的底层框架 Electron 也逐渐被熟知。

打开 VsCode，点击帮助菜单中的切换开发人员工具，可以在界面上看到我们熟悉的 Chrome devtool。

- JavaScript、HTML 和 CSS 都是 Web 语言，它们是组成网站的一部分，浏览器（如 Chrome）懂得如何将这些代码转为可视化图像。
- Electron 是一个库：Electron 对底层代码进行抽象和封装，让开发者能在此之上构建项目。

### 底层实现

由于应用场景是在系统平台上开发应用，所以我们开发时**需要有能调用原生系统 api 的能力**。为了能让前端语言能跟底层可以交互，**Electron 集成了 Nodejs+Chromium**。

Nodejs 主要负责应用程序主线程逻辑控制、底层交互等功能，Chromium 主要负责渲染线程窗口的业务逻辑。

这样的架构让单独升级 Chromium 版本成为可能。

### 主要模块

- Chromium
- Node.js
- 原生 API

原生 Node.js 模块 (即指，需要编译源码过后才能被使用的模块) 需要在编译后才能和 Electron 一起使用。

## 为什么要

以 Windows 平台为例，大部分人会首先想到使用 QT(C++)，WPF(C#) 等语言去开发应用。

使用 electron，可以使用 web 来开发 app 应用。

## 两个进程

Electron 有两种进程：**『主进程』和『渲染进程』**。部分模块只能在两者之一上运行，而有些则无限制。主进程更多地充当幕后角色，而渲染进程则是应用程序的各个窗口。

### 主进程

1. 主进程，通常是一个命名为 main.js 的文件，**该文件是每个 Electron 应用的入口（在 package.json 中声明的）**。**它控制了应用的生命周期**（从打开到关闭）。它既能调用原生元素，也能创建新的（多个）渲染进程。另外，Node API 是内置其中的。
2. 用于调用原生元素：打开 diglog 和其它操作系统的交互均是资源密集型操作（注：出于安全考虑，渲染进程是不能直接访问本地资源的），因此都需要在主进程完成。

### 渲染进程

1. 渲染进程是应用的一个**浏览器窗口**。与主进程不同，**它能存在多个**（注：一个 Electron 应用只能存在一个主进程）并且相互独立（它也能是隐藏的）。
2. 主窗口通常被命名为 index.html。它们就像典型的 HTML 文件，但 Electron 赋予了它们完整的 Node API（需要打开的时候注入）。因此，这也是它与浏览器的区别。
3. 渲染进程的窗口：
   1. 相互独立：每个渲染进程都是独立的，这意味着某个渲染进程的崩溃，也不会影响其余渲染进程。
   2. 隐藏：可隐藏窗口，然后让其在背后运行代码。

```js
const {
  // remote，在渲染进程中使用主进程模块。
  // remote 模块为渲染进程（web页面）和主进程通信（IPC）提供了一种简单方法。
  // 在Electron中, GUI 相关的模块 (如 dialog、menu 等) 仅在主进程中可用, 在渲染进程中不可用。 为了在渲染进程中使用它们, ipc 模块是向主进程发送进程间消息所必需的。
  // 使用 remote 模块, 你可以调用 main 进程对象的方法, 而不必显式发送进程间消息, 类似于 Java 的 RMI 。
  // shell，使用默认应用程序管理文件和 url。
  remote: { app, dialog, shell },
} = window.require('electron');
// 在用户的默认浏览器中打开 URL 的示例:
shell.openExternal('https://github.com');
```

## 主进程重要的模块

### app

### autoUpdater

### BrowserWindow

创建和控制浏览器窗口。

```js
// 在主进程中.
const { BrowserWindow } = require('electron');

// 或者从渲染进程中使用 `remote`.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 });
win.on('closed', () => {
  win = null;
});

// 加载远程URL
win.loadURL('https://github.com');

// 或加载本地HTML文件
win.loadURL(`file://${__dirname}/app/index.html`);
```

### dialog

显示用于打开和保存文件、警报等的本机系统对话框。

这个对话框是从 Electron 的主线程上打开的。如果要使用渲染器进程中的对话框对象, 可以使用 remote 来获得。

```js
// 主进程
const { dialog } = require('electron');
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }));

// 渲染进程，渲染进程调用主进程的包，需要.remote
const { dialog } = require('electron').remote;
console.log(dialog);
```

- dialog.showOpenDialogSync([browserWindow, ]options)
- dialog.showOpenDialog([browserWindow, ]options)

### globalShortcut

### Menu

### ipcMain 和 ipcRenderer

The ipcMain module is an Event Emitter. 当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。

#### IPCMain 和 IPCRenderer（进程之间的通信）

ipcMain 和 ipcRenderer 都是 **EventEmitter**的一个实例。EventEmitter 类是 NodeJS 事件的基础，它由 NodeJS 中的 events 模块导出。

#### 主进程与渲染进程通信

通过 channel 发送同步消息到主进程，可以携带任意参数。

```js
// render
import { ipcRenderer } from 'electron';
// 发送消息
ipcRenderer.send('sync-render', '我是来自渲染进程的异步消息');
// 发送同步消息将会阻塞整个渲染进程，直到收到主进程的响应。
const msg = ipcRenderer.sendSync('async-render', '我是来自渲染进程的同步消息');
// 接收消息
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg); // prints "pong"
});

// main
// 在主进程中.
const { ipcMain } = require('electron');
ipcMain.on('sync-render', (event, data) => {
  console.log(data);
});
ipcRenderer.sendSync('synchronous-message', 'ping');
```

#### 多个渲染进程间通信

[Electron 渲染进程之间的通信](https://blog.csdn.net/weixin_42762089/article/details/88532572)，通过 webContents 收发消息。

```js
// 1. 底层是 web socket
// 两个窗口互相获取对方的窗口 id, 并发送给渲染进程
win1.webContents.send('distributeIds', {
  win2Id: win2.id
});
win2.webContents.send('distributeIds', {
  win1Id: win1.id
});

// 2. 利用 remote 接口直接获取渲染进程发送消息
// 通过 id 得到窗口
remote.BrowserWindow.fromId(win2Id).webContents.send('someMsg', 'someThing');
// 3. 使用 ipcRenderer.sendTo()
ipcRenderer.sendTo(webContentsId, channel, [, arg1][, arg2][, ...])
ipcRenderer.sendTo(windowId, 'ping', 'someThing')
// 4. 通过主线程沟通
```

### process

通过 remote 获取到主进程的 process（主线程） 对象，可以获取到当前应用的各个版本信息：

- process.versions.electron：electron 版本信息
- process.versions.chrome：chrome 版本信息
- process.versions.node：node 版本信息
- process.versions.v8：v8 版本信息

os.homedir(); // node 的 os

remote.app.getAppPath();

## 渲染进程重要的模块

### desktopCapurer

### remote

在 Electron 中, GUI 相关的模块 (如 dialog、menu 等) **仅在主进程中可用, 在渲染进程中不可用**。

为了在渲染进程中使用它们, ipc 模块是向主进程发送进程间消息所必需的。 使用 remote 模块, 你可以调用 main 进程对象的方法, 而不必显式发送进程间消息, 类似于 Java 的 RMI 。

```js
// 从渲染进程创建浏览器窗口
const { BrowserWindow } = require('electron').remote;
let win = new BrowserWindow({ width: 800, height: 600 });
win.loadURL('https://github.com');
```

反过来（如果需要从主进程访问渲染进程），可以使用 webContents. executeJavascript 。

## 两进程均可调用的

### clipboard

### crashReporter

### screen

### shell

```js
import { shell } from 'electron';
import os from 'os';
shell.showItemInFolder(os.homedir());
```

## 进程间数据共享

### 主进程与渲染进程

```js
// 主进程
global.shared = {
  docsUrl,
  issueUrl,
  isProd,
  isMac,
  isWin,
  isDev,
};
// 渲染进程
// 可以使用及修改
const remote = require('electron').remote;
const { isProd } = remote.getGlobal('shared');
remote.getGlobal('shared').isProd = false;
```

### 渲染进程间

通过 HTML5 的接口，Storage API。

## next

1. node-learn/blog-node/Node 进程间通信；
