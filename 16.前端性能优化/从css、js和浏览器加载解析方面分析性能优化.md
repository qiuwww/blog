**老生常谈的问题了，慢慢积累吧。** 

## CSS优化、提高性能的方法

这里总结的很好：[常用CSS优化总结——网络性能与语法性能建议](http://www.cnblogs.com/dolphinX/p/3508657.html)，写的非常好。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
主要的观点如下：

关于CSS的优化工作主要从两个方面着手

网络性能：把CSS写到字节数最少，加快下载速度，自然可以让页面渲染的更快一些。
语法性能：同样都能实现某些效果，但并不是所有的方式效果都相同，我们看过不少关于JavaScript方面的语法优化知识，其实CSS里面也有一些。

CSS压缩

在线压缩YUI Compressor：http://ganquan.info/yui/?hl=zh-CN

gzip压缩

Gzip是一种流行的文件压缩算法，现在的应用十分广泛，尤其是在Linux平台，这个不止是对CSS，当应用Gzip压缩到一个纯文本文件时，效果是非常明显的，大约可以减少70％以上的文件大小（这取决于文件中的内容）。
在没有gzip压缩的情况下，Web服务器直接把html页面、CSS脚本、js脚本发送给浏览器，而支持gzip的Web服务器将把文件压缩后再发给浏览器，浏览器（支持gzip）在本地进行解压和解码，并显示原文件。
这样我们传输的文件字节数减少了，自然可以达到网络性能优化的目的。

合写CSS

少写CSS属性来达到减少CSS字节的目的，如background。
.test{
 background-color: #000;
 background-image: url(image.jpg);
 background-position: left top;
 background-repeat: no-repeat;
}
用如下代替：
.test{
  background: #000 url(image.jpg) top left no-repeat;
} 
还有很多属性如：font、margin/padding、background、border、transform、animation。

CSS的继承机制也可以帮我们再一定程度上缩减字节数，我们知道CSS有很多属性是可以继承的即在父容器设置了默写属性，子容器会默认也使用这些属性。

顺便说一下哪些属性可以继承

所有元素可继承：visibility和cursor
内联元素和块元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、 font-family、font-size、font-style、font-variant、
font-weight、text- decoration、text-transform、direction
块状元素可继承：text-indent和text-align
列表元素可继承：list-style、list-style-type、list-style-position、list-style-image
表格元素可继承：border-collapse
不可继承的：display、margin、border、padding、background、height、min-height、max- height、width、min-width、max-width、overflow、
position、left、right、top、 bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、 page-bread-before和unicode-bidi

抽离、拆分CSS，不加载所有CSS，抽离公共部分放到公共的文件夹内。

CSS Sprites

CSS放在head中，减少repaint和reflow

相信做web的同学都知道这条建议，但为什么CSS放在页面顶部有利于网页优化呢？浏览器渲染页面大概是这样的，
当浏览器从上到下一边下载html生成DOM tree一边根据浏览器默认及现有CSS生成render tree来渲染页面，当遇到新的CSS的时候下载并结合现有CSS重新生成render tree，
刚才的渲染工作就白费了，如果我们把所有CSS都放到页面顶部，这样就没有重新渲染的过程了。

不用CSS表达式
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
避免层级或过度限制的CSS
*不要用标签或 class 来限制 ID 规则
*不要用标签名限制 class 规则
*尽量使用最具体的类别、避免后代选择器、属于标签类别的规则永远不要包含子选择器
```

**这里的问题也非常好：知乎**

## **前端性能优化一般可以想到的：**

**1、减少对服务器的数据请求：多次请求合并，然后分割保存，再使用。**

**2、对JS、CSS、图片文件的体积进行相应的压缩。**

**3、使用页面缓存：当展示不经常变动的数据时，直接使用页面的本地缓存对象。**

**4、js文件放在页面结尾的地方引入。DOM之后。**

**5、启用服务的Gzip，网页压缩技术：减少数据的传输，提高网页的加载速度。**

## **js规范、提高性能的方法**

**说说写JavaScript的基本规范。**

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
规范js代码的建议：

1、减少全局污染

    ①注意不要忘了函数作用域内部变量定义使用var ;
    ②不要将所有的变量都在函数体头部（外部）;
    ③使用命名空间，使用一个对象来保存所有的变量声明。

2、for循环

    for循环的循环条件，最好先求出来保存到一个变量中，不然每次都要计算一遍，如for(var i=0,len=data.list.length;i<len;i++){} 

3、用“===”取代“==”
    
    前者是严格判断，后者会提前进行隐式的类型转换。

4、不使用eval();安全问题，性能问题；

5、统一缩进大小（无论用tab或者2个或者4个空格，团队统一即可），任何用花括号括起来并换行的都进行缩进。

6、for循环或者if判断等，即使只有一行，也要换行并用{}括起来。

7、空格

    任何“;”后空一格、for循环中初始化“,”后空一格、数组中","后空一格、对象中“:”后空一格、如：
      for (var i = 0, j = 1; i < 10; i += 1){
           var some = [1, 2, 3];
           var obj = {aa: 1, bb: 2}
      }
　　函数参数里“,”后空一格、函数声明中花括号前空一格、函数表达式中括号前后各空一格，如：
 
      func(a, b, c){};
      function func() {};
      var func = function () {};

　   所有的操作符前后都跟一个空格，如：
 
      var d = 0,
      a = b + 1;
      if (a && b && c) {
             d = a % c;
             a += d;
      }

8、命名规则：
    
      构造器函数首字母大写，如：function Person(){}

      变量用驼峰式命名，如: getFirstName;
      
      常量使用全大写字母，如：varPI = 3.1415926;

      私有函数用下划线开头，如：
            var dog = {
                  name:"dogName",
                  _setName:function(){}      //私有函数
            }

9、注释

     这一步非常关键，因为你写的代码别人不一定看得懂，你写的将来你也不一定轻易能看懂。所以良好的注释习惯可以事半功倍。
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

## 参考文献：关于网站性能优化准则

这几日拜读了Steve Souders的《高性能网站建设指南这本书》，虽然这本书可能已经有些老了，但薄薄的一个小册子里提出的网站性能优化的准则还是非常有价值的。

这些规则都有个共同点，就是用很小的工作就能获得很明显的性能提升，性价比极高。废话不多说了，总结一下书里的几点性能优化规则。 

　　首先有一点需要说明的是书中所写的性能黄金法则：**只有****10%~20%****的响应时间花在了下载****HTML****文档上，其余的****80%~90%****时间花在了下载页面的所有组件上。**

**　　**这也是后面这些性能规则由来的核心。

**　　****规则一：减少****HTTP****请求**。这本书的规则顺序是按照其重要性来排名的，减少HTTP请求作为第一个规则，足见其重要性。根据黄金法则，减少组件数量从而减少HTTP请求是最有效的性能优化方式，其中有几项技术值得提一下：

1. CSS Sprites。应该前端人都比较熟悉了，把图片整合到一个大图里，利用*background-position*来定位。
2. data:URL。值得一说把图片变为内联的，减少了图片请求，webpack里图片小于8kb就会转为base64的data:URL。
3. 合并脚本和CSS。

**　　****规则二：使用****CDN****。**这个规则不用多说，分发内容使之更靠近终端用户，减少了请求时间。

**　　****规则三：添加****Expires****头****。**善用缓存，给长久不变的内容组件设置有效期较久的Expires头。

**　　****规则四：压缩组件****。**利用gzip等内容编码对文档或组件进行压缩，通常能将相应数据量减少*70%*左右。

**　　****规则五：将样式表放在顶部****。**页面在打开工程中逐步呈现，用户会觉得页面快一些，也让用户在等待过程中有一个良好的反馈。把CSS放在底部的话有可能出现白屏现象。

**　　****规则六：将脚本放在底部****。**页面下载脚本时会阻止其他内容下载与呈现，以防止浏览器的重绘重排。所以把脚本放在页面的底部不会阻止页面内容的呈现，而且页面一些可视化组件可以尽早下载而不被阻塞。

**　　****规则七：避免使用****CSS****表达式****。**CSS表达式会进行频繁的求值，导致了性能低下。

**　　****规则八：使用外部****JavaScript****和****CSS****。**纯粹而言，内联更快一些，因为满足了规则一的减少HTTP请求，但是这个问题上，一定要考虑**缓存**带来的性能优化，外部文件很有可能被缓存下来，从而提升了性能。

**　　****规则九：减少****DNS****查找****。**善用DNS缓存，比如持久连接。

**　　****规则十：精简****JavaScript****。**移除不必要的字符空格，我们常见的.min.js就是如此。

**　　****规则十一：避免重定向****。**3xx的响应状态码代表着一股重定向的响应。其中URL结尾缺少斜线造成的重定向需要特别注意，不要因为这一点失误损伤性能。

**　　****规则十二：删除重复脚本****。**

**　　****规则十三：配置****ETag****。**说起这个不得不说条件请求If-Modified-Since和If-None-Match，都是用来进行缓存再验证。ETag的问题是服务器构造ETag时，尽管两个文件完全一样，但如果处于不同的服务器的话还是会有不同的ETag，增加了HTTP进行请求下载的次数，这对于后台是服务器集群的网站性能损伤很大。

**　　****规则十四：使****Ajax****可缓存****。**虽然Ajax是异步的，但也不能让等待响应的时间过长。优化准则的话参见上面的性能准则，其中善用缓存依然是我们重点关注的。

　　书最后用这些准则分析了美国十大网站，发现有效利用这些规则性能有很大的提升空间，我也看了一下自己实习时候项目，发现可优化的地方非常多。以后的开发过程中要谨记这些准则，让自己产品的用户获得更好的体验。

