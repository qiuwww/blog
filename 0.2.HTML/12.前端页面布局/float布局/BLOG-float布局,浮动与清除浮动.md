---
title: float布局
date: 2017-6-6
tag:
  - CSS
  - 前端布局
  - float
categories:
  - [CSS, float]
---

[TOC]

## 浮动与清除浮动，float

针对**文字排版的属性值**。

float CSS 属性指定一个元素应沿其容器的**左侧或右侧放置**，允许文本和**内联元素环绕**它。

该元素**从网页的正常流动(文档流)中移除**，尽管仍然保持部分的流动性（与绝对定位相反）。

## 浮动

1. 浮动与清除浮动是 html 布局中很重要的一个部分，使用十分的广泛，要完全掌握，搞清楚内部的原理。清除浮动是每一个 web 前端工程师必须掌握的技能。
2. 浮动会**使当前标签产生向上浮的效果**，同时会影响到前后标签、父级标签的位置及 width 和 height 属性。
3. 而且同样的代码，在各种浏览器中显示效果也有可能不相同，这样让清除浮动更难了。
4. 解决浮动引起的问题有多种方法，但有些方法在浏览器兼容性方面还有问题。
5. 浮动是由于使用了 float 属性之后，**元素脱离了正常的 bfc 模式下的正常位置**，会造成 wrap 塌陷，所以要清除浮动，保持父元素块与其周围的布局稳定。

## 清除浮动的具体方法

### 1. 结尾处加空 div 标签 clear:both;最直观的方法

```html
<style type="text/css">
  .div1 {
    background: #000080;
    border: 1px solid red;
  }
  .div2 {
    background: #800080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px;
  }
  .left {
    float: left;
    width: 20%;
    height: 200px;
    background: #ddd;
  }
  .right {
    float: right;
    width: 30%;
    height: 80px;
    background: #ddd;
  }
  /*清除浮动代码*/
  .clearfloat {
    clear: left;
  } /*或者写clear:both;最终起作用的也是清除左侧的浮动*/
</style>
<div class="div1">
  <div class="left">Left</div>
  <div class="right">Right</div>
  <div class="clearfloat"></div>
</div>
<div class="div2">div2</div>
```

原理：添加一个空 div，利用 css 的 clear:both 清除浮动，让父级 div 能自动获取到高度，包裹内部的子元素，也就是让子元素撑开父元素。

优点：简单、代码少、浏览器支持好、不容易出现怪问题，原理简单。

缺点：如果页面浮动布局多，就要增加很多空 div，让人感觉很不好。增加了没有意义的 div，不利于页面优化操作。

建议：不推荐使用，但此方法是以前主要使用的一种清除浮动方法。

### 2. 父级 div 定义 伪类:after 和 父元素添加属性：zoom:1，这里是为了兼容 ie 浏览器

```html
<style type="text/css">
  .div1 {
    background: #000080;
    border: 1px solid red;
  }
  .div2 {
    background: #800080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px;
  }
  .left {
    float: left;
    width: 20%;
    height: 200px;
    background: #ddd;
  }
  .right {
    float: right;
    width: 30%;
    height: 80px;
    background: #ddd;
  }
  /*清除浮动代码*/
  .clearfloat:after {
    display: block;
    clear: both;
    content: '';
    visibility: hidden;
    height: 0;
  }
  .clearfloat {
    zoom: 1;
  } /*父元素要添加zoom:1;这句主要是为了兼容IE6和IE7，hasLayout()*/
</style>

<div class="div1 clearfloat">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
<div class="div2">div2</div>
```

原理：IE8 以上和非 IE 浏览器才支持:after，原理和方法 2 有点类似，zoom(IE 专有属性)可解决 ie6,ie7 浮动问题。添加这个属性就是为了兼容 IE6，IE7。

优点：浏览器支持好、不容易出现怪问题（目前：大型网站都有使用，如：腾迅，网易，新浪等等）。

