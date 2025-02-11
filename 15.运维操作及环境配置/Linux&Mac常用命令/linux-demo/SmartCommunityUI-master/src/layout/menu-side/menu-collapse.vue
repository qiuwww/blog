<template>
    <Dropdown placement="right-start" :class="dropdownClasses" v-if="!menu.hidden">
        <li :class="menuItemClasses"  v-if="topLevel">
            <i-menu-side-title :menu="menu" :selected="openNames.indexOf(menu.path) >= 0" hide-title />
            <!--<br><span class="collapseText">{{ tTitle(menu.meta.title) }}</span>-->
        </li>
        <DropdownItem v-else>
            <i-menu-side-title :menu="menu" :selected="openNames.indexOf(menu.path) >= 0" />
            <Icon type="ios-arrow-forward" class="i-layout-menu-side-arrow" />
        </DropdownItem>
        <DropdownMenu slot="list">
            <div class="i-layout-menu-side-collapse-title" v-if="showCollapseMenuTitle">
                <i-menu-side-title :menu="menu" />
            </div>
            <template v-for="(item, index) in menu.children">
                <i-link :to="resolvePath(item.path)" :target="item.target" v-if="item.children === undefined || !item.children.length" :key="index" @click.native="handleClick(item.path)">
                    <DropdownItem :divided="item.divided" :class="{ 'i-layout-menu-side-collapse-item-selected': resolvePath(item.path) === activePath }">
                        <i-menu-side-title :menu="item" />
                    </DropdownItem>
                </i-link>
                <i-menu-side-collapse v-else :menu="item" :key="index" :base-path="basePath"/>
            </template>
        </DropdownMenu>
    </Dropdown>
</template>
<script>
    import iMenuSideTitle from './menu-title';
    import clickItem from '../mixins/click-item';
    import tTitle from '../mixins/translate-title';
    import { mapState } from 'vuex';
    import { isExternal } from '@/utils/validate';
    import path from 'path';
    export default {
        name: 'iMenuSideCollapse',
        components: { iMenuSideTitle },
        mixins: [ clickItem,tTitle ],
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
            },
            // 是否是第一级，区分在于左侧和展开侧
            topLevel: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState('layout', [
                'siderTheme',
                'showCollapseMenuTitle'
            ]),
            ...mapState('menu', [
                'activePath',
                'openNames'
            ]),
            dropdownClasses () {
                return {
                    'i-layout-menu-side-collapse-top': this.topLevel,
                    'i-layout-menu-side-collapse-dark': this.siderTheme === 'dark'
                }
            },
            menuItemClasses () {
                return [
                    'ivu-menu-item i-layout-menu-side-collapse-top-item',
                    {
                        'ivu-menu-item-selected ivu-menu-item-active': this.openNames.indexOf(this.menu.path) >= 0 // -active 在高亮时，有背景
                    }
                ]
            }
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
