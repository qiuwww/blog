---
title: 浏览器缓存
tags:
  - 浏览器
date: 2020-2-25
---

[TOC]

[参考文章 1: 一文读懂前端缓存](https://github.com/easonyq/easonyq.github.io/blob/master/%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/others/cache.md)

前端的缓存主要在“请求”和“响应”中进行。

- 在“请求”步骤中，浏览器也可以通过**存储结果的方式**直接使用资源，直接省去了发送请求；
- 而“响应”步骤**需要浏览器和服务器共同配合**，通过减少响应内容来缩短传输时间。

主要内容：

- 按缓存位置分类 (memory cache, disk cache, Service Worker 等)
- 按失效策略分类 (Cache-Control, ETag 等)
- 帮助理解原理的一些案例
- 缓存的应用模式

## 按缓存位置分类

- 从 HTTP 协议头中的缓存字段开始，例如 Cache-Control, ETag, max-age，属于 disk cache。
- memory cache, disk cache

**通过 network 中的 size 字段可以区分请求的处理方式**。缓存的资源：Status Code: 200 OK (from memory cache)

### 网络请求的来源的优先级

它们的**优先级**是：(由上到下寻找，找到即返回；找不到则继续)

- Service Worker
- Memory Cache
- Disk Cache
- 网络请求

### memory cache

memory cache 是内存中的缓存，(与之相对 disk cache 就是硬盘上的缓存)。

按照操作系统的常理：先读内存，再读硬盘。

几乎所有的网络请求资源都会被浏览器自动加入到 memory cache 中。

memory cache 注定只能是个“短期存储”。常规情况下，浏览器的 TAB 关闭后该次浏览的 memory cache 便告失效 (为了给其他 TAB 腾出位置)。

#### 进入 memory cache 的请求主要有两块

- **preloader**(浏览器自动提前加载的资源)，表示 js/css 之类的异步资源，先下载，然后解析，被 preloader 请求够来的资源就会被放入 memory cache 中，供之后的解析执行操作使用。
- **preload**(开发人员主动预加载的资源)，例如 `<link rel="preload">`。这些显式指定的预加载资源，也会被放入 memory cache 中。

memory cache 机制保证了一个页面中如果**有两个相同的请求** (例如两个 src 相同的 `<img>`，两个 href 相同的 `<link>`)都实际**只会被请求最多一次，避免浪费**。

在**从 memory cache 获取缓存内容**时，浏览器会忽视例如 max-age=0, no-cache 等头部配置。例如页面上存在几个相同 src 的图片，即便它们可能被设置为不缓存，但依然会从 memory cache 中读取。(很符合常理)这是因为 memory cache 只是**短期使用**，大部分情况生命周期只有一次浏览而已。**而 max-age=0 在语义上普遍被解读为“不要在下次浏览时使用”**，所以和 memory cache 并不冲突。

但如果站长是真心不想让一个资源进入缓存，就连短期也不行，那就需要使用 **no-store**。存在这个头部配置的话，即便是 memory cache 也不会存储，自然也不会从中读取了。

### disk cache，硬盘上的缓存

disk cache 也叫 HTTP cache，顾名思义是存储在硬盘上的缓存，因此它是持久存储的，是实际存在于文件系统中的。

而且它允许相同的资源在跨会话，甚至跨站点的情况下使用，**例如两个站点都使用了同一张图片。**

disk cache **会严格根据 HTTP 头信息中的各类字段来判定哪些资源可以缓存**，

- 哪些资源**不可以缓存**；
- 哪些资源是**仍然可用**的，
- 哪些资源是**过时需要重新请求**的。

当命中缓存之后，浏览器**会从硬盘中读取资源**，虽然比起从内存中读取慢了一些，但比起网络请求还是快了不少的。绝大部分的缓存都来自 disk cache。

凡是持久性存储都会面临容量增长的问题，disk cache 也不例外。在**浏览器自动清理**时，会有神秘的算法去把“最老的”或者“最可能过时的”资源删除，因此是一个一个删除的。不过每个浏览器识别“最老的”和“最可能过时的”资源的算法不尽相同，可能也是它们差异性的体现。

### Service Worker(没太懂？)

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorker)

上述的缓存策略(memory cache & disk cache)以及缓存/读取/失效的动作都是**由浏览器内部判断 & 进行**的，我们只能设置响应头的某些字段来告诉浏览器，而不能自己操作。

我们可以从 Chrome 的 F12 中，**Application -> Cache Storage** 找到这个单独的“小金库”。

