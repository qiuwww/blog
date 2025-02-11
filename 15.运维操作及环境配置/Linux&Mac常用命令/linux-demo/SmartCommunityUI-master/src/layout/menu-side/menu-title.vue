<template>
    <span class="i-layout-menu-side-title">
        <span class="i-layout-menu-side-title-icon" :class="{ 'i-layout-menu-side-title-icon-single': hideTitle }" v-if="menu.meta.icon || menu.meta.custom || menu.meta.img">
            <svg-icon :icon-class="menu.meta.icon" v-if="menu.meta.icon.indexOf('-')==-1"/>
            <Icon :type="menu.meta.icon" v-else/>
        </span>
        <span class="i-layout-menu-side-title-text" :class="{ 'i-layout-menu-side-title-text-selected': selected }" v-if="!hideTitle">{{ tTitle(menu.meta.title) }}</span>
    </span>
</template>
<script>
    import tTitle from '../mixins/translate-title';
    import { isExternal } from '@/utils/validate';
    import path from 'path';
    export default {
        name: 'iMenuSideTitle',
        mixins: [ tTitle ],
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
            // 用于侧边栏收起 Dropdown 当前高亮
            selected: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
