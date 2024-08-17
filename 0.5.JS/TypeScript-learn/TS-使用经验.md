# TS-使用经验

TS for RN

## type.d.ts

[【TypeScript】类型定义文件(\*.d.ts)](https://blog.csdn.net/u013451157/article/details/79896290)

类型定义文件的以 .d.ts 结尾，里面主要用来**定义类型**。

### TS 中的 export declare interface 和 export interface 到底有什么不同

1. declare interface Global，全局类型声明，全局可使用；
2. export interface，局部声明，使用的时候，需要主动引入。

### declare module，声明文件或模块的语法格式，在被引入的时候可以被找到

就是说，虽然 TypeScript 本身不支持**导入非 JavaScript 内容**，但是为了支持其他工具接下来的工作，所以做了这么个语法支持。

```ts
// 如下声明是个什么意思？
declare global {
  interface Global {
    realm: Realm
  }
}
// 这里是声明合并，与interface的声明合并类似
// You can also add declarations to the global scope from inside a module
// 在如下的声明基础上添加类型声明
declare interface Global {
  HermesInternal: any
}

declare const global: Global
```

## type 和 interface

1. interface 和 type(或者说 class) 很像。
2. type 的含义是**定义自定义类型**，**当 TS 提供给你的基础类型都不满足的时候，可以使用 type 自由组合出你的新类型**。
3. 而 interface 应该是对外输出的接口。

### type，使用 type 用来定义类型变量，一般用于基础类型不能实现的情况，或者组合基础类型

```ts
// 基本类型
type UserName = string
// 对象
type User = {
  name: string
  age: number
  website: WebSite
}
// 方法
type say = (age: number) => string

// 定义可以是string与number的类型

type Type = string | number
```

### interface，定义接口，可以被继承

```ts
interface BaseApplication {
  appId: number
}

// 属性会被合并，合并接口
interface BaseApplication {
  age: number
}

// 属性被挤成
export interface Application extends BaseApplication {
  init(): void
  get(key: string): object
}
```

## declare，declare 可以创建 \*.d.ts 文件中的变量，declare 只能作用域最外层

```ts
// 定义 jQuery 需要用到的类型命名空间
declare namespace JQuery {
  // 定义基本使用的类型
  type Selector = string
  type TypeOrArray<T> = T | T[]
  type htmlString = string
}

// 对模块 jquery 输出接口
declare module 'jquery' {
  // module 中要使用 export = 而不是 export default
  export = jQuery
}
```

## namespace

为防止类型重复，使用 namespace **用于划分区域块**，**分离重复的类型**，顶层的 namespace 需要 declare 输出到外部环境，子命名空间不需要 declare。

## 动态属性

```ts
interface ChinaMobile {
  name: string
  website: string
}

interface ChinaMobileList {
  // 动态属性
  [phone: string]: ChinaMobile
}

// 定义如下的类型
// {
//     '10086': {
//         name: '中国移动',
//         website: 'http://www.10086.cn',
//     },
//     '10010': {
//         name: '中国联通',
//         website: 'http://www.10010.com',
//     },
//     '10000': {
//         name: '中国电信',
//         website: 'http://www.189.cn'
//     }
// }
```

## 类型遍历，in ｜ keyof

当你已知某个类型范围的时候，可以使用 in 和 keyof 来遍历类型，这里相对于上边，又更进了一层。

```ts
type ChinaMobilePhones = '10086' | '10010' | '10000'

interface ChinaMobile {
  name: string
  website: string
}

// 只能 type 使用， interface 无法使用
type ChinaMobileList = {
  // 遍历属性
  [phone in ChinaMobilePhones]: ChinaMobile
}

// keyof
export type keys = {
  name: string
  appId: number
  config: object
}

class Application {
  // 参数和值约束范围，这里的T就标识了name/appId/object
  // 设置参数的时候，需要key和val，两个参数，参数的类型与范型的取值要对应
  set<T extends keyof keys>(key: T, val: keys[T])
  // 获取对象的属性的时候，需要传入key，返回的类型是keys[T]
  get<T extends keyof keys>(key: T): keys[T]
}
```

### keyof，索引类型（Index types）

[官方文档](https://www.tslang.cn/docs/handbook/advanced-types.html)

TypeScript 允许我们遍历某种类型的属性，并通过 keyof 操作符提取其属性的名称。

```ts
// function pluck(o, names) {
//   return names.map(n => o[n]);
// }
// T，K，变量代指参数
// keyof Person是完全可以与 'name' | 'age'互相替换的。
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

interface Person {
  name: string
  age: number
}
let person: Person = {
  name: 'Jarid',
  age: 35,
}
let strings: string[] = pluck(person, ['name']) // ok, string[]
```

```ts
interface Person {
  name: string
  age: number
  location: string
}

type K1 = keyof Person // "name" | "age" | "location"
type K2 = keyof Person[] // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person } // string | number
```

## 范型 T

可以使用泛型来**创建可重用的组件**，**一个组件可以支持多种类型的数据**。
