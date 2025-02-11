<template>
  <div class="mainMapStyle">
    <web-map/>
  </div>
</template>

<script>
    import webMap from "./arcgismap.vue";

    export default {
        name: "appgismap",
        data() {
            return {};
        },
        components: {
            webMap,
        }
    };
</script>

<style>
  .mainMapStyle {
    position: absolute;
    height: calc(100% - 64px);
    width: 100%;
  }
  /*去除mapview拖动时的边框*/
  .esri-view .esri-view-surface--inset-outline:focus::after {
    outline: auto 0px Highlight !important;
    outline: auto 0px -webkit-focus-ring-color !important;
  }
</style>
