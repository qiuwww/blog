

# ref

直接去引用react的元素。

```
  render: function() {
    return <TextInput ref={(c) => this._input = c} />;
  },
  componentDidMount: function() {
    this._input.focus();
  },
```



- 当连接一个ref到一个DOM组件如 `<div />`，你取回DOM节点;
- 当连接一个ref到一个复合组件如 `<TextInput />`，你会得到React类的实例。在后一种情况下，你可以调用任何那个组件的类暴露的方法。
- 注意当被引用的组件卸载和每当ref变动，旧的ref将会被以`null`做参数调用。这阻止了在实例被保存的情况下的内存泄露。

### ref String 属性

1. 赋值`ref`属性为任何从`render` 返回的东西，比如：

   ```
   <input ref="myInput" />
   ```

2. 在其他一些代码中（典型的事件处理代码），通过`this.refs`访问 **支持实例(backing instance)**，如：

   ```
   var input = this.refs.myInput;
   var inputValue = input.value;
   var inputRect = input.getBoundingClientRect();
   ```

**Refs是一种很好的发送消息给特定子实例(通过流式的Reactive `props` 和 `state`来做会不方便)的方式。**

它们应该，不论怎样，不是你数据流通你的应用的首选。默认情况下，使用响应式数据流，并为本身不是reactive的用例保存`ref`s。

### 优点:

- 你可以在你的组件类里**定义任何的公开方法**（比如在一个Typeahead的重置方法）然后通过refs调用那些公开方法（比如`this.refs.myTypeahead.reset()`）。在大多数情况下，使用内建的React数据流更清晰，而不是使用强制的ref。
- 实行DOM测量几乎总是需要接触到 "原生" 组件比如 `<input />` 并且通过 ref 访问它的底层DOM节点。 **Refs 是唯一一个可靠的完成这件事的实际方式。**
- Refs 是为你自动管理的！如果子级被销毁了，它的ref也同样为你销毁了。这里不用担心内存（除非你做了一些疯狂的事情来自己保持一份引用）。

### 注意事项:

- *绝不* 在任何组件的 **render 方法中**访问 refs - 或者当任何组件的render方法还在调用栈上的任何地方运行时。
- 如果你想要保留Google Closure Compiler advanced-mode crushing resilience，**务必不要以属性的方式访问指明为字符串的属性**。这意味这你必须用`this.refs['myRefString']`访问，如果你的ref被定义为`ref="myRefString"`。
- 如果你没有用React写过数个程序，你的第一反应通常是打算试着用refs来在你的应用里"让事情发生"。如果是这样，花一些时间并且更精密的思考`state`应该属于组件层级的哪个位置。常常，这会变得清晰：正确的"拥有"那个属性的地方应该在层级的更高层上。把state放在那里 往往消除了任何使用`ref`s 来 "让事情发生"的渴望 - 作为替代，数据流通常将完成你的目标。
- Refs 不能连接到一个 [stateless function（无状态函数）](https://react-cn.github.io/react/docs/reusable-components.html#stateless-functions)，因为这些组件没有支持实例。你总是可以包装一个无状态组件在一个标准复合组件里并且连接一个ref到这个复合组件。
