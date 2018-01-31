## 几种绑定

采用事件委托最直观的感受就是，不需要给每一个指定的元素绑定事件，从而降低了繁琐的绑定过程，节约了代码量，同时也节约了内存的开销。绑定一个事件都是需要占用内存消耗的，除了性能的差异，通过委托的事件还能很友好的支持动态绑定，只要 on 的 delegate 对象是 HTML 页面原有的元素，由于是事件的触发是通过 Javascript 的事件冒泡机制来监测，所以对于所有子元素（包括后期通过 JS 生成的元素）所有的事件监测均能有效，且由于不用对多个元素进行事件绑定，能够有效的节省内存的损耗。

那么 jQuery 对事件的绑定分别有几种 API，具体有什么区别我们来了解一下：

**bind方法**

.bind()方法用于直接附加一个事件处理程序到元素上，处理程序附加到 jQuery 对象中当前选中的元素，所以在 .bind() 绑定事件的时候这些元素必须已经存在，很明显就是直接调用没利用委托机制。

**live方法**

将委托的事件处理程序附加到一个页面的 document 元素，从而简化了在页面上动态添加的内容上事件处理的使用。

例如：

```
$('a').live('click', function() { alert("!")})

```

JQuery 把 alert 函数绑定到 $(document) 元素上，并使用 ’click’和 ’a’作为参数。任何时候只要有事件冒泡到 document 节点上，它就查看该事件是否是一个 click 事件，以及该事件的目标元素与’a’这一CSS 选择器是否匹配，如果都是的话，则执行函数。

因为更高版本的 jQuery 提供了更好的方法，没有 .live() 方法的缺点，所以 .live() 方法不再推荐使用，特别是使用 .live() 出现的以下问题：

1. 在调用 .live() 方法之前，jQuery 会先获取与指定的选择器匹配的元素，这一点对于大型文档来说是很花费时间的。
2. 不支持链式写法。例如，$("a").find(".offsite, .external").live( ... ); 这样的写法是不合法的，并不能像期待的那样起作用。
3. 由于所有的 .live() 事件被添加到 document 元素上，所以在事件被处理之前，可能会通过最长最慢的那条路径之后才能被触发。
4. 在移动 iOS (iPhone, iPad 和 iPod Touch) 上，对于大多数元素而言，click 事件不会冒泡到文档 body 上，并且如果不满足如下情况之一，就不能和 .live() 方法一起使用：使用原生的可被点击的元素，例如, a 或 button，因为这两个元素可以冒泡到 document。
5. 在 document.body 内的元素使用 .on() 或 .delegate() 进行绑定，因为移动 iOS 只有在 body 内才能进行冒泡。
6. 需要 click 冒泡到元素上才能应用的 CSS 样式 cursor:pointer (或者是父元素包含document.documentElement)。但是依然需要注意的是，这样会禁止元素上的复制/粘贴功能，并且当点击元素时，会导致该元素被高亮显示。
7. 在事件处理中调用 event.stopPropagation() 来阻止事件处理被添加到 document 之后的节点中，是效率很低的，因为事件已经被传播到 document 上。
8. .live() 方法与其它事件方法的相互影响是会令人感到惊讶的。例如，$(document).unbind("click") 会移除所有通过 .live() 添加的 click 事件!

**delegate方法**

为了突破单一 .bind() 方法的局限性，实现事件委托，jQuery 1.3引入了.live()方法。后来，为解决“事件传播链”过长的问题，jQuery 1.4又支持为 .live() 方法指定上下文对象。而为了解决无谓生成元素集合的问题，jQuery 1.4.2干脆直接引入了一个新方法 .delegate()

使用 .delegate()，前面的例子可以这样写：

```
$('#element).delegate('a', 'click', function() { alert("!!!") });

```

