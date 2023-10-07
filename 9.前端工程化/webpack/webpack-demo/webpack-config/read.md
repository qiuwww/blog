
# mockjs
> 官网：http://mockjs.com/
## 实际工作中使用的意义 
1. 不受制于后端接口的开发；
2. 数据随机生成，发现可能出现的问题；
3. ajax的拦截，与真正的接口对接代码的写法无差；
4. 单元测试；
5. 数据类型丰富，可扩展。

## 内部原理
比较完备的随机数据字典

### mockjs模块
1. bin
2. dist/mockjs->src/mock/random/*
3. CHANGELOG.md

## 如何使用
1. 命令行random命令；
2. 前端文件引用拦截ajax或封装为一个函数调用；
3. dev模式下，服务端请求拦截。

## 语法规范

https://github.com/nuysoft/Mock/wiki/Syntax-Specification
数据占位符定义规范 DPD 与 DTD， 上下文环境是有用的。

## 扩展
https://github.com/nuysoft/Mock/wiki/Mock.Random#%E6%89%A9%E5%B1%95

## Mock.mock()方法
**Mock.mock( rurl?, rtype?, template|function( options ) )**

## Mock.setup()
延时请求，似乎目前只是支持timeout配置项
目前，接口 Mock.setup( settings ) 仅用于配置 Ajax 请求，将来可能用于配置 Mock 的其他行为。

## 模板验证数据
https://github.com/nuysoft/Mock/wiki/Mock.valid()
> Mock.valid( template, data ), 校验真实数据 data 是否与数据模板 template 匹配。
