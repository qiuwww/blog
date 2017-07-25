// async.js


async function testAsync() {
    return "hello async";
} 
const result = testAsync();
// 说明 async最终返回的是一个Promise对象
console.log(result);

// 联想一下 Promise 的特点——无等待，所以在没有 await 的情况下执行 async 函数，
// 它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。
// 这和普通返回 Promise 对象的函数并无二致。