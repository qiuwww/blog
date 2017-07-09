

/**
 * 箭头函数需要关注有参数和无参数的情况；
 * 单个的return与多条语句操作的情况；
 * 最主要的是关注this的指向问题
 */

let odds = evens.map(v => v + 1);

odds([1,2,3,5]);


/**
 * this的问题
 */
普通函数中的this:

// 1. this总是代表它的直接调用者, 例如 obj.func ,那么func中的this就是obj;
// 2. 在默认情况(非严格模式下,未使用 'use strict'),没找到直接调用者,则this指的是 window;
// 3. 在严格模式下,没有直接调用者的函数中的this是 undefined;
// 4. 使用call,apply,bind(ES5新增)绑定的,this指的是 绑定的对象;


箭头函数的this指向，应该是指向定义所处的对象