除了位置不同之外，**这个缓存是永久性的**，即关闭 TAB 或者浏览器，下次打开依然还在(而 memory cache 不是)。

有两种情况会导致这个缓存中的资源被清除：

- 手动调用 API cache.delete(resource)
- 或者容量超过限制，被浏览器全部清空。

### 请求网络

如果一个请求在上述 3 个位置都没有找到缓存，那么浏览器会正式发送网络请求去获取内容。

为了提升之后请求的缓存命中率，自然要把这个资源添加到缓存中去。具体来说：

- 根据 Service Worker 中的 **handler 决定是否存入 Cache Storage** (额外的缓存位置)。
- 根据 HTTP 头部的相关字段(Cache-control, Pragma 等)决定是否存入 disk cache
- memory cache 保存一份资源 的引用，以备下次使用。

## 按失效策略分类

- memory cache 是浏览器为了加快读取缓存速度而进行的自身的优化行为，**不受开发者控制**，也不受 HTTP 协议头的约束，算是一个黑盒。
- Service Worker 是由开发者编写的额外的脚本，且缓存位置独立，出现也较晚，使用还不算太广泛。
- 所以我们平时**最为熟悉的其实是 disk cache**，也叫 HTTP cache (因为不像 memory cache，它遵守 HTTP 协议头中的字段)。**平时所说的强制缓存**，对比缓存，以及 Cache-Control 等，也都归于此类。

### 强制缓存 (也叫强缓存)，Expires -> Cache-control

强制缓存的含义是，当客户端请求后，**会先访问缓存数据库看缓存是否存在**。如果存在则直接返回；不存在则请求真的服务器，响应后再写入缓存数据库。

**强制缓存直接减少请求数，是提升最大的缓存策略。**

可以造成强制缓存的字段是 Cache-control 和 Expires。

#### Expires，过期时间 = 一个绝对的时间 (当前时间+缓存时间)

`Expires: Thu, 10 Nov 2017 08:45:11 GMT`

在响应消息头中，设置这个字段之后，就可以告诉浏览器，在**未过期之前不需要再次请求**。

但是，这个字段设置时有两个缺点：

- 由于是绝对时间，用户可能会将客户端**本地的时间进行修改**，而导致浏览器判断缓存失效，重新请求该资源。此外，即使不考虑自行修改，**时差或者误差**等因素也可能造成客户端与服务端的时间不一致，致使缓存失效。

- 写法太复杂了。表示时间的字符串多个空格，少个字母，都会导致**非法属性**从而设置失效。

#### Cache-control，已知 Expires 的缺点之后，在 HTTP/1.1 中，增加了一个字段 Cache-control

`Cache-control: max-age=2592000`

该字段表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求。

是一个是相对时间，相对于资源被缓存的时间点。

[Cache-control 常用到的值](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)：

- max-age：即最大有效时间，在上面的例子中我们可以看到
- must-revalidate：**如果超过了 max-age 的时间**，浏览器必须向服务器发送请求，验证资源是否还有效。
- no-cache：虽然字面意思是“不要缓存”，但实际上**还是要求客户端缓存内容的**，只是是否使用这个内容由后续的对比来决定。
- no-store: 真正意义上的“不要缓存”。所有内容都不走缓存，包括强制和对比。
- public：**所有的内容都可以被缓存** (包括客户端和代理服务器， 如 CDN)
- private：所有的内容**只有客户端才可以缓存**，代理服务器不能缓存。默认值。

自从 HTTP/1.1 开始，Expires 逐渐被 Cache-control 取代。

Cache-control 的优先级高于 Expires，为了兼容 HTTP/1.0 和 HTTP/1.1，实际项目中两个字段我们都会设置。

### 对比缓存 (也叫协商缓存)

当强制缓存失效(超过规定时间)时，就需要使用对比缓存，**由服务器决定缓存内容是否失效**。

流程上说，浏览器先请求缓存数据库，**返回一个缓存标识**。之后浏览器拿这个标识和服务器通讯。

- 如果缓存未失效，则**返回 HTTP 状态码 304(Not Modified，未改变说明无需再次传输请求的内容，也就是说可以使用缓存的内容。) 表示继续使用**，于是客户端继续使用缓存；
- 如果失效，则返回新的数据和缓存规则，浏览器响应数据后，再把规则写入到缓存数据库。

