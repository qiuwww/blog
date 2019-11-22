---
layout: post
title: CSS盒模型及BFC
date: 2019-02-13
# updated:
# photos:
tags:
  - CSS
  - BFC
  - 盒模型
categories:
  - CSS
comments: true
---

[TOC]

## 对 CSS 盒模型的认识

`CSS` 盒模型主要是以下几个方面：

1. 基本概念：`content`、`padding`、`margin`、`border`；
2. 标准盒模型与`IE`盒模型的区别。不要漏说了`IE`盒模型，content 指代的内容不一样；
3. `CSS`如何设置这两种模型（box-sizing）；
4. `JS`如何设置、获取盒模型对应的宽和高；
5. 根据盒模型解释**边距重叠**。
6. `BFC`（边距重叠解决方案）或`IFC`。

### 标准盒模型和 IE 盒子模型

标准盒子模型(content-box)：在标准盒模型中，width 和 height **指的是内容区域的宽度和高度**（content-box）。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。**chrome 默认是标准的盒模型的，firefox**。width 和 height 指的是内容区域的宽度和高度。

`IE`盒子模型(border-box)（**怪异盒模型**）：ie 盒子模型的 content 部分**包含了** border 和 pading，这个还是比较常用的，width 和 height 指的是内容区域+border+padding 的宽度和高度。；

> 在 `CSS` 盒子模型 (`Box Model`) 规定了元素处理元素的几种方式：

- `width`和`height`：**内容**的宽度、高度（不是盒子的宽度、高度）。
- `padding`：内边距。
- `border`：边框。
- `margin`：外边距。

盒子默认为标准盒模型。

### JS 如何设置、获取盒模型对应的宽和高

主要是一些兼容性的问题。

#### 方式一：通过`DOM`节点的 `style` 样式获取

```js
element.style.width / height;
document.body.style;
```

缺点：通过这种方式，只能获取**行内样式**，不能获取`内嵌(嵌入html的)`的样式和`外链(js)`的样式。

这种方式有局限性，但应该了解。

#### 方式二（通用型）

```js
window.getComputedStyle(element).width / height;
```

方式二能兼容 `Chrome`、火狐。是通用型方式。

#### 方式三（IE 独有的）

```js
element.currentStyle.width / height;
```

和方式二相同，但这种方式只有**IE 独有**。获取到的即时运行完之后的宽高（三种 css 样式都可以获取）。

#### 方式四

```js
element.getBoundingClientRect().width / height;
```

此 `api` 的作用是：获取一个元素的**绝对位置**。绝对位置是视窗 `viewport` 左上角的绝对位置。此 `api` 可以拿到四个属性：`left`、`top`、`width`、`height`。

### margin 塌陷/margin 重叠

**标准文档流中，竖直方向的 margin 不叠加**，**只取较大的值**作为 margin(水平方向的`margin`是可以叠加的，即**水平方向没有塌陷现象**)。

如果不在标准流，比如盒子都浮动了，那么两个盒子之间是没有`margin`重叠的现象的，**两个 bfc 了。**

## BFC: Block Formatting Context

写 CSS 样式时，对一个元素设置 css,我们首先要知道这个元素是块级元素还是行内元素，**而 BFC 就是用来格式化块级盒子的**。

**Formatting Context**：指页面中一个**渲染区域**，并且拥有一套渲染规则，它决定了其子元素**如何定位**，以及**与其他元素的相互关系和作用**。

BFC 定义：块级格式化上下文，它是指一个**独立的块级渲染区域**，只有 Block-level Box 参与，该区域拥有一套渲染规则来约束块级盒子的布局，且**与区域外部无关**。

### BFC 特性

1、**浮动元素和绝对定位元素**，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及**overflow 值不为“visiable”的块级盒子**，**都会为他们的内容创建新的块级格式化上下文（BFC）**。

2、在一个块级格式化上下文里，盒子从包含块的顶端开始**垂直**地一个接一个地排列，两个盒子之间的垂直的间隙是由他们的 margin 值所决定的。两个相邻的块级盒子的垂直外边距会发生叠加。

3、在块级格式化上下文中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘），即使存在浮动也是如此，除非这个盒子创建一个新的块级格式化上下文。

### 应用

#### 解决 margin 重叠问题

相邻的垂直元素同时设置了 margin 后，实际 margin 值会塌陷到其中**较大的那个值**。
其根本原理就是它们**处于同一个 BFC，符合“属于同一个 BFC 的两个相邻元素的 margin 会发生重叠”的规则。**

解决： **在其中一个元素外面包裹一层容器，并触发该容器生成一个 BFC。那么两个元素便属于不同的 BFC**，就不会发生 margin 重叠了。一个元素设置`overflow: hidden;`可以解决

#### 解决浮动问题

给父元素设置 overflow: hidden 可以清除子元素的浮动，但往往都不知道原理是什么

其实这就是应用了 BFC 的原理：**当在父元素中设置 overflow:hidden 时就会触发 BFC**，所以他内部的元素就**不会影响外面的布局**，BFC 就**把浮动的子元素高度当做了自己内部的高度去处理溢出，所以外面看起来是清除了浮动**。

#### 解决侵占浮动元素的问题

浮动元素会脱离文档流，然后浮盖在文档流元素上。

解决：1. 同时都浮动；2. 清除浮动（overflow: hidden;|clear）

### BFC（边距重叠解决方案）

`BFC（Block Formatting Context）`：块级格式化上下文。你可以把它理解成一个独立的区域。

另外还有个概念叫`IFC`。不过，`BFC`问得更多。

### BFC 的原理/BFC 的布局规则【非常重要】

`BFC` 的原理，其实也就是 `BFC` 的**渲染规则**。包括：

1. BFC **内部的**子元素，在垂直方向，**边距会发生重叠**。
2. BFC 在页面中是**独立的容器**，外面的元素不会影响里面的元素，反之亦然。（稍后看`举例1`）
3. **BFC 区域不与旁边的`float box`区域重叠**。（可以用来清除浮动带来的影响）。
4. 计算`BFC`的高度时，浮动的子元素也参与计算。（稍后看`举例3`）

### 如何生成 BFC

有以下几种方法：

- 方法 1：`overflow`: 不为`visible`，可以让属性是 `hidden`、`auto`。【最常用】
- 方法 2：浮动中：`float`的属性值不为`none`。意思是，只要设置了浮动，当前元素就创建了`BFC`。
- 方法 3：定位中：只要`posiiton`的值不是 `static`或者是`relative`即可，可以是`absolute`或`fixed`，也就生成了一个`BFC`。
- 方法 4：`display`为`inline-block`, `table-cell`, `table-caption`, `flex`, `inline-flex`
