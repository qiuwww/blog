
# Vue常见的操作

## 1. 事件处理相关v-on
官网说明地址：https://vuefe.cn/v2/api/#v-on

添加事件 v-on:click简写： v-on = @

回调函数选项写在methods（选项，是一个对象）下边

#### 回调函数：
1. 在子组件的methods内定义；
2. 或者由父组件传递过来的，这样就可以把子组件的参数改变传递给父组件，类似于mobx的操作（使用$.parent来引用）；
3. 内联写法，直接调用组件的参数来操作（参数都定义在data内），实现自己的需求。


用在**普通元素**上时，只能监听 原生 DOM 事件。

用在**自定义元素组件**上时，也可以监听子组件触发的自定义事件。

### 事件处理
官网说明地址：https://vuefe.cn/v2/guide/events.html
传递当前的dom节点到事件处理函数中，在对应参数位置**添加$event参数**；

```
<!-- 内联语句 -->
<my-component @my-event="handleThis(123, $event)"></my-component>
这里括号中的参数就相当于react中的.bind(this, arg1, arg2);
```




#### 修饰符的使用（一些常用事件操作都可以使用修饰符来替代）

https://vuefe.cn/v2/guide/events.html#事件修饰符-Event-Modifiers

- 事件修饰器
- 按键修饰器
- 系统辅助按键


使用修饰符时的**顺序**会产生一些影响。

注意区分dom事件与组件事件（自定义事件）


#### 使用 v-on 有几个好处：
1. 通过浏览 HTML 模板，就能很方便地找到在 JavaScript 代码里对应的处理函数。
2. 由于无须在 JavaScript 里手动绑定事件，你的 **ViewModel 代码可以是非常纯粹的逻辑（排除异步操作什么的？）**，并且和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，**所有的事件监听器都会被自动删除**。你无须担心如何自己清理它们。


#### 模拟触发事件

**方式一（分发实践，通过别的函数来触发）**

在组件中，可以使用 `$emit`, `$on`, `$off` 分别来分发、监听、取消监听事件。

**`$emit`, `$on`, `$off`**

官方文档介绍： https://vuefe.cn/v2/api/#实例方法-事件

**方式二（与原生dom操作类似，明显更低级一点）**

```
methods:  {
    handleBtnClick: function(){
        document.getElementById("text").click();
    },
    handleTextClick: function(){
        alert("hello");
    }
}
```

## 2. 子组件调用父组件的方法

**涉及到组件之间的通信的问题。组件之间的通信可以分为以下几种：**

1. 父子组件传递，**父向子传递采用prop**s；

   ```
   //parent.vue
   <parent>
     <child :foo="foo"><child>
   </parent>
   //child.vue
   <button @click="foo">调用<button>
   ```

   也就是说 **props 用来传数据**，子组件调用父组件方法使用事件，网络请求等比较大的事情走 vuex，小事情还是通过 props 和 emit 等操作来进行处理。

   **props是用来传输数据的，而且是单向数据流，所以不能用来向父组件调用方法。**

   ​

   vuex主要是用来管理一些全局的变量或者事件，父子组件之间的通信就来用到全局事件，有点大材小用了。

   在上面给出的例子中，可以看见在**子组件中使用$emit来触发父组件中绑定的事件**。

   1. 用`$emit`（抛出）向父组件触发一个事件，父组件监听这个事件就行了。
   2. **直接用`this.$parent.xxxx`这样直接调用父组件的方法。不需要通过props（属性传递）来传递。**
      $parent, 父实例

2. 子向父采用事件emit。

   ```
   <template id="">
       <Child @refreshList="onRefresList"></Child>
   </template>

   <script>
       export default {
           data () {
               return {
                   
               };
           },
           components: {
               Child
           },
           mounted() {},
           methods: {
               onRefresList () {
                   
               }
           },
           computed: {},
           watch: {}
       };
   </script>

   Child.vue
   this.$emit('refreshList');
   ```

3. 非父子组件的传递，全局Event bus，new一个vue的实例，采用事件的方式通信，**再者采用vuex全局状态管理**。




## 3. 组件自身的参数都定义在data内

#### 对比于react中的state？还是相当于constructor中定义的属性值。





## 4. 组件的props属性
官方说明文档： https://vuefe.cn/v2/guide/components.html#Props

每个组件实例都有自己的**孤立隔离作用域**。也就是说，不能（也不应该）直接在子组件模板中引用父组件数据。

**要想在子组件模板中引用父组件数据，可以使用 props 将数据向下传递到子组件。**

属性传递的时候，在父组件内的属性需要使用**中划线**来连接（**HTML 属性会忽略大小写(case-insensitive)**），**子组件使用的时候要对应的转为驼峰式**。

