---
title: JS 模块化
date: 2019-6-6
tag:
  - JS
  - 模块化
categories:
  - [JS]
  - [模块化]
---

[TOC]

## 模块化的演变

amd/cmd/umd/commonjs/ES6 module。

JavaScript 在设计时定位原因，**没有提供类似的功能**，开发者需要模拟出类似的功能，**来隔离、组织复杂的 JavaScript 代码，我们称为模块化**。

模块就是**实现特定功能的一组方法**。

## what，什么是模块化

1. 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起。
2. **块的内部数据与实现是私有的**, 只是向外部暴露一些接口(方法)与外部其它模块通信。

## why，为什么需要模块化

1. 避免**命名冲突**(减少命名空间污染)
2. 更好的**分离**, 按需加载
3. 更高**复用**性
4. 高**可维护**性
5. 浏览器端，加载 JavaScript 最佳、最容易的方式是在 document 中插入 script  标签。**但脚本标签天生异步**，传统 CommonJS 模块在浏览器环境中无法正常加载，需要对模块代码作静态分析，将模块与它的依赖列表一起返回给浏览器端。

## how，模块化的进程

1. 全局 function 模式：将不同的功能封装成不同的全局函数
2. namespace 模式：简单对象封装
3. IIFE 模式：匿名函数**自调用(闭包)**
4. IIFE 模式增强 : 引入依赖。 amd|cmd -> commonjs -> ESM

## JS 模块化发展

### 1.原始写法

只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

```js
function m1() {
  //...
}
function m2() {
  //...
}
```

上面的函数 m1()和 m2()，组成一个模块。使用的时候，直接调用就行了。
这种做法的缺点很明显：**”污染”了全局变量**，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

### 2.对象写法，将所有的方法属性写在一个对象内部

```js
var module1 = new Object({
  _count: 0,
  m1: function () {
    //...
  },
  m2: function () {
    //...
  },
});
```

这样的写法会**暴露所有模块成员，**对象的引用被外部拿到，**内部状态可以被外部改写**。

### 3.立即执行函数写法，闭包

使用”立即执行函数”（Immediately-Invoked Function Expression，IIFE），可以达到**不暴露私有成员的目的**。

```js
var module = (function () {
  var _count = 0;
  var m1 = function () {
    alert(_count);
  };
  var m2 = function () {
    alert(_count + 1);
  };

  return {
    m1: m1,
    m2: m2,
  };
})();
```

使用上面的写法，外部代码无法读取内部的\_count 变量。
console.info(module.\_count); //undefined

**module 就是 Javascript 模块的基本写法**。这样在外部引用这里的变量的时候就不会被修改。引用的是 return 的值。

## require 时代的模块，CommonJS

requirejs 统治了 ES6 之前的所有模块化编程。

node 的 module 遵循 CommonJS 规范，requirejs 遵循 AMD，seajs 遵循 CMD，虽各有不同，但总之还是希望**保持较为统一的代码风格**。

加载模块使用 require 方法，该方法读取一个文件并执行，**返回文件内部的 module.exports 对象**。

```js
// a.js

// -------- node -----------
module.exports = {
  a: function () {},
  b: 'xxx',
};

// ----------- AMD or CMD ----------------
// 这里的mudule是函数给定的参数，并不像node是一个全局的变量
define(function (require, exports, module) {
  module.exports = {
    a: function () {},
    b: 'xxx',
  };
});
```

可以看出，为了保持风格的高度统一，除了在**浏览器端**的模块中要使用一个 define 函数来提供模块的闭包以外，其他代码可以完全一致。

```js
// b.js

// ------------ node ---------
var m = require('./a');
m.a();

// ------------ AMD or CMD -------------
define(function (require, exports, module) {
  var m = require('./a');
  m.a();
});
```

### AMD 与 CMD

#### AMD，先加载，后使用

AMD 是”**Asynchronous** Module Definition”的缩写，意思就是”异步模块定义”。
它采用**异步方式加载模块**，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。主要有两个 Javascript 库实现了 AMD 规范：**require.js** 和 curl.js。

```js
// 模块定义
// 定义引入之后，全部引入
define(id?, dependencies?, factory)
// id:字符串，模块名称(可选)
// dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。,注意是数组格式
// factory: 工厂方法，返回一个模块函数

// AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：
// 模块引用
require([module], callback);
```

##### requireJS 的核心原理（流程）

简单流程概括

