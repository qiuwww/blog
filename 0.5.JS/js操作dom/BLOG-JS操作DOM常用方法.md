---
title: JS操作DOM常用方法
date: 2017-3-6
tags:
  - JS
  - DOM
categories:
  - [JS]
  - [浏览器, DOM]
---

[TOC]

## 对比 document 的 query 方法和 getElementByTagName 之类的方法

- 得到的元素结果不一样，query 得到的是 NodeList，get\*方法得到的是 HTMLCollection。
- query 选择符选出来的**元素及元素数组是静态**的，而 getElement 这种方法选出的元素是**动态的**。静态的就是说选出的所有元素的数组，不会随着文档操作而改变。
- 在使用的时候 getElement 这种方法性能比较好，query 选择符则比较方便。

## JS 操作 DOM，增删改查

1、创建新节点

```js
createDocumentFragment(); // 创建一个DOM片段
createElement(); // 创建一个具体的元素
createTextNode(); // 创建一个文本节点
```

2、添加、移除、替换、插入

```js
appendChild();
removeChild();
replaceChild();
insertBefore(); // 在已有的子节点前插入一个新的子节点
```

3、查找

```js
getElementsByTagName(); // 通过标签名称
getElementsByName(); // 通过元素的 Name 属性的值(IE 容错能力较强，会得到一个数组，其中包括 id 等于 name 值的)
getElementById(); // 通过元素 Id，唯一性
```

## class 操作使用 classList

- Element.classList 是一个**只读属性**，返回一个元素的类属性的实时 DOMTokenList 集合。
- 使用 classList 是一个方便的替代方法，通过 element.className 作为空格分隔的字符串访问元素的类列表。

```js
// div 是具有 class =“foo bar”的<div>元素的对象引用
div.classList.remove('foo'); // 删
div.classList.add('anotherclass'); // 增

// 如果 visible 被设置则删除它，否则添加它
div.classList.toggle('visible'); // 增删

// 添加/删除 visible，取决于测试条件，i 小于 10
div.classList.toggle('visible', i < 10);

div.classList.contains('foo'); // 查询

// 添加或删除多个类
div.classList.add('foo', 'bar');
div.classList.remove('foo', 'bar');
```

## cssText 返回样式规则所包含的实际文本.想要能够动态的设置一个样式表规则

cssText，DOMString 类型，cssText 特性必须返回序列化的 CSS 规则。

当设置 cssText 特性时运行这些步骤：

1. 解析其值。
2. 如果解析失败则终止运行。
3. 如果新对象的 type 并不匹配当前对象的 type 则抛出"InvalidModificationError"异常。
4. 替换当前对象为新对象。

```js
// 原来的样式设置：
xxx.style.width = '233px';
xxx.style.position = 'fixed';
xxx.style.left = '233px';

// 替换方案：
xxx.style.cssText = 'width:233px;height:233px;position:fixed';
```

## getComputedStyle，获取元素的属性值

Window.getComputedStyle()方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有 CSS 属性的值。 私有的 CSS 属性值可以通过对象提供的 API 或通过简单地使用 CSS 属性名称进行索引来访问。

`let style = window.getComputedStyle(element, [pseudoElt]);`

[查看 getComputedStyle-demo](./getComputedStyle-demo.html)

## [getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)，获取元素相对于浏览器窗口的位置及大小关系

Element.getBoundingClientRect() 方法返回**元素的大小及其相对于视口的位置**。

rect 是一个具有四个属性 left、top、right、bottom 的 DOMRect 对象
译者注：DOMRect 是 TextRectangle 或 ClientRect 的别称，他们是相同的。

`var rect = dom.getBoundingClientRect();`

## 元素的 width 与 height

[screen/client/offset/scroll/inner/avail](../imgs/元素的宽高大小.jpg)

- screen：**屏幕**。这一类取到的是关于**屏幕的宽度和距离**，**与浏览器无关**，应该是获取 window 对象的属性。