对比缓存在请求数上和没有缓存是一致的，但如果是 304 的话，返回的仅仅是一个状态码而已，并没有实际的文件内容，因此 在响应体体积上的节省是它的优化点。

对比缓存是可以和强制缓存一起使用的，作为在强制缓存失效后的一种后备方案。

#### Last-Modified(本地缓存记录的时间) & If-Modified-Since(请求头，发送给服务器的时间)，也就是服务端认为资源没有修改告诉浏览器，直接用原来请求的数据

1. 服务器通过 Last-Modified 字段告知客户端，资源最后一次被修改的时间，
2. 例如`Last-Modified: Mon, 10 Nov 2018 09:10:11 GMT`，浏览器将这个值和内容一起记录在缓存数据库中。
3. 下一次请求相同资源时时，浏览器从自己的缓存中**找出“不确定是否过期的”缓存**。因此在请求头中**将上次的 Last-Modified 的值写入到请求头的 If-Modified-Since 字段**。
4. 服务器会将 If-Modified-Since 的值与 Last-Modified 字段进行对比。如果相等，则表示未修改，响应 304；反之，则表示修改了，响应 200 状态码，并返回数据。

但是他还是有一定缺陷的：

- 如果资源更新的速度是秒以下单位，那么该缓存是不能被使用的，因为它的时间单位最低是秒。
- 如果文件是通过服务器动态生成的，那么该方法的更新时间永远是生成的时间，尽管文件可能没有变化，所以起不到缓存的作用。

#### Etag(HTTP 响应头是资源的特定版本的标识符) & If-None-Match(随请求发送到服务端)

为了解决上述问题，出现了一组新的字段 Etag 和 If-None-Match

Etag 存储的是**文件的特殊标识**(一般都是 hash 生成的)，服务器存储着文件的 Etag 字段。之后的流程和 Last-Modified 一致，**只是 Last-Modified 字段和它所表示的更新时间改变成了 Etag 字段和它所表示的文件 hash**，把 If-Modified-Since 变成了 If-None-Match。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。

Etag 的优先级高于 Last-Modified。

## 一个图片请求的 response

