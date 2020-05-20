---
title: CSS盒模型及BFC
date: 2015-2-13
tags:
  - CSS
  - 盒模型
  - BFC
categories:
  - [CSS, 盒模型]
  - [CSS, BFC]
top: 5
---

[TOC]

## 对 CSS 盒模型的认识 ｜ chrome 标准盒模型和 IE 盒子模型

1. **盒子模型**: **描述与相邻元素及自身的位置与大小关系的方法**。主要包括：margin、border、padding、width/height。
2. 盒子模型通常有两种：
   1. **标准盒子模型**，如 chrome 的(content-box)：在标准盒模型中，width 和 height **指的是内容区域的宽度和高度**（content-box）。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。
   2. **怪异盒模型**，如`IE`盒子模型(border-box)：ie 盒子模型的 content 部分**包含了** border 和 pading，这个还是比较常用的，width 和 height 指的是**内容区域**+border+padding 的宽度和高度。
   3. 二者的主要差别是，设置的 width/height，所指代的内容不同；
   4. 盒子默认为标准盒模型，可以通过**box-sizing**来设置盒模型。

### JS 如何设置、获取盒模型对应的宽和高

主要是一些兼容性的问题。

#### 方式一：通过`DOM`节点的 `style` 样式获取

```js
element.style.width / height;
document.body.style;
```

缺点：通过这种方式，只能获取**行内样式**，不能获取`内嵌(嵌入html的)`的样式和`外链(js)`的样式。

这种方式有局限性，但应该了解。

#### 方式二（通用型），getComputedStyle

```js
window.getComputedStyle(element).width / height;
```

方式二能兼容 `Chrome`、火狐。是通用型方式。

#### 方式三（IE 独有的），currentStyle

```js
element.currentStyle.width / height;
```

和方式二相同，但这种方式只有**IE 独有**。获取到的即时运行完之后的宽高（三种 css 样式都可以获取）。

#### 方式四，getBoundingClientRect

```js
element.getBoundingClientRect().width / height;
```

此 `api` 的作用是：获取一个元素的**绝对位置**。绝对位置是视窗 `viewport` 左上角的绝对位置。此 `api` 可以拿到四个属性：`left`、`top`、`width`、`height`。

## BFC: Block Formatting Context，块级格式上下文

1. **Formatting Context**：指页面中一个**独立的块级渲染区域**，并且**拥有一套渲染规则**；
2. 只有 **Block-level Box（块级元素）** 参与；
3. 它决定了**其子元素如何定位（display：table/flex/block...）**，以及**与其他元素的相互关系和作用**；
4. 该区域**拥有一套渲染规则来约束块级盒子的布局**，且**与区域外部无关**；

### BFC 特性

1. 如下情况在渲染的时候，渲染引擎都会为他们的内容**创建新的块级格式化上下文（BFC）**：
   1. 浮动元素；
   2. 绝对定位元素；
   3. **非块级盒子的块级容器**（例如 inline-blocks, table-cells, 和 table-captions）；
   4. 以及**overflow 值不为“visiable”的块级盒子**，所以设置为 hidden，就可以实现生成块级格式化上下文。
2. 在同一个**块级格式化上下文里**，BFC **内部的渲染规则如下**:
   1. BFC 在页面中是**独立的容器**，**外面的元素不会影响里面的元素**，反之亦然。
   2. 盒子从包含块的顶端开始**垂直**地一个接一个地排列，
   3. 两个盒子之间的**垂直的间隙是由他们的 margin 值**所决定的。
   4. 在同一个块级格式化上下文里，两个相邻的**块级盒子**的垂直外边距会发生叠加（这里是 BFC 的规则）。
3. 在块级格式化上下文中，每一个盒子的**左外边缘（margin-left）**会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘），即使存在浮动也是如此，除非这个盒子创建一个新的块级格式化上下文。

### 如何生成 BFC

有以下几种方法：

1. `overflow`: 不为`visible`，可以让属性是 `hidden`、`auto`。【最常用】
2. 浮动中`float`的属性值不为`none`。意思是，只要设置了浮动，当前元素就创建了`BFC`。
3. 定位中，只要`position`的值不是 `static`或者是`relative`即可，可以是`absolute`或`fixed`，也就生成了一个`BFC`。
4. `display`为`inline-block`, `table-cell`, `table-caption`, `flex`, `inline-flex`

### BFC 应用

#### 1.解决 margin 重叠问题 | BFC（边距重叠解决方案）

1. 同一个 bfc 内，相邻的垂直元素同时设置了 margin 后，实际 margin 值会塌陷到其中**较大的那个值**。
2. 其根本原理就是它们**处于同一个 BFC，符合“属于同一个 BFC 的两个相邻元素的 margin 会发生重叠”的规则。**

解决： **在其中一个元素外面包裹一层容器，并触发该容器生成一个 BFC。那么两个元素便属于不同的 BFC**，就不会发生 margin 重叠了。

一般使用是在一个元素设置`overflow: hidden;`可以解决。

#### 2.解决浮动问题

给父元素设置 `overflow: hidden` 可以清除子元素的浮动，但往往都不知道原理是什么。

其实这就是应用了 BFC 的原理：

1. **当在父元素中设置 overflow:hidden 时就会触发 BFC**，
2. 所以他内部的元素就**不会影响外面的布局**，
3. BFC 就**把浮动的子元素高度当做了自己内部的高度去处理溢出，所以外面看起来是清除了浮动**。（计算`BFC`的高度时，浮动的子元素也参与计算。）

#### 3.解决侵占浮动元素的问题

浮动元素会**脱离文档流**，然后浮盖在文档流元素上。

解决：

1. 同时都浮动；
2. 清除浮动（overflow: hidden;|clear）
