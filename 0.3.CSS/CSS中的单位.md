## **px **：像素（Pixel）

相对长度单位。**像素px是相对于显示器屏幕分辨率而言的。**(引自CSS2.0手册)

**px 特点：**

\1. IE无法调整那些使用px作为单位的字体大小；

\2. 国外的大部分网站能够调整的原因在于其使用了em或rem作为字体单位；

\3. Firefox能够调整px和em，rem，但是96%以上的中国网民使用IE浏览器(或内核)。

## **em** ：是相对长度单位。

相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。(引自CSS2.0手册)

**em 特点：**

1. **em****的值并不是固定的；**

\2. em会**继承父级元素的字体大小**。

**任意浏览器的默认字体高都是16px。**所有未经调整的浏览器都符合: 1em=16px。那么12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明**Font-size=62.5%，**这就使em值变为 16px*62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了。

**所以我们在写CSS的时候，需要注意两点：**

\1. body选择器中声明Font-size=62.5%；

\2. 将你的原来的px数值除以10，然后换上em作为单位；

\3. 重新计算那些被放大的字体的em数值。**避免字体大小的重复声明**。

## **rem **：是CSS3新增的一个相对单位（root rem，根em），这个单位引起了广泛关注。

这个单位与em有什么区别呢？

**区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。**这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，**又可以避免字体大小逐层复合的连锁反应。**目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用rem设定的字体大小。

## **pt **：印刷业上常使用的单位，磅的意思，一般用于页面打印排版。

不得不说，面试的时候有被问到过。 

## rem的优点

遇到问题多思考一会，或许就会有更好的解决方案。

1、rem是（font size of the root element），官方解释： 
rem unit
Equal to the computed value of "font-size" on the root element.When specified on the "font-size" property of the root element.the "rem" unites refer to the property's inital value.
意思就是根据网页的根元素来设置字体大小，和em（font size of the element）的区别是，em是根据其父元素的字体大小来设置，而rem是根据网页的根元素（html）来设置字体大小的。
2、一般使用
html {
font-size:16px;
}
p {
font-size: 0.75rem; //12÷16=0.75（rem）
}
rem不仅可以适用于字体，同样可以用于width、height、margin这些样式的单位。
其实根据不同的屏幕的大小，根元素设置的一个固定像素的根元素大小，并不太适合移动端的适配。

var iWidth=document.documentElement.clientWidth;

document.getElementsByTagName("html")[0].style.fontSize=iWidth+"px";

3、一般做移动端适配的方法，一般可以分为：

1 简单一点的页面，一般高度直接设置成固定值，宽度一般撑满整个屏幕。

2 稍复杂一些的是利用百分比设置元素的大小来进行适配，或者利用flex等css去设置一些需要定制的宽度。

3 再复杂一些的响应式页面，需要利用css3的media query属性来进行适配，大致思路是根据屏幕不同大小，来设置对应的css样式。

4、rem基准值计算

还是常用的这种方法比较合适：利用javascript来动态设置根据我们之前算出的基准值，我们可以利用js动态算出当前屏幕所适配的font-size即：

document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';

5、rem适配进阶，这个目前来说太高深，如果需要再去认真研究一下

一般手机的dpr是1，iphone4，iphone5这种高清屏是2，iphone6s plus这种高清屏是3，可以通过js的window.devicePixelRatio获取到当前设备的dpr，所以iphone6给的视觉稿大小是（*2）750×1334了。

拿到了dpr之后，我们就可以在viewport meta头里，取消让浏览器自动缩放页面，而自己去设置viewport的content例如（这里之所以要设置viewport是因为我们要实现border1px的效果，加入我给border设置了1px，在scale的影响下，高清屏中就会显示成0.5px的效果）

meta.setAttribute('content', 'initial-scale=' + 1/dpr + ', maximum-scale=' + 1/dpr + ', minimum-scale=' + 1/dpr + ', user-scalable=no');