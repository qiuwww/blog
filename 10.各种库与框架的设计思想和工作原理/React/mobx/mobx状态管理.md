# Mobx

## mobx

`用于创建store来保存变量`

## mobx-react

`在react组件中使用mobx`

@observable: 使用此标签**监控要检测的数据**；
@observer: 使用此标签**监控当数据变化是要更新的 Component（组件类）**；
@action(动作): 使用此标签**监控数据改变的自定义方法**(当在需要数据改变的时候执行此自定义方法，那么 View 层也会跟着自动变化，默认此 View 层已经使用@observer 标签监控)， 用于初始化数据;

### @action，动作

任何应用都有动作。
动作是任何用来修改状态的东西。
使用 MobX 你可以在代码中显式地标记出动作所在的位置。
动作可以有助于更好的组织代码。

[action 装饰器/函数遵循 javascript 中标准的绑定规则](http://cn.mobx.js.org/refguide/action.html)。

但是，Mobx 3 引入了 action.bound **来自动地将动作绑定到目标对象**。 注意，与 action 不同的是，(@)action.bound 不需要一个 name 参数，名称将始终基于动作绑定的属性。

应该永远*只对修改状态的函数使用动作*。 只执行查找，过滤器等函数不应该被标记为动作，以允许 MobX 跟踪它们的调用。

### @compute，推理得到的属性

@compute(调节器): 计算值(computed values)是可以根据现有的状态或其它计算值**衍生出的值**。概念上来说，它们与 excel 表格中的公式十分相似。

它们都是**响应式调用的表达式**，但是，

- 如果你想响应式的产生一个**可以被其它 observer 使用的值，请使用 @computed**，
- 如果你不想产生一个新值，而想要达到一个效果，请使用 autorun。

## 方法

### toJS ： toJS(value, supportCycles = true)

递归地将一个(observable)对象转换为 javascript 结构。 支持 observable 数组、对象、映射和原始类型。计算值和其他不可枚举的属性不会成为结果的一部分。

## Observable state(可观察的状态)

使用 `observable` 很像把对象的属性变成 excel 的单元格。 但和单元格不同的是，这些值不只是原始值，还可以是引用值，比如对象和数组。 你甚至还可以自定义可观察数据源。

@是 ES.next 的装饰器。

## Computed values(计算值)

使用 MobX， 你可以定义在相关数据发生变化时自动更新的值。 通过`@computed`装饰器或者利用 `(extend)Observable`时调用 的`getter / setter`函数来进行使用。

## Reactions(反应)，watch

Reactions 和计算值很像，**但它不是产生一个新的值，而是会产生一些副作用**，比如打印到控制台、网络请求、递增地更新 React 组件树以修补 DOM、等等。 简而言之，reactions 在 **响应式编程**和**命令式编程**之间建立沟通的桥梁。

### 自定义 reactions（自己创建监听操作）

使用`autorun`、`reaction`和 `when`函数即可简单的创建自定义 reactions，以满足你的具体场景。
例如，每当 `unfinishedTodoCount` 的数量发生变化时，下面的 `autorun` 会打印日志消息:

```js
autorun(() => {
  console.log("Tasks left: " + todos.unfinishedTodoCount);
});
```

### @Autorun

`computed(function)` 创建的函数只有当它有自己的观察者时才会重新计算，否则它的值会被认为是不相关的。

当你想创建一个响应式函数，而该函数**本身永远不会有观察者时**,可以使用 `mobx.autorun`。 这通常是当你需要从反应式代码桥接到命令式代码的情况，例如打印日志、持久化或者更新 UI 的代码。 当使用 `autorun`时，所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。

`autorun` 只会观察在执行提供的函数时所使用的数据。

很重要，衍生状态，集中判断

```js
var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));
var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'
disposer();
numbers.push(5);
// 不会再输出任何值。`sum` 不会再重新计算。
// demo 2
import {observable, autorun} from "mobx";
var todos = observable([
    { title: "Spoil tea", completed: true },
    { title: "Make coffee", completed: false }
]);
autorun(() => {
    console.log("Remaining:", todos
        .filter(todo => !todo.completed)
        .map(todo => todo.title)
        .join(", ")
    );
});
// 输出: 'Remaining: Make coffee'
todos[0].completed = false;
// 输出: 'Remaining: Spoil tea, Make coffee'
todos[2] = { title: 'Take a nap', completed: false };
// 输出: 'Remaining: Spoil tea, Make coffee, Take a nap'
todos.shift();
// 输出: 'Remaining: Make coffee, Take a nap'
```

注：这里的 autorun 就相当于在监控的变量改变之后执行的函数，不能当成一个类的属性，所以要在构造函数下运行或者在模板渲染的时候执行。

### showloading的控制，实例

定义状态来保存 loading 是否显示，
通过函数来控制 loading 的状态，切记每次传入准确的显示还是隐藏，不要来更改状态（亲测，like a fool）。

```js
@observable loadingShow = false;
@computed loadingShowToJS() {
  return mobx.toJS(this.loadingShow);
}
@action.bound
showLoadingChange(state) {
  this.loadingShow = state;
}

```
