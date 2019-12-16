---
title: 如何解决跨域问题
---

[九种跨域方式实现原理](https://mp.weixin.qq.com/s/y8yCb36Z8wmszOqo4FEAmg)

## 同源策略

同源是指"**协议+域名+端口**"三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源。

**同源策略**：限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。（来自 MDN 官方的解释）

### 同源策略限制内容有

- Cookie、LocalStorage、IndexedDB 等存储性内容
- DOM 节点
- AJAX 请求发送后，结果被浏览器拦截了

## 跨域通信的几种方式

方式如下：

1. `JSONP`
2. `WebSocket`
3. `CORS`
4. `Hash`
5. `postMessage`

> 上面这五种方式，在面试时，都要说出来。

### 1 JSONP

> 面试会问：`JSONP`的原理是什么？怎么实现的？

- 在`CORS`和`postMessage`以前，我们一直都是通过`JSONP`来做跨域通信的。

> **JSONP 的原理**：通过`<script>`标签的异步加载来实现的。比如说，实际开发中，我们发现，`head`标签里，可以通过`<script>`标签的`src`，里面放`url`，加载很多在线的插件。这就是用到了`JSONP`。

**JSONP 的实现：**

> 比如说，客户端这样写：

```html
<script src="http://www.smyhvae.com/?data=name&callback=myjsonp"></script>
```

> 上面的`src`中，`data=name`是 get 请求的参数，`myjsonp`是和后台约定好的函数名。
> 服务器端这样写：

```js
myjsonp({
  data: {},
});
```

> 于是，本地要求创建一个`myjsonp` 的**全局函数**，才能将返回的数据执行出来。

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
  util.createScript = function(url, charset) {
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
  util.jsonp = function(url, onsuccess, onerror, charset) {
    var callbackName = util.getName('tt_player'); //事先约定好的 函数名
    window[callbackName] = function() {
      //根据回调名称注册一个全局的函数
      if (onsuccess && util.isFunction(onsuccess)) {
        onsuccess(arguments[0]);
      }
    };
    var script = util.createScript(url + '&callback=' + callbackName, charset); //动态创建一个script标签
    script.onload = script.onreadystatechange = function() {
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
    script.onerror = function() {
      if (onerror && util.isFunction(onerror)) {
        onerror();
      }
    };
    document.getElementsByTagName('head')[0].appendChild(script); //往html中增加这个标签，目的是把请求发送出去
  };
</script>
```

### 2 WebSocket

> `WebSocket`的用法如下：

```javascript
//

var ws = new WebSocket('wss://echo.websocket.org'); //创建WebSocket的对象。参数可以是 ws 或 wss，后者表示加密。

//把请求发出去
ws.onopen = function(evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets!');
};

//对方发消息过来时，我接收
ws.onmessage = function(evt) {
  console.log('Received Message: ', evt.data);
  ws.close();
};

//关闭连接
ws.onclose = function(evt) {
  console.log('Connection closed.');
};
```

> 面试一般不会让你写这个代码，一般是考察你是否了解 `WebSocket`概念，知道有这么回事即可。

### 3 CORS

> `CORS` 可以理解成是**既可以同步、也可以异步**的 Ajax。

- fetch`是一个比较新的`API`，用来实现`CORS`通信。用法如下：

```javascript
// url（必选），options（可选）
fetch('/some/url/', {
  method: 'get',
})
  .then(function(response) {
    //类似于 ES6中的promise
  })
  .catch(function(err) {
    // 出错了，等价于 then 的第二个参数，但这样更好用更直观
  });
```

> 另外，如果面试官问：“CORS 为什么支持跨域的通信？”
> 答案：跨域时，浏览器会拦截`Ajax`请求，并在`http`头中加`Origin`。

### 4 Hash

- `url`的`#`后面的内容就叫`Hash`。**Hash 的改变，页面不会刷新**。这就是用 `Hash` 做跨域通信的基本原理。

> 补充：`url`的`?`后面的内容叫`Search`。`Search`的改变，会导致页面刷新，因此不能做跨域通信。

**使用举例：**

**场景**：我的页面 `A` 通过`iframe`或`frame`嵌入了跨域的页面 `B`。

> 现在，我这个`A`页面想给`B`页面发消息，怎么操作呢？

1. 首先，在我的`A`页面中：

```javascript
//伪代码
var B = document.getElementsByTagName('iframe');
B.src = B.src + '#' + 'jsonString'; //我们可以把JS 对象，通过 JSON.stringify()方法转成 json字符串，发给 B
```

2. 然后，在`B`页面中：

```javascript
// B中的伪代码
window.onhashchange = function() {
  //通过onhashchange方法监听，url中的 hash 是否发生变化
  var data = window.location.hash;
};
```

### 5 postMessage()方法

> `H5`中新增的`postMessage()``方法，可以用来做跨域通信。既然是 H5 中新增的，那就一定要提到。

**场景**：窗口 A (`http:A.com`)向跨域的窗口 B (`http:B.com`)发送信息。步骤如下

1. 在`A`窗口中操作如下：向`B`窗口发送数据：

```javascript
// 窗口A(http:A.com)向跨域的窗口B(http:B.com)发送信息
Bwindow.postMessage('data', 'http://B.com'); //这里强调的是B窗口里的window对象
```

2. 在`B`窗口中操作如下：

```javascript
// 在窗口B中监听 message 事件
Awindow.addEventListener(
  'message',
  function(event) {
    //这里强调的是A窗口里的window对象
    console.log(event.origin); //获取 ：url。这里指：http://A.com
    console.log(event.source); //获取：A window对象
    console.log(event.data); //获取传过来的数据
  },
  false,
);
```
