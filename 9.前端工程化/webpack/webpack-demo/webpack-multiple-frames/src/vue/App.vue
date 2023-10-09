<template>
  <div class="vue">
    <h2>Vue</h2>
    <ul class="list">
      <li v-for="(item, index) in list" :key="index">
        {{ index }}
      </li>
    </ul>

    <div class="input">
      <input type="text" :value="inputValue" @blur="inputChange" placeholder="vue修改数据源" />
    </div>
  </div>
</template>


<script lang="js">
import Vue from 'vue';

import { toRaw } from '@vue/reactivity';

export default ({
  data() {
    return {
      list: Array.from({length: 6}),
      inputValue: ''
    }
  },

  mounted() {
    window.eventEmitter.on('list', (list) => {
      // some code...
      this.list = list;
      this.$forceUpdate();
    });
  },

  methods: {
    inputChange() {
      this.list.push(this.inputValue)
      // 通知别的地方
      window.eventEmitter.emit('list', toRaw(this.list))
    }
  }
})
</script>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
