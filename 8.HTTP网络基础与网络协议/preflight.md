# [preflight](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)

一个 CORS 预检请求是用于检查服务器是否支持 CORS 即跨域资源共享。

它一般是用了以下几个 HTTP 请求首部的 OPTIONS 请求：Access-Control-Request-Method 和 Access-Control-Request-Headers，以及一个 Origin 首部。

## [OPTIONS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS)

1. 要想知道一个服务器支持哪些请求方法，可以使用 curl 命令行程序来发出 OPTIONS 请求：
   1. `curl -X OPTIONS https://example.org -i`
   2. `curl -X OPTIONS https://test.funtown.cn -i`
2. 200 OK 和 204 No Content 都是允许的状态码，但是部分浏览器错误地认为 204 No Content 也适用于该资源，且不发送后续请求来获取资源内容。
