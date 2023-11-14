# redis 部署与操作

1. [服务器要安装 redis](https://www.jianshu.com/p/3f04167b7f58)：
   1. [处理找不到 redis 的问题](https://www.codeleading.com/article/98554130215/)

```bash
   yum install redis -y
   # 启动redis
   systemctl start redis
   # 查看redis运行状态
   systemctl status redis
   # 停止redis
   systemctl stop redis
   # 重启redis
   systemctl restart redis
   # 设置成开机自启动
   chkconfig redis on
```

## 本地(Mac) redis 运行，[egg-redis](https://github.com/eggjs/egg-redis)

1. 不需要设置密码；
2. 开启与关闭：

```bash
$ brew install redis # 安装 redis
$ brew services list # 查看包状态
$ brew services start redis # 开启 redis
$ brew services stop redis # 停止 redis
$ brew services restart # 重启 redis

# 启动可用
$ brew services start redis ==> Successfully started `redis` (label: homebrew.mxcl.redis)
$ redis-server
```

## 参考

1. [Mac 安装 Homebrew 并配置 Redis](https://www.jianshu.com/p/035be70daf2d)；
