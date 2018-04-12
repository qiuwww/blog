
# Vue专用状态管理模式Vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。**它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。**Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

## 基本使用结构

```
// 使用插件
Vue.use(Vuex);
// 创建store
const store = new Vuex.Store({
  state: {
    allInfo: []
  },
  getters: {
      computedValue: function(state){} // 当前的state是第一个参数
  },
  mutations: {
      callback: function(state, payload) {} // 第一个参数state，第二个参数载荷
  },
  actions: {
      callbackAsync: function(state, payload){}
  },
  module: {
      key: value // 树状结构下一级的store
      // 相互之间的引用原则：局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
  }
  
});
```

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
> 状态定义及其初始化。

**优点：**

单一状态树让我们能够**直接地定位任一特定的状态片段**，在调试的过程中也能**轻易地取得整个当前应用状态的快照。**

#### 使用 mapState 辅助函数帮助我们生成计算属性。

同时生成多个计算属性，使用的时候可以使用对象展开符(...)来加入计算属性。

### getter用于生成派生状态。

“getter”（可以认为是 store 的计算属性）。

getter 的返回值**会根据它的依赖被缓存起来**，且只有当它的依赖值发生了改变才会被重新计算。

> 对应state的状态计算值，相当于computed的功能。

**访问**

- 通过属性访问的形式进行访问。Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值。
- 通过方法访问。

**mapGetters 辅助函数**

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。



### mutations(事件的回调函数，使用commit来触发)

你可以通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更。

**更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。**

- Vuex 中的 mutation 非常类**似于事件**：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。

**这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数**。


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

触发actions

store.commit('increment', 10)

### Action分发（mutations的异步版）

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

> 分隔的store，来对应每个模块的数据操作，相互之间的通信有相应的接口。同一个作用的变量只放在一个位置定义

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




Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。


# Vuex.md

> 对于vuex的理解

## 是什么

Vuex 类似 Redux 的状态管理器，用来管理Vue的所有组件状态。

## 为什么要用

当你打算开发大型单页应用（SPA），会出现多个视图组件依赖同一个状态，来自不同视图的行为需要变更同一个状态。

## 基本实例

`
import Vue from 'vue';
import Vuex form 'vuex';
Vuex 通过 store 选项，提供了一种机制将状态从根组件『注入』到每一个子组件中（需调用 Vue.use(Vuex)）：
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})
`
以上就是一个最简单的Vuex，每一个Vuex应用就是一个store，在store中包含组件中的共享状态state和改变状态的方法（暂且称作方法）mutations。

需要注意的是只能通过mutations改变store的state的状态，不能通过store.state.count = 5;直接更改（其实可以更改，不建议这么做，不通过mutations改变state，状态不会被同步）。
使用store.commit方法触发mutations改变state:
`
store.commit('increment');
console.log(store.state.count)  // 1
`
一个简简单单的Vuex应用就实现了。

## 在Vue组件使用Vuex

如果希望Vuex状态更新，相应的Vue组件也得到更新，最简单的方法就是在Vue的computed（计算属性）获取state

`
import { mapState } from 'vuex';
export default {
    computed: mapState ({
        count: state => state.count,
        countAlias: 'count',    // 别名 `count` 等价于 state => state.count
    })
}

还有更简单的使用方法：

computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])

等价于

computed: {
    ...mapState([
        // 映射 this.count 为 store.state.count
        'count'
    ])
}
`

mutations也有映射函数mapMutations，帮助我们简化代码，使用mapMutations辅助函数将组件中的methods映射为store.commit调用。



## state(state可以在组件中直接使用，派生属性在getters中获取)

https://vuex.vuejs.org/zh-cn/state.html

Vuex 使用 单一状态树 —— 是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个『唯一数据源(SSOT)』而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。

## mapState辅助函数，混入到computed中

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键。
mapState 函数返回的是一个对象。使用对象展开得到对应的属性；
在其内部每个传入的属性得到的结果都相当于直接返回这个属性：
`
computed: {
    count () {
        return this.$store.state.count
    },
    number () {
        return this.$store.state.number
    }
}
等价如下：

computed: {
// mapState获取组件对应的state值, 获取对象属性然后展开为computed的值
...mapState([
    'count', 'number'
]),

`

## getters 有时候我们需要从 store 中的 state 中派生出一些状态，如过滤某个属性值

Vuex 允许我们在 store 中定义『getters』（可以认为是 store 的计算属性）。就像计算属性一样，getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

## mutations 一般放在methods中，用于操作之后改变store属性, 混入到methods中
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
`
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
`
你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
`
store.commit('increment')
`
当该同步事件混入到组件内的时候，可以直接调用组件。

使用常量替代 Mutation 事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然，也就是方法名。

mutation 必须是同步函数
`
...mapMutations([
      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
    ]),


store.commit('increment')
// 任何由 "increment" 导致的状态变更都应该在此刻完成。    
`

## modules

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

## actions 混入到methods，类似于mapMutations


https://vuex.vuejs.org/zh-cn/actions.html

Action 类似于 mutation，不同在于：
Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。

`
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
  // 第一个参数是context
  // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    increment (context) {
      context.commit('increment')
    }
  }
})
`

分发 Action
Action 通过 store.dispatch 方法触发：
store.dispatch('increment')

`
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
    ]),
    ...mapActions({
      add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    })
  }
}
`

最后，如果我们利用 async / await 这个 JavaScript 即将到来的新特性，我们可以像这样组合 action：

// 假设 getData() 和 getOtherData() 返回的是 Promise
`
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
`

## 混入到实例中

mapState

mapActions

mapMutations

mapGetters

## 更改数据的操作

在actions或者mutations内更改数据需要把值赋给state对象，不能使用this。

## 事件的触发

在store内部使用commit来触发同步事件，在组件内可以直接调用。

## 踩过的坑

如果一个对象的某个属性一开始没有被观察，后边就不会被观察，

自己在总数据上添加了一个属性，不能被观察？