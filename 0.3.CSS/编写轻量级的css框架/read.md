# 编写轻量级 CSS 框架

 每个人都应该归纳总结工作中的常见需求，编写一套适合自己的 CSS 框架。

### css框架对比

目前市面上前端框架主要分重量级与轻量级。重量级主要有 Bootstrap、Semantic、UIkit、Foundation 等，轻量级有 Pure、Skeleton、Miligram 等。

- Bootstrap 的优势，不是设计风格，不是模块，不是特效，而是栅格，响应式栅格。Bootstrap 的栅格在与其它框架对比中占有绝对优势，无论是栅格的划分还是类名的风格都堪称经典。



## 编写轻量级框架

大多数的轻量级框架只是 CSS 框架，不涉及 JS 部分，主要用于网页的布局。

### 模块划分

编写框架的第一步就是要确定框架应该包含哪些模块。因为是轻量级框架，所以模块肯定没有重量级框架那么全面，只有核心的一些组件。通过比较一些轻量级框架以及工作总结，

大致常用的模块包括:

- 栅格、
- 媒体、
- 按钮、
- 排版、
- 表单、
- 表格、
- 面板以及
- 辅助工具。

在常用的这几个组件中，需要重点关注的是栅格、表单及面板，媒体组件也很重要，但是自由发挥的空间不大，直接用 Bootstrap 的媒体组件。

### 命名策略

1.  首先是类命名的层次与结构。
2.  第二个策略是组件的修饰，比如按钮及面板都存在多个语境（颜色、大小等）。

###栅格系统

栅格系统的编写需要使用预处理器的循环功能，否则就要做无谓的重复劳动了。

### 表单

在此说一下表单中 checkbox 的结构调整，先看一下 Bootstrap 的 checkbox 结构。

**下次有模块的结构先参考一下bootstrap**

> <!-- checkbox -->
>
> <div class="checkbox">
>
> // 这样写就不用一堆的id了
>
>   <label>
>
> ​    <input type="checkbox" value=""> checkbox
>
>   </label>
>
> </div>
>
>  
>
> <!-- checkbox-inline  -->
>
> <label class="checkbox-inline">
>
>   <input type="checkbox" id="inlineCheckbox1" value="option1"> checkbox
>
> </label>



### 辅助类

辅助类是一系列类的组合，比如字号大小、颜色值、padding、margin 以及左右浮动等。在一些 Bootstrap 搭建的后台管理系统中尤为常见，这样布局起来就会比较灵活。



### 盒组件





