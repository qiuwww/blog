
### BFC

1、浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的块级格式化上下文。

2、在一个块级格式化上下文里，盒子从包含块的顶端开始垂直地一个接一个地排列，两个盒子之间的垂直的间隙是由他们的margin 值所决定的。两个相邻的块级盒子的垂直外边距会发生叠加。

3、在块级格式化上下文中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘），即使存在浮动也是如此，除非这个盒子创建一个新的块级格式化上下文。



### transform

1. 转换属性transform属性: 向元素应用 2D 或 3D 转换。
2. canvas画布内使用transform属性。
3. text-transform：转换文本的大小写属性。这不就是专门用来显示小像素点的属性吗。





### animation

配合@keyframes，来定义动画的关键帧。



### transition，过渡属性，逐渐变化

