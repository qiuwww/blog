# frontend-mock-data-sever

frontend-mock-data-sever

## 2017-7-16

前端数据模拟一般的实现思路：

1. 使用变量切换开发环境与测试环境，调用不同的函数处理数据；

```
function fetchUserList() {

}
<!--控制isDev，切换环境，去取不同的数据源-->
var isDev = true;

var data = {
    "status": 3,
    "message": "hello world"
};

if (isDev) {
    fetchUserList(data);
} else {
    $.ajax({
        url: '/list',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            fetchUserList(data);
        }
    });
}
```

2. 使用express或者koa等node服务端框架来快速的写接口，模拟数据返回；
3. 使用mock库来模式数据，此时可以结合方法2来匹配处理请求参数等问题；

**本例主要是来学习前端数据模拟，便于在后端接口跟不上的时候，不影响前端的开发进度。**

## mock.js

### 主要功能

1. 基于 数据模板 生成模拟数据。
2. 基于 HTML模板 生成模拟数据。
3. 拦截并模拟 ajax 请求。拦截发生在，真正的接口之前。

### 全局安装mockjs之后，可以使用random命令来随机生成前端常用的变量类型

```
# 全局安装
$ npm install mockjs -g

# 执行
$ random url
# => http://rmcpx.org/funzwc

# 帮助
random -h

```

## 数据模板的定义

<http://mockjs.com/examples.html>

## 主要的方法

<https://github.com/nuysoft/Mock/wiki/Mock.mock()>
