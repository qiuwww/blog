---
title: HTML
date: 2019-1-29
tags:
  - HTML
categories:
  - [HTML]
---

[TOC]

## 标签基础|文档结构

## Doctype

### Doctype 作用？标准模式与兼容模式各有什么区别

- `<!DOCTYPE>`声明位于位`于HTML`文档中的第一行，处于 `<html>` 标签之前。告知浏览器的解析器**用什么文档标准解析这个文档**。`DOCTYPE`不存在或格式不正确会导致文档以兼容模式呈现
- 标准模式的排版和 JS 运作模式都是以**该浏览器支持的最高标准运行**。
- 在兼容模式中，**页面以宽松的向后兼容的方式显示**,模拟老式浏览器的行为以防止站点无法工作。

### HTML5 为什么只需要写<!DOCTYPE HTML>

- HTML5 不基于 SGML，**因此不需要对 DTD 进行引用**，但是需要 doctype 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）
- 而 HTML4.01 基于 SGML,所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型

### doctype 是什么,举例常见 doctype 及特点

1. `<!doctype>`声明必须处于 HTML 文档的头部，在`<html>`标签之前，HTML5 中不区分大小写
2. `<!doctype>`声明不是一个 HTML 标签，是一个用于**告诉浏览器当前 HTMl 版本的指令**
3. 现代浏览器的 html 布局引擎通过检查 doctype 决定使用兼容模式还是标准模式对文档进行渲染，一些浏览器有一个接近标准模型。
4. 在 HTML4.01 中`<!doctype>`声明指向一个 DTD，由于 HTML4.01 基于 SGML，所以 DTD 指定了标记规则以保证浏览器正确渲染内容
5. HTML5 不基于 SGML，所以不用指定 DTD

### 常见 dotype

1. **HTML4.01 strict**：不允许使用表现性、废弃元素（如 font）以及 frameset。声明：`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`
2. **HTML4.01 Transitional**:允许使用表现性、废弃元素（如 font），不允许使用 frameset。声明：`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`
3. **HTML4.01 Frameset**:允许表现性元素，废气元素以及 frameset。声明：`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">`
4. **XHTML1.0 Strict**:不使用允许表现性、废弃元素以及 frameset。文档必须是结构良好的 XML 文档。声明：`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`
5. **XHTML1.0 Transitional**:允许使用表现性、废弃元素，不允许 frameset，文档必须是结构良好的 XMl 文档。声明： `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
6. **XHTML 1.0 Frameset**:允许使用表现性、废弃元素以及 frameset，文档必须是结构良好的 XML 文档。声明：`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">`
7. **HTML 5**: `<!doctype html>`

### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些

- 行内元素有：`a b span img input select strong`（强调的语气）
- 块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4…p`
- 常见的空元素:`<br> <hr> <img> <input> <link> <meta>`

### 页面导入样式时，使用 link 和@import 有什么区别

link 属于 html 标签，随着 html 页面解析，会直接去下载解析。@import，需要等 css 解析完成才去下载，会阻塞页面的 cssom 的构建，阻塞页面显示。

- `link`属于`XHTML`标签，除了加载`CSS`外，还能用于定义`RSS`,定义`rel`连接属性等作用；而`@import`是`CSS`提供的，只能用于加载`CSS`
- 页面被加载的时，`link`会同时被加载，而`@import`引用的`CSS`会等到页面被加载完再加载
- `import`是`CSS2.1` 提出的，只在`IE5`以上才能被识别，而`link`是`XHTML`标签，无兼容问题

### 介绍一下你对浏览器内核的理解

- 主要分成两部分：**渲染引擎**(`layout engineer`或`Rendering Engine`)和`JS`引擎
- 渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核
- JS 引擎则：解析和执行 javascript 来实现**网页的动态效果**
- 最开始**渲染引擎和 JS 引擎**并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎

### 常见的浏览器内核有哪些

- `Trident`内核：`IE,MaxThon,TT,The World,360`,搜狗浏览器等。[又称 MSHTML]
- `Gecko`内核：`Netscape6`及以上版本，`FF,MozillaSuite/SeaMonkey`等
- `Presto`内核：`Opera7`及以上。[`Opera`内核原为：Presto，现为：`Blink`;]
- `Webkit`内核：`Safari,Chrome`等。[ `Chrome`的`Blink`（`WebKit`的分支）]

### html5 有哪些新特性、移除了那些元素？如何处理 HTML5 新标签的浏览器兼容问题？如何区分 HTML 和 HTML5

- HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加
  - 绘画 canvas
  - 用于媒介回放的 video 和 audio 元素
  - 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失
  - sessionStorage 的数据在浏览器关闭后自动删除
  - **语义化**更好的内容元素，比如 article、footer、header、nav、section
  - 表单控件，input 的 type：calendar、date、time、email、url、search
  - 新的技术 webworker, websocket, Geolocation
- 移除的元素：
  - 纯表现的元素：basefont，big，center，font, s，strike，tt，u
  - 对可用性产生负面影响的元素：frame，frameset，noframes
- 支持 HTML5 新标签：
  - IE8/IE7/IE6 支持通过`document.createElement`方法产生的标签
  - 可以利用这一特性让这些浏览器支持 HTML5 新标签
  - 浏览器支持新标签后，还需要添加标签默认的样式
- 当然也可以直接使用成熟的框架、比如 html5shim

```html
<!--[if lt IE 9]>
  <script>
    src = 'http://html5shim.googlecode.com/svn/trunk/html5.js';
  </script>
