// scrollIntoView() 方法的作用是滚动当前元素到浏览器窗口的可视区域。

element.scrollIntoView();
element.scrollIntoView(true);
// alignToTop是一个布尔值，true 元素对齐到祖先元素的顶部，false 元素对齐到祖先元素的底部，默认是true
element.scrollIntoView(alignToTop);


element.scrollIntoView(scrollIntoViewOptions);

// scrollIntoViewOptions是一个布尔值或以下选项的对象：

// {
// 	behavior: 'auto' | 'instant' | 'smooth',
// 	block: 'start' | 'end'
// }

// 如果是布尔值，true 等价于 { block: start } ，false 等价于 { block: end }
