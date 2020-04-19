console.log('Worker2-' + process.pid + ': Hello world.');

// 子进程，通过process进行监听
// 2
process.on('message', (msg) => {
  console.log('[Worker2] Received message from master: ' + msg);
  // 3
  process.send('Hi master! message from worker2');
});
