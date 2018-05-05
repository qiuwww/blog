

## css选择器.md

### 选择相邻兄弟, 既有同级关系（同级），也有位置关系（之后）

如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用`相邻兄弟选择器`（Adjacent sibling selector）。

例如，如果要增加紧接在 h1 元素后出现的段落的上边距，可以这样写：
h1 + p {margin-top:50px;}
这个选择器读作：`“选择紧接在 h1 元素后出现的段落，h1 和 p 元素拥有共同的父元素”。`


CSS选择器有哪些？哪些属性可以继承？

CSS选择符：id选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul > li）、后代选择器（li a）、通配符选择器（*）、属性选择器（a[rel=”external”]）、伪类选择器（a:hover, li:nth-child）

可继承的属性：font-size, font-family, color

不可继承的样式：border, padding, margin, width, height

优先级（就近原则）：!important > [ id > class > tag ]
!important 比内联优先级高


伪类选择器

p:empty {
    background: #ff0000;
}