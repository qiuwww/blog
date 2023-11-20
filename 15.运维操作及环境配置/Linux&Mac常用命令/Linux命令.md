# linux 命令

## 如何快速了解一个服务器的信息<https://www.cnblogs.com/ggjucheng/archive/2013/01/14/2859613.html>

如内存、闪存、硬盘、系统、CPU、内存占用、进程等。

```bash
# 查看当前的系统
cat /proc/version

# Linux version 3.10.0-327.el7.x86_64 (builder@kbuilder.dev.centos.org) (gcc version 4.8.3 20140911 (Red Hat 4.8.3-9) (GCC) ) #1 SMP Thu Nov 19 22:10:57 UTC 2015

# yum是否可用
yum

# 查看cpu参数
lscpu

# 查看每个cpu
cat /proc/cpuinfo

# 内存，闪存
free -m

# 查看内存硬件信息
dmidecode -t memory

# 磁盘
lsblk

# 查看ip
ip addr show

# 当前运行的进程
ps aux | less

# 查看当前服务的端口/启动的服务
# linux系统查看当前正在运行的服务<https://blog.51cto.com/u_15328720/3384523>

# Linux 查看端口占用情况 <https://www.runoob.com/w3cnote/linux-check-port-usage.html>
lsof -i

netstat -tunlp | grep 8080

# 杀掉某个进程
kill -9 26993(PID)
```

## 查找到当前目录下边的所有名字是 node_modules 的目录

find . -name node_modules -type d -mindepth 2

## 端口被占用查看与关闭关口被占用<https://www.cnblogs.com/guodengdeng/p/11160786.html>

1. 查看端口被哪个程序占用
   sudo lsof -i tcp:port
   如：sudo lsof -i tcp:80 / lsof -i :5000

2. 看到进程的 PID，可以将进程杀死。
   kill PID（此处是 pid 号）
   如：kill 30118

## Linux crontab 是用来定期执行程序的命令

1. <https://www.runoob.com/linux/linux-comm-crontab.html>

## linux / mac 常用命令

1. **用 man 命令来查看某个命令的使用文档**。
   1. man ls
2. **用 alias 来查看和设置别名**。
   1. alias ya="yarn"
   2. source ~/.zshrc
3. cd .. / ~
4. pwd
5. ll / ls
6. mkdir folderName
7. touch fileName 创建文件
8. rm -rf
9. cp 案例（拷贝一个 test.txt 文件并重新命名为 test2.txt）：cp test.txt test2.txt
   1. cp /Users/qiuwww/code/jmsd/template/\_docs/webpack-multi-page-cli-master/public/favicon.ico ./public/favicon.ico
10. 用 mv 命令来移动目录或文件。
    1. mv yarn-error.log ./config/
    2. mv ./config/yarn-error.log ./
11. find 案例（查找当前目录下所有的 txt 文件）：find \*.txt
    1. find /Users/qiuwww/code/learn/blog/\*.md
12. open
    1. open /Users/qiuwww/code/learn/blog/dns.md
    2. open .
    3. open ../
    4. open ~
13. ssh root@ip
14. clear
15. vi 文件名 # 用 vi 打开。支持直接修改。
    1. i
    2. esc
    3. :wq
16. cat 文件名 # 查看文件内容。不支持修改，查看完整的文件
    1. less 也是的
17. chomd 文件权限 文件路径；
    1. 不能用？？
18. history | grep 'git status' -c # 统计指定命令执行了多少次。
19. 用 > 或 >>将命令的执行结果输出到文件。> 和 >>的区别是：> 会覆盖了输出文件而 >> 是在文件末添加(首先要有内容)。
    1. ping baidu.com > a.txt
    2. cat a.txt > b.txt
    3. pwd >> c.txt
    4. echo "hello" > c.txt
20. 搜索字符串，用 grep 命令来搜索字符串；
    1. grep 搜索字符串 文件；
21. sudo
22. kill 进程 id
23. ifconfig
24. ping ip
25. 端口占用情况：sudo lsof -i :端口号
    1. lsof -i:8080
26. cal 日历
    1. cal -3
27. diff：比较并显示两个文件的内容差异
28. ln：为文件创建联接
29. which：查看指定程序的路径
    1. which android
30. history：查看前面执行过的命令
31. date
32. ps u
33. ftp 在本地主机与远程主机之间传输文件
34. who 列出当前登录的所有用户
    1. whoami 显示当前正进行操作的用户名
35. uname 显示操作系统的有关信息 uname -a
36. env
37. du 查询磁盘使用情况 du -k subdir
38. tree -l 2 -o output.txt

## 查找文件 `find / -name mysql.sock`

## 设置文件权限 `chmod u+x ~/.ssh`

## 利用 Linux sz 和 rz 命令实现下载和上传文件功能记录

我们一般从服务器端下载文件到本地和上传文件用到 FTP 或者 SFTP 比较多，直接用的是客户端连接软件。在这篇文章中，我们来介绍直接用 linux sz 和 rz 命令来实现下载和上传文件的，我们也一起学习一下。

<https://www.itbulu.com/linux-sz-rz.html>

## [定时执行](https://www.runoob.com/linux/linux-comm-crontab.html)

## wget 是什么

1. 是一个命令行工具，用于从互联网上下载文件。
2. wget [选项] [URL]

## systemctl 是什么

1. 是一个**系统管理工具**，用于在 Linux 系统上控制和管理系统服务（daemons）和系统单元（units）。**它通常用于系统初始化、服务启动和停止、管理系统进程等任务**。systemctl 是现代 Linux 发行版中的标准工具，取代了以前的 init 系统和 service 命令。
2. `systemctl start [服务名称]`。
3. `systemctl restart [服务名称]`。
4. `systemctl stop [服务名称]`。
5. `systemctl status [服务名称]`。

## yum 是什么

1. 包管理工具，通常用于在基于 Red Hat 和 Fedora Linux 发行版的系统上安装、升级和删除软件包。

## 记录 ssh 的登录密码到本地

ssh-copy-id -i ~/.ssh/id_rsa.pub root@47.98.197.178

[参考](https://blog.csdn.net/persist_xyz/article/details/90231433)。

把公钥放到服务器上。

这里需要输入一次密码，后续就不用输入密码了，只要是当前的机器上。

## 端口占用的问题处理 server got error: bind EADDRINUSE null:7001, code: EADDRINUS / node Error: bind EADDRINUSE null / 查看端口占用并关闭

端口被占用，换成别的端口。

```bash
lsof -i:7001

=>tcp6       0      0 :::7001                 :::*                    LISTEN      6152/node

kill -9 PID
kill -9 6152
```

### linux 下的处理

1. netstat -an | grep 80，查看端口占用
2. kill -9 PID

## 上传文件夹

mac 上传文件到服务器。

`scp -r /Users/zhangbin/Desktop/news root@149.129.100.132:/var/www/`

**一定要加-r**,如上命令是采用递归的方式将 news 目录下的所有文件都复制到 www 下

scp -r /home/myfile/ root@192.168.1.100:/data/

scp -r /Users/qiuwww/code/learn/blog/0.2.HTML/contenteditable实现富文本编辑器/jquery-1.9.1.js root@110.42.233.184:/data/js/
