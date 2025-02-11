<template>
  <div id="appgismap" class="appgisstyle">
    <olmap />
  </div>
</template>

<script>
import olmap from "./map.vue";
export default {
  name: "appgismap",
  data() {
    return {
    };
  },
  components: {
    olmap,     
  }
};
</script>

<style>
.appgisstyle{
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>