[url](https://lh3.googleusercontent.com/-XnoVed9blQ4/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nDdorBQbhbgU1-O62grfzDZnXOuiQ.CMID/s64-c/photo.jpg)

```js
access-control-allow-origin: *
access-control-expose-headers: Content-Length
alt-svc: quic=":443"; ma=2592000; v="46,43",h3-Q050=":443"; ma=2592000,h3-Q049=":443"; ma=2592000,h3-Q048=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000
cache-control: public, max-age=86400, no-transform
content-disposition: inline;filename=""
content-length: 9174
content-type: image/png
date: Wed, 26 Feb 2020 02:43:13 GMT
etag: "v34"
expires: Thu, 27 Feb 2020 02:43:13 GMT
server: fife
status: 200
timing-allow-origin: *
vary: Origin
x-content-type-options: nosniff
x-xss-protection: 0
```

## 缓存小结

当浏览器要请求资源时

1. 调用 Service Worker 的 fetch 事件响应
2. 查看 memory cache
3. 查看 disk cache。这里又细分：
   1. 如果有强制缓存且未失效，则**使用强制缓存，不请求服务器。这时的状态码全部是 200**
   2. 如果有强制缓存但已失效，使用**对比缓存**，比较后确定 304 还是 200
4. 发送网络请求，等待网络响应
5. 把响应内容存入 disk cache (如果 HTTP 头信息配置可以存的话)
6. 把响应内容 **的引用 存入 memory cache**(无视 HTTP 头信息的配置)
7. 把响应内容存入 Service Worker 的 Cache Storage (如果 Service Worker 的脚本调用了 cache.put())

## 验证测试，查看 cache-test/

[参考文档：缓存头 Cache-Control 的含义和使用](https://juejin.im/post/5ba59e5f5188255ca1537c03)

### Cache-Control，查看 cache-test/memory_cache-disk_cache

设置请求资源缓存时间：`Cache-control: max-age=86400`

1. 首次请求，毫无意外的全部走网络请求，因为什么缓存都还没有。
2. **再次请求 (F5)**，第二次请求，三个请求（js、css、图片）都来自 memory cache。因为我们没有关闭 TAB，所以浏览器把缓存的应用加到了 memory cache。(耗时 0ms，也就是 1ms 以内)，html 文件还是会重新请求的，不管缓存与否。
3. 关闭 TAB，打开新 TAB 并再次请求，因为关闭了 TAB，memory cache 也随之清空。但是 disk cache 是持久的，于是所有资源来自 disk cache。(大约耗时 3ms，因为文件有点小)。

#### 这样就会导致一些问题，服务端修改返回内容，客户端没有加载新的内容

因为请求 url 没变，浏览器会直接从缓存读取，不需要经过服务端验证，导致静态资源更新后，没有及时更新到客户端。

**解决方案**，打包静态资源时，根据内容进行 hash 计算，**生成文件名的 hash 码**。内容变，hash 码变，请求资源 url 变，浏览器重新请求加载资源，达到更新缓存的目的。

### no-cache & no-store，查看 cache-test/no_cache-no_store

我们在 index.html 里面一些代码，完成两个目标：

- 每种资源都(同步)请求两次
- 增加脚本异步请求图片

1. **当把服务器响应设置为 Cache-Control: no-cache 时**，我们发现打开页面之后，三种资源都只被请求 1 次。

这说明两个问题：

- 同步请求方面，浏览器会自动把当次 HTML 中的资源存入到缓存 (memory cache)，这样碰到相同 src 的图片就会**自动读取缓存(但不会在 Network 中显示出来)**
- **异步请求方面，浏览器同样是不发请求而直接读取缓存返回**。但同样不会在 Network 中显示。

总体来说，如上面原理所述，no-cache 从语义上表示下次请求不要直接使用缓存而需要比对，并不对本次请求进行限制。因此浏览器在处理当前页面时，可以放心使用缓存。

2. 当把服务器响应设置为 **Cache-Control: no-store 时**，情况发生了变化，三种资源都被请求了 2 次。而图片因为还多一次异步请求，总计 3 次。(红框中的都是那一次异步请求)，（这里最新的 chrome，并不会请求三次。）

这同样说明：

- 如之前原理所述，**虽然 memory cache 是无视 HTTP 头信息的，但是 no-store 是特别的。在这个设置下，memory cache 也不得不每次都请求资源。**
- **异步请求和同步遵循相同的规则**，在 no-store 情况下，依然是每次都发送请求，不进行任何缓存。

### Content-Type

在 http 响应里面有几个重要的东西，Content-Type 说明文件渲染 MIME 类型,这是我们本文的相关处理关键。

```json
{
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
}
```

## 浏览器的行为

所谓浏览器的行为，指的就是用户在浏览器如何操作时，会触发怎样的缓存策略。主要有 3 种：

1. 打开网页，地址栏输入地址： 查找 disk cache 中是否有匹配。如有则使用；如没有则发送网络请求。
2. 普通刷新 (F5)：因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用(如果匹配的话)。其次才是 disk cache。
3. 强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 Cache-control: no-cache(为了兼容，还带了 Pragma: no-cache)。服务器直接返回 200 和最新内容。

## 缓存的应用模式

### 模式 1: 不常变化的资源

Cache-Control: max-age=31536000

而**为了解决更新的问题**，就需要在文件名(或者路径)中添加 hash， 版本号等动态字符，之后更改动态字符，达到更改引用 URL 的目的，从而让之前的强制缓存失效 (其实并未立即失效，只是不再使用了而已)。

### 模式 2：经常变化的资源

Cache-Control: no-cache

这类资源的特点是：**URL 不能变化，但内容可以(且经常)变化**。我们可以设置 Cache-Control: no-cache 来迫使浏览器每次请求都必须找服务器验证资源是否有效。

### 模式 3：非常危险的模式 1 和 2 的结合 （反例）

Cache-Control: max-age=600, must-revalidate

表面上看这很美好：资源可以缓存 10 分钟，10 分钟内读取缓存，10 分钟后和服务器进行一次验证，集两种模式之大成，但实际线上暗存风险。因为上面提过，浏览器的缓存有自动清理机制，开发者并不能控制。

举个例子：当我们有 3 种资源： index.html, index.js, index.css。我们对这 3 者进行上述配置之后，假设在某次访问时，index.js 已经被缓存清理而不存在，但 index.html, index.css 仍然存在于缓存中。这时候浏览器会向服务器请求新的 index.js，然后配上老的 index.html, index.css 展现给用户。这其中的风险显而易见：不同版本的资源组合在一起，报错是极有可能的结局。

问题的出现和是否列出 'must-revalidate' 无关，**依然会存在 JS CSS 等文件版本失配的问题。因此常规的网站在不同页面需要使用不同的 JS CSS 文件时，如果要使用 max-age 做强缓存，不要设置一个太短的时间。**

## 关于 Web 静态资源缓存自动更新的思考与实践

1、关于如何自动实现缓存更新
2、缓存对于前端性能的优化是十分重要的，在正式发布系统的时候，对于那些不经常变动的静态资源比如各种 JS 工具库、CSS 文件、背景图片等等我们会设置一个比较大的缓存过期时间（max-age）
3、强制缓存静态资源还不给你清除缓存的机会（微信，说的就是你！），该怎么办？即使你的服务端已更新，文件的 Etag 值已变化，但是微信就是不给你更新文件…请允许我做一个悲伤的表情…

4、解决方案：

① 我们很自然的想法是在每次发布新版本的时候给所有静态资源的请求后面**加上一个版本参数或时间戳**，类似于/js/indx.js?ver=1.0.1

这样做存在的问题：

1>微信对于加参数的静态资源还是**优先使用缓存版本**（实际测试的情况是这样的）。
2>假如这样是可行的，那么对于没有变更的静态资源也会重新从服务器获取而不是读取缓存，没有充分利用缓存。

② 我们知道一个**文件的 MD5 可以唯一标识一个文件**。若文件发生了变化，文件的指纹值 MD5 也随之变化。利用这个特性我们就可以标识出哪个静态资源发生了变化，并让客户端主动更新。

## 302 与 304

### 302：重定向，Temporarily Moved

当响应码为 302 时，表示服务器要求浏览器重新再发一个请求，服务器会发送一个响应头 Location，**它指定了新请求的 URL 地址**；

### 304：Not Modified，未改变说明无需再次传输请求的内容，也就是说可以使用缓存的内容。

当用户第一次请求 index.html 时，服务器会添加一个名为 **Last-Modified 响应头**，这个头说明了 index.html 的最后修改时间，浏览器会把 index.html 内容，以及最后响应时间缓存下来。当用户第二次请求 index.html 时，在请求中包含一个名为 If-Modified-Since 请求头，它的值就是第一次请求时服务器通过 Last-Modified 响应头发送给浏览器的值，即 index.html 最后的修改时间，**If-Modified-Since 请求头**就是在告诉服务器，我这里浏览器缓存的 index.html 最后修改时间是这个，您看看现在的 index.html 最后修改时间是不是这个，如果还是，那么您就不用再响应这个 index.html 内容了，我会把缓存的内容直接显示出来。而服务器端会获取 If-Modified-Since 值，与 index.html 的当前最后修改时间比对，如果相同，服务器会发响应码 304，表示 index.html 与浏览器上次缓存的相同，无需再次发送(节省传输成本)，浏览器可以显示自己的缓存页面，如果比对不同，那么说明 index.html 已经做了修改，服务器会响应 **200**。

## html 文件可以被缓存吗

### 页面不缓存的 head 设置

```html
<meta http-equiv="Expires" content="0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-control" content="no-cache" />
<meta http-equiv="Cache" content="no-cache" />
```

1. ### 主动缓存 html 文件

前端设置 http 缓存,前端设置 html 页面缓存方法：静态的 html 页面想要设置使用缓存需要通过 HTTP 的 META 设置 expires 和 cache-control

这里添加缓存控制，可让 html 文件也实现缓存，需要后端配合缓存 html 文件控制。

设置如下网页元信息:

```html
<meta http-equiv="Cache-Control" content="max-age=7200" />
<meta http-equiv="Expires" content="Mon, 20 Jul 2013 23:00:00 GMT" />
```

2. 使用 HTML5 manifest 离线缓存
3. 还有很多莫名的缓存 html 文件的情况

## HTML5 manifest 离线缓存

通过，[manifest](https://developer.mozilla.org/zh-CN/docs/Web/Manifest) 这个属性，这个属性会缓存 html。

## 清楚缓存的相关问题

### 对于 html 文件

方法一 修改请求 header 头，比如 php 添加：

```js
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');
```

方法二 修改 html 的 head 块：

```html
<meta http-equiv="pragma" content="no-cache" />;

<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />

<meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT" />

<meta http-equiv="expires" content="0" />
```

### 对于 js/css/img 之类的资源文件

1. 添加查询参数

```html
<img src="./data/avatar_mingpian_bak.jpg?rand=h9xqeI" width="156" height="98" />
```

2. 添加文件名 hash 值，只要 html 文件改变资源的请求名称自然会重新请求。

```html
<script src="index.aaaa.js"></script>
<script src="index.bbbb.js"></script>
```
