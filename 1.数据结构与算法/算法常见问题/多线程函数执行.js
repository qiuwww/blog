const taskArr = [1000, 2000, 5000, 1500, 2000];
const limit = 3;
const tashRun = (timeout) => new Promise((res, rej) => setTimeout(res, timeout));

function run(taskArr, limit) {
  let tasks = taskArr.slice(),
    thread = 0,
    task;
  // 递归来执行后续的任务
  function func(thread) {
    task = tasks.shift();
    console.log('start', thread, '--->', task);
    tashRun(task).then((res) => {
      console.log('done', thread);
      if (tasks.length) {
        func(thread);
      } else {
        return;
      }
    });
  }

  // 开启多个线程来执行
  while (thread < limit) {
    func(thread++);
  }
}

run(taskArr, limit);
