
#Mobx

**简单可扩展的状态管理库工具，MobX 会确保组件总是在需要的时重新渲染，但仅此而已。**

### React 和 MobX 是一对强力组合。

React 通过提供机制把应用状态转换为可渲染组件树并对其进行渲染。而MobX提供机制**来存储和更新应用状态**供 React 使用。

对于应用开发中的常见问题，React 和 MobX都提供了最优和独特的解决方案。React 提供了优化UI渲染的机制， 这种机制就是通过使用虚拟DOM来减少昂贵的DOM变化的数量。MobX 提供了优化应用状态与 React 组件同步的机制，这种机制就是使用响应式虚拟依赖状态图表，它只有在真正需要的时候才更新并且永远保持是最新的。

### Observable state(可观察的状态)

使用 `observable` 很像把对象的属性变成excel的单元格。 但和单元格不同的是，这些值不只是原始值，还可以是引用值，比如对象和数组。 你甚至还可以自定义可观察数据源。

**@是ES.next的装饰器。**

### Computed values(计算值)
使用 MobX， 你可以定义在相关数据发生变化时自动更新的值。 通过`@computed `装饰器或者利用 `(extend)Observable`时调用 的`getter / setter`函数来进行使用。

### Reactions(反应)

Reactions 和计算值很像，**但它不是产生一个新的值，而是会产生一些副作用**，比如打印到控制台、网络请求、递增地更新 React 组件树以修补DOM、等等。 简而言之，reactions 在 **响应式编程**和**命令式编程**之间建立沟通的桥梁。



#### 自定义 reactions（自己创建监听操作）

使用`autorun`、`reaction`和 `when`函数即可简单的创建自定义 reactions，以满足你的具体场景。

例如，每当 `unfinishedTodoCount` 的数量发生变化时，下面的 `autorun` 会打印日志消息:

```
autorun(() => {
    console.log("Tasks left: " + todos.unfinishedTodoCount)
})
```



#### MobX 会对在执行跟踪函数期间读取的任何现有的可观察属性做出反应。

### Actions(动作)

**最后全部归纳为: 状态应该以某种方式来更新。**

当状态更新后，`MobX` 会以一种高效且无障碍的方式处理好剩下的事情。

从技术上层面来讲，并不需要触发事件、调用分派程序或者类似的工作。**归根究底 React 组件只是状态的华丽展示，而状态的衍生由 MobX 来管理。**

尽管如此，MobX 还是提供了 `actions` 这个可选的内置概念。 使用 `actions` 是有优势的: 它们可以帮助你把代码组织的更好，还能在状态何时何地应该被修改这个问题上帮助你做出明智的决定。



### State(状态)

**状态** 是驱动应用的数据。 通常有像待办事项列表这样的**领域特定状态**，还有像当前已选元素的**视图状态**。 记住，状态就像是有数据的excel表格。

### Derivations(衍生)

**任何** 源自**状态**并且**不会再有任何进一步的相互作用**的东西就是衍生。 衍生以多种形式存在:

- **用户界面**
- **衍生数据**，比如剩下的待办事项的数量。
- **后端集成**，比如把变化发送到服务器端。

MobX 区分了两种类型的衍生:

- **Computed values(计算值)** - 它们是永远可以使用纯函数(pure function)从当前可观察状态中衍生出的值。
- **Reactions(反应)** - Reactions **是当状态改变时需要自动发生的副作用。**需要有一个桥梁来连接命令式编程(imperative programming)和响应式编程(reactive programming)。或者说得更明确一些，它们最终都需要实现I / O 操作。

**黄金法则: 如果你想创建一个基于当前状态的值时，请使用 `computed`。**



### (@)computed

计算值(computed values)是可以根据现有的状态或其它计算值衍生出的值。

还可以为计算值定义 setter。注意这些 setters 不能用来直接改变计算属性的值，但是它们可以用来作“逆向”衍生。

不要把 `computed` 和 `autorun` 搞混。它们都是响应式调用的表达式，但是，如果你想响应式的产生一个可以被其它 observer 使用的**值**，请使用 `@computed`，如果你不想产生一个新值，而想要达到一个**效果**，请使用 `autorun`。 举例来说，效果是像打印日志、发起网络请求等这样命令式的副作用。

```
class Foo {
    @observable length = 2;
    @computed get squared() {
        return this.length * this.length;
    }
    set squared(value) { // 这是一个自动的动作，不需要注解
        this.length = Math.sqrt(value);
    }
}
```



### @Autorun

`computed(function)` 创建的函数只有当它有自己的观察者时才会重新计算，否则它的值会被认为是不相关的。 

当你想创建一个响应式函数，而该函数本身永远不会有观察者时,可以使用 `mobx.autorun`。 这通常是当你需要从反应式代码桥接到命令式代码的情况，例如打印日志、持久化或者更新UI的代码。 当使用 `autorun`时，所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。 

`autorun` 只会观察在执行提供的函数时所使用的数据。

**很重要，衍生状态，集中判断**

```
var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'

disposer();
numbers.push(5);
// 不会再输出任何值。`sum` 不会再重新计算。
```



### @action(状态)

任何应用都有动作。动作是任何用来修改状态的东西。 使用MobX你可以在代码中显式地标记出动作所在的位置。 动作可以**有助于更好的组织代码**。

*action.bound 不要和箭头函数一起使用；箭头函数已经是绑定过的并且不能重新绑定。*

