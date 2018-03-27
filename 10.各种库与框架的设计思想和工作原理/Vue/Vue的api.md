# Vue API
https://vuefe.cn/v2/api/

## 一、全局配置 Vue.config（框架配置）

### 1. Vue.config 是一个对象，包含 Vue 的全局配置。silent配置。

可以在启动应用程序之前，**预先修改框架的属性**。

```
Vue.config.silent = true
禁止所有 Vue 的日志(log)与警告(warning)。
```

### 2. optionMergeStrategies

用于定义选项(options)的自定义**合并策略**。

`optionMergeStrategies` 主要用于 `mixin` 以及 `Vue.extend()` 方法时对于子组件和父组件**如果有相同的属性(option)时的合并策略。**

- **默认的合并策略**：就是，子组件的选项不存在，才会使用父组件的选项，如果子组件的选项存在，使用子组件自身的。

- **自定义合并策略**：

  ```
  如果想要定制自定义选项的合并逻辑，则需要向 Vue.config.optionMergeStrategies 添加一个函数：
  Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
    // return mergedVal
  }
  ```

### 3. devtools配置， 设置是否允许vue-devtools审查

```
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true
```

设置是否允许 **vue-devtools**审查应用程序。

### 4. errorHandler，一个全局的错误处理函数，如果项目很小，就没太大必要了

```
Vue.config.errorHandler = function (err, vm, info) {
  // 处理错误
  // `info` 是 Vue 特有的错误信息，例如，错误是在哪个生命周期钩子函数中发现的。
  // info 只在 2.2.0+ 可访问
}
```

设置一个处理函数，用于在组件渲染函数调用和 watcher 期间捕获错误。这个处理函数被调用时，传入 error 对象和 Vue 实例。

### 5. warnHandler，警告的全局处理方法

```
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件层级结构的追踪信息
}
```

为运行时(runtime)下的 Vue 警告设置一个自定义处理函数。注意，这只会在开发环境下生效，在生产环境下设置会被忽略。

### 6. ignoredElements，不去管理的自定义元素。

### 7. keyCodes， 配置按键别名，有什么用？

要在new实例之前注册。记住所有的 `keyCode` 比较困难，所以 Vue 为最常用的按键提供了别名，配置按键的code为别名，.enter， .tab之类的。

### 8. performance， 用于性能分析

