const childProcess = require('child_process');
// 获取cpu核心数
const cpuNum = require('os').cpus().length;

for (let i = 0; i < cpuNum; ++i) {
  childProcess.exec(`echo hello world！pid：${process.pid}`, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  });
}

console.log('Master: Hello world.');
