<template>
  <div class="bigScreenMap">
    <!--地图-->
    <div
      :id="'marsgis-container-' + mapKey"
      :class="['mars3d-container',customClass]"
    ></div>
    <div class="officeHeader">
      <div class="titleInfo">泸州市城市停车运行中心</div>
    </div>

    <!--<home-page-left></home-page-left>
    <home-page-right></home-page-right>-->

    <park-page-left></park-page-left>
    <park-page-right></park-page-right>

    <div class="nav">
      <div class="navWrap">
        <ul>
          <li><Icon type="logo-buffer" />综合态势</li>
          <li><Icon type="ios-construct" />党建引领</li>
          <li><Icon type="ios-analytics" />社区地图</li>
          <li><Icon type="ios-apps" />网格信息</li>
        </ul>
      </div>
    </div>

    <div class="indexModal">
      <ul>
        <li><Icon type="ios-person" />居民<i-switch size="small"/></li>
        <li><Icon type="ios-camera" />摄像头<i-switch size="small" /></li>
        <li><Icon type="ios-home" />居民楼<i-switch size="small" /></li>
        <li><Icon type="ios-construct" /><i-switch size="small" />党群</li>
        <li><Icon type="ios-thermometer" /><i-switch size="small" />消防站</li>
        <li><Icon type="ios-star" />派出所<i-switch size="small" /></li>
        <li><Icon type="ios-pulse" />医院<i-switch size="small" /></li>
        <li><Icon type="md-bus" />消防设备<i-switch size="small" /></li>
        <li><Icon type="logo-buffer" />网格图层<i-switch size="small" /></li>
      </ul>
    </div>

  </div>
</template>

