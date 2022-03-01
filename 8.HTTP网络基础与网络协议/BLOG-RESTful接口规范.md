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
