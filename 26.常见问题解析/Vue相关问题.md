# Vue相关问题

## 知识点整理
https://mp.weixin.qq.com/s/dMA2OQAcD7ndZBXr0J5aEQ

#### 1.对于MVVM的理解
MVVM 是 Model-View-ViewModel 的缩写。

- Model 代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。
- View 代表UI 组件，它负责将数据模型转化成UI 展现出来。
- ViewModel **监听模型数据的改变和控制视图行为、处理用户交互**，简单理解就是一个同步View 和 Model的对象，连接Model和View。

#### 2.Vue的生命周期
Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 Vue 的生命周期。

阶段：创建前/后(new Object())、载入前/后(append)、更新前/后(update)、销毁前/销毁后(remove||unload)。

DOM 渲染在 mounted 中就已经完成了。

#### 3.数据双向绑定的原理
Vue实现数据双向绑定的原理：Object.defineProperty()

vue实现数据双向绑定主要是：采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。

原生代码实现：
```
<body>
    <div id="app">
        <input type="text" id="txt">
        <p id="show"></p>
    </div>
</body>
<script type="text/javascript">
var obj = {}
Object.defineProperty(obj, 'txt', {
    get: function () {
        return obj
    },
    set: function (newValue) {
        document.getElementById('txt').value = newValue;
        document.getElementById('show').innerHTML = newValue;
    }
})

document.addEventListener(
    'keyup', function (e) {
    obj.txt = e.target.value
})
</script>
```

#### Vue组件间的参数传递

1、父组件与子组件传值

父组件传给子组件：子组件通过props方法接受数据；

子组件传给父组件： $emit 方法传递参数， this.$parents.func

2、非父子组件间的数据传递，兄弟组件传值, 放在共同的父级上() || mobx || redux || vuex

eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。

项目比较小时，用这个比较合适（虽然也有不少人推荐直接用VUEX，具体来说看需求咯。技术只是手段，目的达到才是王道）。


#### Vue的路由实现：hash模式 和 history模式

hash模式：在浏览器中符号“#”，#以及#后面的字符称之为hash，用 window.location.hash 读取。
特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。

history模式：history采用HTML5的新特性；
且提供了两个新方法： pushState()， replaceState()可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。

当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！
不过这种模式要玩好，还需要后台配置支持。


#### Vue与Angular以及React的区别？
版本在不断更新，以下的区别有可能不是很正确。我工作中只用到vue，对angular和react不怎么熟。

1、与AngularJS的区别

相同点：都支持指令：内置指令和自定义指令；都支持过滤器：内置过滤器和自定义过滤器；都支持双向数据绑定；都不支持低端浏览器。

不同点：AngularJS的学习成本高，比如增加了Dependency Injection特性，而Vue.js本身提供的API都比较简单、直观；在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢；Vue.js使用基于依赖追踪的观察并且使用异步队列更新，所有的数据都是独立触发的。

2、与React的区别

相同点：React采用特殊的JSX语法，Vue.js在组件开发中也推崇编写.vue特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用；中心思想相同：一切都是组件，组件实例之间可以嵌套；都提供合理的钩子函数，可以让开发者定制化地去处理需求；都不内置列数AJAX，Route等功能到核心包，而是以插件的方式加载；在组件开发中都支持mixins的特性。

不同点：React采用的Virtual DOM会对渲染出来的结果做脏检查；Vue.js在模板中提供了指令，过滤器等，可以非常方便，快捷地操作Virtual DOM。


#### vue路由的钩子函数

首页可以控制导航跳转，beforeEach，afterEach等，一般用于页面title的修改。一些需要登录才能调整页面的重定向功能。

beforeEach主要有3个参数to，from，next。

to：route即将进入的目标路由对象。

from：route当前导航正要离开的路由。

next：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转。


#### $route和$router的区别

$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。

而$router是“路由实例”对象包括了路由的跳转方法，钩子函数等。
