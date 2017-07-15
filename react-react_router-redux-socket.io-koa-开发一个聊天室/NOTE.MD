<!-- README.MD -->
# react-react_router-redux-socket.io-koa-开发一个聊天室
## 主要是用一下里边的新知识，以后也可以不断的扩展
1. 原项目的地址：https://github.com/mly-zju/chat-room.git
2. 文章介绍：https://zhuanlan.zhihu.com/p/25588584?utm_source=qq&utm_medium=social

## 主要用到的技术
1. react
### react

2. react_router
3. redux
4. socket.io
5. koa




## 学习过程中遇到的坑
### 源文件是ES6编写的，直接使用低版本的node运行就会报错；
*解决方案*：
	1. 使用babel-cli命令模块以及编译模块babel-reset-es2015模块来编译源文件。
	2. 参考：http://www.imooc.com/article/11157。
	3. 具体：
	# 全局安装$ npm install --global babel-cli
			 # 本地安装$ npm install --save-dev babel-preset-es2015
			 # 如果使用react，则同时安装$ npm install --save-dev babel-preset-react
			 # 添加.babelrc文件，具体内容:
```.babelrc 文件内容：{
	       "presets": [
	           "es2015",
	           "react"
	       ] 
	    }```
			# 为了完整使用 ES6 的 API ，我们只能安装这个插件：$ npm install -save-dev babel-polyfill，具体使用：
```然后，在需要使用的文件的顶部引入
    import "babel-polyfill"
在node.js 中：
    require('babel-polyfill');
在webpack.config.js 中：
    module.exports = {
        entry: ['babel-polyfill', './app/js']
    }
```
### node模块是ES6编写的，koa2.0+，使用ES6+编写的源代码,这里需要安装1.0版本的koa，node模块的控制：
```*: 任意版本；
1.1.0: 指定版本；
~1.1.0: >=1.1.0 && < 1.2.0；
^1.1.0: >=1.1.0 && < 2.0.0；```         
**控制koa的版本在2.0.0是可以直接运行的，不需要babel就可以的。然而2.1.0版本就不可以了**

## koa与express的异同
* 虽然Express的API很简单，但是它是基于ES5的语法，要实现异步代码，只有一个方法：回调。如果异步嵌套层次过多，代码写起来就非常难看；
* 随着新版Node.js开始支持ES6，Express的团队又基于ES6的generator重新编写了下一代web框架koa。和Express相比，koa 1.0使用generator实现异步，代码看起来像同步的；
* 为了简化异步代码，ES7（目前是草案，还没有发布）引入了新的关键字async和await，可以轻松地把一个function变为异步模式：
```async function () {
    var data = await fs.read('/file1');
}
```这是JavaScript未来标准的异步代码，非常简洁，并且易于使用。
* koa团队并没有止步于koa 1.0，他们非常超前地基于ES7开发了koa2，和koa 1相比，koa2完全使用Promise并配合async来实现异步。



## ES6语法
1. let不允许重复声明，同理可用到函数的参数（本质上是函数内部的变量）；
2. generator   *函数
参考：http://www.ruanyifeng.com/blog/2015/04/generator.html
异步编程对 JavaScript 语言太重要。JavaScript 只有一根线程，如果没有异步编程，根本没法用，非卡死不可。
以前，**异步编程的方法，大概有下面四种**。
	* 回调函数
	* 事件监听
	* 发布/订阅
	* Promise 对象

Generator函数的概念：Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
```function* gen(x){
  var y = yield x + 2;
  return y;
}```
上面代码就是一个 Generator 函数。它不同于普通函数，是可以暂停执行的，所以函数名之前要加星号，以示区别。
整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用 yield 语句注明。
next 方法的作用是分阶段执行 Generator 函数。每次调用 next 方法，会返回一个对象，表示当前阶段的信息（ value 属性和 done 属性）。value 属性是 yield 语句后面表达式的值，表示当前阶段的值；done 属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。next需要调用两次。
当你调用一个generator函数的时候，你会获得一个iterator对象。
demo
```var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
**************************************************

var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```

3.next与await
next是表示管道，向后一次执行；await表示执行一次异步操作，操作完成之后，再返回到这里。

4. promise
```Promise就是为了解决这个问题(多层回调嵌套)而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的横向加载，改成纵向加载。采用Promise，连续读取多个文件，写法如下。```
```var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function(data){
  console.log(data.toString());
})
.then(function(){
  return readFile(fileB);
})
.then(function(data){
  console.log(data.toString());
})
.catch(function(err) {
  console.log(err);
});```
Promise 提供 then 方法加载回调函数，catch方法捕捉执行过程中抛出的错误。
可以看到，Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。
Promise 的最大问题是代码冗余，原来的任务被Promise 包装了一下，不管什么操作，一眼看去都是一堆 then，原来的语义变得很不清楚。
5.协程
传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。
协程有点像函数，又有点像线程。它的运行流程大致如下。
第一步，协程A开始执行。
第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
第三步，（一段时间后）协程B交还执行权。
第四步，协程A恢复执行。
```function asnycJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}```
上面代码的函数 asyncJob 是一个协程，它的奥妙就在其中的 yield 命令。它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。
协程遇到 yield 命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。
这个时候就可以将一部的结果赋值给一个变量，在下边直接调用，也就是要强制阻塞程序的执行。这是别的语言的方法，使用就是实现的就是generator。


6.await与generator
为了更加方便的处理异步操作问题，现在最新的前端框架生态都开始用上了Generator和yield，有的甚至已经开始使用最新的async、await语法了，这两样都是基于Generator自动执行的原理。

*chunk函数*
```var readFile = function (fileName) {
    return function (callback) {
        return fs.readFile(fileName, callback)
    }
}
调用：readFile(path)(fn);```
而即将出现的es7的async、await语法是基于Promise的