<template>
  <div id="content" class="mainContent">
    <div id="map2" style="height: 100%;" class="emergencyMap">
      <leftSearchList></leftSearchList>
    </div>
  </div>
</template>
<script>
    import "ol/ol.css";
    import {Map, View} from "ol";
    import {Vector as VectorSource, XYZ} from "ol/source";
    import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
    import {Fill, Icon, Stroke, Style} from "ol/style";


    import leftSearchList from "./leftSearchList";

    export default {
        data() {
            return {
                map: null,
                dianji: true,
                source: new VectorSource(),
                vector: new VectorLayer({
                    style: new Style({
                        fill: new Fill({
                            color: "rgba(0,255,0,0.3)",
                        }),
                        stroke: new Stroke({
                            color: "#ff0000",
                            width: 2,
                        }),
                    }),
                }),
            };
        },
        components: {
            leftSearchList
        },
        methods: {
            changluyou() {
                location.href = "http://localhost:8013/dashboard"; //返回主界面
                //window.open('http://localhost:8013/dashboard',"_self");
            },
            //更换底图
            changditu() {
                if (this.dianji) {
                    this.TiandiMap_img = new TileLayer({
                        name: "天地图影像图层",
                        source: new XYZ({
                            url:
                                "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
                            wrapX: false,
                        }),
                    });
                    // 添加到地图上
                    this.map.addLayer(this.TiandiMap_img);
                    this.dianji = false;
                } else {
                    this.map.removeLayer(this.TiandiMap_img);
                    this.dianji = true;
                }
            },
            //进入执行加载底图
            //http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}天地图影像
            //http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}高德
            init() {
                //定义Google切片参数
                this.map = new Map({
                    target: "map2",
                    layers: [
                        new TileLayer({
                            source: new XYZ({
                                url:
                                    "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
                            }),
                            isGroup: true,
                            name: "高德地图",
                        }),
                    ],
                    view: new View({
                        projection: "EPSG:4326", //使用这个坐标系
                        center: [120.382609,36.067108], // [122.03826396843246,39.95882481966137], // 泸州[105.363867, 28.75983]
                        zoom: 15,
                    }),
                    // eventListeners: {
                    //     //鼠标悬停在要素上面
                    //     featureover: function(e) {
                    //         // e.feature.renderIntent = "select";
                    //         // e.feature.layer.drawFeature(e.feature);
                    //         log("Map says: Pointer entered " + e.feature.id + " on " + e.feature.layer.name);
                    //     },
                    //     //鼠标离开要素
                    //     featureout: function(e) {
                    //         // e.feature.renderIntent = "default";
                    //         // e.feature.layer.drawFeature(e.feature);
                    //         log("Map says: Pointer left " + e.feature.id + " on " + e.feature.layer.name);
                    //     },
                    //     //鼠标点击要素
                    //     featureclick: function(e) {
                    //         log("Map says: " + e.feature.id + " clicked on " + e.feature.layer.name);
                    //     }
                    // }
                });

                //添加矢量图层
                this.vector.setZIndex(10);
                this.map.addLayer(this.vector);
            },
        },
        mounted() {
            this.init();
        },
    };
