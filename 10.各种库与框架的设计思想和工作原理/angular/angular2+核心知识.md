# angular2+的核心知识

Angular 是一个用 Html 和 TypeScript 构建客户端应用的平台与框架。

## 模块（router，store，...）

Angular 的基本构造块是 NgModule，它为组件提供了编译的上下文环境。NgModule 会把相关的代码收集到一些功能集中。Angular 应用就是由一组 NgModule 定义出的。 应用至少会有一个用于引导应用的根模块，通常还会有很多特性模块。

## 组件 (内置组件，自定义组件))

@Component 装饰器表明紧随它的那个类是一个组件，并提供模板和该组件专属的元数据。

组件定义视图。
组件使用服务。
组件和服务都是简单的类。这些类使用装饰器来标出他们的类型。

## 模板、指令和数据绑定

模板会把 HTML 和 Angular 的标记（markup）组合起来，这些标记可以在 HTML 元素显示出来之前修改它们。 模板中的指令会提供程序逻辑，而绑定标记会把你应用中的数据和 DOM 连接在一起。

## 服务与依赖注入

对于与特定视图无关并希望跨组件共享的数据或逻辑，可以创建服务类。 服务类的定义通常紧跟在 “@Injectable” 装饰器之后。该装饰器提供的元数据可以让你的服务作为依赖被注入到客户组件中。

依赖注入（或 DI）让你可以保持组件类的精简和高效。有了 DI，组件就不用从服务器获取数据、验证用户输入或直接把日志写到控制台，而是会把这些任务委托给服务。

## 路由

Angular 的 Router 模块提供了一个服务，它可以让你定义在应用的各个不同状态和视图层次结构之间导航时要使用的路径。 它的工作模型基于人们熟知的浏览器导航约定：

在地址栏输入 URL，浏览器就会导航到相应的页面。
在页面中点击链接，浏览器就会导航到一个新页面。
点击浏览器的前进和后退按钮，浏览器就会在你的浏览历史中向前或向后导航。

## RXJS 库

响应式编程是一种面向数据流和变更传播的异步编程范式（Wikipedia）。RxJS（响应式扩展的 JavaScript 版）是一个使用可观察对象进行响应式编程的库，它让组合异步代码和基于回调的代码变得更简单 (RxJS Docs)。

RxJS 提供了一种对 Observable 类型的实现，直到 Observable 成为了 JavaScript 语言的一部分并且浏览器支持它之前，它都是必要的。这个库还提供了一些工具函数，用于创建和使用可观察对象。这些工具函数可用于：

把现有的异步代码转换成可观察对象

迭代流中的各个值

把这些值映射成其它类型

对流进行过滤

组合多个流

## Angular 会按以下顺序调用钩子方法

### ngOnChanges - 在输入属性 (input)/输出属性 (output)的绑定值发生变化时调用

### ngOnInit - 在第一次 ngOnChanges 完成后调用

### ngDoCheck - 开发者自定义变更检测

### ngAfterContentInit - 在组件内容初始化后调用

### ngAfterContentChecked - 在组件内容每次检查后调用

### ngAfterViewInit - 在组件视图初始化后调用

### ngAfterViewChecked - 在组件视图每次检查后调用

### ngOnDestroy - 在指令销毁前调用

## 特征

### MVC 模式

Model:数据,其实就是 angular 变量(\$scope.XX);

View: 数据的呈现,Html+Directive(指令);

Controller:操作数据,就是 function,数据的增删改查;

### 双向绑定

AngularJS 是建立在这样的信念上的：即声明式编程应该用于构建用户界面以及编写软件构建，而指令式编程非常适合来表示业务逻辑。

### 依赖注入

就相当于 vuex 重的 getter， vue 中的 computed， mobx 中的 autorun

### 模块化开发

高内聚低耦合法则

1)官方提供的模块 ng、ngRoute、ngAnimate

2)用户自定义的模块 angular.module('模块名',[ ])

## 理解 \$scope：（1 版本）

$scope 的使用贯穿整个 AngularJS App 应用,它与数据模型相关联,同时也是表达式执行的上下文.有了$scope 就在视图和控制器之间建立了一个通道,基于作用域视图在修改数据时会立刻更新 $scope,同样的$scope 发生改变时也会立刻重新渲染视图.

### 内置\$http 来请求数据

内置服务\$http 来实现

## 版本问题

angularjs(1), 基于 js 的 mvc 框架，不适用 mobile app 的开发；
angular 2， 基于组件的架构，体积更小，与 react 结构相似，基于 typeScript，完全重写,从版本 2 开始，Angular 不再是一个 JavaScript 框架；
angular 4， 2 版本的迭代版本，更快；
angular 5， 在 5 这个新的版本中，Angular 团队将改进重点放在以下特性方面：
更易于构建渐进式 Web 应用 —— **P**rogressive **W**eb **A**pp
使用构建优化器剔除无用代码，以获得更小的应用、更快的网络加载时间
使物化设计组件兼容服务端渲染
