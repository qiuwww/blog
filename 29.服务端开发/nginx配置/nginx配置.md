# Nginx的配置，及Nginx的操作

## Nginx配置
找到http模块，修改http模块中的listen为80，如下：

http {
​    #导入类型配置文件
​    include       mime.types;
​    #设定默认类型为二进制流
​    default_type  application/octet-stream;
​    #启用sendfile()函数
​    sendfile        on;
​    #客户端与服务器连接的超时时间为65秒，超过65秒，服务器关闭连接
​    keepalive_timeout  65;
​    #是否开启gzip，默认关闭
​    #gzip  on;
​    #一个server块
​    server {
​        #服务器监听的端口为80
​        listen       80;
​        #服务器名称为localhost，我们可以通过localhost来访问这个server块的服务，服务器名，如`localhost`、`www.jd.com`，可以通过正则匹配
​        server_name  localhost;
​        #location块，它存放在server块当中，location会尝试根据用户请求中的URI来匹配上面的/uri表达式，如果可以匹配，就选择location {}块中的配置来处理用户请求。URL匹配特定位置配置​        

​	location / {
​            #以root方式设置资源路径，它与alias的不同请见下面的 http模块中文件路径定义
​            root   html;
​            #默认访问的页面，从左依次找到右，直到找到这个文件，然后返回结束请求
​            index  index.html index.htm;
​            #设置错误页面，对应的错误码是404，错误页面是/Users/user/Sites/404.html
​            error_page 404  /404.html;
​        }
​    }
​    include servers/*;
}

## 3、使用Nginx做反向代理

**Nginx 使用反向代理，主要是使用location模块下的proxy_pass选项。**

反向代理（reverse proxy）方式是指用**代理服务器来接受Internet上的连接请求，然后将请求转发给内部网络中的上游服务器，**并将从上游服务器上得到的结果返回给Internet上请求连接的客户端，此时代理服务器对外的表现就是一个Web服务器。

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

```server {
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
    listen 80; # 监听的端口号
    server_name test.com;  #主机名
    location / {
        proxy_pass http://www.zhihu.com;
    }
}
其中，server_name可以指向多个域名值
```

3、重启nginx服务

`$ sudo nginx -s reload`
这时，反向代理已经搭建成功。
你可以在**本地通过chungui.com访问到人人网，test.com访问到知乎。**
不过，设置pinger.com访问的http://www.baidu.com站点，而百度服务器内部会自动跳转到https://www.baidu.com站点，所以我们通过pinger.com会跳转到https://www.baidu.com，这个时候我们可以将百度的替换成https就行了，修改配置如下：

server {
​    listen       80;
​    server_name  *.pinger.com pinger.com;
​    location / {
​        proxy_pass https://www.baidu.com;
​    }
}
这个时候，再使用pinger.com在浏览器里访问时就不会出现跳转的问题了。
**这个时候，其实就是把www.test.com端口上，通过host配置到127.0.0.1:80本地地址，然后再代理给http://www.zhihu.com**

### 反向代理的工作机制  工作流程


> 1. 用户通过域名发出访问Web服务器的请求，该域名被DNS服务器解析为反向代理服务器的IP地址；
> 2. 反向代理服务器接受用户的请求；
> 3. 反向代理服务器在本地缓存中查找请求的内容，找到后直接把内容发送给用户；
> 4. 如果本地缓存里没有用户所请求的信息内容，反向代理服务器会代替用户向源服务器请求同样的信息内容，并把信息内容发给用户，如果信息内容是缓存的还会把它保存到缓存中。



## Nginx操作

#### 启动

`nginx`

#### 退出   需要管理员权限sudo

停止操作是通过向nginx进程发送信号（什么是信号请参阅linux文 章）来进行的

步骤1：查询nginx主进程号
`ps -ef | grep nginx`
在进程列表里 面找master进程，它的编号就是主进程号了。

步骤2：发送信号
从容停止Nginx：
kill -QUIT 主进程号
快速停止Nginx：
kill -TERM 主进程号
强制停止Nginx：
pkill -9 nginx

#### 平滑重启
平滑重启
如果更改了配置就要重启Nginx，要先关闭Nginx再打开？不是的，可以向Nginx 发送信号，平滑重启。
平滑重启命令：
kill -HUP 住进称号或进程号文件路径

E. 重启nginx服务

```
# restart
sudo nginx -s stop
sudo nginx
```

#### 一般修改配置后的重启
一般情况下修改了配置信息之后都需要执行下面命令测试配置信息是否无误然后重新启动服务器：
nginx -t && nginx -s reopen