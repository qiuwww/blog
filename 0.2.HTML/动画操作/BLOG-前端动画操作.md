---
layout: post
title: 前端动画操作
date: 2019-1-22 18:36
# photos:
tags:
  - HTML
  - canvas
  - svg
  - transition
  - animation
  - CSS
  - JS
  - 动画
categories:
  - [JS, requestAnimationFrame]
  - [动画]
  - [CSS, animation]
  - [CSS, transition]
  - [HTML, canvas]
---

[TOC]

> 动画是指由许多帧**静止的画面**，以一定的速度（如**每秒 16 张**）连续播放时，肉眼因视觉**残象产生错觉**，而误以为画面活动的作品。-- 维基百科

## 动画的基本概念

1. 帧：在动画过程中，每一幅静止画面即为一“帧”；
2. 帧率：即**每秒钟播放的静止画面的数量**，单位是 fps(Frame per second)或赫兹(Hz)；
3. 帧时长：即**每一幅静止画面的停留时间**，单位一般是 ms(毫秒)；
4. 丢帧：在帧率固定的动画中，**某一帧的时长远高于平均帧时长**，导致**其后续数帧被挤压而丢失**的现象；

## 动画实现方式

1. JavaScript：通过定时器（ `setTimeout` 和 `setInterval` ）来**间隔来改变**元素样式，或者使用 `requestAnimationFrame`；
2. CSS3：`transition` 和 `animation`；
3. HTML5：使用 HTML5 提供的**绘图**方式（`canvas、svg、webgl`）；

### requestAnimationFrame，js 刷新帧操作接口

1. [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)，在浏览器下一次重绘之前执行。

2. `requestAnimationFrame`是浏览器用于**定时循环操作的一个接口**，类似于`setTimeout`，主要用途是**按帧对网页进行重绘**。

3. 为了让各种网页动画效果（DOM 动画、Canvas 动画、SVG 动画、WebGL 动画）能够有一个**统一的刷新机制**，从而节省系统资源，**提高系统性能，改善视觉效果**。

4. 代码中使用这个 API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘。

5. 可以这么说，`requestAnimationFrame`就是一个**性能优化版、专为动画量身打造的`setTimeout`**，不同的是`requestAnimationFrame`不是自己指定回调函数运行的时间，而是**跟着浏览器内建的刷新频率来执行回调**，这当然就能达到浏览器所能实现动画的最佳效果了。

[查看实例](./requestAnimationFrame动画实现.html)

### css 的 [Transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)，渐变属性操作

1. CSS 中的 `transition: property duration timing-function delay;` 属性**允许块级元素中的属性在指定的时间内平滑的改变** ，渐变控制接口。

### css，Animation，动画

1. 类似的 CSS 还提供了一个`Animation`属性，不过区别于`Transition`，`Animation`**作用于元素本身而不是样式属性**，可以使用**关键帧的概念**，应该说可以实现**更自由的动画效果**。

2. [css3 animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)

3. `animation: name duration timing-function delay iteration-count direction;`

### html 的 canvas 标签，手动绘制，动画的循环还是使用的 requestAnimationFrame，这里只是一个呈现容器

1. 依赖分辨率，基于位图；
2. 不支持**事件处理器**；
3. 弱的文本渲染能力；
4. 能够以 .png 或 .jpg 格式保存结果图像；
5. 最适合**图像密集型的游戏**，其中的许多对象会被频繁重绘；

大多数 Canvas 绘图 API 都没有定义在 `<canvas>` 元素本身上，而是定义在通过画布的`getContext()`方法获得的一个“绘图环境”对象上。Canvas API 也使用了路径的表示法。

### SVG 图，可缩放矢量图形

SVG 是英文`Scalable Vector Graphics`的缩写，意为可缩放矢量图形，用来定义用于网络的基于矢量的图形，其**使用 XML 格式定义图像**。

1. 不依赖分辨率，基于矢量图；
2. 支持事件处理器；
3. 最适合带有大型渲染区域的应用程序（比如谷歌地图）；
4. 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）；
5. 不适合游戏应用；

