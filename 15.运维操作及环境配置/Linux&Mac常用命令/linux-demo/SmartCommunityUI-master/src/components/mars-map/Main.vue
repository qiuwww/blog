<template>
  <div
    :id="`marsgis-container${mapKey ? '-' + mapKey : ''}`"
    :class="[
      'mars3d-container',
      customClass,
      { 'mars3d-container-compare-rh': compare },
    ]"
  ></div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { getAllService } from "@/api/zhxc/tGridMapService/tGridMapService";
import {getbyareaId} from '@/api/zhxc/basicViewpointInformation/basicViewpointInformation'

export default {
  name: "CesiumViewer",

  props: {
    // 初始化配置参数
    url: String,
    widgetUrl: String,

    // 地图唯一性标识
    mapKey: {
      type: String,
      default: "",
    },

    // 自定义参数
    options: Object,

    // 是否分屏显示
    compare: {
      type: Boolean,
      default: false,
    },

    // 是否插入到body元素上
    appendToBody: {
      type: Boolean,
      default: false,
    },

    // 自定义css类名
    customClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      MapServiceUrl: null,
    };
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
    if (this.mapKey) {
      if (this.options) {
        this.initMars3d(this.options);
      } else {
        this.getMapConfig(this.url).then((data) => {
          if(this.$parent.pageinformation){
              getbyareaId({path:this.$parent.pageinformation.id}).then(res=> {
                       if(res&&res.data.length>0){
                           this.center=res.data[0].perspectiveInfo
                           try{
                              data.map3d.center=JSON.parse(this.center);
                              this.initMars3d(data);
                           }catch{
                              this.initMars3d(data);
                           }
                       }else{
                          this.initMars3d(data);
                       }
                 })
          }else{
             this.initMars3d(data);
          }
        });
      }
    } else {
      this.getMapConfig(this.url).then((data) => {
        this.initMars3d(data);
      });
    }
  },
  destroyed() {},
  beforeDestory() {
    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.handler.destroy();
    delete this.handler;

    this[`viewer${this.mapKey}`].mars.destroy();
    this[`viewer${this.mapKey}`].destroy();
    delete this[`viewer${this.mapKey}`];
  },

  methods: {
    getMapConfig(url) {
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((res) => {
            resolve(res.data);
          })
          .then((error) => {
            reject(error);
          });
      });
    },

    initMars3d(options) {
      if (this[`$viewer${this.mapKey}`]) {
        // window.viewer.destroy();
      }

      const viewer = mars3d.createMap({
        id: `marsgis-container${this.mapKey ? `-${this.mapKey}` : ""}`,
        data: options.map3d,
        serverURL: options.serverURL,
        ...this.options,
      });
      getAllService({}).then((res) => {
        if (res && res.success && res.data) {
          res.data.forEach((element) => {
            if(element.type == "1"){
                var layer = mars3d.layer.createLayer({
                name: element.name,
                type: "image",
                url: element.url,
                visible: true
              }, viewer);
            }
            else if (element.type == "2") {
              var layer1 = mars3d.layer.createLayer(
                {
                  name: element.name,
                  type: "tile",
                  url: element.url,
                  visible: true,
                },
                viewer
              );
            }
            else if (element.type == "3") {
              var layer1 = mars3d.layer.createLayer(
                {
                  name: element.name,
                  type: "arcgis",
                  url: element.url,
                  visible: true,
                },
                viewer
              );
            }
            else if (element.type == "4") {
              var maxLevel = 18;
              var matrixIds = new Array(maxLevel);
              for (var z = 0; z <= maxLevel; z++) {
                  matrixIds[z] = 'EPSG:4326:' + (z).toString(); //第0成对应1，z值都+1
              }
              var layer = mars3d.layer.createLayer({
                  name: element.name,
                  type: "wmts",
                  url: element.url,
                  layer: 'mars:hfgh',
                  style: "",
                  format: "image/png",
                  tileMatrixLabels: matrixIds,  //会替换tileMatrix参数 config.json中时直接写数组值
                  tileMatrixSetID: "EPSG:4326",
                  crs: "4326",
                  visible: true,
              }, viewer);
            }
            else if (element.type == "5") {
              var layer = mars3d.layer.createLayer({
                name: element.name,
                type: "wms",
                url: element.url,
                layers: "mars:hf",
                crs: "EPSG:4326",
                parameters: {
                    transparent: true,
                    format: "image/png"
                },
                visible: true,
              }, viewer);
            }
            else if (element.type == "6") {
              var layer = mars3d.layer.createLayer({
                name: element.name,
                type: "tms",
                url: element.url,
                flipXY: true,
                visible: true,
              }, viewer);
            }
          });
        }
      });
      // //增加其他底图  createLayer方法
      // var layer1 = mars3d.layer.createLayer(
      //   {
      //     type: "arcgis",
      //     url: "/arcgis/rest/services/PLDSZSYXYS/MapServer",
      //     showClickFeature: true,
      //     // "pickFeatureStyle": {//选择的要素样式，同Draw类样式
      //     //     "clampToGround": true,
      //     //     "fill": true,
      //     //     "color": "#2deaf7",
      //     //     "opacity": 0.6,
      //     //     "outline": true,
      //     //     "outlineWidth": 3,
      //     //     "outlineColor": "#e000d9",
      //     //     "outlineOpacity": 1.0
      //     // },
      //     // "popup": "all",
      //     visible: true,
      //   },
      //   viewer
      // );

      // //增加其他底图  createLayer方法
      // var layer = mars3d.layer.createLayer(
      //   {
      //     type: "arcgis",
      //     url: "/arcgis/rest/services/PLXX/MapServer",
      //     showClickFeature: true,
      //     // "pickFeatureStyle": {//选择的要素样式，同Draw类样式
      //     //     "clampToGround": true,
      //     //     "fill": true,
      //     //     "color": "#2deaf7",
      //     //     "opacity": 0.6,
      //     //     "outline": true,
      //     //     "outlineWidth": 3,
      //     //     "outlineColor": "#e000d9",
      //     //     "outlineOpacity": 1.0
      //     // },
      //     // "popup": "all",
      //     visible: true,
      //   },
      //   viewer
      // );

      window.viewer = viewer;
      //widget处理
      if (this.widgetUrl) {
        this.getMapConfig(this.widgetUrl).then((data) => {
          this.initStaticWidget(viewer, data);
        });
      }

      viewer.mars.click = () => {
        // 触发 document 上的事件
        document.dispatchEvent(new Event("mousedown"));
        document.dispatchEvent(new Event("click"));
      };
      this[`viewer${this.mapKey}`] = viewer;

      // 挂载到全局对象下，所有组件通过this.$viewer访问

      Vue.prototype[`$viewer${this.mapKey}`] = viewer;
      Vue.prototype.$Cesium = Cesium;

      this.$emit("onload", viewer);
    },

    //初始化外部静态widget功能（兼容使用传统模式开发的一些widget）
    initStaticWidget(viewer, widget) {
      mars3d.widget.init(viewer, widget);

      //绑定图层管理
      window.bindToLayerControl = function (options) {
        var layer = viewer.mars.addOperationalLayer(options);

        var manageLayersWidget = mars3d.widget.getClass(
          "widgets/manageLayers/widget.js"
        );
        if (manageLayersWidget) {
          manageLayersWidget.addOverlay(options);
        }
        return layer;
      };
      //取消绑定图层管理 ， 参数为bindToLayerControl返回的图层
      window.unbindLayerControl = function (layer) {
        viewer.mars.removeOperationalLayer(layer.config.id);

        var manageLayersWidget = mars3d.widget.getClass(
          "widgets/manageLayers/widget.js"
        );
        if (manageLayersWidget) {
          manageLayersWidget.removeLayer(layer.config.name);
        }
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.mars3d-container {
  height: 100%;
  overflow: hidden;
}

/* 重写Cesium的css */

/**cesium按钮背景色*/
.cesium-button {
  background-color: #3f4854;
  color: #e6e6e6;
  fill: #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  line-height: 32px;
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  background-color: rgba(63, 72, 84, 0.7);
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  background-color: rgba(63, 72, 84, 0.9);
}

.cesium-viewer-geocoderContainer .search-results {
  background-color: #3f4854;
}

.cesium-geocoder-searchButton {
  background-color: #3f4854;
}

.cesium-infoBox-title {
  background-color: #3f4854;
}

.cesium-infoBox {
  background: rgba(63, 72, 84, 0.9);
}

.cesium-toolbar-button img {
  height: 100%;
}

.cesium-performanceDisplay-defaultContainer {
  top: auto;
  bottom: 35px;
  right: 50px;
}

.cesium-performanceDisplay-ms,
.cesium-performanceDisplay-fps {
  color: #fff;
}

/**cesium工具栏位置*/
.cesium-viewer-toolbar {
  top: auto;
  left: auto;
  right: 12px;
  bottom: 35px;
}

.cesium-viewer-toolbar > .cesium-toolbar-button,
.cesium-navigationHelpButton-wrapper,
.cesium-viewer-geocoderContainer {
  margin-bottom: 5px;
  float: right;
  clear: both;
  text-align: center;
}

.cesium-baseLayerPicker-dropDown {
  bottom: 0;
  right: 40px;
  max-height: 700px;
  margin-bottom: 5px;
}

.cesium-navigation-help {
  top: auto;
  bottom: 0;
  right: 40px;
  transform-origin: right bottom;
}

.cesium-sceneModePicker-wrapper {
  width: auto;
}

.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  float: left;
  margin: 0 3px;
}

.cesium-viewer-geocoderContainer .search-results {
  left: 0;
  right: 40px;
  width: auto;
  z-index: 9999;
}

.cesium-infoBox-title {
  background-color: #3f4854;
}

.cesium-infoBox {
  top: 50px;
  background: rgba(63, 72, 84, 0.9);
}

/**左下工具栏菜单*/
.toolbar-dropdown-menu-div {
  background: rgba(43, 44, 47, 0.8);
  border: 1px solid #2b2c2f;
  z-index: 991;
  position: absolute;
  right: 60px;
  bottom: 40px;
  display: none;
}

.toolbar-dropdown-menu {
  min-width: 110px;
  padding: 0;
}

.toolbar-dropdown-menu > li {
  padding: 0 3px;
  margin: 2px 0;
}

.toolbar-dropdown-menu > li > a {
  color: #edffff;
  display: block;
  padding: 4px 10px;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  white-space: nowrap;
  text-decoration: none;
}

.toolbar-dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
  color: #fff;
  background-color: #444d59;
}

.toolbar-dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus {
  color: #fff;
  background-color: #444d59;
}

.toolbar-dropdown-menu i {
  padding-right: 5px;
}

.layer-mars-dialog {
  position: absolute;
  // top:90px !important;
  top: 70px !important;
}

.mCustomScrollbar _mCS_1 {
  height: 600px !important;
}

#layui-layer6 {
  overflow: hidden;
  height: 600px !important;
}
</style>
