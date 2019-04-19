

### 区别

1.GET在浏览器回退时是无害的，而POST会再次提交请求。
2.GET产生的URL地址可以被Bookmark，而POST不可以。
3.GET请求会被浏览器主动cache，而POST不会，除非手动设置。
4.GET请求只能进行url编码，而POST支持多种编码方式。
5.GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
6.GET请求在URL中传送的参数是有长度限制的，而POST么有。
7.对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
8.GET比POST**更不安全**，因为参数直接暴露在URL上（post的参数也可以通过url传递啊），所以不能用来传递敏感信息。
9.GET参数通过URL传递，POST（可以）放在Request body中。


### GET和POST本质上没有区别

HTTP的底层是TCP/IP。所以GET和POST的底层也是TCP/IP，也就是说，GET/POST都是TCP链接。

GET和POST能做的事情是一样一样的。

你要给GET加上request body，给POST带上url参数，技术上是完全行的通的。 

只是对不同类型的请求的一种包装。


> 业界不成文的规定是，（大多数）浏览器通常都会限制url长度在2K个字节，而（大多数）服务器最多处理64K大小的url。



### 具体的区别

1. GET产生一个TCP数据包；POST产生两个TCP数据包。
    - 对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
    - 而对于POST，浏览器先发送header，**服务器响应100 continue**，浏览器再发送data，服务器响应200 ok（返回数据）。
