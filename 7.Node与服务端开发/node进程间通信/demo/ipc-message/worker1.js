console.log('Worker1-' + process.pid + ': Hello world.');

// 子进程，通过process进行监听
// 2
process.on('message', (msg) => {
  console.log('[Worker1] Received message from master: ' + msg);
  // 3
  process.send('Hi master! message from worker1');
});
