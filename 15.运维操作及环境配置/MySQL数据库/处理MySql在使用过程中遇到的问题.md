# 处理 MySql 在使用过程中遇到的问题

## Client does not support authentication protocol requested by server; consider upgrading MySQL client

1. 可能是密码错了；

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
