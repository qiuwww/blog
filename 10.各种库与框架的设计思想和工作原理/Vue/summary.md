# 开发过程中的坑

### 1. data：组件的data只能传入一个函数（不能是箭头函数，需要指向当前对象

### ），不能传入一个对象, 可能需要生成多个

Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化。**对象必须是纯粹的对象(含有零个或多个的key/value对)**：浏览器 API 创建的原生对象，原型上的属性会被忽略。大概来说，data 应该只能是数据 - 不推荐观察拥有状态行为的对象。

实例创建之后，可以通过 `vm.$data` 访问原始数据对象。**Vue 实例也代理了 data 对象上所有的属性**，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

在定义一个**组件**时，`data` 必须声明为一个返回初始数据对象的函数，**因为可能会使用此函数创建多个实例。**

如果 `data` 是一个普通对象，则所有创建出来的实例将**共享引用**同一个数据对象！通过提供 `data` 函数，每次创建一个新实例后，我们能够调用 `data`函数，从而返回初始数据的一个全新的 data 对象副本。

如果需要，可以通过将 `vm.$data` 传入 `JSON.parse(JSON.stringify(...))` 得到深拷贝的原始数据对象。

注意，**不应该对 data 属性使用箭头函数** (例如`data: () => { return { a: this.myProp }}`)。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，`this.myProp` 将是 undefined。

 ### 2. {{}}：模板样式来渲染数据;

### 3. scoped

```
<style scoped>
  @media (min-width: 250px) {
    .list-container:hover {
      background: orange;
    }
  }
</style>
```

这个可选 `scoped` 属性会**自动添加一个唯一的属性（比如 `data-v-21e5b78`）为组件内 CSS 指定作用域**，编译的时候 `.list-container:hover` 会被编译成类似 `.list-container[data-v-21e5b78]:hover`。



### 4. 不要使用HTML elements 作为 组件的id

