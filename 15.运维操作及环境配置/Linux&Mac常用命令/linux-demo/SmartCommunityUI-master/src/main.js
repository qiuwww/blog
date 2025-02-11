import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'


import VueSession from 'vue-session'
Vue.use(VueSession)

// 配置
import Setting from './setting';

// 混合
import mixinApp from '@/mixins/app';

// 插件
//import plugins from '@/plugins';
// 多语言
import i18n from '@/i18n';
// 方法
import {getHeaderName, getMenuSider, getSiderSubmenu} from '@/libs/system';
// 内置组件
import iLink from '@/components/link';
import menuHeader from '@/menu/header';
import menuSider from '@/menu/sider';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 数据字典
import dict from './components/Dict'

// 权限指令
import permission from './components/Permission'
import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'

//播放器样式
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
// import '@/../static/theme.css'

// 代码高亮
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

import App from './App'
import store from './store'
import router from './router/routers'
import {frameInRoutes} from '@/router/routes';
// store
//import store from '@/store/index';

import './assets/icons' // icon
import './router/index' // permission control
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import iViewPro from '@/iview-pro/iview-pro.min.js'
import '@/iview-pro/iview-pro.css'
import './styles/index.less'
//图片预览插件
import preview from 'v-viewer';
//Highcharts

import EleForm from "vue-ele-form";
import FRender from "./components/fRender/f-render";
import EleFormImageUploader from 'vue-ele-form-image-uploader'
import EleFormBmap from 'vue-ele-form-bmap'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import '@/styles/index.scss' // global css
Vue.use(VideoPlayer)
Vue.use(EleForm,{
  bmap: {
    // 比如设置 ak 后, 所有的 bmap 编辑器上传图片都会采用这个属性值
    ak: 'YOUR_APP_KEY'
  }
});


// 注册 image-uploader 组件
Vue.component('image-uploader', EleFormImageUploader)
// 注册 bmap 组件
Vue.component('bmap', EleFormBmap)

Vue.component("f-render", FRender);

Vue.use(preview);
if (window) window.$t = (key, value) => i18n.t(key, value);
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.component('i-link', iLink);
//Vue.use(plugins);
Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(permission)
Vue.use(dict)
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})
import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入echarts
import echarts from 'echarts'

//Highcharts组件 做3d用的
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

import VCharts from 'v-charts';
Vue.use(VCharts);

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(iViewPro);

import VueQuillEditor from 'vue-quill-editor'
//一定要引入这三个css，不然文本编辑器会出现不规则黑白几何图形
//这三个css可以在main.js中引入，也可以在具体使用的.vue文件中引入
import './assets/style/quill.bubble.css'
import './assets/style/quill.core.css'
import './assets/style/quill.snow.css'

Vue.use(VueQuillEditor)

import {mapState, mapGetters} from 'vuex';

