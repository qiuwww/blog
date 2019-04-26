# 虚拟 dom 实现

## 实现原理

简单来说，就是用一个**轻量级的 dom 结构（只包含真实[dom 节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)的部分属性）**(用 js 模拟实现)，来模拟重量级的 dom 结构，进而通过轻量级结构的操作来**减少重量级结构的操作**，最终达到性能优化的目的。

## 内部实现大致如下：

1. 对于 CompositeComponent，执行 render 方法，得到 renderedElement，这样就构成了父元素与子元素的层级结构；
2. 对于 DOMComponent，通过 props.children，形成父元素与资源的层级结构；
3. 有父子之间的关系后，通过递归渲染的方式，就得到了一个轻量级的虚拟 DOM。

这里有 2 个概念：**Virtual DOM 是真实 DOM 的映射**。
当我们在 Virtual DOM 树改变一些东西的时候，我们得到了一个**新的 Virtual DOM 树**，通过算法比较新树和旧树，找到不同的地方，然后只需要在真实的 DOM 上做出相应的改变。

## diff 算法

dom 结构

```html
<ul class="list">
  <li>item 1</li>
  <li>item 2</li>
</ul>
```

js 对象描述

```js
{ type: 'ul', props: { 'class': 'list' }, children: [
  { type: 'li', props: {}, children: ['item 1'] },
  { type: 'li', props: {}, children: ['item 2'] }
] }
```

映射函数

```js
function h(type, props, ...children) {
  return {
    type,
    props,
    children
  };
}
```

比较差异，对象嵌套，迭代比较

- 基本就是本来很多的一堆 dom 操作，放在同一个地方一次进行操作。最终还是需要操作 dom，次数变少了。
- 类似于使用 js 模板来渲染数据

## Virtual DOM

[Virtual DOM](https://ustbhuangyi.github.io/vue-analysis/data-driven/virtual-dom.html)
