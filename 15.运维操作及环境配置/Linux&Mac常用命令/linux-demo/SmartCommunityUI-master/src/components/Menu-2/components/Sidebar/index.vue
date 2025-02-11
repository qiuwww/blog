<template>
  <div class="wid">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      background-color="#ffffff"
      text-color="#000"
      :unique-opened="false"
      active-text-color="#000"
      :collapse-transition="false"
    >
      <sidebar-item
        v-for="route in arr"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },

  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    arr() {
      let arr = []
      const theRouterPath = this.$route.path.split('/').map(i => `/${i}`)
      theRouterPath.shift()

      this.permission_routes.forEach(element => {
        if (theRouterPath.includes(element.path)) {
          arr = element.children[0].children
          // arr.push(element);
        }
      })
      return arr
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return false
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style  scoped>
  .wid{
    width: 220px;
  }
  .el-menu-item span{
    font-size: 14px!important;
  }
</style>
