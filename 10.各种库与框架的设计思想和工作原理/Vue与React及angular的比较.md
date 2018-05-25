



# 比较 Angular、React、Vue

 

## 介绍

### angular

- Angular 是基于 TypeScript 的 Javascript 框架，由 Google 进行开发和维护。

### react

- React 被描述为 “用于构建用户界面的 JavaScript 库”。
- Facebook 正在开发 React Fiber。它会改变 React 的底层 - 渲染速度应该会更快 - 但是在变化之后，版本会向后兼容。

### vue

- Vue 将自己描述为一款“用于构建直观，快速和组件化交互式界面的 MVVM 框架”。

## 组件

- React 和 Vue 都擅长处理组件：小型的无状态的函数接收输入和返回元素作为输出。


## 语法：Typescript，ES6 与 ES5

- React 专注于使用 Javascript ES6。

- Vue 使用 Javascript ES5 或 ES6。

- Angular 依赖于 TypeScript。

## 模板 —— JSX 还是 HTML

### JSX

- 分离模板和逻辑仅仅是技术的分离，而不是关注的分离。你应该构建组件而不是模板。组件是可重用的、可组合的、可单元测试的。

## 框架和库

- Angular 是一个框架而不是一个库，因为它提供了关于如何构建应用程序的强有力的约束，并且还提供了更多开箱即用的功能。Angular 是一个 “完整的解决方案” - 功能齐全，你可以愉快的开始开发。

- Vue 似乎是三个框架中最轻量的。

- Vue.js 完美的兼顾了它将为你做什么和你需要做什么。（...）Vue.js 始终是可及的，一个坚固，但灵活的安全网，保证编程效率和把操作 DOM 造成的痛苦降到最低。

- React “是 JS 界在意识层面向前迈出的一大步，它以一种实用简洁的方式向人们展示了真正的函数式编程。和 Vue 相比，React 的一大缺点是由于 JSX 的限制，组件的粒度会更小。

## 状态管理和数据绑定

### react

React 经常与 Redux 在一起使用。Redux 以三个基本原则来自述：

单一数据源（Single source of truth）
State 是只读的（State is read-only）
使用纯函数执行修改（Changes are made with pure functions）

换句话说：整个应用程序的状态存储在单个 store 的状态树中。这有助于调试应用程序，一些功能更容易实现。状态是只读的，只能通过 action 来改变，以避免竞争条件（这也有助于调试）。编写 Reducer 来指定如何通过 action 来转换 state。

-  Mobx,你可以把它看作是一个 “自动的 Redux”

### vuex

Vue 可以使用 Redux，但它提供了 Vuex 作为自己的解决方案。


### angular

React 和 Angular 之间的巨大差异是 单向与双向绑定。当 UI 元素（例如，用户输入）被更新时，Angular 的双向绑定改变 model 状态。React 只有一种方法：先更新 model，然后渲染 UI 元素。Angular 的方式实现起来代码更干净，开发人员更容易实现。React 的方式会有更好的数据总览，因为数据只能在一个方向上流动（这使得调试更容易）。




## 其他的编程概念


Angular 包含依赖注入（dependency injection），即一个对象将依赖项（服务）提供给另一个对象（客户端）的模式。这导致更多的灵活性和更干净的代码。文章 “理解依赖注入” 更详细地解释了这个概念。
模型 - 视图 - 控制器模式（MVC）将项目分为三个部分：模型，视图和控制器。Angular（MVC 模式的框架）有开箱即用的 MVC 特性。React 只有 V —— 你需要自己解决 M 和 C。


你可以通过仅仅添加 React 或 Vue 的 JavaScript 库到你的源码中的方式去使用它们。但是由于 Angular 使用了 TypeScript，所以不能这样使用 Angular。

## 体积和性能

任何框架都不会十全十美：Angular 框架非常臃肿。gzip 文件大小为 143k，而 Vue 为 23K，React 为 43k。

为了提高性能，React 和 Vue 都使用了虚拟 DOM（Virtual DOM）。


Vue 有着很好的性能和高深的内存分配技巧。如果比较快慢的话，这些框架都非常接近


## 测试


## 通用与原生 app

通用 app 正在将应用程序引入 web、搬上桌面，同样将深入原生 app 的世界。
React 和 Angular 都支持原生开发。Angular 拥有用于原生应用的 NativeScript（由 Telerik 支持）和用于混合开发的 Ionic 框架。借助 React，你可以试试 react-native-renderer 来构建跨平台的 iOS 和 Android 应用程序，或者用 react-native 开发原生 app。许多 app（包括 Facebook；查看更多的展示）都是用 react-native 构建的。
Javascript 框架在客户端上渲染页面。这对于性能，整体用户体验和 SEO 是不利的。服务器端预渲染是一个好办法。所有这三个框架都有相应的库来实现服务端渲染。React 有 next.js，Vue 有 nuxt.js

### 虚拟dom

所谓的Virtual DOM基本上说就是它名字的意思：虚拟DOM，DOM树的虚拟表现。
它的诞生是基于这么一个概念：改变真实的DOM状态远比改变一个JavaScript对象的花销要大得多。
Virtual DOM是一个映射真实DOM的JavaScript对象，如果需要改变任何元素的状态，那么是先在Virtual DOM上进行改变，
而不是直接改变真实的DOM。当有变化产生时，**一个新的Virtual DOM对象会被创建并计算新旧Virtual DOM之间的差别**。之后这些差别会应用在真实的DOM上。

计算差异的算法是高性能框架的秘密（diff算法）所在，React和Vue在实现上有点不同。
Vue宣称可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。

### React与Vue都鼓励组件化应用。

这本质上说，是建议你**将你的应用分拆成一个个功能明确的模块**，每个模块之间可以通过合适的方式互相联系。


### React和Vue都有自己的构建工具，你可以使用它快速搭建开发环境。

React可以使用Create React App (CRA)，而Vue对应的则是vue-cli。
两个工具都能让你得到一个根据最佳实践设置的项目模板。



### React和Vue都有很好的Chrome扩展工具去帮助你找出bug。
它们会检查你的应用，让你看到Vue或者React中的变化。
你也可以看到应用中的状态，并实时看到更新。

React的开发工具: https://cdn.deliciousbrains.com/content/uploads/2017/06/15151112/react-devtools.mp4

Vue的开发工具: https://cdn.deliciousbrains.com/content/uploads/2017/06/15151111/vue-devtools.mp4