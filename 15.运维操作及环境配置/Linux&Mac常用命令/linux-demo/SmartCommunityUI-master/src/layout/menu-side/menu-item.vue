<template>
    <div v-if="!menu.hidden&&hasOneShowingChild(menu.children,menu)&&menu.meta">
        <MenuItem  :to="resolvePath(menu.path)"  :replace="menu.replace" :target="menu.target" :name="menu.path" @click.native="handleClick(menu.path)">
            <i-menu-side-title :menu="menu" :hide-title="hideTitle" />
        </MenuItem>
    </div>
</template>
<script>
    import iMenuSideTitle from './menu-title';
    import clickItem from '../mixins/click-item';
    import { isExternal } from '@/utils/validate';
    import path from 'path';
    export default {
        name: 'iMenuSideItem',
        components: { iMenuSideTitle },
        mixins: [ clickItem ],
        props: {
            menu: {
                type: Object,
                default () {
                    return {}
                }
            },
            hideTitle: {
                type: Boolean,
                default: false
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
