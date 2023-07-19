# console 对象

## assert，断言

如果断言为 false，则将一个错误消息写入控制台。如果断言是 true，没有任何反应。

- 控制台输出传入的内容，但是并不会中断代码的执行，
- 而在 Node.js 中一个值为假的断言将会导致一个 AssertionError 被抛出，使得代码执行被打断。

## dir，打印 js 对象完整信息

console.dir()可以显示一个对象所有的属性和方法。

```js
var dog = {};
dog.name = '大毛';
dog.color = '黄色';
dog.bark = function () {
  alert('汪汪汪');
};
console.dir(dog);
```

## dirxml，显示该节点包含的代码

`console.dirxml()`用来显示网页的某个节点（node）所包含的 html/xml 代码。

## clear()，清空控制台的信息

## trace()，用来追踪函数的调用轨迹

`console.trace(window.onload)`

## group()与 groupEnd()成对出现，对输出进行分组

```js
console.group('第一组信息');
console.log('第一组第一条');
console.log('第一组第二条');
console.groupEnd();
console.group('第二组信息');
console.log('第二组第一条');
console.log('第二组第二条');
console.groupEnd();
```

## time()与 timeEnd()成对出现

## table()，表格打印对象或者数组

## console 的占位符

console 对象的上面 5 种方法，都可以使用 printf 风格的占位符。不过，占位符的种类比较少，只支持字符（%s）、整数（%d 或%i）、浮点数（%f）和对象（%o）四种。

```js
var dog = {};
dog.name = '大毛';
dog.color = '黄色';
console.log('dog: %o', dog);
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
console.profile('性能分析器一');
Foo();
console.profileEnd();
```

## 打印 dom 节点的属性

```js
console.log(`真实的dom节点: `);
console.dir(document.querySelector('#root .list'));
console.log('%O', document.querySelector('#root .list'));
```

## 打印一个 logo 在控制台

```js
// logo.js
console.log(/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
*/);

// 佛曰:
// 写字楼里写字间，写字间里程序员；
// 程序人员写程序，又拿程序换酒钱。
// 酒醒只在网上坐，酒醉还来网下眠；
// 酒醉酒醒日复日，网上网下年复年。
// 但愿老死电脑间，不愿鞠躬老板前；
// 奔驰宝马贵者趣，公交自行程序员。
// 别人笑我忒疯癫，我笑自己命太贱；
// 不见满街漂亮妹，哪个归得程序员？

console.log(
  '%c梦魇小栈，欢迎您',
  ' text-shadow: 0 0 5px #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em',
);

console.log(
  '\n %c 梦魇|专注于分享 QQ:1058221214 %c http://www.dode.top \n\n',
  'color: #FF0000; background: #4bffba; padding:5px 0; border-radius: 5px 5px 5px 5px;',
  'background: #fadfa3; padding:5px 0; border-radius: 5px 5px 5px 5px;',
);

console.log('%c一颗红心向太阳,吼吼~', 'text-shadow: 3px 1px 1px grey');
console.info('%c楼上药不能停！', 'text-shadow: 3px 1px 1px grey');
console.warn('%c楼上嘴太贱！', 'text-shadow: 3px 1px 1px grey');
console.error('%c楼上关你毛事？', 'text-shadow: 3px 1px 1px grey');
console.log('%c都不要说啦！', 'text-shadow: 3px 1px 1px grey');
console.warn('%c楼主，你的购物车该结账了！', 'text-shadow: 3px 1px 1px grey');
var data = [
  { 品名: '杜雷斯', 数量: 4, 价格: 99.0 },
  { 品名: '冈本', 数量: 3, 价格: 99.0 },
];
console.table(data);
console.info('嘚瑟嘚瑟！哈哈，钱不够不准向我借，最讨厌借钱的人了，哼哼！！');
console.log(
  '%c女朋友就是私有变量，只有我这个类才能调用！',
  'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:2em;',
);
console.log('程序员A：哎 太累了日子没法过了 怎么才能换行啊');
console.log('程序员B：打回车呀！');
console.log(
  '%c愿世界和平，永无BUG！',
  'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:2em;',
);
```
