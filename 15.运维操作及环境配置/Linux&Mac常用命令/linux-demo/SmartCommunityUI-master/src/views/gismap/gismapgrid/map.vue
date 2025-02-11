<template>
  <div id="content" style="height: 100%;">
    <div id="map" style="height: 100%;"></div>
    <leftSearchList ref="child"></leftSearchList>
    <div class="mabg">
      <span class="overview-gps" id="gpsnone" @click="setClass(flag)">
        <img src="/img/archives/gps-ic.png" />
        <em>{{gridPersonNumber}}</em>
      </span>

      <span class="overview-gps" id="gpsnone2" @click="setClass2(flag2)">
        <img src="/img/archives/shijian-ic.png" />
        <em>{{eventDataNunber}}</em>
      </span>
    </div>
    <div class="top_title">
      <img
        @click="changluyou()"
        src="/img/faviconmap/home.svg"
        style="width: 25px;position: absolute;transform: translate(50%, 50%);cursor: pointer;"
      />
      <label class="top_title_font-size">智慧治理指挥中心</label>
      <label class="top_title_font-size2">你好! {{usernamemap}}</label>
      <div style="position: absolute;right: -150px;width:440px;overflow:hidden;height:60px">
        <iframe
          id="weather"
          width="380"
          scrolling="no"
          height="60"
          frameborder="0"
          allowtransparency="true"
          src="http://i.tianqi.com/index.php?c=code&amp;id=12&amp;color=%23FFFFFF&amp;icon=5&amp;num=1"
          class="agine"
        ></iframe>
      </div>
      <label class="top_title_font-size3">{{timedata2}}</label>
      <div class="gps-time">{{timedata}}</div>
    </div>
    <div class="bottom_img">
      <img
        @click="statistics()"
        src="/img/faviconmap/ico_105302.png"
        style="width:32px;cursor: pointer;"
      />
      <em class="effect-tip"></em>
    </div>
    <div v-if="statisticsshow">
      <Statistics
        :echarscolor="echarscolor"
        :echarschart="echarschart"
        v-bind:class="{'statistics_background':Ismapchang,'statistics_background2':Ismapchang2}"
      />
    </div>
    <div
      id="GeoSmarter_Widget_Map_Layer_Chart_90-geoshow-geoglobemap-chartselector"
      class="geoshow-geoglobemap-chartselector"
    >
      <span class="btn-backdrop"></span>
      <span class="btn-3dmap" @click="threeDmapshow()">
        <i>3维地图</i>
      </span>
      <span
        class="btn-zoology"
        @click="changdituzoology()"
        v-bind:class="{'bottom_background':Btzoology}"
      >
        <i>生态布局</i>
      </span>
      <span
        class="btn-industry"
        @click="changdituindustry()"
        v-bind:class="{'bottom_background':Btindustry}"
      >
        <i>产业布局</i>
      </span>
      <span class="btn-radar" @click="changdituGrid()" v-bind:class="{'bottom_background':BtGrid}">
        <i>网格区域</i>
      </span>
      <span class="btn-line" @click="changditu()" v-bind:class="{'bottom_background':dianji}">
        <i>高德地图</i>
      </span>
      <span
        class="btn-column"
        @click="changditu2()"
        v-bind:class="{'bottom_background':dianjimodel}"
      >
        <i>2.5维地图</i>
      </span>
      <span class="btn-pie active">
        <i>谷歌地图</i>
      </span>
    </div>
    <lookBuildingArchives2
      v-model="buildingShow2"
      :TBuildingArchivesId="TBuildingArchivesId"
      modalTitle="设施查看"
    ></lookBuildingArchives2>
  </div>
