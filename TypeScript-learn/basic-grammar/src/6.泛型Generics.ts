console.log('## section 6 -> 泛型');

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

function getData131(value: any): any {
  return '哈哈哈';
}

getData131(123);
getData131('str');

// any放弃了类型检查, 传入什么 返回什么。比如: 传入number 类型必须返回number类型  传入 string类型必须返回string类型

// 传入的参数类型和返回的参数类型可以不一致
function getData132(value: any): any {
  return '哈哈哈';
}

// 泛型：可以支持不特定的数据类型
// 要求：传入的参数和返回的参数一直

// T表示泛型，具体什么类型是调用这个方法的时候决定的
// T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。
// 这里使用断言来判断的，这里就相当于都设置了any
function getData133<T>(value: T): T {
  return value;
}
getData133<number>(123);
getData133<string>('1214231');
getData133('123');

// getData<number>('2112'); /*错误的写法*/

function getData134<T>(value: T): any {
  return '2145214214';
}

getData134<number>(123); // 参数必须是number
getData134<string>('这是一个泛型');

console.log('### 泛型类');

// 泛型类：比如有个最小堆算法，需要同时支持返回数字和字符串 a-z 两种类型。通过类的泛型来实现

// 普通类
class MinClass {
  public list: number[] = [];
  add(num: number) {
    this.list.push(num);
  }
  min(): number {
    let minNum = this.list[0];
    for (let i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}
// 求最小值的操作
let m = new MinClass();
m.add(3);
m.add(22);
m.add(23);
m.add(6);
m.add(7);
console.log(m.min());

// 类的泛型，所有位置的T表示的类型相同
class MinClass2<T> {
  // 这里的参数类型是范型，得到的min也是同一个类型的
  public list: T[] = [];
  add(value: T): void {
    this.list.push(value);
  }
  min(): T {
    let minNum = this.list[0];
    for (let i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}

let m1 = new MinClass2<number>(); /*实例化类 并且制定了类的T代表的类型是number*/
m1.add(11);
m1.add(3);
m1.add(2);
// m1.add('222'); // 错误的写法，只能同是number类型的
console.log(m1.min());

let m2 = new MinClass2<string>(); /*实例化类 并且制定了类的T代表的类型是string*/

m2.add('c');
m2.add('a');
m2.add('v');
console.log(m2.min());

/**
 * 如下常用范型举例
 */

// 1. 函数的输入输出类型控制
function getDate<T>(value: T): T {
  return value;
}
getDate<number>(123);
getDate<string>('123');

// 2. 类的泛型
class minclass<T> {
  list: T[] = [];
  add(value: T): void {
    this.list.push(value);
  }
  min(): T {
    return this.list[0];
  }
}
var minMy = new minclass<number>();
var minMy2 = new minclass<string>();

// 3. 函数类泛型接口
interface ConFn {
  <T>(value1: T, value2: T): T;
}

var myFn: ConFn = function <T>(value: T): T {
  return value;
};

// 4. 类作为参数来约束传入数据的合法性
class Artic {
  title: string | undefined;
  desc: string | undefined;
  status: number | undefined;
  constructor(params: {
    title: string | undefined;
    desc: string | undefined;
    status?: number | undefined;
  }) {}
}
class MySQLdb<T> {
  add(info: T): boolean {
    return true;
  }
}
var obj = new Artic({
  desc: '123',
  status: 123,
  title: '123',
});
var b = new MySQLdb<Artic>();
b.add(obj);
