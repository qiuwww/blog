
# JavaScript

[TOC]

## 工具函数

### JS中的深拷贝/浅拷贝

```js
function deepClone(obj) {
    let result = typeof  obj.splice === "function" ? [] : {};
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                result[key] = deepClone(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
            } else {
                result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
            }

        }
        return result;
    }
    return obj;
}
```




**JavaScript的组成**

- JavaScript 由以下三部分组成：
  - ECMAScript（核心）：JavaScript 语言基础
  - DOM（文档对象模型）：规定了访问HTML和XML的接口
  - BOM（浏览器对象模型）：提供了浏览器窗口之间进行交互的对象和方法
      
**JS的基本数据类型和引用数据类型**

- 基本数据类型：undefined、null、boolean、number、string、symbol
- 引用数据类型：object、array、function

**检测浏览器版本版本有哪些方式？**
- 根据 navigator.userAgent   //  UA.toLowerCase().indexOf('chrome')
- 根据 window 对象的成员       // 'ActiveXObject' in window

**介绍JS有哪些内置对象？**

- 数据封装类对象：Object、Array、Boolean、Number、String
- 其他对象：Function、Arguments、Math、Date、RegExp、Error
- ES6新增对象：Symbol、Map、Set、Promises、Proxy、Reflect

**说几条写JavaScript的基本规范？**

- 代码缩进，建议使用“四个空格”缩进
- 代码段使用花括号{}包裹
- 语句结束使用分号;
- 变量和函数在使用前进行声明
- 以大写字母开头命名构造函数，全大写命名常量
- 规范定义JSON对象，补全双引号
- 用{}和[]声明对象和数组

**如何编写高性能的JavaScript？**

* 遵循严格模式："use strict";
* 将js脚本放在页面底部，加快渲染页面
* 将js脚本将脚本成组打包，减少请求
* 使用非阻塞方式下载js脚本
* 尽量使用局部变量来保存全局变量
* 尽量减少使用闭包
* 使用 window 对象属性方法时，省略 window
* 尽量减少对象成员嵌套
* 缓存 DOM 节点的访问
* 通过避免使用 eval() 和 Function() 构造器
* 给 setTimeout() 和 setInterval() 传递函数而不是字符串作为参数
* 尽量使用直接量创建对象和数组
* 最小化重绘(repaint)和回流(reflow)


**描述浏览器的渲染过程，DOM树和渲染树的区别？**

- 浏览器的渲染过程：
  - 解析HTML构建 DOM(DOM树)，并行请求 css/image/js
  - CSS 文件下载完成，开始构建 CSSOM(CSS树)
  - CSSOM 构建结束后，和 DOM 一起生成 Render Tree(渲染树)
  - 布局(Layout)：计算出每个节点在屏幕中的位置
  - 显示(Painting)：通过显卡把页面画到屏幕上
  
- DOM树 和 渲染树 的区别：
  - DOM树与HTML标签一一对应，包括head和隐藏元素
  - 渲染树不包括head和隐藏元素，大段文本的每一个行都是独立节点，每一个节点都有对应的css属性

**重绘和回流（重排）的区别和关系？**

- 重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘
- 回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流
- 注意：JS获取Layout属性值（如：offsetLeft、scrollTop、getComputedStyle等）也会引起回流。因为浏览器需要通过回流计算最新值
- 回流必将引起重绘，而重绘不一定会引起回流


**如何最小化重绘(repaint)和回流(reflow)？**

- 需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
- 需要创建多个DOM节点时，使用DocumentFragment创建完后一次性的加入document
- 缓存Layout属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流
- 尽量避免用table布局（table元素一旦触发回流就会导致table里所有的其它元素回流）
- 避免使用css表达式(expression)，因为每次调用都会重新计算值（包括加载页面）
- 尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color
- 批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx

**script 的位置是否会影响首屏显示时间？**

- 在解析 HTML 生成 DOM 过程中，js 文件的下载是并行的，不需要 DOM 处理到 script 节点。因此，script的位置不影响首屏显示的开始时间。
- 浏览器解析 HTML 是自上而下的线性过程，script作为 HTML 的一部分同样遵循这个原则
- 因此，script 会延迟 DomContentLoad，只显示其上部分首屏内容，从而影响首屏显示的完成时间

**解释JavaScript中的作用域与变量声明提升？**

- JavaScript作用域：
  - 在Java、C等语言中，作用域为for语句、if语句或{}内的一块区域，称为作用域；
  - 而在 JavaScript 中，作用域为function(){}内的区域，称为函数作用域。

- JavaScript变量声明提升：
  -  在JavaScript中，函数声明与变量声明经常被JavaScript引擎隐式地提升到当前作用域的顶部。
  -  声明语句中的赋值部分并不会被提升，只有名称被提升
  -  函数声明的优先级高于变量，如果变量名跟函数名相同且未赋值，则函数声明会覆盖变量声明
  -  如果函数有多个同名参数，那么最后一个参数（即使没有定义）会覆盖前面的同名参数

**介绍JavaScript的原型，原型链？有什么特点？**

- 原型：
  - JavaScript的所有对象中都包含了一个 [__proto__] 内部属性，这个属性所对应的就是该对象的原型
  - JavaScript的函数对象，除了原型 [__proto__] 之外，还预置了 prototype 属性
  - 当函数对象作为构造函数创建实例时，该 prototype 属性值将被作为实例对象的原型 [__proto__]。

- 原型链：
  -  当一个对象调用的属性/方法自身不存在时，就会去自己 [__proto__] 关联的前辈 prototype 对象上去找
  -  如果没找到，就会去该 prototype 原型 [__proto__] 关联的前辈 prototype 去找。依次类推，直到找到属性/方法或 undefined 为止。从而形成了所谓的“原型链”
  

- 原型特点：
  - JavaScript对象是通过引用来传递的，当修改原型时，与之相关的对象也会继承这一改变
  

**JavaScript有几种类型的值？，你能画一下他们的内存图吗**

- 原始数据类型（Undefined，Null，Boolean，Number、String）-- 栈
- 引用数据类型（对象、数组和函数）-- 堆
- 两种类型的区别是：存储位置不同：
- 原始数据类型是直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据；
- 引用数据类型存储在堆(heap)中的对象，占据空间大、大小不固定，如果存储在栈中，将会影响程序运行的性能；
- 引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。
- 当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

**JavaScript如何实现一个类，怎么实例化这个类？**

- 构造函数法（this + prototype） -- 用 new 关键字 生成实例对象
  - 缺点：用到了 this 和 prototype，编写复杂，可读性差

```javascript
  function Mobile(name, price){
     this.name = name;
     this.price = price;
   }
   Mobile.prototype.sell = function(){
      alert(this.name + "，售价 $" + this.price);
   }
   var iPhone7 = new Mobile("iPhone7", 1000);
   iPhone7.sell();
```
- Object.create 法 -- 用 Object.create() 生成实例对象
- 缺点：不能实现私有属性和私有方法，实例对象之间也不能共享数据

```javascript
 var Person = {
     firstname: "Mark",
     lastname: "Yun",
     age: 25,
     introduce: function(){
         alert('I am ' + Person.firstname + ' ' + Person.lastname);
     }
 };

 var person = Object.create(Person);
 person.introduce();

 // Object.create 要求 IE9+，低版本浏览器可以自行部署：
 if (!Object.create) {
　   Object.create = function (o) {
　　　 function F() {}
　　　 F.prototype = o;
　　　 return new F();
　　};
　}
```
- 极简主义法（消除 this 和 prototype） -- 调用 createNew() 得到实例对象
  - 优点：容易理解，结构清晰优雅，符合传统的"面向对象编程"的构造
   
```javascript
 var Cat = {
   age: 3, // 共享数据 -- 定义在类对象内，createNew() 外
   createNew: function () {
     var cat = {};
     // var cat = Animal.createNew(); // 继承 Animal 类
     cat.name = "小咪";
     var sound = "喵喵喵"; // 私有属性--定义在 createNew() 内，输出对象外
     cat.makeSound = function () {
       alert(sound);  // 暴露私有属性
     };
     cat.changeAge = function(num){
       Cat.age = num; // 修改共享数据
     };
     return cat; // 输出对象
   }
 };

 var cat = Cat.createNew();
 cat.makeSound();
```
  
- ES6 语法糖 class -- 用 new 关键字 生成实例对象      

```javascript
     class Point {
       constructor(x, y) {
         this.x = x;
         this.y = y;
       }
       toString() {
         return '(' + this.x + ', ' + this.y + ')';
       }
     }

  var point = new Point(2, 3);
  ```

**Javascript如何实现继承？**

- 构造函数绑定：使用 call 或 apply 方法，将父对象的构造函数绑定在子对象上


```javascript   　
function Cat(name,color){
 　Animal.apply(this, arguments);
 　this.name = name;
 　this.color = color;
}
```
- 实例继承：将子对象的 prototype 指向父对象的一个实例     
 
```javascript
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
```

- 拷贝继承：如果把父对象的所有属性和方法，拷贝进子对象
 
```javascript         　　
    function extend(Child, Parent) {
  　　　var p = Parent.prototype;
  　　　var c = Child.prototype;
  　　　for (var i in p) {
  　　　   c[i] = p[i];
  　　　}
  　　　c.uber = p;
  　 }
  ```
- 原型继承：将子对象的 prototype 指向父对象的 prototype      

```javascript
    function extend(Child, Parent) {
        var F = function(){};
      　F.prototype = Parent.prototype;
      　Child.prototype = new F();
      　Child.prototype.constructor = Child;
      　Child.uber = Parent.prototype;
    }
  ```
- ES6 语法糖 extends：class ColorPoint extends Point {}

```javascript
    class ColorPoint extends Point {
       constructor(x, y, color) {
          super(x, y); // 调用父类的constructor(x, y)
          this.color = color;
       }
       toString() {
          return this.color + ' ' + super.toString(); // 调用父类的toString()
       }
    }
  ```

**Javascript作用链域?**

- 全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节
- 如果当前作用域没有找到属性或方法，会向上层作用域查找，直至全局函数，这种形式就是作用域链

**谈谈this对象的理解**

- this 总是指向函数的直接调用者
- 如果有 new 关键字，this 指向 new 出来的实例对象
- 在事件中，this指向触发这个事件的对象
- IE下 attachEvent 中的this总是指向全局对象Window

**eval是做什么的？**

**eval的功能是把对应的字符串解析成JS代码并运行**

- 应该避免使用eval，不安全，非常耗性能（先解析成js语句，再执行）
- 由JSON字符串转换为JSON对象的时候可以用 eval('('+ str +')');

**什么是 Window 对象? 什么是 Document 对象?**

- Window 对象表示当前浏览器的窗口，是JavaScript的顶级对象。
- 我们创建的所有对象、函数、变量都是 Window 对象的成员。
- Window 对象的方法和属性是在全局范围内有效的。
- Document 对象是 HTML 文档的根节点与所有其他节点（元素节点，文本节点，属性节点, 注释节点）
-  Document 对象使我们可以通过脚本对 HTML 页面中的所有元素进行访问
-  Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问

**介绍 DOM 的发展**

- DOM：文档对象模型（Document Object Model），定义了访问HTML和XML文档的标准，与编程语言及平台无关
- DOM0：提供了查询和操作Web文档的内容API。未形成标准，实现混乱。如：document.forms['login']
- DOM1：W3C提出标准化的DOM，简化了对文档中任意部分的访问和操作。如：JavaScript中的Document对象
- DOM2：原来DOM基础上扩充了鼠标事件等细分模块，增加了对CSS的支持。如：getComputedStyle(elem, pseudo)
- DOM3：增加了XPath模块和加载与保存（Load and Save）模块。如：XPathEvaluator

**介绍DOM0，DOM2，DOM3事件处理方式区别**

- DOM0级事件处理方式：
    - `btn.onclick = func;`
    - `btn.onclick = null;`
- DOM2级事件处理方式：
    - `btn.addEventListener('click', func, false);`
    - `btn.removeEventListener('click', func, false);`
    - `btn.attachEvent("onclick", func);`
    - `btn.detachEvent("onclick", func);`
- DOM3级事件处理方式：
    - `eventUtil.addListener(input, "textInput", func);`
    -  `eventUtil` 是自定义对象，`textInput` 是DOM3级事件

**事件的三个阶段**

- 捕获、目标、冒泡

**介绍事件“捕获”和“冒泡”执行顺序和事件的执行次数？**

- 按照W3C标准的事件：首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段
- 事件执行次数（DOM2-addEventListener）：元素上绑定事件的个数
  - 注意1：前提是事件被确实触发
  - 注意2：事件绑定几次就算几个事件，即使类型和功能完全一样也不会“覆盖”
- 事件执行顺序：判断的关键是否目标元素
  - 非目标元素：根据W3C的标准执行：捕获->目标元素->冒泡（不依据事件绑定顺序）
  - 目标元素：依据事件绑定顺序：先绑定的事件先执行（不依据捕获冒泡标准）
  - 最终顺序：父元素捕获->目标元素事件1->目标元素事件2->子元素捕获->子元素冒泡->父元素冒泡
  - 注意：子元素事件执行前提    事件确实“落”到子元素布局区域上，而不是简单的具有嵌套关系

**在一个DOM上同时绑定两个点击事件：一个用捕获，一个用冒泡。事件会执行几次，先执行冒泡还是捕获？**

