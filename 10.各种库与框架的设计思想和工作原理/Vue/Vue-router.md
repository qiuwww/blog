
# Vue-router

- vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。
- vue的单页面应用是基于路由和组件的，**路由用于设定访问路径，并将路径和组件映射起来。**
- 传统的页面应用，是用一些**超链接来实现页面切换和跳转的**。
- 在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。

## 使用

1. 创建组件；

2. 创建router，创建vueRouter的实例；

3. 构建映射路由，router.map方法；

4. 使用v-link指令来指定跳转路径；

5. 使用<router-view>来渲染匹配的组件。

6. 启动路由router.start(, 挂载元素)；

```
Vue.use(VueRouter)

export default new VueRouter({
  routes: [{

  }]
});

```

## 接口说明

path: 路径，url地址匹配方法一致；
redirect: 重定向，重新请求url地址，这个时候会更改页面的url的；
component: 路由到组件，内部部分内容的跳转；
children: 嵌套路由；
name: 可选，路由名称；
query: 查询参数；
params: 携带路径的参数；

## 跳转标签<router-link>

官方文档地址：https://router.vuejs.org/zh-cn/api/router-link.html

<router-link> 组件支持用户在具有路由功能的应用中（点击）导航。 

通过 to 属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签.。

另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。

### <router-link>选项
to: 
name: 
tag: 
replace: 替换，不留下历史记录；
append: 拼接地址；
active-class: 激活的时候添加的class，这个时候可以用来设置激活的样式；
exact: 严格地址匹配

<!-- 这个链接只会在地址为 / 的时候被激活 -->
<router-link to="/" exact>
event:  主动触发的事件；
声明可以用来触发导航的事件。
exact-active-class: 
配置当链接被精确匹配的时候应该激活的 class。

## 视图位置<router-view>

<router-view> 组件是一个 functional 组件，渲染路径匹配到的视图组件。
<router-view> 渲染的组件还可以内嵌自己的 <router-view>，根据嵌套路径，渲染嵌套组件。

如果 <router-view>设置了名称，则会渲染对应的路由配置中 components 下的相应组件。查看 命名视图 中的例子。
如果不设置名称就会都渲染到一个中间。

### 选项

routers: 具体的路由

name: 对应路由配置中的components下的相应组件。

可以在外层套一层别的元素实现相应的行为表现。

mode: "hash" (浏览器环境) | "abstract" (Node.js 环境)

官方文档地址： https://router.vuejs.org/zh-cn/api/options.html


## 问题

vue组件化， 要保证router-link 与 router-view，在同一个组件内，会不会限制了页面的布局，也就是切换部分页的时候需要切换的内容与触发的位置离的很近。


## 与Vue的参数交换

vue组件中，通过$route拿到router的相关参数

可以观察$route的变化作出相应的响应：
```
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

## 编程式导航

使用push || replace || go来进行跳转。

vue-router 的导航方法 （push、 replace、 go） 在各类路由模式（history、 hash 和 abstract）下表现一致。

push(相当于location跳转)

想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。