# 存储服务器部署服务

202.75.222.245  => static.jima101.com

现在想把图片和视频放到这边的这个存储服务器上，现在这个没用到。 然后准备配置一个 static.jima101.com 的域名。 这样。分开。应该是合适的吧。 存储服务器现在就没用到，

## 查看服务器的信息

```bash
# 查看内核：
cat /proc/version
# Linux version 3.10.0-957.el7.x86_64 (mockbuild@kbuilder.bsys.centos.org) (gcc version 4.8.5 20150623 (Red Hat 4.8.5-36) (GCC) ) #1 SMP Thu Nov 8 23:39:32 UTC 2018
yum
# 可用
```

## 1. 安装 nginx

1. 查看业务服务器的 nginx 版本；`nginx version: nginx/1.20.1`
2. 具体的安装：`https://cloud.tencent.com/developer/article/1626878`
3. 启动与重启关闭：
   1. `systemctl start nginx`
   2. `systemctl stop nginx`
   3. `systemctl restart nginx`
   4. `systemctl status nginx`
   5. 1 启动 nginx 的命令为 /usr/local/nginx/sbin/nginx
      1. 2
      2. 3 停止 nginx 的命令为 /usr/local/nginx/sbin/nginx -s stop
      3. 4 重启 nginx 的命令为 /usr/local/nginx/sbin/nginx -s reload
   6. 软连接：`ln -s /usr/local/nginx/sbin/nginx`
4. 关联的目录：
   1. 安装成功后，默认的网站目录为： /usr/share/nginx/html
   2. 默认的配置文件为：/etc/nginx/nginx.conf
   3. 自定义配置文件目录为: /etc/nginx/conf.d/

## 校验 ssl 证书

1. 反向代理这个文件：https://www.cnblogs.com/xiongzaiqiren/p/15046116.html

## 安装 git

1. <https://www.cnblogs.com/sunshinekevin/p/13053558.html>

## clone server-config 项目

## 部署成功，访问测试

1. http://static.jima101.com/img/readme.txt
2. https://static.jima101.com/img/readme.txt
3. http://202.75.222.245/img/readme.txt

## 部署 node

https://www.cnblogs.com/egrets/p/14861138.html和mysql；

## 添加文件接收与存储服务

1. 初始化 egg 服务；
2. 修改项目，添加文件服务；
