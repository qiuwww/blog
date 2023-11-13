# MAC 与 Linux 下 MySql 的启动与设置默认开启

## MAC 下 mysql 的启动与设置默认开启

最好设置为开机就启动。

### 安装，直接使用 brew 来安装

1. brew install mysql@8.0.33 版本号(安装具体版本)
2. mysql --version 查看是否安装成功

### 启动 mysql / brew 管理 mysql

```bash
# 启动 mysql, 并设置为开机启动
brew services start mysql
# 关闭 mysql
brew services stop mysql
# 重启 mysql
brew services restart mysql
```

### 具体操作

1. 查看本地的 brew：
   1. `brew info mysql`；
      1. To start mysql now and restart at login: `brew services start mysql`；
2. 重置密码：
   1. `mysql_secure_installation`
3. brew 安装的 mysql 位置：`/opt/homebrew/opt/mysql`

### Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)

1. mysql.sock 这个文件有什么用:
   1. 连接 localhost 通常通过一个 Unix 域套接字文件进行，一般是/tmp/mysql.sock。**如果套接字文件被删除了，本地客户就不能连接**。这可能发生在你的系统运行一个 cron 任务删除了/tmp 下的临时文件。

### ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)

## linux 下安装 MySql

## 设置 root 密码

1. mysqladmin -u root password 设置密码，如果已经设置过 root 用户的密码之后再修改密码，后面就需要加-p；

### 8.0 以上版本，设置数据库密码

[参考](https://www.feiniaomy.com/post/632.html)，这里的操作不同于原来的 8.0 以下的版本，网上常见的处理方式会提示语法错误。

```bash
$: mysql -u root
$: alter user'root'@'localhost' identified by '新密码';
$: flush privileges;
$: quit
```

## 命令行登录数据库

1. mysql -u root -p
2. 输入密码；
3. 常见操作：
   1. USE 数据库名字; -> use gan-fan-ren;
   2. SHOW TABLES;
   3. `select * from category where name like '%糖%'`;
