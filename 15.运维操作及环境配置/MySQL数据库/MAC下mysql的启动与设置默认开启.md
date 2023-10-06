# MAC下mysql的启动与设置默认开启

## 启动mysql / brew 管理 mysql

```bash
# 启动 mysql, 并设置为开机启动
brew services start mysql
# 关闭 mysql
brew services stop mysql
# 重启 mysql
brew services restart mysql
```

这里使用如下的命令：

```bash
sudo mysql.server start
sudo mysql.server stop
```

上边的方式都不太行。

### 具体操作

1. 查看本地的brew：
   1. `brew info mysql`；
      1. To start mysql now and restart at login: `brew services start mysql`；
2. 重置密码：
   1. `mysql_secure_installation`
3. brew 安装的 mysql位置：`/opt/homebrew/opt/mysql`

### Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)

1. mysql.sock这个文件有什么用:
   1. 连接localhost通常通过一个Unix域套接字文件进行，一般是/tmp/mysql.sock。**如果套接字文件被删除了，本地客户就不能连接**。这可能发生在你的系统运行一个cron任务删除了/tmp下的临时文件。

### ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)

## 报错原因很简单：启动命令不能直接使用mysql, 应该用mysql.server

1. mysql.server start
   1. 仍然报错；
   2. ERROR! The server quit without updating PID file (/opt/homebrew/var/mysql/MacBook-Pro-2.local.pid).
   3. 解决办法，删除掉，重新安装：<https://blog.csdn.net/mudarn/article/details/123475118?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS5oay8%3D>

## 最终解决

1. 重装
2. brew services start mysql
3. 自动每次重新启动
