"use strict";
var _a;
console.log('## section 3 -> 函数');
// 3.1、函数的定义
// 3.2、可选参数
// 3.3、默认参数w
// 3.4、剩余参数
// 3.5、函数重载
// 3.6、箭头函数  es6
// 3.7、对象类型的参数
// 3.8、函数作为参数的形式
// 3.1、函数的定义
// es5定义函数的方法
/*
 函数声明法
     function run(){
       return 'run';
     }
 匿名函数
     let run2 = function(){
       return 'run2';
     }
*/
// ts中定义函数的方法
// 函数声明法
function fun1() {
    return 'run';
}
// 匿名函数
var fun2 = function () {
    return 123;
};
console.log(fun2()); /*调用方法*/
// ts中定义方法传参
function getInfo1(name, age) {
    return "".concat(name, " --- ").concat(age);
}
console.log(getInfo1('zhangsan', 20));
var getInfo2 = function (name, age) {
    return "".concat(name, " --- ").concat(age);
};
console.log(getInfo2('zhangsan', 40));
// 没有返回值的方法
function run3() {
    console.log('run');
}
run3();
// 3.2、方法可选参数 ? 来配置
// es5里面方法的实参和行参可以不一样，但是ts中必须一样，如果不一样就需要配置可选参数
function getInfo3(name, age) {
    if (age) {
        return "".concat(name, " --- ").concat(age);
    }
    else {
        return "".concat(name, " --- \u5E74\u9F84\u4FDD\u5BC6");
    }
}
console.log(getInfo3('zhangsan'));
console.log(getInfo3('zhangsan', 123));
// 注意:可选参数必须配置到参数的最后面
// 3.3、默认参数
// es5里面没法设置默认参数，es6和ts中都可以设置默认参数
function getInfo4(name, age) {
    if (age === void 0) { age = 20; }
    if (age) {
        return "".concat(name, " --- ").concat(age);
    }
    else {
        return "".concat(name, " ---\u5E74\u9F84\u4FDD\u5BC6");
    }
}
console.log(getInfo4('张三', 30));
console.log(getInfo4('张四'));
// 3.4、剩余参数 rest参数
// 三点运算符 接受新参传过来的值
// 这里的 result数组 都是数字
function sum() {
    var result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        result[_i] = arguments[_i];
    }
    var sum = 0;
    for (var i = 0; i < result.length; i++) {
        sum += result[i];
    }
    return sum;
}
console.log(sum(1, 2, 3, 4, 5, 6));
function sum2(a, b) {
    var result = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        result[_i - 2] = arguments[_i];
    }
    var sum = a + b;
    for (var i = 0; i < result.length; i++) {
        sum += result[i];
    }
    return sum;
}
console.log(sum2(1, 2, 3, 4, 5, 6));
// 这个地方的参数都是any
function getInfo5(str) {
    if (typeof str === 'string') {
        return '我叫：' + str;
    }
    else {
        return '我的年龄是' + str;
    }
}
console.log(getInfo5('张三')); // 正确 对应第一个
console.log(getInfo5(20)); // 正确 对应第二个
// 这个地方的参数都是any
function getInfo6(name, age) {
    // 兼容上边的参数类型
    if (age) {
        return '我叫：' + name + '，我的年龄是' + age;
    }
    else {
        return '我叫：' + name;
    }
}
console.log(getInfo6('zhangsan')); /*正确*/
// console.log(getInfo(123));  错误
console.log(getInfo6('zhangsan', 20));
// 3.6、箭头函数 es6
// this指向的问题 箭头函数里面的this指向上下文
setTimeout(function () {
    console.log('run');
}, 1000);
setTimeout(function () {
    console.log('run');
}, 1000);
var aa = 11;
var bb = 22;
_a = [bb, aa], aa = _a[0], bb = _a[1];
console.log([aa, bb]);
function getInfo7(param) {
    var name = param.name, age = param.age;
    if (age) {
        return "".concat(name, " --- ").concat(age);
    }
    else {
        return "".concat(name, " ---\u5E74\u9F84\u4FDD\u5BC6");
    }
}
function myCoolFunction() {
    if (arguments.length == 2 && !Array.isArray(arguments[1])) {
        var f = arguments[0];
        var arr = arguments[1];
        // ...
    }
    // ...
}
