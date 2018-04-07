# Vue API
https://vuefe.cn/v2/api/

## 一、全局配置 （Vue.config框架配置）

### 1. Vue.config 是一个对象，包含 Vue 的全局配置。

#### silent配置

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

设置一个处理函数，用于在**组件渲染函数调用和 watcher 期间捕获错误**。这个处理函数被调用时，传入 error 对象和 Vue 实例。

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

#### 可以给Vue对象添加属性和方法

添加一些 Vue 实例方法，通过把这些方法添加到 Vue.prototype 上实现。

方便使用全局变和方法。

## 二、全局API

### 10. Vue.extend(options)，Vue组件继承。 

使用 Vue 的基础构造函数，创建一个“**子类(subclass)**”。参数是一个包含组件选项的对象。

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

### 11. Vue.nextTick([callback, context]), 异步更新队列。延迟更新后执行操作。

在下次 DOM 更新循环结束之后执行延迟回调。**在修改数据之后，立即使用这个回调函数，获取当前次数据更改更新后的 DOM**。

事件发生在当前次代码执行过程中的，**dom更新之后，返回一个promise对象**。
```
new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // 修改数据
      this.message = 'changed'
      // DOM 还没有更新
      // 当前一次更改数据之后的页面回调（延后）
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.doSomethingElse()
      })
    }
  }
})
```

### 12. Vue.set(target, key, value)

设置对象的属性，给对象添加属性值。为了干什么？

### 13. Vue.delete( target, key )

删除对象的属性。

### 14. Vue.directive( id, [definition] )

**注入或者获取全局指令。**注册在全局Vue对象上。自己添加的方法注册在Vue对象上，为什么不注册在window对象上，^_^。有什么特殊的意义？

指令主要使用来完成一些公用的更复杂的处理。（类比一下内置的指令）

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，**你仍然需要对普通 DOM 元素进行底层操作**，这时候就会用到自定义指令。

#### 自定义指令有如下的钩子函数：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

钩子函数的参数 (即 `el`、`binding`、`vnode` 和 `oldVnode`)。


### 15. Vue.filter( id, [definition] )

注册或获取全局过滤器。

### 16. Vue.component( id, [definition] )

注册或获取全局**组件**。https://vuefe.cn/v2/api/#Vue-component

### 17. Vue.use( plugin )

**安装 Vue.js 插件。**

- 如果插件是一个对象，必须提供 **install 方法**。
- 如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。自定义插件的添加。

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
- Vue 将会**递归**将 data 的属性转换为 **getter/setter**，从而让 data 的属性能够响应数据变化。
- data 应该只能是数据 - **不推荐观察拥有状态行为的对象**。
- 推荐在创建实例之前，就声明所有的根级响应式属性。
- 不应该对 data 属性使用箭头函数。


#### 访问
- 实例创建之后，可以通过**vm.$data** 访问原始数据对象。
- Vue 实例也代理了 data 对象上所有的属性，因此**访问 vm.a 等价于访问 vm.$data.a**。
- 以 **_ 或 $ 开头的属性 不会 被 Vue 实例代理**，因为它们可能和 Vue 内置的属性、 API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些属性。
- **阶段性属性值的读取操作。**如果需要，可以通过将 vm.$data 传入 JSON.parse(JSON.stringify(...)) 得到**深拷贝**的原始数据对象。

### 22. props

- props 可以是数组或对象，用于**接收来自父组件的数据**。
- props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。

- computed属性的值与data内的值都是可以传递给子组件的，通过props。

### 23. propsData

- 创建实例时传递 props。主要作用是方便测试。
- 应该实际的生产环境中不会用到。

### 24. computed

- 计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
- 计算属性的结果会被缓存，除非**依赖的响应式属性变化**才会重新计算。注意，如果**实例范畴之外**的依赖 (比如非响应式的 not reactive) 是不会触发计算属性更新的。
- 是不是就是依赖外部的变量就不会触发更新？

#### 应用场景
- 依赖多变量的结果展示，依赖的变量改变的时候，computed的变量会自动计算。
- 就是需要根据已有的变量计算之后再使用的位置需要计算属性。

#### 区别于watch
computed的结果会缓存，计算属性只有在它的相关依赖发生变化时才会重新计算求值。

### 25. methods

- methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。
- 方法中的 this 自动绑定为 Vue 实例。

### 26. watch

- 一个对象，键是需要观察的表达式，值是对应回调函数。(观察者模式，省去了主动调用的步骤)，值也可以是方法名，或者包含选项的对象。
- Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。
- 深度watch，有什么用？，直接就可以添加回调啊。添加多个方法吗？

## 四、选项/DOM
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
## 五、选项/生命周期钩子

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
- 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted。
- dom节点已经插入到页面内了。


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

## 六、选项/资源

### 42. directives（指令）

包含 Vue 实例可用指令的哈希表。

