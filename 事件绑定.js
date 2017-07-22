

// 事件绑定.js

1. $('').click()事件只能绑定静态元素。动态添加的元素上事件将会失效。
2. $(select).on('click',function(){}); 
   $('body').on('click','ul li',function(){}); 
/**
 * 支持动态绑定元素，即页面上元素有添加或变化后仍可绑定,
 * 前提是selector须是目标绑定元素的父元素，如绑定body里的动态li元素：
 */

/**
 * on 与 bind
 */

1. on() 为指定的元素,添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。
使用 on() 方法的事件处理程序适用于当前或未来的元素（比如由脚本创建的新元素）。

$(selector).on(event,childselector,data,function);
on() 方法在  被选元素  及  子元素  上添加一个或多个事件处理程序。
提示：如需移除事件处理程序，请使用 off() 方法。
提示：如需添加只运行一次的事件然后移除，请使用 one() 方法。


2. 相同点：
1.都支持单元素多事件的绑定；空格相隔方式或者大括号替代方式;
2.均是通过事件冒泡方式，将事件传递到document进行事件的响应；


3. 比较和联系:
1、bind()函数只能针对已经存在的元素进行事件的设置；
但是live(),on(),delegate()均支持未来新添加元素的事件设置；演示代码如下:

2、bind()函数在jquery1.7版本以前比较受推崇，1.7版本出来之后，官方已经不推荐用bind()，
替代函数为on(),这也是1.7版本新添加的函数，同样，可以用来代替live()函数，
live()函数在1.9版本已经删除；

3、live()函数和delegate()函数两者类似，但是live()函数在执行速度，灵活性和CSS选择器支持方面较delegate()差些；
4、bind()支持Jquery所有版本；live()支持jquery1.8-；delegate()支持jquery1.4.2+；on()支持jquery1.7+；



总结以后的事件绑定都是用$(select).on('event', function(){})来操作。不操作子元素，这个时候this不好控制。

// 添加与移除事件
$(document).ready(function(){
  $("p").on("click",function(){
    $(this).css("background-color","pink");
  });
  $("button").click(function(){
    $("p").off("click");
  });
});
/**
 * 如果有子节点选项，select上的方法将失效，也就是一个覆盖效果，子节点的事件不会冒泡到父节点上。
 */

$('div').on('click', 'p', function(){})
// 事件只发生在p元素上
/**
 * 注意
 */
// 虽然on方法可以绑定未来的元素，
// 但是直接把事件绑定在p上，未来添加的事件也是不可用的，所以要先委托给已经存在的元素。
$("p").on("click",function(){
	$(this).css("background-color","pink");
});
// 所以对于不存在的元素只能这样：委托给存在的元素
$("body").on("click", 'p', function(){
	$(this).css("background-color","pink");
});

// body上没法绑定scroll事件，这个时间似乎没法冒泡，所以只能绑定到本身的元素上