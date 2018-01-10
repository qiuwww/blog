监听DOM变化的方法MutationObserver或者使用jq的方法.js

感觉非常的有用啊，监控页面的变化，然后进行相应的数据操作

Mutation Observer（变动观察器）是监视DOM变动的接口。
当DOM对象树发生任何变动时，Mutation Observer会得到通知。

亲测可用

// MutationObserver给开发者们提供了一种能在某个范围内的DOM树发生变化时作出适当反应的能力.该API设计用来替换掉在DOM3事件规范中引入的Mutation事件.
// Firefox和Chrome早期版本中带有前缀
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

// 选择目标节点
var target = document.querySelector('body');
 
// 创建观察者对象
var observer = new MutationObserver(function(mutations) {
	console.log("callback fire");
  // mutations.forEach(function(mutation) {
  //   console.log(mutation.type);
  // });    
});
 
// 配置观察选项:
// observe()
// 给当前观察者对象注册需要观察的目标节点,在目标节点(还可以同时观察其后代节点)发生DOM变化时收到通知.
var config = { attributes: true, childList: true, characterData: true ,subtree: true}


 
// 传入目标节点和观察选项
observer.observe(target, config);
 
// 随后,你还可以停止观察
// observer.disconnect();

详细信息参考mdn

用途：
1. 一片范围内的元素改变，多筛选条件改变的时候，监控一个范围内的元素变化，从而触发某些事件js处理函数