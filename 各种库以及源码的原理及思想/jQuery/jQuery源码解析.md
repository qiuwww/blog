


# jQuery源码解析

## 注意点
1. jQuery2.0及后续版本将不再支持IE6/7/8浏览器。



## jquery的主要内容
1. 核心方法
2. 回调系统
3. 异步队列
4. 数据缓存
5. 队列操作
6. 选择器引
7. 属性操作
8. 节点遍历
9. 文档处理
10. 样式操作
11. 属性操作
12. 事件体系
13. AJAX交互
14. 动画引擎

## 一种自执行函数的写法
```
(function(window, factory) {
    factory(window)
}(this, function() {
    return function() {
       //jQuery的调用
    }
}))
```

## ready与load
```
要想理解为什么ready先执行，load后执行就要先了解下DOM文档加载的步骤：

(1) 解析HTML结构。
(2) 加载外部脚本和样式表文件。
(3) 解析并执行脚本代码。
(4) 构造HTML DOM模型。//ready
(5) 加载图片等外部文件。
(6) 页面加载完毕。//load

从上面的描述中大家应该已经理解了吧，ready在第（4）步完成之后就执行了，
但是load要在第（6）步完成之后才执行。
```
## .end()方法
**用于解决，查询子元素后的返回**
```
<ul class="first">
   <li class="foo">list item 1</li>
   <li>list item 2</li>
   <li class="bar">list item 3</li>
</ul>
<ul class="second">
   <li class="foo">list item 1</li>
   <li>list item 2</li>
   <li class="bar">list item 3</li>
</ul>

$('ul.first')
    .find('.foo').css('background-color', 'red')
    .end()
    .find('.bar').css('background-color', 'green');

这条命令链检索第一个列表中类名为 foo 的项目，并把它们的背景设置为红色。
end() 会将对象还原为调用 find() 之前的状态，所以第二个 find() 查找的是
<ul class="first"> 内的 '.bar' ，而不是在列表的 <li class="foo"> 中查找，
并将匹配元素的背景设置为绿色。
最后的结果是第一个列表中的项目 1 和项目 3 被设置了带颜色的背景，
而第二个列表中的项目没有任何变化。

```
### 源码如下:
```
end: function() {
     return this.prevObject || this.constructor(null);
 }
```

# 插件接口的设计 $.entend()与$.fn.extend()

1. $.entend(),对外提供的扩展方法；

2. $.fn.extend(),用于扩展当前的$对象的方法，扩展之后，所有实例可用；

3. ☑  jQuery.extend调用的时候上下文指向的是jQuery构造器;

4. ☑  jQuery.fn.extend调用的时候上下文指向的是jQuery构造器的实例对象了;

5. jQuery.fn 和jQuery.prototype指向同一对象，扩展fn就是扩展jQuery.prototype原型对象。

这里增加的是原型方法，也就是对象方法了。

6. jq源码内部也是使用jQuery.fn.extend来扩展静态方法，使用jQuery.extend来扩展私有方法。

## 源码如下：

```
jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	// 只有一个参数，就是对jQuery自身的扩展处理
    if ( length === i ) {
        // 调用的上下文对象jQuery/或者实例
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
        // 从i开始取参数,不为空开始遍历
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

```

因为extend的核心功能就是通过扩展收集功能（类似于mix混入），
所以就会存在收集对象（target）与被收集的数据，因为jQuery.extend并没有明确实参，
而且是通过arguments来判断的，所以这样处理起来很灵活。
arguments通过判断传递参数的数量可以实现函数重载。
其中最重要的一段 **target = this**，通过调用的方式我们就能确实当前的this的指向，
所以这时候就能确定target了。
最后就很简单了，通过for循环遍历把数据附加到这个target上了。
当然在这个附加的过程中我们还可以做数据过滤、深拷贝等一系列的操作了。

## 四种上下文调用方式

在javascript的世界中一共有四种上下文调用方式：
方法调用模式、函数调用模式、构造器调用模式、apply调用模式。

1. 方法调用模式： 类似于foo.bar()，函数作为一个对象的方法出现，this指向foo。
2. 函数调用模式：类似于bar(),函数单独出现，this指向window。
3. 构造器调用模式：类似于 var foo = new bar()，this指向new bar()返回的对象。
4. apply调用：类似于bar.apply(object)，this指向object

## addBack() || addSelf(),用于把自己添加到当前的集合中;

**jQuery.fn.andSelf = jQuery.fn.addBack;别称||别名**
这个方法是1.8版本添加，用来替代andSelf()。用来把自己添加到选择器中。
例如:
```
<ul>  
    <li>list item 1</li> 
    <li>list item 2</li>  
    <li class="third-item">list item 3</li> 
    <li>list item 4</li>  
    <li>list item 5</li>
</ul>
$( "li.third-item" )
	.nextAll()
	.addBack()  
	.css("background-color", "red" );
```
如果不加addBack()的话，就是4和5变红，如果加上addBack()的话就是包括他自己3也会变红。

## get与eq的区别
```
.eq()  减少匹配元素的集合，根据index索引值，精确指定索引对象。
.get() 通过检索匹配jQuery对象得到对应的DOM元素。
```
**本质区别：**

eq返回的是一个jQuery对象，get返回的是一个DOM对象。

