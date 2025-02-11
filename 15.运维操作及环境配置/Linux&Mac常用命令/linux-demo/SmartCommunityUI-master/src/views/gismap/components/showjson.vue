<template>
  <Modal
    v-model="show"
    title="查看"
    :mask-closable="false"
    class="tSubstances"
    footer-hide
    draggable
    :width="modalWidth"
  >
    <div id="content" :style="{height: height, width: '100%'}">
      <div :id="divId" style="height: 100%;width: 100%;"></div>
      <!-- 弹窗div -->
      <!-- <div :id="popupId" class="ol-popup">
        <a href="#" :id="popupCloseId" class="ol-popup-closer"></a>
        <div :id="popupContentId"></div>
      </div> -->
    </div>
    <!-- <div>
                <Button @click="showGJ2">显示geojson2</Button>
    </div>-->
  </Modal>
</template>
<script>
    import "ol/ol.css";
    import axios from "axios";
    import {Map, View} from "ol";
    import TileLayer from "ol/layer/Tile";
    import XYZ from "ol/source/XYZ";
    import GeoJSON from "ol/format/GeoJSON";
    import {Vector as VectorSource} from "ol/source";
    import {Vector as VectorLayer} from "ol/layer";
    import {Fill, Stroke, Style} from "ol/style";
    import Select from "ol/interaction/Select";
    import {click, pointerMove} from "ol/events/condition";
    import Overlay from "ol/Overlay";
    import {LineString, Polygon, Point} from "ol/geom";
    import Feature from "ol/Feature";
    import{loadFile} from '../../../api/zhsq/basicFile/basicFile'

    export default {
        name: "ShowGeojson",
        components: {
            Map,
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            modalTitle: {
                type: String,
            },
            jsonUrl: {
                type: String,
                default: "",
            },
            divId: {
                type: String,
                default: "13fdsh",
            },
            modalWidth: {
                type: Number,
                default: 800,
            },
            backgroundColor: {
                type: String,
                default: "#00ff48",
            },
        },
        data() {
            return {
                popupId: this.uuid2(),
                popupContentId: this.uuid2(),
                popupCloseId: this.uuid2(),
                show: this.value, //是否显示
                editTitle: this.modalTitle, //标题
                loading: true,
                height: 0,
                width: 0,
                map: null,
                vectorSource: new VectorSource(),
                vectorLayer: new VectorLayer(),
            };
        },
        methods: {
            showGJ2() {
                if (this.map == null) {
                    this.init2();
                }
                this.vectorSource.clear();
                //this.ShowGeoJSON2("http://139.129.103.13:8013/gnyj/data/exp.json");
                //this.ShowGeoJSON2(this.jsonUrl);

              let substring = this.jsonUrl.toString().substring(this.jsonUrl.toString().lastIndexOf('/'), this.jsonUrl.toString().length)
              loadFile(substring).then(res => {
                this.ShowGeoJSON2(res.data)
              }).catch(res => {
                  this.$Message.error("JSON 文件格式不正确！")
              });
            },
            //展示GeoJSON
            ShowGeoJSON2(data) {
                // axios({
                //     url: url,
                // }).then((res) => {
                    let pJSON = new GeoJSON().readFeatures(data)
                    for (let i = 0; i < pJSON.length; i++) {
                        if (pJSON[i] != undefined && pJSON[i] != null) {
                            pJSON[i].setStyle(
                                new Style({
                                    stroke: new Stroke({
                                        color: "black",
                                        width: 1,
                                    }),
                                    fill: new Fill({
                                        color: this.backgroundColor,
                                    }),
                                })
                            );
                        }
                    }
                    let that = this;
                    this.vectorSource.addFeatures(pJSON);
                    this.vectorLayer.setSource(this.vectorSource);
                    var coordinate = pJSON[0].values_.geometry.getCoordinates();
                    var center;
                    for (let i = 0; i < 3; i++) {
                        if (Array.isArray(coordinate)) {
                            var coordinate2 = coordinate[0];
                            if (Array.isArray(coordinate2)) {
                                coordinate = coordinate[0];
                            } else {
                                center = [coordinate[0], coordinate[1]];
                            }
                        }
                    }
                    this.map.getView().setZoom(8);
                    this.map.getView().setCenter(center);

                    var selectPointerMove = new Select({
                        condition: pointerMove,
                    });
                    // var select = new Select({
                    //     condition: click,
                    // });
                    //this.map.addInteraction(select);
                    this.map.addInteraction(selectPointerMove);
                    // var container = document.getElementById(this.popupId);
                    // var content = document.getElementById(this.popupContentId);
                    // var popupCloser = document.getElementById(this.popupCloseId);
                    // var overlayer = new Overlay({
                    //     element: container,
                    //     autuPan: true,
                    // });
                    // var changeInteraction = function () {
                    //     select.on("select", function (e) {
                    //         if (e.selected.length != e) {
                    //             let coordinate = e.mapBrowserEvent.coordinate;
                    //             //let properties = e.selected[0].getProperties();
                    //             content.innerHTML =
                    //                 `
                    //                  <table id="routeBox">
                    //                         <tbody>
                    //                             <tr>
                    //                             </tr>
                    //                             <tr>
                    //                                 <td>姓名：</td>
                    //                                 <td>` +"11" +`</td>
                    //                             </tr>
                    //                         </tbody>
                    //                     </table>
                    //                 `;
                    //             // 调整overlayer层的位置
                    //             overlayer.setPosition(coordinate);
                    //             // 将overlayer层添加到map当中
                    //             that.map.addOverlay(overlayer);
                    //         } else {
                    //             overlayer.setPosition(undefined);
                    //         }
                    //     });
                    // };
                    // changeInteraction();
                    // popupCloser.addEventListener("click", function () {
                    //   overlayer.setPosition(undefined);
                    //   // 恢复点的样式
                    // });
                // }).catch(res =>{
                //     this.$Message.error("JSON 文件格式不正确！")
                // });
            },
            //进入执行加载底图
            init2() {
                this.map = new Map({
                    target: this.divId,
                    layers: [
                        new TileLayer({
                            source: new XYZ({
                                url:
                                    "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
                            }),
                            isGroup: true,
                            name: "高德地图",
                        }),
                    ],
                    view: new View({
                        projection: "EPSG:4326", //使用这个坐标系
                        center: [120.382609,36.067108], // [122.03826396843246,39.95882481966137], // 泸州[105.363867, 28.75983]
                        zoom: 20,
                    }),
                });
                this.vectorLayer.setZIndex(10); //设置显示级别
                this.map.addLayer(this.vectorLayer);
            },
            // RandomColor() {
            //     let r, g, b;
            //     r = Math.floor(Math.random() * 256);
            //     g = Math.floor(Math.random() * 256);
            //     b = Math.floor(Math.random() * 256);
            //     return "rgb(" + r + "," + g + "," + b + "," + 0.5 + ")";
            // },
            closeModal(val) {
                this.$emit("input", val);
            },
            uuid2(len, radix) {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
                    ""
                );
                var uuid = [],
                    i;
                radix = radix || chars.length;

                if (len) {
                    // Compact form
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
                } else {
                    // rfc4122, version 4 form
                    var r;

                    // rfc4122 requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
                    uuid[14] = "4";

                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | (Math.random() * 16);
                            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join("");
            },
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                if (val) {
                    let that = this;
                    setTimeout(function () {
                        that.showGJ2();
                    }, 1);
                } else {
                    this.closeModal(val);
                }
            },
        },
        created() {
            this.height = Math.floor(document.body.scrollHeight * 0.65) + "px";
            this.width = Math.floor(document.body.scrollWidth * 0.95) + "px";
        },
    };
</script>

<style>
  /* 弹窗样式*/
  .ol-popup {
    position: absolute;
    background-color: #fff;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
  }

  .ol-popup:after,
  .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .ol-popup:after {
    border-top-color: #fff;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }

  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }

  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }

  .ol-popup-closer:after {
    content: "✖";
  }
</style>
