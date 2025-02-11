<template>
  <div class="gisMapDiv">
    <!--    二维地图-->
    <div id="mapEntity" class="mapEntity">
      <div id="overly" />
    </div>

    <!--   左侧展示栏-->
    <left-total @Invert="addPoint" ref="child" v-model="leftShow" v-show="isOpen"></left-total>
    <!--左侧开关-->
    <div  :class=" isOpen? 'sidebar':'sidebarActive'" @click="isOpen = !isOpen" title="侧边栏展示">
      <div class="sidebar-icon">
        <svg-icon icon-class="left" v-if="isOpen"/>
        <svg-icon icon-class="leftRight" v-else/>
      </div>
    </div>
    <!--   右上工具-->
    <right-tool></right-tool>
    <!--   底部工具-->
    <bottom-tool ref="bottomTool"></bottom-tool>
    <!--   框选弹出工具-->
    <selectInfo v-model="selectModel"></selectInfo>
    <eventDetail v-model="eventShow" :proc-inst-id="procInstId" :is-event-wait="isEventWait" :t-zhsq-task-list-id="tEventListId" modal-title="事件详情" />
    <lookBasicGrids v-model="lookShow" :basic-grids-id="BasicGridsId" modal-title="网格详情" />
    <div id="marker" style="height: 40px;width: 15px;background-size: 100% 100%;display: none"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
  import leftTotal from "./components/leftTotal";
  import rightTool from "./components/rightTool";
  import bottomTool from "./components/bottomTool";
  import selectInfo from './components/selectInfo';
  import 'ol/ol.css'
  import Feature from 'ol/Feature'
  import Overlay from 'ol/Overlay'
  import {Fill, Icon, Stroke, Style, Text} from 'ol/style'
  import {ImageArcGISRest, TileArcGISRest} from "ol/source";
  import {
    Tile as TileLayer,
    Heatmap as HeatmapLayer,
    Vector as VectorLayer,
    VectorImage,
    Image as ImageLayer
  } from "ol/layer";
  import {Map, View} from "ol";
  import Select from "ol/interaction/Select";
  import Point from 'ol/geom/Point';
  import VectorSource from 'ol/source/Vector';
  import eventDetail from './../events/eventQuery/eventDetail.vue';
  import lookBasicGrids from './../basicGrids/lookBasicGrids.vue';
  import { getWidth, getTopLeft } from 'ol/extent';
  import WMTSTileGrid from 'ol/tilegrid/WMTS';
  import {get as getProjection} from "ol/proj";
  import WMTS from "ol/source/WMTS";
  import GeoJSON from 'ol/format/GeoJSON'
  import ImageWMS from "ol/source/ImageWMS";
  import {getCenter} from "ol/extent";
	export default {
		name: "index",
    components: {
      leftTotal,
      rightTool,
      bottomTool,
      selectInfo,
      eventDetail,
      lookBasicGrids
    },
    data() {
      return {
        isOpen: true,
        eventShow:false,
        lookShow:false,
        BasicGridsId:"",
        procInstId:'',
        isEventWait: false,
        tEventListId:"",
        map:null,
        center: [ 105.482455, 28.511638 ],//地图中心
        leftShow:true,//左侧是否展示
        layerlist: {},
        lyr:null,
        overlay:new Overlay({}),
        source: new VectorSource(),//反显数据
        vector: new VectorImage(),//反显图层
        selectModel:false,
        select:new Select(),
        // 热力图假数据
        heatData: {
          type: 'FeatureCollection',
          features: [
            { type: 'Point', 'coordinates': [ 105.482455, 28.511638 ], count: 100 },
            { type: 'Point', 'coordinates': [ 105.492545, 28.521738 ], count: 100 },
          ]
        }
      }
    },
    mounted() {
      this.init()
      this.map.addInteraction(this.select);
      /**
       * 为map添加点击事件监听，渲染弹出popup
       */
      let that=this;

      const container = document.getElementById('popup');
      const closer = document.getElementById('popup-closer');
      /**
       * Create an overlay to anchor the popup to the map.
       */
      that.overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
        offset: [-15, -40]//图片偏移量
      });
      that.map.addOverlay(that.overlay)
      /**
       * Add a click handler to hide the popup.
       * @return {boolean} Don't follow the href.
       */
      closer.onclick = function () {
        that.overlay.setPosition(undefined);
        closer.blur();
        return false;
      };
      //地图加载
      this.map.addLayer(this.vector)
      //点击范围弹出框
      this.map.on('click', function (evt) {
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        var feature = that.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
        if (feature&&feature.property) {
          document.getElementById('popup').style.display='block';
          let content = document.getElementById('popup-content');
          let data=feature.property;
          let coordinate = getCenter(feature.getGeometry().getExtent());    // 点击的点经纬度
          content.innerHTML = '' +
            '<div class="ivu-row" style="cursor: pointer;">' +
            '<div class="ivu-col ivu-col-span-24">' +
            '<p class="pTextShow">' +
            data.grid +
            '</p>' +
            '<a class="aTextShow">' +
            data.city +
            '<div class="ivu-divider ivu-divider-vertical ivu-divider-default">' +
            '</div>' +
            data.community +
            '</a>' +
            '</div>' +
            '</div>';
          that.overlay.setPosition(coordinate);
          content.onclick=function (){
            that.lookShow=true;
            that.BasicGridsId=data.gridId
          }
        }else if(feature&&feature.parameters){//视频监控
          document.getElementById('popup').style.display='block';
          let content = document.getElementById('popup-content');
          let coordinate = getCenter(feature.getGeometry().getExtent());    // 点击的点经纬度
          content.innerHTML = ""
          let url = feature.parameters.url;
          if (feature.parameters.type && feature.parameters.type == "萤石") {
            let id = "yingshi" + feature.parameters.id;
            content.innerHTML = '<span id="headDivSpan"  class="titleLeft" style="left:0px">' +
              feature.parameters.name +
              '<br/><div class="home-video"  id="'+id+'" style="width:320px;height: 180px"></div>' +
              '<div class="divFenge"></div>'
            '</span>'
            let appSecret = feature.parameters.appSecret;
            let appKey = feature.parameters.appKey;
            //获取token
            $.ajax({
              url: "https://open.ys7.com/api/lapp/token/get",
              type: "post",
              timeout: 12000,
              dataType: "json",
              contentType: "application/x-www-form-urlencoded;charset=utf-8",
              data: {
                appKey: appKey,
                appSecret: appSecret,
              },
              success: function (result, status, xhr) {
                if (result && result.code == 200) {
                  let accessToken = result.data.accessToken;
                  let player = new EZUIKit.EZUIKitPlayer({
                    autoplay: true,
                    id: id,
                    accessToken: accessToken,
                    url: url,
                    template: "simple", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                    width: 320,
                    height: 180
                  });
                } else {
                  window.alert("获取萤石云token接口请求失败：返回异常");
                }
              },
              error: function (data) {
                window.alert("接口请求失败");
                //opts.error(data);
              }
            });
          } else {
            content.innerHTML = '<span id="headDivSpan"  class="titleLeft" style="left:0px">' + feature.parameters.name +
              '<br/><video class="home-video"  id="myVideo"  width="320" height="180" loop muted controls="controls"> <source src="' +
              url + '" type="video/mp4" /></video>'+
              '<div class="divFenge"></div>'
            '</span>'
          }

          that.overlay.setPosition(coordinate);
        }
      });
    },
    destroyed() {

    },
    methods:{
		    //视角定位
        flyTo(done) {
            let location =[ 105.482455, 28.511638 ]
            let view=this.map.getView();
            let duration = 2000;
            let zoom = view.getZoom();
            let parts = 2;
            let called = false;
            function callback(complete) {
              --parts;
              if (called) {
                return;
              }
              if (parts === 0 || !complete) {
                called = true;
                done(complete);
              }
            }
            view.animate(
              {
                center: location,
                duration: duration,
              },
              callback
            );
            view.animate(
              {
                zoom: zoom - 1,
                duration: duration / 2,
              },
              {
                zoom: zoom,
                duration: duration / 2,
              },
              callback
            );
          },
		    //创建热力图
        creatHeatmap(){
          let vector = new HeatmapLayer({
            // 矢量数据源
            source: new VectorSource({
              features: (new GeoJSON()).readFeatures(this.heatData, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:4326'
              }),
            }),
            blur: 20, // 模糊尺寸
            radius: 20 // 热点半径
          })
          return vector
        },
        //wmTS加载
        createTdtWMTSLayer(val) {
          const epsg = 'EPSG:4326';
          const projection = getProjection(epsg);
          const projectionExtent = projection.getExtent();
          const size = getWidth(projectionExtent) / 256;
          const length = 19;
          const resolutions = new Array(length);
          const matrixIds = new Array(length);
          for (let i = 0; i < length; i += 1) {
            const pow = Math.pow(2, i);
            resolutions[i] = size / pow;
            matrixIds[i] = i;
          }
          const source = new WMTS({
            url: val.url,
            layer: 'img',
            style: 'default',
            matrixSet: 'c',
            format: 'tiles',
            wrapX: true,
            tileGrid: new WMTSTileGrid({
              origin: getTopLeft(projectionExtent),
              resolutions,
              matrixIds,
            }),
          });
          const layer = new TileLayer({
            source,
          });
          return layer;
        },
        //wms加载
        createTdtWMSLayer(e){
          var layer = new ImageLayer({
            source: new ImageWMS({
              crossOrigin: 'anonymous',
              url: e.url,
              params: {
                'FORMAT': 'image/png',
                'VERSION': '1.1.1',
                "LAYERS": '0,1,2,3,4,5,6,7,8,9,10'
              }
            })
          })
          return layer;
        },
        //xyz加载
        createXYZLayer(e){
          var layer= new ol.layer.Tile({
            source : new ol.source.XYZ({
              url : e.url
            })
          });
          return layer;
        },
        //加载arcgis切片服务
        craetTileArcGISRest(e){
          var layer=new TileLayer({
            source: new TileArcGISRest({
              url: e.url
            })
          })
          return layer;
        },
        //加载动态渲染服务
        createImageArcGISRest(e){
          var layer=new ImageLayer({
            source: new ImageArcGISRest({
              ratio: 1,
              params: {},
              url: e.url
            })
          })
          return layer;
        },
		    //清除图片标绘
        clearVector(){
          this.$refs.bottomTool.closeAll();
          this.map.removeLayer(this.vector)
          this.vector=new VectorImage()//反显图层
          this.source=new VectorSource()//反显数据
          this.vector.setSource(this.source)
          this.map.addLayer(this.vector)
          document.getElementById('marker').style.display='none';
        },
		   //添加图标
        addPoint(e){
          let that=this;
          this.clearVector()
          this.source=new VectorSource()//反显数据
          let val=e.val;
          switch (e.type) {
            case "0":
              console.log(val)
              break;
            case "1":
              for (let i=0;i<val.length;i++){
                if (val[i].position){
                  let point=JSON.parse(val[i].position);
                  let mypoint = new Point(point)
                  let feature = new Feature(mypoint)
                  //feature.setStyle(this.getDefaultStyle())
                  feature.id=val[i].id
                  feature.type=e.type
                  feature.procInstId=val[i].procInstId
                  //this.source.addFeature(feature)
                  let aa = document.getElementById('marker');
                  let lyr =new Overlay({
                    position: point,//默认空
                    positioning: 'center-bottom',
                    element: aa,//绑定上面添加的元素
                    //stopEvent: false,
                    offset: [-13.5, -40]//图片偏移量
                  });
                  this.map.addOverlay(lyr);
                  var src = '/img/archives/ptsj_2.gif';//拼接图片地址
                  document.getElementById('marker').style.display='block';
                  document.getElementById('marker').style.backgroundImage = 'url(' + src + ')';
                  const content = document.getElementById('popup-content');
                  document.getElementById('marker').onclick=function (){
                    document.getElementById('popup').style.display='block';
                    content.innerHTML = '<div class="ivu-row" style="cursor: pointer;">' +
                      '<div class="ivu-col ivu-col-span-24">' +
                      '<p class="pTextShow">消防检查</p>' +
                      '<a class="aTextShow">消防设备检测<div class="ivu-divider ivu-divider-vertical ivu-divider-default">' +
                      '</div>四川省泸州市龙马潭区红星街道</a>' +
                      '<a class="aTextShow">2021-09-13 10:01:03</a></div>' +
                      '</div>';
                    that.overlay.setPosition(point);
                    content.onclick=function (){
                      that.eventShow=true;
                      that.tEventListId=feature.id
                      that.procInstId=feature.procInstId
                    }
                  }
                  lyr.setPosition(point); //显示
                }
              }
              break;
            case "5":
              for (let i=0;i<val.length;i++){
                if (val[i].position){
                  let point=JSON.parse(val[i].position);
                  // let mypoint = new Point(point)
                  // let feature = new Feature(mypoint)
                  // feature.setStyle(this.getDefaultStyle())
                  // feature.id=val[i].id
                  // feature.type=e.type
                  // feature.procInstId=val[i].procInstId
                  // this.source.addFeature(feature)

                  let aa = document.getElementById('marker');
                  let lyr =new Overlay({
                    id: "overlay",
                    position: point,//默认空
                    positioning: 'center-bottom',
                    element: aa,//绑定上面添加的元素
                    //stopEvent: false,
                    offset: [-13.5, -40]//图片偏移量
                  });
                  this.map.addOverlay(lyr);
                  var src = '/img/archives/ptsj_2.gif';//拼接图片地址
                  document.getElementById('marker').style.backgroundImage = 'url(' + src + ')';
                  lyr.setPosition(point); //显示

                }
              }
              break;
            default:
          }
          this.vector.setSource(this.source)

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
            target: 'mapEntity',
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
              center: this.center, // [120.382609, 36.067108], // 泸州[105.363867, 28.75983]
              zoom: 9.5,
              maxZoom: 22
            })
          })
        },
        //设置图标样式
        getDefaultStyle() {
          let zoom = this.map.getView().getZoom();  //获取当前地图的缩放级别
          // var zoom = 16
          let imgSrc =''// '/img/archives/lou_on.png'
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
              crossOrigin: 'anonymous',
              // imgSize:[40,40],//图片大小
              src: imgSrc // 图片路径
            })
          })
          return style
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
      verifygridId(id, arr) {
        arr.forEach(element => {
          if (element.id == id) {
            return true
          }
        })
        return false
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
    }
	}
