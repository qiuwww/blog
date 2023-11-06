---
title: JS事件处理
date: 2017-1-1
tags:
  - JS
  - 事件处理
categories:
  - [事件处理]
---

## 完整的事件流，分三个阶段

1. 捕获：从 `window` 对象传到 目标元素。
2. 目标阶段：事件通过捕获，到达目标元素，这个阶段就是目标阶段。
3. 冒泡：从**目标元素**传到 `Window` 对象。

## 介绍事件代理以及优缺点

事件委托原理：**事件冒泡机制**。

优点：

1. 可以大量节省内存占用，**减少事件注册**。比如 ul 上代理所有 li 的 click 事件就很不错。
2. 可以实现当新增子对象时，无需再对其进行事件绑定，**对于动态内容部分尤为合适**。

缺点：

事件代理的常用应用应该仅限于上述需求，**如果把所有事件都用事件代理，可能会出现事件误判**。即本不该被触发的事件被绑定上了事件。

## 单击事件与双击事件的相互不影响的处理方法

```js
// jq下的单击事件与双击事件的相互不影响的处理方法

var timeIdLabel,
  flag = true;

label.addEventListener('click', function (e) {
  flag = true;
  timeIdLabel = setTimeout(function () {
    if (flag) {
      console.log('单击触发事件：' + item.city);
    }
  }, 200);
});
label.addEventListener('dblclick', function (e) {
  clearTimeout(timeIdLabel);
  flag = false;
  // 还要调整中心位置和缩放等级
  // map.setCenter(this.point);
  // map.zoomIn();
  console.log('dbclick，双击事件触发放大一个等级事件：' + item.city);
});
```

## 监听 url 变化并处理

### 监听页面 hash 值改变，hashChange 事件，这里只能监听 hash 是不是改变了

```js
// 监听触发操作
function hashChange() {
  alert('URL的hash产生了变化');
}
// url变化监听器
if (
  'onhashchange' in window &&
  (typeof document.documentMode === 'undefined' || document.documentMode == 8)
) {
  // 浏览器支持onhashchange事件
  window.onhashchange = hashChange; // TODO，对应新的hash执行的操作函数
} else {
  // 不支持则用定时器检测的办法
  setInterval(function () {
    // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
    var ischanged = isHashChanged();
    if (ischanged) {
      hashChange(); // TODO，对应新的hash执行的操作函数
    }
  }, 150);
}
```

### url 变化监控应用

现在 SPA（single page application）单页面应用很火，就是一个页面加载所有的东西，如果一个网站有新闻中心，有数据中心，有个人中心，还能发布文章等功能，然而这个网页竟然只有一个页面，是不是很神奇。

单页面应用就是在干这样一件事情，传统的网站点击一个连接然后出现个空白页面刷新出来进入下一个页面，而单页面应用依靠 Ajax 或者 websocket 通信，通过各种 tab 切换或者类似弹窗（装扮的像真的网页一样，还带 url）来实现功能的切换，而用户以为进入了一个新的页面。

so，就可以用 hashchange 来解决这件事情：

- 先设定 hashchange 事件
- 当要切换页面或者 tab 或者弹窗的时候，通过 location.hash 来改变 hash 值
  此时 hashchange 捕捉到该变化，触发事件。

### 使用 [pushState](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API) 和 replaceState 来实现

浏览器不让 js 访问页面的历史信息，为了安全。只提供了一些 go，back 等。

但是 HTML5 还提供了 pushState 和 replaceState 新接口，**不仅可以实现替换 URL，还可以输出新的标题**，这样才完美的形成一个应用。

```js
$('.a').on('click', function () {
  // 创建新history实体
  history.pushState({ a: 'aa' }, '', location.href + '?' + Math.random());
});
$('.b').on('click', function () {
  // 修改新history实体(虽然浏览记录确实生成了2条，但是实际你只能找到被修改后的{a:'bb'})
  history.replaceState({ a: 'bb' }, '', location.href + '?' + Math.random() + '------');
});
// 每当活动的历史记录项发生变化时， popstate 事件都会被传递给window对象。
window.addEventListener('popstate', function () {
  // 前进后退触发
  console.log(history);
  console.log(history.state); // 这里是你设置的{a:'aa'}
});
```

## 下拉刷新，scroll

监听 scroll 事件，判断是否拉取到底部，拉到底部就执行动作。

```js
// 下拉刷新.js
function addScrollEvent() {
  var that = this;
  var $target = this.target;
  that.target.scroll(function () {
    var height = $target.height(); // 显示外框的高度，一般不改变
    var scrollTop = $target.scrollTop(); // 滚动了的距离
    var scrollHeight = $target[0].scrollHeight; // 内容的实际高度
    if (scrollTop + height >= scrollHeight - 10 && that.isMoreData) {
      that.show();
    }
  });
}
```

## 想要阻止事件的连续多次触发，防止误操作

1. 添加 loading 状态，**强制不可用**，或者按钮置灰之类的操作，确实可以防止多次请求，但是对用户不友好；
2. **延迟执行且中断上一次的请求**，**去抖动 debounce**，也就是保证只有一个请求的结果是有用的 abort 中断 promise。
3. 使用**节流函数 throttle**，一段时间内，只会触发一次。

## 输入的时候，输入汉字，会出现的问题

这段代码在 Android 上是没有问题的，但是在 iOS 中，input 事件会截断非直接输入，什么是非直接输入呢，在我们输入汉字的时候，比如说「喜茶」，中间过程中会输入拼音，每次输入一个字母都会触发 input 事件，然而在没有点选候选字或者点击「选定」按钮前，都属于非直接输入。

这显然不是我们想要的结果，我们希望在直接输入之后才触发 input 事件，这就需要引出我要说的两个事件—— compositionstart 和 compositionend。

compositionstart 事件在用户开始进行非直接输入的时候触发，而在非直接输入结束，也即用户点选候选词或者点击「选定」按钮之后，会触发 compositionend 事件。

```js
var inputLock = false;
function do(inputElement) {
  var regex = /[^1-9a-zA-Z]/g;
  inputElement.value = inputElement.value.replace(regex, '');
}

inputElement.addEventListener('compositionstart', function () {
  inputLock = true;
});
inputElement.addEventListener('compositionend', function (event) {
  inputLock = false;
  do (event.target);
})
inputElement.addEventListener('input', function (event) {
  if (!inputLock) {
    do (event.target);
    event.returnValue = false;
  }
});
// 添加一个 inputLock 变量，当用户未完成直接输入前，inputLock 为 true，不触发 input 事件中的逻辑，当用户完成有效输入之后，inputLock 设置为 false，触发 input 事件的逻辑。这里需要注意的一点是，compositionend 事件是在 input 事件后触发的，所以在 compositionend事件触发时，也要调用 input 事件处理逻辑。
```

[compositionstart](https://developer.mozilla.org/zh-CN/docs/Web/Events/compositionstart)