<script>
  import homePageLeft from './homePage/homePageLeft';
  import homePageRight from './homePage/homePageRight';
  import parkPageLeft from './parkPage/parkPageLeft';
  import parkPageRight from './parkPage/parkPageRight';
  export default {
    name: "index",
    components:{
      homePageLeft,
      homePageRight,
      parkPageLeft,
      parkPageRight
    },
    data() {
      return {
        configUrl: haoutil.system.getRequestByName("config", "../config/bigScreenConfig.json"),
        mapKey: 'cesiumContainer',
        customClass: 'mapClass',
        viewer: null,
        options: {},
        bloom: null,
        brightness: null,
        layerWork: null,
        chkBloomValue: false,
        chkShadowsValue: false,
        chkBrightnessValue: false,
        alphaValue: '2.0',
        color: '',
        positionData: [
          {
            isEllipse:true,
            jd: 105.417046,
            wd: 28.878682,
            height: 200,
            color: Cesium.Color.YELLOW,
            img: '/img/scenicSpotIcon/老年活动中心图标.png'
          },{
            isEllipse:false,
            jd: 105.434071,
            wd: 28.872353,
            height: 200,
            color: Cesium.Color.BLUE,
            img: '/img/scenicSpotIcon/busStation.png'
          },{
            isEllipse:false,
            jd: 105.41718,
            wd: 28.864847,
            height: 200,
            color: Cesium.Color.BLUE,
            img: '/img/scenicSpotIcon/busStation.png'
          },{
            isEllipse:false,
            jd: 105.423969,
            wd: 28.888882,
            height: 200,
            color: Cesium.Color.GREEN,
            img: '/img/scenicSpotIcon/caishichang.png'
          },{
            // 经度：, 纬度：28.86815
            isEllipse: false,
            jd: 105.427677,
            wd: 28.86815,
            height: 200,
            color: Cesium.Color.GREEN,
            img: '/img/scenicSpotIcon/caishichang.png'
          }
        ]
      }
    },
    mounted() {
      this.initMars3d();// 加载地图
    },
    methods: {
      // 加载地图
      initMars3d() {
        let that = this;
        mars3d.createMap({
          id: 'marsgis-container-' + this.mapKey,
          url: this.configUrl,
          center: {"y": 28.829111, "x": 105.427132, "z": 2600.9, "heading": 359.9, "pitch": -29.2, "roll": 360},
          basemaps: [
            {
              "name": "谷歌卫星",
              "type": "group",
              "crs": "gcj",
              "icon": "img/basemaps/google_img.png",
              "layers": [
                {"name": "底图", "type": "www_google", "layer": "img_d"},
                {"name": "注记", "type": "www_google", "layer": "img_z"}
              ]
            },
            {
              "name": "高德卫星",
              "type": "group",
              "icon": "img/basemaps/gaode_img.png",
              "crs": "gcj",
              "layers": [
                {"name": "底图", "type": "www_gaode", "layer": "img_d"},
                {"name": "注记", "type": "www_gaode", "layer": "img_z"}
              ]
            },
            {
              "name": "高德电子",
              "type": "group",
              "icon": "img/basemaps/gaode_vec.png",
              "crs": "gcj",
              "layers": [
                {"name": "底图", "type": "www_gaode", "layer": "vec_d"},
                {"name": "注记", "type": "www_gaode", "layer": "vec_z"}
              ]
            },
            {
              "name": "蓝色底图",
              "icon": "img/basemaps/bd-c-midnight.png",
              "crs": "gcj",
              "type": "arcgis",
              "url": "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
              "enablePickFeatures": false,
              "visible": true
            },
          ],
          operationallayers: [
            {
              "id": 124,
              "zIndex": 9999,
              "type": "water",
              "name": "河流(面状)特效",
              "url": "./河流3.json",
              "symbol": {
                "styleOptions": {
                  "normalMap": "img/waterNormals.jpg",   // 水正常扰动的法线图
                  "frequency": 5000.0,    // 控制波数的数字。
                  "animationSpeed": 0.05, // 控制水的动画速度的数字。
                  "amplitude": 9.0,       // 控制水波振幅的数字。
                  "specularIntensity": 0.8,       // 控制镜面反射强度的数字。
                  "baseWaterColor": "#00baff",    // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
                  "blendColor": "#00baff",        // 从水中混合到非水域时使用的rgba颜色对象。
                  "clampToGround": true,
                }
              },
              "visible": true
            }
          ],
          success(_viewer) {//地图成功加载完成后执行
            console.log(">>>>> 地图创建成功 >>>>");
            that.viewer = _viewer;
            that.viewer.mars.updateTerrainProvider(false);
            that.initWork();
          }
        });
      },
      //当前页面业务相关
      initWork() {
        //加泛光
        this.bloom = this.viewer.scene.postProcessStages.bloom;
        this.bloom.enable = false;
        this.bloom.uniforms.glowOnly = false;
        this.bloom.uniforms.contrast = 128;
        this.bloom.uniforms.brightness = -0.3;
        this.bloom.uniforms.delta = 1.0;
        this.bloom.uniforms.sigma = 3.78;
        this.bloom.uniforms.stepSize = 5.0;

        //加亮度
        this.brightness = this.viewer.scene.postProcessStages.add(
          Cesium.PostProcessStageLibrary.createBrightnessStage()
        );
        this.brightness.enable = true;
        this.brightness.uniforms.brightness = 2.0;

        this.setStyle();

        //画点
        this.drawPoint()
      },
      //画点
      drawPoint(){
        this.positionData.forEach(item => {
          if (item.isEllipse){
            //画圈
            this.viewer.entities.add({
              position: Cesium.Cartesian3.fromDegrees(item.jd, item.wd, 0),
              ellipse: {
                height: 0.0,
                semiMinorAxis: 200.0,
                semiMajorAxis: 200.0,
                material: new mars3d.CircleFadeMaterial({//单个圆圈
                  duration: 1500,//动画时长，单位：毫秒
                  color:item.color
                })
              }
            });
          }

          //设置悬浮线
          this.viewer.entities.add({
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights([item.jd, item.wd, item.height, item.jd, item.wd, 0]),
              width: 2,
              material: new Cesium.PolylineOutlineMaterialProperty({
                color: item.color
              })
            }
          });

          //设置图标
          this.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(item.jd, item.wd, item.height),
            billboard: {
              image: item.img,
              scale: 1,
              scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 50000, 0.1)
            }
          });
        });
      },
      //动态特效 点击事件
      setStyle() {
        if (this.layerWork) {
          this.layerWork.remove();
        }

        //自定义特效 Shader
        let fragmentShader = ``;

        let tilesetColor = 'rgb(3, 104, 255)';
        //let tilesetColor = 'rgb(211,211,211)';

        //模型
        this.layerWork = mars3d.layer.createLayer({
          "type": "3dtiles",
          "name": "泸州",
          "url": "/tempfile/" + "json/tileset.json",
          // "marsJzwStyle": true,    //打开建筑物特效（内置Shader代码）
          "marsJzwStyle": fragmentShader,  //字符串值时，表示使用该字符串定义的自定义Shader
          "style": {
            "color": {
              "conditions": [
                ['true', tilesetColor]  //设置建筑物颜色
              ]
            }
          },
          "center": {"y": 28.829111, "x": 105.427132, "z": 2600.9, "heading": 359.9, "pitch": -29.2, "roll": 360},
          "showClickFeature": true,
          // "popup": "all",
          "popup": [
            {"field": "OBJECTID", "name": "编号"},
            {"field": "DATE_", "name": "楼高", "unit": "米"},
            {"field": "TYPE", "name": "辖区"},
          ],
          "visible": true
        }, this.viewer);

        mars3d.layer.createLayer({
          "id": 123,
          "type": "geojson",
          "zIndex": 1000,
          "name": "道路线",
          "url": "/tempfile/" + "json/道路.json",
          "symbol": {
            "styleOptions": {
              "lineType": "glow",
              "glowPower": 0.1,
              "color": "#FF4500",
              "width": 15,
              "opacity": 0.9,
              "clampToGround": true
            }
          },
          "visible": true
        }, this.viewer);
      }
    }
  }
