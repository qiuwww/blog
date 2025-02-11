<template>
   <Modal
    v-model="show"
    :title="editTitle"
    :mask-closable="false"
    class="tPlotMapLabel"
    :z-index="zindex"
    :width="modalWidth"
    @on-ok="ok"
    @on-cancel="cancel"
  >

    <div :id="divId" :style="{height: height, width: '100%',position:'relative'}">
      <Select
        v-model="searchName"
        filterable
        placeholder="请输入地址"
        class="maogenxiong"
        label-in-value
        @on-query-change="searchbyName"
        @on-change="flyto"
      >
        <Option v-for="(item, i)  in cityList" :key="item.name" :value="item.uid">{{ item.name }}</Option>
      </Select>
      <div class="baseMapZoom">
        <div class="baseMapZoomDiv" @click="mapZoom('in')">
          <svg-icon icon-class="tb_fd_in"/>
        </div>
        <div class="dividerH"></div>
        <div class="baseMapZoomDiv" @click="mapZoom('out')">
          <svg-icon icon-class="tb_fd_out"/>
        </div>
      </div>
      <div class="baseMapDraw" @click="agiandraw()">
        <svg-icon :icon-class="DBdown?'ann_gb_active':'ann_gb'"/>
      </div>
      <div class="baseMapRedect" @click="setEvents()">
        <svg-icon :icon-class="DBupdown?'tb_redact_active':'tb_redact'"/>
      </div>
      <div class="baseMapTool">
        <div class="btnRadar" @click="showmodel()" v-bind:class="{ 'btnRadar-active': dianji2 }">
          <svg-icon icon-class="ann_wx"/>
          <span>已标绘内容</span>
          <div class="dividerDelete"></div>
        </div>
        <!-- <div class="btnGrid">
          <svg-icon icon-class="ann_qy"/>
          <span>网格区域</span>
          <div class="dividerDelete"></div>
        </div> -->
        <div class="btnColumn" v-bind:class="{ 'btnColumn-active': dianji}" @click="changditu()">
          <svg-icon icon-class="ann_ss"/>
          <span>百度地图</span>
        </div>
      </div>

    </div>
  </Modal>
