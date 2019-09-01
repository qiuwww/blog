## escape()、encodeURI()、encodeURIComponent()

escape 和 encodeURI 都属于 Percent-encoding，基本功能都是把 URI 非法字符转化成合法字符，转化后形式类似「%*」。

### escape() <该特性已经从 Web 标准中删除>

废弃的 escape() 方法生成新的由十六进制转义序列替换的字符串. 使用 encodeURI 或 encodeURIComponent 代替.

如果只是编码字符串，不和URL有半毛钱关系，那么用escape。


### encodeURI

> encodeURI()  函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。

参数是一个完整的uri。

encodeURI 是基于 UTF-8 的，编码本身理论上可以支持 0x10ffff 内的字符。

encodeURI(Component)  一般用在 URI 上，但是不是一定就要用在 URL 上。

比如如果 POST 请求的 Request Header 中 Content-Type 为「application/x-www-form-urlencoded」， 

那么 Request Payload 里面的数据一般就是使用 encodeURI(Component) 编码的。（和 URL 的 querystring 一样）。

### encodeURIComponent

encodeURI 自身无法产生能适用于HTTP GET 或 POST 请求的URI，

例如对于 XMLHTTPRequests, 因为 **"&", "+", 和 "=" &, ?, /, =** 不会被编码，然而在 GET 和 POST 请求中它们是特殊字符。

然而encodeURIComponent这个方法会对这些字符编码。