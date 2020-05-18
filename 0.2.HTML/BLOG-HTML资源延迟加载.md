---
title: JS实现延迟加载
date: 2017-3-6
tags:
  - JS
  - 延迟加载
categories:
  - [JS, 延迟加载]
---

网页中通常在 head 中包含 script 标签加载 js 文件，但有些 js 文件不是很重要，比如**网页数据统计的 js 脚本**，就可以在**网页显示完之后再慢慢加载**，这样也有利于网页的显示效率，别在加载 js 脚本的过程中，页面显示一片空白。

## 实现延迟加载的方式有很多种

1. 直接将 script 节点放置在</body>之前，也就是末尾展示，这样 js 脚本就会在页面显示出来之后再加载。
2. 使用 **script 标签**的**defer 和 async 属性**，**defer 属性为延迟加载，是在页面渲染完成之后再进行加载的**，**而 async 属性则是和文档并行加载**，这两种解决方案都不完美，原因在于不是所有浏览器都支持。
3. 通过监听页面 onload 事件，也就是**页面加载完成之后动态添加**，动态添加 script 节点：

```js
// Firefox，Opera，Chrome，Safari的方式
// [javascript] view plain copy
var script = document.createElement ("script");
script.type = "text/javascript";
// Firefox, Opera, Chrome, Safari 3+
script.onload = function(){
  alert("Script loaded!");
};

script.src = "script1.js";
document.getElementsByTagName("head")[0].appendChild(script);
// IE的方式
[javascript] view plain copy
var script = document.createElement("script")
script.type = "text/javascript";
// Internet Explorer
script.onreadystatechange = function(){
 if (script.readyState == "loaded" || script.readyState == "complete"){
    script.onreadystatechange = null;
    alert("Script loaded.");
 }
};
script.src = "script1.js";
document.getElementsByTagName("head")[0].appendChild(script);
```

其实 IE 和其它浏览器加载添加节点的方式都一样，只是加载之后监听是否成功的事件不一样，其实这个不需要也无所谓。

4. **通过 ajax 下载 js 脚本，动态添加 script 节点**，这种方式与第二种类似，区别就在与 js 脚本的自动下载还是通过 ajax 下载，ajax 的方式显然可控制性更好一点，它可以先下载 js 文件，但不立即执行。

```js
// 完整的ajax请求
var xhr = null; // 创建对象
if (window.XMLHttpRequest) {
  // 兼容性创建xhr对象
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
}
xhr.open('get', 'script1.js', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = xhr.responseText;
      document.body.appendChild(script);
    }
  }
};
xhr.send(null);
```

但是 ajax 有一个缺点，就是**无法引用使用 CDN 方式提供的 js 文件**，因为这种方式下，你即时通过 xhr.open 下载了 js 文件，而向 body 中注入 script 节点时**还是需要向 CDN 请求 js 文件**。

具体使用哪种方式就得看具体情况了，有几个原则：**如果使用延迟加载技术，那么 js 脚本应该不能对页面的元素进行更改；js 脚本文件的数量应该尽量少，可以将多个合并在一起。**



1. html 中 js 加载，**script 标签 defer 与 async**，使用 js 来生成标签来加载资源；

## html 中的文件异步加载

正常的页面解析：解析 html 文件，**遇到外部文件，就执行下载线程**，下载完成，按照顺序执行。

[浏览器渲染过程|从输入 url 到页面加载完成的过程都发生了什么](./3.浏览器原理/从输入url到页面加载完成的过程都发生了什么/BLOG-从输入url到页面加载完成的过程都发生了什么.md)

html 下载 js 文件的操作：

1. defer 与 async，`<script>`标签的属性
   1. defer 延迟脚本。`<script type="text/javascript" defer="defer" src="..."></script>`，设置给 javascript 标签，**立即下载，延时执行**。
   2. async 异步脚本，onload 之前执行，**告诉浏览器不需要等待脚本的下载和执行**，不保证执行顺序。
2. 文件加载与页面解析，同时加载 6 个资源，chrome
3. **js 延时加载文件，懒加载，使用 js 来生成标签来加载资源**
4. [worker，子线程的概念](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)
