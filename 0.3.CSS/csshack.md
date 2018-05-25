CSS hack原理
由于不同的浏览器和浏览器各版本对CSS的支持及解析结果不一样，以及CSS优先级对浏览器展现效果的影响，我们可以据此针对不同的浏览器情景来应用不同的CSS。
CSS hack分类
复制代码
CSS Hack大致有3种表现形式，CSS属性前缀法、选择器前缀法以及IE条件注释法（即HTML头部引用if IE）Hack，实际项目中CSS Hack大部分是针对IE浏览器不同版本之间的表现差异而引入的。

属性前缀法(即类内部Hack)：
例如 IE6能识别下划线"_"和星号" * "，
IE7能识别星号" * "，但不能识别下划线"_"，
IE6~IE10都认识"\9"，但firefox前述三个都不能认识。
 
选择器前缀法(即选择器Hack)：
例如 IE6能识别*html .class{}，
IE7能识别*+html .class{}或者*:first-child+html .class{}。
 
IE条件注释法(即HTML条件注释Hack)：
针对所有IE(注：IE10+已经不再支持条件注释)：
<!--[if IE]>IE浏览器显示的内容 <![endif]-->，
针对IE6及以下版本： <!--[if lt IE 6]>只在IE6-显示的内容 <![end if]-->。
这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效。

CSS hack书写顺序，一般是将适用范围广、被识别能力强的CSS定义在前面。
复制代码
CSS hack方式一：条件注释法
复制代码
这种方式是IE浏览器专有的Hack方式，微软官方推荐使用的hack方式。举例如下：
 
只在IE下生效：
 
<!--[if IE]>这段文字只在IE浏览器显示<![end if]-->
 
只在IE6下生效：
 
<!--[if IE 6]>这段文字只在IE6浏览器显示<![end if]-->
 
只在IE6以上版本生效：
 
<!--[if gte IE 6]>这段文字只在IE6以上(包括)版本IE浏览器显示<![end if]-->
 
只在IE8上不生效：
 
<!--[if ! IE 8]>这段文字在非IE8浏览器显示<![end if]-->
 
非IE浏览器生效：
 
<!--[if !IE]>这段文字只在非IE浏览器显示<![end if]-->
复制代码
CSS hack方式二：符号前缀
复制代码
在标准模式中
 
“-″减号是IE6专有的hack
 
“\9″ IE6/IE7/IE8/IE9/IE10都生效
 
“\0″ IE8/IE9/IE10都生效，是IE8/9/10的hack
 
“\9\0″ 只对IE9/IE10生效，是IE9/10的hack
复制代码
CSS hack方式三：选择器前缀法
复制代码
选择器前缀法是针对一些页面表现不一致或者需要特殊对待的浏览器，在CSS选择器前加上一些只有某些特定浏览器才能识别的前缀进行hack。
 
目前最常见的是
 
*html *前缀只对IE6生效
 
*+html *+前缀只对IE7生效
 
@media screen\9{...}只对IE6/7生效
 
@media \0screen {body { background: red; }}只对IE8有效
 
@media \0screen\,screen\9{body { background: blue; }}只对IE6/7/8有效
 
@media screen\0 {body { background: green; }} 只对IE8/9/10有效
 
@media screen and (min-width:0\0) {body { background: gray; }} 只对IE9/10有效
 
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {body { background: orange; }} 只对IE10有效
复制代码
CSS3选择器结合JavaScript的Hack（鉴别浏览器的方式改为了浏览器代理识别） 
复制代码
我们用IE10进行举例：
 
由于IE10用户代理字符串（UserAgent）为：Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)，

所以我们可以使用javascript将此属性添加到文档标签中，再运用CSS3基本选择器匹配。
 
JavaScript代码:
 
var htmlObj = document.documentElement;
 
htmlObj.setAttribute('data-useragent',navigator.userAgent);
 
htmlObj.setAttribute('data-platform', navigator.platform );
 
CSS3匹配代码：
 
html[data-useragent*='MSIE 10.0'] #id {color: #F00;}

复制代码
Firefox 浏览器、Webkit 内核浏览器、Opera 浏览器css hack 
复制代码
Firefox 浏览器css hack
 
@-moz-document url-prefix() { 
 
  .selector { property: value; } 
 
} 
 
支持所有Gecko内核的浏览器 (包括Firefox)
 
*>.selector { property: value; } 
 
Webkit 内核浏览器 css hack
 
@media screen and (-webkit-min-device-pixel-ratio: 0) { 
 
  Selector { property: value;  } 
 
} 
 
Opera 浏览器css hack
 
html:first-child>b\ody Selector {property:value;} 
 
@media all and (-webkit-min-device-pixel-ratio:10000),not and all (-webkit-min-device-pixel-ratio:0) { .font1 {color:red;} }
 
Webkit 内核浏览器 css hack和Opera 浏览器css hack
 
@media all and (min-width:0px){ .font1 {color:red;} } 
 
复制代码
移动端开发专用css hack
复制代码
在android2+的版本中，按钮边框会产生bug，需要清除掉，解决方案如下：
 
a,button,input{-webkit-tap-highlight-color:rgba(255,0,0,0);}/* 1.去除android a/button/input标签被点击时产生的边框 2.去除ios a标签被点击时产生的半透明灰色背景 */
 
利用-webkit-transform-3d属性，因为Android4.0下不识别该选择器，浏览器解析代码时，会直接跳过此步骤
 
在CSS3的兼容中，相信大家对使用media的兼容并不陌生，我之前也提到过很多次，那么今天使用的hack也是跟它离不开的，代码如下：
 
@media all and (-webkit-transform-3d){/* Android4.0下不识别该-webkit-transform-3d，使用它可做Android4.0下版本兼容 */
 
.css{...}
 
}
复制代码