<![endif]-->
```

- 如何区分 HTML5： DOCTYPE 声明\新增的结构元素\功能元素

### HTML5 的离线储存怎么使用，工作原理能不能解释一下

- 在用户没有与因特网连接时，可以**正常访问站点或应用**，在用户与因特网连接时，更新用户机器上的缓存文件。
- **原理**：HTML5 的离线存储是基于一个新建的.appcache 文件的**缓存机制**(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。
- **用途**：html5 小游戏，展示页面，说明文档。
- 如何使用：
  - 页面头部像下面一样加入一个 manifest 的属性；
  - 在 cache.manifest 文件的编写离线存储的资源
  - 在离线状态时，操作 window.applicationCache 进行需求实现

```txt
CACHE MANIFEST
  #v0.11
  CACHE:
  js/app.js
  css/style.css
  NETWORK:
  resourse/logo.png
  FALLBACK:
  //offline.html
```

### 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢

- **在线的情况下**，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app，那么浏览器就会根据 manifest 文件的内容下载相应的资源**并且进行离线存储**。
- 如果**已经访问过 app 并且资源已经离线存储**了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
- 离线的情况下，浏览器就直接使用离线存储的资源。

### 请描述一下 cookies，sessionStorage 和 localStorage 的区别

- cookie 是网站为了**标示用户身份**而储存在用户本地终端（Client Side）上的数据（通常经过加密），配合 session 进行认证，每次请求都会一起发到后端。
- cookie 数据始终在**同源的 http 请求中携带**（即使不需要），记会在浏览器和服务器间来回传递
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- 存储大小：
  - `cookie`数据大小不能超过 4k
  - `sessionStorage`和`localStorage`虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大
- 有效时间：

  - `localStorage` 存储持久数据，浏览器关闭后数据不丢失**除非主动删除数据**
  - `sessionStorage` 数据在当前浏览器窗口关闭后自动删除，运行时本地存储
  - `cookie` 设置的`cookie`**过期时间之前一直有效**，即使窗口或浏览器关闭

### iframe 有那些优点和缺点

#### 缺点

- iframe 会**阻塞主页面的 Onload 事件**
- 搜索引擎的检索程序无法解读这种页面，**不利于 SEO**
- iframe 和主页面**共享连接池**，而浏览器对相同域的连接有限制（chrome 同时加载 6 个资源链接），所以会影响页面的并行加载
- 使用`iframe`之前需要考虑这两个缺点。如果需要使用`iframe`，最好是通过`javascript`动态给`iframe`添加`src`属性值，这样可以绕开以上两个问题

#### 优点

- 用来加载速度较慢的内容（如广告）
- 可以使脚本可以并行下载
- 可以实现跨子域通信

### HTML5 的 form 如何关闭自动完成功能

- 给不想要提示的 form 或某个 input 设置为 autocomplete=off。

### 如何在页面上实现一个圆形的可点击区域

- map+area 或者 svg
- border-radius
- 纯 js 实现 需要求一个点在不在圆上简单算法、获取鼠标坐标等等

### 实现不使用 border 画出 1px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果

```html
<div style="height:1px;overflow:hidden;background:red"></div>
```

### 网页验证码是干嘛的，是为了解决什么安全问题

- 区分用户是**计算机还是人的公共全自动程序**。可以防止恶意破解密码、刷票、论坛灌水
- 有效防止黑客对某一个特定注册用户用特定程序**暴力破解**方式进行不断的登陆尝试

### HTML5 有哪些新特性

- 新增选择器 document.querySelector、document.querySelectorAll
- **拖拽释放**(Drag and drop) API
- 媒体播放的 video 和 audio
- **本地存储** localStorage 和 sessionStorage
- **离线应用** manifest
- 桌面通知 Notifications
- **语意化标签** article、footer、header、nav、section
- **增强表单控件** calendar、date、time、email、url、search
- **地理位置** Geolocation
- 多任务 webworker
- **全双工通信协议** websocket
- 历史管理 history
- 跨域资源共享(CORS) Access-Control-Allow-Origin
- **页面可见性改变事件** visibilitychange
- **跨窗口通信** PostMessage
- Form Data 对象
- **绘画** canvas

### HTML5 移除了那些元素

- 纯表现的元素：basefont、big、center、font、s、strike、tt、u
- 对可用性产生负面影响的元素：frame、frameset、noframes

### 如何处理 HTML5 新标签的浏览器兼容问题

- 通过 document.createElement 创建新标签
- 使用垫片 html5shiv.js

### 如何区分 HTML 和 HTML5

- DOCTYPE 声明、新增的结构元素、功能元素

### label 的作用是什么？怎么使用的

#### label 标签来定义表单控件的关系

- 当用户选择 label 标签时，浏览器会自动将焦点转到和 label 标签相关的表单控件上

```html
<!-- 使用方法1： -->
<label for="mobile">Number:</label>
<input type="text" id="mobile" />
<!-- 使用方法2： -->
<label>Date:<input type="text" /></label>
```

### 如何实现浏览器内多个标签页之间的通信

- iframe + contentWindow
- postMessage
- SharedWorker(Web Worker API)
- storage 事件(localStorge API)
- WebSocket

### webSocket 如何兼容低浏览器

- Adobe Flash Socket
- ActiveX HTMLFile (IE)
- 基于 multipart 编码发送 XHR
- 基于长轮询的 XHR

### 页面可见性（Page Visibility API） 可以有哪些用途

就是在切换页面 tab 的时候会触发的事件，以及参数的更改。

- 通过 visibilityState 的值**检测页面当前是否可见，以及打开网页的时间**等;
- 在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放
- 当用户浏览其他页面，暂停网站首页幻灯自动播放
- 完成登陆后，无刷新自动同步其他页面的登录状态

### title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别

- title 表示是**整个页面标题**，h1 则表示层次明确的标题，对页面信息的抓取有很大的影响
- strong 标明**重点内容**，有语气加强的含义，使用阅读设备阅读网络时，strong 会重读，而 b 只是表示加粗，blod。
- i 内容展示为斜体，em 表示强调的文本
- 自然样式标签：b, i, u, s, pre
- 语义样式标签：strong, em, ins, del, code
- 应该准确使用语义样式标签, 但不能滥用。如果不能确定时，**首选使用自然样式标签**

### `<img>`的`title`和`alt`有什么区别

1. `title`是[global attributes](http://www.w3.org/TR/html-markup/global-attributes.html#common.attrs.core)之一，用于为元素提供附加的 advisory information。通常当鼠标滑动到元素上的时候显示。
2. `alt`是`<img>`的**特有属性**，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。**可提图片高可访问性**，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。

### HTML 全局属性(global attribute)有哪些

参考资料：[MDN: html global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)或者[W3C HTML global-attributes](http://www.w3.org/TR/html-markup/global-attributes.html#common.attrs.core)

- `accesskey`:设置快捷键，提供快速访问元素如`<a href="#" accesskey="a">aaa</a>`在 windows 下的 firefox 中按`alt + shift + a`可激活元素
- `class`:为元素设置**类标识**，多个类名用空格分开，CSS 和 javascript 可通过 class 属性获取元素
- `contenteditable`: 指定元素内容**是否可编辑**
- `contextmenu`: 自定义鼠标**右键弹出菜单内容**
- `data-*`: 为元素增加**自定义属性**
- `dir`: 设置元素**文本方向**,ltr|rtl
- `draggable`: 设置元素**是否可拖拽**
- `dropzone`: 设置元素**拖放类型**： copy, move, link
- `hidden`: 表示一个元素是否显示文档。样式上会导致元素不显示，但是不能用这个属性实现样式效果
- `id`: 元素 id，文档内唯一
- `lang`: 元素内容的的语言
- `spellcheck`: 是否启动拼写和语法检查
- `style`: 行内 css 样式
- `tabindex`: 设置元素可以获得焦点，通过 tab 可以导航
- `title`: 元素相关的建议信息
- `translate`: 元素和子孙节点内容是否需要**本地化**

### 置换元素与非置换元素

#### a) 置换元素

浏览器根据元素的**标签和属性**，来决定元素的具体显示内容。

例如：浏览器会根据`<img>`标签的 src 属性的值来读取图片信息并显示出来，**而如果查看(x)html 代码，则看不到图片的实际内容**；

`<input>`标签的 type 属性来决定是显示输入框，还是单选按钮等。

(x)html 中的`<img>`、`<input>`、`<textarea>`、`<select>`、`<object>`都是**置换元素**。这些元素往往没有实际的内容，即是一个空元素。

置换元素在其显示中生成了**框**，**这也就是有的内联元素能够设置宽高的原因**。

#### b) 不可替换元素

(x)html 的大多数元素是**不可替换元素，即其内容直接表现给用户端（如浏览器）**。

例如： `<label>`label 中的内容`</label>` 标签`<label>`是一个非置换元素，文字 label 中的内容”将全被显示。

## 常用标签

### [base 标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/base)

`<base>` 标签为页面上的所有链接规定默认地址或默认目标。

通常情况下，浏览器会从当前文档的 URL 中提取相应的元素来填写相对 URL 中的空白。

```html
<base href="http://www.example.com/" />
<base target="_blank" />
<base target="_top" href="http://www.example.com/" />
```

### [dialog 标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog)

### iframe 有那些缺点

1. iframe 会阻塞主页面的 Onload 事件；
2. 搜索引擎的检索程序无法解读这种页面，**不利于 SEO**;
3. **iframe 和主页面共享连接池，而浏览器对相同域的连接有限制**，所以会影响页面的并行加载。
4. 使用 iframe 之前需要考虑这两个缺点。如果需要使用 iframe，最好是通过 javascript 动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。

## HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset
