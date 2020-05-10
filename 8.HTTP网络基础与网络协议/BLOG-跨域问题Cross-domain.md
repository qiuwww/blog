---
title: 如何解决跨域问题
date: 2017-2-6
tags:
  - HTTP请求
  - 跨域
categories:
  - [HTTP请求, 跨域]
  - [HTTP网络基础与网络协议]
---

[参考资料：九种跨域方式实现原理](https://mp.weixin.qq.com/s/y8yCb36Z8wmszOqo4FEAmg)

## 为什么会有跨域的问题

避免不同源的页面的信息被读取，需要限制页面之间的数据共享。

浏览器采取的措施，如果浏览器检测到不同源，且不允许跨域，就会阻止请求的发送。

如果没有同源策略，不同源的数据和资源（如 HTTP 头、Cookie、DOM、localStorage 等）就能相互随意访问，根本没有隐私和安全可言。

## 同源策略

同源是指"**协议+域名+端口**"三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源。

**同源策略**：限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个**用于隔离潜在恶意文件的关键的安全机制**。（来自 MDN 官方的解释）

### 同源策略限制内容有

- Cookie、LocalStorage、sessionStorage、IndexedDB 等存储性内容
- DOM 节点
- 数据请求，ajax/fetch

## 如何跨域，解决原理(比如 jsonp 的原理)

方式如下：

1. `JSONP`
2. `WebSocket`
3. `CORS`
4. `Hash`
5. `postMessage`

上面这五种方式，在面试时，都要说出来。

### 1 JSONP，`JSONP`的原理是什么？怎么实现的

资源文件请求不受同源策略的限制。

在`CORS`和`postMessage`以前，我们一直都是通过`JSONP`来做跨域通信的。

**JSONP 的原理**：通过`<script>`标签的异步加载来实现的。比如说，实际开发中，我们发现，`head`标签里，可以通过`<script>`标签的`src`，里面放`url`，加载很多在线的插件。这就是用到了`JSONP`。

**JSONP 的实现：**

比如说，客户端这样写：

```html
<script src="http://www.smyhvae.com/?data=name&callback=myjsonp"></script>
```

上面的`src`中，`data=name`是 get 请求的参数，`myjsonp`是和后台约定好的函数名。
服务器端这样写：

```js
myjsonp({
  data: {},
});
```

于是，本地要求创建一个`myjsonp` 的**全局函数**，才能将返回的数据执行出来。

**实际开发中，前端的 JSONP 是这样实现的：**

```html
<script>
  var util = {};
  //定义方法：动态创建 script 标签
  /**
   * [function 在页面中注入js脚本]
   * @param  {[type]} url     [description]
   * @param  {[type]} charset [description]
   * @return {[type]}         [description]
   */
  util.createScript = function (url, charset) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    charset && script.setAttribute('charset', charset);
    script.setAttribute('src', url);
    script.async = true;
    return script;
  };

  /**
   * [function 处理jsonp]
   * @param  {[type]} url      [description]
   * @param  {[type]} onsucess [description]
   * @param  {[type]} onerror  [description]
   * @param  {[type]} charset  [description]
   * @return {[type]}          [description]
   */
  util.jsonp = function (url, onsuccess, onerror, charset) {
    var callbackName = util.getName('tt_player'); //事先约定好的 函数名
    window[callbackName] = function () {
      //根据回调名称注册一个全局的函数
      if (onsuccess && util.isFunction(onsuccess)) {
        onsuccess(arguments[0]);
      }
    };
    var script = util.createScript(url + '&callback=' + callbackName, charset); //动态创建一个script标签
    script.onload = script.onreadystatechange = function () {
      //监听加载成功的事件，获取数据
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;
        // 移除该script的 DOM 对象
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        // 删除函数或变量
        window[callbackName] = null; //最后不要忘了删除
      }
    };
    script.onerror = function () {
      if (onerror && util.isFunction(onerror)) {
        onerror();
      }
    };
    document.getElementsByTagName('head')[0].appendChild(script); //往html中增加这个标签，目的是把请求发送出去
  };
</script>
```

### 2 WebSocket

socket 通信，不同页面之间可以相互发送消息，只要知道对方的地址

`WebSocket`的用法如下：

```javascript
var ws = new WebSocket('wss://echo.websocket.org'); //创建WebSocket的对象。参数可以是 ws 或 wss，后者表示加密。

//把请求发出去
ws.onopen = function (evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets!');
};

//对方发消息过来时，我接收
ws.onmessage = function (evt) {
  console.log('Received Message: ', evt.data);
  ws.close();
};

//关闭连接
ws.onclose = function (evt) {
  console.log('Connection closed.');
};
```

一般是考察你是否了解 `WebSocket`概念，知道有这么回事即可。

### 3 CORS，cross-origin sharing

服务端开启跨域，服务端允许来自某个域的接口请求数据。

`Access-Control-Allow-Origin: *`

### 4 Hash/window.name

hashchange，取检测 hash 变化，和 hash 带过来的参数。

### 5 [postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)()方法

window.postMessage() 方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于**具有相同的协议**（通常为 https），**端口号**（443 为 https 的默认值），**以及主机 (两个页面的模数 Document.domain 设置为相同的值) 时**，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

**不同域页面间可以相互发送消息**，页面进程间通信。

`H5`中新增的`postMessage()``方法，可以用来做跨域通信。既然是 H5 中新增的，那就一定要提到。

**场景**：窗口 A (`http:A.com`)向跨域的窗口 B (`http:B.com`)发送信息。步骤如下

1. 在`A`窗口中操作如下：向`B`窗口发送数据：

```js
// 窗口A(http:A.com)向跨域的窗口B(http:B.com)发送信息
Bwindow.postMessage('data', 'http://B.com'); //这里强调的是B窗口里的window对象
```

2. 在`B`窗口中操作如下：

```js
// 在窗口B中监听 message 事件
Awindow.addEventListener(
  'message',
  function (event) {
    //这里强调的是A窗口里的window对象
    console.log(event.origin); //获取 ：url。这里指：http://A.com
    console.log(event.source); //获取：A window对象
    console.log(event.data); //获取传过来的数据
  },
  false,
);
```

### 6. 后端转发请求，按道理算是后端不受跨域限制，也算是一种吧 ｜ Nginx反向代理（运维配置）

当直接访问别的域下的接口的时候，会遇到这个问题，这个时候需要后端转发一下请求，这样就不会有跨域的问题了。

## 预检请求

在 cors 的时候，请求会有一个预检请求，发送一个 options 请求，获取服务器是否允许发送跨域请求，以及允许的域，如果允许跨域就继续发送后续的请求，如果不允许就提示不允许跨域。

[prefligh request 预检请求](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)，HTTP 的 [OPTIONS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 方法 用于**获取目的资源所支持的通信选项**。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为“\*”）使用该方法。

`curl -X OPTIONS http://example.org -i`

### 为什么要发预检请求

出于安全考虑，浏览器会限制从脚本发起的跨域 HTTP 请求，像 XMLHttpRequest 和 Fetch 都遵循**同源策略**。

**浏览器限制**跨域请求一般有两种方式：

- 浏览器**限制发起跨域请求**
- 跨域请求可以正常发起，但是**返回的结果被浏览器拦截**了

一般浏览器都是**第二种方式**限制跨域请求，**那就是说请求已到达服务器，并有可能对数据库里的数据进行了操作，但是返回的结果被浏览器拦截了**，那么我们就获取不到返回结果，这是一次失败的请求，**但是可能对数据库里的数据产生了影响**。

为了防止这种情况的发生，规范要求，对这种可能对服务器数据产生副作用的 HTTP 请求方法，**浏览器必须先使用 OPTIONS 方法发起一个预检请求**，

从而获知服务器**是否允许该跨域请求**：**如果允许，就发送带数据的真实请求；如果不允许，则阻止发送带数据的真实请求。**

### 什么时候发预检请求

HTTP 请求包括： 简单请求 和 需预检的请求

#### 简单请求，简单请求不会触发 CORS 预检请求

- GET
- HEAD
- POST
  - Content-Type: (**仅当** POST 方法的 Content-Type 值等于下列之一才算做简单需求)
    - text/plain
    - multipart/form-data
    - application/x-www-form-urlencoded

#### 需预检的请求

“需预检的请求”要求必须首先使用 OPTIONS 方法发起一个预检请求到服务区，**以获知服务器是否允许该实际请求**。

如下需要发送预检请求：

使用了下面任一 HTTP 方法：

- PUT
- DELETE
- CONNECT
- OPTIONS
- TRACE
- PATCH

**人为设置了对 CORS 安全的首部字段集合之外的其他首部字段**。该集合为：

- Accept
- Accept-Language
- Content-Language
- Content-Type
- DPR
- Downlink
- Save-Data
- Viewport-Width
- Width
- Content-Type 的值不属于下列之一:
  - application/x-www-form-urlencoded
  - multipart/form-data
  - text/plain

## 表单可以跨域吗

跨域问题是浏览器的安全限制策略。

ajax 跨域限制，是因为浏览器要保护用户的安全和因素而给 js 设定的限制。

表单可以直接跨域上传，因为原页面用 form 提交到另一个域名之后，**原页面的脚本无法获取新页面中的内容**。所以浏览器认为这是安全的。

而 **AJAX 是可以读取响应内容的**，因此浏览器不能允许你这样做。

如果你细心的话你会发现，**其实请求已经发送出去了，你只是拿不到响应而已**。所以浏览器这个策略的本质是，**一个域名的 JS ，在未经允许的情况下，不得读取另一个域名的内容**。但浏览器并不阻止你向另一个域名发送请求。
