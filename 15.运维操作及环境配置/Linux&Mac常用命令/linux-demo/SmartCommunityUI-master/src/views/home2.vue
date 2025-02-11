<template>
  <div class="mainMapStyle">
    <Map :url="configUrl" @onload="onMapload" style="width: 75%;"/>

    <div style="width: 25%;height: 100%;float: right">
<!--        <img src="../assets/images/testback.jpg" style="width: 100%;height: 100%"/>-->
      <div class="ql-container ql-snow" style="user-select: none;">
        <div class="ql-editor">
          <h1><span style="color: rgb(102, 163, 224);" class="ql-size-48px">产业现状</span></h1><p><img src="http://otp.cdinfotech.top/uploads/cd/file/2020/10/10/16023245347077425046.png" width="239"><span class="ql-size-24px"><span class="ql-cursor">﻿</span></span></p><p><span class="ql-size-24px">第一产业：榨菜种植为主、种植单一、收益有限。</span></p><p><span class="ql-size-24px">种植业：以榨菜、玉米、水稻种植为主，园林苗木和经</span></p><p><span class="ql-size-24px">济林种植为补充。二渡作为榨菜主产区，榨菜终止专业</span></p><p><span class="ql-size-24px">化，标准化程度高但因榨菜终止附加值低，村民难以通</span></p><p><span class="ql-size-24px">过种植致富，养殖业：以生猪和家禽养殖家庭散养为主。</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import Map from '../components/mars-map/Main.vue';

    export default {
        name: 'dashboard-console',
        components: {
            Map
        },
        data() {
            return {
                configUrl: "../config/simpleConfig.json",
            }
        },
        methods: {
            //地图构造完成回调
            onMapload(viewer) {

            },
        },
        mounted() {

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
  .mainMapStyle {
    position: absolute;
    height: calc(100% - 50px);
    width: 100%;
    display: flex;
  }

  /*去除mapview拖动时的边框*/
  .esri-view .esri-view-surface--inset-outline:focus::after {
    outline: auto 0px Highlight !important;
    outline: auto 0px -webkit-focus-ring-color !important;
  }
</style>
