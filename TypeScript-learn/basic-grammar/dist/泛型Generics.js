"use strict";
console.log("## section 6 -> 泛型");
// 6、typeScript中的泛型
// 泛型（Generics）是允许同一个函数接受不同类型参数的一种模板。
// 6.1 泛型的定义
// 6.2 泛型函数
// 6.3 泛型类
// 6.4 泛型接口
/*
  泛型：软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑 可重用性。

  组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

  在像 C# 和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

  通俗理解：泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持(类型校验)
*/
// 只能返回string类型的数据
// function getData(value:string):string{
//   return value;
// }
// 同时返回 string类型 和number类型  any可以解决这个问题
function getData131(value) {
    return '哈哈哈';
}
getData131(123);
getData131('str');
// any放弃了类型检查, 传入什么 返回什么。比如:传入number 类型必须返回number类型  传入 string类型必须返回string类型
// 传入的参数类型和返回的参数类型可以不一致
function getData132(value) {
    return '哈哈哈';
}
// 泛型：可以支持不特定的数据类型   
// 要求：传入的参数和返回的参数一直
// T表示泛型，具体什么类型是调用这个方法的时候决定的
// T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。
// 这里使用断言来判断的，这里就相当于都设置了any
function getData133(value) {
    return value;
}
getData133(123);
getData133('1214231');
getData133('123');
// getData<number>('2112'); /*错误的写法*/  
function getData134(value) {
    return '2145214214';
}
getData134(123); // 参数必须是number
getData134('这是一个泛型');
console.log("### 泛型类");
// 泛型类：比如有个最小堆算法，需要同时支持返回数字和字符串 a-z 两种类型。通过类的泛型来实现
// 普通类
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.list = [];
    }
    MinClass.prototype.add = function (num) {
        this.list.push(num);
    };
    MinClass.prototype.min = function () {
        var minNum = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            if (minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum;
    };
    return MinClass;
}());
// 求最小值的操作
var m = new MinClass();
m.add(3);
m.add(22);
m.add(23);
m.add(6);
m.add(7);
console.log(m.min());
// 类的泛型
var MinClass2 = /** @class */ (function () {
    function MinClass2() {
        // 这里的参数类型是范型，得到的min也是同一个类型的
        this.list = [];
    }
    MinClass2.prototype.add = function (value) {
        this.list.push(value);
    };
    MinClass2.prototype.min = function () {
        var minNum = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            if (minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum;
    };
    return MinClass2;
}());
var m1 = new MinClass2(); /*实例化类 并且制定了类的T代表的类型是number*/
m1.add(11);
m1.add(3);
m1.add(2);
// m1.add('222'); // 错误的写法，只能同是number类型的
console.log(m1.min());
var m2 = new MinClass2(); /*实例化类 并且制定了类的T代表的类型是string*/
m2.add('c');
m2.add('a');
m2.add('v');
console.log(m2.min());
// 这里没有约束
var getData2 = function (value) {
    return value;
};
getData2('张三');
getData2(1243); //错误
function getData3(value) {
    return value;
}
// 这里限定T是string
var myGetData3 = getData3;
myGetData3('20'); /*正确*/
// myGetData(20)  //错误
