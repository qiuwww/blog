console.log('## section 5 -> 接口');

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

// 对批量方法传入参数进行约束。

// 1.1、接口：行为和动作的规范，对批量方法进行约束

// 就是传入对象的约束 属性接口
interface FullName1 {
  firstName: string; // 注意;结束
  secondName: string;
  // 函数类型的约束，可选属性
  onPressEnter?: (value: string) => void;
}

function printName1(name: FullName1) {
  // 必须传入对象  firstName  secondName
  console.log(name.firstName + '--' + name.secondName);
}
// printName('1213');  //错误

let obj1 = {
  /*传入的参数必须包含 firstName  secondName*/ age: 20,
  firstName: '张',
  secondName: '三',
};
printName1(obj1);

// 1.2、接口：可选属性
interface FullName3 {
  firstName?: string;
  secondName: string;
}
function getName3(name: FullName3) {
  console.log(name);
}
getName3({
  secondName: 'secondName',
});

// 1.3、只读 readonly
// 一些对象属性只能在对象刚刚创建的时候修改其值。你可以在属性名前用 readonly来指定只读属性:
interface Point {
  readonly x: number;
  readonly y: number;
}
// 你可以通过赋值一个对象字面量来构造一个Point。 赋值后，x和y再也不能被改变了。

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// 可以确保数组创建后再也不能被修改
// 类型“ReadonlyArray<number>”中的索引签名仅允许读取。
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!

// readonly vs const
// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。
// 做为变量使用的话用 const ，若做为属性则使用readonly。

// 1.4、典型应用
interface Config {
  type: string;
  url: string;
  data?: string;
  dataType: string;
}

// 原生js封装的ajax
function ajax(config: Config): void {
  // 这里的参数类型必须如下
  let xhr = new XMLHttpRequest();
  xhr.open(config.type, config.url, true);
  xhr.send(config.data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log('ajax chengong');
      if (config.dataType == 'json') {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(xhr.responseText);
      }
    }
  };
}

// 调用
ajax({
  type: 'get',
  data: 'name=zhangsan',
  url: 'http://a.itying.com/api/productlist', // api
  dataType: 'json',
});

// 2、函数类型接口：对传入的参数 及 返回值进行约束

// 加密的函数类型接口， 执行并返回规定的类型
// 直接约束输入和输出
interface encrypt {
  // 键值对类型，同时约束入参及return的结果
  (key: string, value: string): string;
}

// 这里的参数和返回结果已经被约束了，不需要在写类型了
let md5: encrypt = function (key, value) {
  // 模拟操作
  // 不能将类型“(key: string, value: string) => string | 123”分配给类型“encrypt”。
  // return 123;
  return key + value;
};
console.log('md5: ', md5('name', 'zhangsan'));

let sha1: encrypt = function (key, value) {
  // 模拟操作
  return key + '----' + value;
};
console.log(sha1('name', 'lisi'));

// 3、可索引接口：数组、对象的约束（不常用），约束key和value

// ts定义数组的方式
/*
    let arr:number[]=[2342, 235325]
    let arr1:Array<string>=['111', '222']
*/

// 可索引接口 对数组的约束，如下约束index是number，同时值value是string，这样说来对象与数组是十分类似的
interface UserArr {
  [index: number]: string;
}
let arr81: UserArr = ['aaa', 'bbb'];
console.log(arr81[0]);

// 可索引接口 对对象的约束
interface UserObj {
  [index: string]: string;
}
let arr82: UserObj = { name: '张三' };

// 4、类类型接口:对类的约束  和 抽象类抽象有点相似   这里用的比较多
// 类类型接口是需要类去实现的。
console.log('### 类类型接口 -> 类的共有属性约束');
// 这里会同时约束类的属性和方法，保证了类的标准
interface Animal82 {
  name: string;
  eat(str: string): void;
}
// 如下表示类来实现接口的约束，在类中需要实现接口的约束，但是也可以多出来部分内容
// 类“Dog82”错误实现接口“Animal82”。
// Property 'eat' is missing in type 'Dog82' but required in type 'Animal82'.ts(2420)
class Dog82 implements Animal82 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  // 也可以不完全实现？
  eat() {
    console.log(this.name + '吃粮食');
  }
  work(): void {
    console.log(this.name + '在工作');
  }
}

let d82 = new Dog82('小黑');
d82.eat();
d82.work();

/**
 * implements
 * https://ts.xcatliu.com/advanced/class-and-interfaces.html
 * 实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

  举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它。

  也就是按照接口的约束来生成对象。
 */

class Cat82 implements Animal82 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(food: string) {
    console.log(this.name + '吃' + food);
  }
}
let c82 = new Cat82('小花');
c82.eat('老鼠');

// 5、接口的扩展，同样使用 extends
interface Animal101 {
  eat(): void;
}
// 这样Person101就有了两个约束
interface Person101 extends Animal101 {
  work(): void;
}

// 定义的类
class Programmer101 {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  coding(code: string) {
    console.log(this.name + code);
  }
  eat() {
    console.log(this.name + '喜欢吃馒头');
  }
}

// 这里继承类（内部的属性和方法就都继承了），实现接口需要在继承的类的基础上进行实现
// 继承类可以得到属性和方法，实现接口也仅仅是给自己添加了属性和方法
// 属性的继承就是通过constructor来实现属性值的copy，方法通过原型链来调用
class Web101 extends Programmer101 implements Person101 {
  constructor(name: string) {
    super(name);
  }
  work() {
    console.log(this.name + '写代码');
  }
}

var w101 = new Web101('小李');
console.log('该实例的类继承了别的类，同时又实现了接口w101：', w101);
console.log('该类继承了别的类，同时又实现了接口Web101：', Web101);

w101.eat();
w101.coding('写ts代码');