- client：**视口，使用区、客户区**。**指的是客户区，当然是指浏览器区域**。（B/S）
- offset：偏移。指的是**目标甲相对目标乙的距离**。
- scroll：卷轴、卷动。指的是**包含滚动条的的属性**。一般用于获取滚动元素的大小。

- inner：内部。指的是**内部部分，不含滚动条**。
- avail：可用的。可用区域，**不含滚动条，易与 inner 混淆**。

### window 浏览器窗口的宽高与偏移

1. window.innerWidth/window.innerHeight：可见区域内的宽度和高度（不包含边框 border，但是包括滚动条）；
2. window.outerWidth/outerHeight：浏览器外宽度（包含浏览器的边框，因各个浏览器的边框边一样，得到的值也是不一样的）；
3. window.screenLeft/screenTop：浏览器窗口的位置（相对于屏幕 screen）；
4. window.screenX/screenY：浏览器窗口的位置信息。chrome 的 screenLeft 和 screenX 是相等的（其目的是为了兼容 ie 和 firefox，两个属性都兼备了，但更趋向于 firefox，chrome 的这种做法不止这一处，还有很多，其实这种做法便于开发者移植，但对开发者的开发过程产生了一定的混淆），ie9/10 的 screenLeft 是大于 screenX 的；
5. window.pageXOffset/pageYOffset：表示浏览器 X 轴（水平）、Y 轴（垂直）**滚动条的偏移距离**；
6. window.scrollX/scrollY：表示浏览器 X 轴（水平）、Y 轴（垂直）滚动条的偏移距离。在 chrome 和 firefox 中 window.pageXOffset 和 window.scrollX 是相等的。

### screen 整个屏幕

1. screen.width/height：屏幕的宽度、高度（指的是屏幕的分辨率，单位为像素）；
2. screen.availWidth/availHeight：屏幕的可用宽度、高度（通常与屏幕的宽度、高度一致）。

### element

1. element.clientWidth/clientHeight：元素的宽高；
2. element.clientLeft/clientTop：clientLeft 为左边框宽度，clientTop 为上边框宽度；
3. element.offsetWidth/offsetHeight：offsetWidth=元素左边框宽度+元素左内边距宽度+元素宽度+元素右内边距宽度+元素右边框宽度；
4. element.offsetLeft/offsetTop：表示该元素相对于最近的定位祖先元素的距离；
5. element.scrollWidth/scrollHeight：左内边距宽度+内容宽度；
6. element.scrollLeft/scrollTop：获得水平、垂直滚动条的距离。

### 常用属性获取

1. 网页可见区域宽： document.body.clientWidth；
2. 网页可见区域高： document.body.clientHeight；
3. 网页可见区域宽： document.body.offsetWidth (包括边线的宽)；
4. 网页可见区域高： document.body.offsetHeight (包括边线的高)；
5. 网页正文全文宽： document.body.scrollWidth；
6. 网页正文全文高： document.body.scrollHeight；
7. 网页被卷去的高： document.body.scrollTop；
8. 网页被卷去的左： document.body.scrollLeft；
9. 网页正文部分上： window.screenTop；
10. 网页正文部分左： window.screenLeft；
11. 屏幕分辨率的高： window.screen.height ；
12. 屏幕分辨率的宽： window.screen.width；
13. 屏幕可用工作区高度： window.screen.availHeight (pc 上指除去底部任务栏)；
14. 屏幕可用工作区宽度： window.screen.availWidth (pc 上指除去底部任务栏)。

## 常用操作的简单封装

```js
// 侦听事件
export function on(ele, ev, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(ev, handler, false);
  } else {
    ele.attachEvent('on' + ev, function () {
      fn.call(handler);
    });
  }
}
// 取消事件
export function off(ele, ev, handler) {
  if (ele.removeEventListener) {
    ele.removeEventListener(ev, handler, false);
  } else {
    ele.detachEvent('on' + ev, function () {
      fn.call(handler);
    });
  }
}
// 添加class
export function addClass(ele, cls) {
  var oClass = ele.className.split(' ');
  if (!ele.className) {
    ele.className = cls;
    return;
  }
  for (var i = 0; i < oClass.length; i++) {
    if (oClass[i] === cls) {
      return;
    }
  }
  ele.className += ' ' + cls;
}
// 移除class
export function removeClass(obj, sClass) {
  var aClass = obj.className.split(' ');
  if (!obj.className) return;
  for (var i = 0; i < aClass.length; i++) {
    if (aClass[i] === sClass) {
      aClass.splice(i, 1);
      obj.className = aClass.join(' ');
      break;
    }
  }
}
// 类名包含
export function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className);
  }
}
// 获取样式
export function getStyle(dom, attr) {
  return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
}
// 可视窗口的大小
export function view() {
  return {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
  };
}
```

