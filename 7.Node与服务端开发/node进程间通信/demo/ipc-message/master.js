const childProcess = require('child_process');

const worker1 = childProcess.fork('./worker1.js');
const worker2 = childProcess.fork('./worker2.js');

console.log('Master可以拿到子进程的句柄：' + worker1.pid + ':' + worker2.pid);

// 主进程内，可以拿到子进程的句柄，可以直接发送与监听消息

// 1
worker1.send('Hello world!');
worker2.send('Hello world!');

// 4
worker1.on('message', (msg) => {
  console.log('[Master] Received message from worker: ' + msg);
  worker2.send(msg);
});

worker2.on('message', (msg) => {
  console.log('[Master] Received message from worker: ' + msg);
});
