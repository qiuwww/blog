# Nginx

## 配置域名和 ip 都可以访问

```conf
server {
  listen 80 default;
  rewrite ^(.\*) http://www.yunxr.top/ permanent;
}

server {
  # 配置此段表示用IP或其他域名访问时跳转到test.jima101.com
  listen 80 default;
  server_name 115.231.27.45;
  rewrite ^/(.*) http://test.jima101.com/$1 permanent;
}
```

### proxy_pass

### rewrite

## vhost

Nginx vhost 配置，可实现基于 ip、端口号、servername 的虚拟主机,同时可避免直接修改主配置文件。在 nginx 下配置虚拟主机 vhost 非常方便。这篇文章主要介绍了 nginx 配置虚拟主机 vhost 的方法,需要的朋友可以参考下

## 基本概念

1、全局块：配置影响 nginx 全局的指令。一般有运行 nginx 服务器的用户组，nginx 进程 pid 存放路径，日志存放路径，配置文件引入，允许生成 worker process 数等。

2、events 块：配置影响 nginx 服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。

3、http 块：可以嵌套多个 server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type 定义，日志自定义，是否使用 sendfile 传输文件，连接超时时间，单连接请求数等。

4、server 块：配置虚拟主机的相关参数，一个 http 中可以有多个 server。

5、location 块：配置请求的路由，以及各种页面的处理情况。

<http://t.zoukankan.com/redirect-p-10066742.html>

## alias 与 root

1. root 属性，会把 root 的值（这里是 yyy）加入到访问路径（locaition）之前；
2. alias 属性，和 root 的逻辑不通，会把 alias 的值（这里/data/ceshi/）替代访问路径匹配的部分（这里是/xxx）；

## nginx 的用法

```
server_name

语 法：server_name <address>;, server_name *.<address>;, server_name _;
默认值：server_name "";
上下文：server
描 述：此选项允许你为 listen 端口设置地址，可以使用精确的名称、通配符、或者哈希表。设置哈希表可以快速处理类似服务器名称，MIME 类型，请求头字符串这样的静态数据。哈希表会使用到 ngx_http_map 模块。使用通配符可以使得多个 URL 使用相同的域名。当没有合法的域名存在时，可以使用 _ 这个参数。
server_name www.abc.com one.abc.com;
server_name *.abc.com;
server_name _;
```

## 处理 html 被缓存的问题

1. nginx 配置：`add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";`

## 查看 nginx 的报错日志

```conf
tar -f /var/log/nginx/error.log
```

## https，ssl 证书申请及配置

这里配置 https 的访问，基本就是需要如下几步

1. 配置解析二级域名；
2. 申请证书，在阿里云上，可以去下载；
3. https 默认监听 443 端口，这里给指向到 7001 端口的服务；
4. 将访问 80 的 http 请求也转发到 https 上；

```conf
server {
    listen 443;
    server_name data-collection.qiuww.site; # 你的域名
    ssl on;
    root /var/www/data-collection.qiuww.site; # 前台文件存放文件夹，可改成别的
    index index.html index.htm; # 上面配置的文件夹里面的index.html
    ssl_certificate  cert/4879254_data-collection.qiuww.site.pem; # 改成你的证书的名字
    ssl_certificate_key cert/4879254_data-collection.qiuww.site.key; # 你的证书的名字
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        # index index.html index.htm;
        proxy_pass http://0.0.0.0:7001/;
    }
}

server {
    listen 80;
    server_name data-collection.qiuww.site; # 你的域名
    rewrite ^(.*)$ https://data-collection.qiuww.site:443/$1 permanent; # 把http的域名请求转成https
}
```

### 步骤

1. 申请证书<https://yundun.console.aliyun.com/?spm=5176.12818093.ProductAndResource--ali--widget-product-recent.dre9.5acf16d0AAXpR7&p=cas#/certExtend/buy>；
   1. 免费证书；
   2. 文件验证；
2. 配置服务器 nginx，去验证文件；
3. 配置总的入口:

   ```conf
   server {
        listen       80;
        listen       [::]:80;
        server_name  tool.jima101.com;
        include /home/code/server-config/tool/nginx.tool.conf;
    }

    server {
        listen       80;
        listen       [::]:80;
        server_name 115.231.27.41;
        include /home/code/server-config/tool/nginx.tool.conf;
    }
   ```

4. 下载 nginx 的证书文件，放到服务器上，重启，大功告成。

## qa

### 一直不能访问到配置文件

原因是由于 nginx 不能访问到 nginx 的配置文件，所以每次 nginx -s reload 的时候，并不会加载新的配置文件。所以一直也不生效。需要获取权限，然后关闭再重新打开就好了。

文件权限访问不足，[查看](https://serverfault.com/questions/947301/nginx-displaying-failed-13-permission-denied-when-trying-to-access-new-site)。