## 原生操作 css

```js
// 设置单个属性
dom.style.top = top;
// 同时设置多个style属性
// 如果你有CSS值为字符串，没有其他CSS已经设置为元素(或者你不在乎覆盖)，使用cssText property：
document.getElementById('myElement').style.cssText = cssString;
```

## 检测 dom 的改变事件

感觉非常的有用啊，监控页面的变化，然后进行相应的数据操作

Mutation Observer（变动观察器）是**监视 DOM 变动**的接口。

当 DOM 对象树发生任何变动时，Mutation Observer 会得到通知。

MutationObserver 给开发者们提供了一种能在某个范围内的 DOM 树发生变化时作出适当反应的能力.该 API 设计用来替换掉在 DOM3 事件规范中引入的 Mutation 事件.

好像都不能用了。

## window.open

[window.open](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) 是 javaScript 打开新窗口的方法，在前面加上 javascript: 是用于 a 标签的超链接调用 js 方法。

window.open 基本语法：`window.open(pageURL,name,parameters);`

具体示例: `window.open('page.html', 'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')`

相关参数说明:

1. window.open 弹出新窗口的命令；
2. 'page.html' 弹出窗口的文件名；
3. 'newwindow' 弹出**窗口的名字**（不是文件名），非必须，可用空''代替；
4. height=100 窗口高度；
5. width=400 窗口宽度；
6. top=0 窗口距离屏幕上方的象素值；
7. left=0 窗口距离屏幕左侧的象素值；
8. toolbar=no **是否显示工具栏**，yes 为显示；
9. menubar，scrollbars 表示菜单栏和滚动栏。
10. resizable=no **是否允许改变窗口大小**，yes 为允许；
11. location=no 是否显示地址栏，yes 为允许；
12. status=no 是否显示状态栏内的信息（通常是文件已经打开），yes 为允许；

## 统计页面的 dom 节点信息

```js
// DOM 的体积过大会影响页面性能，假如你想在用户关闭页面时统计

//（计算并反馈给服务器）当前页面中元素节点的数量总和、元素节点
// 的最大嵌套深度以及最大子元素个数，请用 JS 配合原生 DOM API

// 实现该需求（不用考虑陈旧浏览器以及在现代浏览器中的兼容性，

// 可以使用任意浏览器的最新特性；不用考虑 shadow DOM。比如在如下页面中运行后
// document.getElementsByTagName("*").length

function calculateDOMNodes() {
  // your implementation code here:
  let result = {
    totalElementsCount: 0,
    maxDOMTreeDepth: 1,
    maxChildrenCount: 0,
  };
  let newDepth, childrenLength;
  function findElement(parentNode, depth) {
    [...parentNode.children].forEach((item) => {
      result.totalElementsCount += 1;

      childrenLength = item.children.length;

      result.maxChildrenCount =
        result.maxChildrenCount > childrenLength ? result.maxChildrenCount : childrenLength;

      if (item.ELEMENT_NODE !== 1) {
        console.log(item.ELEMENT_NODE);
        return;
      }
      if (childrenLength) {
        newDepth = depth + 1;
        result.maxDOMTreeDepth =
          result.maxDOMTreeDepth < newDepth ? newDepth : result.maxDOMTreeDepth;
        findElement(item, newDepth);
      }
    });
  }
  findElement(document, 1);
  return result;
}

calculateDOMNodes();

// window.addEventListener('close', calculateDOMNodes);
```
