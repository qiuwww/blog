


/**
 * 默认参数
 */
function f (x, y = 7, z = 42){ 
    return x + y + z 
} 
f(1) === 50

// 其实还可以简化为箭头函数

 let f = (x, y = 7, z = 42) => x + y + z;
 f(2);

 /**
  * ES5的标准写法
  */

function f (x, y, z) {
    if (y === undefined)
        y = 7;
    if (z === undefined)
        z = 42;
    return x + y + z;
};
f(1) === 50;