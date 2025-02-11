<template>
  <div class="app" :style="'height:'+ height">
    <!-- 引入magic-editor组件 -->
    <magic-editor :config="config"></magic-editor>
  </div>
</template>

<script>
    // 引入组件
    import magicEditor from 'magic-editor'
    // 引入样式
    import 'magic-editor/dist/magic-editor.css'
    export default {
        name: '',
        components: {magicEditor},
        data() {
            return {
                height: document.documentElement.clientHeight - 55 + 'px;',
                loading: true,
                title:'四川民图科技',
                config:{
                    baseURL:  process.env.VUE_APP_BASE_API + '/magic/web',    //配置后台服务
                    serverURL: process.env.VUE_APP_BASE_API +'/',    //配置接口实际路径
                    header: {
                        skin: true,
                        document: false,
                        repo: false,
                        qqGroup: false
                    },
                }
            }
        },
        mounted: function () {
            this.loading = false
            const that = this;
            window.onresize = function temp() {
                that.height = document.documentElement.clientHeight - 55 + 'px;'
            };
        },
    }
</script>
<style>
  .app {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .ma-logo {
    display: none !important;
  }
</style>
