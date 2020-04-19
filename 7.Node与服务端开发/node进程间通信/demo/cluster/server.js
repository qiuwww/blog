// 1. 执行node server.js启动服务器，继续按照之前的做法，利用任务管理器杀死进程，可以看到在进程被杀后master能够及时启动新的worker。
// 2. 继续运行tcp_client，可以看到服务器能够正常处理请求。

const cluster = require('cluster');
const cpuNum = require('os').cpus().length;

// if条件语句判断当前进程是master还是worker
if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 利用cluster模块创建了与CPU数量相应的worker进程
  for (let i = 0; i < cpuNum; ++i) {
    cluster.fork();
  }

  // 创建进程完成后输出提示信息
  // 通过监听cluster的online事件来判断worker的创建成功
  cluster.on('online', (worker) => {
    console.log('Create worker-' + worker.process.pid);
  });

  // 子进程退出后重启
  // 在worker进程退出后，会触发master进程中cluster模块上的exit事件，通过监听该事件可以了解worker进程的退出情况并及时fork新的worker
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      '[Master] worker ' +
        worker.process.pid +
        ' died with code: ' +
        code +
        ', and signal: ' +
        signal,
    );
    cluster.fork();
  });
} else {
  // worker进程中只需创建服务器监听端口，对客户端请求做出处理即可
  // 这里设置相同端口8080之后，所有worker都将监听同一个端口
  // 工作进程可以共享任何 TCP 连接。
  const net = require('net');
  net
    .createServer()
    .on('connection', (socket) => {
      // console.log('监听端口，socket：', socket);
      // 利用setTimeout模拟处理请求时的操作耗时
      setTimeout(() => {
        socket.end('Request handled by worker-' + process.pid);
      }, 10);
    })
    .listen(8080);
}