jQuery 扫描文档查找(‘#element’)，并使用 click 事件和’a’这一CSS选择器作为参数把 alert 函数绑定到(‘#element)上。

任何时候只要有事件冒泡到$(‘#element)上，它就查看该事件是否是click事件，以及该事件的目标元素是否与CCS选择器相匹配。如果两种检查的结果都为真的话，它就执行函数。

可以注意到，这一过程与.live()类似，但是其把处理程序绑定到具体的元素而非document这一根上。

```
那么 (′a′).live()==(document).delegate('a') ？
```

可见，.delegate() 方法是一个相对完美的解决方案。但在DOM结构简单的情况下，也可以使用.live()。

**on方法**

其实 .bind(), .live(), .delegate()都是通过.on()来实现的，.unbind(), .die(), .undelegate()也是一样的都是通过.off()来实现的，提供了一种统一绑定事件的方法。

**总结：**

在下列情况下，应该使用 .live()或 .delegate()，而不能使用 .bind()：

```
1. 为DOM中的很多元素绑定相同事件；
2. 为DOM中尚不存在的元素绑定事件；
3. 用.bind()的代价是非常大的，它会把相同的一个事件处理程序hook到所有匹配的DOM元素上
4. 不要再用.live()了，它已经不再被推荐了，而且还有许多问题
5. .delegate()会提供很好的方法来提高效率，同时我们可以添加一事件处理方法到动态添加的元素上

```

我们可以用 .on() 来代替上述的 3 种方法。

不足点也是有的：

```
1. 并非所有的事件都能冒泡，如load, change, submit, focus, blur
2. 加大管理复杂
3. 不好模拟用户触发事件
4. 如何取舍就看项目实际中运用了
```

## 事件接口

**jQuery事件处理机制能帮我们处理那些问题？**

毋容置疑首先要解决浏览器事件兼容问题：

```
1. 可以在一个事件类型上添加多个事件处理函数，可以一次添加多个事件类型的事件处理函数
2. 提供了常用事件的便捷方法
3. 支持自定义事件
4. 扩展了组合事件
5. 提供了统一的事件封装、绑定、执行、销毁机制
```

……

为了更深入的理解幕后的实现，所以先整理整体的结构思路，从1.7后就去除了 live 绑定,所以现在的整个事件的 API

如图：

![img](http://img.mukewang.com/547d3052000141c204360259.jpg)

jQuery的事件绑定有多个方法可以调用，以 click 事件来举例：

```
$('#foo').click(function(){ })
$('#foo').bind('click',function(){ })
$("foo").delegate("td", "click", function() { })
$("foo").on("click", "td", function() { })
```

click,bind,delegate,on方法,以上四种绑定都能达到同一样的效果，但是各自又有什么区别，内部又是如何实现?

**源码分析**：

**click方式**

```
jQuery.fn[ 'click' ] = function( data, fn ) {
    return arguments.length > 0 ?
         this.on( name, null, data, fn ) :
         this.trigger( name );
};
```

源码很简单，合并15种事件统一增加到jQuery.fn上，内部调用this.on / this.trigger。

**bind方式**

```
bind: function( types, data, fn ) {
    return this.on( types, null, data, fn )
}
```

同样调用的this.on/this.off。

**delegate方式**

```
delegate: function( selector, types, data, fn ) {
    return this.on( types, selector, data, fn )
}
```

同样调用的this.on/this.off。

**one方式**

```
one: function( types, selector, data, fn ) {
    return this.on( types, selector, data, fn, 1 )
}
```

可见以上的接口只是修改了不同的传递参数，最后都交给 on 实现的。

## 绑定设计

提到jQuery的事件，不得不提一下 Dean Edwards大神 addEvent 库，很多流行的类库的基本思想从他那儿借来的。jQuery的事件处理机制吸取了 JavaScript 专家 Dean Edwards 编写的事件处理函数的精华，使得jQuery处理事件绑定的时候相当的可靠。在预留退路(graceful degradation)，循序渐进以及非入侵式编程思想方面，jQuery 也做的非常不错。总的来说对于 jQuery 的事件绑定做了 2 大块的处理：

```
在绑定的时候做了包装处理
在执行的时候有过滤器处理
```

看看 API 的参数：

```
.on( events [, selector ] [, data ], handler(eventObject) )
```

1. events：事件名
2. selector : 一个选择器字符串，用于过滤出被选中的元素中能触发事件的后代元素
3. data :当一个事件被触发时，要传递给事件处理函数的
4. handler : 事件被触发时，执行的函数

用来绑定一个事件：

```
var body = $('body')
body.on('click','p',function(){
    console.log(this)
})
```

用 on 方法给 body 上绑定一个 click 事件，冒泡到 p 元素的时候才出发回调函数，这里大家需要明确一点：

```
每次在body上点击其实都会触发事件，但是只目标为p元素的情况下才会触发回调的处理函数。通过源码不难发现on方法实质只完成一些参数调整的工作，而实际负责事件绑定的是其内部 jQuery.event.add方法
```

看看绑定的实际接口on的代码：

```
on: function(types, selector, data, fn, /*INTERNAL*/ one) {
  //省略部分代码
  return this.each(function() {
    jQuery.event.add(this, types, fn, data, selector);
  });
｝
```

 jQuery.event.add内部实际上最终还是通过addEventListener绑定的事件

![img](http://img.mukewang.com/547d990e000103ab06510098.jpg)

（单击图片可放大）

其中一些变量代码的意思：

1. elem: 目标元素
2. type: 事件类型,如’click’
3. eventHandle: 事件句柄，也就是事件回调处理的内容了
4. false: 冒泡
5. elem: 目标元素type: 事件类型,如’click’eventHandle: 事件句柄，也就是事件回调处理的内容了false: 冒泡

现在我们把之前的案例给套一下看看：

```
var body = document.getElementsByTagName('body')
var eventHandle = function() {
    console.log(this)
}
body.addEventListener('click', eventHandle, false);
```

**如果是我们自己实现的这个代码是有问题的，我们在body上每次都触发了click事件，但是我们并没有委托的p元素的处理，自然也达不到委托的效果。**

**eventHandle源码**

回到内部绑定的事件句柄 eventHandle ，可想而知 eventHandle 不仅仅只是只是充当一个回调函数的角色，而是一个实现了 EventListener 接口的对象。

```
if (!(eventHandle = elemData.handle)) {
    eventHandle = elemData.handle = function(e) {
        return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
            jQuery.event.dispatch.apply(elem, arguments) : undefined;
    };
}

```

可见在 eventHandle 中并没有直接处理回调函数，而是映射到 jQuery.event.dispatch 分派事件处理函数了仅仅只是传入 eventHandle.elem，arguments , 就是 body 元素 与事件对象那么这里有个问题，事件回调的句柄并没有传递过去，后面的代码如何关联？本章的一些地方可能要结合后面的 dispatch 处理才能清理，但是我们还是先看看做了那些处理。

一个简单的流程图：

[![img](http://img.mukewang.com/547d98b9000106a307530410.jpg)](http://img.mukewang.com/547d98b9000106a307530410.jpg)