可以添加自定义指令。

### 43 filters（过滤器）

包含 Vue 实例可用过滤器的哈希表。

### 44. components（组件）

包含 Vue 实例可用组件的哈希表。

## 七、选项/杂项

### 45. parent

指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中。

> 同时使用 $parent 和 $children 有冲突 - 他们作为同一个入口 。更推荐用 props 和 events 实现父子组件通信。

### 46. mixins（扩展属性）

mixins 选项接受一个混合对象的数组。这些混合实例对象可以像正常的实例对象一样包含选项,他们将在 Vue.extend() 里最终选择使用相同的选项合并逻辑合并。

Mixin钩子按照传入顺序依次调用,并在调用组件自身的钩子**之前**被调用。

相当于一个公用函数的提取。

一个对外开发的扩展接口，组件会调用Vue.extend(),方法来添加到实例中。

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


## 八、选项/其它

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


## 九、实例属性

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

## 十、实例方法/数据

### 68. vm.$watch

- 观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。

- 之后取消观察 unwatch()

#### 选项

- deep
  为了发现对象内部值的变化，可以在选项参数中指定 deep: true 。注意监听数组的变动不需要这么做。
- immediate
  在选项参数中指定 immediate: true 将立即以表达式的当前值触发回调。（这个时候不拿到变动后的值）



### 69. vm.$set

这是全局 Vue.set 的别名。


### 70. vm.$delete

这是全局 Vue.delete 的别名。

## 十一、实例方法/事件

### 71. vm.$on(event, callback),(自定义事件监听回调函数)

监听当前实例上的**自定义事件**。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。
```
vm.$on('test', function (msg) {
  console.log(msg)
})
// 用于触发当前组件的时间，或者父实例定义的事件（回调）
vm.$emit('test', 'hi')
// => "hi"
```
父组件是使用 props 传递数据给子组件，但如果子组件要把数据传递回去，应该怎样做？那就是自定义事件！

父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。然后再对应子组件方法执行处触发事件，两者缺一不可。

### 72. vm.$once

监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。

### 73. vm.$off

移除自定义事件监听器。

1. 如果没有提供参数，则移除所有的事件监听器；

2. 如果只提供了事件，则移除该事件所有的监听器；

3. 如果同时提供了事件与回调，则只移除这个回调的监听器。

### 74. vm.$emit（运行一下函数）,（自定义事件触发）

触发当前实例上（包括父实例上的）的事件。附加参数都会传给监听器回调（$on）。

```
<!-- 父组件 -->
<div id="app">
  <!-- 子组件 -->
  <!-- 父组件直接用 v-on 来监听子组件触发的事件。 -->
  <!-- 需跟子组件中的$emit组合使用 -->
  <mycon v-on:son_method="father_method"></mycon>
</div>

// 父组件
new Vue({
  el: "#app",
  methods: {
    father_method: function () {
      console.log("father");
    }
  }
});

// 子组件
Vue.component('mycon', {
  template: '<button v-on:click="son_method">子按钮</button>',
  methods: {
  	// 按钮点击时候触发事件
    son_method: function () {
      this.counter += 1;
 	  console.log("son");
      // 这句话来触发事件
      // 必须跟模板中的v-on配合使用,抛出动作
      this.$emit('son_method');
    }
  },
});

```


## 十二、实例方法/生命周期(这里是主动调用的方法)

### 75. vm.$mount

如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。

如果没有提供 elementOrSelector 参数，模板将被渲染为**文档之外的的元素**，并且你必须使用原生DOM API把它插入文档中。

这个方法返回实例自身，因而可以链式调用其它实例方法。
```
var MyComponent = Vue.extend({
  template: '<div>Hello!</div>'
})

// 创建并挂载到 #app (会替换 #app)
new MyComponent().$mount('#app')

// 同上
new MyComponent({ el: '#app' })

// 或者，在文档之外渲染并且随后挂载
var component = new MyComponent().$mount()
document.getElementById('app').appendChild(component.$el)
```

### 76. vm.$forceUpdate

迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

### 77. vm.$nextTick（dom更新之后立即触发）

将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

- 这个与生命周期的updeted有什么异同？
- 实例方法的生命周期 与 选项生命周期 有什么异同？

### 78. vm.$destory

完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。

触发 beforeDestroy 和 destroyed 的钩子。

在大多数场景中你不应该调用这个方法。最好使用 v-if 和 v-for 指令以数据驱动的方式控制子组件的生命周期

## 十三、指令（多用于更新元素，直接操作html）

**自定义指令**
在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

官方文档说明：https://cn.vuejs.org/v2/guide/custom-directive.html

响应的自定义指令也是有生命周期的。

### 79. v-text

更新元素的 textContent。如果要更新部分的 textContent ，需要使用 {{ Mustache }} 插值。

```
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```
### 80. v-html

