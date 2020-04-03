---
# layout: post
title: CSS hack
date: 2019-2-13
# updated: 2013-7-13 20:46:29
# photos:
tags:
  - CSS
  - CSS hack
categories:
  - [CSS, CSS hack]
comments: true
---

## CSS hack 原理

由于不同的浏览器和浏览器各版本**对 CSS 的支持及解析结果不一样**，以及 CSS 优先级对浏览器展现效果的影响，我们可以据此针对不同的浏览器情景来应用不同的 CSS。

## CSS hack 分类

CSS Hack 大致有 3 种表现形式，CSS**属性前缀法**、**选择器前缀法**以及**IE 条件注释法**（即 HTML 头部引用 if IE）Hack，实际项目中 CSS Hack 大部分是针对 IE 浏览器不同版本之间的表现差异而引入的。

### 属性前缀法(即类内部 Hack)

例如 IE6 能识别下划线"_"和星号" * "，
IE7 能识别星号" * "，但不能识别下划线"_"，
IE6~IE10 都认识"\9"，但 firefox 前述三个都不能认识。

### 选择器前缀法(即选择器 Hack)：

例如 IE6 能识别*html .class{}，
IE7 能识别*+html .class{}或者\*:first-child+html .class{}。

### IE 条件注释法(即 HTML 条件注释 Hack)

针对所有 IE(注：IE10+已经不再支持条件注释)：

<!--[if IE]>IE浏览器显示的内容 <![endif]-->，

针对 IE6 及以下版本：

<!--[if lt IE 6]>只在IE6-显示的内容 <![end if]-->。

这类 Hack 不仅对 CSS 生效，对写在判断语句里面的所有代码都会生效。

CSS hack 书写顺序，一般是将适用范围广、**被识别能力强的 CSS 定义在前面**。

#### CSS hack 方式一：条件注释法

这种方式是 IE 浏览器专有的 Hack 方式，微软官方推荐使用的 hack 方式。举例如下：

只在 IE 下生效：

<!--[if IE]>这段文字只在IE浏览器显示<![end if]-->

只在 IE6 下生效：

<!--[if IE 6]>这段文字只在IE6浏览器显示<![end if]-->

只在 IE6 以上版本生效：

<!--[if gte IE 6]>这段文字只在IE6以上(包括)版本IE浏览器显示<![end if]-->

只在 IE8 上不生效：

<!--[if ! IE 8]>这段文字在非IE8浏览器显示<![end if]-->

非 IE 浏览器生效：

<!--[if !IE]>这段文字只在非IE浏览器显示<![end if]-->

#### CSS hack 方式二：符号前缀

在标准模式中
“-″减号是 IE6 专有的 hack
“\9″ IE6/IE7/IE8/IE9/IE10 都生效
“\0″ IE8/IE9/IE10 都生效，是 IE8/9/10 的 hack
“\9\0″ 只对 IE9/IE10 生效，是 IE9/10 的 hack

#### CSS hack 方式三：选择器前缀法

**选择器前缀法**是针对一些页面表现不一致或者需要特殊对待的浏览器，在 CSS 选择器前加上一些只有某些特定浏览器才能识别的前缀进行 hack。

目前最常见的是：

- *html *前缀只对 IE6 生效
- _+html _+前缀只对 IE7 生效
- @media screen\9{...}只对 IE6/7 生效
- @media \0screen {body { background: red; }}只对 IE8 有效
- @media \0screen\,screen\9{body { background: blue; }}只对 IE6/7/8 有效
- @media screen\0 {body { background: green; }} 只对 IE8/9/10 有效
- @media screen and (min-width:0\0) {body { background: gray; }} 只对 IE9/10 有效
- @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) - - {body { background: orange; }} 只对 IE10 有效

#### CSS3 选择器结合 JavaScript 的 Hack（鉴别浏览器的方式改为了浏览器代理识别）

我们用 IE10 进行举例：
由于 IE10 用户代理字符串（UserAgent）为：Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)，
所以我们可以使用 javascript 将此属性添加到文档标签中，再运用 CSS3 基本选择器匹配。
JavaScript 代码:

```js
var htmlObj = document.documentElement;
htmlObj.setAttribute("data-useragent", navigator.userAgent);
htmlObj.setAttribute("data-platform", navigator.platform);
```

CSS3 匹配代码：

```css
html[data-useragent*="MSIE 10.0"] #id {
  color: #f00;
}
```

Firefox 浏览器、Webkit 内核浏览器、Opera 浏览器 css hack
Firefox 浏览器 css hack

```css
@-moz-document url-prefix() {
  .selector {
    property: value;
  }
}
/* 支持所有Gecko内核的浏览器 (包括Firefox) */
* > .selector {
  property: value;
}
/* Webkit 内核浏览器 css hack */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  Selector {
    property: value;
  }
}
/* Opera 浏览器css hack */
html:first-child > b\ody Selector {
  property: value;
}
@media all and (-webkit-min-device-pixel-ratio: 10000),
  not and all (-webkit-min-device-pixel-ratio: 0) {
  .font1 {
    color: red;
  }
}
/* Webkit 内核浏览器 css hack和Opera 浏览器css hack */
@media all and (min-width: 0px) {
  .font1 {
    color: red;
  }
}
```

#### 移动端开发专用 css hack

在 android2+的版本中，按钮边框会产生 bug，需要清除掉，

解决方案如下：

```css
a,button,input{-webkit-tap-highlight-color:rgba(255,0,0,0);}
/* 1.去除 android a/button/input 标签被点击时产生的边框
2.去除 ios a 标签被点击时产生的半透明灰色背景 */

/* 利用-webkit-transform-3d 属性，因为 Android4.0 下不识别该选择器，浏览器解析代码时，会直接跳过此步骤 */

/* 在 CSS3 的兼容中，相信大家对使用 media 的兼容并不陌生，我之前也提到过很多次，那么今天使用的 hack 也是跟它离不开的，代码如下： */

@media all and (-webkit-transform-3d){
  /* /_ Android4.0 下不识别该-webkit-transform-3d，使用它可做 Android4.0 下版本兼容 _/ */
  .css{...}
}
```
