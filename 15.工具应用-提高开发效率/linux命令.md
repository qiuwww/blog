# linux 命令

## 查找到当前目录下边的所有名字是 node_modules 的目录

find . -name node_modules -type d -mindepth 2

## 端口被占用查看与关闭关口被占用<https://www.cnblogs.com/guodengdeng/p/11160786.html>

1. 查看端口被哪个程序占用
   sudo lsof -i tcp:port
   如： sudo lsof -i tcp:80

2. 看到进程的 PID，可以将进程杀死。
   kill PID（此处是 pid 号）
   如：kill 30118

## Linux crontab 是用来定期执行程序的命令

1. <https://www.runoob.com/linux/linux-comm-crontab.html>
