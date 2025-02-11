<template>
    <div class="otherArcgisMap" v-if="show">
        <div class="arcgisMap" id="otherArcgisMap"></div>
        <splitScreenmanagerLayer v-model="layersIndex"></splitScreenmanagerLayer>
    </div>
</template>
<script>
    import {loadModules} from 'esri-loader';
    import splitScreenmanagerLayer from "./splitScreenmanagerLayer";
    import {MapConfig} from '@/api/zhgw/config';

    export default {
        props:{
            value: {
                type: Boolean,
                default: false,
            }
        },
        components: {
            splitScreenmanagerLayer,
        },
        data() {
            return {
                show:this.value,
                options: this.$parent.options,
                baseMap:null,
                view:null,
                layersIndex: this.value,
                layersNode: null,
                layerList: [],
                mapConfig: MapConfig,
            }
        },
        methods:{
            //加载地图
            loadMap(){
                let spatialReference = {
                    wkid: 4326
                };
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
                    "dojo/domReady!",
                ], this.options)
                    .then(([Map, MapView, esriConfig, esriRequest, Color,Graphic,
                            SceneView, LayerList, WebTileLayer, BaseTileLayer, Basemap,Zoom,Measurement,QueryTask,query]) => {
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

                        this.baseMap = new Map({
                            basemap: imgBasemap,
                        });

                        this.view = new MapView({
                            container: "otherArcgisMap",
                            map: this.baseMap,
                            center: [105.437583, 28.875387],
                            zoom: 13
                        });

                        //联动
                        this.view.on(["mouse-wheel", "drag", "hold"],event => {
                            setTimeout(() => {
                                this.$parent.view.viewpoint = this.view.viewpoint;
                            }, 80);
                        })
                        this.$parent.view.on(["mouse-wheel", "drag", "hold"],event => {
                            setTimeout(() => {
                                this.view.viewpoint = this.$parent.view.viewpoint;
                            }, 80);
                        })

                        if (this.layersIndex != undefined && this.layersIndex != null) {
                            this.layersIndex = !this.layersIndex;
                        }
                    })
                }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                if(val){
                    this.loadMap();
                }else{
                    this.layersIndex = false;
                }
            },
            layersIndex(val){
                if(!val){
                    this.$parent.showSplitScreen = false;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .otherArcgisMap{
        width:50%;
        height: 100%;
        float:left;
        .arcgisMap {
            width: 100%;
            height: 100%;
        }
    }
</style>