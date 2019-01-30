<template>
  <div class="test">
    <!-- 缩写语法 -->
    <input @keyup.enter="enterHandler">
    <!-- 同上 -->
    <input v-on:keyup.enter="enterHandler">
    <!-- shift + Click -->
    <div @click.shift="doSomething">Do something</div>
    <!-- 绑定多个事件测试 -->
    <button type="button" name="button" @click="a();b()">绑定多个事件测试</button>
    <br>
    <!-- 测试transition添加与不添加key -->
    <button @click.stop="nextTickHandler($event)">nextTickHandler</button>

    <transition>
      <span :key="text" ref="text">{{ text }}</span>
    </transition>
    <hello-world :msg="text" :fatherEvent="fatherEvent"></hello-world>

    <!-- 测试数组更改渲染页面 -->
    <ul>
      <li v-for="item in items" :key="item.key">
        {{ item.key }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from "vue-property-decorator";
  import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
  @Component({
    components: {
      HelloWorld
    }
  })
  export default class Test extends Vue {
    public text: string = 'text';
    items: array = [{
      key: 1
    }, {
      key: 2
    }, {
      key: 3
    }];
    constructor() {
      super();
    }
    mounted(): void {
      setTimeout(() => {
        // this.text = 'mounted';
        // this.items.push({
        //   key: 4
        // });
        this.$emit('test', 123);
      }, 2000);

      this.$on('test', function(msg) {
        console.log(msg)
      })
      // 用于触发当前组件的时间，或者父实例定义的事件（回调）
      this.$emit('test', 'hi')
      // => "hi"
    }
    // 组件方法也可以直接声明为实例的方法
    enterHandler(): void { // 回车事件
      console.log("enterHandler emit");
    }
    doSomething(): void {
      console.log("shift + Click emit");
    }
    a(): void {
      console.log('a');
    }
    b(): void {
      console.log('b');
    }
    nextTickHandler($event): void {
      console.log("$event:", $event);
      // 修改数据
      this.text = 'changed';
      console.log(this.$refs.text);
      debugger
      // DOM 还没有更新
      this.$nextTick(function() {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        console.log(this.$refs.text);
      })
    }
    fatherEvent(): void {
      console.log("fatherEvent is emit: ", this);
    }
  }
</script>