```
Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
<!-- HTML 中的串联式命名 -->
<child my-message="hello!"></child>
```

### 动态props

使用 `v-bind` 将 props 属性**动态地绑定到父组件中的数据**。无论父组件何时更新数据，都可以**将数据向下流入到子组件中**。

```
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
还可以使用 v-bind 简写语法，通常看起来更简洁：
<child :my-message="parentMsg"></child>
```

如果你想要将一个对象中的所有属性都作为 props 传递，可以使用不带参数的 `v-bind`（将 `v-bind:prop-name` 替换为 `v-bind`）。

```
<todo-item v-bind="todo"></todo-item>
等同如下：
<todo-item
  v-bind:text="todo.text"
  v-bind:is-complete="todo.isComplete"
></todo-item>
```

#### 字面量传值 vs. 动态传值(Literal vs. Dynamic)

```
<!-- 这会向下传递一个普通字符串 "1" -->
<comp some-prop="1"></comp>

<!-- 这会向下传递一个真正的数值 -->
<comp v-bind:some-prop="1"></comp>
```

### 单向数据流(One-Way Data Flow)

官方文档位置： https://vuefe.cn/v2/guide/components.html#单向数据流-One-Way-Data-Flow

所有的 props 都是在子组件属性和父组件属性之间绑定的，按照**自上而下单向流动**方式构成：**当父组件属性更新，数据就会向下流动到子组件，但是反过来却并非如此。**

这种机制可以防止子组件意外地修改了父组件的状态**，会造成应用程序的数据流动变得难于理解**。

**每次父组件更新时，子组件中所有的 props 都会更新为最新值。**

在 JavaScript 中对象和数组会作为**引用类型传入**，因此，如果 prop 是一个对象或数组，在子组件内部修改对象或数组自身，**将会影响**父组件的状态。





## 5. 计算属性computed（基本就是mobx的computed所要进行的操作了，可set，可get）

官方文档说明：https://vuefe.cn/v2/guide/computed.html

计算属性将被**混入到 Vue 实例**中。**所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例**。

**计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。（区别于函数获取值的操作）**注意，如果实例范畴之外的依赖 (比如非响应式的 not reactive) 是**不会**触发计算属性更新的。

- **计算属性不可以与data中定义的属性相同**，data中定义的属性可以通过函method（或者其他）来改变，computed中的属性，会依据data中参数的改变而自动改变

```
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 只获取，值为函数
    // 键值对的属性，值同data，只能使用function return
    aDouble: function () {
      return this.a * 2
    },
    // 获取和设置
    // 值为对象
    aPlus: {
      // 需要获取aPlus的值，对用获取值的操作
      get: function () {
        return this.a + 1
      },
      // 对应赋值操作
      // computed 属性默认只设置 getter 函数，不过在需要时，还可以提供 setter 函数。
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3
vm.a       // => 2
vm.aDouble // => 4
```

#### 关联template操作

https://vuefe.cn/v2/guide/computed.html#基础示例

利用已有的变量来生成一个新的变量，前一个变量改变的时候会更新后一个变量的值。与mobx的computed操作基本类似。



#### 对比method的方法，优点就是会缓存起来相应不改变的值，不用每次重新计算。computed可以实现的，method也都可以实现。

如果computed依赖的参数不改变的时候，computed的结果会被缓存起来。

#### https://vuefe.cn/v2/guide/computed.html#computed-属性和-watch-属性（命令式）

这里的watch属性类似于mobx的autorun方法，当依赖的参数有改变的时候就去**做一些事情**，自动执行的函数。

**过度滥用 watch 属性会造成一些问题，什么问题？**

这个时候在一个watch的变量改变另一个变量，就可能造成相互调用，可能会溢出。

## 6. 表单输入绑定

你可以用 `v-model` 指令在表单 `<input>` 及 `<textarea>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。





## 7. 创建数据双向绑定v-model



 ```
