# MYSQL

https://www.modb.pro/db/46193


 需要区分mac和linux。

## 自增 id 还是 uuid

1. 自增 id：
   1. 采用连续 id 不怕把你库给撸了；
   2. 在分布式数据库环境下，用自增 id 直接嗝屁，小东西用用还行，一旦到了大点的系统自增 id 就没什么用；
2. uuid：

## MySQL 分页到了后面越来越慢，有什么好的解决办法？

<https://www.zhihu.com/question/432910565/answer/2557661575?utm_source=wechat_session&utm_medium=social&utm_oi=72254268375040&utm_content=group2_Answer&utm_campaign=shareopn>

1. 开发经常遇到分页查询的需求，但是当翻页过多的时候，就会产生深分页，导致查询效率急剧下降。
2. [mysql 查询 limit 1000,10 和 limit 10 速度一样快吗？如果我要分页，我该怎么办？](https://mp.weixin.qq.com/s/F_c36mAkWxGyQrhkviC46Q)

## PRIMARY KEY & KEY

## 登录才能查看版本号，本地的

1. mysql -u root -p
2. Qw911029!

## mysql

1. utf8 是“utf8mb3”的一个别名，可以支持 1-3 字节表示的 unicode 字符
2. utf8mb4 的编码，可以支持 1-4 字节表示的 unicode 字符

## Too many connections

1. 登录 mysql -u root -p
2. 查看连接数：show variables like '%max_connection%';
3. 查看谁在链接：show full processlist;
   1. 这里可以看到 100 多个链接，这是由于服务器 128 内核，理论上可以开 128 个 worker；
   2. lscpu：CPU(s): 40
4. 将 admin 的 worker 设定在 2 个；
   1. --workers=2 框架 worker 线程数，**默认会创建和 CPU 核数相当的 app worker 数**，可以充分的利用 CPU 资源。
5. 查看自己的公网 ip: curl ifconfig.me

### 查看多核电脑的连接数

```bash
mysql> show full processlist;
+-------+------+---------------------+------+---------+------+----------+-----------------------+
| Id    | User | Host                | db   | Command | Time | State    | Info                  |
+-------+------+---------------------+------+---------+------+----------+-----------------------+
| 10483 | root | localhost:53958     | jmsd | Sleep   |  822 |          | NULL                  |
| 10998 | root | 36.22.242.143:53475 | jmsd | Sleep   |  523 |          | NULL                  |
| 11063 | root | localhost:54296     | jmsd | Sleep   | 1155 |          | NULL                  |
| 11079 | root | 36.22.242.143:56780 | jmsd | Sleep   | 1014 |          | NULL                  |
| 11080 | root | 36.22.242.143:56803 | jmsd | Sleep   | 1014 |          | NULL                  |
| 11089 | root | localhost:54558     | jmsd | Sleep   |    2 |          | NULL                  |
| 11090 | root | 36.22.242.143:63845 | jmsd | Sleep   |  523 |          | NULL                  |
| 11091 | root | 115.231.27.44:35226 | jmsd | Sleep   |   51 |          | NULL                  |
| 11092 | root | 115.231.27.44:35228 | jmsd | Sleep   |   45 |          | NULL                  |
| 11093 | root | localhost           | NULL | Query   |    0 | starting | show full processlist |
| 11094 | root | 115.231.27.44:35252 | jmsd | Sleep   |  203 |          | NULL                  |
| 11095 | root | 115.231.27.44:35272 | jmsd | Sleep   |  203 |          | NULL                  |
| 11096 | root | 115.231.27.44:35274 | jmsd | Sleep   |  203 |          | NULL                  |
| 11097 | root | 115.231.27.44:35288 | jmsd | Sleep   |  203 |          | NULL                  |
| 11098 | root | 115.231.27.44:35298 | jmsd | Sleep   |  203 |          | NULL                  |
| 11099 | root | 115.231.27.44:35302 | jmsd | Sleep   |  203 |          | NULL                  |
| 11100 | root | 115.231.27.44:35308 | jmsd | Sleep   |  203 |          | NULL                  |
| 11101 | root | 115.231.27.44:35318 | jmsd | Sleep   |  203 |          | NULL                  |
| 11102 | root | 115.231.27.44:35322 | jmsd | Sleep   |  203 |          | NULL                  |
| 11103 | root | 115.231.27.44:35332 | jmsd | Sleep   |  203 |          | NULL                  |
| 11104 | root | 115.231.27.44:35334 | jmsd | Sleep   |  203 |          | NULL                  |
| 11105 | root | 115.231.27.44:35348 | jmsd | Sleep   |  203 |          | NULL                  |
| 11106 | root | 115.231.27.44:35356 | jmsd | Sleep   |  203 |          | NULL                  |
| 11107 | root | 115.231.27.44:35358 | jmsd | Sleep   |  203 |          | NULL                  |
| 11108 | root | 115.231.27.44:35364 | jmsd | Sleep   |  203 |          | NULL                  |
| 11109 | root | 115.231.27.44:35378 | jmsd | Sleep   |  203 |          | NULL                  |
| 11110 | root | 115.231.27.44:35392 | jmsd | Sleep   |  203 |          | NULL                  |
| 11111 | root | 115.231.27.44:35398 | jmsd | Sleep   |  203 |          | NULL                  |
| 11112 | root | 115.231.27.44:35402 | jmsd | Sleep   |  203 |          | NULL                  |
| 11113 | root | 115.231.27.44:35414 | jmsd | Sleep   |  203 |          | NULL                  |
| 11114 | root | 115.231.27.44:35424 | jmsd | Sleep   |  203 |          | NULL                  |
| 11115 | root | 115.231.27.44:35428 | jmsd | Sleep   |  203 |          | NULL                  |
| 11116 | root | 115.231.27.44:35434 | jmsd | Sleep   |  203 |          | NULL                  |
| 11117 | root | 115.231.27.44:35438 | jmsd | Sleep   |  203 |          | NULL                  |
| 11118 | root | 115.231.27.44:35460 | jmsd | Sleep   |  203 |          | NULL                  |
| 11119 | root | 115.231.27.44:35468 | jmsd | Sleep   |  203 |          | NULL                  |
| 11120 | root | 115.231.27.44:35476 | jmsd | Sleep   |  203 |          | NULL                  |
| 11121 | root | 115.231.27.44:35480 | jmsd | Sleep   |  203 |          | NULL                  |
| 11122 | root | 115.231.27.44:35490 | jmsd | Sleep   |  203 |          | NULL                  |
| 11123 | root | 115.231.27.44:35494 | jmsd | Sleep   |  203 |          | NULL                  |
| 11124 | root | 115.231.27.44:35500 | jmsd | Sleep   |  203 |          | NULL                  |
| 11125 | root | 115.231.27.44:35504 | jmsd | Sleep   |  203 |          | NULL                  |
| 11126 | root | 115.231.27.44:35508 | jmsd | Sleep   |  203 |          | NULL                  |
| 11127 | root | 115.231.27.44:35518 | jmsd | Sleep   |  203 |          | NULL                  |
| 11128 | root | 115.231.27.44:35526 | jmsd | Sleep   |  203 |          | NULL                  |
| 11129 | root | 115.231.27.44:35538 | jmsd | Sleep   |  203 |          | NULL                  |
| 11130 | root | 115.231.27.44:35544 | jmsd | Sleep   |  203 |          | NULL                  |
| 11131 | root | 115.231.27.44:35545 | jmsd | Sleep   |  203 |          | NULL                  |
| 11132 | root | 115.231.27.44:35556 | jmsd | Sleep   |  203 |          | NULL                  |
| 11133 | root | 115.231.27.44:35558 | jmsd | Sleep   |  203 |          | NULL                  |
| 11134 | root | 115.231.27.44:35572 | jmsd | Sleep   |   45 |          | NULL                  |
| 11135 | root | 115.231.27.44:35580 | jmsd | Sleep   |   51 |          | NULL                  |
+-------+------+---------------------+------+---------+------+----------+-----------------------+
52 rows in set (0.00 sec)
```

修改最大连接数：`set GLOBAL max_connections = 256;`

## 同步 mysql 数据库的版本

1. 目前本地与线上的版本是一样的，qa 不一样，导致数据结构不能选择一样的；
   1. 先要登录: `mysql -uroot -p`
   2. local: `Server version: 8.0.29 Homebrew`
   3. qa:
      1. `mysql -uroot -p`
      2. `mysql command not found`
      3. `whereis mysqlselect version();`
      4. `/opt/zbox/bin/mysql.server status` start | stop | restart
      5. `/opt/zbox/bin/mysql -uroot -pjmsd@123. -P3307`
      6. /opt/zbox/bin/mysql -V
         1. /opt/zbox/bin/mysql Ver 15.1 Distrib 10.6.7-MariaDB, for Linux (x86_64) using readline 5.1
         2. 这里的问题是 MariaDB 被默认安装了
      7. 添加 mysql 的软连接：`ln -s /opt/zbox/bin/mysql /usr/local/bin/mysql`
      8. 选中链接的数据库，右键 console，可以直接运行 mysql 的命令`select version();`；
         1. 10.6.7-MariaDB；

### 8.0 与 5.7 的区别

https://www.cnblogs.com/harda/p/16497988.html

### 安装 mysql 到业务服务器

1. 输入 systemctl restart mysqld 启动 mysql 服务
   1. 对于 mysql 来说，将在启动时自动生成一个默认密码，密码保存于/var/log/mysqld.log 的日志文件中。查阅使用 cat var/log/mysqld.log
2. You must reset your password using ALTER USER statement before executing this statement.
   1. /usr/bin/mysql -uroot -p
   2. 修改密码：update user set Password=password("jmsd@123.") where User='root';
   3. `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'jmsd@123.';`
   4. `ALTER USER 'root'@'localhost' IDENTIFIED BY 'Jmsd@123.';`
      1. Your password does not satisfy the current policy requirements；
3. `ln -s /usr/bin/mysql /usr/local/bin/mysql`
4. [添加用户](https://blog.csdn.net/qq_23859799/article/details/85862821) / 创建访问用户：
   1. create user qiuwei identified by 'Jmsd@123.';
   2. `grant all privileges on *.* to 'qiuwei'@'%' identified by 'Jmsd@123.';`
      1. `grant all privileges on *.* to 'qiuwei'@'%' with grant option;`
   3. flush privileges;
5. 启动与重启：
   1. systemctl restart mysqld

## QA

1. [The GPG keys listed for the “MySQL 8.0 Community Server“ repository are already](https://blog.csdn.net/weixin_46504244/article/details/125589431)

### nodejs.ER_NOT_SUPPORTED_AUTH_MODEError: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client => 数据库密码错误了


// mysql -u root -p -P 3306

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Qw911029!';

远程的处理方式：

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Jmsd@123.';

## 存储服务器安装 mysql<https://www.cnblogs.com/egrets/p/14861138.html>

202.75.222.245 / root@JmsdDZK<3j< / 3306

1. wget https://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm
2. yum localinstall mysql80-community-release-el7-7.noarch.rpm
3. yum install mysql-community-server
4. /usr/bin/mysql -V
   1. ln -s /usr/bin/mysql /usr/local/bin/mysql
5. 启动与关闭：
   1. service mysqld start
   2. service mysqld stop
6. 查看默认密码
   1. cat /var/log/mysqld.log | grep "password"
   2. root@localhost: fJ3p?O<4(l&W
7. reset password；
   1. ALTER USER root@localhost identified by 'JmsdDZK<3j<';
8. 把 localhost 用%代替：
   1. mysql> use mysql;
   2. mysql> update user set host = '%' where user ='root';
   3. mysql> flush privileges;
   4. mysql> select 'host','user' from user where user='root';
   5. mysql> quit;
9. 修改密码校验方式：远程的处理方式：
   1. ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'JmsdDZK<3j<';
   2. flush privileges;
10. 重启 mysql;
    1. systemctl restart mysqld
11. 开启服务器的防火墙端口：
    1. CnetOs7 开启方式
       1. firewall-cmd --permanent --zone=public --add-port=3306/tcp
       2. firewall-cmd --reload

## mysql 单表最好不要超过 2000w<https://www.zhihu.com/question/351797203/answer/2746643510?utm_campaign=shareopn&utm_medium=social&utm_oi=72254268375040&utm_psn=1572904014395662336&utm_source=wechat_session>

### 问题的原因

在保持相同的层级（相似查询性能）的情况下，在行数据大小不同的情况下，其实这个最大建议值也是不同的，而且影响查询性能的还有很多其他因素，比如，数据库版本，服务器配置，sql 的编写等等，MySQL 为了提高性能，会将表的索引装载到内存中。在 InnoDB buffer size 足够的情况下，其能完成全加载进内存，查询不会有问题。但是，**当单表数据库到达某个量级的上限时，导致内存无法存储其索引，使得之后的 SQL 查询会产生磁盘 IO，从而导致性能下降**，**所以增加硬件配置（比如把内存当磁盘使），可能会带来立竿见影的性能提升**哈。

### 如何解决 / 日常编码注意的问题

1. 方案一：优化现有 mysql 数据库。优点：不影响现有业务，源程序不需要修改代码，成本最低。缺点：有优化瓶颈，数据量过亿就玩完了。
2. 方案二：升级数据库类型，换一种 100%兼容 mysql 的数据库。优点：不影响现有业务，源程序不需要修改代码，你几乎不需要做任何操作就能提升数据库性能，缺点：多花钱。
3. 方案三：一步到位，**大数据解决方案，更换 newsql/nosql 数据库**。优点：扩展性强，成本低，没有数据容量瓶颈，缺点：需要修改源程序代码。

#### 优化现有 mysql 数据库

1. 数据库设计和表创建时就要考虑性能；
   1. mysql 数据库本身高度灵活，造成性能不足，严重依赖开发人员能力。也就是说开发人员能力高，则 mysql 性能高。这也是很多关系型数据库的通病，所以公司的 dba 通常工资巨高。
   2. 表设计的时候要注意的地方：
      1. 表字段避免 null 值出现，**null 值很难查询优化且占用额外的索引空间**，**推荐默认数字 0 代替 null**。
      2. 尽量使用 INT 而非 BIGINT，如果非负则加上 UNSIGNED（这样会扩大一倍），当然能使用 TINYINT、SMALLINT、MEDIUM_INT 更好。
      3. 使用枚举或整数代替字符串类型；
      4. 尽量使用 TIMESTAMP 而非 DATETIME；
      5. 单表不要有太多字段，建议在 20 以内；
      6. 用整型来存 IP；
   3. 索引：简言之就是使用合适的数据类型，选择合适的索引
      1. 索引并不是越多越好，要根据查询有针对性的创建，考虑在 WHERE 和 ORDER BY 命令上涉及的列建立索引；
      2. 应尽量**避免在 WHERE 子句中对字段进行 NULL 值判断**，否则将导致引擎放弃使用索引而进行全表扫描；
      3. 值分布很稀少的字段不适合建索引，例如"性别"这种只有两三个值的字段；
      4. 字符字段只建前缀索引；
      5. **字符字段最好不要做主键**；
      6. **不用外键，由程序保证约束**；
      7. 尽量不用 UNIQUE，由程序保证约束；
      8. 用多列索引时主意顺序和查询条件保持一致，同时删除不必要的单列索引；
   4. 选择合适的数据类型：
      1. 使用可存下数据的最小的数据类型，整型 < date,time < char,varchar < blob；
      2. 使用简单的数据类型，整型比字符处理开销更小，因为字符串的比较更复杂。
      3. 使用合理的字段属性长度，固定长度的表会更快，使用 enum、char 而不是 varchar（4）尽可能使用 not null 定义字段；
      4. 尽量少用 text，非用不可最好分表# 选择合适的索引列；
2. sql 的编写需要注意优化；
   1. 使用 limit 对查询结果的记录进行限定；
   2. 避免 select \*，将需要查找的字段列出来；
   3. 使用连接（join）来代替子查询；
   4. 拆分大的 delete 或 insert 语句；
   5. 可通过开启慢查询日志来找出较慢的 SQL<https://kalacloud.com/blog/how-to-use-mysql-slow-query-log-profiling-mysqldumpslow/>；
   6. 不做列运算；
   7. sql 语句尽可能简单：一条 sql 只能在一个 cpu 运算；大语句拆小语句，减少锁时间；一条大 sql 可以堵死整个库；
   8. OR 改写成 IN：OR 的效率是 n 级别，IN 的效率是 log(n)级别，in 的个数建议控制在 200 以内；
   9. 少用 JOIN；
   10. 避免%xxx 式查询；
3. 分区；
4. 分表；
5. 分库。

## mysql 启动<blog/19.sql/MySQL 数据库/MySQL 数据库使用笔记.md>

1. 启动与关闭本地 mysql 数据库：

   ```bash
   # 启动 MySQL 服务
   mysql.server start
   # 停止 MySQL 服务 sudo /usr/local/mysql/support-files/mysql.server stop
   mysql.server stop
   ```

2. 使用 navicat 链接数据库；
3. 新建数据库，然后运行本地的 sql 文件；
   1. 解决了一个导入的问题<https://www.cnblogs.com/miracle-luna/p/14760051.html>；

## 参考

1. <https://www.cnblogs.com/egrets/p/14861138.html>
2. <https://www.modb.pro/db/46193>
