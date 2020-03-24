# flex 布局

[在线测试属性](https://flexboxfroggy.com/)
[MDN flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

##　 display:flex

1. 当我们使用 flexbox 布局时候，需要先给父容器的 display 值定位 flex（块级）或者 inline-flex（行内级）。
2. 当使用了这个值以后，伸缩容器会为内容建立新的伸缩格式化上下文（FFC），它的上下文展示效果和 BFC 根元素相同（**BFC 特性：浮动不会闯入伸缩容器，且伸缩容器的边界不会与其内容边界叠加(margin 叠加的处理原理)**）。
3. 伸缩容器不是块容器，因此有些设计用来控制块布局的属性，**在伸缩布局中不适用**，特别是多栏（column)，float，clear，vertical-align 这些属性。

## flex-direction

用来控制中伸缩容器中**主轴的方向**，同时也决定了**伸缩项目的方向**。

属性取值：

- flex-direction:row;也是默认值，即主轴的方向和正常的方向一样，从左到右排列。
- flex-direction:row-reverse;和 row 的方向相反，从右到左排列。
- flex-direction:column;从上到下排列。
- flex-direction:column-reverse;从下到上排列。 以上只针对 ltr 书写方式，对于 rtl 正好相反了。

## flex-wrap

属性控制伸缩容器是单行还是多行，也决定了侧轴方向（新的一行的堆放方向）。![主轴与侧轴](./主轴与侧轴.bmp)

- flex-wrap:nowrap;伸缩容器单行显示，默认值；
- flex-wrap:wrap;伸缩容器多行显示；伸缩项目每一行的排列顺序由上到下依次。![主轴与侧轴](./主轴与侧轴.bmp)
- flex-wrap:wrap-reverse;伸缩容器多行显示，但是伸缩项目每一行的排列顺序由下到上依次排列。

## flex-flow

属性为**flex-direction（主轴方向）**和**flex-wrap（侧轴方向）**的缩写，两个属性决定了伸缩容器的主轴与侧轴。

> flex-flow:[flex-direction][flex-wrap];默认值为 row nowrap；

## justify-content

用于定义伸缩项目**在主轴上面的的对齐方式**，当一行上的所有伸缩项目都不能伸缩或可伸缩但是已经达到其最大长度时，这一属性才会对多余的空间进行分配。当项目溢出某一行时，这一属性也会在项目的对齐上施加一些控制。

- justify-content:flex-start;伸缩项目向主轴的起始位置开始对齐，后面的每元素紧挨着前一个元素对齐。
- justify-content:flex-end;伸缩项目向主轴的结束位置对齐，前面的每一个元素紧挨着后一个元素对齐。
- justify-content:center;伸缩项目相互对齐并在主轴上面处于居中，并且第一个元素到主轴起点的距离等于最后一个元素到主轴终点的位置。以上 3 中都是“捆绑”在一个分别靠左、靠右、居中对齐。
- justify-content:space-between;伸缩项目平均的分配在主轴上面，并且第一个元素和主轴的起点紧挨，最后一个元素和主轴上终点紧挨，中间剩下的伸缩项目在确保两两间隔相等的情况下进行平分。
- justify-content:space-around;伸缩项目平均的分布在主轴上面，并且第一个元素到主轴起点距离和最后一个元素到主轴终点的距离相等，且等于中间元素两两的间距的一半。完美的平均分配，这个布局在阿里系中很常见。

## align-items

[align-items]用来定义伸缩项目在侧轴的对齐方式，这类似于[justify-content]属性，但是是另一个方向。（**flex-directon 和 flex-wrap 是一对**，**justify-content 和 align-items 是一对**，**前者分别定义主轴和侧轴的方向，后者分别定义主轴和侧轴中项目的对齐方式**）。

- align-items:flex-start;伸缩项目在侧轴起点边的外边距紧靠住该行在侧轴起点的边。
- align-items:flex-end;伸缩项目在侧轴终点边的外边距靠住该行在侧轴终点的边。
- align-items:center;伸缩项目的外边距在侧轴上居中放置。
- align-items:baseline;如果伸缩项目的行内轴与侧轴为同一条，则该值与[flex-start]等效。 其它情况下，该值将参与基线对齐。
- align-items:stretch;伸缩项目拉伸填充整个伸缩容器。此值会使项目的外边距盒的尺寸在遵照「min/max-width/height」属性的限制下尽可能接近所在行的尺寸。

## align-content

[align-content]属性可以用来**调准伸缩行在伸缩容器里的对齐方式**，这与调准伸缩项目在主轴上对齐方式的[justify-content]属性类似。只不过这里元素是以一行为单位。**请注意本属性在只有一行的伸缩容器上没有效果。当使用 flex-wrap:wrap 时候多行效果就出来了。**

> align-content: flex-start || flex-end || center || space-between || space-around || stretch;

- align-content: stretch;默认值,各行将会伸展以占用剩余的空间。
- 其他可以参考[justify-content]用法。

## 子元素设置

主要是 3 个，order，flex（flex-grow，flex-shrink，flex-basis 的组合），align-self；用来比较多的是前两个。

## order 用来控制元素的顺序

[CSS](https://developer.mozilla.org/zh-CN/docs/CSS) **order**  属性规定了弹性容器中的可伸缩项目在布局时的顺序。元素按照  `order`  属性的值的增序进行布局。拥有相同  `order`  属性值的元素按照它们在源代码中出现的顺序进行布局。类似于 z-index 的取值吧。

## flex 属性(针对子元素的设置)

[flex]属性可以用来指定可伸缩长度的部件，是 flex-grow（扩展比例）,flow-shrink（收缩比例）,flex-basis（伸缩基准值）这个三个属性的缩写写法，建议大家采用缩写的方式而不是单独来使用这 3 个属性。

> flex:none | [ <'flex-grow'> ?<'flew-shrink'> || <'flow-basis'>]
> // flex-grow 是必须得 flex-shrink 和 flow-basis 是可选的

- flex-grow:;其中 number 作为**扩展比例**，没有单位，初始值是 0，**主要用来决定伸缩容器剩余空间按比例应扩展多少空间。**
- flex-shrink:;其中 number 作为收缩比例，没有单位，初始值是 1，**也就是剩余空间是负值的时候此伸缩项目相对于伸缩容器里其他伸缩项目能收缩的空间比例，**在收缩的时候收缩比率会以[flex-basis]伸缩基准值加权。
- flex-basis:|auto;默认是 auto 也就是**根据可伸缩比率计算出剩余空间的分布之前，伸缩项目主轴长度的起始数值。**若在「flex」缩写省略了此部件，则「flex-basis」的指定值是长度零。

## flex 高度继承的问题

- 在 49 版本的时候高度集成只能是一层一层的 display: flex; flex: 1; 不能穿插 100%之类的百分比操作；继承的属性屏蔽了 flex: 1;

- 60 版本的 chrome 不存在这个问题。

## box-flex，属性规定框的子元素是否可伸缩其尺寸

目前没有浏览器支持 box-flex 属性。

元素的可伸缩行。柔性是相对的，例如 box-flex 为 2 的子元素**两倍于** box-flex 为 1 的子元素。
