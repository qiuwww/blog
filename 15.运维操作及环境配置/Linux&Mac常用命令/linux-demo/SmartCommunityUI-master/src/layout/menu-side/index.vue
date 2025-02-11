<template>
  <div>
    <div class="i-layout-sider-logo" :class="{ 'i-layout-sider-logo-dark': siderTheme === 'dark' }">
      <transition name="fade-quick">
        <i-link to="/" v-show="!hideLogo">
          <img src="@/assets/images/logo-small.png" v-if="menuCollapse">
          <img src="@/assets/images/logo.png" v-else-if="siderTheme === 'light'">
          <img src="@/assets/images/logo-dark.png" v-else>
        </i-link>
      </transition>
    </div>
    <Menu
      ref="menu"
      class="i-layout-menu-side i-scrollbar-hide"
      :theme="siderTheme"
      :accordion="menuAccordion"
      :active-name="activePath"
      :open-names="openNames"
      width="auto">
      <template v-if="!menuCollapse" v-for="(item, index) in left_menu">
        <i-menu-side-item
          v-if="!item.hidden && (hasOneShowingChild(item.children,item) || item.children === undefined || !item.children.length)"
          :menu="onlyOneChild" :key="index" :base-path="item.path"/>
        <i-menu-side-submenu v-else :menu="item" :key="index" :base-path="item.path"/>
      </template>
      <template v-else>
        <Tooltip
          v-if="!item.hidden && hasOneShowingChild(item.children,item)&& (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
          :content="tTitle(onlyOneChild.meta.title)" placement="right" :key="index">
          <i-menu-side-item :menu="onlyOneChild" :base-path="item.path" hide-title/>
        </Tooltip>
        <i-menu-side-collapse v-else :menu="item" :base-path="item.path" :key="index" top-level/>
      </template>
    </Menu>

  </div>
</template>
<script>
    import iMenuSideItem from './menu-item';
    import iMenuSideSubmenu from './submenu';
    import iMenuSideCollapse from './menu-collapse';
    import tTitle from '../mixins/translate-title';
    import {isExternal} from '@/utils/validate';
    import {mapState, mapGetters} from 'vuex';
    import path from 'path';
    import iHeaderCollapse from '../header-collapse';

    export default {
        name: 'iMenuSide',
        mixins: [tTitle],
        components: {iMenuSideItem, iMenuSideSubmenu, iMenuSideCollapse, iHeaderCollapse},
        props: {
            hideLogo: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState('layout', [
                'siderTheme',
                'menuAccordion',
                'menuCollapse'
            ]),
            ...mapState('menu', [
                'activePath',
                'openNames'
            ]),
            ...mapGetters('menu', [
                'filterSider'
            ]),
            ...mapGetters([
                'left_menu'
            ]),
        },
        watch: {
            '$route': {
                handler() {
                    this.handleUpdateMenuState();
                },
                immediate: true
            },
            // 在展开/收起侧边菜单栏时，更新一次 menu 的状态
            menuCollapse() {
                this.handleUpdateMenuState();
            }
        },
        data() {
            this.hideTitle = true;
            this.onlyOneChild = null
            return {}
        },
        methods: {
            handleUpdateMenuState() {
                this.$nextTick(() => {
                    if (this.$refs.menu) {
                        this.$refs.menu.updateActiveName();
                        if (this.menuAccordion) this.$refs.menu.updateOpened();
                    }
                });
            },
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
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
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
