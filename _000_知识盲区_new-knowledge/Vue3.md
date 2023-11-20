# Vue3 的一些问题

## vue2 到 vue3

1. v-model API API 在 Vue 3 上发生了一些变化。
   1. 首先，属性 value 已重命名为 modelValue；
   2. 很酷的事情是现在可以有多个 v-model 自定义值。例如 v-model:valueA, v-model:valueB，但是用途不大吧；

```js
import { onMounted, ref, onUnmounted } from 'vue';
```

1. `<script setup>`
   1. **它是 Vue3 的一个新语法糖，在 setup 函数中。**所有 ES 模块导出都被认为是暴露给上下文的值，并包含在 setup() 返回对象中。**相对于之前的写法，使用后，语法也变得更简单**。
   2. 使用方式极其简单，仅需要在 script 标签加上 setup 关键字即可。
   3. `setup(props, context)` => `setup(props, { attrs, slots, emit, expose })`；
      1. 和 props 不同，**attrs 和 slots 的属性都不是响应式的**。如果你想要基于 attrs 或 slots 的改变来执行副作用，**那么你应该在 onBeforeUpdate 生命周期钩子**中编写相关逻辑。
   4. **~~这里可以理解为全部包裹在了 setup 里边，相当于 jq 的 ready 方法~~**；
      1. ~~不需要别的内容了~~；
