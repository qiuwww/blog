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
- 计算属性的结果会被缓存，除非**依赖的响应式属性变化**才会重新计算。注意，如果**实例范畴之外**的依赖 (比如非响应式的 not reactive) 是不会触发计算属性更新的。是不是就是依赖外部的变量就不会触发更新？

### 25. methods

- methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。
- 方法中的 this 自动绑定为 Vue 实例。

### 26. watch

- 一个对象，键是需要观察的表达式，值是对应回调函数。(观察者模式，省去了主动调用的步骤)，值也可以是方法名，或者包含选项的对象。
- Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。
- 深度watch，有什么用？，直接就可以添加回调啊。添加多个方法吗？






