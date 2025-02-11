<template>
  <div id="content" class="myMapClass">
<!--    二维地图-->
    <div
      id="mapEntitly"
      style="height: 100%; margin-top: 13px;border-radius: 12px 12px 0px 0px;border: 1px solid #fff;"
      :style="{'margin-left':isOpen? '0px':'0px'}"
    >
      <div id="overly" />
    </div>
<!--    左侧-->
<!--     非事件-->
<!--    <leftstatistics ref="child" v-model="leftshow" v-show="isOpen" v-if="!this.Btsj" />-->
    <leftstatistics ref="child" v-model="leftshow" v-show="isOpen" v-if="true" />
<!--    事件统计图-->
    <leftGisEvent ref="child" v-model="leftshow" v-show="isOpen"  v-else/>


    <!--左侧开关-->
    <div  :class=" isOpen? 'sidebar':'sidebarActive'" @click="isOpen = !isOpen"
         title="侧边栏展示">
<!--      <Icon type="ios-arrow-back" v-if="isOpen"></Icon>-->
<!--      <Icon type="ios-arrow-forward" v-else></Icon>-->
    </div>
    <!--右侧搜索-->
    <right-search-list ref="rightChild" class="rightChild"/>
    <!--三维地图-->

  <!--  <div class="cesiumMap" style="right:  60px" @click="cesiumMapClick"
         title="三维地图">
      <Icon type="md-globe"></Icon>
    </div>-->
<!--    底部-->
    <row class="bottom-class" justify="center" :style="{'left':isOpen? ' calc(50% - 354px)':'calc(50% - 500px)'}">
      <div style="width: 141px;" v-bind:class="{ imgboxShequDiv:true , 'imgboxShequSelect':Btsq }">
        <div class="imgbox ">
          <div class="imgboxShequ">
            <img class="imgbottom_1" :src="urlsq" @click="setMap('社区')">
          </div>
        </div>
        <div class="textlabel">社区</div>
      </div>
      <div style="width: 141px;" v-bind:class="{ imgboxXiaoquDiv:true , 'imgboxXiaoquSelect':Btfw }">
        <div class="imgbox ">
          <div class="imgboxXiaoqu">
            <img class="imgbottom_4" :src="urlfw" @click="setMap('小区')">
          </div>

        </div>
        <div class="textlabel">小区</div>
      </div>
      <div style="width: 141px;"  v-bind:class="{ imgboxShehuiDiv:true , 'imgboxShehuiSelect':Btzz }">
        <div class="imgbox ">
          <div class="imgboxShehui">
            <img class="imgbottom_2" :src="urlzz" @click="setMap('社会组织')">
          </div>

        </div>
        <div class="textlabel">社会组织</div>
      </div>
      <div style="width: 141px;" v-bind:class="{ imgboxShijianDiv:true , 'imgboxShijianSelect':Btsj }">
        <div class="imgbox ">
          <div class="imgboxShijian" >
            <img class="imgbottom_3" :src="urlsj" @click="setMap('事件')">
          </div>

        </div>
        <div class="textlabel">网格事件</div>
      </div>
      <div style="width: 141px;" v-bind:class="{ imgboxGongongDiv:true , 'imgboxGongongSelect':Btss }">
        <div class="imgbox ">
          <div class="imgboxGongong">
            <img class="imgbottom_5" :src="urlss" @click="setMap('公共设施')">
          </div>

        </div>
        <div class="textlabel">公共设施</div>
      </div>
      <!--      <div style="width:141px;">-->
      <!--        <div class="imgbox">-->
      <!--          <img class="imgbottom_6" :src="urlsh" @click="setMap('商户档案')">-->
      <!--        </div>-->
      <!--        <div class="textlabel">商户档案</div>-->
      <!--      </div>-->
      <div class="dividerT" />
      <div style="width:141px;" v-bind:class="{ imgboxAllDiv:true , 'imgboxAllSelect':BtAll }">
        <div class="imgbox">
          <div class="imgboxAll">
            <img class="imgbottom_7" :src="urlall" @click="setMap('全部')">
          </div>

        </div>
        <div class="textlabel">全部</div>
      </div>
    </row>
    <lookBasicPerson
      v-model="personShow"
      :update-model-show="true"
      :basic-person-id="BasicPersonId"
      modal-title="人员档案查看"
      v-on:handleSearch="handleSearch"
    />

    <lookHousingManage
      v-model="housingShow"
      :update-model-show="true"
      :basic-housing-manage-id="BasicHousingManageId"
      modal-title="房屋查看"
      v-on:handleSearch="handleSearch"
    />

    <lookConstruct
      v-model="buildingShow"
      :update-model-show="true"
      :t-building-archives-id="TBuildingArchivesId"
      modal-title="设施查看"
      v-on:handleSearch="handleSearch"
    />
    <lookBuildingArchives
      v-model="loudongShow"
      :update-model-show="true"
      :t-building-archives-id="loudongId"
      modal-title="楼栋查看"
      v-on:handleSearch="handleSearch"
    />

    <lookTZhsqMerchantProfile
      v-model="merchantShow"
      :update-model-show="true"
      :t-zhsq-merchant-profile-id="TZhsqMerchantProfileId"
      modal-title="商户查看"
      v-on:handleSearch="handleSearch"
    />

    <!-- <lookTZhsqEventList v-model="eventShow" :t-zhsq-event-list-id="TZhsqEventListId" modal-title="网格事件详情查看" /> -->
    <taskDetail v-model="eventShow" :t-zhsq-task-list-id="TZhsqEventListId" modal-title="网格事件详情查看" />
    <lookBasicSocialOrganization
      v-model="organizationShow"
      :update-model-show="true"
      :basic-social-organization-id="BasicSocialOrganizationId"
      modal-title="社会组织查看"
      v-on:handleSearch="handleSearch"
    />
    <lookVideo
      v-model="lookVideoShow"
      :look-video-id="lookVideoId"
      modal-title="监控设备查看"
    />
    <div
      id="GeoSmarter_Widget_Map_Layer_Chart_90-geoshow-geoglobemap-chartselector"
      class="geoshow-geoglobemap-chartselector"
    >
      <span class="btn-backdrop" />
      <span class="btn-column" :class="{'bottom_background':dianji}" @click="changditu()">
        <i>影像</i>
      </span>
      <!-- <span class="btn-column" :class="{'bottom_background':dianjimodel}" @click="showmodel()">
         <i>2.5维地图</i>
       </span>-->
      <span class="btn-pie active">
        <i>天地图</i>
      </span>
    </div>
    <model :events="events"></model>
	<Spin  fix v-if="spinShow">
    <Icon type="ios-loading" size=36 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
  </Spin>
  </div>
</template>
<script>
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

import {
  Vector as VectorSource,TileArcGISRest,
} from 'ol/source'
import {
  Vector as VectorLayer,VectorImage,Heatmap as HeatmapLayer
} from 'ol/layer'
import {
  Map,
  View,
} from 'ol'
import { getCenter } from 'ol/extent'
import {
  queryBasicHousingListByAnyWayWhere
} from '@/api/zhsq/basicHouse/basicHouse'
import {
  queryAllList,updateBasicGrids,queryAllListByAnyWhere
} from '@/api/zhsq/basicGrids/basicGrids'
import {
  queryTBuildingArchivesListByAnyWayWhere
} from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
import {
  queryTZhsqMerchantProfileListByAnyWayWhere
} from '@/api/zhsq/tZhsqMerchantProfile/tZhsqMerchantProfile'
import {
  queryBasicSocialOrganizationListByAnyWayWhere
} from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'

import {
  getAllEventList
} from '@/api/index'
import {
  Polygon,
  Point
} from 'ol/geom'
import {
  TileGrid
} from 'ol/tilegrid'
import Feature from 'ol/Feature'
import {transform} from 'ol/proj'

import {
  Icon,
  Fill,
  Stroke,
  Style,
  Text
} from 'ol/style'
import Overlay from 'ol/Overlay'
import lookBasicPerson from '../../zhsq/basicPerson/lookBasicPerson'
import lookHousingManage from '../../zhsq/basicHouseManage/lookHousingManage'
import lookConstruct from '../../zhsq/tConstruct/lookConstruct'
import lookTZhsqMerchantProfile from '../../zhsq/tZhsqMerchantProfile/lookTZhsqMerchantProfile'
import leftstatistics from '../components/leftgismap.vue'
import leftGisEvent from '../components/leftGisEvent.vue'
import model from '../components/model.vue'
import rightSearchList from '../components/rightSearchList'
import lookBasicSocialOrganization from '../../zhsq/basicSocialOrganization/lookBasicSocialOrganization'
import taskDetail from '../../zhsq/tZhsqEventList/taskDetail'


