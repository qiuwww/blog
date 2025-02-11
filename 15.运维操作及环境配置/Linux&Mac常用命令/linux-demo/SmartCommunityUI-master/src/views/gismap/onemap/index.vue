<template>
  <div id="apponemap" class="appstyle">
    <olmap />
  </div>
</template>

<script>
import olmap from './map.vue'
export default {
  name: 'Apponemap',
  components: {
    olmap
  },
  data() {
    return {
    }
  }
}
</script>

<style >
.appstyle{
  position: absolute;
  overflow: hidden;
  height:  calc(100% - 0px);
  width: 100%;
  top: 0px;
}
</style>
