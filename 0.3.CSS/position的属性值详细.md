

#position的属性值

**六个属性值：static、relative、absolute、fixed、sticky和inherit；**

**伴生的属性值：**

	1. top、bottom、left、right；
	2. z-index；

**对应的单位：**

1. 百分比：百分比的**参照物是父元素**，50%相当于父元素width的50%；
2. rem：这个对于复杂的设计图相当有用，**它是html的font-size的大小**；
3. em：它虽然也是一个相对的单位，**相对于父元素的font-size**，但是，并不常用，主要是计算太麻烦了。

## sticky

sticky：(这是css3新增的属性值)粘性定位，官方的介绍比较简单，或许你不能理解。其实，它就相当于relative和fixed混合。最初会被当作是relative，相对于原来的位置进行偏移；一旦超过一定阈值之后，会被当成fixed定位，相对于视口进行定位。demo地址（https://jsbin.com/moxetad/edit?html,css,output）