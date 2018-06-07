## promise

1. http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551800&idx=1&sn=d06d319c002fdca153bc2abe9352e959&chksm=8025aff9b75226efe21a5094ce14a29c467be74ef2eb631157ea2732106642357617935e9464&mpshare=1&scene=23&srcid=02252j2QlCdqJeKXpefdh9lb#rd


### 为什么直接运行就会出错，使用app.js引用进来再运行就不会出错？

> 模块的加载是异步的？

### 目前看到的使用async函数的基本配置

1.  babel6以上的环境，需要配置单独的引用；
```
require('babel-core/register');
require("babel-polyfill");
并且要单独配置一个文件作为入口。
```
2. 需要.babelrc(进入就加载) 文件配置；
```
{
  "presets": ["es2015", "stage-0"]
}
```
3. 基本的依赖模块；
```
  "dependencies": {
    "babel": "^6.0.15",
    "babel-core": "^6.1.2",
    "request": "^2.65.0"
  },
  "devDependencies": {
    "babel-polyfill": "^6.0.16",
    "babel-preset-es2015": "^6.1.2",
    "babel-preset-stage-0": "^6.1.2"
  }
```
以上配置基本可以es7的所有语法支持

### await必须在async函数的上下文中,  注意是块作用域

