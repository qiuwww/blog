<template>
  <div class="home">
    <img src="../assets/images/dp.png"  style="object-fit: cover; height: calc(100vh - 50px);"/>
  </div>
</template>
<script>

    export default {
        name: 'dashboard-console',
        components: {},
        data () {
            return {
                visitType: 'day', // day, month, year
                visitDate: [(new Date()), (new Date())]
            }
        },
        methods: {
        },
        watch: {
            // 监听路由变化
            $route(to, from) {
                window.location.reload();
            }
        }
    }
</script>
<style lang="less">
  .dashboard-console-visit{
    .ivu-radio-group-button .ivu-radio-wrapper{
      border: none !important;
      box-shadow: none !important;
      padding: 0 12px;
    }
    .ivu-radio-group-button .ivu-radio-wrapper:before, .ivu-radio-group-button .ivu-radio-wrapper:after{
      display: none;
    }
  }
  .home{
    img{
      width:100%;
      /*height:100%;*/
    }
  }
</style>
