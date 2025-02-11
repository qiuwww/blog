<template>
  <section class="app" style="top:0;">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  width: calc(100% - 20px) ;
  min-width: 1130px;
  box-sizing: border-box;
  // padding-left: 10px;
  // padding-right: 20px;
  // padding-bottom: 20px;
  margin-left:10px;
  overflow: hidden;
  border-radius: 12px;
}

.fixed-header+.app {
  padding-top: 50px;
}

.hasTagsView {
  .app {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px); 
    // min-width: ;
  }

  .fixed-header+.app {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
