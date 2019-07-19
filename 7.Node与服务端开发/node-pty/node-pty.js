var os = require("os");
var pty = require("node-pty");

// 这里使用的是bash命令来执行
// 这里直接调用zsh是可以的，但是应该判断一下是不是存在
// 判断是否安装zsh
var { spawn, execSync } = require("child_process");

var shellType = execSync("echo $SHELL").includes("zsh") ? "zsh" : "bash";

var shell = os.platform() === "win32" ? "powershell.exe" : shellType;

var ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

ptyProcess.on("data", function(data) {
  process.stdout.write(data);
});

ptyProcess.write("ls\r");
ptyProcess.resize(100, 40);
ptyProcess.write("ls\r");
