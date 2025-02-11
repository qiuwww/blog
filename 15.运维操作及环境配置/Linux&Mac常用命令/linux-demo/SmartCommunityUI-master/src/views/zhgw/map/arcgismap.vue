<template>
  <div class="mainDiv">
    <div :class="{arcgisMap:true, splitScreen:showSplitScreen}" id="arcgisMap"></div>
    <splitScreenComparison v-model="showSplitScreen" ref="splitScreen"></splitScreenComparison>
    <map-tool class="mapTool" ref="mapTool"></map-tool>
    <poiSearch ref="poiSearch"></poiSearch>
    <bookmark :showBm="showBm"></bookmark>
    <div id="printDiv" v-show="showPrint"></div>
  </div>

</template>

<script>
    import {loadModules} from 'esri-loader';
    import mapTool from "./component/tool";
    import poiSearch from "./component/poiSearch";
    import bookmark from "./component/bookmark";
    import splitScreenComparison from "./component/splitScreenComparison";

    const options = {
        // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
        url: 'http://139.129.103.13:8013/arcgis_js_api/library/4.16/init.js',
        //url: 'http://192.168.1.3:8088/library/4.16/init.js',
        css: true
    }
    export default {
        name: 'webMap',
        components: {
            mapTool,
            poiSearch,
            bookmark,
            splitScreenComparison,
        },
        data() {
            return {
                baseMap: null,
                view: null,
                options: options,
                Graphic: null,
                measureShow: true,
                measurement: null,
                QueryTask: null,
                Query: null,
                bookmarks: null,
                showBm: false,
                showSplitScreen: false,
                print: null,
                showPrint: false,
                Draw: null,
                geometryEngine: null,
                Polygon: null,
                webMercatorUtils:null,
                Polyline:null,
                Point:null

            }
        },
        mounted() {
            let _this = this;
            let spatialReference = {
                wkid: 4326
            }
            // lazy load the required ArcGIS API for JavaScript modules and CSS
            loadModules(["esri/Map",
                "esri/views/MapView",
                "esri/config",
                "esri/request",
                "esri/Color",
                "esri/Graphic",
                "esri/views/SceneView",
                "esri/widgets/LayerList",
                "esri/layers/WebTileLayer",
                "esri/layers/BaseTileLayer",
                "esri/Basemap",
                "esri/widgets/Zoom",
                "esri/widgets/Measurement",
                "esri/tasks/QueryTask",
                "esri/tasks/support/Query",
                "esri/widgets/Bookmarks",
                "esri/webmap/Bookmark",
                "esri/geometry/Point",
                "esri/widgets/Print",
                "esri/views/draw/Draw",
                "esri/geometry/geometryEngine",
                "esri/geometry/Polygon",
                "esri/geometry/support/webMercatorUtils",
                "esri/geometry/Polyline",
                "dojo/domReady!",
            ], options)
                .then(([Map, MapView, esriConfig, esriRequest, Color, Graphic,
                           SceneView, LayerList, WebTileLayer, BaseTileLayer, Basemap, Zoom, Measurement, QueryTask, query, Bookmarks, Bookmark, Point, Print, Draw, geometryEngine,Polygon,webMercatorUtils,Polyline]) => {
                    // var mapBaseLayer = new WebTileLayer({
                    //     urlTemplate: "http://{subDomain}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
                    //     subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                    //     copyright: '天地图影像图'
                    // });
                    //
                    // var anoBaseLayer = new WebTileLayer({
                    //     urlTemplate: "http://{subDomain}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
                    //     subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                    //     copyright: '天地图影像注记'
                    // });

                    var mapBaseLayer = new WebTileLayer({
                        urlTemplate: "http://{subDomain}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
                        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                        copyright: '天地图'
                    });

                    var anoBaseLayer = new WebTileLayer({
                        urlTemplate: "http://{subDomain}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
                        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                        copyright: '天地图注记'
                    });

                    var imgBasemap = new Basemap({
                        baseLayers: [mapBaseLayer, anoBaseLayer],
                        title: "影像图",
                        id: "img_w",
                        spatialReference: spatialReference
                    });

                    _this.baseMap = new Map({
                        basemap: imgBasemap,
                    });
                    _this.view = new MapView({
                        container: "arcgisMap",
                        map: this.baseMap,
                        center: [105.437583, 28.875387],
                        zoom: 17,
                        highlightOptions: {
                            color: "orange"
                        }
                    });
                    //放大缩小
                    _this.zoom = new Zoom({
                        view: _this.view
                    })
                    //量算
                    _this.measurement = new Measurement({
                        view: _this.view,
                        activeTool: null
                    });
                    //视角书签
                    _this.bookmarks = new Bookmarks({
                        view: _this.view,
                        container: "bmDiv",
                        editingEnabled: true,
                        bookmarks: [
                            new Bookmark({
                                name: "默认",
                                extent: {
                                    spatialReference: {
                                        wkid: 4326
                                    },
                                    xmin: 105.417583,
                                    ymin: 28.864387,
                                    xmax: 105.457583,
                                    ymax: 28.886387
                                }
                            })
                        ]
                    });
                    //坐标点
                    _this.Point = Point;
                    //地图打印
                    _this.view.when(() => {
                        _this.print = new Print({
                            view: _this.view,
                            container: "printDiv",
                            // printServiceUrl:"https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
                            printServiceUrl: "http://192.168.1.200:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
                        })
                    })

                    if (_this.$refs.mapTool) {
                        _this.$refs.mapTool.initMap();
                    }
                    _this.Graphic = Graphic;
                    _this.QueryTask = QueryTask;
                    _this.Query = query;
                    _this.Draw = Draw;
                    _this.geometryEngine = geometryEngine;
                    _this.Polygon = Polygon;
                    _this.webMercatorUtils = webMercatorUtils;
                    _this.Polyline = Polyline;
                });
        },
        beforeDestroy() {
            if (this.view) {
                // destroy the map view
                this.view.container = null;
            }
        },
        methods: {
            setPoiSearchShow() {
                this.$refs.poiSearch.searchShow = !this.$refs.poiSearch.searchShow;
                if (!this.$refs.poiSearch.searchShow) {
                    this.$refs.poiSearch.initSeachForm();
                }
            }
        }
    };

</script>
<style scoped>
  .mainDiv {
    width: 100%;
    height: 100%;
  }

  .arcgisMap {
    width: 100%;
    height: 100%;
  }

  #bmDiv {
    margin-top: 50px;
  }

  .splitScreen {
    width: 50%;
    float: left;
  }

  #printDiv {
    margin-top: 50px;
  }
</style>
<style>
  /*隐藏左上角放大缩小按钮*/
  .esri-ui-top-left {
    display: none !important;
  }
</style>