</template>
<script>
import "ol/ol.css";
import axios from "axios";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import WMTS from "ol/source/WMTS";
import { formartDate } from "@/api/tools/tool";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Icon, Fill, Stroke, Style, Text } from "ol/style";
import Statistics from "../components/statistics.vue";
import leftSearchList from "../components/leftSearchList";
import { altKeyOnly, click, pointerMove } from "ol/events/condition";
import { queryAllList } from "@/api/zhsq/basicGrids/basicGrids";
import { queryAllBasicFileList } from "@/api/zhsq/basicFile/basicFile";
import { queryTBuildingArchivesAll } from "@/api/zhsq/tBuildingArchives/tBuildingArchives";
import lookBuildingArchives2 from "../../zhsq/tBuildingArchives/lookBuildingArchives";
import { Polygon, Point } from "ol/geom";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import { nginxUrl } from "@/api/tools/tool";
export default {
  data() {
    return {
      gridPersonNumber: 0,
      eventDataNunber: 0,
      map: null,
      timedata: null,
      timedata2: null,
      buildingShow2: false, //设施查看
      TBuildingArchivesId: "", //设施id
      dianji: false, //高德地图
      dianjimodel: false, //2.5D
      BtGrid: false, //网格区域
      Btzoology: false, //生态
      Btindustry: false, //产业
      statisticsshow: false,
      isradar: false,
      Ismapchang: false,
      Ismapchang2: true,
      echarscolor: "#ffffff",
      usernamemap: "无信息",
      echarschart: ["人口", "下沙河社区"],
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
      sourceGrid: new VectorSource(), //网格
      vectorGrid: new VectorLayer({
        style: new Style({
          stroke: new Stroke({
            color: "#ff0000",
            width: 2,
          }),
        }),
      }),
      sourceindustry: new VectorSource(), //产业
      vectorindustry: new VectorLayer(),
      sourcezoology: new VectorSource(), //生态
      vectorzoology: new VectorLayer(),
      sourcebuild: new VectorSource(), //设施
      vectorbuild: new VectorLayer(),
    };
  },
  components: {
    Statistics,
    leftSearchList,
    lookBuildingArchives2,
  },
  methods: {
    //展示3维地图
    threeDmapshow() {
      window.open(window.location.origin + "/3dmap");
    },
    //生态范围区域
    changdituzoology() {
      if (this.Btzoology == false) {
        this.map.addLayer(this.vectorzoology);
        this.Btzoology = true;
      } else {
        this.map.removeLayer(this.vectorzoology);
        this.Btzoology = false;
      }
    },
    //产业区域
    changdituindustry() {
      if (this.Btindustry == false) {
        this.map.addLayer(this.vectorindustry);
        this.Btindustry = true;
      } else {
        this.map.removeLayer(this.vectorindustry);
        this.Btindustry = false;
      }
    },
    //网格范围区域
    changdituGrid() {
      if (this.BtGrid == false) {
        // 添加到地图上
        this.map.addLayer(this.vectorGrid);
        this.BtGrid = true;
      } else {
        this.map.removeLayer(this.vectorGrid);
        this.BtGrid = false;
      }
    },
    changluyou() {
      location.href = "http://localhost:8013/dashboard"; //返回主界面
    },
    //更换2.5维图层
    changditu2() {
      if (this.dianjimodel == false) {
        this.TiandiMap_img2 = new TileLayer({
          name: "2.5维图层",
          source: new XYZ({
            url: "http://218.88.215.93:8014/sw/{z}/{x}/{y}.png",
            wrapX: false,
          }),
        });
        this.TiandiMap_img2.setZIndex(2);
        // 添加到地图上
        this.map.addLayer(this.TiandiMap_img2);
        this.dianjimodel = true;
      } else {
        this.map.removeLayer(this.TiandiMap_img2);
        this.dianjimodel = false;
      }
    },
    //切换图标
    setClass(flag) {
      if (flag) {
        document.getElementById("gpsnone").className = "overview-gps";
        this.$refs.child.clearGridPersonPoint();
      } else {
        document.getElementById("gpsnone").className = "overview-gps pon";
        this.$refs.child.showGridPersonPoint();
      }
      this.flag = !flag;
    },
    //切换高亮
    setClass2(flag) {
      if (flag) {
        document.getElementById("gpsnone2").className = "overview-gps";
        this.$refs.child.clearEventPoint();
      } else {
        document.getElementById("gpsnone2").className = "overview-gps pon";
        this.$refs.child.showEventPoint();
      }
      this.flag2 = !flag;
    },
    //切换高德地图
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
        //添加class样式
        this.Ismapchang = true;
        this.Ismapchang2 = false;
        this.echarscolor = "#000000";
        this.dianji = true;
      } else {
        this.map.removeLayer(this.TiandiMap_img);
        this.dianji = false;
        this.Ismapchang = false;
        this.Ismapchang2 = true;
        this.echarscolor = "#ffffff";
      }
    },
    //图片点击事件
    statistics() {
      this.statisticsshow = !this.statisticsshow;
    },
    //获取时间信息
    gettime() {
      let that = this;
      setInterval(function () {
        that.timedata2 = formartDate(new Date(), "HH:mm:ss");
        that.timedata = formartDate(new Date(), "yyyy.MM.dd");
      }, 1000);
    },
    //获取cookie字段信息
    getcookies(name) {
      //获取cookie字符串
      var strCookie = document.cookie;
      //将多cookie切割为多个名/值对
      var arrCookie = strCookie.split("%2C");
      var userId;
      //遍历cookie数组，处理每个cookie对
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("%22");
        //找到名称为username的cookie，并返回它的值
        if (name == arr[1]) {
          userId = arr[3];
          return userId;
        }
      }
      return "无数据";
    },
    //进入执行加载底图
    //http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}谷歌影像
    //http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}高德
    //http://www.google.cn/maps/vt?lyrs=s,h&gl=cn&x={x}&y={y}&z={z}//影像标注
    //http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f//天地图
    //http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f//标注
    init() {
      //定义Google切片参数
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url:
                "http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
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
          center: [105.363867, 28.75983], //纳溪
          zoom: 15.5,
        }),
      });
      //设置图层层级
      this.vector.setZIndex(12);
      this.vectorbuild.setZIndex(11);
      this.vectorGrid.setZIndex(10);
      this.vectorindustry.setZIndex(9);
      this.vectorzoology.setZIndex(8);
      this.vectorbuild.setSource(this.sourcebuild);
      this.vectorGrid.setSource(this.sourceGrid);
      this.vectorindustry.setSource(this.sourceindustry);
      this.vectorzoology.setSource(this.sourcezoology);
      var _this = this;
      let pointerMoveSelected = null;
      var style = new Style({
        stroke: new Stroke({
          color: "#ffa600",
          width: 4,
        }),
        fill: new Fill({
          color: "#00ff484D",
        }),
      });
      var style2 = new Style({
        stroke: new Stroke({
          color: "#00000000",
          width: 4,
        }),
        fill: new Fill({
          color: "#00000000",
        }),
      });
      //鼠标移动事件
      this.map.on("pointermove", function (e) {
        _this.sourcebuild.getFeatures().forEach((element) => {
          element.setStyle(style2);
        });
        pointerMoveSelected = null;
        _this.map.forEachFeatureAtPixel(e.pixel, function (f) {
          pointerMoveSelected = f;
        });
        if (pointerMoveSelected != null) {
          let properties = pointerMoveSelected.getProperties();
          if (properties.type == "Housinginformation") {
            pointerMoveSelected.setStyle(style);
          }
        }
      });
      let selected = null;
      //鼠标点击事件
      this.map.on("click", function (e) {
        selected = null;
        _this.map.forEachFeatureAtPixel(e.pixel, function (f) {
          selected = f;
        });
        if (selected != null) {
          let properties = selected.getProperties();
          if (properties.type == "Housinginformation") {
            _this.TBuildingArchivesId = properties.id; //设施id
            _this.buildingShow2 = true; //设施查看
          }
        }
      });
      this.map.addLayer(this.vector);
      this.map.addLayer(this.vectorbuild);
      this.$refs.child.initMapFeature();
    },
    //查询所有网格区域范围
    seach() {
      queryAllList({}).then((res) => {
        if (res && res.success) {
          res.data.forEach((element) => {
            if (element.position) {
              let objData = JSON.parse(element.position);
              var arr = [];
              var newArr = [];
              for (let i = 0; i < objData.length; i++) {
                newArr.push(objData[i]);
                if (i % 2 == 1) {
                  arr.push(newArr);
                  newArr = [];
                }
              }
              var myPolygon = new Polygon([arr]);
              var feature = new Feature(myPolygon);
              feature.setStyle(
                new Style({
                  stroke: new Stroke({
                    color: "#ff0000",
                    width: 4,
                  }),
                  text: new Text({
                    font: "bold 18px 宋体",
                    overflow: true, //超出显示
                    text: element.communityName + element.name,
                    fill: new Fill({
                      color: "#ffa600",
                    }),
                  }),
                })
              );
              this.sourceGrid.addFeature(feature);
            }
          });
        }
      });
    },
    //查询所有json文件
    seach2() {
      queryAllBasicFileList({}).then((res) => {
        if (res && res.success) {
          res.data.forEach((element) => {
            this.SaveGeoJSON2(element);
          });
        }
      });
    },
    //查询设施信息
    seachbuild() {
      queryTBuildingArchivesAll({})
        .then((res) => {
          if (res && res.success) {
            res.data.forEach((element) => {
              if (element.location) {
                let objData = JSON.parse(element.location);
                var arr = [];
                var newArr = [];
                for (let i = 0; i < objData.length; i++) {
                  newArr.push(objData[i]);
                  if (i % 2 == 1) {
                    arr.push(newArr);
                    newArr = [];
                  }
                }
                var myPolygon = new Polygon([arr]);
                var feature = new Feature(myPolygon);
                feature.Housinginformationid = element.id;
                let properties = {
                  id: element.id,
                  type: "Housinginformation",
                  name: element.name,
                  feature: [arr],
                };
                feature.setProperties(properties);
                feature.setStyle(
                  new Style({
                    stroke: new Stroke({
                      color: "#00000000",
                      width: 4,
                    }),
                    fill: new Fill({
                      color: "#00000000",
                    }),
                  })
                );
                this.sourcebuild.addFeature(feature);
              }
            });
          } else {
            this.$Message.error("数据加载失败！");
          }
        })
        .catch((res) => {
          this.$Message.error("数据加载失败！");
        });
    },
    //保存GeoJSON文件中的图形
    SaveGeoJSON2(element) {
      let url = nginxUrl + element.filePath;
      let color;
      if (element.fillColor) {
        color = element.fillColor;
      } else {
        color = "#00ff48";
      }
      axios({
        url: url,
      })
        .then((res) => {
          let pJSON = new GeoJSON().readFeatures(res.data);
          for (let i = 0; i < pJSON.length; i++) {
            if (pJSON[i] != undefined && pJSON[i] != null) {
              pJSON[i].setStyle(
                new Style({
                  stroke: new Stroke({
                    color: "black",
                    width: 1,
                  }),
                  fill: new Fill({
                    color: color,
                  }),
                })
              );
            }
          }
          //产业
          if (element.type == 1) {
            this.sourceindustry.addFeatures(pJSON);
          }
          //生态
          else if (element.type == 2) {
            this.sourcezoology.addFeatures(pJSON);
          }
        })
        .catch((res) => {
          //this.$Message.error("JSON 文件格式不正确！");
        });
    },
  },
  mounted() {
    this.seachbuild();
    this.seach();
    this.seach2();
    this.init();
    this.gettime();
    this.changditu2();
    this.setClass();
    this.setClass2();
  },
  created() {
    this.usernamemap = this.getcookies("username"); //获取当前登陆名称
  },
};
</script>
<style>
.ol-zoom {
  display: none;
}

