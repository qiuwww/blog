// jquery常用接口操作.js


// closest() : 匹配最近的一个父元素 ；
// 这个该方法可以接受一个或多个样式类名称作为他的参数。
// 在第一个版本中，如果在匹配的元素集合中的每个元素上存在该样式类就会被移除；
// 如果某个元素没有这个样式类就会加上这个样式类。

$( document ).bind("click", function( e ) {
    $( e.target ).closest("li").toggleClass("hilight");
  });