// 表单输入
<input v-model="message" placeholder="edit me">
// 标签显示
<p>Message is: {{ message }}</p>
// 组件的状态声明
data() {
    return {
        message: 'defaultValue'
    }
}
 ```





## 8. 生命周期

#### 1. beforeCreate（应该是在react组件的componentWillMount这个阶段，或者就相当于constructor）

在**实例初始化之后**，立即**同步调用**，在数据观察(data observer)和 event/watcher 配置之前被调用。（这个时候应该参数也没拿到）

#### 2. created（js对象已生成，绑定dom节点的事还没做，这个时候可以用来请求数据，修改初始值）（应该是在react组件的componentWillMount这个阶段）

```
created: function () { 
	console.log(2) 
},
```

**实例已经创建完成之后被调用。**在这一步，实例已完成以下的配置：**数据观测(data observer)，属性和方法的运算， watch/event 事件回调**。

然而，**挂载**阶段还没开始，`$el` 属性目前不可见。

#### 3. beforeMount（应该是在react组件的componentWillMount这个阶段）

在挂载开始之前被调用：**相关的 `render` 函数首次被调用**。

**该钩子在服务器端渲染期间不被调用。**

#### 4. mounted（应该相当于react组件的componentDidMount阶段，这个时候应该可以进行el操作）

在实例挂载之后调用，其中 `el` 被新创建的 `vm.$el` 替代。如果 root 实例挂载了一个文档内元素，当 `mounted` 被调用时 `vm.$el` 也在文档内。

**该钩子在服务器端渲染期间不被调用。**

#### 5. beforeUpdate

在 DOM 被 patch 之前调用数据修改。这是在 DOM 更新之前，访问已有 DOM 的最佳时机，例如，手动地移除之前添加的事件监听器。

**在服务器端渲染期间不会调用这个钩子函数，因为在服务器端只执行初始渲染。**

#### 6. updated

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

#### 7. activated

keep-alive 组件激活时调用。

#### 8. deactivated

keep-alive 组件停用时调用。

#### 9. beforeDestroy

实例销毁之前调用。在这一步，实例仍然完全可用。

#### 10. destroyed

Vue **实例**销毁后调用。调用后，Vue 实例指示的**所有东西都会解绑定**，**所有的事件监听器会被移除**，所有的**子实例**也会被销毁。

#### 11. errorCaptured

当任何一个来自后代组件的错误时被捕获时调用。此钩子函数会收到三个参数：错误对象、发生错误的组件实例，和一个包含错误在何处被捕获信息的字符串。此钩子函数可以返回 false，以阻止该错误继续向上冒泡。













## updated、watch、$nextTick 异同：

相同点：

都是数据发生变化后的钩子函数

不同：

update：所有数据的所有变化，如果做同一个的业务逻辑处理，在这里；
watch：监听具体数据的变化，并做相应处理。
$nextTick： 某个数据的某个变化，变化后立即更新DOM；











## 9. 遍历||插入数据到页面中（指令v-for：https://vuefe.cn/v2/api/?#v-for） （for...of）（for...in）

基于源数据（**数组类型**或者对象）多次渲染元素或模板块。此指令之值，必须使用特定语法 `alias in expression` ，为当前遍历的元素提供别名。

`v-for` 默认行为试着不改变整体，而是替换元素。**迫使其重新排序的元素,你需要提供一个 `key` 的特殊属性。**（与react的操作基本一致，不用显式的拼接结果）

```
<my-component v-for="item in items" :key="item.id"></my-component>
```



`v-for` 还支持可选的第二个参数，作为当前项的索引。

### 列表渲染

官方文档地址：https://vuefe.cn/v2/guide/list.html

#### 使用-v-for-遍历对象https://vuefe.cn/v2/guide/list.html

```
还可以提供第二个参数，作为对象的键名(key)：
<div v-for="(value, key) in object">
  {{ key }}: {{ value }}
</div>
```

在遍历一个对象时，是按照 `Object.keys()` 得出 key 的枚举顺序来遍历，**无法**保证在所有 JavaScript 引擎实现中完全一致。

**对象操作是无序的。属性同级**



## 10. 条件渲染（v-if）

根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 `<template>` ，将提出它的内容作为条件块。

### v-if || v-else-if || v-else

```
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  非 A/B/C
</div>
```

## 11. 属性绑定操作（v-bind）

### 绑定class属性

官方文档说明：https://cn.vuejs.org/v2/guide/class-and-style.html#绑定-HTML-Class

**使用对象语法**

```
我们可以传给 v-bind:class 一个对象，以动态地切换 class：
<div v-bind:class="{ active: isActive }"></div>
上面的语法表示 active 这个 class 存在与否将取决于数据属性 isActive 的 truthiness。
```

确定的class可以直接使用class属性来添加上去，v-bind:class会添加到classList中。

###  绑定内联样式

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```



## 12. watch

watch是变量改变的时候需要执行的回调，就是观察模式的观察者。

```
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 字符串方法名
    b: 'someMethod',
    // 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 回调函数会将在观察(data observer)开始后立即被调用
    d: {
      handler: function (val, oldVal) { /* ... */ },
      immediate: true
    },
    e: [
      function handle1 (val, oldVal) { /* ... */ },
      function handle2 (val, oldVal) { /* ... */ }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
```