/* 弹窗样式*/
.title {
  background: url(/img/faviconmap/popDiv_bg.png);
  border: 1px solid #000;
  border-radius: 3px 3px 3px 3px;
  display: block;
  font-size: 12px;
  left: -50%;
  line-height: 1;
  padding: 5px;
  position: relative;
  white-space: nowrap;
  z-index: 0;
  color: #fff;
  padding: 10px;
  line-height: 22px;
}

.title:after,
.title:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.title:after {
  border-top-color: rgba(0, 0, 0, 0.5);
  border-width: 10px;
  left: 50%;
  margin-left: -10px;
}

.title:before {
  border-top-color: rgba(0, 0, 0, 0.5);
  border-width: 11px;
  left: 50%;
  margin-left: -11px;
}
</style>
<style scoped>
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
  margin-left: 45px;
  top: 50%;
  transform: translateY(-50%);
  font-family: Negreta;
  color: rgb(255, 255, 255);
}

.top_title_font-size2 {
  font-size: 14px;
  position: absolute;
  font-family: 微软雅黑, Arial;
  line-height: 45px;
  right: 2px;
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
  background: url(data:/image/png;base64,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)
    no-repeat 0 18px;
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
  background: url(data:/image/png;base64,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)
    no-repeat;
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
  z-index: 9;
  right: 20px;
  top: 70px;
  position: absolute;
}

