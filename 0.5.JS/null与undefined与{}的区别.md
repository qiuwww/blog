# null与undefined与{}的区别

## 数据类型

js基本数据类型：Undefined、Null、Boolean、Number和String、Symbol
js的复杂数据类型：Object

## typeof的返回结果

typeof操作符返回一个字符串，表示未经计算的操作数的类型。
字符串的值有："string"、"number"、"boolean"、"object"(null和object)、"undefined"、"function"、"symbol"

## null与undefined

值 null 特指对象的值**未设置**。它是 JavaScript 基本类型 之一。

全局属性undefined表示原始值undefined。它是一个JavaScript的 原始数据类型 。

一个没有被赋值的变量的类型是undefined。如果方法或者是语句中操作的**变量没有被赋值，则会返回undefined**

**undefined是全局对象的一个属性**。也就是说，它是全局作用域的一个变量。undefined的最初值就是原始数据类型undefined。

值 null 是一个字面量，它不像undefined 是全局对象的一个属性。**null 是表示缺少的标识**，指示变量**未指向任何对象**。

把 null 作为尚未创建的对象，也许更好理解。在 APIs 中，null 常在返回类型是对象，但没关联值的地方使用。

## null与{}

在声明对象的时候

var a = {} 与 var a = null有什么区别？

家徒四壁和无家可归的区别？

{}：我是**一个一无所有的对象**
null：这里本该有个对象，但是没有
undefined：这里不该有任何值

{} 是一个空对象， 可以调用Object对象的方法;

null 不可以添加属性值，取值和调用方法将报错；

var a={} // 声明我是一个对象字面量，里面值是空的
var a=null // 只是声明了一个变量a，但是啥类型都没给说明，这个要用它需要后面再赋值， 如果不填就是undefined
var a=''; // 声明一个字符串，但是很明显可以再变成一个别的类型，谁让js是弱类型，这样就会导致性能不好；

开发中用哪种，这个是随你自己，我一般都会在定义的时候初始化赋一个值，至少给它一个类型，告诉它是数字还是string还是object

`var o = Object.create(null); // {}，但是原型并不指向object`
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。也就是新对象继承于给出的对象。
// 我的理解o应该就是空对象，创建一个没有原型的对象。对于for-in属性遍历更加有利。可以不用递归去找原型链上的属性了。

null与{}不是同一个东西，{}是一个对象，null就是一个类型，表示什么也没有.js

要被覆盖的属性可以添加null，如果是要调用扩展属性的方法需要初始化为{}
