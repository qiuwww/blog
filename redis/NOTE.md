# Redis

## 安装及配置

1. brew 安装
2. redis-server /usr/local/etc/redis.conf
3. /usr/local/Cellar/redis/5.0.8: 13 files, 3.1MB
4. 启动 redis 服务：/usr/local/bin/redis-server /usr/local/etc/redis.conf，这里加了配置就起不来了，不知道为什么。
5. 启动 redis 客户端：/usr/local/bin/redis-cli
6. logfile：/usr/local/redis/log-redis.log
7. tail -f /usr/local/redis/log-redis.log
8. 测试命令：
   1. ping
   2. set key1 thisiskey
   3. get key1

## 遇到的问题

1. redis Could not connect to Redis at 127.0.0.1:6379: Connection refused 是因为客户端找不到服务端

表示服务端没有启动成功

2. 如何启动和关闭 redis 服务
   1. /usr/local/bin/redis-server
   2. /usr/local/bin/redis-cli，连接 redis
   3. /usr/local/bin/redis-cli shutdown，结束

## 常用命令

[参考](https://segmentfault.com/a/1190000010999677)
