# mockjs

> [官网](http://mockjs.com/)

## 实际工作中使用的意义

1. 不受制于后端接口的开发；
2. 数据随机生成，发现可能出现的问题；
3. ajax 的拦截，与真正的接口对接代码的写法无差；
4. 单元测试；
5. 数据类型丰富，可扩展。

## 内部原理

比较完备的随机数据字典

### mockjs 模块

1. bin
2. dist/mockjs->src/mock/random/\*
3. CHANGELOG.md

## 如何使用

1. 命令行 random 命令；
2. 前端文件引用拦截 ajax 或封装为一个函数调用；
3. dev 模式下，服务端请求拦截。

1) 全局安装 mockjs，可以直接在命令行内使用 random 来生成数据；
2) 属性值是函数 Function
   > 执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。
3) 属性值是正则表达式 RegExp

```js
// 根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。
Mock.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
})
// =>
{
    "regexp1": "pJ7",
    "regexp2": "F)\fp1G",
    "regexp3": "561659409"
}
```

1. 数据占位符定义规范 DPD， 上下文环境是有用的。

这里可以解决 total 与返回的数据长度一致的问题

1. 分页怎么能确保准确

2. 声明请求方式
3. Random.character( pool? ) pool

```js
{
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()[]"
}
```

1. Random.range( start?, stop, step? )
2. Random.image( size?, background?, foreground?, format?, text? ) 纯色图片，请求外网的，内网应该没法用
   Random.dataImage( size?, text? ) 生成一段随机的 Base64 图片编码。

## Mock.mock()方法

**Mock.mock( rurl?, rtype?, template|function( options ) )**

## Mock.setup()

延时请求，似乎目前只是支持 timeout 配置项
目前，接口 Mock.setup( settings ) 仅用于配置 Ajax 请求，将来可能用于配置 Mock 的其他行为。

## Mock.Random()

Mock.Random 是一个工具类，用于生成各种随机数据。

Mock.Random 的方法在数据模板中称为『占位符』，书写格式为 @占位符(参数 [, 参数]) 。

```js
var Random = Mock.Random;
Random.email();
// => "n.clark@miller.io"
Mock.mock('@email');
// => "y.lee@lewis.org"
Mock.mock({ email: '@email' });
// => { email: "v.lewis@hall.gov" }
```