更新元素的 innerHTML 。注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译 。
如果试图使用 v-html 组合模板，可以重新考虑是否通过使用组件来替代。

在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，永不用在用户提交的内容上。

### 81. v-show

根据表达式的 truthy 和 falsy 值，切换元素的 display CSS 属性。(切换css显隐属性，区别于v-if实例的生成与销毁)

当条件变化时该指令触发过渡效果。

#### 对比v-if的选择

通常来说，v-if 在切换时有更高的性能开销，而 v-show 在初始渲染时有更高的性能开销。
因此，如果需要频繁切换，推荐使用 v-show，如果条件在运行时改变的可能性较少，推荐使用 v-if。

### 82. v-if

根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 <template> ，将提出它的内容作为条件块。

当条件变化时该指令触发过渡效果。

### 83. v-else

为 v-if 或者 v-else-if 添加 “else 块”。

### 84. v-else-if

### 85. v-for

基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 alias in expression ，为当前遍历的元素提供别名。
官方文档地址：https://vuefe.cn/v2/api/#v-for

v-for 默认行为试着不改变整体，而是替换元素。迫使其重新排序的元素,你需要提供一个 key 的特殊属性。

### 86. v-on（@，事件绑定操作）

官方文档地址：https://vuefe.cn/v2/api/#v-on

change事件 -> input事件

### 87. v-bind（:，属性绑定）

动态地绑定一个或多个特性，或一个组件 prop 到表达式。

绑定style的处理：
```
:style="{width:listwidth,padding:listpadding}" 

<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }"
</div>
```
### 88. v-model

官方文档地址：https://vuefe.cn/v2/api/#v-model
在表单控件或者组件上创建双向绑定。

```
修饰符：
.lazy - 取代 input 监听 change 事件
.number - 输入字符串转为数字
.trim - 输入首尾空格过滤
```

```
在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。
你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步：
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

### 89. v-pre

跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。


### 90. v-cloak

这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
**不会显示，直到编译结束。**（可以把一些复杂的节点变化的样式先隐藏起来）

### 91. v-once

控制之渲染一次的属性。
只渲染元素和组件一次。随后的重新渲染,元素/组件及其所有的子节点将**被视为静态内容并跳过**。这可以用于优化更新性能。

## 十四、特殊属性

### 92. key

key 的特殊属性主要用在 Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes。

如果不使用key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。

使用key，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素。

有相同父元素的子元素必须有独特的key。重复的key会造成渲染错误。

为了便于 Vue 跟踪每个节点的身份，从而重新复用(reuse)和重新排序(reorder)现有元素，你需要为每项提供唯一的 key 属性，从而给 Vue 一个提示。

### 93. ref（与react类似）

ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。

如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例:

### 94. slot（插口）

用于标记往哪个slot中插入**子组件内容**。

官方参考地址：https://vuefe.cn/v2/guide/components.html#使用-slot-分发内容-Content-Distribution-with-Slots

为了能够使合成组件正常运行，我们需要一种组织方式，将父组件的“内容”和子组件自身的模板掺杂在一起。这个过程被称为内容分发(content distribution)。

<slot> 元素有一个特殊的 name 属性，可以用于深度定制如何分发内容。可以给多个 slot 分配不同的名字。一个具有名称的 slot，会匹配内容片段中有对应 slot 属性的元素。

slot位置插入的元素就是组件调用的时候内部嵌入的元素或者router-view（这个时候就可以分离router-link与router-view）。

```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

父组件模板：

<app-layout>
  <h1 slot="header">这里可能是一个页面标题</h1>
  <!--不说明slot的就放在没有名的slot-->
  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>

  <p slot="footer">这里是一些联系信息</p>
</app-layout>

渲染结果：

<div class="container">
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里是一些联系信息</p>
  </footer>
</div>
```
**在设计如何将组件组合在一起时，内容分发 API 是极其有用的机制。**


### 95. slot-scope（2.5+）

### 96. scope（css编译块控制）

### 97. is（与v-if有什么区别）

用于动态组件且基于 DOM 模板解析注意事项来工作。

## 十五、内置组件

### 98. component

渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。

### 99. transition(可设置的样式很多)

官方文档地址：https://vuefe.cn/v2/api/#transition
<transition> 元素作为单个元素/组件的过渡效果。<transition> 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在检测过的组件层级中。
#### 属性设置
name: name - string, 用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 "v"

### 100. transition-group

官方文档地址：https://vuefe.cn/v2/api/#transition-group
<transition-group> 元素作为多个元素/组件的过渡效果。<transition-group> 渲染一个**真实的DOM元素**。默认渲染 <span>，可以通过 tag 属性配置哪个元素应该被渲染。

### 101. keep-alive

<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

### 102. slot

<slot> 元素作为组件模板之中的内容分发插槽。 <slot> 元素自身将被替换。

