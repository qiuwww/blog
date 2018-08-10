找到http模块，修改http模块中的listen为80，如下：

http {
    #导入类型配置文件
    include       mime.types;
    #设定默认类型为二进制流
    default_type  application/octet-stream;
    #启用sendfile()函数
    sendfile        on;
    #客户端与服务器连接的超时时间为65秒，超过65秒，服务器关闭连接
    keepalive_timeout  65;
    #是否开启gzip，默认关闭
    #gzip  on;
    #一个server块
    server {
        #服务器监听的端口为80
        listen       80;
        #服务器名称为localhost，我们可以通过localhost来访问这个server块的服务
        server_name  localhost;
        #location块，它存放在server块当中，location会尝试根据用户请求中的URI来匹配上面的/uri表达式，如果可以匹配，就选择location {}块中的配置来处理用户请求。
        location / {
            #以root方式设置资源路径，它与alias的不同请见下面的 http模块中文件路径定义
            root   html;
            #默认访问的页面，从左依次找到右，直到找到这个文件，然后返回结束请求
            index  index.html index.htm;
            #设置错误页面，对应的错误码是404，错误页面是/Users/user/Sites/404.html
            error_page 404  /404.html;
        }
    }
    include servers/*;
}


3、使用Nginx做反向代理
反向代理（reverse proxy）方式是指用代理服务器来接受Internet上的连接请求，然后将请求转发给内部网络中的上游服务器，并将从上游服务器上得到的结果返回给Internet上请求连接的客户端，此时代理服务器对外的表现就是一个Web服务器。
这里，我是在本机搭建，通过修改host来模拟多个域名访问本机的nginx。

1、修改hosts文件
$ vim /etc/hosts
在内部添加域名解析

127.0.0.1 pinger.com www.pinger.com
127.0.0.1 test.com www.test.com
127.0.0.1 chungui.com www.chungui.com
2、修改nginx配置文件
$ sudo vim /usr/local/etc/nginx/nginx.conf
在后面添加server模块，内部通过proxy_pass设置反向代理

server {
    listen  80;
    server_name  *.pinger.com pinger.com;
    location / {
        proxy_pass http://www.baidu.com;
    }
}
server {
    listen 80;
    server_name *.chungui.com chungui.com;
    location / {
        proxy_pass http://www.renren.com;
    }
}
server {
    listen 80;
    server_name test.com;
    location / {
        proxy_pass http://www.zhihu.com;
    }
}
其中，server_name可以指向多个域名值

3、重启nginx服务
#重启服务
$ sudo nginx -s reload
这时，反向代理已经搭建成功。你可以在本地通过chungui.com访问到人人网，test.com访问到知乎。不过，设置pinger.com访问的http://www.baidu.com站点，而百度服务器内部会自动跳转到https://www.baidu.com站点，所以我们通过pinger.com会跳转到https://www.baidu.com，这个时候我们可以将百度的替换成https就行了，修改配置如下：

server {
    listen       80;
    server_name  *.pinger.com pinger.com;
    location / {
        proxy_pass https://www.baidu.com;
    }
}
这个时候，再使用pinger.com在浏览器里访问时就不会出现跳转的问题了。
