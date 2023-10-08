## mocksever
一个简单本地mock服务器,可以代理后端服务器返回的数据,支持服务器自动重启,监视文件夹为`./mockroute`.

## 使用

```
git clone https://github.com/Hucy/mocksever.git

cd mocksever

npm i

npm start

```
## 配置

- `./mockroute/index.js` 修改后端api地址:

修改 `apihost=''`中`apihost`的值为后端服务器APi接口地址.


- `/mockroute/routers.js` 本地mock路由配置:

```
/**
 * 路由配置
 */
router
  .get('/', function (ctx, next) {
    console.log(ctx)
    ctx.body = mockdata.root
  })
  .get("/mock",function(ctx,next){
    ctx.body=mockdata.mock
  });

```
- `/jsonData/*` mock数据:

 默认为`./jsonData/mockdata.json` 文件.也可以自己新建mock数据,记得在`./mockroute/routers.js`中引入自己编写的mock数据文件.


## todo
* 接口拦截和自定义请求头
* 添加`schema`支持
* 增加首页接口约定显示
* 支持页面编写接口约束
* 约定数据导出
