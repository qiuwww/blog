# Linux 下 MySql 的安装与启动

## 操作步骤

1. 登录服务器；
2. 使用 wget 下载 MySql 安装包；
   1. `wget https://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm`；
3. 安装；
   1. yum localinstall mysql80-community-release-el7-7.noarch.rpm
   2. yum install mysql-community-server
4. /usr/bin/mysql -V
   1. ln -s /usr/bin/mysql /usr/local/bin/mysql
5. 启动与关闭：
   1. service mysqld start
      1. = systemctl start mysqld.service
   2. service mysqld stop
   3. 查看运行状态：
      1. systemctl status mysqld.service
6. 查看默认密码
   1. cat /var/log/mysqld.log | grep "password"
   2. root@localhost: XXX
7. reset password；
   1. ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
   2. ALTER USER root@localhost identified by 'JmsdDZK<3j<';
8. 把 localhost 用%代替：
9. (需要登录后操作)
   1. mysql> use mysql;
   2. mysql> update user set host = '%' where user ='root';
   3. mysql> flush privileges;
   4. mysql> select 'host','user' from user where user='root';
   5. mysql> quit;
10. 修改密码校验方式：远程的处理方式：
11. ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'XXXX';
12. flush privileges;
13. 重启 mysql;
    1. systemctl restart mysqld
14. 需要开启 3306 端口可访问/开启服务器的防火墙端口：
    1. CnetOs7 开启方式
       1. firewall-cmd --permanent --zone=public --add-port=3306/tcp
       2. firewall-cmd --reload

## 数据库同步

1. 使用 navicat 链接；
2. 建立数据库；
3. 本地：工具来同步数据库；

## 参考

1. [Centos7 yum 方式安装 Mysql 8.0.x](https://www.modb.pro/db/46193)；
