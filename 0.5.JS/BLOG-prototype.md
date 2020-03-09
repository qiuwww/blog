---
title: prototype
date:
---

每个 JavaScript 构造函数都有一个 prototype 属性，用于设置所有实例对象需要共享的属性和方法。prototype 属性不能列举。JavaScript 仅支持通过 prototype 属性进行继承属性和方法。

```js
function Rectangle(x, y) {
  this._length = x;
  this._breadth = y;
}

Rectangle.prototype.getDimensions = function() {
  return {
    length: this._length,
    breadth: this._breadth,
  };
};

var x = new Rectangle(3, 4);
var y = new Rectangle(4, 3);

console.log(x.getDimensions()); // { length: 3, breadth: 4 }
console.log(y.getDimensions()); // { length: 4, breadth: 3 }
```
