---
layout: post
title: 前端动画操作
date: 2019-1-22 18:36:36
# photos: 
tags: 
- html
- canvas
- svg
- 动画
categories: 
- 动画
comments: true
---

# 前端动画操作

> 动画是指由许多帧静止的画面，以一定的速度（如每秒16张）连续播放时，肉眼因视觉残象产生错觉，而误以为画面活动的作品。-- 维基百科

## 基本概念

- 帧：在动画过程中，每一幅静止画面即为一“帧”；
- 帧率：即每秒钟播放的静止画面的数量，单位是fps(Frame per second)或赫兹(Hz)；
- 帧时长：即每一幅静止画面的停留时间，单位一般是ms(毫秒)；
- 丢帧：在帧率固定的动画中，某一帧的时长远高于平均帧时长，导致其后续数帧被挤压而丢失的现象；

## 实现方式

- JavaScript：通过定时器（ setTimeout 和 setInterval ）来间隔来改变元素样式，或者使用requestAnimationFrame；
- CSS3：transition 和 animation；
- HTML5：使用HTML5提供的绘图方式（canvas、svg、webgl）；

### requestAnimationFrame，js刷新帧操作接口

`requestAnimationFrame`是浏览器用于定时循环操作的一个接口，类似于`setTimeout`，主要用途是**按帧对网页进行重绘**。

为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个**统一的刷新机制**，从而节省系统资源，提高系统性能，改善视觉效果。
代码中使用这个API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘。

可以这么说，`requestAnimationFrame`就是一个**性能优化版、专为动画量身打造的`setTimeout`**，不同的是`requestAnimationFrame`不是自己指定回调函数运行的时间，而是跟着浏览器内建的刷新频率来执行回调，这当然就能达到浏览器所能实现动画的最佳效果了。

### Transition，渐变

CSS 中的 transition 属性允许块级元素中的属性在指定的时间内平滑的改变 ，渐变控制接口。

> transition: property duration timing-function delay;

### Animation，动画

类似的CSS还提供了一个`Animation`属性，不过区别于`Transition`，`Animation`作用于元素本身而不是样式属性，可以使用**关键帧的概念**，应该说可以实现**更自由的动画效果**。

> animation: name duration timing-function delay iteration-count direction;

## 应用举例

### canvas

- 依赖分辨率，基于位图；
- 不支持事件处理器；
- 弱的文本渲染能力；
- 能够以 .png 或 .jpg 格式保存结果图像；
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘；

大多数 Canvas 绘图 API 都没有定义在 `<canvas>` 元素本身上，而是定义在通过画布的`getContext()`方法获得的一个“绘图环境”对象上。Canvas API也使用了路径的表示法。

### SVG

SVG是英文`Scalable Vector Graphics`的缩写，意为可缩放矢量图形，用来定义用于网络的基于矢量的图形，其使用 XML 格式定义图像。

- 不依赖分辨率，基于矢量图；
- 支持事件处理器；
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）；
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）；
- 不适合游戏应用；

### SVG中的几个用于动画的元素

- `<animate>`：通常放置到一个SVG图像元素里面，用来定义这个图像元素的某个属性的动画变化过程；
- `<animateMotion>`：元素也是放置一个图像元素里面，它可以引用一个事先定义好的动画路径，让图像元素按路径定义的方式运动；
- `<animateTransform>`：元素对图形的运动和变换有更多的控制，它可以指定图形的变换、缩放、旋转和扭曲等；
- `<mpath>`：元素的用法在上面的例子里出现过，它是一个辅助元素，通过它，`<animateMotion>`等元素可以引用一个外部的定义的`<path>`。让图像元素按这个`<path>`轨迹运动；

### WebGL

WebGL使得网页在支持HTML `<canvas>`标签的浏览器中，不需要安装任何插件，便可以使用基于 [OpenGL ES](https://link.juejin.im/?target=https%3A%2F%2Flink.jianshu.com%3Ft%3D!https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2FOpenGL)

2.0 的 API 在 canvas 中进行3D渲染。 WebGL 程序由JavaScript的控制代码，和在计算机的图形处理单元（GPU）中执行的特效代码(shader code，渲染代码) 组成。
