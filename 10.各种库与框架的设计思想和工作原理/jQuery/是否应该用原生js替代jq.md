# 是否应该使用原生js替代jq

**是否值得**

> jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document **traversal** and **manipulation**, **event handling**, **animation**, and **Ajax** much simpler with an easy-to-use API that works across **a multitude of** browsers.

最常用的功能包括

- 在 DOM 树中进行查询
- 修改 DOM 树及 DOM 相关操作
- 事件处理
- Ajax
- Deferred 和 Promise
- 对象和数组处理
- 跨浏览器



### dom操作

document.createElement()

querySelectorAll()

ES6 的字符串模板

**就 DOM 操作这一部分来说，jQuery 仍然是一个非常好用的工具。这是 jQuery 替代了原生 JavaScript。**



###  jQuery 工具函数

 jQuery 对象是一个特有的数据结构，针对 jQuery 自身创建的工具方法在作用于 jQuery 对象的时候会有一些针对性的实现——既然 DOM 操作仍然不能把 jQuery 抛开，那这些方法也就不可能被完全替换掉。



1. jQuery 对象实现了部分数组功能的伪数组；
   如果要获得某个元素，可以用 `[]` 运算符或 `get(index)` 方法；如果要获得包含所有元素的数组，可以使用 `toArray()` 方法，或者通过 ES6 中引入的 `Array.from()` 来转换。

2. 注意 each/map 和 forEach/map 回调函数的参数顺序;

   - 请特别注意这两个回调定义的第一个参数和第二个参数，所表示的意义正好交换，这在混用 jQuery 和原生代码的时候很容易发生失误。
   - 注意 each()/map() 中的 this;
     `$.fn.each()` 和` $.fn.map()` 回调中经常会使用 this，这个 this 指向的就是当前数组元素。正是因为有这个便利，所以 jQuery 在定义回请贩时候没有把元素本身作为第一个参数，而是把序号作为第一个参数。
   - `$.fn.map()` 返回的不是数组，而是 jQuery 对象，是伪数组。如果需要得到原生数组，可以采用 `toArray()` 或 `Array.from()` 输出。




总的来说，在大量操作 DOM 的前端代码中使用 jQuery 可以带来极大的便利，也使 DOM 操作的相关代码更易读。另一方面，原生 JavaScript 带来的新特性确实可以替代 jQuery 的部分工具函数/方法，以降低项目对 jQuery 的依赖程序。

jQuery 和原生 JavaScript 应该是共生关系，而不是互斥关系。应该在合适的时候选用合适的方法，而不是那么绝对的非要用谁代替谁。

