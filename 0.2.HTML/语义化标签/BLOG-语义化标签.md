---
title: 语义化标签
date: 2019-1-28
tags:
  - HTML
  - 语义化标签
categories:
  - [HTML, 语义化标签]
describe: 语义化标签是一种HTML标签的使用方法，旨在更准确地描述网页内容的结构和含义，以提高网页的可访问性、可读性和搜索引擎优化。语义化标签使开发者能够以更有意义的方式组织和呈现网页内容，从而帮助浏览器、搜索引擎和辅助技术（如屏幕阅读器）更好地理解页面的结构和内容。
---

[TOC]

## 语义化是什么

1. HTML 标签的语义化是指：通过使用包含语义的标签（如 h1-h6）**恰当地表示文档结构**；
2. css 命名的语义化是指：为 html 标签添加有意义的 class。

## 为什么需要语义化

1. 在没有 CSS 的情况下，**页面也能呈现出很好地内容结构**、代码结构（为了裸奔时好看）。
   1. 常用的 div 没有任何特殊的样式，也用于定义一个块的内容。
2. **用户体验**：例如 title、alt 用于解释名词或解释图片信息、label 标签的活用。
3. **有利于 SEO**：和**搜索引擎**建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重。
4. 方便其他设备解析(如屏幕阅读器、盲人阅读器、移动设备)**以意义的方式来渲染网页**。
5. **便于团队开发和维护，语义化更具可读性**，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化。

## 简述一下你对 HTML 语义化的理解

1. 用**正确的标签做正确的事情**。
2. html 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析。
3. 即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的。
4. 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO。
5. 使阅读源代码的人对网站更容易将网站分块，**便于阅读维护理解**。

## 常用的有哪些标签

