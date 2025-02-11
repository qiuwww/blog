<template>
  <!--  <div id="app" :style="{height: height, width: '100%',position:'absolute','box-sizing': 'border-box'}">-->
  <!--    <olmap />-->
  <!--  </div>  -->

  <div id="app" style="height: calc(100% - 64px); width: 100%;position:absolute;box-sizing: border-box;">
    <olmap/>
  </div>
</template>

<script>
    import olmap from "./emergencyMap.vue";

    export default {
        name: "app",
        data() {
            return {
                height: 1000
            };
        },
        components: {
            olmap,
        },
        created() {

        },
        mounted() {
            this.height = Math.floor(document.body.scrollHeight - 64) + "px";
        }
    };
</script>
