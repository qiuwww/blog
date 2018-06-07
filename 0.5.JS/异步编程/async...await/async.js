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



function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function add1(x) {
  var a = resolveAfter2Seconds(20);
  var b = resolveAfter2Seconds(30);
  return x + await a + await b;
}

add1(10).then(v => {
  console.log(v);  // prints 60 after 2 seconds.
});

async function add2(x) {
  var a = await resolveAfter2Seconds(20);
  var b = await resolveAfter2Seconds(30);
  return x + a + b;
}

add2(10).then(v => {
  console.log(v);  // prints 60 after 4 seconds.
});



和Promise链的对比：

我们的async函数中可以包含多个异步操作，其异常和Promise链有相同之处，
如果有一个Promise被reject()那么后面的将不会再进行。

let count = ()=>{
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            reject('故意抛出错误');
        },500);
    });
}

let list = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve([1,2,3]);
        },500);
    });
}

let getList = async ()=>{
    let c = await count();
    let l = await list();
    return {count:c,list:l};
}
console.time('begin');
getList().then(result=> {
    console.log(result);
}).catch(err=> {
    console.timeEnd('begin');
    console.log(err);
});
//begin: 507.490ms
//故意抛出错误
如上面的代码，定义两个异步操作，count和list，使用setTimeout延时500毫秒，
count故意直接抛出异常，从输出结果来看，count()抛出异常后，直接由catch()捕捉到了，list()并没有继续执行。