</script>

<style lang="less" scoped>
  .bigScreenMap {
    position: relative;
    height: 100%;

    .mars3d-container {
      height: 100%;
      overflow: hidden;
    }

    .mapClass {
      height: 100%;
      width: 100%;
    }

    /*position: absolute;width: 100%;text-align: center;top: 25px;
    font-size: 25px;font-weight: bold;color: #FFFFFF;background: url(../../assets/bigScreenImg/head_bg.png) no-repeat;*/
    .officeHeader{
      top: 0;
      position: absolute;
      height: 6vh;
      width: 100%;
      background: url("../../assets/bigScreenImg/head_bg.png") no-repeat;
      z-index: 888;
      background-size: 100% 100%;
      .titleInfo{
        /*height: 2em;*/
        color: #FFF;
        text-align: center;
        font-size: 1.6vw;
        font-family: 'KaiTi';
        text-shadow:2px 2px 0px deepskyblue;
        font-weight: 900;
        /*line-height: 2em;*/
        vertical-align: middle;
        width: 100%;
        letter-spacing: 0;
        position: absolute;
        bottom: 5px;
      }
    }

    .nav{
      position: absolute;
      bottom: 0;
      height: 100px;
      width: 100%;
      /*background-color: red;*/
      color: #FFFFFF;
      font-size: 20px;
      .navWrap{
        position: absolute;
        bottom: 0;
        padding-bottom: 50px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        ul{
          list-style: none;
          li{
            display: inline;
            float:left;
            padding: 5px 10px;
            margin: 0 10px;
            border: 1px solid #FFFFFF;
          }
        }
      }
    }

    .indexModal{
      position: absolute;
      padding: 5px;
      bottom: 120px;
      right: 33%;
      background: rgba(128,128,128,.4);
      border-radius: 5px;
      color: #FFFFFF;
      font-size: 12px;
      width: 130px;
      li{
        margin: 5px 0;
      }
    }

    .ivu-switch{
      float: right;
    }
  }
</style>
<style lang="less">
  .bigScreenMap {
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
  }
</style>
