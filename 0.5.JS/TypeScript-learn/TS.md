# TS

## TS 的优缺点

1. 优点：
   1. 代码的可读性和可维护性；
   2. 在编译阶段就发现大部分错误，避免了很多线上 bug；
   3. 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等；
2. 缺点：
   1. 学习、开发成本都挺高；
   2. 一些 JavaScript 库需要兼容，提供声明文件，像 vue2，底层对 ts 的兼容就不是很好；
   3. ts 编译是需要时间的，这就意味着项目大了以后，开发环境启动和生产环境打包的速度就成了考验；
   4. Deno 内部停用 TS；
3. 听到过的开发体验最好的架构：React Hooks + TypeScript；

## 基础知识

1. 基础类型：
   1. 常用：boolean、number、string、array、enum、any、void
   2. 不常用：tuple、null、undefined、never
2. 联合| or 交叉&类型：
   1. 联合类型：某个变量可能是多个 interface 中的其中一个，用 | 分割；
   2. 交叉类型：由多个类型组成，用 & 连接；
3. 泛型 T（Type）：
   1. 泛指的类型，不确定的类型，可以理解为一个占位符（使用 T 只是习惯，使用任何字母都行）；
4. 断言：
   1. 断言用来手动指定一个值的类型。值 as 类型 or <类型>值；
   2. 注意在 tsx 语法中必须使用前者，即 值 as 类型。
5. typeof：
   1. typeof 操作符可以用来获取一个变量或对象的类型；
6. keyof:
   1. keyof 与 Object.keys 略有相似，只不过 keyof 取 interface 的键；
7. Utility Types： 可以理解为基于 ts 封装的工具类型;
   1. Partial<T>: 将 T 中所有属性转换为可选属性。返回的类型可以是 T 的任意子集`type Partial<T> = { [P in keyof T]?: T[P]; };`；
   2. Required<T>：通过将 T 的所有属性设置为必选属性来构造一个新的类型。与 Partial 相反；
   3. Readonly<T>：将 T 中所有属性设置为只读；
   4. Record<K,T>：K 对应对应的 key，T 对应对象的 value，返回的就是一个声明好的对象；
   5. Pick<T,K>：在一个声明好的对象中，挑选一部分出来组成一个新的声明对象；
   6. Omit<T,K>：从 T 中取出除去 K 的其他所有属性。与 Pick 相对。

```ts
// T 自定义名称
function myFun<T>(params: T[]) {
  return params;
}
myFun<string>(['123', '456']);

// 定义多个泛型，这里是多个范型
function join<T, P>(first: T, second: P) {
  return `${first}${second}`;
}
join<number, string>(1, '2');
```

```ts
interface Hero {
  name: string;
  skill: string;
}

const zed: Hero = { name: '影流之主', skill: '影子' };
type LOL = typeof zed; // type LOL = Hero
```

```ts
interface Point {
  x: number;
  y: number;
}

// type keys = "x" | "y"
type keys = keyof Point;
// 用 keyof 可以更好的定义数据类型
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}
```

## 常见问题

### 你知道 any 和 unknown 的区别吗

在实际场景中, 很少看到有人在 Typescript 中使用 unknown , 使用 unknown 可以保证类型安全，使用 any 则彻底放弃了类型检查 , **在很多情况下, 我们可以使用 unknow 来替代 any , 既灵活, 又可以继续保证类型安全**。

any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) ,**这导致 any 基本上就是放弃了任何类型检查**。

### interface 和 type

简单理解 interface 和 type 的区别：type 更强大，interface 可以进行声明合并，type 不行；

看个人习惯，一般声明都用 interface，需要用到其他变量类型，type 多一些（同时可能是这个 type 或者另一个 type 的这种）。有没有 interface 或 type 一把梭的。