1. 我们在使用 requireJS 时，都会把**所有的 js** 交给 requireJS 来管理，也就是我们的页面上只引入一个 require.js，把 data-main 指向我们的 main.js。
2. 通过我们在 main.js 里面定义的 require 方法或者 define 方法，requireJS 会把这些依赖和回调方法都**用一个数据结构保存起来**。
3. 当页面加载时，requireJS 会根据这些依赖**预先把需要的 js 通过 document.createElement 的方法引入到 dom 中**，这样，被引入 dom 中的 script 便会运行。
4. 由于我们依赖的 js 也是要按照 requireJS 的规范来写的，所以他们也会有 define 或者 require 方法，同样类似第二步这样循环向上查找依赖，同样会把他们存起来。
5. 当我们的 js 里需要用到依赖所返回的结果时(通常是一个 key value 类型的 object),requireJS 便会把之前那个保存回调方法的数据结构里面的方法拿出来并且运行，然后把结果给需要依赖的方法。
6. 以上就是一个简单的流程。

#### CMD，使用的时候加载，就近加载

CMD (Common Module Definition), 是 seajs 推崇的规范，CMD 则是**依赖就近，用的时候再 require。**

它写起来是这样的：

```js
// 模块定义
define(function (require, exports, module) {
  // 这里用到了再require，更清晰一些
  var clock = require('clock');
  clock.start();
});
```

#### CMD 与 AMD 区别

AMD 和 CMD 最大的区别是对依赖模块的**执行时机处理不同**，而不是加载的时机或者方式不同，二者皆为异步加载模块。

AMD **依赖前置**，js 可以方便知道依赖模块是谁，立即加载；

而 CMD **就近依赖**，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病 CMD 的一点，**牺牲性能来带来开发的便利性**，实际上解析模块用的时间短到可以忽略。

### CommonJS 的接口