</script>
<style lang="less">
  .ol-zoom {
    display: none;
  }

  .top_title {
    position: absolute;
    width: 100%;
    height: 50px;
    top: 0%;
    background: rgba(0, 0, 0, 0.6);
  }

  .top_title_font-size {
    font-size: 23px;
    position: absolute;
    margin-left: 1%;
    top: 50%;
    transform: translateY(-50%);
    font-family: Negreta;
    color: rgb(16, 133, 241);
  }

  .top_title_font-size2 {
    font-size: 14px;
    position: absolute;
    font-family: 微软雅黑, Arial;
    line-height: 45px;
    right: 70px;
    top: 50%;
    text-align: center;
    transform: translateY(-50%);
    background: url(data:image/png;base64,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) no-repeat 0 18px;
    color: white;
    width: 145px;
  }

  .top_title_font-size3 {
    font-size: 33px;
    position: absolute;
    font-family: Negreta;
    top: 50%;
    left: 50%;
    text-align: center;
    color: YEllow;
    transform: translate(-50%, -50%);
  }

  .gps-time {
    width: 110px;
    height: 16px;
    display: block;
    color: #ababab;
    background: url(data:image/png;base64,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) no-repeat;
    line-height: 16px;
    position: absolute;
    top: 50px;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  label {
    font-weight: 400;
  }

  .bottom_img {
    left: 20px;
    top: 70px;
    position: absolute;
  }

  .effect-tip {
    animation: effect-tip 1s both infinite ease-in-out;
  }

  .effect-tip {
    background-color: #2d8cf0;
    height: 6px;
    width: 6px;
    position: absolute;
    border-radius: 20px;
    right: -3px;
    top: -3px;
  }



  .btn-pie,
  .btn-column,
  .btn-line,
  .btn-radar,
  .btn-cluster,
  .btn-rect,
  .btn-honeycomb {
    display: inline-block;
    width: 85px;
    height: 58px;
    position: absolute;
    cursor: pointer;
    border: transparent 1px solid;
    border-radius: 2px;
    background-image: url(/img/faviconmap/297d9253ee2f3385b6eeb051342d51e.png);
    background-color: #7c818b;
  }

  .emergencyMap {

    .geoshow-geoglobemap-chartselector {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 105px;
      height: 58px;
      z-index: 5001;
      transition: all 0.5s;
    }

    .geoshow-geoglobemap-chartselector .active {
      border: #3385ff 1px solid;
      background-color: #5281ad;
    }

    .geoshow-geoglobemap-chartselector .active i {
      background: #3385ff;
    }

    .geoshow-geoglobemap-chartselector span i {
      font-style: normal;
      position: absolute;
      right: 0px;
      bottom: 0px;
      padding: 0px 5px;
      line-height: 20px;
      color: #fff;
    }

    .geoshow-geoglobemap-chartselector .btn-radar {
      right: 30px;
      opacity: 0.4;
      transition: all 0.5s;
      background-position: 84px 0px;
    }

    .geoshow-geoglobemap-chartselector .btn-line,
    .geoshow-geoglobemap-chartselector .btn-honeycomb {
      right: 20px;
      opacity: 0.4;
      transition: all 0.5s;
      background-position: -178px 0px;
    }

    .geoshow-geoglobemap-chartselector .btn-column,
    .geoshow-geoglobemap-chartselector .btn-rect {
      right: 10px;
      opacity: 0.7;
      transition: all 0.5s;
      background-position: -87px 0px;
    }

    .geoshow-geoglobemap-chartselector .btn-pie,
    .geoshow-geoglobemap-chartselector .btn-cluster {
      right: 0px;
      transition: all 0.5s;
      background-position: 0px 0px;
    }

    /*悬停样式*/

    .geoshow-geoglobemap-chartselector:hover .btn-line,
    .geoshow-geoglobemap-chartselector:hover .btn-honeycomb {
      right: 190px;
      opacity: 1;
      transition: all 0.5s;
    }

    .geoshow-geoglobemap-chartselector:hover .btn-radar {
      right: 285px;
      opacity: 1;
      transition: all 0.5s;
      /*border: #3385ff 1px solid;*/
      /*background-color: #5281ad;*/
    }

    .geoshow-geoglobemap-chartselector:hover .btn-column {
      right: 95px;
      opacity: 1;
      transition: all 0.5s;
    }

    .geoshow-geoglobemap-chartselector:hover .btn-pie {
      transition: all 0.5s;
      /*border: #3385ff 1px solid;*/
      /*background-color: #5281ad;*/
    }
  }

  .btn-column:hover {
    border: #3385ff 1px solid;
    background-color: #5281ad;
  }

  .btn-pie:hover {
    border: #3385ff 1px solid;
    background-color: #5281ad;
  }

  .btn-radar:hover {
    border: #3385ff 1px solid;
    background-color: #5281ad;
  }

  .btn-line:hover {
    border: #3385ff 1px solid;
    background-color: #5281ad;
  }
  .mainContent{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>
