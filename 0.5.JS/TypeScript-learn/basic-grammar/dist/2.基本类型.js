"use strict";
console.log('## section 2 -> 基本数据类型');
/* typeScript中的基本数据类型
  typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，在typescript中主要给我们提供了以下数据类型:

    布尔类型（boolean）
    数字类型（number）
    字符串类型(string)
    数组类型（array）
    元组类型（tuple）

    枚举类型（enum）
    任意类型（any）
    null 和 undefined
    void类型
    never类型

  写ts代码必须指定类型。
*/
/**
 * 各种类型的标准写法
 */
// 1. 布尔类型（boolean）
var flag = true;
// 2. 数字类型（number）
var num = 123;
// 3. string 字符串类型
var str = 'this is ts';
// 再赋值为number类型的就会提示错误
// str  = 123;
// 4. Array 数组类型
// ts中定义数组的三种类型
// 1. 第一种定义数组的方式，第一种，可以在元素类型后面接上 []，表示由`此类型元素组成的一个数组`
var arr11 = [11, 22, 33];
console.log('arr11: ', arr11);
// 2. 第二种定义数组的方式，数组泛型  Array<元素类型>， 这里的<>是断言，断定Array的类型都是number
var arr12 = [11, 22, 33];
console.log('arr12: ', arr12);
// 3. 第三种，元组一
var arr13 = ['131214', 22, true];
console.log('arr13: ', arr13);
// 3.2 元组的第二种形式
var arr14 = ['131214', 22, true];
console.log('arr14: ', arr14);
// 3.3 元组的不同类型元素声明
var arr2 = [123, 'this is ts'];
arr2 = [123, 'dsfds'];
// 5. Enum 枚举类型
/*
  枚举类型（enum）
    随着计算机的不断普及，程序不仅只用于数值计算，还更广泛地用于处理非数值的数据。
    例如：性别、月份、星期几、颜色、单位名、学历、职业等，都不是数值数据。
    在其它程序设计语言中，一般用一个数值来代表某一状态，这种处理方法不直观，易读性差。
    如果能在程序中用自然语言中有相应含义的单词来代表某一状态，则程序就很容易阅读和理解。
    也就是说，事先考虑到某一变量可能取的值，尽量用自然语言中含义清楚的单词来表示它的每一个值，这种方法称为枚举方法，用这种方法定义的类型称枚举类型。

      enum 枚举名{
          标识符[=整型常数],
          标识符[=整型常数],
          ...
          标识符[=整型常数],
      };

    使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举。
*/
// 标识符与值 success = 1
// 定一个一个枚举类型Flag1
var Flag1;
(function (Flag1) {
    Flag1[Flag1["success"] = 1] = "success";
    Flag1[Flag1["error"] = 2] = "error";
})(Flag1 || (Flag1 = {}));
var enum1 = Flag1.success;
// 这里打印的是对应的值
console.log('enum1: ', enum1);
var Flag2;
(function (Flag2) {
    Flag2[Flag2["success"] = 1] = "success";
    Flag2[Flag2["error"] = 2] = "error";
})(Flag2 || (Flag2 = {}));
var enum2 = Flag2.error;
console.log('enum2: ', enum2);
var Color;
(function (Color) {
    Color[Color["blue"] = 0] = "blue";
    Color[Color["red"] = 1] = "red";
    Color[Color["orange"] = 2] = "orange";
})(Color || (Color = {}));
var c = Color.red;
console.log("Color: ", c); // 1  如果标识符没有赋值 它的值就是下标
var Err;
(function (Err) {
    Err[Err["undefined"] = -1] = "undefined";
    Err[Err["null"] = -2] = "null";
    Err[Err["success"] = 1] = "success";
})(Err || (Err = {}));
var e = Err.success;
console.log('Err: ', e);
// 6. Any 任意类型（any）
// desc：有时候，我们会想要为那些在编程阶段还 不清楚类型的变量 指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。
// 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量
// 与原来的js不指定类型一样
// 这里不指定会提示
var dom = document.querySelector('div');
dom.style.color = 'red';
// 7. null 和 undefined
// 如下指定为undefined，或者接受number， 就是限定了any范围，一个元素可以指定多个类型。
// 默认情况下null和undefined是 所有类型 的子类型。就是说你可以把 null和undefined赋值给number类型的变量。
var num2;
var num3;
// 8. void类型: typescript中的void表示没有任何类型，一般用于定义方法的时候方法没有返回值。
// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
// 没有任何类型，一般用于定于方法，并且没有返回值
function run1() {
    console.log('run方法没有返回任何类型');
}
run1();
// 返回一个数值型的
function run2() {
    return 123;
}
run2();
// 9. never类型: 是其他类型 （包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明never的变量只能被never类型所赋值。
// never类型表示的是那些永不存在的值的类型。返回never的函数必须存在无法达到的终点。典型的抛出错误， 无限循环。
var nev;
// 这个时候不会提示错误，但是会打印错误
// nev = (() => { throw new Error('never') })()
// 10. object
// Object object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
// 定义了一个方法create，接受一个参数o，类型是object或者null，函数最终没有返回值
function create(o) { }
console.log('create: ', create);
create({ prop: 0 }); // OK
create(null); // OK
// create(42); // Error
// create("string"); // Error
// 11. 断言 <>
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。
// 用于函数参数
// 类型断言有两种形式。
// 其一是“尖括号”语法：
var someValue110 = 'this is a string';
var strLength110 = someValue110.length;
// 另一个为as语法：
var someValue111 = 'this is a string';
var strLength111 = someValue111.length;
// 断言处理数组定义的时候，放在前面
var arr122 = [11, 22, 33];
