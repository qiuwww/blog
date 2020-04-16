const subprocess = require('child_process').fork('./subProcess.js');

// 开启 server 对象，并发送该句柄。
// 子进程句柄
const server = require('net').createServer();

server.on('connection', (socket) => {
  socket.end('被父进程处理');
});

server.listen(1337, () => {
  subprocess.send('server', server);
});

setTimeout(()=>{
  console.log("######")
  subprocess.send('server', server);
}, 2000)
