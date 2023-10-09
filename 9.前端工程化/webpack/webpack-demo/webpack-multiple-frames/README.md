# webpack脚手架，在同一个项目中同时存在vue、react、jquery的代码

但是这些内容相互没有办法相互调用，如果相互之间可以调用，那就是微服务了。

这里是不是可以通过发布订阅模式来实现相互调用。

## 目标

1. 学习webpack的配置；
2. 学习各种框架之间的差异；
   1. 对比 jquery / js / ts /vue3.0+ / react18+(hooks) /angular2+，知识串一下；

## 主要关注点

1. webpack5.0 的使用，多入口处理，在同一个页面展示；
2. 列表的渲染与更新；
3. 父子组件的更新；
4. form 表单组件提交；
5. 状态管理器数据管理；
   1. 不可变的数据 immate 优化 react 的 fc 组件；
6. hooks 的使用；
   1. 请求的 hooks；
   2. 功能复用的 hooks；
7. **项目理解原理性的一些东西**：
   1. 各种写法的生命周期控制；
   2. 页面更新原理，diff 算法 + 虚拟 dom；
   3. setData 与 proxy；
8. webpack 打包原理、webpack 包依赖管理、webpack 各种优化技巧；
   1. 异步加载包；
   2. 多核打包；
9. github，cicd 操作，生成打包代码；
10. ？？切换 vite 打包测试一下？

## 通过不同的类型的代码，实现相同的功能

如渲染一个list、实现一个数据双向绑定、操作dom等。

## 参考

1. [vue、react、angular三大框架对比 && 与jQuery的对比](https://www.cnblogs.com/zhuzhenwei918/p/7447434.html)；
