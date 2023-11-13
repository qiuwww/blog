# 建立自己的 npm 镜像服务器

## 先要安装 node

- `ln -s /home/soft/node-v16.15.1-linux-x64/bin/node /usr/local/bin/node`
- `ln -s /home/soft/node-v16.15.1-linux-x64/bin/npm /usr/local/bin/npm`
- `ln -s /home/soft/node-v16.15.1-linux-x64/bin/npx /usr/local/bin/npx`
- `ln -s /home/soft/node-v16.15.1-linux-x64/bin/yarn /usr/local/bin/yarn`

## 配置

配置文件:`vi /root/verdaccio/config.yaml`；

需要先配置： url_prefix: /verdaccio/

配置 nginx 代理

```
location /verdaccio/ {
    proxy_pass              http://127.0.0.1:4873/;
    proxy_set_header        Host $host;
}
```

```yaml
'@jm/*':
  access: $all
  publish: $authenticated
  unpublish: $authenticated
```

这系统的页面资源写死的是 http 的，所以 https 访问会跨域。

只能访问 http 的了：

### 使用 pm2 启动

pm2 start verdaccio

这里会报错？

## 使用

1. 访问地址：http://tool.jima101.com/verdaccio/
2. 修改源：npm config set registry http://tool.jima101.com/verdaccio/
3. 2 步，也可以使用 nrm 来管理：
   1. nrm add jm http://tool.jima101.com/verdaccio/
   2. nrm use jm
   3. 测试： yarn add dayjs，查看 yarn.lock 可以看到源地址已修改
   ```
    dayjs@^1.11.6:
    version "1.11.6"
    resolved "http://tool.jima101.com/verdaccio/dayjs/-/dayjs-1.11.6.tgz#2e79a226314ec3ec904e3ee1dd5a4f5e5b1c7afb"
   ```
4. 上传一个依赖包
   1. npm adduser --registry http://tool.jima101.com/verdaccio/
   2. npm whoami
   3. npm init && add index.js && npm version 1.0.1
   4. npm publish --registry http://tool.jima101.com/verdaccio/
   5. 然后可以使用登录账户就可以查看了
   6. 当前的包，都添加似有说明 `@jm/uniapp-ui`；

## 参考

1. [建立自己的 npm 镜像服务器](https://cloud.tencent.com/developer/article/1722254)；

## QA

1. Cannot publish over existing version.
   1. 表示存在了重复的包名；

## 参考

1. [Linux 服务器上 从 0 到 1 使用 verdaccio 搭建 npm 私有化仓库](https://segmentfault.com/a/1190000040366067)
