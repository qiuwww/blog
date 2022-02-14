---
title: TS.NOTE
date: 2019-6-9
tags:
  - JS
  - TypeScript
categories:
  - TypeScript
---

[TOC]

## JavaScript 和 TypeScript 的概要介绍

### JavaScript

JavaScript 是一种**轻量级的解释性脚本语言**，可嵌入到 HTML 页面中，**在浏览器端执行**，能够实现浏览器端丰富的交互功能，为用户带来流畅多样的用户体验。

JavaScript 是**基于对象和事件驱动的**，无需特定的语言环境，只需在支持的浏览器上就能运行。

#### JavaScript 语言具有以下特点

1. JavaScript 是一种脚本编写语言，**无需编译(ES6+也需要编译)**，只要嵌入 HTML 代码中，就能由浏览器逐行加载解释执行。
2. JavaScript 是一种基于对象的语言，可以创建对象同时使用现有对象。**但是 Javascript 并不支持其它面向对象语言所具有的继承和重载功能。**
3. JavaScript 的语法简单，使用的变量为**弱类型**。
4. JavaScript 语言较为安全，仅在浏览器端执行，**不会访问本地硬盘数据**。
5. JavaScript 语言具有**动态性**。JavaScript 是事件驱动的，**只根据用户的操作做出相应的反应处理**。
6. JavaScript 只依赖于浏览器，**与操作系统的因素无关**。**因此 JavaScript 是一种跨平台的语言**。
7. JavaScript 兼容性较好，能够与其他技术（如 XML，REST API 等）一起使用。

### TypeScript

1. TypeScript 是 Microsoft 开发和维护的一种**面向对象的编程语言**。**它是 JavaScript 的超集**，包含了 JavaScript 的所有元素，**可以载入 JavaScript 代码运行，并扩展了 JavaScript 的语法。**
2. TypeScript 具有以下特点：
   - TypeScript 是 Microsoft 推出的开源语言，**使用 Apache 授权协议**；
   - TypeScript 增加了**静态类型、类、模块、接口和类型注解**；
   - TypeScript 可用于开发大型的应用；
   - TypeScript 易学易于理解；

## JavaScript 和 TypeScript 的主要差异

TypeScript 可以使用 JavaScript 中的**所有代码和编码概念**，TypeScript 是为了使 JavaScript 的开发变得更加容易而创建的。例如，TypeScript 使用**类型和接口**等概念来描述正在使用的数据，这使开发人员能够快速检测错误并调试应用程序

- TypeScript 从核心语言方面和类概念的模塑方面**对 JavaScript 对象模型进行扩展**。
- JavaScript 代码可以在无需任何修改的情况下与 TypeScript 一同工作，同时可以使用编译器将 TypeScript 代码转换为 JavaScript。
- TypeScript 通过**类型注解提供编译时的静态类型检查**。
- TypeScript 中的**数据要求带有明确的类型**，JavaScript 不要求。
- TypeScript 为函数**提供了缺省参数值**。
- TypeScript 引入了 JavaScript 中没有的“**类**”概念。
- TypeScript 中引入了**模块**的概念，可以把声明、数据、函数和类封装在模块中。

## TypeScript 的优势

下面列举 TypeScript 相比于 JavaScript 的**显著优势**：

1. 静态输入

**静态类型化**是一种功能，可以在开发人员编写脚本时**检测错误**。查找并修复错误是当今开发团队的迫切需求。有了这项功能，**就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。**

2. 大型的开发项目

有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。**使用 TypeScript 工具来进行重构更变的容易、快捷**。

3. 更好的协作

当发开大型项目时，会有许多开发人员，此时乱码和错误的机也会增加。**类型安全**是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。**这为开发团队创建了一个更高效的编码和调试过程**。

4. 更强的生产力

干净的 ECMAScript 6 代码，自动完成和动态输入等因素有助于提高开发人员的工作效率。这些功能也有助于编译器创建优化的代码。

## JavaScript 的优势

相比于 TypeScript，JavaScript 也有一些明显优势。

1. 人气