设置为 `true`，以在浏览器开发工具的 performance/timeline 面板中，启用组件初始化(init)、编译(compile)、渲染(render)和修补(patch)的性能追踪。只能在开发模式和支持 [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API 的浏览器中运行。

### 9. productionTip 

设置为 `false`，以禁止在 Vue 启动时的生产提示。 

## 二、全局API

### 10. Vue.extend(options)，Vue组件继承。 

使用 Vue 的基础构造函数，创建一个“子类(subclass)”。参数是一个包含组件选项的对象。

```
<div id="mount-point"></div>
// 创建一个 Profile 构造函数
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建一个 Profile 实例，并将其挂载到一个元素上。
// 调用实例的$mount(挂载方法),将js对象挂载到页面元素中。
new Profile().$mount('#mount-point')
```

### 11. Vue.nextTick([callback, context]), 异步更新队列。

在下次 DOM 更新循环结束之后执行延迟回调。**在修改数据之后，立即使用这个回调函数，获取更新后的 DOM**。

事件发生在当前次代码执行过程中的，dom更新之后，返回一个promise对象。

### 12. Vue.set(target, key, value)

设置对象的属性，给对象添加属性值。为了干什么？

### 13. Vue.delete( target, key )

删除对象的属性。

### 14. Vue.directive( id, [definition] )

注入或者获取全局指令。注册在全局Vue对象上。自己添加的方法注册在Vue对象上，为什么不注册在window对象上，^_^。有什么特殊的意义？

### 15. Vue.filter( id, [definition] )

注册或获取全局过滤器。

### 16. Vue.component( id, [definition] )

注册或获取全局**组件**。https://vuefe.cn/v2/api/#Vue-component

### 17. Vue.use( plugin )

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。
install 方法调用时，会将 Vue 作为参数传入。自定义插件的添加。

### 18. Vue.mixin( mixin )

全局注册一个混合，**影响注册之后所有创建的每个 Vue 实例。**
插件作者可以使用混合，向组件注入自定义的行为。

### 19. Vue.compile( template )

在render函数中编译模板字符串。只在完整构建时有效。有什么意义？

### 20. Vue.version

提供字符串形式的**Vue 安装版本号**。
你可以根据不同的版本号采取不同的策略。

## 三、选项/数据

### 21. data

- 组件的data，只接受function，需要创建多个，不能都指向相同的位置。
- Vue 将会递归将 data 的属性转换为 **getter/setter**，从而让 data 的属性能够响应数据变化。
- data 应该只能是数据 - 不推荐观察拥有状态行为的对象。
- 推荐在创建实例之前，就声明所有的根级响应式属性。
- 不应该对 data 属性使用箭头函数。


#### 访问
- 实例创建之后，可以通过**vm.$data** 访问原始数据对象。
- Vue 实例也代理了 data 对象上所有的属性，因此访问 vm.a 等价于访问 vm.$data.a。
- 以 **_ 或 $ 开头的属性 不会 被 Vue 实例代理**，因为它们可能和 Vue 内置的属性、 API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些属性。
- 阶段性属性值的读取操作。如果需要，可以通过将 vm.$data 传入 JSON.parse(JSON.stringify(...)) 得到**深拷贝**的原始数据对象。

### 22. props

- props 可以是数组或对象，用于接收来自父组件的数据。
- props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。

### 23. propsData

- 创建实例时传递 props。主要作用是方便测试。
- 应该实际的生产环境中不会用到。

### 24. computed


- 计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
- 计算属性的结果会被缓存，除非**依赖的响应式属性变化**才会重新计算。注意，如果**实例范畴之外**的依赖 (比如非响应式的 not reactive) 是不会触发计算属性更新的。
- 是不是就是依赖外部的变量就不会触发更新？

#### 应用场景
- 依赖多变量的结果展示，依赖的变量改变的时候，computed的变量会自动计算。

#### 区别于watch
computed的结果会缓存，计算属性只有在它的相关依赖发生变化时才会重新计算求值。

### 25. methods

- methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。
- 方法中的 this 自动绑定为 Vue 实例。

### 26. watch

- 一个对象，键是需要观察的表达式，值是对应回调函数。(观察者模式，省去了主动调用的步骤)，值也可以是方法名，或者包含选项的对象。
- Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。
- 深度watch，有什么用？，直接就可以添加回调啊。添加多个方法吗？

## 选项/DOM
### 27. el

- 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的**挂载目标**。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。
- 在实例挂载之后， 元素可以用 **vm.$el** 访问。
- 如果这个选项在实例化时有作用，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() **手动开启编译**。

### 28. template

一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发 slot。


### 29. render

- 字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。
- render 函数接收一个 **createElement** 方法作为第一个参数用来创建 **VNode**。
- 如果组件是一个函数组件，Render 函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。


### 30. renderError

- 当 render 函数遭遇错误时，**提供另外一种渲染输出**。
- 其错误将会作为第二个参数传递到 renderError。这个功能配合 hot-reload 非常实用。
```
new Vue({
  // 正常情况下的输出
  render (h) {
    throw new Error('oops')
  },
  // 不正常情况下的输出
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack)
  }
  // 挂载节点
}).$mount('#app')
```
## 选项/生命周期钩子

### 31. beforeCreate（实例还没有创造出来）

- 在实例初始化之后，立即同步调用，在数据观察(data observer)和 event/watcher 配置之前被调用。
- 这个时候能干什么？
  - 开始loading状态提示。

### 32. created（实例已经存在了）

- 实例已经创建完成之后被调用。
- 在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。
- 然而，挂载阶段还没开始，$el 属性目前不可见。

- 这个时候能干什么？
  - 参数获取操作；
  - ajax请求；
  - 结束loading状态提示，如果有异步事件，最好放在异步事件结束的时候；


### 33. beforeMount（将要挂载）

- 在挂载开始之前被调用：相关的 render 函数首次被调用。(render后挂载$.mount)

### 34. mounted

- 在实例挂载之后调用，其中 el 被新创建的 vm.$el 替代。
- 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
- 初始data数据在DOM节点上已经渲染完毕。
- 如果是异步操作，这个时候还没有渲染。

### 35. beforeUpdate

- 实例的data发生变化，这个阶段就是在实例状态（dom？）更新之前。
- 在 DOM 被 patch 之前调用数据修改。这是在 DOM 更新之前，访问已有 DOM 的最佳时机。
- data变化完毕。

### 36. updated

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
```
updated: function () {
  // dom更新之后调用后续的操作，更新数据之后立即操作dom
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been re-rendered
  })
}
```
### 37. activated

keep-alive 组件激活时调用。

### 38. deactivated

keep-alive 组件停用时调用。

### 39. beforeDestory

实例销毁之前调用。在这一步，实例仍然完全可用。

### 40. destoryed

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

### 41. errorCaptured
当任何一个来自后代组件的错误时被捕获时调用。此钩子函数会收到三个参数：错误对象、发生错误的组件实例，和一个包含错误在何处被捕获信息的字符串。此钩子函数可以返回 false，以阻止该错误继续向上冒泡。

## 选项/资源

### 42. directives（指令）

包含 Vue 实例可用指令的哈希表。

### 43 filters（过滤器）

包含 Vue 实例可用过滤器的哈希表。

### 44. components（组件）

包含 Vue 实例可用组件的哈希表。

## 选项/杂项

### 45. parent

指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中。

> 同时使用 $parent 和 $children 有冲突 - 他们作为同一个入口 。更推荐用 props 和 events 实现父子组件通信。

### 46. mixins（扩展属性）

mixins 选项接受一个混合对象的数组。这些混合实例对象可以像正常的实例对象一样包含选项,他们将在 Vue.extend() 里最终选择使用相同的选项合并逻辑合并。

Mixin钩子按照传入顺序依次调用,并在调用组件自身的钩子**之前**被调用。

### 47. extends（组件继承）

允许声明扩展另一个组件(可以是一个简单的选项对象或构造函数),而无需使用 Vue.extend。这主要是为了便于扩展单文件组件。


### 48. provide/inject（注入依赖，上下文环境变量）

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。

```
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```
#### 应用
- 传入一般的变量；
- 注入的值作为一个属性的默认值；
  ```
  const Child = {
    inject: ['foo'],
    data () {
        return {
        bar: this.foo
        }
    }
  }
  ```


## 选项/其它

### 49. name（组件名称）

- 作为组件选项的时候有用。


### 50. delimiters（改变纯文本插入分隔符。）

### 51. functional

- 使组件无状态（没有 data ）和无实例（没有 this 上下文）。这只是一个返回 virtual node 的 render 函数，使得渲染成本更低。
- 有什么用？

### 52. model（控制子组件接受的属性和事件）

- 允许一个自定义组件在使用 v-model 时定制 prop 和 event。
- 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能像使用 value prop 来达到不同的目的。
- 使用 model 选项可以回避这些情况产生的冲突。

### 53. inheritAttrs

通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。

### 54. comments

- 当设为 true 时，将会保留且渲染模板中的 HTML 注释。默认行为是舍弃它们。


## 实例属性

### 55. vm.$data（等于this.data）

Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象属性的访问。

### 56. vm.$props

一个对象，代表当前组件收到的 props。Vue 实例代理访问到这个 props 对象的属性们。

### 57. vm.$el

Vue 实例使用的根 DOM 元素。

### 58. vm.$options（控制当前实例的属性选项）

用于当前 Vue 实例的初始化选项。

### 59. vm.$parnts

父实例，如果当前实例有的话。

### 60. vm.$root

当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自已。


### 61. vm.$children

当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。

### 62. vm.$slots

- 用来访问被 slot 分发的内容。
- default 属性包括了所有没有被包含在具名 slot 中的节点。

### 63. vm.$scopedSlots

用来访问 scoped slots。对于包括 默认 slot 在内的每一个 slot， 该对象都包含一个返回相应 VNode 的函数。

### 64. vm.$refs

一个对象，其中包含了所有拥有 ref 注册的子组件。

### 65. vm.$isServer

当前 Vue 实例是否运行于服务器。

### 66. vm.$attrs

可以通过 v-bind="$attrs" 传入内部组件——在创建更高层次的组件时非常有用。

### 67. vm.$listeners

包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。





