new Vue({
  mixins: [mixinApp],
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('page/init', frameInRoutes);
    // 设置顶栏菜单
    //this.$store.commit('menu/setHeader', menuHeader);
    // 加载用户登录的数据
    //this.$store.dispatch('account/load');
    // 初始化全屏监听
    this.$store.dispatch('layout/listenFullscreen');
  },
  computed: {},
  watch: {
    // 监听路由 控制侧边栏显示 标记当前顶栏菜单（如需要）
    '$route'(to, from) {
      let menuHeader = [];
      let menuSider = [];

      let headMenu = this.$store.getters.head_menu;
      for (let i = 0; i < headMenu.length; i++) {
        if (headMenu[i].level == 0 && !menuHeader.some(item => {
          if (item.name == headMenu[i].name) {
            return true
          }
        }) && !menuSider.some(item => {
          if (item.name == headMenu[i].name) {
            return true
          }
        })) {
          menuHeader.push({
            hideSider: headMenu[i].hideSider,
            icon: headMenu[i].icon,
            name: headMenu[i].name,
            path: "/" + headMenu[i].path,
            title: headMenu[i].name,
            target:headMenu[i].newWindow ? '_blank' : '_self'
          });

          menuSider.push({
            path: "/" + headMenu[i].path,
            title: headMenu[i].name,
            header: headMenu[i].name,
            icon: headMenu[i].icon,
            target:headMenu[i].newWindow ? '_blank' : '_self'
          });
        }
      }

      let path = to.matched[to.matched.length - 1].path;
      let permissionRouters = this.$store.getters.permission_routers;
      // 设置顶栏菜单
      this.$store.commit('menu/setHeader', menuHeader);

      permissionRouters = permissionRouters.filter(function (elem) {
        return elem.level != 0;
      });
      permissionRouters = permissionRouters.concat(menuSider);


      let mathPath = '';
      let headerName = getHeaderName(path, permissionRouters);
      if (!headerName) {
        path = to.path;
        headerName = getHeaderName(path, permissionRouters);

        if (!headerName) {
           let split = to.path.substring(1).split("/");
           if(split){
             mathPath = "/" + split[0];
           }

          // if (to.path.lastIndexOf("/") != 0) {
          //   mathPath = to.path.substring(0, to.path.lastIndexOf("/"));
          // } else {
          //   mathPath = to.path;
          // }


          for (let i = 0; i < permissionRouters.length; i++) {
            if (mathPath === permissionRouters[i].path) {
              headerName = permissionRouters[i].headName;
              break;
            }
          }
        }
      }

      // console.log("headName ===== " + headerName);


      // 在 404 时，是没有 headerName 的
      if (headerName !== null && headerName != "" && headerName != undefined) {
        this.$store.commit('menu/setHeaderName', headerName);
        this.$store.commit('menu/setMenuSider', menuSider);

        const filterMenuSider = getMenuSider(menuSider, headerName);
        this.$store.commit('menu/setSider', filterMenuSider);

        var filterArr = permissionRouters.filter(function (elem) {
          return elem.headName == headerName;
        });

        filterArr.forEach(function(val,index,filterArr){
          val.target=val.newWindow ? '_blank' : '_self';
          val.children[0].target = val.newWindow ? '_blank' : '_self';
        });
        //根据顶部菜单名称过滤左侧菜单
        this.$store.commit('SET_LEFT_MENU', filterArr);

        // if (to.path.lastIndexOf("/") != 0) {
        //   path = to.path.substring(to.path.lastIndexOf("/") + 1, to.path.length);
        // } else {
        //   path = to.path;
        // }
        let split = to.path.substring(1).split("/");
        let s = "";
        if(split.length > 1){
          let strings = split.slice(1);
          for (let i = 0; i < strings.length; i++) {
            s += "/" + strings[i];
          }
          if(s != ""){
            s = s.substring(1);
          }
        }else {
          s = "/" + split[0];
        }

        this.$store.commit('menu/setActivePath', s);
        this.$store.commit('menu/setOpenNames', [mathPath]);

        menuSider.forEach(item => {
          if (item.path == to.path && filterArr && filterArr.length > 0) {
            this.$store.commit('menu/setActivePath', filterArr[0].children ? filterArr[0].children[0].path : "");
            this.$store.commit('menu/setOpenNames', [filterArr[0].path]);

            if (filterArr[0].children) {
              if(filterArr[0].children[0].path.indexOf("/") == -1){
                this.$router.replace(filterArr[0].path + "/" + filterArr[0].children[0].path);
              }else {
                this.$router.replace(filterArr[0].children[0].path);
              }
              // if (to.path == "/systemSetting" || to.path == "/systemTest") {
              // } else {
              // }
            }

          }
        })
      }
      this.appRouteChange(to, from);
    }
  }
}).$mount('#app');
import previewImg from 'vue-preview-img'
import '../node_modules/vue-preview-img/lib/vue-preview-img.css'

Vue.use(previewImg);

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    "inline": true,
    "button": true,
    "navbar": true,
    "title": true,
    "toolbar": true,
    "tooltip": true,
    "movable": true,
    "zoomable": true,
    "rotatable": true,
    "scalable": true,
    "transition": true,
    "fullscreen": true,
    "keyboard": true,
    "url": "data-source"
  }
});
