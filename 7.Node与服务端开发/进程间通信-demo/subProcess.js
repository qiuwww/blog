process.on('message', (m, server) => {
  console.log("process.on('message'");
  if (m === 'server') {
    server.on('connection', (socket) => {
      console.log(socket.end('被子进程处理'));
      socket.end('被子进程处理');
    });
  }
});
