# NOTE

angularjs2 的开发总结；

## 重制表单

```js
this.validateForm.reset();
```

### ???拦截器，HttpInterceptor

[参考文档 1](https://segmentfault.com/a/1190000016788970?utm_source=tag-newest)
[参考文档 2](https://www.jianshu.com/p/589e3c67e248)

拦截器在 Angular 项目中其实有着十分重要的地位，拦截器可以统一对 HTTP 请求进行拦截处理，我们可以在每个请求体或者响应后对应的流添加一系列动作或者处理数据，再返回给使用者调用。

每个 API 调用的时候都不可避免的会出现**网络超时**的情况，但是这种情况是多变的，可能是网络问题，也有可能是服务端问题，尽管如此，我们也只需对网络超时这一种情况来进行处理。

### 修改 history 为 hash 模式的路由

```js
// 设置路由使用hash跳转
{ provide: LocationStrategy, useClass: HashLocationStrategy }
```

### 获取当前的路由状态

这里需要在具体的页面内来获取当前页面的 url。

路由器会构建出一个 ActivatedRoute 组成的树，它表示路由器的当前状态。 你可以在应用中的任何地方用 Router 服务及其 routerState 属性来访问当前的 RouterState 值。

```js
export class CompanyComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
  // Get Parent Path:  about 获取父级path值
  /*[UrlSegment]
    0: UrlSegment
    parameterMap: (...)
    parameters: {}
    path: "xxxx"
    __proto__: Object
    length: 1
  __proto__: Array(0)
  */
    this.route.parent.url.subscribe(url => console.log(url[0].path));
    // Get Current Path:  company  同理
    this.route.url.subscribe(url => console.log(url[0].path));
    // Route Data:  { title: 'Company' }
    this.route.data.subscribe(data => console.log(data));
  }
}
```

params: 对应路径参数

备注：这里后期需要添加选择页面，然后把当前页面的 title 改掉，需要用到自组件来调用父组件的方法，把当前的路由给到 layout 组件，然后主动控制显示。
这里有 router-outlink 的方法 onActivate，似乎可以直接拿到当前要跳转的 url。

## 项目发布相关

oss 地址：oss://babel/H5/flow-gateway/test/

[测试环境访问地址：](http://yhoss.yangcongjietiao.com/H5/flow-gateway/test/index.html)
[正式环境访问地址：](https://yhoss.yangcongjietiao.com/H5/flow-gateway/pro/index.html)

## 遇到的问题

### 发布到线上环境的时候 index.html 文件名会被隐藏

需要配置为如下：

```js
<base href="">
```

在 scripts 下配置打包的 base 地址： `"build": "ng build --prod --base-href ''",`

## 账户等相关问题

### 测试环境账户密码

admin 123456
