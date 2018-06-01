

# Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

- Redux 由 Flux 演变而来，但受 Elm 的启发，避开了 Flux 的复杂性。
- 一般情况下人们认为 Redux 就是一些 CommonJS 模块的集合。这些模块就是你在使用 Webpack、Browserify、或者 Node 环境时引入的。
- 多数情况下，你还需要使用 React 绑定库和开发者工具。`react-redux、redux-devtools`


### 要点

应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 
惟一改变 state 的办法是触发 action，一个描述发生什么的对象。 
为了描述 action 如何改变 state 树，你需要编写 reducers。



### 动机

Redux 试图让 state 的变化变得可预测。

### 三大原则

- 单一数据源: 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

- state是只读的: 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
```
这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现。
```

- 使用纯函数来执行修改（只依赖自己的参数，无副作用）: 为了描述 action 如何改变 state tree ，你需要编写 reducers。

### 先前技术

#### 与flux的关系

- Redux 的灵感来源于 Flux 的几个重要特性。和 Flux 一样，Redux 规定，**将模型的更新逻辑全部集中于一个特定的层（Flux 里的 store，Redux 里的 reducer）**。

- Flux 和 Redux 都不允许程序直接修改数据，而是用一个叫作 “action” 的普通对象来对更改进行描述。

- 而不同于 Flux ，Redux 并没有 dispatcher 的概念。原因是它依赖纯函数来替代事件处理器。

- 和 Flux 的另一个重要区别，是 Redux 设想你永远不会变动你的数据。




