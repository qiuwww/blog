---
title: requestAnimationFrame
date: 2019-3-6
tags:
  - JS
  - requestAnimationFrame
categories:
  - [JS, requestAnimationFrame]
---

[TOC]

## requestAnimationFrame

**window.requestAnimationFrame()**，方法告诉浏览器您希望执行函数并请求浏览器在下一次重绘之前调用指定的函数来更新。该方法使用一个回调函数作为参数，这个回调函数会在**浏览器重绘之前调用**。

```js
window.requestAnimationFrame(callback);
```

callback

一个指定函数的参数，**该函数在下次重新绘制动画时调用**。这个回调函数只有一个传参，DOMHighResTimeStamp，指示 requestAnimationFrame()  开始触发回调函数的当前时间（performance.now()  返回的时间）。

return

一个 long 整数，请求 ID，是回调列表中唯一的标识。是个非零值，没别的意义。**你可以传这个值给  window.cancelAnimationFrame()  以取消回调函数**。

## 使用实例

```js
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```
