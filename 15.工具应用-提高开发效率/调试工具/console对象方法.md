# console 对象

## assert，断言

如果断言为 false，则将一个错误消息写入控制台。如果断言是 true，没有任何反应。

- 控制台输出传入的内容，但是并不会中断代码的执行，
- 而在 Node.js 中一个值为假的断言将会导致一个 AssertionError 被抛出，使得代码执行被打断。

## dir，打印 js 对象完整信息

console.dir()可以显示一个对象所有的属性和方法。

```js
var dog = {};
dog.name = "大毛";
dog.color = "黄色";
dog.bark = function() {
  alert("汪汪汪");
};
console.dir(dog);
```

## dirxml，显示该节点包含的代码

console.dirxml()用来显示网页的某个节点（node）所包含的 html/xml 代码。

## clear()，清空控制台的信息

## trace()，用来追踪函数的调用轨迹。

## group()与 groupEnd()成对出现，对输出进行分组

```js
console.group("第一组信息");
console.log("第一组第一条");
console.log("第一组第二条");
console.groupEnd();
console.group("第二组信息");
console.log("第二组第一条");
console.log("第二组第二条");
console.groupEnd();
```

## time()与 timeEnd()成对出现

## table()，表格打印对象或者数组

## console 的占位符

console 对象的上面 5 种方法，都可以使用 printf 风格的占位符。不过，占位符的种类比较少，只支持字符（%s）、整数（%d 或%i）、浮点数（%f）和对象（%o）四种。

```js
var dog = {};
dog.name = "大毛";
dog.color = "黄色";
console.log("dog: %o", dog);
```

## profile，用于做性能分析，分析运行时间

性能分析（Profiler）就是分析程序各个部分的运行时间，找出瓶颈所在，使用的方法是 console.profile()。

开始记录性能描述信息(例如, Firefox performance tool)。

你可以选择提供一个参数来命名描述信息，这将允许你在有多个描述信息被记录时来选择只停止那个描述信息（被你命名的那个）。请查阅 Console.profileEnd()来确认这个参数是如何被解释的。

要停止记录，请调用 Console.profileEnd()。

此特性在 Web Worker 中可用。

```js
function Foo() {
  for (var i = 0; i < 10; i++) {
    funcA(1000);
  }
  funcB(10000);
}
function funcA(count) {
  for (var i = 0; i < count; i++) {}
}
function funcB(count) {
  for (var i = 0; i < count; i++) {}
}
console.profile("性能分析器一");
Foo();
console.profileEnd();
```

## 打印 dom 节点的属性

```js
console.log(`真实的dom节点: `);
console.dir(document.querySelector("#root .list"));

console.log("%O", document.querySelector("#root .list"));
```
