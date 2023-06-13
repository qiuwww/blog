---
title: RESTful API 最佳实践
date: 2016-6-6
tags:
  - 后端开发
  - RESTful
  - 接口规范
  - Node
categories:
  - [后端开发, RESTful]
  - [Node]
---

## 动词 + 宾语

RESTful 的核心思想就是，**客户端发出的数据操作指令都是"动词 + 宾语"的结构**。比如，GET /articles 这个命令，GET 是动词，/articles 是宾语。

## 宾语必须是名词

宾语就是 API 的 URL，是 HTTP 动词作用的对象。它应该是名词，不能是动词。比如，/articles 这个 URL 就是正确的，而下面的 URL 不是名词，所以都是错误的。
不应该添加动词，使用路径表示资源位置。

```js
/getAllCars
/createNewCar
/deleteAllRedCars
```

## 复数 URL

既然 URL 是名词，那么应该使用复数，还是单数？

这没有统一的规定，但是常见的操作是读取一个集合，比如 GET /articles（读取所有文章），这里明显应该是复数。

为了统一起见，建议都使用复数 URL，比如 GET /articles/2 要好于 GET /article/2。

## 状态码必须精确

客户端的每一次请求，服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分。

HTTP 状态码就是一个三位数，分成五个类别。

```js
1xx：相关信息
2xx：操作成功
3xx：重定向
4xx：客户端错误
5xx：服务器错误
```

这五大类总共包含 100 多种状态码，覆盖了绝大部分可能遇到的情况。每一种状态码都有标准的（或者约定的）解释，客户端只需查看状态码，就可以判断出发生了什么情况，所以服务器应该返回尽可能精确的状态码。

API 不需要 1xx 状态码。

## 深入理解 restful | restful 规范

1. RESTful 是一种**架构的规范与约束、原则**，符合这种规范的架构就是 RESTful 架构。
2. 英文 `Representational state transfer` **表述性状态转移** 其实就是对 资源 的表述性状态转移。
3. RESTful 的核心思想就是，客户端发出的数据操作指令都是"**动词 + 宾语**"的结构。

### 动词通常就是五种 HTTP 方法，对应 CRUD 操作

- GET：读取（Read）
- POST：新建（Create）
- PUT：更新（Update）
- PATCH：更新（Update），通常是部分更新
- DELETE：删除（Delete）

根据 HTTP 规范，动词一律大写。

## RESTful 架构优点

1. **前后端分离**，减少流量；
2. **安全问题集中在接口上**，由于接受 json 格式，防止了注入型等安全问题
3. **前端无关化**，后端只负责数据处理，前端表现方式可以是任何前端语言（android，ios,html5）
4. **前端和后端人员更加专注于各自开发**，只需接口文档便可完成前后端交互，无需过多相互了解
5. **服务器性能优化**：由于前端是静态页面，通过 nginx 便可获取，服务器主要压力放在了接口上

## 参考文章

[RESTful 接口设计原则和优点](https://www.cnblogs.com/rgcLOVEyaya/p/RGC_LOVE_YAYA_617days.html)

[RESTful 架构风格下的 4 大常见安全问题](https://insights.thoughtworks.cn/security-issues-in-restful/)

## rest 中三种类型的参数获取

1. 查询字符，query：`ctx.query`；
2. 路径参数`:id`之类的：`ctx.params`；
3. body 请求体：`ctx.request.body`;

```js
async function post(ctx, next) {
  const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|20-100': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        name: '@string(10, 200)',
        say: '@cword(10, 200)',
      },
    ],
  });

  // 输出结果
  ctx.state = {
    code: 0,
    data: {
      list: data.list,
      ctx: ctx,
      query: ctx.query,
      parmas: ctx.params,
      body: ctx.request.body, // 需要bodyParser中间件进行处理
    },
  };
  // const { signature, timestamp, nonce, echostr } = ctx.query
  // if (checkSignature(signature, timestamp, nonce)) ctx.body = echostr
  // else ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'
}
```

## HTTP 的几种请求方法的用途：Request Method

1. GET 方法：发送一个请求来**取得**服务器上的某一资源
2. POST 方法：向 URL 指定的资源**提交**数据或附加新的数据
3. PUT 方法：跟 POST 方法很像，也是想服务器提交数据。但是，它们之间有不同。**PUT 指定了资源在服务器上的位置**，而 POST 没有
4. HEAD 方法：**只请求页面的首部**
5. DELETE 方法：删除服务器上的某资源
6. OPTIONS 方法：**它用于获取当前 URL 所支持的方法。**如果请求成功，会有一个 **Allow 的头包含类似“GET,POST”这样的信息**，在 get|post 前，都会有一个 options 请求

7. TRACE 方法：TRACE 方法被用于激发一个远程的，应用层的请求消息回路
8. CONNECT 方法：把请求连接转换到透明的 TCP/IP 通道

## GET 请求与 POST 请求的区别

HTTP 的底层是 TCP/IP。所以 GET 和 POST 的底层也是 TCP/IP，也就是说，GET/POST 都是 TCP 链接的**特定封装**。

GET 和 POST 能做的事情是一样一样的。

你要给 GET 加上 request body，给 POST 带上 url 参数，技术上是完全行的通的。

**只是对不同类型的请求的一种包装**。

具体细节上讲：

1. **语义上讲**，get 主要用于从服务器请求数据，post 主要用于向服务端发送数据；
2. **请求参数**，**携带信息上讲**，get 一般通过 url 传递信息(query)，有限制 2k，post 请求有请求体，可以携带数据(body)，基本无限制。
3. 在**缓存应用**上，**GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置**。
4. GET 比 POST**更不安全**，**因为参数直接暴露在 URL 上**，更容易模拟。
5. **浏览器操作历史**，GET 在浏览器回退时是无害的，而 POST 会再次提交请求。
6. 接受的**编码字符方面**，GET 请求只接受 ASCII 字符的参数，而 POST 则没有限制。
