

# options请求

### 疑问1：什么是options请求

OPTIONS请求方法的主要用途有两个：

1. 获取服务器支持的HTTP请求方法；

2. 用来检查服务器的性能。例如：AJAX进行跨域请求时的预检，需要向另外一个域名的资源发送一个HTTP OPTIONS请求头，用以判断实际发送的请求是否安全。

这是浏览器给我们加上的，后端并没有做任何操作。

### 为什么会用到options请求

解决跨域问题的方法有很多种，CORS（CORS 跨域资源共享）是比较好的解决方案，我们的项目也是用的这种模式，这个模式会有”预检”的请求，也就是正常请求之前的options请求。

```
<add name="Access-Control-Allow-Origin" value="*" />

res.header("Access-Control-Allow-Origin", "*");

```

### Preflighted Requests 预检请求

Preflighted Requests是CORS中一种透明服务器验证机制。预检请求首先需要向另外一个域名的资源发送一个 HTTP OPTIONS 请求头，其目的就是为了判断实际发送的请求是否是安全的。


### 需要预检的请求
1. 非简单请求；
2. 需预检的请求。