* 该DOM上的事件如果被触发，会执行两次（执行次数等于绑定次数）
* 如果该DOM是目标元素，则按事件绑定顺序执行，不区分冒泡/捕获
* 如果该DOM是处于事件流中的非目标元素，则先执行捕获，后执行冒泡


**事件的代理/委托**

* 事件委托是指将事件绑定目标元素的到父元素上，利用冒泡机制触发该事件
  * 优点：
    - 可以减少事件注册，节省大量内存占用
    - 可以将事件应用于动态添加的子元素上
  * 缺点：
    使用不当会造成事件在不应该触发时触发
  * 示例：
      
```
ulEl.addEventListener('click', function(e){
    var target = event.target || event.srcElement;
    if(!!target && target.nodeName.toUpperCase() === "LI"){
        console.log(target.innerHTML);
    }
}, false);
```

**IE与火狐的事件机制有什么区别？ 如何阻止冒泡？**

* IE只事件冒泡，不支持事件捕获；火狐同时支持件冒泡和事件捕获

**IE的事件处理和W3C的事件处理有哪些区别？**

* 绑定事件
  - W3C: targetEl.addEventListener('click', handler, false);
  - IE: targetEl.attachEvent('onclick', handler);

* 删除事件
  - W3C: targetEl.removeEventListener('click', handler, false);
  - IE: targetEl.detachEvent(event, handler);

* 事件对象
  - W3C: var e = arguments.callee.caller.arguments[0]
  - IE: window.event

* 事件目标
  - W3C: e.target
  - IE: window.event.srcElement

* 阻止事件默认行为
  - W3C: e.preventDefault()
  - IE: window.event.returnValue = false

* 阻止事件传播
  - W3C: e.stopPropagation()
  - IE: window.event.cancelBubble = true


**W3C事件的 target 与 currentTarget 的区别？**

* target 只会出现在事件流的目标阶段
* currentTarget 可能出现在事件流的任何阶段
* 当事件流处在目标阶段时，二者的指向相同
* 当事件流处于捕获或冒泡阶段时：currentTarget 指向当前事件活动的对象(一般为父级)

**如何派发事件(dispatchEvent)？（如何进行事件广播？）**

* W3C: 使用 dispatchEvent 方法
* IE: 使用 fireEvent 方法

```javascript
var fireEvent = function(element, event){
    if (document.createEventObject){
        var mockEvent = document.createEventObject();
        return element.fireEvent('on' + event, mockEvent)
    }else{
        var mockEvent = document.createEvent('HTMLEvents');
        mockEvent.initEvent(event, true, true);
        return !element.dispatchEvent(mockEvent);
    }
}
```

**什么是函数节流？介绍一下应用场景和原理？**


* 函数节流(throttle)是指阻止一个函数在很短时间间隔内连续调用。
只有当上一次函数执行后达到规定的时间间隔，才能进行下一次调用。
但要保证一个累计最小调用间隔（否则拖拽类的节流都将无连续效果）

* 函数节流用于 onresize, onscroll 等短时间内会多次触发的事件

* 函数节流的原理：使用定时器做时间节流。
当触发一个事件时，先用 setTimout 让这个事件延迟一小段时间再执行。
如果在这个时间间隔内又触发了事件，就 clearTimeout 原来的定时器，
再 setTimeout 一个新的定时器重复以上流程。

* 函数节流简单实现：

```javascript
function throttle(method, context) {
     clearTimeout(methor.tId);
     method.tId = setTimeout(function(){
         method.call(context);
     }， 100); // 两次调用至少间隔 100ms
}
// 调用
window.onresize = function(){
    throttle(myFunc, window);
}
```

**区分什么是“客户区坐标”、“页面坐标”、“屏幕坐标”？**

* 客户区坐标：鼠标指针在可视区中的水平坐标(clientX)和垂直坐标(clientY)
* 页面坐标：鼠标指针在页面布局中的水平坐标(pageX)和垂直坐标(pageY)
* 屏幕坐标：设备物理屏幕的水平坐标(screenX)和垂直坐标(screenY)

**如何获得一个DOM元素的绝对位置？**

* elem.offsetLeft：返回元素相对于其定位父级左侧的距离
* elem.offsetTop：返回元素相对于其定位父级顶部的距离
* elem.getBoundingClientRect()：返回一个DOMRect对象，包含一组描述边框的只读属性，单位像素

**分析 ['1', '2', '3'].map(parseInt) 答案是多少？**

- 答案:[1, NaN, NaN]
* parseInt(string, radix) 第2个参数 radix 表示进制。省略 radix 或 radix = 0，则数字将以十进制解析
* map 每次为 parseInt 传3个参数(elem, index, array)，其中 index 为数组索引
* 因此，map 遍历 ["1", "2", "3"]，相应 parseInt 接收参数如下

```
parseInt('1', 0);  // 1
parseInt('2', 1);  // NaN
parseInt('3', 2);  // NaN
```
-  所以，parseInt 参数 radix 不合法，导致返回值为 NaN

**new 操作符具体干了什么？**

- 创建实例对象，this 变量引用该对象，同时还继承了构造函数的原型
- 属性和方法被加入到 this 引用的对象中
- 新创建的对象由 this 所引用，并且最后隐式的返回 this
        
**用原生JavaScript的实现过什么功能吗？**

- 封装选择器、调用第三方API、设置和获取样式

**解释一下这段代码的意思吗？**

```javascript
  [].forEach.call($$("*"), function(el){
      el.style.outline = "1px solid #" + (~~(Math.random()*(1<<24))).toString(16);
  })
 ```
- 解释：获取页面所有的元素，遍历这些元素，为它们添加1像素随机颜色的轮廓(outline)
- 1. `$$(sel)` // $$函数被许多现代浏览器命令行支持，等价于 document.querySelectorAll(sel)
- 2. `[].forEach.call(NodeLists)` // 使用 call 函数将数组遍历函数 forEach 应到节点元素列表
- 3. `el.style.outline = "1px solid #333"` // 样式 outline 位于盒模型之外，不影响元素布局位置
- 4. `(1<<24)` // parseInt("ffffff", 16) == 16777215 == 2^24 - 1 // 1<<24 == 2^24 == 16777216
- 5. `Math.random()*(1<<24)` // 表示一个位于 0 到 16777216 之间的随机浮点数
- 6. `~~Math.random()*(1<<24)` // `~~` 作用相当于 parseInt 取整
- 7. `(~~(Math.random()*(1<<24))).toString(16)` // 转换为一个十六进制- 


** JavaScript实现异步编程的方法？**

* 回调函数
* 事件监听
* 发布/订阅
* Promises对象
* Async函数[ES7]

**web开发中会话跟踪的方法有哪些**

- cookie
- session
- url重写
- 隐藏input
- ip地址

**介绍js的基本数据类型**

- Undefined、Null、Boolean、Number、String

**介绍js有哪些内置对象？**

- Object 是 JavaScript 中所有对象的父对象
- 数据封装类对象：Object、Array、Boolean、Number 和 String
- 其他对象：Function、Arguments、Math、Date、RegExp、Error





**说几条写JavaScript的基本规范？**

- 不要在同一行声明多个变量
- 请使用 ===/!==来比较true/false或者数值
- 使用对象字面量替代new Array这种形式
- 不要使用全局函数
- Switch语句必须带有default分支
- 函数不应该有时候有返回值，有时候没有返回值
- If语句必须使用大括号
- for-in循环中的变量 应该使用var关键字明确限定作用域，从而避免作用域污

**JavaScript原型，原型链 ? 有什么特点？**

- 每个对象都会在其内部初始化一个属性，就是prototype(原型)，当我们访问一个对象的属性时
- 如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，于是就这样一直找下去，也就是我们平时所说的原型链的概念
- 关系：`instance.constructor.prototype = instance.__proto__`
- 特点：
  - JavaScript对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。
  
-  当我们需要一个属性的时，Javascript引擎会先看当前对象中是否有这个属性， 如果没有的
-  就会查找他的Prototype对象是否有这个属性，如此递推下去，一直检索到 Object 内建对象

**JavaScript有几种类型的值？，你能画一下他们的内存图吗？**

- 栈：原始数据类型（Undefined，Null，Boolean，Number、String） 
- 堆：引用数据类型（对象、数组和函数）

- 两种类型的区别是：存储位置不同；
- 原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆(heap)中的对象,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其
- 在栈中的地址，取得地址后从堆中获得实体

