

克隆节点，然后修改，接着替换原有的节点，可以最少的触发重排

克隆节点的方法：

1. 原生js

var clonedNode = sourceNode.cloneNode(true); // 克隆节点 
var clonedNode = sourceNode.cloneNode(false); // 克隆节点，浅复制，不复制事件 ，只克隆了结构，事件丢失

2. jq克隆

$text.clone(false);// 浅复制，不复制事件 ，只克隆了结构，事件丢失
$text.clone(true);// 深复制

但是要注意事件的绑定问题，最好使用on方法将事件绑定到父元素上，改变元素也不影响事件的触发。

clone方法比较简单就是克隆节点，但是需要注意，如果节点有事件或者数据之类的其他处理，我们需要通过clone(ture)传递一个布尔值ture用来指定，

这样不仅仅只是克隆单纯的节点结构，还要把附带的事件与数据给一并克隆了。