2. [ref](https://cn.vuejs.org/api/reactivity-core.html#ref)；
   1. 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。
   2. 需要将某个 prop 传到一个外部函数中并保持响应性，那么你可以使用 toRefs() 和 toRef() 这两个工具函数；
   3. 引用 dom，与这里的 ref 是相同的使用；
3. reactive()：
   1. 返回一个对象的响应式代理。
   2. 这里使用和 ref 一样，内部会自动的选择是使用 ref 还是 reactive；
4. **props 不能直接作为 v-model 的值**；
5. 使用 props/store 计算值，使用 computed 来计算；
   1. vue3 里边不会有过滤器了，都改用了 computed，后边详细说明；

## Vue3 的 script setup 语法糖

1. 在 script setup 中，引入的组件可以直接使用，无需再通过 components 进行注册，并且无法指定当前组件的名字，它会自动以文件名为主，也就是不用再写 name 属性了。
   1. 如果需要定义类似 name 的属性，**可以再加个平级的 script 标签，在里面实现即可**。
2. 通过**defineProps 指定当前 props 类型**，获得上下文的 props 对象。
3. 使用**defineEmit 定义当前组件含有的事件**，并通过返回的上下文去执行 emit。
4. slot: `import { useAttrs, useSlots } from 'vue';const slots = useSlots()`；
5. attr：`const attrs = useAttrs()`；
6. 如果需要**对外暴露 setup 中的数据和方法**，需要使用 defineExpose API。
   1. 传统的写法，我们可以在父组件中，通过 ref 实例的方式去访问子组件的内容，但在 script setup 中，该方法就不能用了，setup 相当于是一个闭包，除了内部的 template 模板，谁都不能访问内部的数据和方法。
   ```vue
   <script setup>
   import { defineExpose } from 'vue';
   const a = 1;
   const b = 2;
   defineExpose({
     a,
   });
   </script>
   ```

## 一些常见操作

如 watch、computed、methods 等

### [watch](https://cn.vuejs.org/guide/essentials/watchers.html)

1. watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组。
2. 你不能直接侦听响应式对象的属性值。
3. 我们希望在创建侦听器时，立即执行一遍回调。 => 我们可以通过传入 immediate: true 选项来强制侦听器的回调立即执行。

```js
const showBackTome = ref(false);
watch(
  showBackTome,
  () => {
    mainStore.setIsOpenMiniMap(showBackTome.value);
  },
  {
    immediate: true,
  },
);

watch(
  // getter 函数
  () => props.modelValue,
  (newVal) => {
    value.value = newVal;
    resize(inputEl.value);
  },
);
```

#### [watchEffect](https://cn.vuejs.org/guide/essentials/watchers.html#watcheffect)

watchEffect() 允许我们自动跟踪回调的响应式依赖。

被检测仪参数的变化 => 发送请求 => 更新目标数据源。这个过程实时进行，一致执行；

对于有多个依赖项的侦听器来说，使用 watchEffect() 可以消除手动维护依赖列表的负担。

需要异步创建侦听器的情况很少，请尽可能选择同步创建。

### 使用 emit

```js
// 父组件设置
@close="isShowAddressAddEditModal = false"

// 子组件内触发
const emit = defineEmits(['close']);
const closeModal = () => emit('close');
```

### [computed](https://cn.vuejs.org/guide/essentials/computed.html)

计算属性值会基于其响应式依赖被缓存。

一个计算属性仅会在其响应式依赖更新时才重新计算。

```js
// 不带参数
const src = computed(() => {
  if (props.src) return props.src;
  if (props.type === 'black') {
    return config.pageLogo1;
  }
  if (props.type === 'white') {
    return config.pageLogo;
  }
  return config.logoIco;
});

// 带参数，等于filter
const dateFilter = computed(() => (value) => {
  return moment(Date.now()).format('YYYY-MM-DD');
});

// get与set

const firstName = ref('John');
const lastName = ref('Doe');

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ');
  },
});
```

### 组件销毁的生命周期

```js
onUnmounted(() => {});
```

## [组件 v-model](https://cn.vuejs.org/guide/components/v-model.html)

```vue
<!-- CustomInput.vue -->
<script setup>
// 接受属性与方法
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<!-- 使用 -->
<template>
  <CustomInput v-model="searchText" />
</template>
```

## 使用 vue 的 route 的参数

```js
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const spaceId = route.query.id as string;
```

## 一模一样的组件，就是不展示

```vue
<template>
  <LightUpModal v-if="isShowLightUpModal" @close="isShowLightUpModal = false" />
</template>

这里昨天，主要还是v-if控制变量的问题；
```

## ref，定义响应式简单数据和元素节点获取

在 vue3 中，定义响应式数据一般有两种方式：ref 和 reactive。

一般来说，我们使用 ref 来定义基本数据类型，使用 reactive 来定义复杂数据类型

```js
export type LotteryRecord = {
  prizeName: string;
  id: number;
  dbCreateTime: number;
};

// 处理数组可能更方便
const list: Ref<LotteryRecord[]> = ref([]);
const getList = () => {
  getBadgeList(route.query.id).then((res) => {
    list.value = res
  }
};
```

## reactive，用做定义数组或者 json 对象

<!-- https://blog.csdn.net/qq_58247332/article/details/127259618 -->

```js
// 处理数组
```

### [Vue 3 中数组响应式用 ref 还是 reactive](https://juejin.cn/post/7195059791826747448)

## toRefs

## 子组件接受 props 参数

```js

 import { defineProps } from 'vue'
const props = defineProps({
    arr: {
        type: Array,
        required: true
    }
})

console.log(props.arr) // [1,2,3,4,5]

// 作者：lrsoy_
// 链接：https://juejin.cn/post/7037013050804682788
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

export type PrizeType = {
  id: number;
  groupName: string; // 奖项名
  prizeName: string; // 名称
  prizeType: number; // 奖品类型:  101-线上邮寄; 20001-用户空间道具
  taskNum: string; // 任务号
};

// 引用类型的参数
// https://www.cnblogs.com/noah227/p/17171241.html
const props = defineProps({
  lotteryResult: {
    type: Object as () => PrizeType,
    required: true,
  },
});

```

## filter，过滤器

[vue3 不支持过滤器 filter 的问题（使用 computed 传值）](https://blog.csdn.net/weixin_39550080/article/details/119855640)

```js
<>{textSigh(value)}</>;

const textSigh = computed(() => {
  // value是计算属性执行后，再次执行return里面的函数时传的参数
  return (value: any) => {
    state.message = value + '解决vue3不支持过滤器filter的问题 ';
    return state.message;
  };
});

const dateFilter = computed(() => (value) => {
  return moment(Date.now()).format('YYYY-MM-DD');
});
```

## vue3 list scroll

### [ref](https://cn.vuejs.org/api/built-in-special-attributes.html#ref)

1. 一个问题，就是在 omMounted 里边获取不到动态的 ref 的 dom；
   1. 对于默认的静态就不需要；

```jsx
<div v-if="list.length" ref="listRef" class="list no-scroll infinite-scroll">

const listRef = ref(null);

setTimeout(() => {
  console.log('$$$$$', listRef);
  listRef.value.addEventListener('scroll', handleScroll);
}, 100);

// 直接可以获取到
<span ref="span"></span>
const span = ref(null);
```

```js
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = listRef.value; // 获取滚动高度和内容高度
  console.log('listRef.value', scrollTop, scrollHeight, clientHeight);

  if (scrollTop + clientHeight >= scrollHeight) {
    debugger;
  }
};

onMounted(() => {
  getListByPageNum();

  setTimeout(() => {
    console.log('$$$$$', listRef);
    listRef.value.addEventListener('scroll', handleScroll);
  }, 100);
});

onUnmounted(() => {
  document.querySelector('.infinite-scroll').removeEventListener('scroll', handleScroll);
});
```

## vue3 判断子组件是否更新完成

## deep

the >>> and /deep/ combinators have been deprecated. Use :deep() instead

## css

// 遮罩层模糊 // backdrop-filter: blur(5px);

// 渐变所有的属性 transition: 0.2s all linear;

:deep(.radio-group) {

## 设置 radio 的样式

```vue
<div class="option">
  <input type="radio" id="huey" name="drone" value="huey" checked />
  <label for="huey">Huey</label>
</div>

// css input { appearance: none; border-radius: 50%; width: 16px; height: 16px; background-image:
url(https://cdn.funtown.cn/custom/tmsc/%E5%9B%BE%E6%A0%87%2B%E6%8C%89%E9%92%AE/%E9%9B%A8%E5%A4%A9%E5%9B%BE%E6%A0%87.png);
background-size: 16px 16px; } input:checked { background-image:
url(https://cdn.funtown.cn/custom/tmsc/%E5%9B%BE%E6%A0%87%2B%E6%8C%89%E9%92%AE/%E7%A7%AF%E5%88%86.png); }
```

## v-for v-if 一起使用

```js
<template v-for="_item in item.options">
  <div v-if="_item.label" :key="_item.value" class="option">
    <input type="radio" id="huey" name="drone" value="huey" checked />
    <label for="huey">{{ _item.label }}</label>
  </div>
</template>
```

## useHooks

## 数组 model，在 vue3 下怎么处理

```js

v-model="answerListModel[index]"

const questionList = ref([]);
const answerListModel = ref(
  props.contentList.map((item: QaType) => {
    if (item.questionType === 0) {
      return '';
    } else {
      return [];
    }
  })
);
```

## ts 的 declare module

```ts
declare module 'vue-router' {
 interface RouteMeta {
```

## defineExpose

使用 <script setup> 的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定。

可以通过 defineExpose 编译器宏来显式指定在 <script setup> 组件中要暴露出去的属性.

## 封装带请求的 hook

```js

/**
 * 蚂蚁抽奖动效果,hook
 */
export const useLotteryAnimate = () => {
  const isAnimateModalShow = ref(false);
  const lotteryList = ref<
    {
      pic: string;
      text?: string;
      value: string;
      checkIndex?: number;
    }[]
  >([]);

  const getList = async () => {
    const list = await getLotteryMachinePrize(getUrlParam('id'), 20, '');

    // 按照九宫格的顺序排序
    const sortList = [0, 1, 2, 7, 3, -1, 6, 5, 4];

    const newSortList = list.map((item, index) => {
      return {
        pic: item.prizePic,
        text: item.prizeName,
        value: String(index),
        checkIndex: sortList[index],
      };
    });

    newSortList.splice(5, 0, {
      pic: 'https://cdn.funtown.cn/custom/mayi-cloud/lottery/LOGO.png',
      value: '5',
    });

    return newSortList;
  };

  onMounted(() => {
    getList().then((res) => {
      // 这里本质上还是使用ref的值驱动后边的参数变化，并不是一次性顺序执行的
      lotteryList.value = res;
    });
  });

  const centerIndex = computed(() => {
    return parseInt(String(lotteryList.value.length / 2));
  });
  const checkedIndex = ref(0);
  let fn: Function | null = null;
  const TotalRunTime = 4500;
  let speed = 100;
  let runTimes = 0;
  let totalTimes = 0;
  let fastTimes = 0;
  const getAddTime = () => {
    const calcTime = TotalRunTime - fastTimes * 100;
    let i = 0;
    let sum = 0;
    while (i <= totalTimes - fastTimes) {
      sum += i;
      i++;
    }
    console.log(calcTime / sum);
    return calcTime / sum;
  };
  const runAnimate = (value: string, callback: Function) => {
    if (fn) return;
    isAnimateModalShow.value = true;
    fn = callback;
    speed = 100;
    runTimes = 0;
    totalTimes = 0;
    fastTimes = 0;
    checkedIndex.value = 0;
    const data = lotteryList.value.find((item) => item.text === value);
    if (!data) return;
    fastTimes = (lotteryList.value.length - 1) * 3;
    totalTimes = (lotteryList.value.length - 1) * 4 + (data.checkIndex || 0);
    run();
  };
  const run = () => {
    nextTick(() => {
      setTimeout(() => {
        let newIndex = checkedIndex.value + 1;
        if (newIndex > lotteryList.value.length - 2) newIndex = 0;
        checkedIndex.value = newIndex;
        runTimes++;
        if (runTimes > fastTimes) {
          speed += getAddTime();
        }
        if (runTimes < totalTimes) {
          run();
        } else {
          fn?.();
          fn = null;
        }
      }, speed);
    });
  };
  return {
    lotteryList,
    centerIndex,
    checkedIndex,
    isAnimateModalShow,
    runAnimate,
  };
};

```

## vue3 中绑定多个 ref 对象

<https://blog.csdn.net/qq_34466367/article/details/129058835>

for 循环中，如果给每一个元素绑定一个特定的 ref 值（ref="xxx"），那么就要定义 N 多个变量来分别接受它们，显然不现实。

1、在 setup 中定义一个常量 xxxrefs 用来接受所有 for 循环设置 ref 的元素，ref 中必须要是空数组

const uploadRefs = ref([])

2、页面中 for 循环中必须要用 el = > {inputs[index] = el}绑定 input 元素的 ref 值（将所有的 ref 元素放到数组中）

:ref="el=>{uploadRefs[index]=el}"

3、JS 中，通过索引获取对应的 ref 元素 uploadRefs.value[index]

uploadRefs.value[val].xxxxx()

## less v-bind

```less
.c-video-set {
  width: 100%;
  min-height: calc(100vh - 48px);
  margin-top: 48px;
  border-radius: 0;
  background: v-bind(mainBgColor);
}
```

## 组件的 v-model

```js

将之前的 this.$emit('input') 修改为 this.$emit('update:modelValue') ，vue3 中将省略这一步骤

自定义组件上的 v-model 相当于传递了 modelValue prop 并接收抛出的 update:modelValue 事件：

<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

## 学习文档

### Vue3 新增特性

Vue3 中需要关注的一些新功能：

1. fragments
   1. 在 Vue3.x 中，组件现在支持有多个根节点。
2. Teleport
   1. Teleport 是一种能够将我们的模板移动到 DOM 中 Vue app 之外的其他位置的技术，就有点像哆啦 A 梦的“任意门”。
   2. Vue 2 doesn't support teleports, I recommend to use portal-vue component made for vue 2 。
3. composition
   1. composition Api，也就是组合式 API，通过这种形式，我们能够更加容易维护我们的代码，将相同功能的变量进行一个集中式的管理。
4. [createRenderer](https://cn.vuejs.org/api/custom-renderer.html#createrenderer)
   1. createRenderer
      1. 通过 createRenderer ，**我们能够构建自定义渲染器，我们能够将 vue 的开发模型扩展到其他平台**。
      2. 我们可以将其生成在 canvas 画布上。
5. 非兼容性变更：
   1. 组件上 v-model 用法已更改。

## vue3 中的 reactive 和 ref 的本质区别

1. ref 用作简单的数据类型；
   1. 你可以通过 ref 定义复杂数据类型；
2. reactive 用作复杂的类型，如数组或者对象；
   1. reactive 也可以存基本数据类型；
   2. 不需要像 ref 那样使用 .value 来访问对象，可以直接访问对象的属性。
   3. **reactive 的解构会导致失去响应性**，除非使用 toRefs 函数；
3. 从源码的角度来说 ref 本身会判断是否为基本数据类型：
   1. 如果是则是 defineProperty 实现的，如果是**复杂数据类型**就会按照 reactive 进行处理；
      1. 针对不同的数据类型会进行操作，**当你 ref 为对象时**会转换 reactive 对象，将代理的对象返回给 \_value 对象；
      2. 如果是基本数据则会判断是否需要浅层复制，不需要则直接返回了。
   2. **而 reactive 这边也会判断是不是基本数据类型**是的话就直接返回，否则就直接将对象进行了代理并返回。

也就是说本质上没什么区别，简单类型都是走的 ref，复杂类型就是走 reactive；

## [vite 的环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html)

1. 根据 Vite 的约定规则，只有以“VITE\_”开头的变量才会在客户端被捕获，捕获方式为：import.meta.env.{参数名}。
2. 多环境配置的文件，基于 dotenv：
   1. .env # 所有情况下都会加载
   2. .env.local # 所有情况下都会加载，但会被 git 忽略
   3. .env.[mode] # 只在指定模式下加载
   4. .env.[mode].local # 只在指定模式下加载，但会被 git 忽略
