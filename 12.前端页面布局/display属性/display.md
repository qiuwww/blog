# display

[display MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)

`display`有 `32`种写法。

## 取值，区分七大类

### 一、 外部值

所谓外部值，就是说这些值只会**直接影响一个元素的外部表现**，**而不影响元素里面的儿子级孙子级元素的表现。**

1. display: block;
   块元素默认取值；
2. display: inline;
   行内元素默认取值；
3. display: run-in;
   除了 IE 和 Opera 支持它以外，其他所有主流浏览器包括 Chrome, Safari, Firefox 全都对它置若罔闻。

### 二、内部值

内部值主要是用来**管束自己下属的儿子级元素的排布的**，规定它们或者排成 `S`形，或者排成 `B`形这样的。

1. display: flow;
   实验室阶段产品， Chrome 不支持。

2. display: flow-root;
   它可以撑起被你 float 掉的块级元素的高度。

   ```html
   <div class="container container1">
     <div class="item"></div>
     Example one
   </div>
   <style>
     .container {
       border: 2px solid #3bc9db;
       border-radius: 5px;
       background-color: #e3fafc;
       width: 400px;
       padding: 5px;
     }
     .item {
       height: 100px;
       width: 100px;
       background-color: #1098ad;
       border: 1px solid #0b7285;
       border-radius: 5px;
     }
   </style>
   ```

3. display: table;
   这一个属性，以及下面的另外 `8`个与 `table`相关的属性，都是用来控制如何把 `div`显示成 `table`样式的。
   参考 table 布局。

4. display: flex;
   一系列属性，并且包括所有这些属性的取值：

   - flex-direction
   - flex-wrap
   - flex-flow
   - justify-content
   - align-items,
   - align-content
   - flex

5. display: grid;

   - 引入了一个全新的单位： fr，它是 fraction（ 分数）的缩写；
   - 另一个重点是 斜杠操作符。它表示的是**起始位置和结束位置**。比如说 3/4，这是指一个元素从第 3 行开始，到第 4 行结束，但又不包括第 4 行。
   - 一系列属性：
     - grid,
     - grid-column-start,
     - grid-column-end,
     - grid-row-start,
     - grid-row-end,
     - grid-template,
     - grid-template-columns,
     - grid-template-rows,
     - grid-template-areas,
     - grid-gap,
     - grid-column-gap,
     - grid-row-gap,
     - grid-auto-columns,
     - grid-auto-rows,
     - grid-auto-flow,
     - grid-column,
     - grid-row

6. display: ruby;
   旁注标记，标记拼音，只有 firefox 支持。

7. display: subgrid;
   下一级的 grid，可能不能落实到标准。

8. display: list-item;
   类似 ul/li 的样式。

### 属性值

属性值一般是附属于主值的，比如主值里设置了 display:table;，就可以在子元素里使用 display:table-row-group;等等属性。

1. display: table-row-group;
2. display: table-header-group;
3. display: table-footer-group;
4. display: table-row;
5. display: table-cell; 这个属性完全可以单独应用。
6. display: table-column-group;
7. display: table-column;
8. display: table-caption;
9. display: ruby-base;
10. display: ruby-text;
11. display: ruby-base-container;
12. display: ruby-text-container;

### 显示值

MDN 里把它叫做`<display-box>`values（ 盒子值），我把它叫做 显示值，主要是为了便于理解。

1. display: contents;
   它让子元素拥有和父元素一样的布局方式，仅此而已。
2. display: none;

### 混合值

1. display: inline-block;
   - 行内块元素，注意空元素的高度问题，需要设置 font-size: 0; 然后设置内部需要字体大小的元素。
   - inline-block 元素把自己变成特殊的 inline 元素，对于相邻的元素来说表现出 inline 的特点，允许空格。对于内部元素来说表现出 block 元素的特点，可以设置高度和宽度。
   - 空格是两个标签中存在换行符 or 制表符 or 空格符（其实就是缩进）的原因生产的，只需要给设置了 inline-block 属性的父元素设置 font-size:0,就可以使标签中的空格失去宽度。
2. display: inline-table;
3. display: inline-flex;
4. display: inline-grid;

### 全局值

1. display: inherit;
   继承父元素的 display 属性。
2. display: initial;
   不管父元素怎么设定，恢复到浏览器最初始时的 display 属性。
3. display: unset;
   **unset**混合了 inherit 和 initial。如果父元素设值了，就用父元素的设定，如果父元素没设值，就用浏览器的缺省设定。厉害。
