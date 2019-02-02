
# DOM

知道如何遍历和操作 DOM 非常重要，对于重度依赖 jQuery 或者开发了很多 React & Angular 类型应用程序的候选人来说，他们可能会在这个问题上栽跟斗。你可能不会每天都直接接触 DOM，因为我们大多数人都在使用各种抽象。

## 在不使用第三方库的情况下，你需要知道如何执行以下这些操作：

- 使用 document.querySelector 选择或查找节点，在旧版浏览器中使用 document.**getElementsByTagName；**
- 上下遍历——Node.parentNode、Node.firstChild、Node.lastChild 和 Node.childNodes；
- 左右遍历——Node.previousSibling 和 Node.nextSibling；
- 操作——在 DOM 树中**添加、删除、复制和创建节点**。你应该了解如何修改节点的文本内容以及切换、删除或添加 CSS 类名等操作；
- 性能——当有很多节点时，修改 DOM 的成本会很高，你至少应该知道如何**使用文档片段和节点缓存**。
