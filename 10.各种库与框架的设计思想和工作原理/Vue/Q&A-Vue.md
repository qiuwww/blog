# Vue相关问题

[TOC]

其实，三个框架的实现原理都绕不开这一些，可以对比的解决这些问题。

## Vue相关的基础问题

### vue的优点是什么？

- 低耦合。视图（View）可以独立于 Model 变化和修改，一个 ViewModel 可以绑定到不同的"View"上，当 View 变化的时候 Model 可以不变，当 Model 变化的时候 View 也可以不变。
- 可重用性。你可以把一些视图逻辑放在一个 ViewModel 里面，让很多 view 重用这段视图逻辑。
- 独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计，使用 Expression Blend 可以很容易设计界面并生成 xml 代码。
- 可测试。界面素来是比较难于测试的，而现在测试可以针对 ViewModel 来写。

### MVC、MVP与MVVM模式

[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

MVC（Model-View-Controller）；

MVP（Model-View-Presenter）模式将 Controller 改名为 Presenter，同时改变了通信方向。

MVVM（Model-View-ViewModel）模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。

### 组件接口设计 （比如设计一个表单组件/Picker) —— 基于 react 或 vue。

主要也就是易用性与单一性，处理好组件的状态，处理好生命周期的问题。

- 组件的prop和state（data），原则很简单：prop是对外的接口，state（data）是组件的内部状态。
- 组件的生命周期。

### DOM批更新怎么做的；

[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

### 封装过哪些组件? 有自己写过 UI 组件吗

- 提示信息弹框alert/confirm；
- pagination分页组件；
- 纯展示数据的联系客服组件；
- 输入交互组件，input/select/radio/checkbox等；

### 什么是 Virtual DOM？

Virtual DOM 就是用一个原生的 JS 对象去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多。

建立一种从vue的VNode到真实的dom节点的对应关系，直接修改元素节点，而不是调用dom操作接口去修改。

其实 VNode 是对真实 DOM 的一种抽象描述，它的核心定义无非就几个关键属性，标签名、数据、子节点、键值等，其它属性都是都是用来扩展 VNode 的灵活性以及实现一些特殊 feature 的。

由于 **VNode 只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法**，因此它是非常轻量和简单的。

Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程。那么在 Vue.js 中，VNode 的 create 是通过之前提到的 createElement 方法创建的，我们接下来分析这部分的实现。

内部的比较就是比较新旧的VNode。

## vue-cli

### 创建工程

```js
sudo npm i @vue/cli -g
vue create test
```

## vue核心知识点

### 如何理解Vue的渐进式 Progressive

- 与其它大型框架不同的是，Vue 被设计为可以**自底向上逐层应用**。
- Vue 的核心库**只关注视图层**，不仅易于上手，还**便于与第三方库或既有项目整合**。
- 可以认为是像`ejs`模版添加了一些内置的方法，生成的强模版，便于使用。
- Vue 1.0 的官方定位是**视图管理**，Vue 2.0 的官方定位是**渐进式框架**。
- 渐进式代表的含义是：主张最少。

### Vue核心思想：数据驱动、组件化

### 数据驱动

- Vue.js 是一个提供了 `MVVM` 风格的**双向数据绑定**的 Javascript 库，专注于View 层。
- 省去操作dom的过程，只需要改变数据，Vue就会通过`Dircetives`来改变视图，数据驱动DOM变化，DOM是数据的一种自然映射。
- Vue还会**对操作进行监听**，当视图发生改变时，vue监听到这些变化，从而改变数据，这样就形成了数据的双向绑定。

### 组件化

- 组件系统是 Vue 的另一个重要概念，因为它是一种**抽象**，允许我们使用小型、独立和通常**可复用**的组件构建大型应用。
- 在 Vue 里，一个组件本质上是一个拥有**预定义选项的一个 Vue 实例**。
- 在一个大型应用中，**有必要将整个应用程序划分为组件**，以使开发更易管理。
- Vue 组件非常类似于**自定义元素（Web Components）**。

### MVVM Model-View-ViewModel

分别是M（Model，**模型层** ），V（View，**视图层**），VM（ViewModel，V与M连接的桥梁，也可以看作为**控制器**）

1、 M：模型层，主要**负责业务数据相关**；`data(){}`
2、 V：视图层，顾名思义，负责视图相关，**细分下来就是html+css层**；`template`
3、 VM：V与M**沟通的桥梁**，负责监听M或者V的修改，是实现MVVM双向绑定的要点；`watch|method|computed|directive等`

MVVM支持双向绑定，意思就是当**M层数据**进行修改时，VM层会监测到变化，并且**通知V层进行相应的修改**，反之修改V层则会通知M层数据进行修改，以此也实现了视图与模型层的相互解耦；

### 双向数据绑定

```js
// 没有get和set
let obj = {
}
Object.defineProperty(obj, 'a', {
    value: 123, // 该属性值为123
    enumerable: false, // 不可被遍历得到
    writable: false, // 不可被重新写入
    configurable: false // 不可被删除，且enumerable和value不能通过Object.defineProperty重新定义
})
// 使用get和set
let obj = {
    // 设定默认值
    _data: {
        a: 123
    }
}
Object.defineProperty(obj, 'a', {
    get() {
        // 当获取a时执行
        console.log('a被获取了')
        return obj._data.a
    },
    set(value) {
        // 当修改a时执行
        obj._data.a = value
        console.log('a的值被修改了')
    }
})
```

### 请问 v-if指令 和 v-show指令 有什么区别

[官方介绍：v-if vs v-show](https://cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)

- v-if, 会在条件第一次为真的时候进行渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被**销毁和重建**。
- v-if,在 `<template>` 元素上使用 v-if **条件渲染分组**，使用template并不会渲染出来真实的dom。
- v-else, 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。
- v-show 的元素**始终会被渲染并保留在 DOM 中**。v-show 只是简单地切换元素的 CSS 属性 display。v-show 不支持 `<template>` 元素，也不支持 v-else。
- v-show 就简单得多——不管初始条件是什么，**元素总是会被渲染**，并且只是简单地基于 CSS 进行切换。
- **v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销**。

### 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。当然不推荐同时使用。

### vue常用的修饰符

#### 事件修饰符 v-on

[事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

- .stop
- .prevent
- .capture 使用事件捕获模式
- .self 是当前元素自身时触发处理函数
- .once
- .passive 滚动事件的默认行为 (即滚动行为) 将会立即触发。修饰符尤其能够提升移动端的性能。
- .exact 修饰符允许你控制**由精确的系统修饰符组合触发**的事件

使用修饰符时，顺序很重要；例如用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

#### 按键修饰符 @keyup | v-on:keyup

[官方文档](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

全部的按键别名：

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right
- .middle

可以通过全局 config.keyCodes 对象自定义按键修饰符别名：

```js
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

#### 系统修饰键

[官方文档](https://cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)

按下相应按键时才触发鼠标或键盘事件的监听器。

- .ctrl
- .alt
- .shift
- .meta


```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

### 绑定多个事件

1. 包裹一层；
2. 同时出发两个事件；

```html
<!-- 绑定多个事件测试 -->
<button type="button" name="button" @click="a();b()">绑定多个事件测试</button>
<script lang="ts">
  a(): void {
    console.log('a');
  }
  b(): void {
    console.log('b');
  }
</script>
```

### vue中 key 值的作用

[官方文档](https://cn.vuejs.org/v2/api/#key)

- key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。
- 如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。
- 使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
- 有相同父元素的子元素**必须有独特的 key**。**重复的 key 会造成渲染错误**。
- key的作用主要是为了**高效的更新虚拟DOM**。
- 另外vue中在使用相同标签名元素的**过渡切换**时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。

```vue
<transition>
  <span :key="text">{{ text }}</span>
</transition>
// 当 text 发生改变时，<span> 会随时被更新，因此会触发过渡。
```

### diff算法

[参考文章](https://juejin.im/post/5ad6182df265da23906c8627)

vue和react的虚拟DOM的Diff算法大致相同，其核心是基于两个简单的假设：

1. 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。
2. 同一层级的一组节点，他们可以通过唯一的id进行区分。

基于以上这两点假设，使得虚拟DOM的Diff算法的复杂度从O(n^3)降到了O(n)。

### vm.$nextTick( [callback] )

- 将回调延迟到**下次 DOM 更新循环之后执行**。也就是在更新数据之后，dom还没有被刷新的时候，后续的操作无法进行，需要等待dom更新之后再操作。
- 在修改数据之后立即使用它，然后等待 DOM 更新。**它跟全局方法 Vue.nextTick 一样**，不同的是回调的 this 自动绑定到调用它的实例上。
- 应该会用在，加载map，可视化图表库的时候用到，更新dom节点，拿到之后进行初始化。

```html
<transition>
  <span :key="text" ref="text">{{ text }}</span>
</transition>

<script>
  public text: string = 'text';
  nextTickHandler($event): void {
    console.log("$event:", $event);
    // 修改数据
    this.text = 'changed';
    console.log(this.$refs.text);
    // <span>text</span>
    debugger
    // DOM 还没有更新
    this.$nextTick(function() {
      // DOM 现在更新了
      // `this` 绑定到当前实例
      console.log(this.$refs.text);
      // <span>changed</span>
    })
  }
</script>
```

### Vue 组件中 data 为什么必须是函数

data需要是纯粹的对象，可能被用来创建多个实例。

[官方介绍](https://cn.vuejs.org/v2/api/#data)

- Vue 实例的**数据对象**(Model)。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化。
- data 应该**只能是数据** - 不推荐观察拥有状态行为的对象。

当一个组件被定义，data 必须声明为**返回一个初始数据对象的函数**，因为组件**可能被用来创建多个实例**。
如果 data 仍然是一个纯粹的对象，**则所有的实例将共享引用同一个数据对象**！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，**从而返回初始数据的一个全新副本数据对象**。

### 🍎vue中子组件与父组件 | 组件之间的传值

#### 父组件传值给子组件

通过props传递参数。

#### 父组件传方法给子组件 | 子组件调用父组件的方法

- props是可以传递的；

```html
  <hello-world :msg="text" :fatherEvent="fatherEvent"></hello-world>
```

- 通过拿到父组件的引用，从而调用父组件的方法；

```js
@Prop() private msg!: string;
@Prop() private fatherEvent: object;
mounted() {
  this.fatherEvent(); // props
  this.$parent.fatherEvent(); // 父组件的引用
}
```

- 子组件使用emit触发父组件的事件

```html
<template id="">
    <Child @refreshList="onRefresList"></Child>
</template>
<script>
    export default {
        data () {
            return {
            };
        },
        components: {
            Child
        },
        mounted() {},
        methods: {
            onRefresList () {
            }
        },
        computed: {},
        watch: {}
    };
</script>
<!-- Child.vue -->
<script>
  this.$emit('refreshList');
</script>
```

#### 父组件调用子组件的方法

通过ref来拿到子组件，然后直接调用其上的方法。

`this.$refs.c1.childMethod();`

#### 子组件传递数据给父组件

vue中的数据是单向的，所以数据流是不能反向的。
这个时候只能通过调用父组件的事件来给父组件传递数据。
这个时候要是用上vuex就可以不用考虑这么多问题了。

#### 兄弟组件怎么通信的

通过向上提高一层，eventBus与通过父组件一个意思。要不就是通过全局状态管理工具store。

1. 非父子组件的传递，全局Event bus，new一个vue的实例，采用事件的方式通信，在外部新建一个js文件，取名Bus.js，可以实例化一个vue实例，相当于一个第三方，（let third = new Vue()）
   - bus.$emit() // 触发事件
   - bus.$on() // 监听组件
2. 通过共同的父组件
     子 =>父 父=>子（在父组件那里周转一下）
3. vuex管理状态

#### 当子组件需要修改父组件传递的proos的时候

就是接props最为初始化的值，但是还需要修改这个值。
出现的场景，可能是ajax得到初始值，然后局部状态更改数据来驱动页面。

这个时候应该新设置一个变量来进行这个操作。

### 🍎vue生命周期 和 生命周期钩子函数，怎么用?

[官方文档](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)
[生命周期示意图](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
[参考以前的记录](/blog/10/Vue/Vue的生命周期)

总共分为8个阶段 创建前/后，载入前/后，更新前/后，销毁前/后。

- 创建前/后： 在**beforeCreate**阶段，vue实例的挂载元素el和数据对象data都为undefined，还未初始化。在**created**阶段，vue实例的数据对象data有了，el还没有。
- 载入前/后：在**beforeMount**阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在**mounted**阶段，vue实例挂载完成，data.message成功渲染。
- 更新前/后：当data变化时，会触发**beforeUpdate**和**updated**方法。
- 销毁前/后：**beforeDestroy**实例销毁之前调用。在这一步，实例仍然完全可用。**destroyed**，Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

#### beforeCreate，组件还没有生成，数据观测都还未进行

数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

#### created，实例生成，未挂载

在实例创建完成后被立即调用。实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。$el 属性目前不可见。

#### beforeMount，大约等于ceated阶段

#### mounted，数据请求，修改dom，修改data都可以进行了

el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted。

```js
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```

#### beforeUpdate, 发生在虚拟 DOM 打补丁之前。用于移除事件监听

这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

#### updated，你应该避免在此期间更改状态。

如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。

updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated。

#### beforeDestroy，实例仍然完全可用。

#### destroyed，实例销毁

注意如果有异步请求需要终止请求，不然就会出现数据来了，操作页面，页面看不到了。

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

#### 其他

- activated：keep-alive 组件激活时调用。
- deactivated：keep-alive 组件停用时调用。
- errorCaptured：当捕获一个来自子孙组件的错误时被调用。

### 对比 computed 与 watch

- computed，计算属性
  - 得到一个**新的值**，这个值不能与data中返回的值重名，这个值可以直接使用。
  - 当前的值，在依赖的可观察的数据更改的时候触发。
- watch，观察值，key/value，数据对组成
  - 观察data中的数据，有变动的时候，调用对应的回调函数，就像是专门做的副作用操作。

### 自定义指令的使用

主要也就是定义bind生命周期的各种操作。

[官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html)

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
// bind
// bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
bind: function (el, binding, vnode) {
  // el 绑定的元素
  // binding，指令的相关参数
  // vnode，Vue 编译生成的虚拟节点
}
```

### keep-alive

[官方文档](https://cn.vuejs.org/v2/api/#keep-alive)

`<keep-alive>` 包裹动态组件时，**会缓存不活动的组件实例**，而不是销毁它们。

和 `<transition>` 相似，`<keep-alive>` 是一个**抽象组件**：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

当组件在 `<keep-alive>` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

### vue全局组件

#### 1、需要入口文件定义安装对象index.js

```js
import MyLoading from './Loading.vue'
// 这里是重点
const Loading = {
    install: function(Vue){
        Vue.component('Loading',MyLoading)
    }
}
// 导出组件
export default Loading
```

#### 2、定义组件MyLoading

```html
<!-- 这里和普通组件的书写一样 -->
<template>
    <div class="loading">
        loading...
    </div>
</template>
```

#### 3、使用组件

```html
<template>
  <div id="app">
  <!-- 使用element ui的组件 -->
  <el-button>默认按钮</el-button>
  <!-- 使用自定义组件 -->
  <Loading></Loading>
  </div>
</template>
```

## vue-router， 路由处理模块

如果不实用vue-router来处理当前页面的地址变动：

- **检测hashchange事件**，或者HTML5 History API（history的popstate事件）来判断路由变动；
- 定义路径与组件匹配的字典；
- 根据拿到的`window.location.pathname`，来匹配需要渲染的组件。

### 完整的 vue-router 导航解析流程

1. 匹配路径，找到要渲染的组件`<router-link :to="{ name: 'user', params: { userId: 123 }}"></router-link>`；
2. 视图位置渲染页面`<router-view name="b"></router-view>`

- 导航被触发。
- 在失活的组件里调用**离开守卫**。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- **调用全局的** beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- **触发 DOM 更新**。
- 用创建好的实例调用 beforeRouteEnter **守卫中传给 next 的回调函数**。

### 导航守卫

[官方介绍](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB)
#### 全局前置守卫 beforeEach

```js
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
  // ...
})
```

#### 全局解析守卫 beforeResolve

在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

#### 全局后置钩子 afterEach

#### 组件内守卫

- beforeRouteEnter
- beforeRouteUpdate (2.2 新增)
- beforeRouteLeave

### 两种模式 hash | history

[官方文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

### 模拟触发事件

#### 方式一（分发实践，通过别的函数来触发）

在组件中，可以使用 `$emit`, `$on`, `$off` 分别来分发、监听、取消监听事件。

一般用在自定义事件，比如父组件传递过来的事件。

```js
vm.$on('test', function (msg) {
  console.log(msg)
})
// 用于触发当前组件的时间，或者父实例定义的事件（回调）
vm.$emit('test', 'hi')
// => "hi"
```

#### 方式二（与原生dom操作类似，明显更低级一点），最好是使用el来获取元素

```js
methods:  {
  handleBtnClick: function(){
    document.getElementById("text").click();
  },
  handleTextClick: function(){
    alert("hello");
  }
}
```

## Vuex

### vuex 是什么？怎么使用？哪种功能场景使用它？

vue 框架中状态管理。在 main.js 引入 store，注入。新建了一个目录 store，….. export。

场景有：单页应用中，组件之间的状态。音乐播放、登录状态、加入购物车，等复杂交互的页面

vuex 仅仅是作为 vue 的一个**插件而存在**，不像 Redux,MobX 等库可以应用于所有框架，vuex 只能使用在 vue 上，很大的程度是因为其高度依赖于 vue 的 computed 依赖检测系统以及其插件系统，

vuex 整体思想诞生于 **flux**,可其的实现方式完完全全的使用了 vue 自身的响应式设计，依赖监听、依赖收集都属于 vue 对对象 Property set get 方法的代理劫持。最后一句话结束 vuex 工作原理，vuex 中的 store 本质就是没有 template 的隐藏着的 vue 组件；

```js
// 新建 store.js
import vue from 'vue'
import vuex form 'vuex'
vue.use(vuex)
export default new vuex.store({
    //...code
})
//main.js
import store from './store'
...
```

### vuex 有哪几种属性

有 5 种，分别是 state、getter、mutation、action、module

### vuex 的 store 特性是什么

- vuex 就是一个仓库，仓库里放了**很多对象**。其中 state 就是数据源存放地，对应于一般 vue 对象里面的 data
- state 里面存放的数据是响应式的，vue 组件从 store 读取数据，若是 store 中的数据发生改变，依赖这相数据的组件也会发生更新
- 它通过 mapState 把全局的 state 和 getters 映射到当前组件的 computed 计算属性

### vuex 的 getter 特性是什么

getter 可以对 state 进行计算操作，它就是 store 的计算属性
虽然在组件内也可以做计算属性，但是 getters 可以在多给件之间复用
如果一个状态只在一个组件内使用，是可以不用 getters

### vuex 的 mutation 特性是什么

action 类似于 muation, 不同在于：action 提交的是 mutation,而不是直接变更状态
action 可以包含任意异步操作


## 区别与原生js开发

### 需要由原来的开发模式迁移过来的习惯

1. 事件在元素内绑定，在methods下定义；
2. 显示与隐藏通过v-if|v-show指令来控制；
3. 所有页面状态都由一份数据控制；
4. 关注实例的生命周期；
5. 页面跳转变为路由vue-router；
6. 页面数据保存全局或对象中转为状态管理vuex；
7. ajax请求网络交互了。就学习尤大推荐的axios了；
   - vue-source模块方式；插件性质；
   - axios模块；Vue官方推荐的网络通信库不再是vue-resource了，推荐使用axios；
   - 自定义fetch方法；
8. 取得元素转为添加ref属性；

ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例。

### vue开发的基本操作

1. 构建页面，创建实例，将已有的数据和状态保存在一个对象中，然后依据这个对象渲染页面；
2. 请求得到数据更新实例对象对应的js对象，然后再刷新页面的部分；
3. 交互过程中依旧是改变这个js对象，从而改变视图的表现。

### 页面的结构

1. 分块；
2. 主文件内拼装，同时给出对应的js数据结构；
3. 组件文件也可以再分块，有利于复用，数据和样式依附在视图文件内，层层组合；

## others

### 输入框的值的格式化问题

1. type="number" 来控制，但是不能过滤掉e这个字母，标示自然底数；
2. number 修饰符 可以控制只输入数字；v-model.number，与type="number"操作一致；
3. 使用computed来控制,操作比较麻烦，但是逻辑比较正常；

```html
<div id="demo">
    <input v-model="inpNum"/>
    <p>
        {{inpNum}}
    </p>
</div>
<script>
new Vue({
  el:'#demo',
  data:{
    oldNum:0
  },
  computed:{
    inpNum:{
      get:function(){
        return this.oldNum;
      },
      set:function(newValue){
        this.oldNum = newValue.replace(/[^\d]/g,'');
      }
    }
  }
})
</script>
```

4. 自定义指令，与v-model有点冲突的；

```js
// <input type="text" v-number-only />
directives: {
  numberOnly: {
    bind: function(el) {
      el.handler = function() {
        el.value = el.value.replace(/\D+/, '')
      }
      el.addEventListener('input', el.handler)
    },
    unbind: function(el) {
      el.removeEventListener('input', el.handler)
    }
  }
}
```

5. 添加事件控制

```html
<input type='text' @input="handleInput" :value="val"/>
handleInput(e){
  this.val=e.target.value.replace(/[^\d]/g,'');
}
```

6. 最终的解决方案

- 首先对`v-model`，添加`input`替换为`change`事件的.lazy的修饰符；
- 使用指令来绑定`input`事件，这个时候`input`在`change`事件前面触发，所以可以先对数据进行格式化，然后映射到model上；
- 输入框的事件触发流程 `focus-keydown-input（这个时候可以拿到value）-keyup-change-blur`

```html
<input type="text" v-model.lazy="form.amount" v-number-only placeholder="请输入借款金额">
<script>
Vue.directive('numberOnly', {
  bind: function(el) {
    el.handler = function() {
      el.value = el.value.replace(/[^\d]/g, '');
    };
    el.addEventListener('input', el.handler);
  },
  unbind: function(el) {
    el.removeEventListener('input', el.handler);
  }
})
</script>
```

### 懒加载（按需加载路由）

webpack 中提供了 `require.ensure()`来实现按需加载。以前引入路由是通过 import 这样的方式引入，改为 const 定义的方式进行引入。

```js
// 不进行页面按需加载引入方式：
import home from '../../common/home.vue';
// 进行页面按需加载的引入方式：
const home = r => require.ensure([], () => r(require('../common/home.vue')));
```



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
