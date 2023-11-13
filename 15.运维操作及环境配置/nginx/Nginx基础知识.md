# Nginx

nginx 是一个高性能的 HTTP 和反向代理服务器，也是一个通用的 TCP/UDP 代理服务器，最初由俄罗斯人 Igor Sysoev 编写。

## nginx 在应用程序中的作用

1. 解决跨域
2. 请求过滤
3. 配置 gzip
4. 负载均衡
5. 静态资源服务器

## 参考文章

[前端开发者必备的 Nginx 知识](https://mp.weixin.qq.com/s/BA_JZ_kMBFZBE7jjQDNc1Q)

正向代理，也就是 在**用户与服务**之间的代理。

本质就是域名/端口转发。

与直接修改域名转发到固定的 80 端口不同的是：

1. 指定的 80 端口只有一个，对于一个主机来说，但是可以访问的域名的 80 端口确实有很多个。
   1. 127.0.0.1 local.apigw.qa.92jkys.com
   2. 127.0.0.1 xbf.apigw.qa.92jkys.com
   3. 上边的两个同时只能启动一个访问到 127.0.0.1:80 上的服务。
2. 但是使用 nginx，却可以根据域名访问的配置，将多个域名分开，分别请求到不同的端口上；
   1. test.qa.92jkys.com -》 <http://localhost:1024>
   2. test2.qa.92jkys.com -》 <http://localhost:1025>
   3. 上边的请求，都是请求了域名的 80，但是最终都会被代理到 localhost 的不同端口。

也就是只要访问域名就需要映射到本地，因为 nginx 本质也是检测本地的端口的。

## 删除 dns 缓存

`sudo dscacheutil -flushcache`

## 同一个端口不能被多次监听

如不能同时被 nginx 和 node 监听；

似乎 charles 是一个不错的选择。

**可以的**

```conf
<!-- 这里表示，hy.qa.92jkys.com:80的请求被代理到了，http://localhost:9001，所以服务需要启动在9001， --port 9001 -->
server{
  index       index.html;
  listen 80;
  server_name     hy.qa.92jkys.com;
  location / {
      proxy_pass      http://localhost:9001;
      index                    index.js index.html index.htm;
      proxy_buffer_size        128k;
      proxy_buffers            64 64k;
      proxy_busy_buffers_size  256k;
      proxy_set_header         Host $host;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header http_x_forwarded_for $proxy_add_x_forwarded_for;
  }
}
```

## 纯转发简单配置

[nginx 的纯代理转发简单配置](https://www.cnblogs.com/AdamChen/p/12431533.html)

## 字段说明

.conf 文件内容说明：

- listen，服务器的端口号；
- server_name，服务器域名，或者 ip，多个域名的话用空格隔开；
- root，项目的绝对路径；
- index，设置打开的默认页面，默认为 index.html；
- location，配置代理，可以进行跨域访问数据，后面跟的是要转发的请求；
  - rewrite，路径重写，"[原路径] [新路径] break;"
  - proxy_pass，访问的目标地址；