</script>

<style lang="less">
  .gisMapDiv{
    width: 100%;
    height: calc(100vh - 50px);
    .mapEntity{
      height: 100%;border-radius: 12px 12px 0px 0px;border: 1px solid #fff;
      .ol-zoom {
        display: none !important;
      }
    }
    .sidebar {
      position: fixed;

      font-size: 14px;
      background: transparent;
      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
      z-index: 102;

      top: 120px;
      transform: rotate(90deg);
      -ms-transform:rotate(90deg); 	/* IE 9 */
      -moz-transform:rotate(90deg); 	/* Firefox */
      -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
      -o-transform:rotate(90deg); 	/* Opera */
      left: 286px;
      cursor: pointer;
      .sidebar-icon{
        width: 45px;
        height: 18px;
        color: rgba(0,0,0,.65);
        transform: perspective(.5em) rotateX(5deg);
        -ms-transform:perspective(.5em) rotateX(5deg); 	/* IE 9 */
        -moz-transform:perspective(.5em) rotateX(5deg); 	/* Firefox */
        -webkit-transform:perspective(.5em) rotateX(5deg); /* Safari 和 Chrome */
        -o-transform:perspective(.5em) rotateX(5deg); 	/* Opera */
        transform-origin: bottom;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        background: #ffffff;
      }
      &:hover {
        .sidebar-icon{
          color: #1d79ff;

        }
      }
    }
    .ol-popup {
      display: none;
      position: absolute;
      background-color: white;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #cccccc;
      bottom: 12px;
      left: -50px;
      min-width: 280px;
    }
    .ol-popup:after, .ol-popup:before {
      top: 100%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }
    .ol-popup:after {
      border-top-color: white;
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
    .sidebarActive {
      position: fixed;

      font-size: 14px;
      background: transparent;
      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
      z-index: 102;
      top: 120px;
      transform: rotate(90deg);
      -ms-transform:rotate(90deg); 	/* IE 9 */
      -moz-transform:rotate(90deg); 	/* Firefox */
      -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
      -o-transform:rotate(90deg); 	/* Opera */
      left: -13px;
      cursor: pointer;
      .sidebar-icon{
        width: 45px;
        height: 18px;
        font-size: 14px;
        color: rgba(0,0,0,.65);
        transform: perspective(.5em) rotateX(5deg);
        -ms-transform:perspective(.5em) rotateX(5deg); 	/* IE 9 */
        -moz-transform:perspective(.5em) rotateX(5deg); 	/* Firefox */
        -webkit-transform:perspective(.5em) rotateX(5deg); /* Safari 和 Chrome */
        -o-transform:perspective(.5em) rotateX(5deg); 	/* Opera */
        transform-origin: bottom;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        background: #ffffff;
      }
      &:hover {
        .sidebar-icon{
          color: #1d79ff;

        }
      }
    }
  }
</style>
