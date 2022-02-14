"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log("## section 5 -> 接口");
// 5、typeScript中的接口， 标准与约束
// TypeScript的核心原则之一是 对值所具有的结构进行类型检查 。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 
// 在TypeScript里，接口的作用就是为这些类型命名和 为你的代码或第三方代码定义契约 。
// 5.1 属性类接口
// 5.2 函数类型接口
// 5.3 可索引接口
// 5.4 类类型接口
// 5.5 接口扩展
/*
  接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。
  接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。
  typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

  定义标准。
*/
// 1、属性接口 对json的约束
// ts中定义方法
function printLabel1() {
    console.log('printLabel1');
}
printLabel1();
// ts中定义方法传入参数
function printLabel2(label) {
    console.log('printLabel2', label);
}
printLabel2('hahah');
// ts中自定义方法传入参数,对json进行约束
function printLabel3(labelInfo) {
    console.log('printLabel3', labelInfo);
}
// printLabel3('hahah'); // 错误写法
// printLabel3({ name: '张三' });  // 错误的写法
printLabel3({ label: '张三' }); // 正确的写法
function printName1(name) {
    // 必须传入对象  firstName  secondName
    console.log(name.firstName + '--' + name.secondName);
}
// printName('1213');  //错误
var obj1 = {
    age: 20,
    firstName: '张',
    secondName: '三'
};
printName1(obj1);
function printName2(name) {
    // 必须传入对象  firstName  secondName
    console.log(name.firstName + '--' + name.secondName);
}
function printInfo2(info) {
    // 必须传入对象  firstName  secondName
    console.log(info.firstName + info.secondName);
}
var obj2 = {
    age: 20,
    firstName: '张',
    secondName: '三'
};
printName2(obj2);
// 参数的顺序可以不一样
printInfo2({
    firstName: '李',
    secondName: '四'
});
function getName3(name) {
    console.log(name);
}
getName3({
    secondName: 'secondName'
});
// 你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。
var p1 = { x: 10, y: 20 };
// p1.x = 5; // error!
var a = [1, 2, 3, 4];
var ro = a;
// 原生js封装的ajax 
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('ajax chengong');
            if (config.dataType == 'json') {
                console.log(JSON.parse(xhr.responseText));
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
}
// 调用
ajax({
    type: 'get',
    data: 'name=zhangsan',
    url: 'http://a.itying.com/api/productlist',
    dataType: 'json'
});
// 这里的参数和返回结果已经被约束了，不需要在写类型了 
var md5 = function (key, value) {
    // 模拟操作
    // 不能将类型“(key: string, value: string) => string | 123”分配给类型“encrypt”。
    // return 123;
    return key + value;
};
console.log("md5: ", md5('name', 'zhangsan'));
var sha1 = function (key, value) {
    // 模拟操作
    return key + '----' + value;
};
console.log(sha1('name', 'lisi'));
var arr81 = ['aaa', 'bbb'];
console.log(arr81[0]);
var arr82 = { name: '张三' };
// 类类型接口:对类的约束  和 抽象类抽象有点相似   这里用的比较多 
console.log("### 类类型接口 -> 类的共有属性约束");
// 如下表示类来实现接口的约束，在类中需要实现接口的约束，但是也可以多出来部分内容
// 类“Dog82”错误实现接口“Animal82”。
// Property 'eat' is missing in type 'Dog82' but required in type 'Animal82'.ts(2420)
var Dog82 = /** @class */ (function () {
    function Dog82(name) {
        this.name = name;
    }
    Dog82.prototype.eat = function () {
        console.log(this.name + '吃粮食');
    };
    Dog82.prototype.work = function () {
        console.log(this.name + '在工作');
    };
    return Dog82;
}());
var d82 = new Dog82('小黑');
d82.eat();
d82.work();
/**
 * implements
 * https://ts.xcatliu.com/advanced/class-and-interfaces.html
 * 实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

  举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它。

  也就是按照接口的约束来生成对象。
 */
var Cat82 = /** @class */ (function () {
    function Cat82(name) {
        this.name = name;
    }
    Cat82.prototype.eat = function (food) {
        console.log(this.name + '吃' + food);
    };
    return Cat82;
}());
var c82 = new Cat82('小花');
c82.eat('老鼠');
// 定义的类
var Programmer101 = /** @class */ (function () {
    function Programmer101(name) {
        this.name = name;
    }
    Programmer101.prototype.coding = function (code) {
        console.log(this.name + code);
    };
    Programmer101.prototype.eat = function () {
        console.log(this.name + '喜欢吃馒头');
    };
    return Programmer101;
}());
// 这里继承类（内部的属性和方法就都继承了），实现接口需要在继承的类的基础上进行实现
// 继承类可以得到属性和方法，实现接口也仅仅是给自己添加了属性和方法
// 属性的继承就是通过constructor来实现属性值的copy，方法通过原型链来调用
var Web101 = /** @class */ (function (_super) {
    __extends(Web101, _super);
    function Web101(name) {
        return _super.call(this, name) || this;
    }
    Web101.prototype.work = function () {
        console.log(this.name + '写代码');
    };
    return Web101;
}(Programmer101));
var w101 = new Web101('小李');
console.log("该实例的类继承了别的类，同时又实现了接口w101：", w101);
console.log("该类继承了别的类，同时又实现了接口Web101：", Web101);
w101.eat();
w101.coding('写ts代码');