JavaScript 的开发者社区仍然是巨大而活跃的，在社区中可以很方便地找到大量成熟的开发项目和可用资源。

2. 学习曲线

由于 JavaScript 语言发展的较早，也较为成熟，所以仍有一大批开发人员坚持使用他们熟悉的脚本语言 JavaScript，而不是学习 TypeScript。

3. 本地浏览器支持

TypeScript 代码需要被编译（输出 JavaScript 代码），这是 TypeScript 代码执行时的一个额外的步骤。

4. 不需要注释

为了充分利用 TypeScript 特性，开发人员需要不断注释他们的代码，这可能会使项目效率降低。

5. 灵活性

有些开发人员更喜欢 JavaScript 的灵活性。

## 如何抉择

TypeScript 正在成为开发**大型编码项目**的有力工具。因为其面向对象编程语言的结构保持了代码的清洁、一致和简单的调试。因此在应对大型开发项目时，使用 TypeScript 更加合适。
如果有一个相对较小的编码项目，似乎没有必要使用 TypeScript，只需使用灵活的 JavaScript 即可。

## TypeScript 基础语法

[官方文档]<https://www.tslang.cn/docs/handbook/basic-types.html>

### 类型声明

使用`: type`的形式来声明变量的类型。

举例

```ts
let isDone: boolean = false;

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

let name: string = 'bob';

// 数组
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

// 元组
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error

x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型

let list: any[] = [1, true, 'free'];
list[1] = 100;
// 枚举

enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;

enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];
console.log(colorName); // 显示'Green'因为上面代码里它的值是2

// Any
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean

// void
function warnUser(): void {
  console.log('This is my warning message');
}

// Null 和 Undefined
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

// Never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error('Something failed');
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}

// Object
// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create('string'); // Error
create(false); // Error
create(undefined); // Error
```

#### 类型推断

```ts
// 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
let myFavoriteNumber = 'seven';
// 等价于
let myFavoriteNumber: string = 'seven';
```

#### 联合类型

```ts
// 联合类型（Union Types）表示取值可以为多种类型中的一种。
// 当你允许某个变量被赋值多种类型的时候,使用联合类型,管道符进行连接
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

#### 自定义类型，类型别名

```ts
// 使用 type 创建类型别名,类型别名常用于联合类型
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
```

### 断言

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。

> `<类型>值` 或者 `值 as 类型`，两种形式。

类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。
类型断言有两种形式。

```ts
// 其一是“尖括号”语法：
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;

// 另一个为as语法：
let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length;
```

### 对象的类型——接口，接口，定义约定的规则，描述要求的参数结构类型

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。**它有时被称做“鸭式辨型法”或“结构性子类型化”**。
在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

```ts
interface IUserInfo {
  age: any; //定义一个任何变量的 age.
  userName: string; //定义一个 username.
}
function getUserInfo(user: IUserInfo): string {
  return user.age + '======' + user.userName;
}

//➖➖➖➖➖➖➖➖➖只读属性➖➖➖➖➖➖➖➖➖
interface Person {
  readonly id: number; // 只读
  name: string;
  age?: number;
  [propName: string]: any;
}
let tom: Person = {
  id: 89757, // 只读
  name: 'Tom',
  gender: 'male',
};

//➖➖➖➖➖➖➖➖➖接口定义函数的形状➖➖➖➖➖➖➖➖➖
// 函数也是引用类型，整个定义函数的参数及返回值
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source, subString) {
  return source.search(subString) !== -1;
};
```

### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly 来指定只读属性:

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
// 赋值后， x和y再也不能被改变了。
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

TypeScript 具有`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法去掉了。

### 类

