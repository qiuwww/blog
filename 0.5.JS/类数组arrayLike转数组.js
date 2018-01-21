


let convert = (arrayLike) => {

}

1. 
var arr = Array.prototype.slice.call(arguments);
//等同于
var arr = [].slice.call(arguments)

2. 
var arr = Array.from(arguments);

3.
var args = [...arguments];

4. jquery的方法

$.makeArray()