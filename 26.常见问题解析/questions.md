
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

### GET与POST请求的联系与区别

@8.数据请求/GET请求与POST请求.md

### ES6的理解

#### 常用到的语法结构

- let、const

- 箭头函数，默认参数，rest参数(`...`)
  **箭头函数的this**：函数中 `this` 总是绑定**总是指向对象自身**。this指向**函数所在的对象**。（当对象内的匿名函数的时候，this会指向window，一般使用self来替代）。

- 解构赋值|计算

- 扩展运算符`...`

- Array：form、of、find、keys、values、entries

- Number：isNaN、parseInt

- Object：is(是否严格相等)、省略写法、assign

- 模板字符串

- for...of、for...in

- async...await

- Set类：`[...new Set([1, 1, 2, 2, 3, 3])]`

- class声明类，constructor，super，static，private

- Symbol

- Iterators

- Generators

- Promise
  三种状态：pending(中间状态)、resolve(成功状态，then)，catch(失败状态，reject)

  ```
  // 异步函数a
  var a = function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('a')
      }, 1000)
    })
  }

  // 异步函数b
  var b = function (data) {
    return new Promise(function (resolve, reject) {
      resolve(data + 'b')
    })
  }

  // 异步函数c
  var c = function (data) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(data + 'c')
      }, 500)
    })
  }


  //链式调用
  a()
    .then(function (data) {
      return b(data)
    })
    .then(function (data) {
      return c(data)
    })
    .then(function (data) {
      console.log(data)// abc
    })
  ```

  ​







### import与export的原理

相对于CommonJS和AMD两种模块加载的方式。

```
// 整体加载fs模块，称为"运行时加载"
let {stat, readFile} = require('fs');
// 编译的时候只加载这三个方法，称为"编译时加载"，效率要比CommonJS高很多
import {stat, readFile} from 'fs';
```

**ES6的模块加载机制：**

模块加载的变量**只能读不能写**（对于引用和分引用类型同理），不然别的地方就没发使用了，使用`as`重命名得到的变量也一样。

## CSS

### position属性的理解

### 盒子模型理解





## HTML



## 常用到的英文名称

| 缩写   | 完整                          | 中文对应       | 备注   |
| :--- | :-------------------------- | :--------- | :--- |
| DNS  | domain name system          | --         | --   |
| HTTP | Hypertext Transfer Protocol | 协议即超文本传送协议 | --   |
| HTML | sss


## 网络与数据请求


### web性能优化的方法

**总结起来主要是以下个方面的优化：**

1. 减少HTTP请求

   > 减少了网络连接与等待的时间
   >
   > 减少图片的请求、减少脚本文件与样式表的请求

   - 减少图片请求
   - 合并js脚本与css样式表
   - 内联图片（base64）

2. 页面内部优化

   > 主要方向：样式表放在顶部、脚本文件放在底部、避免css表达式、把脚本的样式表放在外部、移除重复脚本。

3. 启用缓存

   > 两套方案：`expires/If-Modified-Since`、`Cache-Control/Etag`；前者是HTTP1.0中的缓存方案，后者是HTTP1.1中缓存方案，若http头部中同时出现二者，后者的优先级更高。

4. 减少下载量

   > 开启GZIP压缩

5. 网络连接上的优化

   > 使用CDN加速、减少DNS查找、避免重定向。





## 框架与库

### vue的生命周期

1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate
6. updated
7. actived，组件被激活时
8. deactived，组件被移除的时
9. beforeDestory，销毁前调用
10. destored，销毁后调用



### react的生命周期

1. constructor(getDefaultProps->getInitalState)
2. componentWillMount
3. (render)
4. componentDidMount
5. componentWillReceiveProps(props改变的时候)
6. shouldComponentUpdate(old, new)，（state与props改变的时候都会执行）
7. componentWillUpdate
8. componentDidUpdate
9. componentWillUnmount