```ts
//➖➖➖➖➖➖➖➖➖类➖➖➖➖➖➖➖➖➖
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}
let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack

//➖➖➖➖➖➖➖➖➖继承➖➖➖➖➖➖➖➖➖
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}
let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom

//➖➖➖➖➖➖➖➖➖存储器➖➖➖➖➖➖➖➖➖
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
    this.name = value;
  }
}
let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack

//➖➖➖➖➖➖➖➖➖静态方法➖➖➖➖➖➖➖➖➖
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}
let a = new Animal('Jack');
Animal.isAnimal(a); // true
// 只能通过类名调用
a.isAnimal(a); // TypeError: a.isAnimal is not a function

//➖➖➖➖➖➖➖➖➖抽象类➖➖➖➖➖➖➖➖➖
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('roaming the earch...');
  }
}
// 子类必须实现抽象类的抽象方法
class Cat extends Animal {
  constructor(name) {
    console.log(this.name);
  }
  makeSound() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}
```

#### public private 和 protected

- public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的

- private 修饰的属性或方法是私有的，不能在声明它的类的外部访问

- protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

#### 类类型

```ts
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number) {}
}
```

### 范型

范型函数、范型类。

前后一致原则。

```ts
// 定义一个函数，接受一个数值型参数，返回一个数值型参数
function identity(arg: number): number {
  return arg;
}
function identity<T>(arg: T): T {
  return arg;
}

// T表示泛型，具体什么类型是调用这个方法的时候决定的
// 表示参数是什么类型就返回什么类型~~~
function getData<T>(value: T): T {
  return value;
}
getData<number>(123);
getData<string>('1214231');
```

我们给 identity 添加了类型变量 T。 T 帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T 当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。

### 枚举

对象声明的一种结构

### 类型推论

类型推论。即，类型是在哪里如何被推断的。

### Symbols

除了用户定义的 symbols，还有一些已经众所周知的内置 symbols。 内置 symbols 用来表示语言内部的行为。

### 接口

接口通常会根据一个对象是否符合某种特定结构来进行类型检查。通过定义一个接口我们可以命名一个特殊的组合变量，确保它们会一直一起运行。当转译成 JavaScript 时，接口会消失 – 它们唯一的目的是在开发阶段里起到辅助的作用。

### 模块

模块是自声明的；

两个模块之间的关系是通过在文件级别上使用`imports`和`exports`建立的。

模块使用模块加载器去导入其它的模块。在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。

TypeScript 与 ECMAScript 2015 一样，任何包含顶级`import`或者`export`的文件都被当成一个模块。相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。

接口与类的继承，`implements`。

### implements

[参考文档]<https://ts.xcatliu.com/advanced/class-and-interfaces.html>
共性的内容提取的集合。
实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，**有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces**），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

### jsx

JSX 是一种嵌入式的类似**XML**的语法。 它可以被转换成合法的 JavaScript，尽管转换的语义是依据不同的实现而定的。
JSX 因 React 框架而流行，但是也被其它应用所使用。 TypeScript 支持内嵌，类型检查和将 JSX 直接编译为 JavaScript。

### 装饰器

装饰器是一种**特殊类型的声明**，它能够被附加到类声明，方法， 访问符，属性或参数上。
装饰器使用 `@expression` 这种形式，expression 求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参。

