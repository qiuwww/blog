<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min" @click="click">
        <Icon custom="i-icon i-icon-full-screen" v-show="!isFullscreen" />
        <Icon custom="i-icon i-icon-exit-full-screen" v-show="isFullscreen" />
    </span>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import screenfull from 'screenfull'
    export default {
        name: 'iHeaderFullscreen',
		data() {
          return {
            isFullscreen: false
              }
        },
        mounted() {
          this.init()
        },
        beforeDestroy() {
          this.destroy()
        },
        methods: {
          click() {
         if (!screenfull.enabled) {
          this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
        }
        screenfull.toggle()
       },
      change() {
        this.isFullscreen = screenfull.isFullscreen
       },
      init() {
       if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
      },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>      
