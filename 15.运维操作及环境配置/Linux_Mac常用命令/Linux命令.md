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
    2. open .cd
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
    1. ln -s 源文件 快捷方式文件
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
3. wget 从 web 下载文件;
   1. wget <https://gitee.com/qiuwww/SmartCommunityUI/repository/archive/master.zip>
      1. 直接下载项目的安装包；
      2. 同时也可以下载图片、txt 之类的；
         1. wget <https://gitee.com/qiuwww/SmartCommunityUI/raw/master/vue.config.js>
   2. 只要知道他的下 whereis 载地址，就可以直接使用 wget 进行下载；
      1. wget <https://q2.itc.cn/images01/20240825/f34632cfc6fb4befaa7975b249b699ff.jpeg>

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
ssh-copy-id -i ~/.ssh/id_rsa.pub root@110.42.233.184

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

scp -r /Users/qiuwww/code/learn/blog/0.2.HTML/contenteditable 实现富文本编辑器/jquery-1.9.1.js root@110.42.233.184:/data/js/

## 一般指令

1. ls -l = ll
2. 使用 -r 选项递归删除目录。
   1. cp —— 复制文件或目录。
   2. cp file1 file2
      1. cp ../folder-1/fff.txt ./
   3. cp -r dir1 dir2
      1. cp -r ../folder-1 ./
   4. 使用 -r 选项复制目录。
3. mv —— 移动或重命名文件或目录。
   1. mv file1 file2
      1. mv ./new_directory/fff.txt ./
   2. mv dir1 dir2
      1. mv ./new_directory/folder-1 ./dfs
   3. touch —— 创建空文件或更新文件的时间戳。
      1. touch newfile.txt
      2. echo '<html><span>dsfsdf</span></html>' > fff.html
4. view file
   1. view fff.html
   2. = vi fff.html
5. cat —— 显示文件内容。
   1. cat filename
   2. cat fff.html，直接可以看到内容，如果知识查看内容，就使用 cat 就可以了；
6. less —— 分页查看文件内容。
   1. less filename
   2. 还是 cat 更好用；
7. 打开浏览器并打开指定的地址：`open https://www.baidu.com/`
   1. open 打开文件，默认使用的就是默认打开工具：
      1. open ./fff.html
      2. open ./fff.txt
8. grep —— 在文件中搜索模式。
   1. grep pattern filename
   2. `grep whoami fff.txt`
9. find —— 查找文件。
   1. find /path -name "filename"
10. chmod —— 更改文件权限。
    1. chmod 755 filename
11. chown —— 更改文件的所有者。
    1. chown user:group filename‍

## 进程管理

1. ps —— 显示进程信息。
   1. ps aux | grep process_name
   2. ps -ef | grep mysql
      1. Linux 查看 MySQL 后台进程的命令。
2. top —— 实时查看系统资源使用情况。
   1. top
3. kill —— 终止进程。
   1. kill PID
      1. 经常结合 ps 来使用
   2. killall —— 终止所有同名进程。
   3. killall process_name
   4. kill -9 MySQL 进程 ID：强杀 MySQL 服务的命令。
4. nice —— 设置进程优先级。
   1. nice -n 19 ./process
5. renice —— 动态更改进程优先级。
   1. renice -n 19 -p PID‍

## unzip

解压文件。

1. unzip master.zip

## ln

1. 软连接；
2. 创建文件链接

## 查看文件大小

du -sh ./  #统计当前文件夹的size，即当前相对路径下的整个文件夹大小。
du -sh     #同上
du -sh ./*#显示当前文件夹下所有文件和文件夹的大小
du -sh*   #同上
du -sh ./test #显示./test文件夹的大小
du -sh *.[^.]* #显示当前文件夹下所有文件和文件夹的大小,包含隐藏文件和隐藏文件夹
du -csh *.[^.]* #显示当前文件夹下所有文件和文件夹的大小,包含隐藏文件和隐藏文件夹和总计
