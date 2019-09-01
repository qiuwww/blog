
## getComputedStyle方法

```
let style = window.getComputedStyle(element, [pseudoElt]);
element: 用于获取计算样式的Element。
pseudoElt 可选: 指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。
```
返回的样式是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身,返回的属性只读。

## CSSStyleDelaration对象

> 表示一个CSS属性键值对的集合。
返回该对象的方式：
- HTMLElement.style - 用于操作单个元素的样式(<elem style="...">)；
- 由window.getComputedStyle()返回的只读接口。

### 属性

- cssText;返回的文本内容；
- length；属性的数量；
- parentRule；

### 方法

- getPropertyPriority()；返回可选的优先级；important？
- getPropertyValue()；返回具体的属性的值；
- item()；获取数组对应的索引的属性名；
下边的操作属性，对于.style可以，对于getComputedStyle获取的不可以设置；与标签的属性操作差不多，setAttribute和getAttribute
- removeProperty()；删除属性操作，返回被删除的属性；
- setProperty()；设置属性值，没有返回值。例如: styleObj.setProperty('color', 'red', 'important')；
- getPropertyCSSValue()；仅支持通过getComputedStyle的方式。
