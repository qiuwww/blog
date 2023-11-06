# chrome 控制台,调试技巧

## 页面可编辑模式

`document.body.contentEditable=true`

## JS 调试技巧（适用于 Chrome Inspector 和 Firefox）

1. debugger

2. 控制台输出 table，可以直接输出 data

```js
var animals = [
  { animal: 'Horse', name: 'Henry', age: 43 },
  { animal: 'Dog', name: 'Fred', age: 13 },
  { animal: 'Cat', name: 'Frodo', age: 18 },
];
console.table(animals);
```

3. 代码执行时间的问题，这里的执行时间不受影响

用 `console.time()` 和 `console.timeEnd()` 打印中间的代码执行时间（可测试同步代码和异步代码）;

```js
console.time('answer time');
alert('Click to continue');
console.timeLog('answer time');
alert('Do a bunch of other stuff…');
console.timeEnd('answer time');

// 测试异步的时候的时间

console.time('async');
setTimeout(() => {
  console.timeEnd('async');
}, 2000);
```

4. console 的一些别的方法

```js
console.log，console.debug，console.warn，console.info，console.error
```

5. 自定义 log 函数，显示描述、值、颜色。当然这里还可以添加别的一些属性，实用%c 来添加样式

```js
let log = function (desc, msg, color) {
  console.log(`%c ${desc}: `, `color: ${color};font-size: 20px;`, msg);
};
log('desc', 'msg', 'red');
log('desc', '{a:1, b:2}', 'red');
```

6. 在函数后边调用 monitor(funcName);可以监控函数的参数（打印出来）

## 控制台选取 DOM 元素

`$(‘tagName’) 、$(‘.class’) 、$(‘#id’) 和 $(‘.class #id’)` 相当于 `document.querySelector(‘ ‘)`。它返回选择器在 DOM 中匹配到的第一个元素。
你可以使用 `$$(‘tagName’)` 或 `$$(‘.class’)` 构建特殊的选择器来选取 DOM 中所有匹配的元素（注意是两个 \$ 符号）。这会把结果放入一个数组。你可以继续通过下标在数组中获取到特定的某个元素。

`$()`与`$$()`的区别就是，前者选择返回结果中的第一个，后者返回所有。

## 将返回结果打印为表格，也是很有意思的啊

```js
var myArray = [
  { a: 1, b: 2, c: 3 },
  { a: 1, b: 2, c: 3, d: 4 },
  { k: 11, f: 22 },
  { a: 1, b: 2, c: 3 },
];

console.table(myArray);

var data = {
  date: [1, 2, 3],

  value: [4, 5, 6],

  name: 123,

  id: 'dfsdf123',
};

console.table(data);

// 可以用于打印 data，返回结果
```

## 如果你想清空控制台和内存，只需要输入

`clear()`

## 反调试

### 重定义 console.log 方法，来取消开发过程中的打印信息

```js
console.log('HelloWorld');
var fake = function () {};
window['console']['log'] = fake;
console.log("You can't see me!");
```

## 利用一个无限循环的 debugger 指令来避免生产环境代码被人调试执行

```js
setTimeout(function(){while (true) {eval("debugger")
```

## 菜单分类

- Elements - 页面 dom 元素
- Console - 控制台
- Sources - 页面静态资源
- Network - 网络
- Performance - 设备加载性能分析
- Application - 应用信息，PWA/Storage/Cache/Frames
- Security - 安全分析
- Audits - 审计，自动化测试工具

## 呼出快捷指令面板：cmd + shift + p

- 性能监视器： performance monitor
- FPS 实时监控性能： FPS 选择第一项
- 截图单个元素： screen 选择 Capture node screenhot，元素截图

## dom 节点调试，break on

- Subtree modifications: 子节点删除或添加时
- Attributes modifications: 属性修改时
- Node Removal: 节点删除时

## 本地覆盖：Local overrides

使用我们自己的本地资源覆盖网页所使用的资源。

类似的，使用 DevTools 的工作区设置持久化，**将本地的文件夹映射到网络，基本上也就是代理啊，跳出了中间代理请求**，在 chrome 开发者功能里面对 css 样式的修改，都会直接改动本地文件，页面重新加载，使用的资源也是本地资源，达到持久化的效果。

## 扩展：Local overrides 模拟 Mock 数据

对于返回 json 数据的接口，可以利用该功能，简单模拟返回数据。

比如：

api 为: <http://www.xxx.com/api/v1/list>
在根目录下，新建文件 <www.xxx.com/api/v1/list，list> 文件中的内容，与正常接口返回格式相同。

## Store as global variable

**如果在 console 中打印了一堆数据，想对这堆数据做额外的操作，可以将它存储为一个全局变量**。只需要右击它，并选择 “Store as global variable”选项。

## CSS/JS 覆盖率 ✅

Chrome DevTools 中的 Coverage 功能可以帮助我们查看代码的覆盖率。

打开调试面板，用快捷键 shift+command+P （mac）输入 Show Coverage 调出相应面板。

## 将图片复制为数据 URI 🦊

打开方式
选择 Network 面板；
在资源面板中选择 Img，预览状态下进行复制；
右键单击将其复制为数据 URI（已编码为 base 64）；

## Profiles

### 用途

- 可以借助 Profiles 定位出比较耗时的函数
- 查找页面卡顿的原因

### 使用

1. Memory -> profiles -> take snapshot -> summary

2. console.profile(name)和 console.profileEnd(name)

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
