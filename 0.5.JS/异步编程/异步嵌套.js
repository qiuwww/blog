


/**
 * 批量执行一组异步任务，但是不是并行，而是依次执行
 */

// 文章详细
// https://www.h5jun.com/post/three-black-tech-in-modern-js.html?from=groupmessage&isappinstalled=0

/**
 * 使用async...await
 * 59版本 已经可以直接运行async...awite了
 */
/**
 * 这个 reducer 的两个参数是 promise 和 action，promise 是代表当前任务的 promise，
 * 而 action 是下一个要执行的任务。我们可以 await 当前 promise 执行当前任务，
 * 然后将执行结果传给下一个 action 就可以了。 
 */
async function taskReducer(promise, action){
  let res = await promise; // 等待当前结果执行
  return action(res);// 执行结果传递给下一个函数
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncTask(i){
  await sleep(500);
  console.log(`task ${i} done`);
  return ++i;
}
/**
 * 需要注意的是，每一个任务的返回值将是下一个任务的输入 promise 或者 value。
 */
[asyncTask, asyncTask, asyncTask].reduce(taskReducer, 0);





/**
 * generator 与 async/await 一同使用
 */

async function reducer(promise, action){
  let res = await promise;
  return action(res);
}
/**
 * 我们定义了一个计时 tick 函数，我们通过 timing 来连续调用它，
 * 而 timing 是一个 generator，计时器显然是异步函数。
 */
function tick(i){
  console.log(i);
  return new Promise(resolve => setTimeout(()=>resolve(++i), 1000));
}
// continuous 其实就是前面的 reduce 的封装。
function continuous(...functors){
  return async function(input){
    return await functors.reduce(reducer, input)
  }
}

function * timing(count = 5){
  for(let i = 0; i < count; i++){
    yield tick;
  }
}

continuous(...timing(10))(0);