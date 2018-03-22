HTTP协议中使用的数据格式

目的：
更加深刻的理解HTTP协议

主要内容：
1、Zlib 压缩数据
1、Zlib 是一种流行的文件压缩算法，应用十分广泛，尤其是在 Linux 平台。当应用 Zlib 压缩到一个纯文本文件时，效果是非常明显的，大约可以减少70％以上的文件大小,这取决于文件中的内容。

2、Zlib 也适用于 Web 数据传输，比如利用 Apache 中的 Gzip (后面会提到，一种压缩算法) 模块，我们可以使用 Gzip 压缩算法来对 Apache 服务器发布的网页内容进行压缩后再传输到客户端浏览器。这样经过压缩后实际上降低了网络传输的字节数，最明显的好处就是可以加快网页加载的速度。

2、Gzip 压缩两种类型
压缩算法不同，可以产生不同的压缩数据(目的都是为了减小文件大小)。

目前 Web 端流行的压缩格式有两种，分别是 Gzip 和 Defalte。

1、Apache 中的就是 Gzip 模块，

2、Deflate 是同时使用了 LZ77 算法与哈夫曼编码（Huffman Coding）的一个无损数据压缩算法。Deflate 压缩与解压的源代码可以在自由、通用的压缩库 zlib 上找到。

3、更高压缩率的 Deflate 是 7-zip 所实现的。AdvanceCOMP 也使用这种实现，它可以对 gzip、PNG、MNG 以及 ZIP 文件进行压缩从而得到比 zlib 更小的文件大小。在 Ken Silverman的 KZIP 与 PNGOUT 中使用了一种更加高效同时要求更多用户输入的 Deflate 程序。

总结一句话，Deflate 是一种压缩算法,是 huffman 编码的一种加强。 deflate 与 gzip 解压的代码几乎相同，可以合成一块代码。

3、Web 服务器处理数据压缩的过程
1、Web服务器接收到浏览器的HTTP请求后，检查浏览器是否支持HTTP压缩（Accept-Encoding 信息）；（请求头信息中包含的内容）

2、如果浏览器支持HTTP压缩，Web服务器检查请求文件的后缀名；（分不同类型进行不同的处理）

3、如果请求文件是HTML、CSS等静态文件，Web服务器到压缩缓冲目录中检查是否已经存在请求文件的最新压缩文件；（查看服务器中是否有缓存）

4、如果请求文件的压缩文件不存在，Web服务器向浏览器返回未压缩的请求文件（节省处理时间），并在压缩缓冲目录中存放请求文件的压缩文件；（以备以后使用）

5、如果请求文件的最新压缩文件已经存在，则直接返回请求文件的压缩文件；

6、如果请求文件是动态文件，Web服务器动态压缩内容并返回浏览器，压缩内容不存放到压缩缓存目录中。（动态内容，每次都改变，所以每次都要压缩然后返回，并且缓存也没没有必要）

4、例子
1、常见的浏览器的请求头关于数据格式： Accept-Encoding: gzip, deflate

这句话的意思是，浏览器告诉服务器支持 gzip 和 deflate 两种数据格式，服务器收到这种请求之后，会进行 gzip 或 deflate 压缩（一般都是返回 gzip 格式的数据）。

2、服务器给的响应一般如下：Content-Encoding: gzip

这段话说明响应体的压缩方式是 gzip 压缩，一般有几种情况，字段为空表示明文无压缩，还有 Content-Encoding: gzip 和 Content-Encoding: deflate 两种。

3、常见的网页的设置

Accept-Encoding 不设置参数：会返回一个无压缩的响应体（浏览器比较特别，他们会自动设置 Accept-Encoding: gzip： deflate 来提高传输速度）；
Accept-Encoding: gzip，100% 的网站都会返回 gzip 压缩，但不保证互联网所有网站都支持 gzip(万一没开启)；
Accept-Encoding: deflate：只有不到 10% 的网站返回一个 deflate 压缩的响应，其他的则返回一个没有压缩的响应体。
Accept-Encoding: gzip, deflate：返回的结果也都是 gzip 格式的数据，说明在优先级上 gzip 更受欢迎。
4、写个正则表达式匹配响应头是什么压缩:(?<=Content-Encoding: ).+(?=\r\n)

5、分块传输编码 chunked
1、分块传输编码（Chunked transfer encoding）是超文本传输协议（HTTP）中的一种数据传输机制，允许 HTTP 由网页服务器发送给客户端应用（ 通常是网页浏览器）的数据可以分成多个部分。分块传输编码只在 HTTP 协议 1.1 版本（HTTP/1.1）中提供。

2、通常，HTTP 应答消息中发送的数据是整个发送的，Content-Length 消息头字段表示数据的长度。

数据的长度很重要，因为客户端需要知道哪里是应答消息的结束，以及后续应答消息的开始。

然而，使用分块传输编码，数据分解成一系列数据块，并以一个或多个块发送，这样服务器可以发送数据而不需要预先知道发送内容的总大小。通常数据块的大小是一致的，但也不总是这种情况。

6、MultiPart 数据
MultiPart 的本质就是 Post 请求，MultiPart出现在请求中，用来对一些文件（图片或文档）进行处理，

在请求头中出现 Content-Type: multipart/form-data; boundary=::287032381131322 则表示为 MultiPart 格式数据包。