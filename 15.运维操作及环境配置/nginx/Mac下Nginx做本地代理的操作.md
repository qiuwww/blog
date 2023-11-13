# Mac 下 Nginx 做本地代理的操作

## mac 下安装

1. brew install nginx
   1. 使用 brew 安装的 nginx 的配置文件：`vi /opt/homebrew/etc/nginx/nginx.conf`
2. 修改配置文件，端口设置为 80，/usr/local/etc/nginx/nginx.conf
3. 通过 nginx -V，可以查看详细信息；
4. 添加权限；
   1. sudo chown root:wheel /usr/local/Cellar/nginx/1.17.9/bin/nginx
   2. sudo chmod u+s /usr/local/Cellar/nginx/1.17.9/bin/nginx
   3. sudo chown -R root:wheel /usr/local/etc/nginx/
5. 这里的版本号要根据自己的做修改，用 brew info nginx 来查看路径

### 配置文件地址

/usr/local/opt/nginx/bin/nginx -t

/usr/local/etc/nginx

### 开启和关闭命令

1. brew services start nginx
   1. <http://localhost:8080/>
2. nginx
   1. 这个也是启动
3. nginx -t
   1. 查看配置
4. nginx -s reload
5. sudo nginx -s reload // 重载配置文件
6. sudo nginx -s stop // 停止 nginx 服务
7. sudo nginx // 开启 nginx 服务

## 查看 mac 下的 nginx 的配置文件

1. 查看 nginx 的安装位置：`ps -ef | grep nginx`；
2. 查看 nginx 的配置：`nginx -t`；
   1. /opt/homebrew/etc/nginx/nginx.conf

## 对本地开发的地址进行域名的替换

1. 收到跨域限制的时候，可以将本地端口代理的一个域名访问上，如`blog/15.运维操作及环境配置/nginx/conf/开发80端口配置.conf`，直接添加配置，启动就可以了；
   1. [参考](https://juejin.cn/post/7157984932868915213)；
   2. 重点：这里的域名地址需要原本就是可以访问到的，且主域名不存在就会报错；
