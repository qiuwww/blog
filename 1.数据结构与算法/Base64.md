# Base64 编码算法

1. http 协议传输的时候需要转换'文本'为 Base64 编码，因为 http 协议是文本协议；
2. Base64 是一种编码算法，只支持 64 个[可打印字符]；

## 介绍

1. http 协议传输的时候需要转换'文本'为 Base64 编码，因为 http 协议是文本协议；
2. Base64 是一种编码算法，只支持 64 个[可打印字符]；
3. 常见的加密算法 SHA、AES、MD5、RSA；

## MDN

https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

**Base64**是一组相似的[二进制到文本](https://en.wikipedia.org/wiki/Binary-to-text_encoding)(binary-to-text)的编码规则，使得二进制数据在解释成 radix-64 的表现形式后能够用 ASCII 字符串的格式表示出来。*Base64*  这个词出自一种[MIME 数据传输编码](https://en.wikipedia.org/wiki/MIME#Content-Transfer-Encoding)。

Base64 编码普遍应用于需要通过被设计为处理文本数据的媒介上储存和传输二进制数据而需要编码该二进制数据的场景。这样是为了保证数据的完整并且不用在传输过程中修改这些数据。Base64 也被一些应用（包括使用[MIME](https://en.wikipedia.org/wiki/MIME)的电子邮件）和在[XML](https://developer.mozilla.org/zh-CN/docs/XML)中储存复杂的数据时使用。

在 JavaScript 中，有 2 个函数分别用来处理解码和编码*base64*  字符串：

- [`atob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/atob)
- [`btoa()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa)

`atob()`  函数能够解码通过 base-64 编码的字符串数据。相反地，`btoa()`  函数能够从二进制数据“字符串”创建一个 base-64 编码的 ASCII 字符串。

`atob()`  和  `btoa()`均使用字符串。
