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

## linux / mac 常用命令

1. **用 man 命令来查看某个命令的使用文档**。
   1. man ls
2. **用alias来查看和设置别名**。
   1. alias ya="yarn"
   2. source ~/.zshrc
3. cd .. / ~
4. pwd
5. ll / ls
6. mkdir folderName
7. touch fileName 创建文件
8. rm -rf
9. cp 案例（拷贝一个test.txt文件并重新命名为test2.txt）：cp test.txt test2.txt
   1. cp /Users/qiuwww/code/jmsd/template/_docs/webpack-multi-page-cli-master/public/favicon.ico ./public/favicon.ico
10. 用 mv 命令来移动目录或文件。
    1. mv yarn-error.log ./config/
    2. mv ./config/yarn-error.log ./
11. find 案例（查找当前目录下所有的txt文件）：find *.txt
    1. find /Users/qiuwww/code/learn/blog/*.md
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
    1. less也是的
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
22. kill 进程id
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

## 利用Linux sz和rz命令实现下载和上传文件功能记录

我们一般从服务器端下载文件到本地和上传文件用到FTP或者SFTP比较多，直接用的是客户端连接软件。在这篇文章中，我们来介绍直接用linux sz和rz命令来实现下载和上传文件的，我们也一起学习一下。

<https://www.itbulu.com/linux-sz-rz.html>
