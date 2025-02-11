<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <div>
          <keep-alive>
              <router-view v-if="!$route.meta.noCache"></router-view>
          </keep-alive>
          <router-view v-if="$route.meta.noCache"></router-view>
      </div>
    </transition>
    <div v-if="$store.state.settings.showFooter" id="el-main-footer">
      技术支持：泸州市城投智慧科技发展有限责任公司
    </div>
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
      return this.$route.path;
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
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