#### SVG 中的几个用于动画的元素

1. `<animate>`：通常放置到一个 SVG 图像元素里面，用来定义这个图像元素的某个属性的动画变化过程；
2. `<animateMotion>`：元素也是放置一个图像元素里面，它可以引用一个事先定义好的动画路径，让图像元素按路径定义的方式运动；
3. `<animateTransform>`：元素对图形的运动和变换有更多的控制，它可以指定图形的变换、缩放、旋转和扭曲等；
4. `<mpath>`：元素的用法在上面的例子里出现过，它是一个辅助元素，通过它，`<animateMotion>`等元素可以引用一个外部的定义的`<path>`。让图像元素按这个`<path>`轨迹运动；

### WebGL

WebGL (Web 图形库) 是一种 JavaScript API，用于在任何兼容的 Web 浏览器中呈现交互式 3D 和 2D 图形，而无需使用插件。WebGL 通过引入一个与 OpenGL ES 2.0 紧密相符合的 API，可以在 HTML5 `<canvas>` 元素中使用。

## JS 动画和 CSS3 动画的比较

我们经常面临一个抉择：是使用 JavaScript 的动画还是使用 CSS 的动画，下面将对比一下这两种方式:

### JS 动画

缺点：

1. JavaScript 在浏览器的**主线程中运行**，而其中还有很多其他需要运行的 JavaScript、样式计算、布局、绘制等对其干扰。这也就**导致了线程可能出现阻塞，从而造成丢帧的情况**。

优点：

1. JavaScript 的动画与 CSS 预先定义好的动画不同，**可以在其动画过程中对其进行控制**：开始、暂停、回放、中止、取消都是可以做到的。
2. **而且一些动画效果，比如视差滚动效果，只有 JavaScript 能够完成**。

### CSS 动画

优点：

1. 在**性能上会稍微好一些**，浏览器会对 CSS3 的动画做一些优化（比如专门新建一个图层用来跑动画）。
2. 代码相对简单。

缺点：

1. 在动画**控制上不够灵活**；
2. 兼容性不好；
3. **部分动画功能无法实现**（如滚动动画，视差滚动等）。

## 动画性能优化

### 1.GPU 加速与动画性能

动画给予了页面丰富的视觉体验。**我们应该尽力避免使用会触发重布局和重绘的属性**，以免失帧。

1. 除了优化我们的代码，我们还可以**让 GPU 来代替 CPU 渲染页面**。
   1. 通过设置`transform: translate3d(0,0)`或者`tanslateZ(0)`属性就可以做到，原因是，通过设置该属性，**浏览器会创建独立图层**，图层中有动画的话用 GPU 进行硬件加速。
2. 最好**提前申明动画**，这样能让浏览器提前对动画进行优化。由于 GPU 的参与，现在用来做动画的最好属性是如下几个：
   1. opacity
   2. translate
   3. rotate
   4. scale

3. 浏览器的 GPU 加速功能是**将需要进行动画的元素提升到一个独立的层（layer）**，这样就**可以避免浏览器进行重新布局（Reflow）和绘制（Repaint）**，

4. 将原先的浏览器使用 CPU 绘制位图来实现的动画效果**转为让 GPU 使用图层合成（composite）来实现**，如果两张图层内部没有发生改变，浏览器就不再进行布局和绘制，**直接使用 GPU 的缓存来绘制每个图层，GPU 只负责将各个图层合成来实现动画**，这就可以充分利用 GPU 的资源和优势，减轻 CPU 的负载，可以使动画更流畅。通过改变两张图片之间的相对位置代替绘制一张图片的每一帧来实现动画，虽然视觉效果相同，但省去了许多绘制的时间。

5. 为了让浏览器将动画元素提升到一个独立的层，**可以使用 transform 和 opacity 属性来实现动画**，当设置了这两个属性之一时，浏览器会自动进行这一优化操作（透明度的变化可以通过 GPU 改变 a 通道来实现，不需要浏览器进行重绘）。