缺点：代码多、不少初学者不理解原理，要两句代码结合使用才能让主流浏览器都支持。

建议：推荐使用，建议定义公共类，以减少 CSS 代码。 就像上面一样，定义好样式，使用的时候直接添加 clearfloat 类。

### 3. 父级 div 定义 overflow:hidden

或者设置 overflow 的值为 auto;但是最好保证设置的父元素宽度大于子元素宽度的和，不然就会出现滚动条。如果不用兼容 ie8 以下就可以不设置 width||zoom;auto 属性值不建议使用。

```html
<style type="text/css">
  /*这里说明定义width或者zoom是为了兼容ie8一下浏览器。*/
  /*zoom:1会触发ie（ie8以下）的haslayout，刚好能清理浮动。*/
  .div1 {
    background: #000080;
    border: 1px solid red; /*解决代码*/
    width: 98%;
    overflow: hidden;
  } /*定义宽度width||添加zoom:1;在高版本ie或者其他浏览器不用添加。*/
  .div2 {
    background: #800080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px;
    width: 98%;
  }
  .left {
    float: left;
    width: 20%;
    height: 200px;
    background: #ddd;
  }
  .right {
    float: right;
    width: 30%;
    height: 80px;
    background: #ddd;
  }
</style>

<div class="div1">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
<div class="div2">div2</div>
```

原理：必须定义 width 或 zoom:1，同时不能定义 height，使用 overflow:hidden 时，浏览器会自动检查浮动区域的高度。

优点：简单、代码少、浏览器支持好。

缺点：不能和 position 配合使用，因为超出的尺寸的会被隐藏 overflow:hidden;。

建议：只推荐没有使用 position 或对 overflow:hidden 理解比较深的朋友使用。

### 4. 父级 div 也一起浮动 ，父元素上添加属性 float:left||right

这个方法会让父元素也浮动，整体一起浮动就还是一个整体了，但是会产生新的浮动问题，所以这种方法不可取。

### 5. 父级 div 定义 display:table

```html
<style type="text/css">
  .div1 {
    background: #000080;
    border: 1px solid red;
    margin-bottom: 10px; /*解决代码*/
    width: 98%;
    display: table;
  }
  .div2 {
    background: #800080;
    border: 1px solid red;
    height: 100px;
    width: 98%;
  }
  .left {
    float: left;
    width: 20%;
    height: 200px;
    background: #ddd;
  }
  .right {
    float: right;
    width: 30%;
    height: 80px;
    background: #ddd;
  }
</style>

<div class="div1">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
<div class="div2">div2</div>
```

原理：将 div 属性变成表格

优点：没有优点

缺点：会产生新的未知问题。

建议：不推荐使用，只作了解。

### 6. 父级 div 定义 height

```html
<style type="text/css">
  .div1 {
    background: #000080;
    border: 1px solid red; /*解决代码*/
    height: 200px;
  }
  .div2 {
    background: #800080;
    border: 1px solid red;
    height: 100px;
    margin-top: 10px;
  }
  .left {
    float: left;
    width: 20%;
    height: 200px;
    background: #ddd;
  }
  .right {
    float: right;
    width: 30%;
    height: 80px;
    background: #ddd;
  }
</style>

<div class="div1">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
<div class="div2">div2</div>
```

原理：父级 div 手动定义 height，就解决了父级 div 无法自动获取到高度的问题。这其实并没有解决浮动的问题，只是确定了父元素的高，下边的元素接触不到浮动的元素了，也就看着像是清除了浮动。

优点：简单、代码少、容易掌握。

缺点：只适合高度固定的布局，要给出精确的高度，如果高度和父级 div 不一样时，会产生问题。

建议：不推荐使用，只建议高度固定的布局时使用。在高度确定的时候可以使用，高度自适应的话就算了吧，在无线端页面可以，可以使用 rem 来相对于屏幕宽度自适应，但是终究也是高度固定。
