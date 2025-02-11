<template>
  <div id="app" class="appstyle">
    <olmap />
  </div>
</template>

<script>
import olmap from './map.vue'
export default {
  name: 'App',
  components: {
    olmap
  },
  data() {
    return {
    }
  }
}
</script>

<style>
.appstyle{
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
