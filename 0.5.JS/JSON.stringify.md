---
title: JSON.stringify
---

## 用途

1. 对象属性修改：序列化 + replace；

## 使用的时候注意点

1. 对于 undefined、任意的函数以及 symbol 三个特殊的值分别作为对象属性的值、数组元素、单独的值时 JSON.stringify()将返回不同的结果。
   1. undefined、任意的函数以及 symbol **作为对象属性值时** JSON.stringify() 将跳过（忽略）对它们进行序列化；
   2. undefined、任意的函数以及 symbol **作为数组元素值时**，JSON.stringify() 会将它们序列化为 null；
   3. undefined、任意的函数以及 symbol 被 JSON.stringify() **作为单独的值进行序列化时**都会返回 undefined。

```js
const data = {
  a: 'aaa',
  b: undefined,
  c: Symbol('dd'),
  fn: function () {
    return true;
  },
};
JSON.stringify(data); // 输出：？
// "{"a":"aaa"}"

JSON.stringify([
  'aaa',
  undefined,
  function aa() {
    return true;
  },
  Symbol('dd'),
]); // 输出：？

// "["aaa",null,null,null]"

JSON.stringify(function a() {
  console.log('a');
});
// undefined
JSON.stringify(undefined);
// undefined
JSON.stringify(Symbol('dd'));
// undefined
```

2. **非数组对象的属性**不能保证以特定的顺序出现在序列化后的字符串中。
3. 转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值

```js
JSON.stringify({
  say: 'hello JSON.stringify',
  toJSON: function () {
    return 'today i learn';
  },
});
// "today i learn"
```

4. JSON.stringify() 将会正常序列化 Date 的值，**实际上 Date 对象自己部署了 toJSON() 方法（同 Date.toISOString()）**，因此 Date 对象会被当做字符串处理。
5. NaN 和 Infinity 格式的数值及 null 都会被当做 null。
6. 布尔值、数字、字符串的包装对象在序列化过程中会**自动转换成对应的原始值**。
7. 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，**仅会序列化可枚举的属性**。
8. JSON.parse(JSON.stringify())，这个方式实现深拷贝会因为序列化的诸多特性从而导致诸多的坑点：比如循环引用问题。
   1. 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
9. 以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。

## 参数之二 replace

## 参数之三 space

## 参考文档

1. [你不知道的 JSON.stringify() 的威力](https://juejin.cn/post/6844904016212672519)
