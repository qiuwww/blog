## 原理

### 这就是所谓的 Virtual DOM 算法。包括几个步骤：

- 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中；
- 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异；
- 把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。

** Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。**

可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。

## 算法实现

1. 步骤一：用 JS 对象模拟 DOM 树；

用 JavaScript 来表示一个 DOM 节点是很简单的事情，你只需要记录它的节点类型、属性，还有子节点。

```
element.jsfunction Element (tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

module.exports = function (tagName, props, children) {
  return new Element(tagName, props, children)
}
例如上面的 DOM 结构就可以简单的表示：var el = require('./element')

var ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3'])
])

```

2. 步骤二：比较两棵虚拟 DOM 树的差异;

正如你所预料的，比较两棵 DOM 树的差异是 Virtual DOM 算法最核心的部分，这也是所谓的 Virtual DOM 的 diff 算法。

两个树的完全的 diff 算法是一个时间复杂度为 O(n^3) 的问题。但是在前端当中，你很少会跨越层级地移动 DOM 元素。所以 Virtual DOM 只会对同一个层级的元素进行对比。
元素只会和同一层级的 div 对比，第二层级的只会跟第二层级对比。这样算法复杂度就可以达到 O(n)。

- 深度优先遍历，记录差异
- 差异类型
  上面说的节点的差异指的是什么呢？对 DOM 操作可能会：替换掉原来的节点，例如把上面的 div 换成了 section 移动、删除、新增子节点，例如上面 div 的子节点，把 p 和 ul 顺序互换修改了节点的属性对于文本节点，文本内容可能会改变。例如修改上面的文本节点 2 内容为 Virtual DOM 2。
- 列表对比算法

3. 把差异应用到真正的 DOM 树上
   因为步骤一所构建的 JavaScript 对象树和 render 出来真正的 DOM 树的信息、结构是一样的。所以我们可以对那棵 DOM 树也进行深度优先的遍历，遍历的时候从步骤二生成的 patches 对象中找出当前遍历的节点差异，然后进行 DOM 操作。

## Virtual DOM 算法主要是实现上面步骤的三个函数：element，diff，patch。

然后就可以实际的进行使用：

```js
// 1. 构建虚拟DOM
var tree = el("div", { id: "container" }, [
  el("h1", { style: "color: blue" }, ["simple virtal dom"]),
  el("p", ["Hello, virtual-dom"]),
  el("ul", [el("li")])
]);

// 2. 通过虚拟DOM构建真正的DOM
var root = tree.render();
document.body.appendChild(root);

// 3. 生成新的虚拟DOM
var newTree = el("div", { id: "container" }, [
  el("h1", { style: "color: red" }, ["simple virtal dom"]),
  el("p", ["Hello, virtual-dom"]),
  el("ul", [el("li"), el("li")])
]);

// 4. 比较两棵虚拟DOM树的不同
var patches = diff(tree, newTree);

// 5. 在真正的DOM元素上应用变更
patch(root, patches);
```