具体参考如下，感觉还是很有用的：
[装饰器](https://www.tslang.cn/docs/handbook/decorators.html)

### 三斜线指令

三斜线指令是包含单个 XML 标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线指令仅可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

```js
/// <reference path="..." />
/// <reference path="..." /> 指令是三斜线指令中最常见的一种。 它用于声明文件间的 依赖。
```

三斜线引用告诉编译器在编译过程中要引入的额外的文件。

### 高级类型，混入（mixins）

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

常用在 react 组件的声明，props 与 state。

```ts
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}

class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(): void;
}
// 类实现接口
class ConsoleLogger implements Loggable {
  log() {
    // ...
  }
}
var jim = extend(new Person('Jim'), new ConsoleLogger());
var n = jim.name;
jim.log();
```

### 模块，import & export & export default

```ts
export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
```

#### 使用其它的 JavaScript 库

在 Node.js 里大部分工作是通过加载一个或多个模块实现的。 我们可以使用顶级的 export 声明来为每个模块都定义一个.d.ts 文件，但最好还是写在一个大的.d.ts 文件里。 我们使用与构造一个外部命名空间相似的方法，但是这里使用 module 关键字并且把名字用引号括起来，方便之后 import。

```ts
declare module 'path' {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export let sep: string;
}
// Some do it the other way around.
declare module 'json!*' {
  const value: any;
  export default value;
}
```

### 命名空间

```ts
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// Some samples to try
let strings = ['Hello', '98052', '101'];

// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${validators[name].isAcceptable(s) ? 'matches' : 'does not match'} ${name}`,
    );
  }
}
```

### 模块解析

## tsconfig.json 的配置

设置`"module": "es2015"`可以编译为浏览器直接可以运行的代码。

### 你还可以配置如下的选项来帮助查找 BUG

- noImplicitReturns 会防止你忘记在函数末尾返回值。
- noFallthroughCasesInSwitch 会防止在 switch 代码块里的两个 case 之间忘记添加 break 语句。
- TypeScript 还能发现那些执行不到的代码和标签，你可以通过设置 allowUnreachableCode 和 allowUnusedLabels 选项来禁用。

#### moduleResolution

模块解析是编译器用来**确定输入是指什么**的过程。

[参考文章](https://cloud.tencent.com/developer/section/1476115)

分为相对导入与非相对导入。

**相对导入**是相对于导入文件解析的，无法解析为环境模块声明。您应该为您自己的模块使用相对导入，这些导入保证在运行时保持其相对位置。

**非相对导入**可以通过 baseUrl 路径映射来解析。

## 常用关键字，类型声明，符号

### |

就表示常见的或。联合。

### type

类型别名

### interface

接口声明，对于 json 对象类型的参数，需要用到接口声明。也就是虚拟类 => 实例(json 对象)。

接口可以继承，通过 extends。

### declare module

### 常用基本类型

- string
- number
- boolean
- any
- object

### T

范性

### public

### any，Object，和{}

你可能会试图使用 Object 或{}来**表示一个值可以具有任意属性**，因为 Object 是最通用的类型。 然而在这种情况下**any 是真正想要使用的类型**，因为它是最灵活的类型。

#### any

越普通意味着更少的利用类型，但是 any 比较特殊，它是最普通的类型但是允许你在上面做任何事情。 也就是说你可以在上面调用，构造它，访问它的属性等等。 记住，当你使用 any 时，你会**失去大多数 TypeScript 提供的错误检查和编译器支持**。

你可以使用 noImplicitAny 选项，让 TypeScript 标记出发生这种情况的地方，并给出一个错误。

#### Object 与{}

如果你还是决定使用 Object 和{}，你应该选择{}。 虽说它们基本一样，但是从技术角度上来讲 {}在一些深奥的情况里比 Object 更普通。

### 严格的 null 与 undefined 检查

默认地，TypeScript 把 null 和 undefined 当做属于任何类型。 **这就是说，声明为 number 类型的值可以为 null 和 undefined。** 因为在 JavaScript 和 TypeScript 里， null 和 undefined 经常会导致 BUG 的产生，所以 TypeScript 包含了 **strictNullChecks** 选项来帮助我们减少对这种情况的担忧。

## 从 js 转到 ts

- 第一步，将 .js 文件重命名为.ts 文件。 如果你使用了 JSX，则重命名为 .tsx 文件。
- 去除错误。
- 由模块导入。
- 获取声明文件。

### 构建工具

ts-loader

### 常见问题

#### error TS2307: Cannot find module 'moduleA'

如果你开始做转换到 TypeScript 导入，你可能会遇到 Cannot find module 'foo'.这样的错误。 问题出在**没有声明文件来描述你的代码库**。

如果 TypeScript 报怨像是没有 **lodash** 包，那你只需这样做

`npm install -s @types/lodash`。

如果你**没有使用 commonjs 模块**模块选项，那么就需要将[moduleResolution 选项](https://cloud.tencent.com/developer/section/1476115)设置为 node。

### this 没有隐式的 any

## React & Webpack

```tsx
// 无状态组件实例

import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
  </h1>
);

// class组件实例

import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <h1>
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    );
  }
}
```
