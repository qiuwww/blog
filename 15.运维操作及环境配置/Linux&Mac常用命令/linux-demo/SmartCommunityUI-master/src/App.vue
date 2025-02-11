<template>
  <div id="app">
    <transition :key="key">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
    computed: {
        key() {
            return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date();
        }
    }
}
</script>