import {
  queryAllList as getAllEstateList
} from '@/api/zhsq/basicHousingEstate/basicHousingEstate'

import lookBuildingArchives from '../../zhsq/tBuildingArchives/lookBuildingArchives'

import lookVideo from '../components/lookVideo'
// import axios from 'axios'
// import GeoJSON from 'ol/format/GeoJSON'
export default {
  components: {
    lookBasicPerson,
    lookHousingManage,
    lookConstruct,
    lookTZhsqMerchantProfile,
    lookBasicSocialOrganization,
    leftstatistics,
    taskDetail,
    lookBuildingArchives,
    lookVideo,
    leftGisEvent,
    rightSearchList,
    model
  },
  data() {
    return {
      isOpen:true,
      lookVideoShow:false,
	  spinShow:false,
      lookVideoId:"",
      veideoOverlay:null,
      overlays: [],
      loudongShow: false,
      personShow: false,
      housingShow: false,
      buildingShow: false,
      merchantShow: false,
      organizationShow: false,
      eventShow: false,
      dianji: false, // 高德地图
      dianjimodel: false, // 2.5D
      BtGrid: false, // 网格区域
      Btzoology: false, // 生态
      Btindustry: false, // 产业
      BasicPersonId: '',
      BasicHousingManageId: '',
      TBuildingArchivesId: '',
      TZhsqMerchantProfileId: '',
      BasicSocialOrganizationId: '',
      TZhsqEventListId: '',
      loudongId: '',
      leftshow: true,
      visitChart: {},
      urlsq: '/img/faviconmap/map_ico/gis_sq1.png',
      urlzz: '/img/faviconmap/map_ico/gis_zz1.png',
      urlsj: '/img/faviconmap/map_ico/gis_sj1.png',
      urlfw: '/img/faviconmap/map_ico/gis_fw1.png',
      urlss: '/img/faviconmap/map_ico/gis_ss1.png',
      urlsh: '/img/faviconmap/map_ico/gis_sh1.png',
      urlall: '/img/faviconmap/map_ico/gis_all1.png',
      Btsq: false,
      Btzz: false,
      Btsj: false,
      Btfw: false,
      Btss: false,
      Btsh: false,
      BtAll: false,
      map: null,
      leftClik: false,
      communityid: '',
      FeatureArr: [],
      divArr: [],
      eventGifArr: [],
      gridPriority: [],
      source: new VectorSource(),
      vector: new VectorImage(),
      searchSource: new VectorSource(),
      searchVector: new VectorImage(),

      heatMapSource: new VectorSource(),
      heatMapVector: new HeatmapLayer({
        blur: 20, // 模糊尺寸
        radius: 20, // 热点半径
        weight: (feature) => {
          let count = Number(feature.get('weight')) // 获取feature的weight参数值
          let magnitude = count / 1
          return magnitude
        },
        zIndex: 99999999
      }),

      // vectorLayer: new VectorLayer(),
      // vectorSource: new VectorSource(),
      echartsoption: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [{
          name: '性别',
          type: 'pie',
          radius: ['35%', '55%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter: '{b}:{d}%',
            fontSize: '10'
          },
          data: [{
            value: 335,
            name: '男'
          },
            {
              value: 310,
              name: '女'
            }
          ]
        }],
        color: [
          'rgba(255, 127, 39,1)',
          'rgba(31, 132, 239,1)'
        ],
        itemStyle: {
          borderWidth: 5,
          borderColor: 'rgba(255, 255, 255, 1)'
        }
      },
      selected:null,
      events:{},
      setMapVal:"",//下方点击的专题
    }
  },
  mounted() {
    this.init()
    this.initMapFeature()
    window.videoClik = this.videoClik;
    //this.initWebSocket();
    this.setMap('社区');
    // let info={"title":"标题","txt":"内容"}
    // let height =document.documentElement.clientHeight;
    // this.$Notice.config({
    //   top: height-200,
    //   duration: 100
    // });
  },
  destroyed() {
      this.closeWebSocket();
  },
  methods: {
	  initWebSocket: function () {
          //const username = Cookies.get('username');
          this.websock = new WebSocket('ws://' + location.host + "/socket/kungfupeng/websocket?username=" + '789');
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
      },
      websocketonopen: function () {
          console.log("WebSocket连接成功");
      },
      websocketonerror: function (e) {
          console.log("WebSocket连接发生错误");
      },
      websocketonmessage: function (e) {
          if(e&&e.data){
             //let messageArr= e.data.split(",");
             //接受的json字符串
             let info = JSON.parse(e.data);
             if(info&&info.type){
                  switch(info.type) {
                      case "location":
                             this.locate(info)
                          break;
                      case "events":
                        if(info.title&&info.txt){
                             this.events=info;
                        }
                          break;
                      default:
                          break;
                  }
             }
          }

      },
      //定位
      locate(info){
          let mypoint = new Point([105.451496,28.851737])
          let feature = new Feature(mypoint)
          let properties = {
            id: "1",
            type: 'gridPersonnel',
            name: "测试人员",
            position: "[105.451496,28.851737]"
          }
          feature.setProperties(properties)
          // 坐标点样式
          feature.setStyle(this.getDefaultStyle(properties))
          this.source.addFeature(feature)
          this.showPupop(properties)
      },
      //事件弹出框
      showinfo(info){
          this.$Notice.info({
                title: info.title,
                render: h => {
                 return h('div', [
                        h('span',{
                          style:{
                            display: 'block',
                            "max-height": '28px',
                          }
                        },info.txt),
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                float: 'right'
                            },
                            on: {
                                click: () => {
                                   this.locate(info)
                                }
                            }
                        }, '定位')

                    ]);
              }
          });
      },
      websocketclose: function (e) {
          console.log("connection closed (" + e.code + ")");
      },
      //关闭WebSocket连接
      closeWebSocket() {
          this.websock.close();
      },
    // 更换2.5维图层
    showmodel() {
      if (this.dianjimodel == false) {
        this.TiandiMap_img2 = new TileLayer({
          name: '2.5维图层',
          source: new XYZ({
            url: 'http://218.88.215.93:8014/sw/{z}/{x}/{y}.png',
            wrapX: false
          })
        })
        this.TiandiMap_img2.setZIndex(3)
        // 添加到地图上
        this.map.addLayer(this.TiandiMap_img2)
        this.dianjimodel = true
      } else {
        this.map.removeLayer(this.TiandiMap_img2)
        this.dianjimodel = false
      }
    },
    // 切换高德地图
    changditu() {
      if (this.dianji == false) {
        this.TiandiMap_img = new TileLayer({
          name: '高德图层',
          source: new XYZ({
            url: 'https://webst04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}',
            wrapX: false
          })
        })
        // 添加到地图上
        this.TiandiMap_img.setZIndex(2)
        this.map.addLayer(this.TiandiMap_img)
        this.dianji = true
      } else {
        this.map.removeLayer(this.TiandiMap_img)
        this.dianji = false
      }
    },
    // 进入执行加载底图
    init() {
      this.setMapVal = "";
      let restLayer = new TileLayer({
        source:new TileArcGISRest({
          url:"http://218.88.215.102:6080/arcgis/rest/services/MAP/map1/MapServer"
        })
      });
      // 定义Google切片参数
      this.map = new Map({
        target: 'mapEntitly',
        layers: [
          // new TileLayer({
          //   source: new XYZ({
          //     url: 'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f',
          //   }),
          //   isGroup: true,
          //   name: '天地图图层'
          // }),
          // new TileLayer({
          //   source: new XYZ({
          //     url: "http://www.luzhoumap.com/imap/iMapServer/DefaultRest/services/lz2000dlg/tile/{z}/{y}/{x}?returnTipTile=false&token=TPY5vdZU9AsUEWFQaTmlKnHm1FzxhlKYmT-jfNrAK8anNnpKcjafMpjo6kH4Vahm"
          //   })
          // }),
          // new TileLayer({
          //   source: new XYZ({
          //     url: 'https://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'
          //   }),
          //   isGroup: true,
          //   name: '标注图层'
          // }),
          restLayer
        ],
        view: new View({
          projection: 'EPSG:4326', // 使用这个坐标系
          center: [ 105.482455, 28.342638 ], // [120.382609, 36.067108], // 泸州[105.363867, 28.75983]
          zoom: 9.5,
          maxZoom: 22
        })
      })
      this.vector.setZIndex(4)


      let _this = this
      // this.map.on('click', function(e) {
      //   _this. selected = null
      //   _this.map.forEachFeatureAtPixel(e.pixel, function(f) {
      //     selected = f
      //   })
      //   if (selected != null) {
      //     let properties = selected.getProperties()
      //     if (properties.geometry.name == 'shequ') {
      //       _this.$refs.child.layermanageInit(properties.geometry.communityId)
      //       _this.$refs.child.getGridMemberList(properties.geometry.communityId)
      //       _this.initMapFeature()
      //     } else if (properties.type === 'loudong') {
      //       _this.loudongShow = true
      //       _this.loudongId = properties.id
      //     }
      //   }
      // })
      this.map.on('moveend', function(e) {
        let overlays = _this.map.getOverlays()

        if (_this.overlays && _this.overlays.length > 0) {
          _this.overlays.forEach(i => {
            _this.map.removeOverlay(i)
            _this.map.addOverlay(i)
          })
        }
        if(_this.source && _this.source.getFeatures() && _this.source.getFeatures().length>0){
          _this.source.getFeatures().forEach(i=>{
            if(i){
              if(i!=_this.selected){
                i.setStyle(_this.getDefaultStyle(i.getProperties()))
              }
              else{
                i.setStyle(_this.getHighlightStyle(i.getProperties()))
              }
            }

          });
        }

        var zoom = _this.map.getView().getZoom() // 获取当前地图的缩放级别
      })
      // this.vectorLayer.setZIndex(5)
    },
    // 联动查询
    linkageLeftGisMap(communityid, setMapname) {

      this.leftClik = true
      this.communityid = communityid
      this.removePupop()
      this.removelayer()
      // this.restore()
      if (setMapname && setMapname != '') {
        this.setMap(setMapname)
      }
    },
    flytofirstgrid(center) {
      // this.map.getView().setZoom(16)
      this.map.getView().setCenter(center)
    },
    //触发重新渲染统计图
    handleSearch(){
      if (!this.leftClik) {
        this.$refs['child'].layermanageInit(this.communityid, true)
      }
    },
    // 功能点击事件
    setMap(val) {
      if(val=="房屋档案"){
        val = "小区"
      }
      //屏蔽二次点击的bug
      if(this.setMapVal==val && !this.leftClik){
        return
      }
      this.setMapVal = val;
      this.removePupop()
      this.removelayer()
      let SearchForm = {}
      this.featureArr = []
      var that = this

      if (this.communityid != '') {
        SearchForm = {
          communityId: this.communityid,
          houseCommunityId: this.communityid,
          legalCommunityId: this.communityid
        }
      }
      let UserObj=JSON.parse(sessionStorage.getItem("UserObj"));
      if(UserObj && UserObj.gridId){
        SearchForm.gridId = UserObj.gridId;
        SearchForm.houseGridId = UserObj.gridId;
        SearchForm.grid = UserObj.gridId;
        SearchForm.gridsId = UserObj.gridId;

        if(val == '社区'||val == '事件'){
          SearchForm.id =UserObj.gridId;
        }
        else {
          SearchForm.id = null;
        }
      }
      if (val == '社区') {
        if (this.Btsq && !this.leftClik) {
          this.restore()
        } else {
          this.urlsq = '/img/faviconmap/map_ico/gis_sq2.png'
          this.restore()
          this.Btsq = true
          this.queryShequ(SearchForm)
        }
      } else if (val == '社会组织') {
        if (this.Btzz && !this.leftClik) {
          this.restore()
        } else {
          this.urlzz = '/img/faviconmap/map_ico/gis_zz2.png'
          this.restore()
          this.Btzz = true
          this.queryBasicSocialOrganization(SearchForm)
        }
      } else if (val == '事件') {
        if (this.Btsj && !this.leftClik) {
          this.restore()
        } else {
          this.urlsj = '/img/faviconmap/map_ico/gis_sj2.png'
          this.restore()
          this.Btsj = true
          this.gridPriority = null
          this.queryEvent(SearchForm)
        }
      } else if (val == '小区'||val == '房屋档案') {
        if (this.Btfw && !this.leftClik) {
          this.restore()
        } else {
          this.urlfw = '/img/faviconmap/map_ico/gis_fw2.png'
          this.restore()
          this.Btfw = true
          this.spinShow=true;
          this.queryBasicHousing(SearchForm)
        }
      } else if (val == '公共设施') {
        if (this.Btss && !this.leftClik) {
          this.restore()
        } else {
          this.urlss = '/img/faviconmap/map_ico/gis_ss2.png'
          this.restore()
          this.Btss = true
          SearchForm.buildingType = '2,3,4,5,6,7,8,9'
          this.queryBuildingArchives(SearchForm)
        }
      } else if (val == '商户档案') {
        if (this.Btsh && !this.leftClik) {
          this.restore()
        } else {
          this.urlsh = '/img/faviconmap/map_ico/gis_sh2.png'
          this.restore()
          this.Btsh = true
          this.queryMerchantProfile(SearchForm)
        }
      } else if (val == '全部') {
        this.restore()
        this.BtAll = true
        this.urlall = '/img/faviconmap/map_ico/gis_all2.png'
        this.spinShow=true;
        this.queryBasicHousing(SearchForm)
        this.queryShequ(SearchForm)
        this.queryBasicSocialOrganization(SearchForm)
        this.queryEvent(SearchForm)
        this.queryBuildingArchives(SearchForm)
        this.queryMerchantProfile(SearchForm)
      }
      if (!this.leftClik) {
        this.$refs['child'].layermanageInit(this.communityid, true)
      }
      this.leftClik = false
      this.vector.setSource(this.source)
      this.map.addLayer(this.vector)
    },
    verifygridId(id, arr) {
      arr.forEach(element => {
        if (element.id == id) {
          return true
        }
      })
      return false
    },
    // 社区专题
    queryShequ(SearchForm) {
      let _this = this
      if(SearchForm && SearchForm.houseCommunityId &&  SearchForm.communityId && SearchForm.legalCommunityId ){
        queryAllList(SearchForm).then((res) => {
          if (res && res.success) {
            res.data.forEach((element) => {
              if (element.position) {
                let objData = JSON.parse(element.position)
                var arr = []
                var newArr = []
                for (let i = 0; i < objData.length; i++) {
                  newArr.push(objData[i])
                  if (i % 2 == 1) {
                    arr.push(newArr)
                    newArr = []
                  }
                }
                let myPolygon = new Polygon([arr])
                myPolygon.name = 'shequ'
                let properties = {
                  type: 'shequ',
                  name: element.name
                }
                myPolygon.communityId = element.communityId
                var feature = new Feature(myPolygon)
                feature.setProperties(properties)
                feature.setStyle(_this.getDefaultStyle(properties))
                _this.source.addFeature(feature)
              }
            })

          }
        }).catch(e => {
          _this.$Message.error('查询网格异常,请联系管理员！！')
        })
      }
      else{
        queryAllListByAnyWhere(SearchForm).then((res) => {
          if (res && res.success) {
            res.data.forEach((element) => {
              if (element.position) {
                let objData = JSON.parse(element.position)
                var arr = []
                var newArr = []
                for (let i = 0; i < objData.length; i++) {
                  newArr.push(objData[i])
                  if (i % 2 == 1) {
                    arr.push(newArr)
                    newArr = []
                  }
                }
                let myPolygon = new Polygon([arr])
                myPolygon.name = 'shequ'
                let properties = {
                  type: 'shequ',
                  name: element.name
                }
                myPolygon.communityId = element.communityId
                var feature = new Feature(myPolygon)
                feature.setProperties(properties)
                feature.setStyle(_this.getDefaultStyle(properties))
                _this.source.addFeature(feature)
              }
            })

          }
        }).catch(e => {
          _this.$Message.error('查询网格异常,请联系管理员！！')
        })

      }

    },
    // 社会组织专题
    queryBasicSocialOrganization(SearchForm) {
      if(SearchForm.gridId){
        SearchForm.id = SearchForm.gridId
      }
      var _this = this
      queryBasicSocialOrganizationListByAnyWayWhere(SearchForm).then(res => {
        if (res && res.success) {

          var organizationData = res.data
          for (let i = 0; i < organizationData.length; i++) {
            if (organizationData[i].position) {
              console.log (organizationData[i])
              let mypoint = new Point(JSON.parse(organizationData[i].position))
              let feature = new Feature(mypoint)
              let type = 'shanghu'
              switch (organizationData[i].type) {
                case '1':
                case '2': {
                  type = 'shanghu'
                  break
                }
                case '3':
                case '5':
                case '4': {
                  type = 'jiaoyu'
                  break
                }
                case '6': {
                  type = 'weisheng'
                  break
                }
              }
              let properties = {
                id: organizationData[i].id,
                type: type,
                name: organizationData[i].name,
                position: organizationData[i].position
              }
              feature.setProperties(properties)
              // 坐标点样式
              feature.setStyle(_this.getDefaultStyle(properties))
              _this.source.addFeature(feature)
              // _this.FeatureArr.push(feature)
              _this.showPupop(properties)
            }
          }
          let Features = _this.source.getFeatures()
          if (Features.length > 0 && !this.BtAll) {
            let center = Features[0].values_.geometry.flatCoordinates
            _this.flytofirstgrid(center)
          }
        } else {
          _this.$Message.error('数据加载失败！')
        }
      }).catch(res => {
        _this.$Message.error('数据加载失败！')
      })
    },
    // 网格事件专题
    queryEvent(SearchForm) {
      var that = this
      if(SearchForm.gridId){
        SearchForm.id = SearchForm.gridId
      }
      if (SearchForm.communityId || SearchForm.gridId) {
        queryAllList(SearchForm).then(res => {
          if (res && res.success) {
            that.gridPriority = res.data
            that.getEventListData(10, 1, [])
          } else {
            that.$Message.error('获取网格数据失败，请重新刷新')
          }
        })
      } else {
        that.getEventListData(10, 1, [])
      }
    },
    // 小区专题
    queryBasicHousing(SearchForm) {
      let _this = this
      getAllEstateList(SearchForm).then(res => {
        if (res && res.success) {
          res.data.forEach((element) => {
            if (element.location) {
              let objData = JSON.parse(element.location)
              var arr = []
              var newArr = []
              for (let i = 0; i < objData.length; i++) {
                newArr.push(objData[i])
                if (i % 2 == 1) {
                  arr.push(newArr)
                  newArr = []
                }
              }
              var myPolygon = new Polygon([arr])
              myPolygon.name = 'xiaoqu'
              let properties = {
                type: 'xiaoqu',
                name: element.name
              }
              myPolygon.communityId = element.communityId
              var feature = new Feature(myPolygon)
              feature.setProperties(properties)
              feature.setStyle(_this.getDefaultStyle(properties))
              _this.source.addFeature(feature)
              // _this.FeatureArr.push(feature)
            }
          })
          SearchForm.buildingType = '1'
          queryTBuildingArchivesListByAnyWayWhere(SearchForm).then(rest => {
            if (rest.success) {
              rest.data.forEach((element) => {
                if (element.location) {
                  let objData = JSON.parse(element.location)
                  var arr = []
                  var newArr = []
                  for (let i = 0; i < objData.length; i++) {
                    newArr.push(objData[i])
                    if (i % 2 == 1) {
                      arr.push(newArr)
                      newArr = []
                    }
                  }
                  var myPolygon = new Polygon([arr])
                  myPolygon.name = 'loudong'
                  let properties = {
                    id: element.id,
                    type: 'loudong',
                    name: element.housingEstateName
                  }
                  myPolygon.communityId = element.communityId

                  var feature = new Feature(myPolygon)
                  feature.setProperties(properties)
                  feature.setStyle(_this.getDefaultStyle(properties))
                  _this.source.addFeature(feature)
                  // _this.FeatureArr.push(feature)
                }
              })
            } else {
              _this.$Message.error('数据加载失败！')
            }
            let Features = _this.source.getFeatures()
            if (Features.length > 0 ) {
              let center = [(Features[0].values_.geometry.extent_[0] + Features[0].values_
                .geometry.extent_[2]) / 2, (Features[0].values_.geometry.extent_[1] + Features[0].values_.geometry
                .extent_[3]) / 2]
                _this.flytofirstgrid(center)
            }
            _this.spinShow=false
          }).catch(res => {
            _this.$Message.error('数据加载失败！')
          })
        } else {
          _this.$Message.error('数据加载失败！')
        }
      }).catch(res => {
        _this.$Message.error('数据加载失败！')
      })

    },
    // 公共设施专题
    queryBuildingArchives(SearchForm) {
      let _this = this
      SearchForm.buildingType = '2,3,4,5,6,7,8,9'
      queryTBuildingArchivesListByAnyWayWhere(SearchForm).then(res => {
        if (res && res.success) {
          var buildingArchivesData = res.data
          for (let i = 0; i < buildingArchivesData.length; i++) {
            if (buildingArchivesData[i].location) {
              let type = 'sheshi'

              switch (buildingArchivesData[i].buildingType) {
                case '1':
                {
                  type = 'zhuzai'
                  break
                }
                case '2':
                {
                  type = 'xiezilou'
                  break
                }
                case '3': {
                  type = 'gongyuan'
                  break
                }
                case '4':
                {
                  type = 'sheshi'
                  break
                }

                case '5': {
                  type = 'gongchang'
                  break
                }
                case '6':
                case '7':
                case '8': {
                  type = 'sheshi'
                  break
                }
              }
              let mypoint = new Point(JSON.parse(buildingArchivesData[i].location))
              let feature = new Feature(mypoint)
              let properties = {
                id: buildingArchivesData[i].id,
                type: type,
                name: buildingArchivesData[i].buildingName,
                position: buildingArchivesData[i].location
              }
              feature.setProperties(properties)
              feature.setStyle(_this.getDefaultStyle(properties))
              _this.source.addFeature(feature)
              // _this.FeatureArr.push(feature)
              _this.showPupop(properties)
            }
          }
          let veideoData = [[105.41200274194472,28.89124228010494],[105.412355501018,28.891931000200394]];
          if(veideoData){

            let iVeideo=0;
            veideoData.forEach(veideo=>{
              if(veideo){
                let veideopoint = new Point(veideo)
                let veideoFeature = new Feature(veideopoint)
                let veideoProperties = {
                  id: iVeideo,
                  type: "veideo",
                  name: "沙河湾小区摄像头"+iVeideo,
                  position: veideo
                }
                veideoFeature.setProperties(veideoProperties)
                veideoFeature.setStyle(_this.getDefaultStyle(veideoProperties));
                _this.source.addFeature(veideoFeature)
                // _this.FeatureArr.push(feature)
                // _this.showPupop(veideoProperties);

              }
              iVeideo++
            })
          }
          let Features = _this.source.getFeatures()
          if (Features.length > 0 && !this.BtAll) {
            let center = Features[0].values_.geometry.flatCoordinates
            _this.flytofirstgrid(center)
          }
        } else {
          _this.$Message.error('数据加载失败！')
        }
      }).catch(res => {
        _this.$Message.error('数据加载失败！')
      }).finally(res => {

      })
    },
    // 商户专题
    queryMerchantProfile(SearchForm) {
      let _this = this
      queryTZhsqMerchantProfileListByAnyWayWhere(SearchForm).then(res => {
        if (res && res.success) {
          var merchantData = res.data
          for (let i = 0; i < merchantData.length; i++) {
            if (merchantData[i].location) {
              let mypoint = new Point(JSON.parse(merchantData[i].location))
              let feature = new Feature(mypoint)
              let properties = {
                id: merchantData[i].id,
                type: 'shanghu',
                name: merchantData[i].merchantName,
                position: merchantData[i].location
              }
              feature.setProperties(properties)

              feature.setStyle(_this.getDefaultStyle(properties))
              _this.source.addFeature(feature)
              // _this.FeatureArr.push(feature)
              _this.showPupop(properties)
            }
          }
          let Features = _this.source.getFeatures()
          if (Features.length > 0 && !this.BtAll) {
            let center = [(Features[0].values_.geometry.extent_[0] + Features[0].values_
              .geometry.extent_[2]) / 2, (Features[0].values_.geometry.extent_[1] + Features[0].values_.geometry
              .extent_[3]) / 2]
            _this.flytofirstgrid(center)
          }
        } else {
          _this.$Message.error('数据加载失败！')
        }
      }).catch(res => {
        _this.$Message.error('数据加载失败！')
      }).finally(res => {

      })
    },

    // 调用接口，获取网格事件列表
    getEventListData(pageSize, pageNumber, allData) {
      let gridId = ''
      if (this.gridPriority) {
        this.gridPriority.forEach(i => {
          if (i) {
            gridId += ',' + i.id
          }
        })
      }
      if (gridId != '') {
        gridId.trimStart(',')
      }

      let searchForm = {
        dataFrom: '',
        createTime: null,
        eventsTypeId: '',
        queryStr: '',
        gridId: gridId,
        pageNum: pageNumber, // 当前页数
        pageSize: pageSize // 页面大小
      }
      let _this = this
      getAllEventList(searchForm).then(res => {
        if (res && res.success) {
          let allData = res.data
          let eventData = []
          if (allData.length > 0 && _this.gridPriority != null && _this.gridPriority.length==0 ) {
            eventData=[];
          } else {
            eventData = allData;
          }
          if (eventData.length > 0 && !this.BtAll) {
            let center = []
            for (let i = 0; i < eventData.length; i++) {
              if (eventData[i].longitude && eventData[i].latitude) {
                center.push(eventData[i].longitude)
                center.push(eventData[i].latitude)
                _this.flytofirstgrid(center)
                break
              }
            }
          }
          for (let i = 0; i < eventData.length; i++) {
            if(eventData[i]==undefined||eventData[i]==null||eventData[i].id==undefined){
              continue;
            }
            let positionArr = []
            //  if (eventData[i].latitude && eventData[i].longitude) {
            if (eventData[i].longitude && eventData[i].latitude) {
              positionArr.push(eventData[i].longitude)
            } else {
              positionArr.push(0)
            }
            if (eventData[i].longitude && eventData[i].latitude) {
              positionArr.push(eventData[i].latitude)
            } else {
              positionArr.push(0)
            }

            let mypoint = new Point([eventData[i].longitude,eventData[i].latitude])
            let feature = new Feature(mypoint)
            let properties = {
              id: eventData[i].id,
              type: 'putong',
              name: eventData[i].title,
              position: [eventData[i].longitude,eventData[i].latitude]
            }
            switch (eventData[i].urgentType) {
              case 1: {
                properties.type = 'putong'
                break
              }
              case 2: {
                properties.type = 'yiban'
                break
              }
              case 3: {
                properties.type = 'jingji'
                break
              }
            }

            feature.setProperties(properties)

            feature.setStyle(_this.getDefaultStyle(properties))
            _this.source.addFeature(feature)
            // let htmlDivElement = document.createElement('div')
            // htmlDivElement.style.position = 'relative'
            // htmlDivElement.style.left = '-28px'
            // htmlDivElement.style.top = '-16px'
            // let htmlImgElement = document.createElement('img')
            // let htmlContentElement = document.createElement('div')
            // let imgPath = '/img/archives/ybsj_1.gif'
            // switch (eventData[i].urgentType) {
            //   case 1: {
            //     imgPath = '/img/archives/ptsj_2.gif'
            //     break
            //   }
            //   case 2: {
            //     imgPath = '/img/archives/ybsj_1.gif'
            //     break
            //   }
            //   case 3: {
            //     imgPath = '/img/archives/zdsj_1.gif'
            //     break
            //   }
            // }
            // htmlImgElement.src = imgPath
            // console.log(eventData[i]);
            // htmlContentElement.innerHTML = '<span id="headDivSpan" class="title" style=" left:0px;word-wrap:break-word; ">' +
            //     eventData[i].eventsTypeName + '</span>'
            // htmlContentElement.style.display = 'none'
            // htmlContentElement.style.top = '-20px'
            // htmlContentElement.style.position = 'relative'
            // htmlImgElement.style.marginTop = '-16px'
            // htmlImgElement.style.marginLeft = '50%'
            // htmlImgElement.style.transform = 'translateX(-50%)'
            //
            // var overlayer = new Overlay({
            //   element: htmlDivElement
            //   // offset: [-14, -47],
            //   // position: positionArr,
            // })
            // overlayer.setPosition(positionArr)
            // overlayer.setPositioning('center-center')
            // // 解决overlay渲染center时出现偏移的问题
            //
            // overlayer.setProperties('type', 'shijian')
            // _this.map.addOverlay(overlayer)
            // htmlImgElement.addEventListener('click', function() {
            //   // 显示网格事件
            //   _this.TZhsqEventListId = eventData[i].id.toString()
            //   _this.eventShow = true
            // })
            //
            // htmlImgElement.addEventListener('mouseover', function() {
            //   htmlDivElement.style.zIndex = 10
            //   htmlContentElement.style.display = 'block'
            //   htmlDivElement.style.top = '-38px'
            // })
            //
            // htmlImgElement.addEventListener('mouseout', function() {
            //   htmlDivElement.style.zIndex = 0
            //   htmlContentElement.style.display = 'none'
            //   htmlDivElement.style.top = '-16px'
            // })
            //
            // htmlDivElement.appendChild(htmlContentElement)
            // htmlDivElement.appendChild(htmlImgElement)
            //
            // _this.eventGifArr.push(htmlDivElement)
            // _this.overlays.push(overlayer)
            // }
          }
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 移除专题地图
    removelayer() {
      this.source.clear()
      this.map.removeLayer(this.vector)
      this.searchSource.clear()
      this.map.removeLayer(this.searchVector)
      this.heatMapSource.clear()
      this.map.removeLayer(this.heatMapVector)

      this.urlsq = '/img/faviconmap/map_ico/gis_sq1.png'
      this.urlzz = '/img/faviconmap/map_ico/gis_zz1.png'
      this.urlsj = '/img/faviconmap/map_ico/gis_sj1.png'
      this.urlfw = '/img/faviconmap/map_ico/gis_fw1.png'
      this.urlss = '/img/faviconmap/map_ico/gis_ss1.png'
      this.urlsh = '/img/faviconmap/map_ico/gis_sh1.png'
      this.urlall = '/img/faviconmap/map_ico/gis_all1.png'
    },

    // 设置高亮要素
    setHeightFeature() {
      let _this  = this;

      let properties = _this.selected.getProperties()
      if (!properties && properties.type != 'person' && properties.type != 'fangwu' && properties.type != 'sheshi' &&
        properties.type != 'shanghu' && properties.type != 'shehuizuzhi' && properties.type != 'shequ' &&
        properties.type != 'xiaoqu' && properties.type != 'loudong' && properties.type != 'weisheng'&&
        properties.type != 'jiaoyu' && properties.type != 'xiezilou'&& properties.type != 'gongyuan'&&
        properties.type != 'xuexiao'&& properties.type != 'yiyuan'&&
        properties.type != 'dangzheng'&& properties.type != 'gongchang' && properties.type != "veideo"&&
        properties.type != "jingji"&& properties.type != "yiban"&& properties.type != "putong" && properties.type != "loudongICon") {
        return
      }
      let style = _this.getHighlightStyle(properties)
      _this.selected.setStyle(style)
      if (properties.type == 'person') {
        _this.personShow = true
        _this.BasicPersonId = properties.id
      } else if (properties.type == 'fangwu') {
        _this.housingShow = true
        _this.BasicHousingManageId = properties.id
      } else if (properties.type == 'sheshi' || properties.type == 'xiezilou' || properties.type == 'gongyuan' || properties.type == 'xuexiao' || properties.type == 'yiyuan' || properties.type == 'dangzheng' || properties.type == 'gongchang') {
        _this.TBuildingArchivesId = properties.id
        _this.buildingShow = true
      } else if (properties.type == 'shanghu' || properties.type == 'weisheng' || properties.type == 'jiaoyu') {
        _this.organizationShow = true
        _this.BasicSocialOrganizationId = properties.id
      } else if (properties.type == 'loudong'|| properties.type == "loudongICon") {
        _this.loudongShow = true
        _this.loudongId = properties.id
      }
      else if (properties.type == "jingji"|| properties.type == "yiban"|| properties.type == "putong") {

        _this.eventShow = true
        _this.TZhsqEventListId = properties.id.toString();
      }
      else if (properties.type == 'veideo'  ) {
        let htmlDivElement = document.createElement('div')
        htmlDivElement.style.position = 'relative'
        htmlDivElement.style.left = '184px'
        htmlDivElement.style.top = '0px'


        let htmlContentElement = document.createElement('div')
        let url= "/video/VID20201009102221.MOV";
        htmlContentElement.innerHTML = '<span id="headDivSpan"  class="titleLeft" style="left:0px">' +properties.name+
          '<br/><video class="home-video"  id="myVideo"  width="320" height="240" loop muted controls="controls"> <source src="'+url+'" type="video/ogg" /></video>' +
          '<div class="divFenge"></div>'+'<div class="myMapChaKanClass" onclick="videoClik('+properties.id+')">查看详情</div>'+
          '</span>'


        htmlContentElement.style.visibility = 'visible'


        _this.veideoOverlay = new Overlay({
          element: htmlDivElement
          // offset: [-14, -47],
          // position: positionArr,
        })
        _this.veideoOverlay.setPosition(properties.position)
        _this.veideoOverlay.setPositioning('center-center')
        // 解决overlay渲染center时出现偏移的问题

        _this.map.addOverlay(_this.veideoOverlay)
        htmlDivElement.appendChild(htmlContentElement)

        let myVideo = document.getElementById("myVideo")

        myVideo.addEventListener('click', _this._bindHandlerFull)
        myVideo.addEventListener('ended', _this._unbindHandlerFull)
        // _this.$message.info("点击了veideo");
      }
    },


    // 按钮初始化
    restore() {
      this.Btsq = false
      this.Btzz = false
      this.Btsj = false
      this.Btfw = false
      this.Btss = false
      this.Btsh = false
      this.BtAll = false
    },
    // 加载专题在地图上显示的图标
    initMapFeature() {
      var _this = this
      let pointerMoveSelected = null
      this.map.on('pointermove', function(e) {
        if (pointerMoveSelected != null) {
          let properties = pointerMoveSelected.getProperties()
          if (properties.type != 'person' && properties.type != 'fangwu' && properties.type != 'sheshi' &&
            properties.type != 'shanghu' && properties.type != 'shehuizuzhi' && properties.type != 'shequ' &&
            properties.type != 'xiaoqu' && properties.type != 'loudong' && properties.type != 'weisheng'&&
            properties.type != 'jiaoyu' && properties.type != 'xiezilou'&& properties.type != 'gongyuan'&&
            properties.type != 'xuexiao'&& properties.type != 'yiyuan'&&
            properties.type != 'dangzheng'&& properties.type != 'gongchang'  && properties.type != "veideo"
            && properties.type != "jingji"&& properties.type != "yiban"&& properties.type != "putong" && properties.type != "loudongICon") {

          } else {
            if (pointerMoveSelected != _this.selected) {
              pointerMoveSelected.setStyle(_this.getDefaultStyle(properties))
              pointerMoveSelected = null
            }
          }
        }
        _this.map.forEachFeatureAtPixel(e.pixel, function(f) {
          pointerMoveSelected = f
          return true
        })

        if (pointerMoveSelected != null) {
          let properties = pointerMoveSelected.getProperties()
          if (properties.type != 'person' && properties.type != 'fangwu' && properties.type != 'sheshi' &&
            properties.type != 'shanghu' && properties.type != 'shehuizuzhi' && properties.type != 'shequ' &&
            properties.type != 'xiaoqu' && properties.type != 'loudong' && properties.type != 'weisheng'&&
            properties.type != 'jiaoyu' && properties.type != 'xiezilou'&& properties.type != 'gongyuan'&&
            properties.type != 'xuexiao'&& properties.type != 'yiyuan'&&
            properties.type != 'dangzheng'&& properties.type != 'gongchang'  && properties.type != "veideo"
            && properties.type != "jingji"&& properties.type != "yiban"&& properties.type != "putong"  && properties.type != "loudongICon") {
            return
          }
          let style = _this.getHighlightStyle(properties)
          pointerMoveSelected.setStyle(style)
        }
      })

      this.map.on('click', function(e) {
        if(_this.veideoOverlay){
          _this.map.removeOverlay(_this.veideoOverlay)
          _this.veideoOverlay = null
        }
        if (_this.selected != null) {
          let properties = _this.selected.getProperties()
          if (!properties && properties.type != 'person' && properties.type != 'fangwu' && properties.type != 'sheshi' &&
            properties.type != 'shanghu' && properties.type != 'shehuizuzhi' && properties.type != 'shequ' &&
            properties.type != 'xiaoqu' && properties.type != 'loudong' && properties.type != 'weisheng'&&
            properties.type != 'jiaoyu' && properties.type != 'xiezilou'&& properties.type != 'gongyuan'&&
            properties.type != 'xuexiao'&& properties.type != 'yiyuan'&&
            properties.type != 'dangzheng'&& properties.type != 'gongchang' && properties.type != "veideo"
            && properties.type != "jingji"&& properties.type != "yiban"&& properties.type != "putong" && properties.type != "loudongICon") {

            return
          }
          _this.selected.setStyle(_this.getDefaultStyle(properties))
          _this.selected = null
        }
        _this.map.forEachFeatureAtPixel(e.pixel, function(f) {
          _this.selected = f
          return true
        })
        if (_this.selected != null) {
          _this.setHeightFeature();
        }
      })
    },
    // 显示默认图标
    getDefaultStyle(properties) {
      let zoom = this.map.getView().getZoom();  //获取当前地图的缩放级别

      // var zoom = 16
      let imgSrc = '/img/archives/person_off.png'
      if (properties && properties.type) {
        if (properties.type == 'person') {
          imgSrc = '/img/archives/person_off.png'
        }
        else if(properties.type =="gridPersonnel"){
          imgSrc="/img/archives/unlinejob_on.gif"
        }
        else if (properties.type == 'loudongICon') {
          imgSrc = '/img/archives/dan_off.png'
        }
        else if (properties.type == 'fangwu') {
          imgSrc = '/img/archives/lou_off.png'
        } else if (properties.type == 'shanghu') {
          imgSrc = '/img/archives/tb_dt_08.png'
        } else if (properties.type == 'jiaoyu') {
          imgSrc = '/img/archives/tb_dt_01.png'
        } else if (properties.type == 'weisheng') {
          imgSrc = '/img/archives/tb_dt_10.png'
        } else if (properties.type == 'xiezilou') {
          imgSrc = '/img/archives/tb_dt_03.png'
        } else if (properties.type == 'gongyuan') {
          imgSrc = '/img/archives/tb_dt_05.png'
        } else if (properties.type == 'sheshi') {
          imgSrc = '/img/archives/tb_dt_02_1.png'
        } else if (properties.type == 'gongchang') {
          imgSrc = '/img/archives/tb_dt_07.png'
        } else if (properties.type == 'xuexiao') {
          imgSrc = '/img/archives/tb_dt_01.png'
        } else if (properties.type == 'yiyuan') {
          imgSrc = '/img/archives/tb_dt_10.png'
        } else if (properties.type == 'dangzheng') {
          imgSrc = '/img/archives/tb_dt_04.png'
        }
        else if (properties.type == 'veideo') {
          imgSrc = '/img/archives/tb_dt_02.png'
        }
        else if (properties.type == 'jingji') {
          imgSrc = '/img/archives/jingji.png'
        }
        else if (properties.type == 'yiban') {
          imgSrc = '/img/archives/yiban.png'
        }
        else if (properties.type == 'putong') {
          imgSrc = '/img/archives/putong.png'
        }
        else if (properties.type == 'shehuizuzhi') {
          imgSrc = '/img/archives/dan_off.png'
        } else if (properties.type == 'shequ' || properties.type == 'xiaoqu') {
          if(zoom>=12.5 || properties.type == 'xiaoqu'){
            return new Style({
              stroke: new Stroke({
                lineDash: [1, 2, 3, 4,5,6,7,8],
                color: '#757575',
                width: 1
              }),
              fill: new Fill({
                color: '#a1a1a12a'
              }),
              text: new Text({
                text: properties.name,
                textAlign: 'center',
                font: '14px Microsoft YaHei, Microsoft YaHei-Regular;',
                offsetX: 0,
                offsetY: 0,
                placement: 'point',
                backgroundStroke: new Stroke({
                  color: '#3e3e3e',
                  width: 1
                }),
                // 标签的背景填充
                backgroundFill: new Fill({
                  color: '#3e3e3e'
                }),
                fill: new Fill({
                  color: '#ffffff'

                }),
                padding: [2, 2, 2, 2]
              })
            })
          }
          else {
            return new Style({
              stroke: new Stroke({
                lineDash: [1, 2, 3, 4,5,6,7,8],
                color: '#757575',
                width: 1
              }),
              fill: new Fill({
                color: '#a1a1a12a'
              }),

            })
          }

        } else if (properties.type == 'loudong') {
            return new Style({
              stroke: new Stroke({
                lineDash: [1, 2, 3, 4],
                color: '#757575',
                width: 1
              }),
              fill: new Fill({
                color: '#a1a1a14a'
              }),
              text: new Text({
                text:properties.name,
                textAlign: 'center',
                font: '10px Microsoft YaHei, Microsoft YaHei-Regular;',
                offsetX: 0,
                offsetY: 0,
                placement: 'point',
                backgroundStroke: new Stroke({
                  color: '#3e3e3e',
                  width: 1
                }),
                // 标签的背景填充
                backgroundFill: new Fill({
                  color: '#3e3e3e'
                }),
                fill: new Fill({
                  color: '#ffffff'

                }),
                padding: [2, 2, 2, 2]
              })
            })
        }
      }

      let style = new Style({
        // 图标样式
        image: new Icon({
          anchor: [10, 18], // 设置图标偏移
          scale: 16 * 0.06, // 图标缩小显示
          anchorOrigin: 'top-right', // 标注样式的起点位置
          anchorXUnits: 'pixels', // X方向单位：分数
          anchorYUnits: 'pixels', // Y方向单位：像素
          offsetOrigin: 'bottom-left', // 偏移起点位置的方向
          opacity: 0.9, // 透明度
          // imgSize:[40,40],//图片大小
          src: imgSrc // 图片路径
        })

      })
      return style
    },
    // 显示高亮图标
    getHighlightStyle(properties) {
      var zoom = this.map.getView().getZoom() // 获取当前地图的缩放级别
      let imgSrc = '/img/archives/person_on.png'
      let anchor = [18, 29];
      let offsetX = 0;
      let offsetY = -40;
      if (properties && properties.type) {
        if (properties.type == 'person') {
          anchor = [10, 19];
          offsetY = -30;
          offsetX = -5;
          imgSrc = '/img/archives/person_on.png'
        }
        else if (properties.type == 'loudongICon') {
          anchor = [10, 19];
          offsetY = -30;
          offsetX = -5;
          imgSrc = '/img/archives/dan_on.png'
        }
        else if (properties.type == 'xiezilou') {
          imgSrc = '/img/archives/tb_dtgl_03.png'
        } else if (properties.type == 'gongyuan') {
          imgSrc = '/img/archives/tb_dtgl_05.png'
        } else if (properties.type == 'sheshi') {
          imgSrc = '/img/archives/tb_dtgl_02.png'
        } else if (properties.type == 'gongchang') {
          imgSrc = '/img/archives/tb_dtgl_07.png'
        } else if (properties.type == 'xuexiao') {
          imgSrc = '/img/archives/tb_dtgl_01.png'
        } else if (properties.type == 'yiyuan') {
          imgSrc = '/img/archives/tb_dtgl_10.png'
        } else if (properties.type == 'dangzheng') {
          imgSrc = '/img/archives/tb_dtgl_04.png'
        }
        else if (properties.type == 'jingji') {
          imgSrc = '/img/archives/jingji.png'
          anchor = [10, 20];
          offsetY = -35;
        }
        else if (properties.type == 'yiban') {
          imgSrc = '/img/archives/yiban.png'
          anchor = [10, 20];
          offsetY = -35;
        }
        else if (properties.type == 'putong') {
          imgSrc = '/img/archives/putong.png'
          anchor = [10, 20];
          offsetY = -35;
        }
        else if (properties.type == 'veideo') {
          imgSrc = '/img/archives/tb_dtgl_02_1.png';
          let style = new Style({
            // 图标样式
            image: new Icon({
              anchor: anchor, // 设置图标偏移
              scale: 1.0, // 图标缩小显示
              anchorOrigin: 'top-right', // 标注样式的起点位置
              anchorXUnits: 'pixels', // X方向单位：分数
              anchorYUnits: 'pixels', // Y方向单位：像素
              offsetOrigin: 'bottom-left', // 偏移起点位置的方向
              opacity: 0.9, // 透明度
              // imgSize:[40,40],//图片大小
              src: imgSrc // 图片路径
            }),
          })
          return style
        }
        else if (properties.type == 'fangwu') {
          anchor = [10, 19];
          offsetY = -30;
          offsetX = -5;
          imgSrc = '/img/archives/lou_on.png'
        } else if (properties.type == 'shanghu') {
          imgSrc = '/img/archives/tb_dtgl_08.png'
        } else if (properties.type == 'jiaoyu') {
          imgSrc = '/img/archives/tb_dtgl_01.png'
        } else if (properties.type == 'weisheng') {
          imgSrc = '/img/archives/tb_dtgl_10.png'
        } else if (properties.type == 'shehuizuzhi') {
          imgSrc = '/img/archives/dan_on.png'
        } else if (properties.type == 'shequ' || properties.type == 'xiaoqu') {
          if(zoom>=12.5 || properties.type == 'xiaoqu'){
            return new Style({
              stroke: new Stroke({
                // lineDash: [1, 2, 3, 4],
                color: '#3083F2',
                width: 3
              }),
              fill: new Fill({
                color: ' rgba(69,132,237,0.2)'
              }),
              text: new Text({
                text: properties.name,
                textAlign: 'center',
                font: '24px Microsoft YaHei, Microsoft YaHei-Regular;',
                offsetX: 0,
                offsetY: 0,
                placement: 'point',
                backgroundStroke: new Stroke({
                  color: '#3083f2',
                  width: 1
                }),
                // 标签的背景填充
                backgroundFill: new Fill({
                  color: '#3083f2'
                }),
                scale: 1.0,
                fill: new Fill({
                  color: '#ffffff'

                }),
                padding: [2, 2, 2, 2]
              })
            })
          }
          else {
            return new Style({
              stroke: new Stroke({
                // lineDash: [1, 2, 3, 4],
                color: '#3083F2',
                width: 3
              }),
              fill: new Fill({
                color: ' rgba(69,132,237,0.2)'
              })
            })
          }



        } else if (properties.type == 'loudong') {
          return new Style({
            stroke: new Stroke({
              // lineDash: [1, 2, 3, 4],
              color: '#3083F2',
              width: 3
            }),
            fill: new Fill({
              color: ' rgba(69,132,237,0.2)'
            }),
            text: new Text({
              text: properties.name,
              textAlign: 'center',
              font: '12px Microsoft YaHei, Microsoft YaHei-Regular;',
              offsetX: 0,
              offsetY: 0,
              placement: 'point',
              backgroundStroke: new Stroke({
                color: '#3083f2',
                width: 1
              }),
              // 标签的背景填充
              backgroundFill: new Fill({
                color: '#3083f2'
              }),
              scale: 1.0,
              fill: new Fill({
                color: '#ffffff'

              }),
              padding: [2, 2, 2, 2]
            })
          })
        }
      }

      let style = new Style({
        // 图标样式
        image: new Icon({
          anchor: anchor, // 设置图标偏移
          scale: 1.0, // 图标缩小显示
          anchorOrigin: 'top-right', // 标注样式的起点位置
          anchorXUnits: 'pixels', // X方向单位：分数
          anchorYUnits: 'pixels', // Y方向单位：像素
          offsetOrigin: 'bottom-left', // 偏移起点位置的方向
          opacity: 0.9, // 透明度
          // imgSize:[40,40],//图片大小
          src: imgSrc // 图片路径
        }),
        // 文本样式
        text: new Text({
          scale: 1.2,
          textAlign: 'center', // 对齐方式
          textBaseline: 'middle', // 文本基线
          font: 'normal 12px 微软雅黑', // 字体样式
          text: properties.name, // 文本内容
          offsetY: offsetY, // Y轴偏置
          offsetX: offsetX,
          fill: new Fill({ // 填充样式
            color: '#ffffff'
          }),
          backgroundFill: new Fill({ // 填充背景
            color: '#3e3e3e'
          }),
          padding: [2, 5, 2, 5]
        })
      })
      return style
    },
    // 显示顶部label
    showPupop(properties) {
      let _this = this
      let htmlDivElement = document.createElement('div')
      this.divArr.push(htmlDivElement)
      var overlayer = new Overlay({
        element: htmlDivElement,
        offset: [0, -97],
        position: JSON.parse(properties.position)
      })
      htmlDivElement.innerHTML = '<span class="title">' + properties.name + '</span>'
      // this.map.addOverlay(overlayer)
      htmlDivElement.addEventListener('click', function() {
        if (properties.type == 'person') {
          _this.personShow = true
          _this.BasicPersonId = properties.id
        } else if (properties.type == 'fangwu') {
          _this.housingShow = true
          _this.BasicHousingManageId = properties.id
        } else if (properties.type == 'sheshi' || properties.type != 'xiezilou' || properties.type != 'gongyuan' || properties.type != 'xuexiao' || properties.type != 'yiyuan' || properties.type != 'dangzheng' || properties.type != 'gongchang') {
          _this.TBuildingArchivesId = properties.id
          _this.buildingShow = true
        } else if (properties.type == 'shanghu') {
          _this.merchantShow = true
          _this.TZhsqMerchantProfileId = properties.id
        } else if (properties.type == 'shehuizuzhi') {
          _this.organizationShow = true
          _this.BasicSocialOrganizationId = properties.id
        }
      })
    },
    removePupop() {
      for (let i = 0; i < this.divArr.length; i++) {
        this.divArr[i].remove()
      }
      for (let i = 0; i < this.eventGifArr.length; i++) {
        this.eventGifArr[i].remove()
      }
      this.eventGifArr = []
      this.divArr = []
      if(this.veideoOverlay){
        this.map.removeOverlay(this.veideoOverlay)
        this.veideoOverlay = null
      }
    },
    // bind
    _bindHandlerFull() {
      let myVideo = document.getElementById("myVideo")
      this.launchFullscreen(myVideo)
    },

    // unbind
    _unbindHandlerFull() {
      console.log('播放结束')
      //檢查瀏覽器是否處於全屏
      if (
        this.invokeFieldOrMethod(document, 'FullScreen') ||
        this.invokeFieldOrMethod(document, 'IsFullScreen') ||
        document.IsFullScreen
      ) {
        this.exitFullscreen()
      }
    },

    // 反射调用
    invokeFieldOrMethod(element, method) {
      var usablePrefixMethod
      ;['webkit', 'moz', 'ms', 'o', ''].forEach(function(prefix) {
        if (usablePrefixMethod) return
        if (prefix === '') {
          // 无前缀，方法首字母小写
          method = method.slice(0, 1).toLowerCase() + method.slice(1)
        }
        var typePrefixMethod = typeof element[prefix + method]
        if (typePrefixMethod + '' !== 'undefined') {
          if (typePrefixMethod === 'function') {
            usablePrefixMethod = element[prefix + method]()
          } else {
            usablePrefixMethod = element[prefix + method]
          }
        }
      })

      return usablePrefixMethod
    },

    // 进入全屏
    launchFullscreen(element) {
      //此方法不可以在異步任務中執行，否則火狐無法全屏
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen()
      } else {
        var docHtml = document.documentElement
        var docBody = document.body
        var videobox = document.getElementById('videobox')
        var cssText = 'width:100%;height:100%;overflow:hidden;'
        docHtml.style.cssText = cssText
        docBody.style.cssText = cssText
        videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;'
        document.IsFullScreen = true
      }
    },

    // 退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.oRequestFullscreen) {
        document.oCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else {
        var docHtml = document.documentElement
        var docBody = document.body
        var videobox = document.getElementById('videobox')
        docHtml.style.cssText = ''
        docBody.style.cssText = ''
        videobox.style.cssText = ''
        document.IsFullScreen = false
      }
    },
    //视频点击
    videoClik(id){
      this.lookVideoId=id;
      this.lookVideoShow = true;
    },
    //二三维切换
    cesiumMapClick(){
      window.open("/3dmap", '_blank');
    }
  }
}
</script>

