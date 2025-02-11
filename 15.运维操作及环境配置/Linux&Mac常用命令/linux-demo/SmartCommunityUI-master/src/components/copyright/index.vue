<template>
    <GlobalFooter class="i-copyright" :links="links" :copyright="copyright" />
</template>
<script>
    export default {
        name: 'i-copyright',
        data () {
            return {
                links: [
                   /* {
                        title: '官网',
                        key: '官网',
                        href: 'https://iview.design',
                        blankTarget: true
                    },
                    {
                        title: '社区',
                        key: '社区',
                        href: 'https://dev.iviewui.com',
                        blankTarget: true
                    },
                    {
                        title: '专业版',
                        key: '专业版',
                        href: 'https://pro.iviewui.com',
                        blankTarget: true
                    }*/
                ],
                copyright: 'Copyright © 2020 四川民图科技有限公司'
            }
        }
    }
</script>
<style lang="less">
    .i-copyright{
        flex: 0 0 auto;
    }
</style>
