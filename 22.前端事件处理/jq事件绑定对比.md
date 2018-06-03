

1、bind()
语法：$(selector).bind(event,data,function);

定义和用法: bind() 方法为被选元素添加一个或多个事件处理程序，并规定事件发生时运行的函数。

替代语法: $(selector).bind({event:function, event:function, ...})

当点击鼠标时，隐藏或显示 p 元素：
$("button").bind("click",function(){
  $("p").slideToggle();
});
需要注意的是：bind()方法绑定事件需要元素存在，如果后来动态添加的事件，就不会被绑定事件。

适用所有版本，但是根据官网解释，自从jquery1.7版本以后bind()函数推荐用on()来代替。

2、on()

定义和用法: on() 方法在被选元素及子元素上添加一个或多个事件处理程序。

自 jQuery 版本 1.7 起，on() 方法是 bind()、live() 和 delegate() 方法的新的替代品。该方法给 API 带来很多便利，我们推荐使用该方法，它简化了 jQuery 代码库。

注意：使用 on() 方法添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）。

提示：如需移除事件处理程序，请使用 off() 方法。

提示：如需添加只运行一次的事件然后移除，请使用 one() 方法。

语法: $(selector).on(event,childSelector,data,function,map)

实例
向 <p> 元素添加 click 事件处理程序：
$("p").on("click",function(){
alert("The paragraph was clicked.");
});
最推荐使用on()方法，它可以通过语法变换来实现其他方法的功能。

jquery1.7及其以上版本；jquery1.7版本出现之后用于替代bind()，live()绑定事件方式；

同一个元素绑定多个事件的实例：

$("p").on({
  mouseover:function(){$("body").css("background-color","lightgray");}, 
  mouseout:function(){$("body").css("background-color","lightblue");}, 
  click:function(){$("body").css("background-color","yellow");}  
});
3、delegate() 
定义和用法：delegate() 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。

使用 delegate() 方法的事件处理程序适用于当前或未来的元素（比如由脚本创建的新元素）。

语法：$(selector).delegate(childSelector,event,data,function)

当点击鼠标时，隐藏或显示 p 元素：
$("div").delegate("button","click",function(){
  $("p").slideToggle();
});
jquery1.4.2及其以上版本；

4、live()
定义和用法: live() 方法为被选元素附加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。

通过 live() 方法附加的事件处理程序适用于匹配选择器的当前及未来的元素（比如由脚本创建的新元素）。

语法: $(selector).live(event,data,function)

当点击按钮时，隐藏或显示 p 元素：
$("button").live("click",function(){
  $("p").slideToggle();
});
jquery1.9版本以下支持，jquery1.9及其以上版本删除了此方法，jquery1.9以上版本用on()方法来代替。 

5、四种方法的异同
相同点：

　　1.都支持单元素多事件的绑定；空格相隔方式或者大括号替代方式;

　　2.均是通过事件冒泡方式，将事件传递到document进行事件的响应；

比较和联系:

　　1.bind()函数只能针对已经存在的元素进行事件的设置；但是live(),on(),delegate()均支持未来新添加元素的事件设置；

　　2.bind()函数在jquery1.7版本以前比较受推崇，1.7版本出来之后，官方已经不推荐用bind()，替代函数为on(),这也是1.7版本新添加的函数，同样，可以用来代替live()函数，live()函数在1.9版本已经删除；

　　3.live()函数和delegate()函数两者类似，但是live()函数在执行速度，灵活性和CSS选择器支持方面较delegate()差些；

　　4.bind()支持Jquery所有版本；live()支持jquery1.8-；delegate()支持jquery1.4.2+；on()支持jquery1.7+；

总结：

　　如果项目中引用jquery版本为低版本，推荐用delegate(),高版本jquery可以使用on()来代替。