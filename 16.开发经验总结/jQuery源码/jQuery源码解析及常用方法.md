# jQuery源码解析及常用方法

主要从**闭包实现模块**、**ready的实现**、**内部变量引入全局作用域**等方面来说。

### jQuery的外衣：

通用的模块的写法，使用闭包来隔离变量，制造块作用域，防止污染全局变量。

```
//以下截取自jquery源码片段
(function( window, undefined ) {
   /*    源码内容    */
})( window );
```

我们将里面的变量变成了局域变量，这不仅可以提高运行速度，更重要的是我们在引用jquery的JS文件时，不会因为jquery当中的变量太多，而与其它的JS框架的**变量命名产生冲突**。



### jquery的背心：

在闭包内导出局部变量为全局变量，这样$或者jQuery就可以附在全局window对象上，在全局作用于内使用了。

```
window.jQuery = window.$ = jQuery;
```



## jquery的内裤：

解释了**选择器的实现原理**，是jQuery最核心的功能，

还有就是jQuery的**原型对象**。

最后解释了$(document.Element)将**dom对象转对jQuery对象的实现方法**。



### 选择器

而选择器简单理解的话，其实就是在DOM文档中，寻找一个DOM对象的工具。

首先我们进入jquery源码中，可以很容易的找到jquery对象的声明，看过以后会发现，**原来我们的jquery对象就是init对象。**

```
// Define a local copy of jQuery

jQuery = function( selector, context ) {

  // The jQuery object is actually just the init constructor 'enhanced'

  // Need init if jQuery is called (just allow error to be thrown if not included)

  return new jQuery.fn.init( selector, context );

},
```

### jquery的原型

这里出现了jQuery.fn这样一个东西，它的由来可以在jquery的源码中找到，它其实代表的就是jQuery对象的原型。（$类方法与实例方法）

```
jQuery.fn = jQuery.prototype;
jQuery.fn.init.prototype = jQuery.fn;
```

这两句话，第一句把jQuery对象的原型赋给了fn属性，第二句把jQuery对象的原型又赋给了init对象的原型。也就是说，init对象和jQuery具有相同的原型，因此我们在上面返回的init对象，就与jQuery对象有一样的属性和方法。

### 选择对象转换

我们在jQuery和DOM对象之间切换时需要用到[0]这个属性。

从截图也可以看出，jQuery对象其实主要就是**把原生的DOM对象存在了[0]的位置**，并给它加了一系列简便的方法。



### jquery的大腿：

主要讲ready的实现

> 实现类似jquery的ready方法的效果我们是可以简单做到的，它的实现原理就是，维护一个函数数组，然后不停的判断DOM是否加载完毕，倘若加载完毕就触发所有数组中的函数。

```
if (document.addEventListener) { // ff
    document.addEventListener("DOMContentLoaded", bindReady, false);
} else if (document.attachEvent) { // ie
    document.attachEvent("onreadystatechange", function () {
        if ((/loaded|complete/).test(document.readyState))
            bindReady();
    });
    if (window == window.top) {
        timer = setInterval(function () {
            try {
                isReady || document.documentElement.doScroll('left'); //在IE下用能否执行doScroll判断dom是否加载完毕  
            } catch (e) {
                return;
            }
            bindReady();
        }, 5);
    }
}
```

### jquery的胳膊：（扩展`$、$.fn`与扩展一般js对象）

而对于jquery来说，extend方法便是它的胳膊，没有它我们依然可以很好的使用jquery，但是有了它，我们会更加畅快。

简单说两个extend方法的常用方式：

1. 使用jQuery.fn.extend可以**扩展jQuery对象**，使用jQuery.extend可以扩展jQuery，**前者类似于给类添加普通方法，后者类似于给类添加静态方法。**
2. 两个extend方法如果有**两个object类型的参数**，则会将**后面的参数对象属性扩展到第一个参数对象上面**，扩展时可以再添加一个boolean参数控制是否深度拷贝。 





## 针对 jQuery 的优化方法？

1、总是使用#id去寻找element.

在jQuery中最快的选择器是ID选择器 ($('#someid')). 这是因为它直接映射为JavaScript的getElementById()方法。

2、在Classes前面使用Tags

在jQuery中第二快的选择器就是Tag选择器 ($('head')). 而这是因为它直接映射到JavaScript的getElementsByTagName()方法。

> 注意：在jQuery里Class选择器是最慢的一个选择器;在IE中它循环整个DOM。可能的话尽量避免使用它。不要在ID前面 加Tags。

3、缓存jQuery对象，对于同一个dom的多个操作的时候，最好缓存到一个变量上，就像len = arr.length; 避免多次超找或者计算。

> 提示：使用$前辍表示我们的本地变量是一个jQuery包集。记住，不要在你的应该程序里出现一次以上的jQuery重复的选择操作。 额外提示：延迟存储jQuery对象结果。

4、更好的利用链，连式操作，避免多写代码，或者查询。

5、使用子查询

jQuery允许我们在一个包集上附加其它的选择器。因为我们已经在本地变量里保存了父对象这样会减少以后在选择器上的性能开销。

> 主要使用find实现：提示：可以用逗号隔开一次定义多个本地变量，这样可以节省一些字节。

6、限制直接对DOM操作

7、事件委托（又名：冒泡事件）

除非特别说明，每一个JavaScript事件（如click, mouseover 等）在DOM结构树上都会冒泡到它的父元素上。如果我们想让很多**elements(nodes)调用同一个function这是非常有用的**。

8、消除查询浪费

9、遵从$(windows).load

10、压缩JS

















