---
title: table布局
date: 2017-6-6
tags:
  - CSS
  - table布局
categories:
  - [CSS, table布局]
---

## HTML Table 是指使用原生的`<table>`标签，而 CSS Table 是指用 CSS 属性模仿 HTML 表格的模型

table：指定对象作为块元素级的表格。类同于 html 标签`<table>`（CSS2）
inline-table：指定对象作为内联元素级的表格。类同于 html 标签`<table>`（CSS2）
table-caption：指定对象作为表格标题。类同于 html 标签`<caption>`（CSS2）
table-cell：指定对象作为表格单元格。类同于 html 标签`<td>`（CSS2）
table-row：指定对象作为表格行。类同于 html 标签`<tr>`（CSS2）
table-row-group：指定对象作为表格行组。类同于 html 标签`<tbody>`（CSS2）
table-column：指定对象作为表格列。类同于 html 标签`<col>`（CSS2）
table-column-group：指定对象作为表格列组显示。类同于 html 标签`<colgroup>`（CSS2）
table-header-group：指定对象作为表格标题组。类同于 html 标签`<thead>`（CSS2）
table-footer-group：指定对象作为表格脚注组。类同于 html 标签`<tfoot>`（CSS2）

`适当地调整CSS属性，CSS的Table能做到许多HTML Table 不能做的事情，可以从Table中择优选择属性使用。`

## 经分析需要处理一列的宽度，只有 table 布局才有列的概念，故采用 display:table | table-row | table-cell 来布局

CSS 属性 table-layout 定义了表格单元格、行和列的布局算法。默认值为 auto，表格及其单元格的宽度由其内部的内容决定。

而值为 fixed 时，表格的宽度取决于 tabe 元素的宽度值，列宽由对应 col 元素的宽度决定，或者由首行单元格的宽度决定，后续行内单元格不会影响列宽。

使用 fixed 布局方法时，一旦表格的首行下载和解析完成，整个表格即可被渲染。相对于自动布局方法，这种方法可加速表格渲染，但可能会造成后续单元格的内容与列宽不适合。如果单元格的内容溢出，使用 overflow 属性来决定是否截断溢出内容。

## table 的一些特性与表现形式

虽然 table 布局因为它的一些**非语义化、布局代码冗余，以及不好维护改版等缺点被赶出了布局界**。但是在 css 不给力时期，table 布局也曾风靡一时，就算现在看来 table 的一些布局的特性也是非常给力的，而幸好 css 也吸取了 table 布局一些好的特性为己用。让我们可以使用更少、更语义化的标签来模拟 table 布局，可以跳过 table 布局的缺点又实现我们想要的效果，所以我们首先需要了解 table 的一些特性以及对应的 css 属性。

我们在不居中使用到的也就是 table、tr、td 的一些特性，所以我们只需要了解这三个标签的特性就足够了。

### table 标签（display:table）

1. table 可设置宽高、margin、border、padding 等属性。属性值的单位可以使用 px，百分比值。
2. table 的宽度默认由内容的宽高撑开，如果 table 设置了宽度，宽度默认被它里面的 td 平均分，如果给某一个 td 设置宽度，那么 table 剩余的宽度会被其他的 td 平均分（有点类似 flex 布局）。
3. 给 table 设置的高度起到的作用只是 min-height 的作用，当内容的高度高于设置的高度时，table 的高度会被撑高。

### tr 标签（display:table-row）

1. 给 tr 设置高度只起到 min-height 的作用，默认会平分 table 的高度。
2. tr 中的 td 默认高度会继承 tr 的高度，若给任一 td 设置了高度，其他 td 的高度也同样变高。适合多列等高布局。
3. 设置宽度、margin、都不起作用。

### td 标签（display:table-cell）

1. td 默认继承 table 的高度，且平分 table 的宽度。
2. 若 table（display:table）不存在，给 td 设置的宽高不能用百分比只能用准确的数值（table 滚添加滚动效果的时候，需要设置每列的宽高）。
3. 给 td 设置 vertical-align: middle; td 元素里面(除 float、position:absolute)所有的块级、非块级元素都会相对于 td 垂直居中。
4. 给 td 设置 text-align: center; td 元素里面所有非 block 元素(除 float、position:absolute)都会相对于 td 水平居中，虽然 block 元素不居中，但其中的文字或 inline 元素会水平居中。

### 设置了 display:table-cell 的元素具有以下特性

1. text-align、vertical-align 等对齐属性起作用，margin 不起作用。宽高百分比值不起作用。
2. 会生成虚拟的 table、tr 把自己包裹住，如果有相邻的兄弟元素也被设置了 table-cell,则会跟兄弟元素一起生成虚拟的 table、tr 把自己包裹住，并一行等高显示。
3. 多个 table-cell 元素会占满被设置了 display: table 的元素的宽度，如果一个元素被设置了宽度，那么其他剩余的 table-cell 元素会占满剩下的宽度。当然，如果只有一个 table-cell 元素，就算设置了宽度也会占满 table 元素的宽度。

对设置了 float、absolute 的元素不起作用。且 IE6、7 不支持
这就是所谓的 table 布局大法。

## table-layout 属性

table-layout 属性
table-layout: auto | fixed | initial | inherit;

使用 table-layout 属性指定表格的显示方式，设置表格的列幅是自动布（auto）、是固定布局(fixed)。两种情况下行的 纵高会自动计算出。
当指定了 table-layout:auto;时，浏览器会把整个表格全部读入后，根据单格内容开始计算各列的宽度；当指定了 table-layout:fixed;时，最初的一行定各列的宽幅，这样能够提高显示速度。

取值
auto 自动布局表格的列宽
fixed 表格的列宽固定
initial 保持原有属性的值
inherit 继承母元素的设定。
