# Partial<IpropValue>

[TypeScript 高级类型-Partial](https://blog.csdn.net/roamingcode/article/details/104111165)

```ts
type Partial<T> = { [P in keyof T]?: T[P] };

// 假设我们有一个定义 user 的接口，如下
interface IUser {
  name: string;
  age: number;
  department: string;
}

// 经过 Partial 类型转化后得到

type optional = Partial<IUser>;

// optional的结果如下
type optional = {
  name?: string | undefined;
  age?: number | undefined;
  department?: string | undefined;
};

/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

映射类型 - 从旧类型中创建新类型
它的语法与索引签名的语法类型，内部使用了 for .. in。 具有三个部分：

1. 类型变量 K，它会依次绑定到每个属性。
2. 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
3. 属性的结果类型。

[ts 五个高级类型](https://blog.csdn.net/weixin_30278237/article/details/98291588?utm_medium=distribute.pc_relevant.none-task-blog-title-2&spm=1001.2101.3001.4242)
