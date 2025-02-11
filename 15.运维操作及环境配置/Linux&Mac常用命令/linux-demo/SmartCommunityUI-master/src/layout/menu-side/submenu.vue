<template>
    <Submenu :name="menu.path" v-if="!menu.hidden ">
        <template slot="title">
            <i-menu-side-title :menu="menu" />
        </template>
        <template v-for="(item, index) in menu.children">
            <i-menu-side-item v-if="item.children === undefined || !item.children.length" :menu="item" :key="index" :base-path="basePath"/>
            <i-menu-side-submenu v-else :menu="item" :key="index" :base-path="basePath"/>
        </template>
    </Submenu>
</template>
<script>
    import iMenuSideItem from './menu-item';
    import iMenuSideTitle from './menu-title';
    import { isExternal } from '@/utils/validate';
    import path from 'path';
    export default {
        name: 'iMenuSideSubmenu',
        components: { iMenuSideItem, iMenuSideTitle },
        props: {
            menu: {
                type: Object,
                default () {
                    return {}
                }
            },
            basePath: {
              type: String,
              default: ''
             }
        },
  data() {
    this.onlyOneChild = null
    return {}
  },     
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
    }
</script>
<style>
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
        padding: 12px 10px!important;
     }
</style>