.effect-tip {
  animation: effect-tip 1s both infinite ease-in-out;
}

.effect-tip {
  background-color: red;
  height: 6px;
  width: 6px;
  position: absolute;
  border-radius: 20px;
  right: -3;
  top: -3;
}

.geoshow-geoglobemap-chartselector {
  position: absolute;
  right: 10px;
  top: calc(100% - 70px);
}

.agine {
  left: -58px;
  position: absolute;
}

.statistics_background {
  color: black;
  background-color: rgba(255, 255, 255, 0);
}

.statistics_background2 {
  color: white;
  background-color: rgb(134 130 130 / 00%);
}

.text-class2 {
  position: absolute;
  transform: translateY(-150%);
  margin-left: 25%;
  cursor: pointer;
}

.mabg {
  display: block;
  height: 44px;
  background: url(/img/archives/mabg.png) repeat-x;
  position: absolute;
  top: 70px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  color: #fff;
}

.mabg span {
  float: left;
  width: 100px;
  border-right: 1px solid #000;
  padding-right: 10px;
  text-align: right;
  line-height: 36px;
  font-size: 25px;
  font-family: Arial;
  cursor: pointer;
}

.mabg span.pon {
  background: url(/img/archives/mabg-after.png) repeat-x;
}

.mabg span img {
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}
</style>
<style lang="less">
@import "../style/bottommenu.less";
</style>
