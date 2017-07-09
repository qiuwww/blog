



// 所谓的Virtual DOM基本上说就是它名字的意思：虚拟DOM，DOM树的虚拟表现。
// 它的诞生是基于这么一个概念：改变真实的DOM状态远比改变一个JavaScript对象的花销要大得多。
// Virtual DOM是一个映射真实DOM的JavaScript对象，如果需要改变任何元素的状态，那么是先在Virtual DOM上进行改变，
// 而不是直接改变真实的DOM。当有变化产生时，一个新的Virtual DOM对象会被创建并计算新旧Virtual DOM之间的差别。
// 之后这些差别会应用在真实的DOM上。



// 当新一项被加进去这个JavaScript对象时，一个函数会计算新旧Virtual DOM之间的差异并反应在真实的DOM上。
// 计算差异的算法是高性能框架的秘密所在，React和Vue在实现上有点不同。
// Vue宣称可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，
// 不需要重新渲染整个组件树。

// React与Vue都鼓励组件化应用。
// 这本质上说，是建议你将你的应用分拆成一个个功能明确的模块，每个模块之间可以通过合适的方式互相联系。


// React和Vue都有自己的构建工具，你可以使用它快速搭建开发环境。
// React可以使用Create React App (CRA)，而Vue对应的则是vue-cli。
// 两个工具都能让你得到一个根据最佳实践设置的项目模板。



// React和Vue都有很好的Chrome扩展工具去帮助你找出bug。
// 它们会检查你的应用，让你看到Vue或者React中的变化。
// 你也可以看到应用中的状态，并实时看到更新。

// React的开发工具: https://cdn.deliciousbrains.com/content/uploads/2017/06/15151112/react-devtools.mp4

// Vue的开发工具: https://cdn.deliciousbrains.com/content/uploads/2017/06/15151111/vue-devtools.mp4