[具体参考：语义化标签.html](https://github.com/qiuwww/blog/blob/43f14973bb4c247d79f2be1cc31375594eebdc6f/0.2.HTML/%E8%AF%AD%E4%B9%89%E5%8C%96%E6%A0%87%E7%AD%BE/%E8%AF%AD%E4%B9%89%E5%8C%96%E6%A0%87%E7%AD%BE.html)

[查看代码演示，https://code.juejin.cn/pen/7294129161021423626](https://code.juejin.cn/pen/7294129161021423626)

### `<Hx>`

`<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>`、`<h6>`,作为标题使用，并且依据重要性递减。`<h1>`是最高的等级。

### `<p>`

段落标记，知道了`<p>`作为段落，你就不会再使用`<br/>`来换行了，而且不需要` <br/>``<br/> `来区分段落与段落。` <p>``</p> `中的文字会自动换行，而且换行的效果优于`<br>`。

### `<b>`、`<em>`和`<strong>`

`<b>`标签语义为**加粗**。

`<em>`标签语义为**强调**,`<em>: The Emphasis element`。

`<strong>`标签语义为**更强烈的强调** 而且 em 默认用**斜体**表示，strong 用**粗体**表示。

当我们知道了这三个标签的语义时，做 SEO 时就好决定用哪个来强调重要的关键字了，强调用`<em>`和`<strong>`，纯粹加粗用`<b>`。

### `<span>`标签

`<span>`标签的语义为被用来**组合文档中的行内元素**。（另外应当区分`<span>`和`<div>`的区别，`<div>`是块级元素（block level），而`<span>`是行内元素，前者的内容会自动换行，而后者前后不会自动换行。

### `<ul>`标签、`<ol>`标签、`<li>`标签

`<ul>`标签语义为定义无序列表。

`<ol>`标签语义为定义有序列表。

`<li>`标签语义为定义列表项目。

因此当涉及到列表的项目，应该用` <ul>``<li> `或` <ol>``<li> `（或者是` <dl>``<dt>``<dd> `来布局），而不是用`<table>`或`<p>`甚至`<span>`。

### `<dl>`标签、`<dt>`标签、`<dd>`标签

`<dl>`标签语义为定义了**定义列表**。

`<dt>`标签语义为**定义了定义列表中的项目**（即术语部分）。

`<dd>`标签语义为**定义列表中定义条目的定义部分**。

所以，当我们用带标题的列表时，即可采用` <dl>``<dt>``<dd> `自定义列表实现。

### `<q>`、 `<blockquote>`、`<cite>`

`<q>`标签的语义为用来**标记简短的单行引用**，Web 浏览器会自动识别在`<q>`之间的内容。

`<blockquote>`标签的语义为用来标记**那些一段或者好几段的长篇引用**。

`<cite>`标签既可以与`<q>` 一起用，也可以与`<blockquote>`一起用，用来提**供引用内容的来源地址**。

### `<table>`、`<th>`、`<td>`、`<caption>`

`<table>`标签的语义的为定义 HTML 表格。

`<th>`标签的语义为定义表格内的表头单元格。

`<caption>`标签的语义为定义表格标题。

### `<button>`标签、`<input>`标签、`<textarea>`标签

`<button>`标签的语义为定义一个按钮。

`<input>` 标签的语义为**用于搜集用户信息，根据不同的 type 属性值，输入字段拥有很多种形式**。输入字段可以是文本字段、复选框、掩码后的文本控件、单选按钮、按钮等等。

`<textarea>`标签的语义为定义多行的文本输入控件。

button 控件 与 `<input type="button" role=“button”>` 相比，提供了更为强大的功能和更丰富的内容。

`<button>` 与 `</button>` 标签之间的所有内容都是按钮的内容，其中包括任何可接受的正文内容，比如文本或多媒体内容。

### `<label>` 标签

`<label>`标签的语义为为 input 元素**定义标注**（标记）。

### `<ins>`, `<del>`

`<ins>`标签的语义为定义**已经被插入文档中的文本**。

`<del>`标签的语义为定义文档中已被删除的文本。

`<ins>`与 `<del>` 一同使用，**来描述文档中的更新和修正**。知道 del，就不要再用`<s>`做删除线了，用 del 显然更具有语义化。

而且 del 还带有 cite 和 datetime 来表明删除的原因以及删除的时间。ins 是表示插入，也有这样的属性。

### `<header>`：用于定义网页或页面部分的页眉，通常包括网站的标题、标志和导航菜单

标签定义 section 或 document 的页眉。

### `<nav>`：表示导航链接的区域，通常包括网站的主要导航菜单

### `<main>`：定义文档的主要内容区域，一个页面通常只能有一个`<main>`元素

### `<section>`：用于将文档分成不同的节或章节，每个`<section>`通常包括一个标题

### `<article>`标签定义外部的内容，表示一个独立的、完整的文章或内容块，如新闻文章、博客帖子等

比如来自一个外部的新闻提供者的一篇新的文章，或者来自 blog 的文本，或者是来自论坛的文本。亦或是来自其他外部源内容。

### `<aside>`通常用于定义与页面内容相关但不属于主要内容的部分，如侧边栏或广告，标签定义 article 以外的内容

aside 的内容应该与 article 的内容相关。

### `<datalist>` 标签定义可选数据的列表

与 input 元素配合使用，就可以制作出输入值的下拉列表。

### `<details>` 标签定义元素的细节，用户可进行查看，或通过点击进行隐藏

用于创建可展开/折叠的内容块，用户可以点击摘要以展开或折叠详细信息。

与 `<legend>` 一起使用，来制作 detail 的标题。该标题对用户是可见的，当在其上点击时可打开或关闭 detail。

```html
<details>
  <summary>Click me to see more details</summary>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eum perferendis eius. Adipisci velit
    et similique earum quas illo odio rerum optio, quis, expedita assumenda enim dicta aliquam porro
    maxime minima sed a ullam, aspernatur corporis.
  </p>
</details>
```

### `<footer>` 定义网页或页面部分的页脚，通常包括版权信息、联系方式等

典型地，它会包含创作者的姓名、文档的创作日期以及/或者联系信息。

### `<hgroup>` **标签用于对网页或区段（section）的标题进行组合**

### `<figure>` 用于包含与主要文本相关的图像、表格、图表等，并通常与`<figcaption>`标签一起使用，以提供相关的标题

使用 `<figcaption>` 元素为元素组添加标题。

### `<time>`：用于标记日期和时间信息，有助于机器和搜索引擎更好地理解时间相关的内容

### `<a>`标签，不仅仅可以跳转链接，还可以跳转电话，email 等

```html
<a href="mailto:{email}?subject={subject}&body={content}"> Send us an email </a>

<a href="tel:{phone}"> Call us </a>

<a href="sms:{phone}?body={content}"> Send us a message </a>
```

#### rel="noopener"，打开添加了 rel=noopener 的链接， window.opener 会为 null。避免用户暴露在一个钓鱼网站攻击之下

```html
<a href="https://markodenic.com/" target="_blank" rel="noopener"> Marko's website </a>
```

#### a 标签下载

```html
<a href="path/to/file" download> Download </a>
```

### Ordered lists `start` attribute

```html
<ol start="12">
  <li>html</li>
  <li>js</li>
  <li>css</li>
</ol>
```

### `<meter>`

```html
<label for="value1">Low</label>
<meter id="value1" min="0" max="100" low="30" high="75" optimum="80" value="25"></meter>

<label for="value2">Medium</label>
<meter id="value2" min="0" max="100" low="30" high="75" optimum="80" value="50"></meter>

<label for="value3">High</label>
<meter id="value3" min="0" max="100" low="30" high="75" optimum="80" value="80"></meter>
```

### `<fieldset>`

```html
<fieldset>
  <legend>Choose your favorite language</legend>

  <input type="radio" id="javascript" name="language" />
  <label for="javascript">JavaScript</label><br />

  <input type="radio" id="python" name="language" />
  <label for="python">Python</label><br />

  <input type="radio" id="java" name="language" />
  <label for="java">Java</label>
</fieldset>
```

### `mark` tag

```html
<p>You can use the <mark> tag to highlight text.</p>
```

## input 标签

### type="range"

```html
<input type="range" />
```

### HTML Native Search，`<input list="list" />`，通过 list 指定搜索选项，支持模糊搜索

```html
<input class="search-input" list="items" />

<datalist id="items">
  <option value="Marko Denic"></option>
  <option value="FreeCodeCamp"></option>
  <option value="FreeCodeTools"></option>
  <option value="Web Development"></option>
  <option value="Web Developer"></option>
</datalist>
```

## 参考文章

1. [HTML Tips](https://markodenic.com/html-tips/)。
2. [html5 语义化标签](https://juejin.cn/post/6844903544995184653)。
