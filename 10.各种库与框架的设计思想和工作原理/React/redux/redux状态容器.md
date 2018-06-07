

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

### 生态系统

查看一下示例



### Store

我们学会了使用 action 来描述“发生了什么”，和使用 reducers 来根据 action 更新 state 的用法。

Store 就是把它们联系到一起的对象。

http://www.redux.org.cn/docs/basics/Store.html

### reducers

对于reducers中的case，可以理解为改变这个变量值的操作类型


### action

Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。

**它是 store 数据的唯一来源。**

一般来说你会通过 store.dispatch() 将 action 传到 store。

就是从页面元素内拿到数据，并更改state。

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

Action 创建函数 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。

在 Redux 中的 action 创建函数只是简单的返回一个 action:
```
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```
这样做将使 action 创建函数更容易被移植和测试。

在 传统的 Flux 实现中，当调用 action 创建函数时，一般会触发一个 dispatch，直接触发更新state。

### connect

react-redux 提供了两个重要的对象，Provider 和 connect，前者使 React 组件可被连接（connectable），后者把 React 组件和 Redux 的 store 真正连接起来。

Provider 内的任何一个组件（比如这里的 Comp），如果需要使用 state 中的数据，就必须是「被 connect 过的」组件——使用 connect 方法对「你编写的组件（MyComp）」进行包装后的产物。

connect 详解

究竟 connect 方法到底做了什么，我们来一探究竟。

首先看下函数的签名：

connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

connect() 接收四个参数，它们分别是 mapStateToProps，mapDispatchToProps，mergeProps和options。

mapStateToProps(state, ownProps) : stateProps

这个函数允许我们将 store 中的数据作为 props 绑定到组件上。
