# flex布局

![主轴与侧轴](D:\learn-space\blog\flex布局\主轴与侧轴.bmp)

##　display:flex

1. 当我们使用flexbox布局时候，需要先给父容器的display值定位flex（块级）或者inline-flex（行内级）。
2. 当使用了这个值以后，伸缩容器会为内容建立新的伸缩格式化上下文（FFC），它的上下文展示效果和BFC根元素相同（**BFC特性：浮动不会闯入伸缩容器，且伸缩容器的边界不会与其内容边界叠加(margin叠加的处理原理)**）。
3. 伸缩容器不是块容器，因此有些设计用来控制块布局的属性，**在伸缩布局中不适用**，特别是多栏（column)，float，clear，vertical-align这些属性。


## flex-direction

用来控制中伸缩容器中**主轴的方向**，同时也决定了**伸缩项目的方向**。

属性取值：

- flex-direction:row;也是默认值，即主轴的方向和正常的方向一样，从左到右排列。
- flex-direction:row-reverse;和row的方向相反，从右到左排列。
- flex-direction:column;从上到下排列。
- flex-direction:column-reverse;从下到上排列。 以上只针对ltr书写方式，对于rtl正好相反了。

## flex-wrap

属性控制伸缩容器是单行还是多行，也决定了侧轴方向（新的一行的堆放方向）。

- flex-wrap:nowrap;伸缩容器单行显示，默认值；
- flex-wrap:wrap;伸缩容器多行显示；伸缩项目每一行的排列顺序由上到下依次。
- flex-wrap:wrap-reverse;伸缩容器多行显示，但是伸缩项目每一行的排列顺序由下到上依次排列。

## flex-flow

属性为**flex-direction（主轴方向）**和**flex-wrap（侧轴方向）**的缩写，两个属性决定了伸缩容器的主轴与侧轴。

> flex-flow:[flex-direction][flex-wrap];默认值为row nowrap；

## justify-content

用于定义伸缩项目**在主轴上面的的对齐方式**，当一行上的所有伸缩项目都不能伸缩或可伸缩但是已经达到其最大长度时，这一属性才会对多余的空间进行分配。当项目溢出某一行时，这一属性也会在项目的对齐上施加一些控制。

- justify-content:flex-start;伸缩项目向主轴的起始位置开始对齐，后面的每元素紧挨着前一个元素对齐。
- justify-content:flex-end;伸缩项目向主轴的结束位置对齐，前面的每一个元素紧挨着后一个元素对齐。
- justify-content:center;伸缩项目相互对齐并在主轴上面处于居中，并且第一个元素到主轴起点的距离等于最后一个元素到主轴终点的位置。以上3中都是“捆绑”在一个分别靠左、靠右、居中对齐。
- justify-content:space-between;伸缩项目平均的分配在主轴上面，并且第一个元素和主轴的起点紧挨，最后一个元素和主轴上终点紧挨，中间剩下的伸缩项目在确保两两间隔相等的情况下进行平分。
- justify-content:space-around;伸缩项目平均的分布在主轴上面，并且第一个元素到主轴起点距离和最后一个元素到主轴终点的距离相等，且等于中间元素两两的间距的一半。完美的平均分配，这个布局在阿里系中很常见。