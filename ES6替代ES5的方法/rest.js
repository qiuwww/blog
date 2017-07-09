

/**
 * rest 获取函数的多余参数，这样就不需要使用arguments对象了。
 * rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
 * 在开发中确实很方便。
 */
function f (x, y, ...a) { 
    return (x + y) * a.length 
} 
f(1, 2, "hello", true, 7) === 9


/**
 * ES5写法
 */

function f (x, y) {
    var a = Array.prototype.slice.call(arguments, 2);
    return (x + y) * a.length;
};
f(1, 2, "hello", true, 7) === 9;