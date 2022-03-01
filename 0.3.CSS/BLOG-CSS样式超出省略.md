---
title: CSS样式超出省略
date: 2020-12-15
tags:
  - CSS
categories:
  - [CSS, 样式控制]
---

[TOC]

[demo]<blog/0.3.CSS/CSS 实现的特殊效果/文本超出样式处理.html>

## 超出限制，显示省略号

这里的单行的设置原理与多行的原理有什么不同？

`-webkit-line-clamp: 1;`能用吗

### 单行的处理

单行超出，通常的做法是，限制宽度，然后设置省略限制；

```css
.ellipsis {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

但是这里，可以不限制宽度，在转行的时候处理，所以更适合如下的设置

```css
span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
```

#### 对比兼容性

1. **webkit-line-clamp，除了 ie，别的都兼容**，不过用在移动端是没什么问题的。
2. text-overflow 的兼容性明显更好。

### 多行的超出显示

```css
div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

## 末尾展示展开与收缩按钮的样式

checked 伪类是个好东西，能满足很多需求而不用写 JS，因此凡是有关切换类的操作都可以考虑用它（switch、菜单栏收缩等）。

```html

```
