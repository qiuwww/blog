# display

https://developer.mozilla.org/zh-CN/docs/Web/CSS/display



## 取值

```
/* <display-outside> values */
display: block;
display: inline;
display: run-in;

/* <display-inside> values */
display: flow;
display: flow-root;
display: table;
display: flex;
display: grid;
display: ruby;
display: subgrid;

/* <display-outside> plus <display-inside> values */
display: block flow;
display: inline table;
display: flex run-in;

/* <display-listitem> values */
display: list-item;
display: list-item block;
display: list-item inline;
display: list-item flow;
display: list-item flow-root;
display: list-item block flow;
display: list-item block flow-root;
display: flow list-item block;

/* <display-internal> values */
display: table-row-group;
display: table-header-group;
display: table-footer-group;
display: table-row;
display: table-cell;
display: table-column-group;
display: table-column;
display: table-caption;
display: ruby-base;
display: ruby-text;
display: ruby-base-container;
display: ruby-text-container;

/* <display-box> values */
display: contents;
display: none;

/* <display-legacy> values */
display: inline-block;
display: inline-table;
display: inline-flex;
display: inline-grid;

/* Global values */
display: inherit;
display: initial;
display: unset;
```



## display: inline-block

inline-block元素把自己变成特殊的inline元素，**对于相邻的元素来说表现出inline的特点，允许空格**。对**于内部元素来说表现出block元素的特点，可以设置高度和宽度。**

**空格是两个标签中存在换行符or制表符or空格符（其实就是缩进）的原因生产的，只需要给设置了inline-block属性的父元素设置font-size:0,就可以使标签中的空格失去宽度。**
