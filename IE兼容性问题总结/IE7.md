## IE7.md
1. ie7 不支持box-sizing:border-box;
2. 不支持高级的标签，如：section.以及高级的属性
3. 当元素为button,设置line-height等于height。会造成button的高度变低。
4. IE7可以识别*开头的标签，而别的浏览器都是别不了，eg：.form-control{*width:100px;}

## 关于声明触发浏览器模式的问题
**http://blog.csdn.net/binglingnew/article/details/17301433**

1. Doctype：(Document Type)文档类型，它位于文档中最前面的位置，处于标签之前。如果你想制作符合标准的页面，一个必不可少的关键组成部分就是DOCTYPE的声明。确定了正确的Doctype，xhtml里面的标识和css才能正常生效(也就是说它会很负责地告诉浏览器怎么解释你的这个标签和你写的css)。既然它是一种声明，它的责任就是告诉浏览器文档使用哪种html或者xhtml规范。为了获取正确的Doctype声明，关键就是让dtd与文档所遵循的标准对应。例如：假定文档遵循的是xhtml 1.0 strict,那么文档的Doctype声明就应该是相应的dtd,如果Doctype声明指定的是xhtml dtd，但文档包含的依旧是html标记就是不恰当的。类似的，如果文档包含的是xhtml 1.0 strict标记，但是Doctype声明指定是html dtd也是不恰当的。
2. xhtml 1.0中有3种dtd声明可以选择，过渡性的(Transitional)、严格的(Strict)、框架的(Frameset)。

3. 混杂模式是一种比较宽松的向后兼容的模式。混杂模式通常模拟老式浏览器的行为，以防止老站点无法工作。
4. 两种模式间的差异
对于这两种模式之间的差异，最显著的一个例子与Windows上IE专有的盒模型有关。在IE 6出现时，在标准模式中使用的是正确的盒模型，在混杂模式中使用的则是老式的专有盒模型。为了维持对IE 5和更低版本的向后兼容性，Opera 7和更高版本也在混杂模式中使用有缺点的IE盒模型。
呈现方面的其他差异比较小，而且是与特定浏览器相关的，包括对于十六进制颜色值不需要#号、假设CSS中没有指定单位的长度的单位是像素，以及在使用关键字时将字号增加一级。
5. 如何触发两种模式：DOCTYPE不存在或形式不正确会导致HTML和XHTML文档以混杂模式呈现。
	1. 触发严格模式:
	``` <!-- HTML 4.01 严格型 -->  
		<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"  "http://www.w3.org/TR/html4/strict.dtd">   
		  
		<!-- XHTML 1.0 严格型 -->  
		<!DOCTYPE html PUBLIC  "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">  
	```
	2. 触发混杂模式:
	```	<!-- HTML 4.01 过渡型 -->  
		<!DOCTYPE HTML PUBLIC  "-//W3C//DTD HTML 4.01 Transitional//EN"  "http://www.w3.org/TR/html4/loose.dtd">   
		  
		<!-- HTML 4.01 框架集型 -->  
		<!DOCTYPE HTML PUBLIC  "-//W3C//DTD HTML 4.01 Frameset//EN"  "http://www.w3.org/TR/html4/frameset.dtd">   
		  
		<!-- XHTML 1.0 过渡型 -->  
		<!DOCTYPE html PUBLIC  "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">   
		  
		<!-- XHTML 1.0 框架集型 -->  
		<!DOCTYPE html PUBLIC  "-//W3C//DTD XHTML 1.0 Frameset//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd"> 
	```
	3. IE8关闭超标准模式:
	``` <meta http-equiv="X-UA-Compatible" content="IE=7" />
		content属性中IE的值用于指定使用哪个版本的呈现引擎来呈现页面。
		设计这个值的目的就是为了向后兼容那些专门为老版本的IE设计的站点和页面。  
	```

	## IE7  元素覆盖的问题

```
可能是因为是一个空元素的原因吧：这里设置背景色来调整其样式
对于chrome，一切都正常
对于IE浏览器：设置如下,使用只有IE识别的标签!!!
<!--[if IE]>
.receive-immediately{
	background-color:#fff;
	filter: Alpha(opacity=1);
}
<![endif]-->

```