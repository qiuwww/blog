

## vue全局组件

### 1、需要入口文件定义安装对象index.js

```
import MyLoading from './Loading.vue'
// 这里是重点
const Loading = {
    install: function(Vue){
        Vue.component('Loading',MyLoading)
    }
}

// 导出组件
export default Loading
```

### 2、定义组件MyLoading

```
<!-- 这里和普通组件的书写一样 -->
<template>
    <div class="loading">
        loading...
    </div>
</template>
```

### 3、使用组件

```
<template>
  <div id="app">
  <!-- 使用element ui的组件 -->
  <el-button>默认按钮</el-button>

  <!-- 使用自定义组件 -->
  <Loading></Loading>
  </div>
</template>
```



