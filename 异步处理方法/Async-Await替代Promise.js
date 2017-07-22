// Async/Await替代Promise.js


/**
 * Node.js的异步编程方式有效提高了应用性能；
 * 然而回调地狱却让人望而生畏，Promise让我们告别回调函数，写出更优雅的异步代码；
 * 在实践过程中，却发现Promise并不完美；技术进步是无止境的，这时，我们有了Async/Await。
 */

// Async/Await简介

// 对于从未听说过async/await的朋友，下面是简介:

// async/await是写异步代码的新方式，以前的方法有回调函数和Promise。
// async/await是基于Promise实现的，它不能用于普通的回调函数。
// async/await与Promise一样，是非阻塞的。
// async/await使得异步代码看起来像同步代码，这正是它的魔力所在。



// async函数会隐式地返回一个promise，该promise的reosolve值就是函数return的值。
// Async/Await让try/catch可以同时处理同步和异步错误。


// Async/Await是近年来JavaScript添加的最革命性的的特性之一。
// 它会让你发现Promise的语法有多糟糕，而且提供了一个直观的替代方法。