<style lang="less">
.myMapClass {
  height: 100%;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  background-color: white;
  top: 10px;

  .ol-zoom {
    display: none;
  }

  .bottom-class {
    background: url(/img/faviconmap/map_ico/gis_db.png);
    height: 108px;
    position: absolute;
    z-index: 2;
    bottom: -25px;
    left: calc(50% - 354px);
    /* right: calc(50% - 736px); */
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 1000px;
  }

  .textlabel {
    padding: 5px;
    text-align: center;
    transform: translateY(70px);
    position: relative;
    top: -18px;
    left: -2px;
    font-size: 13px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #757575;

  }

  .imgbox {
    height: 0px;
    width: 100%;
    text-align: center;
    margin-top: -19px;

    img {
      //width: 28px;
      //height: 28px;
    }
  }

  .imgbottom_1,
  .imgbottom_2,
  .imgbottom_3,
  .imgbottom_4,
  .imgbottom_5,
  .imgbottom_6,
  .imgbottom_7,
  .imgbottom {
    transform: translateY(15px);
    cursor: pointer;
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
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .title:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #494947;
    left: 50%;
    margin-left: -5px;
    bottom: -12px;
  }
  .titleLeft {
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
    box-shadow: 10px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .titleLeft:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-right-color: #494947;
    left: -8px;
    margin-left: -5px;
    bottom: 50%;
  }

  .geoshow-geoglobemap-chartselector {
    position: absolute;
    right: 10px;
    top: 10px;
    display: none;
  }

  canvas {
    display: inline-block;
    border-radius: 12px 12px 0px 0px;
    border: 1px solid rgb(255, 255, 255);
  }

  .dividerT {
    width: 2px;
    margin-top: 24px;
    height: 62px;
    background: #e5e5e5;
  }

  .imgboxAll{
    width: 40px;
    height: 40px;
    margin-left: 35%;
  }

  .imgboxAllSelect,.imgboxAllDiv:hover {
    .imgboxAll{
      transform: translateY(15px);
      background:url("/img/faviconmap/map_ico/gis_all2.png");
      img {
        opacity:0;
      }
    }
    .textlabel{
      font-size: 14px ;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700 ;
      text-align: center;
      color: #3e3e3e;
    }
  }

  .imgboxShequ{
    width: 40px;
    height: 40px;
    margin-left: 35%;
  }
  .imgboxShequSelect,.imgboxShequDiv:hover {
    .imgboxShequ{
      transform: translateY(15px);
      background:url("/img/faviconmap/map_ico/gis_sq2.png");
      img {
        opacity:0;
      }
    }
    .textlabel{
      font-size: 14px ;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700 ;
      text-align: center;
      color: #3e3e3e;
    }
  }
  .imgboxXiaoqu{
    width: 40px;
    height: 40px;
    margin-left: 35%;
  }

  .imgboxXiaoquSelect,.imgboxXiaoquDiv:hover {
    .imgboxXiaoqu{
      transform: translateY(15px);
      background:url("/img/faviconmap/map_ico/gis_fw2.png");
      img {
        opacity:0;
      }
    }
    .textlabel{
      font-size: 14px ;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700 ;
      text-align: center;
      color: #3e3e3e;
    }
  }
  .imgboxGongong{
    width: 40px;
    height: 40px;
    margin-left: 35%;
  }

  .imgboxGongongSelect,.imgboxGongongDiv:hover {
    .imgboxGongong{
      transform: translateY(15px);
      background:url("/img/faviconmap/map_ico/gis_ss2.png");
      img {
        opacity:0;
      }
    }
    .textlabel{
      font-size: 14px ;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700 ;
      text-align: center;
      color: #3e3e3e;
    }
  }

  .imgboxShehui{
    width: 40px;
    height: 40px;
    margin-left: 35%;
  }

  .imgboxShehuiSelect,.imgboxShehuiDiv:hover {
    .imgboxShehui{
      transform: translateY(15px);
      background:url("/img/faviconmap/map_ico/gis_zz2.png");
      img {
        opacity:0;
      }
    }
    .textlabel{
      font-size: 14px ;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700 ;
      text-align: center;
      color: #3e3e3e;
    }
  }

  .imgboxShijian{
    width: 40px;
    height: 40px;
    margin-left: 35%;
  }
  .imgboxShijianSelect,.imgboxShijianDiv:hover {
    .imgboxShijian{
      transform: translateY(15px);
      background:url("/img/faviconmap/map_ico/gis_sj2.png");
      img {
        opacity:0;
      }
    }
    .textlabel{
      font-size: 14px ;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700 ;
      text-align: center;
      color: #3e3e3e;
    }
  }

  .divFenge {
    width: 100%;
    height: 1px;
    opacity: 0.3;
    background: #ffffff;
  }
  .myMapChaKanClass{
    padding-top: 5px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
  }
  .myMapChaKanClass:hover{
    color: blue;
  }
  .sidebar {
    position: fixed;
    right: 24%;
    bottom: 51%;
    font-size: 40px;
    color: rgba(25 ,33, 214, 0.8);
    z-index: 102;
    width: 21px;
    height: 60px;
    left: 298px;
    background: url(/img/icon_arrow.png) no-repeat 2px 0;
    &:hover {
      color: rgba(25, 33 ,214, 0.4);
      animation-play-state: paused;
      background: url("/img/icon_arrow.png") no-repeat -21px 0;
    }
  }
  .sidebarActive {
    position: fixed;
    right: 24%;
    left: 0px;
    bottom: 51%;
    font-size: 40px;
    color: rgba(25 ,33, 214, 0.8);
    z-index: 102;
    width: 21px;
    height: 60px;
    background: url("/img/icon_arrow.png") no-repeat 0 -60px;
    &:hover {
      color: rgba(25, 33 ,214, 0.4);
      animation-play-state: paused;
      background: url("/img/icon_arrow.png") no-repeat -21px -60px;
    }
  }
  .cesiumMap{
    position: fixed;
    right: 24%;
    bottom: 16%;
    font-size: 40px;
    color: rgb(0, 0, 0);
    z-index: 102;

    &:hover {
      color: rgba(0, 0, 0, 0.4);
      animation-play-state: paused;
    }
  }
  .ol-layer{
    canvas{
      width: 100%;
    }
  }
  .rightChild{

  }
  .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
  }
}
</style>
<style lang="less">
@import "../style/bottommenu.less";
</style>
