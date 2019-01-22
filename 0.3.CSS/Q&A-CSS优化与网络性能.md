
# CSS与网络性能

[参考文章：CSS 与网络性能](https://mp.weixin.qq.com/s/nh8szqQaeLNOU6uGg5gc_Q)

[TOC]

## Question

- css如何阻塞页面的渲染？
- 从哪方面优化css对页面的渲染影响？

## Answer

CSS 是页面渲染的关键因素之一，（当页面存在**外链 CSS** 时，）**浏览器会等待全部的 CSS 下载及解析完成后再渲染页面**。
关键路径上的任何延迟都会影响**首屏时间**，因而我们需要尽快地将 CSS 传输到用户的设备，否则，（在页面渲染之前，）用户只能看到一个**空白的屏幕**。

### 最大的问题是什么？

广义而言，CSS 是（渲染）性能的关键，这是由于：

1. 浏览器直到**渲染树(renderTree)**构建完成后才会渲染页面；
2. 渲染树由 DOM 与 CSSOM 组合而成；
3. DOM 是 HTML 加上（同步）阻塞的 JavaScript 操作（DOM 后的）结果；
4. CSSOM 是 CSS 规则应用于 DOM 后的结果；
5. 使 JavaScript 非阻塞非常简单，添加 async 或 defer 属性即可；
6. 相对而言，**要让 CSS 变为异步加载是比较困难的**；
7. 所以记住这条经验法则：（理想情况下，）**最慢样式表的下载时间决定了页面渲染的时间**。

基于上述考虑，我们需要尽快构建 DOM 与 CSSOM。
一般情况下，DOM 的构建是相对较快，（当请求某个页面时，）服务器响应的首个请求是 HTML 文档。但一般 CSS 是作为 HTML 的子资源而存在，**因此 CSSOM 的构建通常需要更长的时间**。

### 解决问题

#### 1、Critical CSS （关键 CSS）模式

提取首次渲染需要用到的css样式，单独拿出来，内联到head中，其他的css通过加载文件资源的形式异步加载。

#### 2、根据媒体类型拆分代码

先查询当前的设备情况，加载相应的css文件。

我们可以观察到，这个单独的 CSS 文件会以 最高 的优先级下载。

根据媒体查询拆分成若干个 CSS 文件后：

```html
<link rel="stylesheet" href="all.css" media="all" />
<link rel="stylesheet" href="small.css" media="(min-width: 20em)" />
<link rel="stylesheet" href="medium.css" media="(min-width: 64em)" />
<link rel="stylesheet" href="large.css" media="(min-width: 90em)" />
<link rel="stylesheet" href="extra-large.css" media="(min-width: 120em)" />
<link rel="stylesheet" href="print.css" media="print" />
```

浏览器仍然会下载全部的 CSS 文件，但只有**符合当前上下文的 CSS 文件会阻塞渲染(Heighest)**。

#### 3、避免在 CSS 文件中使用 @import

import引入的子资源无法并行下载。

它的性能并不高，使用它会阻塞渲染更长时间。这是因为我们在关键路径上创造了**更多（队列式）的网络请求**。

1. 下载 HTML；
2. 请求并下载依赖的 CSS；下载及解析完成后，本该是构造渲染树，然而；
3. **CSS 依赖了其他的 CSS，继续请求并下载 CSS 文件**；
4. 构造渲染树。

#### 4、不要将动态插入 JavaScript 的代码放在`<link rel="stylesheet" />` 之后

css在下载完成之后，才会执行js，进而才会去执行下载js文件的进程。

如果 JS 文件**没有依赖 CSS （也就是js不去更改css）**，你应该将 JS 代码放在样式表之前。 既然没有依赖，那就没有任何理由阻塞 JavaScript 代码的执行。这里就像

（尽管执行 JavaScript 代码时会停止解析 DOM， 但预加载扫描器会提前下载之后的 CSS）

如果你一部分 JavaScript 需要依赖 CSS 而另一部分却不用，最佳的实践是将 JavaScript 分为两部分，分别置于 CSS 的两侧。

#### 5、将 `<link rel="stylesheet" />` 放在 `<body>` 中。

`<link rel="stylesheet" />` 只会阻塞**后续内容**，而不是整个页面的渲染。

```html
<html>
<head>
  <link rel="stylesheet" href="core.css" />
</head>
<body>
  <link rel="stylesheet" href="site-header.css" />
  <header class="site-header">
    <link rel="stylesheet" href="site-nav.css" />
    <nav class="site-nav">...</nav>
  </header>
  <link rel="stylesheet" href="content.css" />
  <main class="content">
    <link rel="stylesheet" href="content-primary.css" />
    <section class="content-primary">
      <h1>...</h1>
      <link rel="stylesheet" href="date-picker.css" />
      <div class="date-picker">...</div>
    </section>
    <link rel="stylesheet" href="content-secondary.css" />
    <aside class="content-secondary">
      <link rel="stylesheet" href="ads.css" />
      <div class="ads">...</div>
    </aside>
  </main>
  <link rel="stylesheet" href="site-footer.css" />
  <footer class="site-footer">
  </footer>
</body>
```

## Summary

本文内容比较 繁杂，成文后超出了本来的预期，尝试总结了 CSS 加载相关的一系列的最佳实践，值得仔细体会：

- **懒加载**非关键 CSS：
  - 优先加载关键 CSS，懒加载其他 CSS；
  - 或根据媒体类型拆分 CSS 文件。
- 避免使用 @import：
  - 在 HTML 文档中应该避免；
  - 在 CSS 文件之中更应避免；
  - 以及警惕预加载扫描器的怪异行为。

- 关注 CSS 与 JavaScript 的顺序：
  - 在 CSS 文件后的 JavaScript 仅在 CSSOM 构建完成后才会执行；
  - 如果你的 JavaScript 不依赖 CSS；
    将它放置于 CSS 之前；
  - 如果 JavaScript 依赖 CSS：
    将它放置于 CSS 之后。
- 仅加载 DOM 依赖的 CSS：
  - 这将提高初次渲染的速度使**让页面逐步渲染**。