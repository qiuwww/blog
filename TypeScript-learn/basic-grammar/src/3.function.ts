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
function fun1(): string {
  return 'run';
}

// 匿名函数
let fun2 = function (): number {
  return 123;
};
console.log(fun2()); /*调用方法*/

// ts中定义方法传参
function getInfo1(name: string, age: number): string {
  return `${name} --- ${age}`;
}
console.log(getInfo1('zhangsan', 20));

let getInfo2 = function (name: string, age: number): string {
  return `${name} --- ${age}`;
};
console.log(getInfo2('zhangsan', 40));

// 没有返回值的方法

function run3(): void {
  console.log('run');
}
run3();

// 3.2、方法可选参数 ? 来配置

// es5里面方法的实参和行参可以不一样，但是ts中必须一样，如果不一样就需要配置可选参数
function getInfo3(name: string, age?: number): string {
  if (age) {
    return `${name} --- ${age}`;
  } else {
    return `${name} --- 年龄保密`;
  }
}
console.log(getInfo3('zhangsan'));
console.log(getInfo3('zhangsan', 123));

// 注意:可选参数必须配置到参数的最后面

// 3.3、默认参数
// es5里面没法设置默认参数，es6和ts中都可以设置默认参数

function getInfo4(name: string, age: number = 20): string {
  if (age) {
    return `${name} --- ${age}`;
  } else {
    return `${name} ---年龄保密`;
  }
}

console.log(getInfo4('张三', 30));
console.log(getInfo4('张四'));

// 3.4、剩余参数 rest参数
// 三点运算符 接受新参传过来的值
// 这里的 result数组 都是数字
function sum(...result: number[]): number {
  let sum = 0;
  for (let i = 0; i < result.length; i++) {
    sum += result[i];
  }
  return sum;
}
console.log(sum(1, 2, 3, 4, 5, 6));

function sum2(a: number, b: number, ...result: number[]): number {
  let sum = a + b;
  for (let i = 0; i < result.length; i++) {
    sum += result[i];
  }
  return sum;
}
console.log(sum2(1, 2, 3, 4, 5, 6));

// 3.5、ts函数重载

// java中方法的重载：重载指的是两个或者两个以上同名函数，但它们的参数不一样，这时会出现函数重载的情况。

// typescript中的重载：通过为同一个函数提供多个函数类型定义来试下多种功能的目的。

// ts为了兼容es5 以及 es6 重载的写法和java中有区别。

// es5中出现同名方法，下面的会 替换 上面的方法

/*
    function css(config){
    }
    function css(config,value){
    }
*/

// ts中的重载，参数说明多次，执行的函数体是同一个，这里的多个函数声明，运行一个函数体
function getInfo5(name: string): string;
function getInfo5(age: number): string;
// 这个地方的参数都是any
function getInfo5(str: any): any {
  if (typeof str === 'string') {
    return '我叫：' + str;
  } else {
    return '我的年龄是' + str;
  }
}

console.log(getInfo5('张三')); // 正确 对应第一个
console.log(getInfo5(20)); // 正确 对应第二个
// console.log(getInfo5(true));    // 错误写法

// 传参数，以下两种
function getInfo6(name: string): string;
function getInfo6(name: string, age: number): string;
// 这个地方的参数都是any
function getInfo6(name: any, age?: any): any {
  // 兼容上边的参数类型
  if (age) {
    return '我叫：' + name + '，我的年龄是' + age;
  } else {
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

setTimeout(() => {
  console.log('run');
}, 1000);

let aa = 11;
let bb = 22;
[aa, bb] = [bb, aa];
console.log([aa, bb]);

// 3.7、对象类型的参数 = 接口

interface params {
  name: string;
  age: number;
}
function getInfo7(param: params): string {
  const { name, age } = param;
  if (age) {
    return `${name} --- ${age}`;
  } else {
    return `${name} ---年龄保密`;
  }
}

// 3.8、函数作为参数的形式，如下是重载的形式

function myCoolFunction(f: (x: number) => void, nums: number[]): void;
function myCoolFunction(f: (x: number) => void, ...nums: number[]): void;

function myCoolFunction() {
  if (arguments.length == 2 && !Array.isArray(arguments[1])) {
    var f = arguments[0];
    var arr = arguments[1];
    // ...
  }
  // ...
}
