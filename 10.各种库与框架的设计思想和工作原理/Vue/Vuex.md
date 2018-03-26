
# Vue专用状态管理模式Vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。**它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。**Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

## 基本思想

因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？

在这种模式下，**我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！**

另外，通过**定义和隔离状态管理中的各种概念并强制遵守一定的规则**，我们的代码将会变得更结构化且易维护。

这就是 Vuex 背后的基本思想，借鉴了 Flux、Redux、和 The Elm Architecture。与其他模式不同的是，**Vuex 是专门为 Vue.js 设计的状态管理库**，以利用 Vue.js 的**细粒度数据响应机制来进行高效的状态更新**。

![vuex](D:\learn-space\blog\10.各种库与框架的设计思想和工作原理\Vue\Vuex相关\vuex.png)

- Vuex 通过 `store` 选项，提供了一种机制**将状态从根组件“注入”到每一个子组件中**（需调用 `Vue.use(Vuex)`）。
- 子组件能通过 `this.$store`访问到。

## 应用场景

- 如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。
- 确实是如此——如果您的应用够简单，您最好不要使用 Vuex。
- 一个简单的 [global event bus](https://cn.vuejs.org/v2/guide/components.html#非父子组件通信) 就足够您所需了。
- 但是，如果您需要构建是一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。



## 主要的接口（要想清楚这些接口的必要性和原理）

### state单一状态树（类似于mobx中的@observable的变量）

用一个对象就包含了**全部的应用层级状态**。至此它便作为一个“**唯一数据源 (SSOT)**”而存在。

**优点：**

单一状态树让我们能够**直接地定位任一特定的状态片段**，在调试的过程中也能**轻易地取得整个当前应用状态的快照。**

#### 使用 mapState 辅助函数帮助我们生成计算属性。

同时生成多个计算属性，使用的时候可以使用对象展开符(...)来加入计算属性。

### getter用于生成派生状态。

“getter”（可以认为是 store 的计算属性）。

getter 的返回值**会根据它的依赖被缓存起来**，且只有当它的依赖值发生了改变才会被重新计算。

**访问**

- 通过属性访问的形式进行访问。Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值。
- 通过方法访问。

**mapGetters 辅助函数**

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。

### mutations

你可以通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更。

**更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。**

- Vuex 中的 mutation 非常类**似于事件**：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。**这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数**。


- 你不能直接调用一个 mutation handler。这个选项更像是**事件注册**：“当触发一个**类型为 increment** 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：

```
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)
```

- 使用常量替代 Mutation 事件类型。
- Mutation 必须是同步函数。
- 在组件中提交 Mutation。
  你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。

### Action分发

Action 类似于 mutation，不同在于：

- Action **提交的是 mutation**，而不是直接变更状态。
- Action 可以包含任意**异步**操作。

**分发 Action**

Action 通过 store.dispatch 方法触发：

```store.dispatch('increment')
store.dispatch('increment')
```



### module

**Vuex 允许我们将 store 分割成模块（module）（类似于mobx的分隔操作）**。

每个模块拥有自己的 state、mutation、action、getter、**甚至是嵌套子模块**——从上至下进行同样方式的分割：

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

**访问**

- 对于**模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象**。
- 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState。
- ​

## 使用Vuex的项目结构

Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

- 应用层级的状态应该集中到单个 store 对象中。
- **提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。**
- 异步逻辑都应该封装到 action 里面。

```
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

**表单处理**

给 `<input>` 中绑定 value，然后侦听 `input` 或者 `change` 事件，在事件回调中调用 action:

```
<input :value="message" @input="updateMessage">

// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
下面是 mutation 函数：

// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```