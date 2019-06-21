# angularJS简介

## 特征

### MVC模式

Model:数据,其实就是angular变量($scope.XX);

View: 数据的呈现,Html+Directive(指令);

Controller:操作数据,就是function,数据的增删改查;

### 双向绑定

AngularJS是建立在这样的信念上的：即声明式编程应该用于构建用户界面以及编写软件构建，而指令式编程非常适合来表示业务逻辑。

### 依赖注入

就相当于 vuex重的getter， vue中的computed， mobx中的autorun

### 模块化开发

高内聚低耦合法则

1)官方提供的模块          ng、ngRoute、ngAnimate

2)用户自定义的模块        angular.module('模块名',[ ])


## 理解 $scope：（1版本）

$scope 的使用贯穿整个 AngularJS App 应用,它与数据模型相关联,同时也是表达式执行的上下文.有了$scope 就在视图和控制器之间建立了一个通道,基于作用域视图在修改数据时会立刻更新 $scope,同样的$scope 发生改变时也会立刻重新渲染视图.


### 内置$http来请求数据
内置服务$http来实现

## 版本问题

angularjs(1), 基于js的mvc框架，不适用mobile app的开发；
angular 2， 基于组件的架构，体积更小，与react结构相似，基于typeScript，完全重写,从版本2开始，Angular不再是一个JavaScript框架；
angular 4， 2版本的迭代版本，更快；
angular 5， 在5这个新的版本中，Angular团队将改进重点放在以下特性方面：
更易于构建渐进式Web应用 —— __P__rogressive __W__eb __A__pp
使用构建优化器剔除无用代码，以获得更小的应用、更快的网络加载时间
使物化设计组件兼容服务端渲染