[模块作用域](http://nodejs.cn/api/modules.html#modules_the_module_scope)

- module，对当前模块的引用, 查看关于 module 对象的章节。 module.exports 用于指定一个模块所导出的内容，即可以通过 require() 访问的内容。
- 这是一个对于 module.exports 的更简短的引用形式。
- require(id)，id `<string>` 模块的名称或路径。
  - require.cache，被引入的模块将被缓存在这个对象中。 从此对象中删除键值对将会导致下一次 require 重新加载被删除的模块。
  - require.resolve(request[, options])，使用内部的 require() 机制查询模块的位置，此操作只返回解析后的文件名，不会加载该模块。

具体参见[nodejs 的官网](http://nodejs.cn/api/modules.html)。

#### require.context， 用于动态引入文件，不属于 CommonJS 的接口

**require.context 是 webpack 编译器支持的一项特殊功能**，使您可以从某个基本目录开始获取所有匹配的模块。

```js
require.context(directory, (useSubdirectories = false), (regExp = /^\.\//));

require.context('../', true, /\.stories\.js$/);
// a context with all files in the parent folder and descending folders ending with `.stories.js`.
```

#### 使用变量来动态引入文件，path+require

import 是不支持的。

1. 配合 path 获取相应的文件及文件夹路径；
2. 动态引入文件；

```js
const filename = '/first-level.js';
const func = require('./dir' + filename); // => Success
```

## ES6 中的 module，ESM

ES6 发布的 module 并没有直接采用 CommonJS，甚至连 require 都没有采用，也就是说 require 仍然只是 node 的一个私有的全局方法，module.exports 也只是 node 私有的一个全局变量属性，跟标准半毛钱关系都没有。

### ES6 模块导出 export

```js
// a.js
export default function () {}
export function a() {}

var b = 'xxx';
export { b }; // 这是ES6的写法，实际上就是{b:b}
setTimeout(() => (b = 'ooo'), 1000);
export var c = 100;
```

在要导出的接口前面，加入 export 指令。
在 export 之后，b 还可以被修改，这和 CommonJS 有着巨大不同，CommonJS 导出之后，后续的使用都是一个**缓存**，除非使用 require.cache，`delete require.cache[PKG_PATH]`。

#### 下面的语法有严重错误

需要导出一个引用变量，导出的必须是一个指向，指向引用类型或者基本类型。

```js
// 错误演示
// 直接导出1没有任何意义，也不可能在import的时候有一个变量与之对应。
export 1; // 绝对不可以，也就是说导出的必须是一个指向，指向引用类型或者基本类型。

var a = 100;
export a; // export a虽然看上去成立，但是a的值是一个数字，根本无法完成解构，因此必须写成export {a}的形式。

var f = () => {};
export f; // 这样是对的
```

export 在导出接口的时候，**必须与模块内部的变量**具有一一对应的关系。

直接可以 export 的必须是引用类型，有指代的变量。

大部分风格都建议，模块中最好在末尾用一个 export 导出所有的接口。`export {fun as default,a,b,c};`

### ES6 的导入模块 import

import 的语法跟 require 不同，而且**import 必须放在文件的最开始，且前面不允许有其他逻辑代码**，区别与 require，这和其他所有编程语言风格一致。

```js
import $ from 'jquery';
import * as _ from '_';
import { a, b, c } from './a';
import { default as alias, a as a_a, b, c } from './a';
```

与 export 后面的变量一一对应。

### as 关键字

简单的说就是**取一个别名**。export 中可以用，import 中其实可以用。

```js
// a.js
var a = function () {};
export { a as fun };

// b.js
import { fun as a } from './a'; // 之所以是这样，是因为有的时候不同的两个模块可能通过相同的接口，比如都导出一个fun。
a();
```

### default 关键字

```js
// d.js
export default function () {}

// 等效于：
function a() {}
export { a as default };

import a from './d'; // 这是一种简写形式

// 等效于，或者说就是下面这种写法的简写，是同一个意思，但是有什么意思
import { default as a } from './d';
```

### \*符号

```js
import * as _ from '_'; // 它表示的是把'_'模块中的所有接口挂载到_这个对象上，所以可以用_.each调用某个接口。
export * from '_';

// 等效于：
import * as all from '_';
export all;
```

\*符号**尽可能少用**，它实际上是使用所有 export 的接口，但是很有可能你的当前模块并不会用到所有接口，可能仅仅是一个，所以最好的建议是使用花括号，用一个加一个。

## 对比 require 与 import

能用 require 的地方不一定可以用 import，比如目前 11 版本的 node。
**能用 import 的地方一定可以用 require。**

require 的使用非常简单，它相当于 module.exports 的传送门，module.exports 后面的内容是什么，require 的结果就是什么，对象、数字、字符串、函数……再把 require 的结果赋值给某个变量，相当于把 require 和 module.exports 进行平行空间的位置重叠。

```js
require('./a')(); // a模块是一个函数，立即执行a模块函数
var data = require('./a').data; // a模块导出的是一个对象
var a = require('./a')[0]; // a模块导出的是一个数组
require(process.cwd() + '/a');
```

### require 的特点

1. **第一次加载解析模块，后续使用的是第一次加载的缓存**，
   1. 基本类型是值，
   2. 引用类型是引用地址，也是可以改变的，也就是在读取的文件中自动修改。
2. **基础类型 num 是复制，object 的值是引用**，**都可修改，但是不会重新读取**。
3. 限制比较少，
   1. 不需要放在头部，
   2. require()，参数也可以是一个变量；
4. 第一次 require 的时候**会缓存结果**，后续都是调用的缓存结果，也就是文件修改了，这里的缓存不变，比如动态修改 package.json；
5. require 是运行时的；
6. 可以在代码的**任意位置**；
7. 可以把它当做一个 **node 内置的全局函数**；
8. 地址可以是一个变量。

### import 的特点

1. **加载的是一个引用**
2. **基本类型加载后当作常量，不可修改**，引用类型是可以修改的。
3. import 则不同，它是**编译时的（require 是运行时的）**
4. 它**必须放在文件开头**;
5. 而且使用格式也是确定的，不容置疑，**from 之后的内容必须是一个常量，不能是变量**。
6. 它**不会**将整个模块运行后赋值给某个变量，而是**只选择 import 的接口进行编译**，这样在性能上比 require 好很多。

### 差异

1. require 是**赋值过程**，**import 是解构过程**
2. import 在遇到 default 时，和 require 则完全不同；
   1. 目前通过 babel 转换之后，import 会被转码为 require 去执行。
3. CommonJS 还是 ES6 Module 输出都可以看成是一个**具备多个属性或者方法的对象**；
4. default 是 ES6 Module 所独有的关键字，export default fs 输出默认的接口对象，import fs from 'fs' 可直接导入这个对象；
5. ES6 Module 中导入模块的属性或者方法是**强绑定**的，包括基础类型；而 CommonJS 则是**普通的值传递或者引用传递**。

## 代码测试

查看 module-test/。