![](https://camo.githubusercontent.com/d1947e624a0444d1032a85800013df487adc5550/687474703a2f2f7777772e77337363686f6f6c2e636f6d2e636e2f692f63745f6a735f76616c75652e676966)

**Javascript如何实现继承？**

- 构造继承
- 原型继承
- 实例继承
- 拷贝继承

- 原型prototype机制或apply和call方法去实现较简单，建议使用构造函数与原型混合方式

```
 function Parent(){
        this.name = 'wang';
    }

    function Child(){
        this.age = 28;
    }
    Child.prototype = new Parent();//继承了Parent，通过原型

    var demo = new Child();
    alert(demo.age);
    alert(demo.name);//得到被继承的属性
  }
```

**javascript创建对象的几种方式？**

> javascript创建对象简单的说,无非就是使用内置对象或各种自定义对象，当然还可以用JSON；但写法有很多种，也能混合使用

- 对象字面量的方式

```
person={firstname:"Mark",lastname:"Yun",age:25,eyecolor:"black"};
```

- 用function来模拟无参的构造函数

```
 function Person(){}
    var person=new Person();//定义一个function，如果使用new"实例化",该function可以看作是一个Class
        person.name="Mark";
        person.age="25";
        person.work=function(){
        alert(person.name+" hello...");
    }
person.work();
```

- 用function来模拟参构造函数来实现（用this关键字定义构造的上下文属性）

```
function Pet(name,age,hobby){
       this.name=name;//this作用域：当前对象
       this.age=age;
       this.hobby=hobby;
       this.eat=function(){
          alert("我叫"+this.name+",我喜欢"+this.hobby+",是个程序员");
       }
    }
    var maidou =new Pet("麦兜",25,"coding");//实例化、创建对象
    maidou.eat();//调用eat方法
```

- 用工厂方式来创建（内置对象）

```
var wcDog =new Object();
     wcDog.name="旺财";
     wcDog.age=3;
     wcDog.work=function(){
       alert("我是"+wcDog.name+",汪汪汪......");
     }
     wcDog.work();
```

- 用原型方式来创建

```
function Dog(){

     }
     Dog.prototype.name="旺财";
     Dog.prototype.eat=function(){
     alert(this.name+"是个吃货");
     }
     var wangcai =new Dog();
     wangcai.eat();

```

- 用混合方式来创建

```
 function Car(name,price){
      this.name=name;
      this.price=price; 
    }
     Car.prototype.sell=function(){
       alert("我是"+this.name+"，我现在卖"+this.price+"万元");
      }
    var camry =new Car("凯美瑞",27);
    camry.sell(); 
```

**Javascript作用链域?**

- 全局函数无法查看局部函数的内部细节，但局部函数可以查看其上层的函数细节，直至全局细节
- 当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找
- 直至全局函数，这种组织形式就是作用域链

**谈谈This对象的理解**

- this总是指向函数的直接调用者（而非间接调用者）
- 如果有new关键字，this指向new出来的那个对象
- 在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window


**eval是做什么的？**

- 它的功能是把对应的字符串解析成JS代码并运行
- 应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）
- 由JSON字符串转换为JSON对象的时候可以用eval，var obj =eval('('+ str +')')

**null，undefined 的区别？**

- undefined   表示不存在这个值。
- undefined :是一个表示"无"的原始值或者说表示"缺少值"，就是此处应该有一个值，但是还没有定义。当尝试读取时会返回 undefined
- 例如变量被声明了，但没有赋值时，就等于undefined

- null 表示一个对象被定义了，值为“空值”
- null : 是一个对象(空对象, 没有任何属性和方法)
- 例如作为函数的参数，表示该函数的参数不是对象；

-  在验证null时，一定要使用　=== ，因为 == 无法分别 null 和　undefined

**写一个通用的事件侦听器函数**

```
 // event(事件)工具集，来源：github.com/markyun
    markyun.Event = {
        // 页面加载完成后
        readyEvent : function(fn) {
            if (fn==null) {
                fn=document;
            }
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = fn;
            } else {
                window.onload = function() {
                    oldonload();
                    fn();
                };
            }
        },
        // 视能力分别使用dom0||dom2||IE方式 来绑定事件
        // 参数： 操作的元素,事件名称 ,事件处理程序
        addEvent : function(element, type, handler) {
            if (element.addEventListener) {
                //事件类型、需要执行的函数、是否捕捉
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, function() {
                    handler.call(element);
                });
            } else {
                element['on' + type] = handler;
            }
        },
        // 移除事件
        removeEvent : function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.datachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        },
        // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
        stopPropagation : function(ev) {
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },
        // 取消事件的默认行为
        preventDefault : function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // 获取事件目标
        getTarget : function(event) {
            return event.target || event.srcElement;
        },
        // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
        getEvent : function(e) {
            var ev = e || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev && Event == ev.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return ev;
        }
    };
```

**["1", "2", "3"].map(parseInt) 答案是多少？**

-  [1, NaN, NaN] 因为 parseInt 需要两个参数 (val, radix)，其中 radix 表示解析时用的基数。
-  map 传了 3 个 (element, index, array)，对应的 radix 不合法导致解析失败。

**事件是？IE与火狐的事件机制有什么区别？ 如何阻止冒泡？**

- 我们在网页中的某个操作（有的操作对应多个事件）。例如：当我们点击一个按钮就会产生一个事件。是可以被 JavaScript 侦测到的行为
- 事件处理机制：IE是事件冒泡、Firefox同时支持两种事件模型，也就是：捕获型事件和冒泡型事件
- ev.stopPropagation();（旧ie的方法 ev.cancelBubble = true;）

**什么是闭包（closure），为什么要用它？**

- 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域

- 闭包的特性：
  - 函数内再嵌套函数
  - 内部函数可以引用外层的参数和变量
  - 参数和变量不会被垃圾回收机制回收
  
**javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？**

- use strict是一种ECMAscript 5 添加的（严格）运行模式,这种模式使得 Javascript 在更严格的条件下运行,使JS编码更加规范化的模式,消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为

**如何判断一个对象是否属于某个类？**

```
// 使用instanceof （待完善）
   if(a instanceof Person){
       alert('yes');
   }
```

**new操作符具体干了什么呢?**

- 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型
- 属性和方法被加入到 this 引用的对象中
- 新创建的对象由 this 所引用，并且最后隐式的返回 this

```
var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj);
```



**js延迟加载的方式有哪些？**

- defer和async、动态创建DOM方式（用得最多）、按需异步载入js

**Ajax 是什么? 如何创建一个Ajax？**

> ajax的全称：Asynchronous Javascript And XML

- 异步传输+js+xml
- 所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验

- 创建XMLHttpRequest对象,也就是创建一个异步调用对象
- 建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息
- 设置响应HTTP请求状态变化的函数
- 发送HTTP请求
- 获取异步调用返回的数据
- 用JavaScript和DOM实现局部刷新

**同步和异步的区别?**

- 同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作
- 异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容



**异步加载JS的方式有哪些？**

- defer，只支持IE
- async：
- 创建script，插入到DOM中，加载完毕后callBack


**documen.write和 innerHTML的区别**

- document.write只能重绘整个页面
- innerHTML可以重绘页面的一部分


**DOM操作——怎样添加、移除、移动、复制、创建和查找节点?**

- （1）创建新节点
  - createDocumentFragment() //创建一个DOM片段
  - createElement()   //创建一个具体的元素
  - createTextNode()   //创建一个文本节点
- （2）添加、移除、替换、插入
  - appendChild()
  - removeChild()
  - replaceChild()
  - insertBefore() //在已有的子节点前插入一个新的子节点
- （3）查找
  - getElementsByTagName()    //通过标签名称
  - getElementsByName()    // 通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
  - getElementById()    //通过元素Id，唯一性

**那些操作会造成内存泄漏？**

- 内存泄漏指任何对象在您不再拥有或需要它之后仍然存在
- 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收
- setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏
- 闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）


  

**渐进增强和优雅降级**

- 渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

- 优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容




**Javascript垃圾回收方法**

- 标记清除（mark and sweep）

> - 这是JavaScript最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”
> - 垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了

**引用计数(reference counting)**

> 在低版本IE中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加1，如果该变量的值变成了另外一个，则这个值得引用次数减1，当这个值的引用次数变为0的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为0的值占用的空间

**js继承方式及其优缺点**

- 原型链继承的缺点
  - 一是字面量重写原型会中断关系，使用引用类型的原型，并且子类型还无法给超类型传递参数。
  
- 借用构造函数（类式继承）
  - 借用构造函数虽然解决了刚才两种问题，但没有原型，则复用无从谈起。所以我们需要原型链+借用构造函数的模式，这种模式称为组合继承
  
- 组合式继承
  - 组合式继承是比较常用的一种继承方法，其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。

**defer和async**

- defer并行加载js文件，会按照页面上script标签的顺序执行async并行加载js文件，下载完成立即执行，不会按照页面上script标签的顺序执行

**用过哪些设计模式？**

- 工厂模式：
  - 主要好处就是可以消除对象间的耦合，通过使用工程方法而不是new关键字。将所有实例化的代码集中在一个位置防止代码重复
  - 工厂模式解决了重复实例化的问题 ，但还有一个问题,那就是识别问题，因为根本无法 搞清楚他们到底是哪个对象的实例
  -
```
function createObject(name,age,profession){//集中实例化的函数var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.profession = profession;
    obj.move = function () {
        return this.name + ' at ' + this.age + ' engaged in ' + this.profession;
    };
    return obj;
}
var test1 = createObject('trigkit4',22,'programmer');//第一个实例var test2 = createObject('mike',25,'engineer');//第二个实例

```

- 构造函数模式
  - 使用构造函数的方法 ，即解决了重复实例化的问题 ，又解决了对象识别的问题，该模式与工厂模式的不同之处在于
  
- 构造函数方法没有显示的创建对象 (new Object());

- 直接将属性和方法赋值给 this 对象;

- 没有 renturn 语句

**说说你对闭包的理解**

- 使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。在js中，函数即闭包，只有函数才会产生作用域的概念

- 闭包有三个特性：
  - 1.函数嵌套函数

  - 2.函数内部可以引用外部的参数和变量

  - 3.参数和变量不会被垃圾回收机制回收
  


**请解释一下 JavaScript 的同源策略**

- 概念:同源策略是客户端脚本（尤其是Javascript）的重要的安全度量标准。它最早出自Netscape Navigator2.0，其目的是防止某个文档或脚本从多个不同源装载。这里的同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议
- 指一段脚本只能读取来自同一来源的窗口和文档的属性

**为什么要有同源限制？**

- 我们举例说明：比如一个黑客程序，他利用Iframe把真正的银行登录页面嵌到他的页面上，当你使用真实的用户名，密码登录时，他的页面就可以通过Javascript读取到你的表单中input中的内容，这样用户名，密码就轻松到手了。
- 缺点
  - 现在网站的JS都会进行压缩，一些文件用了严格模式，而另一些没有。这时这些本来是严格模式的文件，被 merge后，这个串就到了文件的中间，不仅没有指示严格模式，反而在压缩后浪费了字节
  
**实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制**

```
Object.prototype.clone = function(){

            var o = this.constructor === Array ? [] : {};

            for(var e in this){

                    o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];

            }

            return o;
    }
    
```

**说说严格模式的限制**

  - 严格模式主要有以下限制：

  - 变量必须声明后再使用

  - 函数的参数不能有同名属性，否则报错

  - 不能使用with语句

  - 不能对只读属性赋值，否则报错

  - 不能使用前缀0表示八进制数，否则报错

  - 不能删除不可删除的属性，否则报错

  - 不能删除变量delete prop，会报错，只能删除属性delete global[prop]

  - eval不会在它的外层作用域引入变量

  - eval和arguments不能被重新赋值

  - arguments不会自动反映函数参数的变化

  - 不能使用arguments.callee

  - 不能使用arguments.caller

  - 禁止this指向全局对象

  - 不能使用fn.caller和fn.arguments获取函数调用的堆栈

  - 增加了保留字（比如protected、static和interface）
  
**如何删除一个cookie**

- 将时间设为当前时间往前一点

```
var date = new Date();

date.setDate(date.getDate() - 1);//真正的删除
```
setDate()方法用于设置一个月的某一天

- expires的设置

```
  document.cookie = 'user='+ encodeURIComponent('name')  + ';expires = ' + new Date(0)
```


**编写一个方法 求一个字符串的字节长度**

- 假设：一个英文字符占用一个字节，一个中文字符占用两个字节    

```
function GetBytes(str){

        var len = str.length;

        var bytes = len;

        for(var i=0; i<len; i++){

            if (str.charCodeAt(i) > 255) bytes++;

        }

        return bytes;

    }

alert(GetBytes("你好,as"));

```

**请解释什么是事件代理**

- 事件代理（Event Delegation），又称之为事件委托。是 JavaScript 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是DOM元素的事件冒泡。使用事件代理的好处是可以提高性能

**attribute和property的区别是什么？**

- attribute是dom元素在文档中作为html标签拥有的属性；
- property就是dom元素在js中作为对象拥有的属性。

- 对于html的标准属性来说，attribute和property是同步的，是会自动更新的
- 但是对于自定义的属性来说，他们是不同步的

**页面编码和被请求的资源编码如果不一致如何处理？**

 * 后端响应头设置 charset 
 * 前端页面`<meta>`设置 charset
 

**把`<script>`放在`</body>`之前和之后有什么区别？浏览器会如何解析它们？**

 * 按照HTML标准，在`</body>`结束后出现`<script>`或任何元素的开始标签，都是解析错误
 * 虽然不符合HTML标准，但浏览器会自动容错，使实际效果与写在`</body>`之前没有区别
 * 浏览器的容错机制会忽略<script>之前的`</body>`，视作`<script>`仍在 body 体内。省略`</body>`和`</html>`闭合标签符合HTML标准，服务器可以利用这一标准尽可能少输出内容
 
**延迟加载JS的方式有哪些？**

* 设置`<script>`属性 defer="defer" （脚本将在页面完成解析时执行）
* 动态创建 script DOM：document.createElement('script');
* XmlHttpRequest 脚本注入
* 延迟加载工具 LazyLoad

**异步加载JS的方式有哪些？**

* 设置`<script>`属性 async="async" （一旦脚本可用，则会异步执行）
* 动态创建 script DOM：document.createElement('script');
* XmlHttpRequest 脚本注入
* 异步加载库 LABjs
* 模块加载器 Sea.js

**JavaScript 中，调用函数有哪几种方式？**

* 方法调用模式          Foo.foo(arg1, arg2);
* 函数调用模式          foo(arg1, arg2);
* 构造器调用模式        (new Foo())(arg1, arg2);
* call/applay调用模式   Foo.foo.call(that, arg1, arg2);
* bind调用模式          Foo.foo.bind(that)(arg1, arg2)();


**简单实现 Function.bind 函数？**

```javascript
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(that) {
      var func = this, args = arguments;
      return function() {
        return func.apply(that, Array.prototype.slice.call(args, 1));
      }
    }
  }
  // 只支持 bind 阶段的默认参数：
  func.bind(that, arg1, arg2)();

  // 不支持以下调用阶段传入的参数：
  func.bind(that)(arg1, arg2);
```

** 列举一下JavaScript数组和对象有哪些原生方法？**

* 数组：
    - arr.concat(arr1, arr2, arrn);
    - arr.join(",");
    - arr.sort(func);
    - arr.pop();
    - arr.push(e1, e2, en);
    - arr.shift();
    - unshift(e1, e2, en);
    - arr.reverse();
    - arr.slice(start, end);            
    - arr.splice(index, count, e1, e2, en);  
    - arr.indexOf(el);
    - arr.includes(el);   // ES6

* 对象：
    -  object.hasOwnProperty(prop);     
    -  object.propertyIsEnumerable(prop);
    -  object.valueOf();                 
    -  object.toString();                
    -  object.toLocaleString();          
    -  Class.prototype.isPropertyOf(object);  
    
**Array.splice() 与 Array.splice() 的区别？**

* slice -- “读取”数组指定的元素，不会对原数组进行修改
  - 语法：arr.slice(start, end)
  - start 指定选取开始位置（含）
  - end 指定选取结束位置（不含）
  
 * splice 
   - “操作”数组指定的元素，会修改原数组，返回被删除的元素
   - 语法：arr.splice(index, count, [insert Elements])
   - index 是操作的起始位置
   - count = 0 插入元素，count > 0 删除元素
   - [insert Elements] 向数组新插入的元素
   
**JavaScript 对象生命周期的理解？**

* 当创建一个对象时，JavaScript 会自动为该对象分配适当的内存
* 垃圾回收器定期扫描对象，并计算引用了该对象的其他对象的数量
* 如果被引用数量为 0，或惟一引用是循环的，那么该对象的内存即可回收

**哪些操作会造成内存泄漏？**

-  JavaScript 内存泄露指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收

- 未使用 var 声明的全局变量
- 闭包函数(Closures)
- 循环引用(两个对象相互引用)
- 控制台日志(console.log)
- 移除存在绑定事件的DOM元素(IE)

## js常用函数整理

[js常用函数整理](blog/js/js手写函数整理)


### 变量声明提升的问题

### 闭包的原理, 闭包的各种题, 基本都问

### DOM2 事件流, 冒泡和捕获问题

### this 指向问题, 一般都是在笔试题里, 拿着问你, 问的比较多

### call 和 apply 区别? 有的还会加问 bind

### jQuery 获取复选框选中状态, 为什么要用 prop 方法

### 面向对象编程中的继承问题, 原型链问题在笔试题里比较常见

### jQuery API , 各种操作 DOM 用法, 还有一些新的 API, 这种在不用 3 大框架的公司会问的

详细### 

### 可能有些考算法结构的, 可以了解一下, 一般前端掌握的很少

### Ajax 基本都问, 问的细节可能不同, 比如 get 和 post 有什么区别

### 数组的方法 - es6 以下基本都能熟练使用, 应该会加分不

### 字符串的方法 - 拼接, 截取, 带些正

### 数组去重问的挺多的(解法很多, ES6 有很多简短写法

### ES6 的 Promise , 很多都会问. 如果公司用框架或者你写了, 还会问你 Class

### var, let, const区别, 问的多

### 栈和队列结构, 有的会问

### 跨域问题: 同源策略, 解决方案, 解决原理(比如 jsonp 的原理), 这里都是高发区

### 操作DOM的成本很高，不要轻易去操作DOM ？vue，react等框架，相对于操作dom在这方面的优势在哪里？

[参考文章1:DOM 操作成本到底高在哪儿？](https://mp.weixin.qq.com/s/pa9mmQah-DNb9fNAYe2AvA)

Document Object Model 文档对象模型，由解析html的浏览器构建。

DOM是Model，是Object Model，对象模型，是为HTML（and XML）提供的API。

前端们可以用脚本语言（JavaScript）通过DOM去操作HTML内容。当然别的语言也是可以的，Python也可以访问DOM。所以DOM不是提供给Javascript的API，也不是Javascript里的API。

实质上还存在**CSSOM**：CSS Object Model，**浏览器将CSS代码解析成树形的数据结构，与DOM是两个独立的数据结构。**

无论是DOM还是CSSOM，都是要经过 **Bytes→characters→tokens→nodes→objectmodel**这个过程。




### 回流与重绘

#### 何时触发reflow和repaint

reflow(回流): 根据Render Tree布局(几何属性)，意味着元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树；

repaint(重绘): 意味着元素发生的改变只影响了节点的一些样式（背景色，边框颜色，文字颜色等），只需要应用新样式绘制这个元素就可以了；

**reflow回流的成本开销要高于repaint重绘**，一个节点的回流往往回导致子节点以及同级节点的回流；

GoogleChromeLabs 里面有一个csstriggers，列出了各个CSS属性对浏览器执行Layout、Paint、Composite的影响。

#### 引起reflow回流

现代浏览器会对回流做优化，**它会等到足够数量的变化发生，再做一次批处理回流**。

页面第一次渲染（初始化）

DOM树变化（如：增删节点）

Render树变化（如：padding改变）

浏览器窗口resize

**获取元素的某些属性**：

浏览器为了获得正确的值也**会提前触发回流**，这样就使得浏览器的优化失效了，这些属性包括offsetLeft、offsetTop、offsetWidth、offsetHeight、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、调用了getComputedStyle()或者IE的currentStyle

#### 引起repaint重绘

**reflow回流必定引起repaint重绘**，重绘可以单独触发

背景色、颜色、字体改变（注意：字体大小发生变化时，会触发回流）

#### 优化reflow、repaint触发次数

避免逐个修改节点样式，尽量一次性修改

使用DocumentFragment将需要多次修改的DOM元素缓存，最后一次性append到真实DOM中渲染

可以将需要多次修改的DOM元素设置 display:none，操作完再显示。（因为隐藏元素不在render树内，因此修改隐藏元素不会触发回流重绘）

避免多次读取某些属性（见上）

将复杂的节点元素脱离文档流，降低回流成本


### 首屏优化Tips

说了这么多，其实可以总结几点浏览器首屏渲染优化的方向：

减少资源请求数量（内联亦或是延迟动态加载）

使CSS样式表尽早加载，减少@import的使用，因为需要解析完样式表中所有import的资源才会算CSS资源下载完

异步js：阻塞解析器的 JavaScript 会强制浏览器等待 CSSOM 并暂停 DOM 的构建，导致首次渲染的时间延迟

so on...


### css盒子模型

### 页面加载如何优化

### url->页面加载完成的整个流程

### 优雅降级与渐进增强

### xhtml是什么

### ajax的优缺点

### js组成部分

### 解释一下变量声明提升

### 如何跨域访问

### js如何判断一个数组

### 阐述一下js严格模式


### 负载均衡你了解吗？阐述一下

### linux环境你熟悉吗？说一些你用过的指令

### webpack了解吗？用过哪些功能

### 对css预编译器有所了解吗？

### 原型链与作用域

### 闭包

### 模块化（amd/cmd/umd/ES6 module）

### 跨域多种方式，如 jsonp

### JavaScript 中的 this 指向问题

### CORS

### AJAX 的几种状态，ajax与fetch，hijax

### iframe 与 onload 阻塞主页面

### 前端安全与 CSRF，XSS，SQL注入，DDOS

### JS 异步加载

### IE 内存泄露

### JS 创建对象的几种方式

### JS 继承的几种方式与优缺点

### SEO

### ES6 新特性

### promise 与 generator

### 服务器推

### jQuery 相关

### js 捕获与冒泡

### drag 和 drop 实现拖拽

### cookie/session/本地存储

### 雅虎网站优化的军规

### CSS 与 JS 的阻塞加载

### Chrome / IE 浏览器事件兼容


### 图片懒加载

### 实现页面加载进度条

### 事件委托

### 实现extend函数

### 为什么会有跨域的问题以及解决方式

### jsonp原理、postMessage原理

### 实现拖拽功能，比如把5个兄弟节点中的最后一个节点拖拽到节点1和节点2之间

### 动画：setTimeout何时执行，requestAnimationFrame的优点

### 手写parseInt的实现：要求简单一些，把字符串型的数字转化为真正的数字即可，但不能使用JS原
生的字符串转数字的API，比如Number()

### 编写分页器组件的时候，为了减少服务端查询次数，点击“下一页”怎样能确保还有数据可以加载（请求数据不会为空）？

### ES6新增了哪些特性，使用过哪些，也有当场看代码说输出结果的

### JS模块化的实践

### require.js的实现原理（如果使用过webpack，进一步会问，两者打包的异同及优缺点）

### promise的实现原理，进一步会问async、await是否使用过

### 使用前端框架（angular/vue/react）带来哪些好处，相对于使用jQuery

### vue双向数据绑定的实现

### 单页应用，如何实现其路由功能

### 对象拷贝

https://github.com/wengjq/Blog/issues/3

https://mp.weixin.qq.com/s/scz9gRJeh7PM6GJ7wvnTsA

https://mp.weixin.qq.com/s/SvtRJXtquh7dJxATCIwNgw

## JS运行机制及Event Loop

https://zhuanlan.zhihu.com/p/52114921

### 前端异步

[详解前端异步编程的六种方案](https://mp.weixin.qq.com/s/Y21LMWcEatoBvtnqvQyxXg)


## $javascript概念部分

### DOM元素e的e.getAttribute(propName)和e.propName有什么区别和联系

- e.getAttribute()，是标准DOM操作文档元素属性的方法，具有通用性可在任意文档上使用，返回元素在源文件中**设置的属性**
- e.propName通常是在HTML文档中访问特定元素的**特性**，浏览器解析元素后生成对应对象（如a标签生成HTMLAnchorElement），这些对象的特性会根据特定规则结合属性设置得到，对于没有对应特性的属性，只能使用getAttribute进行访问
- e.getAttribute()返回值是源文件中设置的值，类型是字符串或者null（有的实现返回""）
- e.propName返回值可能是字符串、布尔值、对象、undefined等
- 大部分attribute与property是一一对应关系，修改其中一个会影响另一个，如id，title等属性
- 一些布尔属性`<input hidden/>`的检测设置需要hasAttribute和removeAttribute来完成，或者设置对应property
- 像`<a href="../index.html">link</a>`中href属性，转换成property的时候需要通过转换得到完整URL
- 一些attribute和property不是一一对应如：form控件中`<input value="hello"/>`对应的是defaultValue，修改或设置value property修改的是控件当前值，setAttribute修改value属性不会改变value property

### offsetWidth/offsetHeight,clientWidth/clientHeight与scrollWidth/scrollHeight的区别

- offsetWidth/offsetHeight返回值包含**content + padding + border**，效果与e.getBoundingClientRect()相同
- clientWidth/clientHeight返回值只包含**content + padding**，如果有滚动条，也**不包含滚动条**
- scrollWidth/scrollHeight返回值包含**content + padding + 溢出内容的尺寸**

[Measuring Element Dimension and Location with CSSOM in Windows Internet Explorer 9](http://msdn.microsoft.com/en-us/library/ie/hh781509(v=vs.85).aspx)

![元素尺寸](img/element-size.png)

### XMLHttpRequest通用属性和方法

1. `readyState`:表示请求状态的整数，取值：
  - UNSENT（0）：对象已创建
  - OPENED（1）：open()成功调用，在这个状态下，可以为xhr设置请求头，或者使用send()发送请求
  - HEADERS_RECEIVED(2)：所有重定向已经自动完成访问，并且最终响应的HTTP头已经收到
  - LOADING(3)：响应体正在接收
  - DONE(4)：数据传输完成或者传输产生错误
3. `onreadystatechange`：readyState改变时调用的函数
4. `status`：服务器返回的HTTP状态码（如，200， 404）
5. `statusText`:服务器返回的HTTP状态信息（如，OK，No Content）
6. `responseText`:作为字符串形式的来自服务器的完整响应
6. `responseXML`: Document对象，表示服务器的响应解析成的XML文档
7. `abort()`:取消异步HTTP请求
8. `getAllResponseHeaders()`: 返回一个字符串，包含响应中服务器发送的全部HTTP报头。每个报头都是一个用冒号分隔开的名/值对，并且使用一个回车/换行来分隔报头行
9. `getResponseHeader(headerName)`:返回headName对应的报头值
10. `open(method, url, asynchronous [, user, password])`:初始化准备发送到服务器上的请求。method是HTTP方法，不区分大小写；url是请求发送的相对或绝对URL；asynchronous表示请求是否异步；user和password提供身份验证
11. `setRequestHeader(name, value)`:设置HTTP报头
12. `send(body)`:对服务器请求进行初始化。参数body包含请求的主体部分，对于POST请求为键值对字符串；对于GET请求，为null

### focus/blur与focusin/focusout的区别与联系

1. focus/blur不冒泡，focusin/focusout冒泡
2. focus/blur兼容性好，focusin/focusout在除FireFox外的浏览器下都保持良好兼容性，如需使用事件托管，可考虑在FireFox下使用事件捕获elem.addEventListener('focus', handler, true)
3. 可获得焦点的元素：
    1. window
    2. 链接被点击或键盘操作
    3. 表单空间被点击或键盘操作
    4. 设置`tabindex`属性的元素被点击或键盘操作

### mouseover/mouseout与mouseenter/mouseleave的区别与联系

1. mouseover/mouseout是标准事件，**所有浏览器都支持**；mouseenter/mouseleave是IE5.5引入的特有事件后来被DOM3标准采纳，现代标准浏览器也支持
2. mouseover/mouseout是**冒泡**事件；mouseenter/mouseleave**不冒泡**。需要为**多个元素监听鼠标移入/出事件时，推荐mouseover/mouseout托管，提高性能**
3. 标准事件模型中event.target表示发生移入/出的元素,**vent.relatedTarget**对应移出/如元素；在老IE中event.srcElement表示发生移入/出的元素，**event.toElement**表示移出的目标元素，**event.fromElement**表示移入时的来源元素

例子：鼠标从div#target元素移出时进行处理，判断逻辑如下：

    <div id="target"><span>test</span></div>

    <script type="text/javascript">
    var target = document.getElementById('target');
    if (target.addEventListener) {
      target.addEventListener('mouseout', mouseoutHandler, false);
    } else if (target.attachEvent) {
      target.attachEvent('onmouseout', mouseoutHandler);
    }

    function mouseoutHandler(e) {
      e = e || window.event;
      var target = e.target || e.srcElement;

      // 判断移出鼠标的元素是否为目标元素
      if (target.id !== 'target') {
        return;
      }

      // 判断鼠标是移出元素还是移到子元素
      var relatedTarget = event.relatedTarget || e.toElement;
      while (relatedTarget !== target
        && relatedTarget.nodeName.toUpperCase() !== 'BODY') {
        relatedTarget = relatedTarget.parentNode;
      }

      // 如果相等，说明鼠标在元素内部移动
      if (relatedTarget === target) {
        return;
      }

      // 执行需要操作
      //alert('鼠标移出');

    }
    </script>

### sessionStorage,localStorage,cookie区别

1. 都会在浏览器端保存，有大小限制，同源限制
2. cookie会在请求时发送到服务器，作为会话标识，服务器可修改cookie；web storage不会发送到服务器
3. cookie有path概念，子路径可以访问父路径cookie，父路径不能访问子路径cookie
4. 有效期：cookie在设置的有效期内有效，默认为浏览器关闭；sessionStorage在窗口关闭前有效，localStorage长期有效，直到用户删除
5. 共享：sessionStorage不能共享，localStorage在同源文档之间共享，cookie在同源且符合path规则的文档之间共享
6. localStorage的修改会促发其他文档窗口的update事件
7. cookie有secure属性要求HTTPS传输
8. 浏览器不能保存超过300个cookie，单个服务器不能超过20个，每个cookie不能超过4k。web storage大小支持能达到5M

### javascript跨域通信
同源：两个文档同源需满足

1. 协议相同
2. 域名相同
3. 端口相同

跨域通信：js进行DOM操作、通信时如果目标与当前窗口不满足同源条件，浏览器为了安全会阻止跨域操作。跨域通信通常有以下方法

- 如果是log之类的简单**单项通信**，新建``<img>``,``<script>``,``<link>``,``<iframe>``元素，通过src，href属性设置为目标url。实现跨域请求
- 如果请求**json数据**，使用``<script>``进行jsonp请求
- 现代浏览器中**多窗口通信**使用HTML5规范的targetWindow.postMessage(data, origin);其中data是需要发送的对象，origin是目标窗口的origin。window.addEventListener('message', handler, false);handler的event.data是postMessage发送来的数据，event.origin是发送窗口的origin，event.source是发送消息的窗口引用
- 内部服务器代理请求跨域url，然后返回数据
- 跨域请求数据，现代浏览器可使用HTML5规范的CORS功能，只要目标服务器返回HTTP头部**``Access-Control-Allow-Origin: *``**即可像普通ajax一样访问跨域资源

### javascript有哪几种数据类型
六种基本数据类型

- undefined
- null
- string
- boolean
- number
- [symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol)(ES6)

一种引用类型

- Object

### 什么闭包,闭包有什么用
**闭包是在某个作用域内定义的函数，它可以访问这个作用域内的所有变量**。闭包作用域链通常包括三个部分：

1. 函数本身作用域。
2. 闭包定义时的作用域。
3. 全局作用域。

闭包常见用途：

1. 创建特权方法用于访问控制
2. 事件处理程序及回调

### javascript有哪几种方法定义函数

1. [函数声明表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)
2. [function操作符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
3. [Function 构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
4. [ES6:arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/arrow_functions)

重要参考资料：[MDN:Functions_and_function_scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope)

### 应用程序存储和离线web应用
HTML5新增应用程序缓存，允许web应用将应用程序自身保存到用户浏览器中，用户离线状态也能访问。
1.为html元素设置manifest属性:``<html manifest="myapp.appcache">``，其中后缀名只是一个约定，真正识别方式是通过``text/cache-manifest``作为MIME类型。所以需要配置服务器保证设置正确
2.manifest文件首行为``CACHE MANIFEST``，其余就是要缓存的URL列表，每个一行，相对路径都相对于manifest文件的url。注释以#开头
3.url分为三种类型：``CACHE``:为默认类型。``NETWORK``：表示资源从不缓存。 ``FALLBACK``:每行包含两个url，第二个URL是指需要加载和存储在缓存中的资源， 第一个URL是一个前缀。任何匹配该前缀的URL都不会缓存，如果从网络中载入这样的URL失败的话，就会用第二个URL指定的缓存资源来替代。以下是一个文件例子：

```
CACHE MANIFEST

CACHE:
myapp.html
myapp.css
myapp.js

FALLBACK:
videos/ offline_help.html

NETWORK:
cgi/
```

### 客户端存储localStorage和sessionStorage

- localStorage有效期为永久，sessionStorage有效期为顶层窗口关闭前
- 同源文档可以读取并修改localStorage数据，sessionStorage只允许同一个窗口下的文档访问，如通过iframe引入的同源文档。
- Storage对象通常被当做普通javascript对象使用：**通过设置属性来存取字符串值**，也可以通过**setItem(key, value)设置**，**getItem(key)读取**，**removeItem(key)删除**，**clear()删除所有数据**，**length表示已存储的数据项数目**，**key(index)返回对应索引的key**

```
localStorage.setItem('x', 1); // storge x->1
localStorage.getItem('x); // return value of x

// 枚举所有存储的键值对
for (var i = 0, len = localStorage.length; i < len; ++i ) {
    var name = localStorage.key(i);
    var value = localStorage.getItem(name);
}

localStorage.removeItem('x'); // remove x
localStorage.clear();  // remove all data
```

### cookie及其操作

- cookie是web浏览器存储的少量数据，最早设计为服务器端使用，作为HTTP协议的扩展实现。cookie数据会自动在浏览器和服务器之间传输。
- 通过读写cookie检测是否支持
- cookie属性有**名**，**值**，**max-age**，**path**, **domain**，**secure**；
- cookie默认有效期为浏览器会话，一旦用户关闭浏览器，数据就丢失，通过设置**max-age=seconds**属性告诉浏览器cookie有效期
- cookie作用域通过**文档源**和**文档路径**来确定，通过**path**和**domain**进行配置，web页面同目录或子目录文档都可访问
- 通过cookie保存数据的方法为：为document.cookie设置一个符合目标的字符串如下
- 读取document.cookie获得'; '分隔的字符串，key=value,解析得到结果

```
document.cookie = 'name=qiu; max-age=9999; path=/; domain=domain; secure';

document.cookie = 'name=aaa; path=/; domain=domain; secure';
// 要改变cookie的值，需要使用相同的名字、路径和域，新的值
// 来设置cookie，同样的方法可以用来改变有效期

// 设置max-age为0可以删除指定cookie

//读取cookie，访问document.cookie返回键值对组成的字符串，
//不同键值对之间用'; '分隔。通过解析获得需要的值
```

[cookieUtil.js](https://github.com/qiu-deqing/google/blob/master/module/js/cookieUtil.js)：自己写的cookie操作工具

### javascript有哪些方法定义对象

1. 对象字面量： `var obj = {};`
2. 构造函数： `var obj = new Object();`
3. Object.create(): `var obj = Object.create(Object.prototype);`

### ===运算符判断相等的流程是怎样的

1. 如果两个值不是相同类型，它们不相等
2. 如果两个值都是null或者都是undefined，它们相等
3. 如果两个值都是布尔类型true或者都是false，它们相等
4. 如果其中有一个是**NaN**，它们不相等
5. 如果都是数值型并且数值相等，他们相等， -0等于0
6. 如果他们都是字符串并且在相同位置包含相同的16位值，他它们相等；如果在长度或者内容上不等，它们不相等；两个字符串显示结果相同但是编码不同==和===都认为他们不相等
7. 如果他们指向相同对象、数组、函数，它们相等；如果指向不同对象，他们不相等

### ==运算符判断相等的流程是怎样的

1. 如果两个值类型相同，按照===比较方法进行比较
2. 如果类型不同，使用如下规则进行比较
  1. 如果其中一个值是null，另一个是undefined，它们相等
  2. 如果一个值是**数字**另一个是**字符串**，将**字符串转换为数字**进行比较
  3. 如果有布尔类型，将**true转换为1，false转换为0**，然后用==规则继续比较
  4. 如果一个值是对象，另一个是数字或字符串，将对象转换为原始值然后用==规则继续比较
  5. **其他所有情况都认为不相等**

### 对象到字符串的转换步骤

1. 如果对象有toString()方法，javascript调用它。如果返回一个原始值（primitive value如：string number boolean）,将这个值转换为字符串作为结果
2. 如果对象没有toString()方法或者返回值不是原始值，javascript寻找对象的valueOf()方法，如果存在就调用它，返回结果是原始值则转为字符串作为结果
3. 否则，javascript不能从toString()或者valueOf()获得一个原始值，此时throws a TypeError


### 对象到数字的转换步骤

    1. 如果对象有valueOf()方法并且返回元素值，javascript将返回值转换为数字作为结果
    2. 否则，如果对象有toString()并且返回原始值，javascript将返回结果转换为数字作为结果
    3. 否则，throws a TypeError

### <,>,<=,>=的比较规则

所有比较运算符都支持任意类型，但是**比较只支持数字和字符串**，所以需要执行必要的转换然后进行比较，转换规则如下:
1. 如果操作数是对象，转换为原始值：如果valueOf方法返回原始值，则使用这个值，否则使用toString方法的结果，如果转换失败则报错
2. 经过必要的对象到原始值的转换后，如果两个操作数都是字符串，按照字母顺序进行比较（他们的16位unicode值的大小）
3. 否则，如果有一个操作数不是字符串，**将两个操作数转换为数字**进行比较

### +运算符工作流程
1. 如果有操作数是对象，转换为原始值
2. 此时如果有**一个操作数是字符串**，其他的操作数都转换为字符串并执行连接
3. 否则：**所有操作数都转换为数字并执行加法**

### 函数内部arguments变量有哪些特性,有哪些属性,如何将它转换为数组

- arguments所有函数中都包含的一个局部变量，是一个类数组对象，对应函数调用时的实参。如果函数定义同名参数会在调用时覆盖默认对象
- arguments[index]分别对应函数调用时的实参，并且通过arguments修改实参时会同时修改实参
- arguments.length为实参的个数（Function.length表示形参长度）
- arguments.callee为当前正在执行的函数本身，使用这个属性进行递归调用时需注意this的变化
- arguments.caller为调用当前函数的函数（已被遗弃）
- 转换为数组：<code>var args = Array.prototype.slice.call(arguments, 0);</code>

### DOM事件模型是如何的,编写一个EventUtil工具类实现事件管理兼容

- DOM事件包含捕获（capture）和冒泡（bubble）两个阶段：捕获阶段事件从window开始触发事件然后通过祖先节点一次传递到触发事件的DOM元素上；冒泡阶段事件从初始元素依次向祖先节点传递直到window
- 标准事件监听elem.addEventListener(type, handler, capture)/elem.removeEventListener(type, handler, capture)：handler接收保存事件信息的event对象作为参数，event.target为触发事件的对象，handler调用上下文this为绑定监听器的对象，event.preventDefault()取消事件默认行为，event.stopPropagation()/event.stopImmediatePropagation()取消事件传递
- 老版本IE事件监听elem.attachEvent('on'+type, handler)/elem.detachEvent('on'+type, handler)：handler不接收event作为参数，事件信息保存在window.event中，触发事件的对象为event.srcElement，handler执行上下文this为window使用闭包中调用handler.call(elem, event)可模仿标准模型，然后返回闭包，保证了监听器的移除。event.returnValue为false时取消事件默认行为，event.cancleBubble为true时取消时间传播
- 通常利用事件冒泡机制托管事件处理程序提高程序性能。

```
/**
 * 跨浏览器事件处理工具。只支持冒泡。不支持捕获
 * @author  (qiu_deqing@126.com)
 */

var EventUtil = {
    getEvent: function (event) {
        return event || window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    // 返回注册成功的监听器，IE中需要使用返回值来移除监听器
    on: function (elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
            return handler;
        } else if (elem.attachEvent) {
            var wrapper = function () {
              var event = window.event;
              event.target = event.srcElement;
              handler.call(elem, event);
            };
            elem.attachEvent('on' + type, wrapper);
            return wrapper;
        }
    },
    off: function (elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler);
        }
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else if ('returnValue' in event) {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else if ('cancelBubble' in event) {
            event.cancelBubble = true;
        }
    },
    /**
     * keypress事件跨浏览器获取输入字符
     * 某些浏览器在一些特殊键上也触发keypress，此时返回null
     **/
     getChar: function (event) {
        if (event.which == null) {
            return String.fromCharCode(event.keyCode);  // IE
        }
        else if (event.which != 0 && event.charCode != 0) {
            return String.fromCharCode(event.which);    // the rest
        }
        else {
            return null;    // special key
        }
     }
};
```

### 评价一下三种方法实现继承的优缺点,并改进

```
function Shape() {}

function Rect() {}

// 方法1
Rect.prototype = new Shape();

// 方法2
Rect.prototype = Shape.prototype;

// 方法3
Rect.prototype = Object.create(Shape.prototype);

Rect.prototype.area = function () {
  // do something
};
```

方法1：

1. 优点：正确设置原型链实现继承
2. 优点：父类实例属性得到继承，原型链查找效率提高，也能为一些属性提供合理的默认值
3. 缺点：父类实例属性为引用类型时，不恰当地修改会导致所有子类被修改
4. 缺点：创建父类实例作为子类原型时，可能无法确定构造函数需要的合理参数，这样提供的参数继承给子类没有实际意义，当子类需要这些参数时应该在构造函数中进行初始化和设置
5. 总结：继承应该是继承方法而不是属性，为子类设置父类实例属性应该是通过在子类构造函数中调用父类构造函数进行初始化

方法2：

1. 优点：正确设置原型链实现继承
2. 缺点：父类构造函数原型与子类相同。修改子类原型添加方法会修改父类

方法3：

1. 优点：正确设置原型链且避免方法1.2中的缺点
2. 缺点：ES5方法需要注意兼容性

改进：

1. 所有三种方法应该在子类构造函数中调用父类构造函数实现实例属性初始化

```
function Rect() {
    Shape.call(this);
}
```


2. 用新创建的对象替代子类默认原型，设置``Rect.prototype.constructor = Rect;``保证一致性
3. 第三种方法的polyfill：

```
function create(obj) {
    if (Object.create) {
        return Object.create(obj);
    }

    function f() {};
    f.prototype = obj;
    return new f();
}
```

## $javascript编程部分

### 请用原生js实现一个函数,给页面制定的任意一个元素添加一个透明遮罩(透明度可变,默认0.2),使这个区域点击无效,要求兼容IE8+及各主流浏览器,遮罩层效果如下图所示:
![遮罩效果](img/element-mask.jpg)

```
<style>
#target {
    width: 200px;
    height: 300px;
    margin: 40px;
    background-color: tomato;
}
</style>

<div id="target"></div>

<script>
function addMask(elem, opacity) {
    opacity = opacity || 0.2;

    var rect = elem.getBoundingClientRect();
    var style = getComputedStyle(elem, null);

    var mask = document.createElement('div');
    mask.style.position = 'absolute';
    var marginLeft = parseFloat(style.marginLeft);
    mask.style.left = (elem.offsetLeft - marginLeft) + 'px';
    var marginTop = parseFloat(style.marginTop);
    mask.style.top = (elem.offsetTop - marginTop) + 'px';
    mask.style.zIndex = 9999;
    mask.style.opacity = '' + opacity;
    mask.style.backgroundColor = '#000';

    mask.style.width = (parseFloat(style.marginLeft) +
        parseFloat(style.marginRight) + rect.width) + 'px';
    mask.style.height = (parseFloat(style.marginTop) +
        parseFloat(style.marginBottom) + rect.height) + 'px';

    elem.parentNode.appendChild(mask);
}

var target = document.getElementById('target');
addMask(target);

target.addEventListener('click', function () {
    console.log('click');
}, false);
</script>
```

### 请用代码写出(今天是星期x)其中x表示当天是星期几,如果当天是星期一,输出应该是"今天是星期一"

```
var days = ['日','一','二','三','四','五','六'];
var date = new Date();

console.log('今天是星期' + days[date.getDay()]);
```

### 下面这段代码想要循环延时输出结果0 1 2 3 4,请问输出结果是否正确,如果不正确,请说明为什么,并修改循环内的代码使其输出正确结果

```
for (var i = 0; i < 5; ++i) {
  setTimeout(function () {
    console.log(i + ' ');
  }, 100);
}
```

不能输出正确结果，因为循环中setTimeout接受的参数函数通过闭包访问变量i。javascript运行环境为单线程，setTimeout注册的函数需要等待线程空闲才能执行，此时for循环已经结束，i值为5.五个定时输出都是5
修改方法：将setTimeout放在函数立即调用表达式中，将i值作为参数传递给包裹函数，创建新闭包

```
for (var i = 0; i < 5; ++i) {
  (function (i) {
    setTimeout(function () {
      console.log(i + ' ');
    }, 100);
  }(i));
}
```



### 现有一个Page类,其原型对象上有许多以post开头的方法(如postMsg);另有一拦截函数chekc,只返回ture或false.请设计一个函数,该函数应批量改造原Page的postXXX方法,在保留其原有功能的同时,为每个postXXX方法增加拦截验证功能,当chekc返回true时继续执行原postXXX方法,返回false时不再执行原postXXX方法

```
function Page() {}

Page.prototype = {
  constructor: Page,

  postA: function (a) {
    console.log('a:' + a);
  },
  postB: function (b) {
    console.log('b:' + b);
  },
  postC: function (c) {
    console.log('c:' + c);
  },
  check: function () {
    return Math.random() > 0.5;
  }
}

function checkfy(obj) {
  for (var key in obj) {
    if (key.indexOf('post') === 0 && typeof obj[key] === 'function') {
      (function (key) {
        var fn = obj[key];
        obj[key] = function () {
          if (obj.check()) {
            fn.apply(obj, arguments);
          }
        };
      }(key));
    }
  }
} // end checkfy()

checkfy(Page.prototype);

var obj = new Page();

obj.postA('checkfy');
obj.postB('checkfy');
obj.postC('checkfy');
```

### 完成下面的tool-tip
![xxx](img/tip-box.jpg)

### 编写javascript深度克隆函数deepClone

    function deepClone(obj) {
        var _toString = Object.prototype.toString;

        // null, undefined, non-object, function
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        // DOM Node
        if (obj.nodeType && 'cloneNode' in obj) {
            return obj.cloneNode(true);
        }

        // Date
        if (_toString.call(obj) === '[object Date]') {
            return new Date(obj.getTime());
        }

        // RegExp
        if (_toString.call(obj) === '[object RegExp]') {
            var flags = [];
            if (obj.global) { flags.push('g'); }
            if (obj.multiline) { flags.push('m'); }
            if (obj.ignoreCase) { flags.push('i'); }

            return new RegExp(obj.source, flags.join(''));
        }

        var result = Array.isArray(obj) ? [] :
            obj.constructor ? new obj.constructor() : {};

        for (var key in obj ) {
            result[key] = deepClone(obj[key]);
        }

        return result;
    }

    function A() {
        this.a = a;
    }

    var a = {
        name: 'qiu',
        birth: new Date(),
        pattern: /qiu/gim,
        container: document.body,
        hobbys: ['book', new Date(), /aaa/gim, 111]
    };

    var c = new A();
    var b = deepClone(c);
    console.log(c.a === b.a);
    console.log(c, b);

### 补充代码,鼠标单击Button1后将Button1移动到Button2的后面
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>TEst</title>
    </head>
    <body>

    <div>
       <input type="button" id ="button1" value="1" />
       <input type="button" id ="button2" value="2" />
    </div>

    <script type="text/javascript">
        var btn1 = document.getElementById('button1');
        var btn2 = document.getElementById('button2');

        addListener(btn1, 'click', function (event) {
            btn1.parentNode.insertBefore(btn2, btn1);
        });

        function addListener(elem, type, handler) {
            if (elem.addEventListener) {
                elem.addEventListener(type, handler, false);
                return handler;
            } else if (elem.attachEvent) {
                function wrapper() {
                    var event = window.event;
                    event.target = event.srcElement;
                    handler.call(elem, event);
                }
                elem.attachEvent('on' + type, wrapper);
                return wrapper;
            }
        }

    </script>
    </body>
    </html>

### 网页中实现一个计算当年还剩多少时间的倒数计时程序,要求网页上实时动态显示"××年还剩××天××时××分××秒"

    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>TEst</title>
    </head>
    <body>

        <span id="target"></span>


    <script type="text/javascript">
        // 为了简化。每月默认30天
        function getTimeString() {
            var start = new Date();
            var end = new Date(start.getFullYear() + 1, 0, 1);
            var elapse = Math.floor((end - start) / 1000);

            var seconds = elapse % 60 ;
            var minutes = Math.floor(elapse / 60) % 60;
            var hours = Math.floor(elapse / (60 * 60)) % 24;
            var days = Math.floor(elapse / (60 * 60 * 24)) % 30;
            var months = Math.floor(elapse / (60 * 60 * 24 * 30)) % 12;
            var years = Math.floor(elapse / (60 * 60 * 24 * 30 * 12));

            return start.getFullYear() + '年还剩' + years + '年' + months + '月' + days + '日'
                + hours + '小时' + minutes + '分' + seconds + '秒';
        }

        function domText(elem, text) {
            if (text == undefined) {

                if (elem.textContent) {
                    return elem.textContent;
                } else if (elem.innerText) {
                    return elem.innerText;
                }
            } else {
                if (elem.textContent) {
                    elem.textContent = text;
                } else if (elem.innerText) {
                    elem.innerText = text;
                } else {
                    elem.innerHTML = text;
                }
            }
        }

        var target = document.getElementById('target');

        setInterval(function () {
            domText(target, getTimeString());
        }, 1000)
    </script>

    </body>
    </html>

### 完成一个函数,接受数组作为参数,数组元素为整数或者数组,数组元素包含整数或数组,函数返回扁平化后的数组
如：[1, [2, [ [3, 4], 5], 6]] => [1, 2, 3, 4, 5, 6]

```
    var data =  [1, [2, [ [3, 4], 5], 6]];

    function flat(data, result) {
        var i, d, len;
        for (i = 0, len = data.length; i < len; ++i) {
            d = data[i];
            if (typeof d === 'number') {
                result.push(d);
            } else {
                flat(d, result);
            }
        }
    }

    var result = [];
    flat(data, result);

    console.log(result);
```

### 如何判断一个对象是否为数组
如果浏览器支持Array.isArray()可以直接判断否则需进行必要判断

```
/**
 * 判断一个对象是否是数组，参数不是对象或者不是数组，返回false
 *
 * @param {Object} arg 需要测试是否为数组的对象
 * @return {Boolean} 传入参数是数组返回true，否则返回false
 */
function isArray(arg) {
    if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}
```

### 请评价以下事件监听器代码并给出改进意见

```
if (window.addEventListener) {
  var addListener = function (el, type, listener, useCapture) {
    el.addEventListener(type, listener, useCapture);
  };
}
else if (document.all) {
  addListener = function (el, type, listener) {
    el.attachEvent('on' + type, function () {
      listener.apply(el);
    });
  };
}
```

作用：浏览器功能检测实现跨浏览器DOM事件绑定

优点：

1. 测试代码只运行一次，根据浏览器确定绑定方法
2. 通过``listener.apply(el)``解决IE下监听器this与标准不一致的地方
3. 在浏览器不支持的情况下提供简单的功能，在标准浏览器中提供捕获功能

缺点：

1. document.all作为IE检测不可靠，应该使用if(el.attachEvent)
2. addListener在不同浏览器下API不一样
3. ``listener.apply``使this与标准一致但监听器无法移除
4. 未解决IE下listener参数event。 target问题

改进:

```
var addListener;

if (window.addEventListener) {
  addListener = function (el, type, listener, useCapture) {
    el.addEventListener(type, listener, useCapture);
    return listener;
  };
}
else if (window.attachEvent) {
  addListener = function (el, type, listener) {
    // 标准化this，event，target
    var wrapper = function () {
      var event = window.event;
      event.target = event.srcElement;
      listener.call(el, event);
    };

    el.attachEvent('on' + type, wrapper);
    return wrapper;
    // 返回wrapper。调用者可以保存，以后remove
  };
}
```

### 如何判断一个对象是否为函数

```
/**
 * 判断对象是否为函数，如果当前运行环境对可调用对象（如正则表达式）
 * 的typeof返回'function'，采用通用方法，否则采用优化方法
 *
 * @param {Any} arg 需要检测是否为函数的对象
 * @return {boolean} 如果参数是函数，返回true，否则false
 */
function isFunction(arg) {
    if (arg) {
        if (typeof (/./) !== 'function') {
            return typeof arg === 'function';
        } else {
            return Object.prototype.toString.call(arg) === '[object Function]';
        }
    } // end if
    return false;
}
```

### 编写一个函数接受url中query string为参数,返回解析后的Object,query string使用application/x-www-form-urlencoded编码

```
/**
 * 解析query string转换为对象，一个key有多个值时生成数组
 *
 * @param {String} query 需要解析的query字符串，开头可以是?，
 * 按照application/x-www-form-urlencoded编码
 * @return {Object} 参数解析后的对象
 */
function parseQuery(query) {
    var result = {};

    // 如果不是字符串返回空对象
    if (typeof query !== 'string') {
        return result;
    }

    // 去掉字符串开头可能带的?
    if (query.charAt(0) === '?') {
        query = query.substring(1);
    }

    var pairs = query.split('&');
    var pair;
    var key, value;
    var i, len;

    for (i = 0, len = pairs.length; i < len; ++i) {
        pair = pairs[i].split('=');
        // application/x-www-form-urlencoded编码会将' '转换为+
        key = decodeURIComponent(pair[0]).replace(/\+/g, ' ');
        value = decodeURIComponent(pair[1]).replace(/\+/g, ' ');

        // 如果是新key，直接添加
        if (!(key in result)) {
            result[key] = value;
        }
        // 如果key已经出现一次以上，直接向数组添加value
        else if (isArray(result[key])) {
            result[key].push(value);
        }
        // key第二次出现，将结果改为数组
        else {
            var arr = [result[key]];
            arr.push(value);
            result[key] = arr;
        } // end if-else
    } // end for

    return result;
}

function isArray(arg) {
    if (arg && typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}
/**
console.log(parseQuery('sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8'));
 */
```

### 解析一个完整的url,返回Object包含域与window.location相同

```
/**
 * 解析一个url并生成window.location对象中包含的域
 * location:
 * {
 *      href: '包含完整的url',
 *      origin: '包含协议到pathname之前的内容',
 *      protocol: 'url使用的协议，包含末尾的:',
 *      username: '用户名', // 暂时不支持
 *      password: '密码',  // 暂时不支持
 *      host: '完整主机名，包含:和端口',
 *      hostname: '主机名，不包含端口'
 *      port: '端口号',
 *      pathname: '服务器上访问资源的路径/开头',
 *      search: 'query string，?开头',
 *      hash: '#开头的fragment identifier'
 * }
 *
 * @param {string} url 需要解析的url
 * @return {Object} 包含url信息的对象
 */
function parseUrl(url) {
    var result = {};
    var keys = ['href', 'origin', 'protocol', 'host',
                'hostname', 'port', 'pathname', 'search', 'hash'];
    var i, len;
    var regexp = /(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/;

    var match = regexp.exec(url);

    if (match) {
        for (i = keys.length - 1; i >= 0; --i) {
            result[keys[i]] = match[i] ? match[i] : '';
        }
    }

    return result;
}
```

### 完成函数getViewportSize返回指定窗口的视口尺寸

```
/**
* 查询指定窗口的视口尺寸，如果不指定窗口，查询当前窗口尺寸
**/
function getViewportSize(w) {
    w = w || window;

    // IE9及标准浏览器中可使用此标准方法
    if ('innerHeight' in w) {
        return {
            width: w.innerWidth,
            height: w.innerHeight
        };
    }

    var d = w.document;
    // IE 8及以下浏览器在标准模式下
    if (document.compatMode === 'CSS1Compat') {
        return {
            width: d.documentElement.clientWidth,
            height: d.documentElement.clientHeight
        };
    }

    // IE8及以下浏览器在怪癖模式下
    return {
        width: d.body.clientWidth,
        height: d.body.clientHeight
    };
}
```

### 完成函数getScrollOffset返回窗口滚动条偏移量

    /**
     * 获取指定window中滚动条的偏移量，如未指定则获取当前window
     * 滚动条偏移量
     *
     * @param {window} w 需要获取滚动条偏移量的窗口
     * @return {Object} obj.x为水平滚动条偏移量,obj.y为竖直滚动条偏移量
     */
    function getScrollOffset(w) {
        w =  w || window;
        // 如果是标准浏览器
        if (w.pageXOffset != null) {
            return {
                x: w.pageXOffset,
                y: w.pageYOffset
            };
        }

        // 老版本IE，根据兼容性不同访问不同元素
        var d = w.document;
        if (d.compatMode === 'CSS1Compat') {
            return {
                x: d.documentElement.scrollLeft,
                y: d.documentElement.scrollTop
            }
        }

        return {
            x: d.body.scrollLeft,
            y: d.body.scrollTop
        };
    }


### 现有一个字符串richText,是一段富文本,需要显示在页面上.有个要求,需要给其中只包含一个img元素的p标签增加一个叫pic的class.请编写代码实现.可以使用jQuery或KISSY.

    function richText(text) {
        var div = document.createElement('div');
        div.innerHTML = text;
        var p = div.getElementsByTagName('p');
        var i, len;

        for (i = 0, len = p.length; i < len; ++i) {
            if (p[i].getElementsByTagName('img').length === 1) {
                p[i].classList.add('pic');
            }
        }

        return div.innerHTML;
    }

### 请实现一个Event类,继承自此类的对象都会拥有两个方法on,off,once和trigger


    function Event() {
        if (!(this instanceof Event)) {
            return new Event();
        }
        this._callbacks = {};
    }
    Event.prototype.on = function (type, handler) {
        this_callbacks = this._callbacks || {};
        this._callbacks[type] = this.callbacks[type] || [];
        this._callbacks[type].push(handler);

        return this;
    };

    Event.prototype.off = function (type, handler) {
        var list = this._callbacks[type];

        if (list) {
            for (var i = list.length; i >= 0; --i) {
                if (list[i] === handler) {
                    list.splice(i, 1);
                }
            }
        }

        return this;
    };

    Event.prototype.trigger = function (type, data) {
        var list = this._callbacks[type];

        if (list) {
            for (var i = 0, len = list.length; i < len; ++i) {
                list[i].call(this, data);
            }
        }
    };

    Event.prototype.once = function (type, handler) {
        var self = this;

        function wrapper() {
            handler.apply(self, arguments);
            self.off(type, wrapper);
        }
        this.on(type, wrapper);
        return this;
    };

### 编写一个函数将列表子元素顺序反转

```
<ul id="target">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>

<script>
    var target = document.getElementById('target');
    var i;
    var frag = document.createDocumentFragment();

    for (i = target.children.length - 1; i &gt;= 0; --i) {
        frag.appendChild(target.children[i]);
    }
    target.appendChild(frag);
</script>
```

### 以下函数的作用是?空白区域应该填写什么

```
// define
(function (window) {
    function fn(str) {
        this.str = str;
    }

    fn.prototype.format = function () {
        var arg = __1__;
        return this.str.replace(__2__, function (a, b) {
            return arg[b] || '';
        });
    };

    window.fn = fn;
})(window);

// use
(function () {
    var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
    console.log(t.format('http://www.alibaba.com', 'Alibaba', 'Welcome'));
})();
```

define部分定义一个简单的模板类，使用{}作为转义标记，中间的数字表示替换目标，format实参用来替换模板内标记
横线处填：

1. ``Array.prototype.slice.call(arguments, 0)``
2. ``/\{\s*(\d+)\s*\}/g``

### 编写一个函数实现form的序列化(即将一个表单中的键值序列化为可提交的字符串)


    <form id="target">
        <select name="age">
            <option value="aaa">aaa</option>
            <option value="bbb" selected>bbb</option>
        </select>
        <select name="friends" multiple>
            <option value="qiu" selected>qiu</option>
            <option value="de">de</option>
            <option value="qing" selected>qing</option>
        </select>
        <input name="name" value="qiudeqing">
        <input type="password" name="password" value="11111">
        <input type="hidden" name="salery" value="3333">
        <textarea name="description">description</textarea>
        <input type="checkbox" name="hobby" checked value="football">Football
        <input type="checkbox" name="hobby" value="basketball">Basketball
        <input type="radio" name="sex" checked value="Female">Female
        <input type="radio" name="sex" value="Male">Male
    </form>


    <script>

    /**
     * 将一个表单元素序列化为可提交的字符串
     *
     * @param {FormElement} form 需要序列化的表单元素
     * @return {string} 表单序列化后的字符串
     */
    function serializeForm(form) {
      if (!form || form.nodeName.toUpperCase() !== 'FORM') {
        return;
      }

      var result = [];

      var i, len;
      var field, fieldName, fieldType;

      for (i = 0, len = form.length; i < len; ++i) {
        field = form.elements[i];
        fieldName = field.name;
        fieldType = field.type;

        if (field.disabled || !fieldName) {
          continue;
        } // enf if

        switch (fieldType) {
          case 'text':
          case 'password':
          case 'hidden':
          case 'textarea':
            result.push(encodeURIComponent(fieldName) + '=' +
                encodeURIComponent(field.value));
            break;

          case 'radio':
          case 'checkbox':
            if (field.checked) {
              result.push(encodeURIComponent(fieldName) + '=' +
                encodeURIComponent(field.value));
            }
            break;

          case 'select-one':
          case 'select-multiple':
            for (var j = 0, jLen = field.options.length; j < jLen; ++j) {
              if (field.options[j].selected) {
                result.push(encodeURIComponent(fieldName) + '=' +
                  encodeURIComponent(field.options[j].value || field.options[j].text));
              }
            } // end for
            break;

          case 'file':
          case 'submit':
            break; // 是否处理？

          default:
            break;
        } // end switch
      } // end for

        return result.join('&');
    }

    var form = document.getElementById('target');
    console.log(serializeForm(form));
    </script>

### 使用原生javascript给下面列表中的li节点绑定点击事件,点击时创建一个Object对象,兼容IE和标准浏览器

```
<ul id="nav">
    <li><a href="http://11111">111</a></li>
    <li><a href="http://2222">222</a></li>
    <li><a href="http://333">333</a></li>
    <li><a href="http://444">444</a></li>
</ul>

Object:
{
    "index": 1,
    "name": "111",
    "link": "http://1111"
}
```

script:

```
var EventUtil = {
    getEvent: function (event) {
        return event || window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    // 返回注册成功的监听器，IE中需要使用返回值来移除监听器
    on: function (elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
            return handler;
        } else if (elem.attachEvent) {
            function wrapper(event) {
                return handler.call(elem, event);
            };
            elem.attachEvent('on' + type, wrapper);
            return wrapper;
        }
    },
    off: function (elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler);
        }
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else if ('returnValue' in event) {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else if ('cancelBubble' in event) {
            event.cancelBubble = true;
        }
    }
};
var DOMUtil = {
    text: function (elem) {
        if ('textContent' in elem) {
            return elem.textContent;
        } else if ('innerText' in elem) {
            return elem.innerText;
        }
    },
    prop: function (elem, propName) {
        return elem.getAttribute(propName);
    }
};

var nav = document.getElementById('nav');

EventUtil.on(nav, 'click', function (event) {
    var event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    var children = this.children;
    var i, len;
    var anchor;
    var obj = {};

    for (i = 0, len = children.length; i < len; ++i) {
        if (children[i] === target) {
            obj.index = i + 1;
            anchor = target.getElementsByTagName('a')[0];
            obj.name = DOMUtil.text(anchor);
            obj.link = DOMUtil.prop(anchor, 'href');
        }
    }

    alert('index: ' + obj.index + ' name: ' + obj.name +
        ' link: ' + obj.link);
});
```

### 有一个大数组,var a = ['1', '2', '3', ...];a的长度是100,内容填充随机整数的字符串.请先构造此数组a,然后设计一个算法将其内容去重

```
    /**
    * 数组去重
    **/
    function normalize(arr) {
        if (arr && Array.isArray(arr)) {
            var i, len, map = {};
            for (i = arr.length; i >= 0; --i) {
                if (arr[i] in map) {
                    arr.splice(i, 1);
                } else {
                    map[arr[i]] = true;
                }
            }
        }
        return arr;
    }

    /**
    * 用100个随机整数对应的字符串填充数组。
    **/
    function fillArray(arr, start, end) {
        start = start == undefined ? 1 : start;
        end = end == undefined ?  100 : end;

        if (end <= start) {
            end = start + 100;
        }

        var width = end - start;
        var i;
        for (i = 100; i >= 1; --i) {
            arr.push('' + (Math.floor(Math.random() * width) + start));
        }
        return arr;
    }

    var input = [];
    fillArray(input, 1, 100);
    input.sort(function (a, b) {
        return a - b;
    });
    console.log(input);

    normalize(input);
    console.log(input);
```


6，javascript面向对象中继承实现
1. 我们创建的每个**函数**都有一个prototype（原型）属性，**这个属性是一个指针，指向一个对象**，而这个对象的**用途**是包含可以由特定类型的所有实例共享的属性和方法。
2. 创建一个类，让其prototype指向另一个实例，类继承，（extends）；
3. 对象直接继承，创建Object.create， Object.assign（所有**可枚举属性**的值从一个或多个源对象复制到目标对象），不可以扩展原型上的属性
```
   function P() {}
   P.prototype.alert = function(){alert(this.name)}
   var xm = new P();
   Object.assign({}, xm)
```


10，写出3个使用this的典型应用

1. 事件引用当前的元素；
2. 函数的this拿到当前的执行上下文环境；
3. 构造函数创建对象。


13，JavaScript中如何检测一个变量是一个String类型？请写出函数实现
typeof str;
str instanceof String; // 前边需要是一个对象， instanceof对基本数据类型不起作用，因为基本数据类型没有原型链。
toString;



21，请编写一个JavaScript函数 parseQueryString，它的用途是把URL参数解析为一个对象，如：
正则匹配
function parseQueryString(argu){
  var str = argu.split('?')[1];
  var result = {};
  var temp = str.split('&');
  for(var i=0; i<temp.length; i++)
  {
     var temp2 = temp[i].split('=');
     result[temp2[0]] = temp2[1];
  }
  return result;
}


# js笔试面试题



### 1. 实现一个bind函数

借助于apply方法实现bind函数

```
//编写函数
function bindThis (func, context) {
    return function () {
        return func.apply(context, arguments);
    }
}
// 调用，生成bind函数
var newFunc = bindThis(function(a, b){
	return this.test + a + b
}, {test: 1});
// 使用bind函数
newFunc(2, 3);
```



### 2. 解析url参数（借助location对象）

```
//借助于浏览器内置的方法，a标签的href属性
function parseURL(url) {  
 	var a =  document.createElement('a');  
 	a.href = url;  
 	return {  
 		source: url,  
 		protocol: a.protocol.replace(':',''),  
 		host: a.hostname,  
 		port: a.port,  
 		query: a.search,  
		params: (function(){  
     		var ret = {},  
        	seg = a.search.replace(/^\?/,'').split('&'),  
        	len = seg.length, i = 0, s;  
    		for (;i<len;i++) {  
         		if (!seg[i]) { continue; }  
         		s = seg[i].split('=');  
         		ret[s[0]] = s[1];  
     		}  
     		return ret;  
 		})(),  
 		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],  
 		hash: a.hash.replace('#',''),  
 		path: a.pathname.replace(/^([^\/])/,'/$1'),  
 		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],  
 		segments: a.pathname.replace(/^\//,'').split('/')  
 	};  
}    
var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');  
//var myURL = parseURL('http://localhost:8080/test/mytest/toLogina.ction?m=123&pid=abc');  
console.log(myURL);
```



### 3. 共同节点查找（查找算法）

```
// 总共有三种情况，1包含2， 2包含1， 1与2平级
function commonParentNode(oNode1, oNode2) {
    if(oNode1.contains(oNode2)){
        return oNode1;
    }else{
        return arguments.callee(oNode1.parentNode,oNode2);
    }
}
```



### 4. 数组去重算法

1. ES6语法set数据结构

   ```
   Array.prototype.uniq = function (arr) {
   	return [...new Set(arr)]
   };
   ```

2. 生成新的数组，（具体的细节，数据类型还需要深刻讨论，null，NaN，Data对象，对象类型等）

   ```
   Array.prototype.uniq = function () {
      var resArr = [];
      var flag = true;
        
      for(var i=0;i<this.length;i++){
          if(resArr.indexOf(this[i]) == -1){
              if(this[i] != this[i]){   //排除 NaN ，只需要排除NaN就好了 ,这里是判断指向同一个位置，或者同一个数是否相等。
                 if(flag){
                      resArr.push(this[i]);
                      flag = false;
                 }
              }else{
                   resArr.push(this[i]);
              }
          }
      }
       return resArr;
   }
   ```



### 5.  斐波那契数列的实现

1. 使用深层遍历生成

    ```
    //用 JavaScript 实现斐波那契数列函数,返回第n个斐波那契数。 f(1) = 1, f(2) = 1 等
    function fibonacci(n) {
        if(n<0){
            return -1;
        }else if(n < 2){
            return n;
        }else{      
           return arguments.callee(n-1) + arguments.callee(n-2);
        }
    }
    //如下打印出这个数组，不过迭代太深，浏览器可能不执行
    function resArr(len){
        var arr = [];
        for(var i=1;i<len+1;i++){
            arr.push(fibonacci(i));
        }
        return arr;
    }

    resArr(10);
    ```

2. 将结果保存起来，以备后用，降低空间复杂度

   ```
   // 缓存上一步的计算结果，闭包函数也就是自带一部分变量的函数
   var fibonacci = (function () {
       var memory = {};    
       return function(n) {
       	console.log("memory:", memory);
           if(n==0 || n == 1) {
               return n
           }
           if(memory[n-2] === undefined) {
               memory[n-2] = fibonacci(n-2)
           }
           if(memory[n-1] === undefined) {
               memory[n-1] = fibonacci(n-1)
           }
           return memory[n] = memory[n-1] + memory[n-2]
       }
   })()
   //如下打印出这个数组，不过迭代太深，浏览器可能不执行
   function resArr(len){
       var arr = [];
       for(var i=1;i<len+1;i++){
           arr.push(fibonacci(i));
       }
       return arr;
   }
   console.log(resArr(10));
   ```

   ​


### 6. 格式化时间

```
function formatDate(t,str){
    var obj = {
        yyyy:t.getFullYear(),//返回年份
        yy:(""+ t.getFullYear()).slice(-2),//返回四位年份的后两位
        M:t.getMonth()+1,//返回月份，需要加1
        MM:("0"+ (t.getMonth()+1)).slice(-2),//机智，如果本来就是两位就会变成三围，截取后两位，依然是两位表示。
        d:t.getDate(),//返回是几号
        dd:("0" + t.getDate()).slice(-2),
        H:t.getHours(),//返回小时数，24小时计算
        HH:("0" + t.getHours()).slice(-2),
        h:t.getHours() % 12,//返回十二小时计
        hh:("0"+t.getHours() % 12).slice(-2),
        m:t.getMinutes(),//返回分钟数
        mm:("0" + t.getMinutes()).slice(-2),
        s:t.getSeconds(),//返回秒数
        ss:("0" + t.getSeconds()).slice(-2),
        w:['日', '一', '二', '三', '四', '五', '六'][t.getDay()] //这里的getDay()方法返回的是0到6表示的数字，所以可以这样来表示星期几。
    };
    return str.replace(/([a-z]+)/ig,function($1){return obj[$1]}); //依次更改匹配到的连着的字符串
}
// 测试
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w');
```



### 7. 颜色值转换函数

```
function rgb2hex(sRGB) {
    var regexp=/rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    var ret=sRGB.match(regexp);
    if(!ret){
        return sRGB;
    }else{
        var str='#';
        for(var i=1;i<=3;i++){
            var m=parseInt(ret[i]);
            if(m<=255&&m>=0){
            	// 十进制转16进制
                str+=(m<16?'0'+m.toString(16):m.toString(16));
            }else{
                return sRGB;
            }
        }
        return str;
    }
}
rgb2hex('rgb(255, 255, 255)')
#ffffff
```



### 8. 横杠转驼峰

```
function cssStyle2DomStyle(sName) {
    var reg1 = /^-/g;
    var newsName = sName.replace(reg1,'');
    var reg = /-(\w)/g;
    return newsName.replace(reg,function($,$1){  
        return $1.toUpperCase();
    })
}
cssStyle2DomStyle('font-size')
fontSize
```

### 考察this

```
var length = 10;
function fn() {
	console.log(this.length);
}
var obj = {
    length: 5,
    method: function(fn) {
        fn();
        arguments[0]();
    }
};
obj.method(fn, 1);
// 输出：10 2
// 第一次输出10应该没有问题。我们知道取对象属于除了点操作符还可以用中括号，
// 所以第二次执行时相当于arguments调用方法，this指向arguments，而这里传了两个参数，故输出arguments长度为2。
```


## js的类型检测
typeof的结果有: 'number', 'string', 'object', 'undefined', 'boolean', 'function';
实际的js类型有: string, number, boolean, undefined, null, object;

### 检测json类型对象

### 检测数组



## 闭包问题

```
// 都输出10
for (var i = 0; i < 10; ++i) {
    setTimeout(function () {console.log(i)}, 0);
}
// 依次输出
for (var i = 0; i < 10; ++i) {
  (function(i) {
    setTimeout(function () {console.log(i)}, 0);
  })(i);
}
```

## 严格模式 'use strict

### 在JavaScript源文件的开头包含'use strict'的意义和有什么好处？

这里最简单也是最重要的答案是use strict是一种在运行时自动执行更严格的JavaScript代码解析和错误处理的方法。如果代码错误被忽略或失败，将会产生错误或抛出异常。总的来说，这是一个很好的做法。

严格模式的一些主要优点包括：

- 使调试更容易。 如果代码错误本来会被忽略或失败，那么现在将会产生错误或抛出异常，从而更快地发现代码中的问题，并更快地指引它们的源代码。

- 防止意外全局。 如果没有严格模式，将值赋给未声明的变量会自动创建一个具有该名称的全局变量。这是JavaScript中最常见的错误之一。在严格模式下，尝试这样做会引发错误。

- 消除隐藏威胁。在没有严格模式的情况下，对null或undefined的这个值的引用会自动强制到全局。这可能会导致许多headfakes和pull-out-your-hair类型的错误。在严格模式下，引用null或undefined的这个值会引发错误。

- 不允许重复的参数值。 严格模式在检测到函数的重复命名参数（例如，函数foo（val1，val2，val1）{}）时会引发错误，从而捕获代码中几乎可以肯定存在的错误，否则您可能会浪费大量的时间追踪。

注意：它曾经是（在ECMAScript 5中）strict模式将禁止重复的属性名称（例如var object = {foo：“bar”，foo：“baz”};）但是从ECMAScript 2015 开始，就不再有这种情况了。

- 使eval()更安全。  eval()在严格模式和非严格模式下的行为方式有些不同。最重要的是，在严格模式下，在eval()语句内部声明的变量和函数不会在包含范围中创建（它们是以非严格模式在包含范围中创建的，这也可能是问题的常见来源）。

- 抛出无效的使用错误的删除符。 删除操作符（用于从对象中删除属性）不能用于对象的不可配置属性。当试图删除一个不可配置的属性时，非严格代码将自动失败，而在这种情况下，严格模式会引发错误。


## Number相关

### 浮点数相加的问题

一个典型的解决方案是比较两个数字与特殊常数Number.EPSILON之间的绝对差值：
```
function areTheNumbersAlmostEqual(num1, num2) {
  return Math.abs( num1 - num2 ) < Number.EPSILON;
}
console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));
```



### 闭包

**有权访问另一个函数作用域中变量的函数。**最常用创建方式，在一个函数内部创建并返回一个函数。

#### 存在的意义：

函数执行过程就需要在**作用域链**中查找变量，**查找过程不能向下，所以就需要闭包来读取函数内部的变量**。闭包会让外层函数的变量一直存在于内存中。直到都不调用为止。

闭包通常用来创建内部变量，使得这些变量不能被外部随意修改，同时又可以通过指定的函数接口来操作。

**应用场景：**

1. 闭包的典型框架应该就是**jquery**了。
2. 闭包是javascript语言的一大特点，主要应用闭包场合主要是为了：**设计私有的方法和变量（模块设计，自执行闭包）。**
3. 这在做框架的时候体现更明显，**有些方法和属性只是运算逻辑过程中的使用的，不想让外部修改这些属性**，因此就可以设计一个闭包来只提供方法获取。

### 说明

1. 本质还是一个函数，只不过绑定了上下文环境（函数内部引用的所有变量）。
2. 在函数式编程中，闭包的逻辑就是：【让程序运行环境来管理状态】，执行闭包的时候，逻辑和上下文是关联的。
3. 闭包的特点很鲜明，闭包内，变量无法释放，无法被直接访问；臂包可以延迟执行。



# Interview questions

## JS

### 原型与原型链的理解

- 我们创建的每个**函数**都有一个prototype（原型）属性，**这个属性是一个指针，指向一个对象**，而这个对象的**用途**是包含可以由特定类型的所有实例共享的属性和方法。
- 使用原型对象的好处，就是可以让所有这个构造函数创建的实例对象，**共享**这个构造函数包含的属性和方法。
- 这个函数的原型对象的**constructor属性**指向创建自己的构造函数。
- 实例对象的`__proto__`指向构造函数的原型。
- 使用`Object.getPrototypeof(person1)`可以获取实例对象person1的原型。


#### 原型链

每当代码读取某个对象的某个属性的时候，**都会执行一次搜索**，目标是**具有给定名字的属性**。

- 搜索首先从实例对象的本身开始，如果在实例对象中找到这个属性就返回；
- 如果没找到，则继续搜索指针指向的原型对象，在原型对象中查找具名属性，如果找到就返回这个属性；
- 如果还是没找到就会继续向上查找继承的实例对象（继承的话对应就是本身实例的原型）是否有这个属性，找到就返回；
- 如果还是找不到就查找继承实例的原型，依次向上查找，这就是原型链查找。
- 就近原则，屏蔽高层的属性值。子实例的属性方法屏蔽原型上的实例和方法。
- `hasOwnPrototype`方法返回是否要检测的属性值是**实例属性（返回true）**还是**原型属性（返回false）**。

```
var obj = {};
undefined
obj.constructor 
// 使用Object构造函数创建的实例的构造函数指向Object构造函数，一般对象的构造函数指向自己的构造函数
ƒ Object() { [native code] }
obj.constructor.prototype
// Object构造函数的原型指向的是Object构造函数的原型对象
{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
obj.constructor.__proto__.constructor
// 也就是Object的构造函数的原型的构造函数是Function构造函数（函数对象的构造函数）
ƒ Function() { [native code] }
```

- ```
  这就是原型链的末尾，即 null
  ```

#### 继承

JavaScript 中的继承**通过原型继承实现**：**一个对象直接从另一对象继承**。**对象中包含其继承体系中祖先的引用**——对象的 prototype 属性，对应Object.create(parentObj)。

**继承是继承对象，原型继承就是原型指向要继承的对象。**

### 调用一次new需要执行的事情

参见MDN：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new

**new 运算符**创建一个**用户定义的对象类型的实例**或**具有构造函数的内置对象的实例**。

**当代码 `new `*Foo*`(...)` 执行时，会发生以下事情：**

1. 一个**继承**自 *Foo*`.prototype` 的**新对象被创建（**create**）**。
2. **使用指定的参数调用构造函数** `Foo` ，**并将 `this` 绑定到新创建的对象**。`new *Foo*` 等同于 `new `*Foo*`()`，也就是没有指定参数列表，*Foo* 不带任何参数调用的情况。
3. **由构造函数返回的对象就是 `new` 表达式的结果**。**如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。**（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，**来覆盖正常的对象创建步骤**）

#### 使用new与不使用new调用一个函数的执行的异同

1. 使用new方法**最终会返回当前创建的对象**，不使用new方法，**最终只会是一个函数调用**，返回结果依据构造函数内的返回说明。
2. **使用new会创建一个对象（函数上下文执行环境在当前对象，this指向当前对象）**，不使用new的时候，只是**创建了几个全局变量**（this指向全局）。
3. 当使用new 关键字来调用构造函数时，**执行上下文从全局对象（window）变成一个空的上下文，这个上下文代表了新生成的实例**。因此，this 关键字指向当前创建的实例。
4. 默认情况下，如果你的构造函数中没有返回任何内容，就会返回this——当前的上下文。

### JS作用域问题理解

**作用域是创建的时候决定的，作用域链是在执行的时候关联起来的。**

JS有如下的作用域类型：

- 全局作用域window或者global；
- 函数作用域（常用闭包来构造块作用域）；（**当代码在一个环境中执行时**，会创建**变量对象的一个作用域链**（scope chain）。），**函数作用域在函数创建的时候创建**，全局作用域就是在创建全局对象的时候创建。
- let声明的块作用域（ES6）。
  可以使用**自执行语句**来模拟块级作用域。

#### 作用域链

**作用域链**的作用是：是**保证对执行环境有权访问的所有变量和函数的有序访问**。






### this

this对象在运行时是基于**函数的执行环境绑定的**：

- 在全局函数中，this等于window，
- 当函数被当作某个对象的方法调用的时候，this等于那个对象，
- 非对象的函数调用，this都会指向window。
- 也就相当于说，谁调用这个函数，this就指向谁。
- 匿名函数的执行环境具有全局性。这时候this对象指向window。
- 每当创建一个函数的时候，函数**在被调用的时候自动获取两个特殊的变量**，this和arguments。




### 手写深度赋值函数
1. 借助JSON对象的方法，主要是复制了数据，对象上的引用类型无法复制

```
function clone_JSON(obj){
    return JSON.parse(JSON.stringify(obj));
}
var testObj = {a:1,b:2, c: function() {return 123}};
var copyObj = clone_JSON(testObj);
testObj.a = 100;
console.log(copyObj.a);
console.log(copyObj.c());
// 结果，复制的对象没有了c方法
copyObj
{a: 1, b: 2}
testObj
{a: 100, b: 2, c: ƒ}
```
2. 需要考虑基本类型与引用类型，如果是引用类型还要考虑引用类型内部是否还嵌套有引用类型

```
function clone(obj)
{
    var o,i,j,k;
    if(typeof(obj)!="object" || obj===null) return obj;//基本类型Undefined，string，number，boolean，null排除，就剩下array和object（测试都是object）
    if(obj instanceof(Array))//array类型，循环遍历
    {
        o=[];
        i=0;j=obj.length;
        for(;i<j;i++)
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)//如果内嵌引用类型
            {
                o[i]=arguments.callee(obj[i]);//对当前的值使用该函数clone
            }
            else
            {
                o[i]=obj[i];//基本类型，非object和null就直接复制引用，方法的重用是没有什么关系的
            }
        }
    }
    else  //object类型
    {
        o={};
        for(i in obj)//使用for in 來遍历
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)//同样的道理
            {
                o[i]=arguments.callee(obj[i]);
            }
            else
            {
                o[i]=obj[i];
            }
        }
    }
 
    return o;
}
var testObj = {a:1,b:2, c: function() {return 123}};
var copyObj = clone(testObj);
testObj.a = 100;
console.log(copyObj.a);
console.log(copyObj.c());

testObj.c === copyObj.c // true, 复制了指向
```


### 排版引擎与 JS 引擎

### GPU 加速与动画性能

### DOM1，DOM2，DOM3 规范

### 浏览器缓存与应用缓存

### 硬件加速与动画优化
