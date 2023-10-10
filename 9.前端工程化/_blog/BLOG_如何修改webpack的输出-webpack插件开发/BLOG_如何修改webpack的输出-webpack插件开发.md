# 如何修改webpack的输出-webpack插件开发 ｜ 使用webpack来修改源码&webpack插件开发

## 总结

通过这个插件的开发，整体的学习了一下webpack的配置及babel的使用，以及ast的使用，对webpack打包的中间产物有了一定的了解。

### 其他的一些理解

1. webpack 与 vite
   1. vite的优势就是开发过程中几乎不需要编译，直接运行到了浏览器；
   2. 而Vite则采用了基于ES Module的开发服务器，只有在需要时才会编译对应的模块，大幅度提升了开发环境的响应速度；
   3. webpack配置相对复杂，插件的开发要对webpack有深入的理解；

## 参考文档

1. [webpack官方文档](https://webpack.docschina.org/concepts/)；
2. [webpack5 和 webpack4 的区别有哪些](https://www.cnblogs.com/Hsong/p/15894515.html)；
3. [webpack自定义插件](https://webpack.docschina.org/contribute/writing-a-plugin/)
4. [Compilation Object](https://webpack.docschina.org/api/compilation-object/)
5. [如何利用AST树修改源码](https://juejin.cn/post/6904228580172627975)
6. [webpack插件开发及修改源码的几种方式](https://www.haorooms.com/post/webpack_plugin_changcode)，重要；
7. [小程序 webpack 插件](https://github.com/listenzz/MyMina/blob/master/README.md)；
8. [从Webpack源码探究打包流程，萌新也能看懂](https://cloud.tencent.com/developer/article/1410197)；
9. [通过webpack插件修改代码全攻略](https://juejin.cn/post/7268164970410754063#heading-13)
10. [手写Webpack生命周期及其实现过程](https://juejin.cn/post/7206487695123480635)
11. [学习官方文档](https://webpack.docschina.org/api/compiler-hooks/)。
