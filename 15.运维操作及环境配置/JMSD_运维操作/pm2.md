# pm2

## pm2 常用命令

```
$ npm install pm2 -g # 命令行安装 pm2

$ pm2 start app.js -i 4 # 后台运行 pm2，启动 4 个 app.js

                        # 也可以把'max' 参数传递给 start

                        # 正确的进程数目依赖于Cpu的核心数目

$ pm2 start app.js --name my-api # 命名进程

$ pm2 list # 显示所有进程状态

$ pm2 monit # 监视所有进程

$ pm2 logs # 显示所有进程日志

$ pm2 stop all # 停止所有进程

$ pm2 restart all # 重启所有进程

$ pm2 reload all # 0 秒停机重载进程 (用于 NETWORKED 进程)

$ pm2 stop 0 # 停止指定的进程

$ pm2 restart 0 # 重启指定的进程

$ pm2 startup # 产生 init 脚本 保持进程活着

$ pm2 web # 运行健壮的 computer API endpoint (http://localhost:9615)

$ pm2 delete 0 # 杀死指定的进程

$ pm2 delete all # 杀死全部进程
```

## QA

### Script /root/verdaccio had too many unstable restarts (16). Stopped. "errored"

`pm2 start `which verdaccio`

参考：https://stackoverflow.com/questions/44273846/verdaccio-fail-to-start-having-an-error-cannot-find-module

## midway 项目的启动

1. 运行 build，生成 js 执行文件，这个时候不需要单独设置变量；
2. 执行 pm2，这个时候，可以在前面指定参数，如：
   1. `NODE_ENV=qa pm2 start ./bootstrap.js --name server-common -i 4`；
   2. `NODE_ENV=prod pm2 start ./bootstrap.js --name server-common -i 4`；
   3. 可以在 scripts 中运行；
3. 如果代码有问题，则需要先能本地 dev 运行，才能去打包执行：
   1. 常见 js 不能被处理的问题；

## 启动项目 server-common 会报错

1. 首先检查 pm2 代码日志：`pm2 logs`；
2. 这个时候重新启动目标任务，查看这边的实时日志；

### 目前排除的两个问题

1. 本身代码有问题：
   ```js
   const { Bootstrap } = require('@midwayjs/bootstrap');
   // 可以在启动代码之前添加配置
   // Bootstrap.configure({
   //   imports: [
   //     /*...*/
   //   ],
   // }).run();
   Bootstrap.run();
   ```
2. prod 环境没配置导致报错：
   1. Dialect needs to be explicitly supplied as of v4.0.0
      1. config.prod.js 没加；