</template>
<script>
import "ol/ol.css";
import Map from "ol/Map";
import { getArea } from "ol/sphere";
import Overlay from "ol/Overlay";
import { getCenter, boundingExtent } from "ol/extent";
import View from "ol/View";
import { LineString, Polygon, Point } from "ol/geom";
import { Draw, Modify, Select, Snap } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Icon, Fill, Stroke, Style, Text } from "ol/style";
import { queryAllList } from "@/api/zhsq/basicGrids/basicGrids";
import { queryAllBasicFileList } from "@/api/zhsq/basicFile/basicFile";
import Feature from "ol/Feature";
import axios from "axios";
import GeoJSON from "ol/format/GeoJSON";
import { getPolygonAndPolyLineAndPoint } from "@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement";
export default {
  name: "plot",
  components: {
    Map,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    menuId: {
      type: String,
    },
    modalTitle: {
      type: String,
      default: "",
    },
    //传回来反显的 坐标点数组
    objData: {
      type: Array,
    },
    //传回来的类型  面 还是  点
    selectType: {
      type: String,
      default: "",
    },
    divId: {
      type: String,
      default: "111",
    },
    modalWidth: {
      type: Number,
      default: 800,
    },
    iconPath: {
      type: String,
      default: "/img/archives/jianzhu.png",
    },
    //面的颜色
    rgbaColor: {
      type: String,
      default: "rgba(0,255,0,0.3)",
    },
  },
  data() {
    return {
      configUrl: "../config/边界.json",
      DBupdown: false,
      select: new Select({
        wrapX: false,
      }),
      zindex: 9000,
      resultPoint: [],
      resultType: "",
      show: this.value, //是否显示
      editTitle: this.modalTitle, //标题
      loading: true,
      height: 0,
      width: 0,
      textinfo: "区域、已标注",
      DBdownclass: false,
      source: new VectorSource(),
      map: null,
      zoom: 16,
      cityList: null,
      searchName: null,
      dianji: false, //高德地图
      dianji2: false, //2.5D
      BtGrid: false, //网格区域
      DBdown: false, //清除重绘
      center: null, //中心点
      Area: null, //面积
      modify: null,
      Copydraw: null,
      searchForm: {
        name: "",
        position: "",
        description: "",
        menuId: null,
        menuName: "",
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null, //开始时间
        endDate: null, //结束时间
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
      },
      vector: new VectorLayer({
        style: new Style({
          fill: new Fill({
            color: this.rgbaColor == "" ? "rgba(0,255,0,0.3)" : this.rgbaColor,
          }),
          stroke: new Stroke({
            color: "#ff0000",
            width: 2,
          }),
          image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: this.iconPath,
          }),
        }),
      }),
      sourcezoology: new VectorSource(), //生态
      vectorzoology: new VectorLayer(),
      sourceGrid: new VectorSource(), //网格
      vectorGrid: new VectorLayer({
        style: new Style({
          stroke: new Stroke({
            color: "#ff0000",
            width: 2,
          }),
        }),
      }),
    };
  },
  methods: {
    //显示已标绘
    showmodel() {
      if (this.dianji2 == false) {
        this.vectorzoology.setZIndex(5);
        this.map.addLayer(this.vectorzoology);
        this.dianji2 = true;
      } else {
        this.map.removeLayer(this.vectorzoology);
        this.dianji2 = false;
      }
    },
    changdituGrid() {
      if (this.BtGrid == false) {
        this.seachGrid();
        // 添加到地图上
        this.map.addLayer(this.vectorGrid);
        this.BtGrid = true;
      } else {
        this.map.removeLayer(this.vectorGrid);
        this.BtGrid = false;
      }
    },
    //叠加高德图层
    changditu() {
      if (this.dianji == false) {
        this.TiandiMap_img = new TileLayer({
          name: "高德图层",
          source: new XYZ({
            url:
              "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            wrapX: false,
          }),
        });
        // 添加到地图上
        this.TiandiMap_img.setZIndex(1);
        this.map.addLayer(this.TiandiMap_img);
        this.dianji = true;
      }
      else {
        this.map.removeLayer(this.TiandiMap_img);
        this.dianji = false;
      }
    },
    changditu2() {
      this.map.removeLayer(this.TiandiMap_img);
      this.dianji = false;
    },
    //清除重绘
    agiandraw() {
      this.resultPoint = [];
      if (this.DBdown) {
        document.getElementsByClassName("ol-layers")[0].classList.remove("canvasPoint")
        this.map.removeInteraction(this.Copydraw);
        this.DBdown = false;
        this.DBdownclass = true;
      } else {
        document.getElementsByClassName("ol-layers")[0].classList.add("canvasPoint")
        this.source.clear(); //清除标绘
        this.addInteraction();
        this.DBdown = true;
        this.DBdownclass = false;
        this.textinfo = "标注";
      }
    },
    //初始化加载底图
    //http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f
    init2() {
      this.map = new Map({
        target: this.divId,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://mt{1-3}.google.cn/vt/lyrs=s&x={x}&y={y}&z={z}",
            }),
            isGroup: true,
            name: "影像图层",
          }),
          new TileLayer({
            source: new XYZ({
              url:
                "http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
            }),
            isGroup: true,
            name: "影像标注图层",
          }),
        ],
        view: new View({
          projection: "EPSG:4326", //使用这个坐标系
          center: [107.093646, 29.53513],
          zoom: 10.5,
        }),
      });
      // this.sourcezoology = new VectorSource({
      //     features: new GeoJSON().readFeatures(this.configUrl),
      //   });
      //  this.vectorGrid.setSource(this.sourceGrid);
      //  this.vectorGrid.setZIndex(11);
    },
    //修改图片sss
    changimage() {
      try {
        this.map.removeLayer(this.vector);
      } catch (err) {}
      //添加矢量图层
      this.vector = new VectorLayer({
        style: new Style({
          fill: new Fill({
            color: this.rgbaColor == "" ? "rgba(0,255,0,0.3)" : this.rgbaColor,
          }),
          stroke: new Stroke({
            color: "#ff0000",
            width: 2,
          }),
          image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: this.iconPath,
          }),
        }),
      });
      this.vector.setZIndex(21);
      this.map.addLayer(this.vector);
    },
    //编辑修改
    setEvents() {
      var _this = this;

      //var selectedFeatures = this.select.getFeatures();
      if (_this.DBupdown) {
        _this.map.removeInteraction(_this.modify);
        _this.map.removeInteraction(_this.select);
        _this.DBupdown = false;
      } else {
        _this.map.addInteraction(_this.modify);
        _this.map.addInteraction(_this.select);
        _this.select.on("select", function (evt) {
          if(evt.deselected.length>0&&evt.deselected[0]){
            _this.resultPoint = evt.deselected[0].values_.geometry;
            _this.resultType =_this.selectType;
          }
        });
          _this.DBupdown = true;
      }
    },
    //查询已绘制区域
    seachGrid() {
      //构造GeoJson
      var GeoJson = {
        type: "FeatureCollection",
        features: [],
      };
      getPolygonAndPolyLineAndPoint({ path: "",type:''}).then((res) => {
        if (res && res.success) {
          var data = res.data[this.selectType];
          //获取信息
          for (var i = 0; i < data.length; i++) {
            var coordinates = [];
            if (data[i].position != "" && data[i].menuId == this.menuId) {
              var objData = JSON.parse(data[i].position);
              if (this.selectType == "Point") {
                coordinates = objData;
              }
              if (this.selectType == "Polygon") {
                var arr = [];
                var newArr = [];
                for (let i = 0; i < objData.length; i++) {
                  newArr.push(objData[i]);
                  if (i % 2 == 1) {
                    arr.push(newArr);
                    newArr = [];
                  }
                }
                coordinates = [arr];
              }
              if (this.selectType == "LineString") {
                var arr = [];
                var newArr = [];
                for (let i = 0; i < objData.length; i++) {
                  newArr.push(objData[i]);
                  if (i % 2 == 1) {
                    arr.push(newArr);
                    newArr = [];
                  }
                }
                coordinates = arr;
              }
              if (coordinates != []) {
                var feature = {
                  type: "Feature",
                  properties: data[i],
                  geometry: {
                    type: this.selectType,
                    coordinates: coordinates,
                  },
                };
                GeoJson.features.push(feature);
              }
            }
          }
        }
        var feature = new GeoJSON().readFeatures(GeoJson);
        feature.forEach((element) => {
          element.setStyle(
            new Style({
              text: new Text({
                font: "bold 14px 宋体",
                overflow: false, //超出显示
                text: element.values_.name,
                fill: new Fill({
                  color: "#ffa600",
                }),
              }),
              fill: new Fill({
                color: "rgba(0,255,0,0.3)",
              }),
              stroke: new Stroke({
                color: "#ffa600",
                width: 1,
              }),
              image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: "fraction",
                anchorYUnits: "pixels",
                src: "/img/scenicSpotIcon/99.png",
              }),
            })
          );
        });
        this.sourcezoology = new VectorSource({
          features: feature,
        });
        this.vectorzoology.setSource(this.sourcezoology);
      });
    },
    addInteraction() {
      var that = this;
      var draw; // global so we can remove it later
      var value = this.selectType;
      if (value !== "None") {
        draw = new Draw({
          source: this.source,
          type: this.selectType,
          //freehand: true//自由作画
        });
        that.Copydraw = draw;
        that.map.addInteraction(draw);
      }
      draw.on("drawend", function (evt) {
        that.resultPoint = evt.feature.values_.geometry;
        that.resultType = value;
        //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
        var extent2 = boundingExtent(
          evt.feature.values_.geometry.getCoordinates()[0]
        );
        //获取边界区域的中心位置
        that.center = getCenter(extent2);
        var area = getArea(evt.feature.values_.geometry, {
          projection: "EPSG:4326",
        });
        //获取所绘制面的面积单位平方米
        that.Area = Math.round(area * 100) / 100;
        that.map.removeInteraction(draw);
        that.DBdown = false;
        document.getElementsByClassName("ol-layers")[0].classList.remove("canvasPoint")
        that.DBdownclass = false;
        that.textinfo = "区域、已标注";
      });
      draw.on("drawstart", function (evt) {
        that.source.clear(); //清除标绘
      });
    },
    //通过名称搜索
    searchbyName(e) {
      if (e) {
        this.search(
          "http://api.map.baidu.com/place/v2/search?query=" +
            e +
            "&region=全国&page_size=5&page_num=0&output=json&ak=sxMgsosi2Azrl0g56GjEh76GZuGa7i1Q"
        );
      }
    },
    //搜索功能
    search(Surl) {
      let _this = this;
      $.ajax({
        //url中的参数含义参见百度地图官网webAPI文档
        url: Surl,
        type: "GET",
        async: false,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "callback",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
          if (data.status != 0) {
          } else if (data.results.length == 0) {
          } else {
            _this.cityList = data.results;
          }
        },
        error: function (data) {},
      });
    },
    //初始化标绘内容
    init() {
      var that = this;
      this.source.clear(); //清除标绘
      var feature;
      if (this.objData && this.objData.length != 0) {
        that.textinfo = "区域、已标注";
        that.DBdownclass = false;
        if (that.selectType == "Point") {
          var mypoint = new Point(this.objData);
          this.resultPoint = mypoint;
          feature = new Feature(mypoint);
          //坐标点样式
          let pointStyle = new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: this.iconPath,
            }),
          });
          feature.setStyle(pointStyle);
        }
        if (that.selectType == "Polygon") {
          var arr = [];
          var newArr = [];
          for (let i = 0; i < this.objData.length; i++) {
            newArr.push(this.objData[i]);
            if (i % 2 == 1) {
              arr.push(newArr);
              newArr = [];
            }
          }
          var myPolygon = new Polygon([arr]);
          this.resultPoint = myPolygon;
          feature = new Feature(myPolygon);
        }
        if (that.selectType == "LineString") {
          var arr = [];
          var newArr = [];
          for (let i = 0; i < this.objData.length; i++) {
            newArr.push(this.objData[i]);
            if (i % 2 == 1) {
              arr.push(newArr);
              newArr = [];
            }
          }
          var myLineString = new LineString(arr);
          this.resultPoint = myLineString;
          feature = new Feature(myLineString);
        }
        this.source.addFeatures([feature]);
      }

      this.vector.setSource(this.source);
      //反显定位
      if (this.objData && this.objData.length != 0) {
        this.map.getView().setCenter(getCenter(feature.getGeometry().getExtent()));
        var zoom = this.getZoom(feature.getGeometry().getExtent());
        if (this.selectType != "Point") {
          zoom = zoom + 8;
        }
        this.map.getView().setZoom(zoom);
      } else {
        this.map.getView().setCenter([107.093646, 29.53513]);
        this.map.getView().setZoom(10.5);
      }
      this.zoom=this.map.getView().getZoom();
      that.select=new Select({
            wrapX: false,
            layers:[this.vector],
        });
      that.modify = new Modify({
          features: that.select.getFeatures(),
      });
      //this.addInteraction();
    },
    //底图缩放
    mapZoom(str) {
      if (str) {
        if (str === "in") {
          this.zoom = this.zoom + 1
        } else {
          this.zoom = this.zoom - 1
        }
        this.map.getView().setZoom(this.zoom)
      }
    },
    //获取层级
    getZoom(val) {
      var maxLng;
      var minLng;
      var maxLat;
      var minLat;
      if (val[0] > val[2]) {
        maxLng = val[0];
        minLng = val[2];
      } else {
        maxLng = val[2];
        minLng = val[0];
      }
      if (val[1] > val[3]) {
        maxLat = val[1];
        minLat = val[3];
      } else {
        maxLat = val[3];
        minLat = val[1];
      }
      var zoom = [
        "50",
        "100",
        "200",
        "500",
        "1000",
        "2000",
        "5000",
        "10000",
        "20000",
        "25000",
        "50000",
        "100000",
        "200000",
        "500000",
        "1000000",
        "2000000",
      ]; //级别18到3。
      var distance = this.GetDistance(maxLat, maxLng, minLat, minLng);
      for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
        if (zoom[i] - distance > 0) {
          return 18 - i; //之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
        }
      }
    },
    //获取两点距离
    GetDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = lat1;
      var radLat2 = Number(lat2);
      var a = Number(radLat1 - radLat2);
      var b = lng1 - lng2;
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10;
      return s;
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    ok() {
      this.$emit("resultPoint", this.resultPoint, this.resultType);
      this.closeModal(false);
    },
    cancel() {
      this.closeModal(false);
    },
    flyto(e) {
      this.cityList.forEach((element) => {
        if ((element.uid = e)) {
          var new_lonlat = [element.location.lng, element.location.lat];
          this.map.getView().setCenter(new_lonlat);
        }
      });
    },
  },
  mounted() {},
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
        let that = this;
        setTimeout(function () {
          if (that.dianji) {
            that.changditu();
          }
          if (that.map == null) {
            that.init2();
            that.changimage();
          } else {
            that.changimage();
          }
          if (that.DBdown) {
            that.agiandraw();
          } else {
            that.DBdown = false;
          }
          if (that.DBupdown) {
            that.setEvents();
          }
          that.init();
          if (!that.dianji2) {
            that.seachGrid();
            that.showmodel();
          } else {
            that.seachGrid();
          }
        }, 1);
      } else {
        this.closeModal(val);
      }
    },
  },
  created() {
    this.height = Math.floor(document.body.scrollHeight * 0.65) + "px";
    this.width = Math.floor(document.body.scrollWidth * 0.6) + "px";
  },
};
</script>
<style lang="less">
.tPlotMapLabel {
    .map {
      width: 100%;
      height: 400px;
    }

    .ol-zoom {
      right: 10px;
      left: auto;
    }

    .ol-tooltip {
      position: relative;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      opacity: 0.7;
      white-space: nowrap;
      font-size: 12px;
    }

    .ol-tooltip-measure {
      opacity: 1;
      font-weight: bold;
    }

    .ol-tooltip-static {
      background-color: #ffcc33;
      color: black;
      border: 1px solid white;
    }

    .ol-tooltip-measure:before,
    .ol-tooltip-static:before {
      border-top: 6px solid rgba(0, 0, 0, 0.5);
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
      content: "";
      position: absolute;
      bottom: -6px;
      margin-left: -7px;
      left: 50%;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #a0a8b5;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #a0a8b5;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #a0a8b5;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #a0a8b5;
    }

    .ol-tooltip-static:before {
      border-top-color: #ffcc33;
    }

    .ol-zoom-out, .ol-zoom-in {
      display: none;
    }

    .ivu-modal-header {
      border-bottom: 0px solid #e8eaec;
    }

    .ivu-modal-body {
      padding-top: 0px;
    }

    .ivu-select-single .ivu-select-selection {
      height: 48px;
    }

    .ivu-select-input {
      height: 48px;
      line-height: 48px;
    }

    .dividerDelete {
      width: 2px;
      margin-right: 10px;
      height: 32px;
      background: #e5e5e5;
      float: right;
      position: relative;
      bottom: 5px;
    }

    .dividerH {
      width: 24px;
      height: 1px;
      background: #e8e8ea;
      margin-left: 12px;
    }

    .colorbutton {
      color: #57a3f3;
    }

    .maogenxiong {
      position: absolute;
      top: 10px;
      z-index: 9999;
      left: 10px;
      width: 420px;
      height: 48px;


    }

    .btn-agiandraw {
      margin-right: 0px;
      position: absolute;
      z-index: 100;
      right: 10px;
      bottom: 20px;
    }

    .baseMapTool {
      display: flex;
      justify-content: center;
      padding: 10px;
      z-index: 100;
      position: absolute;
      bottom: 20px;
      right: 172px;
      width: 256px;
      height: 48px;
      background: #ffffff;
      border: 1px solid #e0e2e4;
      border-radius: 4px;
      box-shadow: 0px 2px 4px 0px rgba(86, 89, 91, 0.16);
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #3e3e3e;
      padding-top: 12px;
      padding-left: 20px;

      .btnRadar {
        cursor: pointer;
        width: 140px;

        span {
          position: relative;
          bottom: 6px;
          left: 6px;
        }
      }

      .btnGrid {
        cursor: pointer;
        width: 110px;

        span {
          position: relative;
          bottom: 6px;
          left: 6px;
        }
      }

      .btnColumn {
        cursor: pointer;
        width: 110px;

        span {
          position: relative;
          bottom: 6px;
          left: 6px;
        }
      }

      .btnRadar-active, .btnRadar:hover {
        color: #3083f2;
      }

      .btnGrid-active, .btnGrid:hover {
        color: #3083f2;
      }

      .btnColumn-active, .btnColumn:hover {
        color: #3083f2;
      }

      .svg-icon {
        height: 24px;
        width: 24px;
      }
    }

    .baseMapZoom {
      width: 48px;
      height: 97px;
      background: #ffffff;
      border: 1px solid #e0e2e4;
      border-radius: 4px;
      box-shadow: 0px 2px 4px 0px rgba(86, 89, 91, 0.16);
      z-index: 100;
      position: absolute;
      bottom: 106px;
      right: 20px;

      .baseMapZoomDiv {
        height: 50%;
        padding: 12px;

        .svg-icon {
          height: 24px;
          width: 24px;
          cursor: pointer;
        }
      }

    }
    .baseMapRedect{
      position: absolute;
      bottom: 11px;
      right: 87px;
      width: 72px;
      height: 72px;
      z-index: 100;
      padding: 6px;
      .svg-icon {
        height: 100%;
        width: 100%;
      }
    }
    .baseMapDraw {
      position: absolute;
      bottom: 11px;
      right: 10px;
      width: 72px;
      height: 72px;
      z-index: 100;

      .svg-icon {
        height: 100%;
        width: 100%;
      }

    }
    .canvasPoint{
      cursor: url('/img/archives/dt_gb.png'),auto;
    }
  }
</style>
