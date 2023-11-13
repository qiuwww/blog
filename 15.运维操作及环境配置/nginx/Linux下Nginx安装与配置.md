# Linux 下 Nginx 安装与配置

## 安装

1. yum install nginx
2. whereis nginx
3. nginx -t，查看配置文件：
   1. /etc/nginx/nginx.conf 配置日志等
   2. /etc/nginx/sites-available/default 配置项目路径等

## 使用

1. systemctl enable nginx
2. systemctl start nginx
3. systemctl status nginx，查看服务状态
4. 启动命令 nginx
5. 重新启动命令 nginx -s reload
6. 关闭的命令 nginx -s stop

## 阿里云的服务器，默认 80 端口被关闭的，需要在安全组打开

1. <https://ecs.console.aliyun.com/securityGroupDetail/region/cn-hangzhou/groupId/sg-bp1fpbj00579luwh7k2t/detail/intranetIngress>

### 设置域名

1. http://110.42.233.184/ 可以访问了
2. 域名用一下；
3. <http://demo.qiuwww.top/static/index.html>

## Nginx 配置

### 查看 nginx 的配置文件

1. 查看配置:`locate nginx.conf`；
2. /etc/nginx/default.d/\*.conf；

## Nginx 配置 https / 需要 https 支持

[申请免费的 ssl](https://yq.aliyun.com/articles/637307)

生成证书 -》 创建 nginx/ssl -》 copy 证书 -》 添加配置 443 端口

https://developer.aliyun.com/article/699966

[真的有免费版的](https://yq.aliyun.com/articles/758151?spm=a2c4e.11155472.0.0.60a4400e69tayM)

[666](https://yundun.console.aliyun.com/?spm=5176.6660585.774526198.1.1cc26bf8Pb0bcL&p=cas#/overview/cn-hangzhou)

### https，ssl 证书申请及配置

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

## alias 与 root

1. root 属性，会把 root 的值（这里是 yyy）加入到访问路径（locaition）之前；
2. alias 属性，和 root 的逻辑不通，会把 alias 的值（这里/data/ceshi/）替代访问路径匹配的部分（这里是/xxx）；

## 查看 nginx 的报错日志

```conf
tail -f /var/log/nginx/error.log
```

## 这里出现了一个 nginx 一直不能访问到前端代码的问题

### 问题处理思路

1. 查看默认位置的`/etc/nginx/nginx.conf`文件配置，如果这里改动了很多次（像我一样）还是没有效果，那么就要考虑是不是这里的问题了；
2. **查看 nginx 的日志文件**`tail -f /var/log/nginx/error.log`，
3. 查看 nginx 当前的依赖的配置文件：
   1. Nginx 配置不生效时，一般去看看错误日志；
   2. 这里的错误信息提示/usr/share/nginx/html/h5/index.html，也就是走的默认 root；
4. vhost 文件夹是干嘛的？
   1. 这个配置的关键是，在 vhost 目录下，你这个 conf 文件生效了
   2. `/etc/nginx/vhost/jmsd-api.conf`，这里的文件覆盖了`/etc/nginx/nginx.conf`这里的配置；
   3. 你 server_name 指定了 ip，也就是说 ip 访问时，这里是最高响应优先级
   4. 在这里把 h5 那个配置加上就可以了
   5. 这两边都添加一下就可以了。

注意区分：

```conf
location /h5 {
   alias /home/code/h5;
}
location /h5 {
   root /home/code;
}
```

## 上传文件提示 413 Request Entity Too Large 错误

1. <https://blog.csdn.net/m0_37899908/article/details/125015061>

这个时候是因为 nginx 的问题，限制了。所以添加配置`client_max_body_size 100M;`；
