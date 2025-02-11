<template>
  <Modal
    v-model="show"
    :title="editTitle"
    :mask-closable="false"
    class="tPlot"
    :z-index="zindex"
    :width="modalWidth"
    @on-ok="ok"
    @on-cancel="cancel"
  >

    <div  @click="fuzzyShow=false" :id="divId" :style="{height: height, width: '100%',position:'relative'}">
      <!-- <Select
        v-model="searchName"
        filterable
        placeholder="请输入地址"
        class="queryclass"
        label-in-value
        @on-query-change="searchbyName"
        @on-change="flyto"
      >
        <Option v-for="(item,i) in cityList" :key="i" :value="item.hotPointID">{{ item.name }}</Option>
      </Select> -->
      <div class="serch" @click.stop="fuzzyShow=true">
          <div @click.stop="fuzzyShow=fuzzyShow">
            <Input class="queryclass" @on-focus="fuzzyQuery" @on-change="fuzzyQuery" v-model="searchName" search @on-search="searchbyName" enter-button placeholder="请输入地址" />
          </div>
          <div>
            <ul v-if="fuzzyShow" class="suggests">
              <li @click.stop="searchFuzzy(item)" v-for="(item,i) in fuzzyArr" :key="'a'+i" >
                  <span  class="name">{{item.name}}</span>
                  &nbsp;
                  <span class="address">{{item.address}}</span>
              </li>
            </ul>
          </div>
      </div>

      <Drawer :transfer="false" :inner="true" title="搜索结果" width=400 :mask="false" placement="left" v-model="showResult">
				<div class="results">
					<ul>
						<li v-for="(item,i) in cityList" :key="i">
							<div class="content" @click="flyto(item)">
                <span class="place_name">{{item.name}}</span>
								<span class="info">地址：{{item.address}}</span>
							</div>
						</li>
					</ul>
				</div>
         <Page @on-change="pageNumberChange" :current="pageNumber" :total="pageTotal" simple />
			</Drawer>
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
        <svg-icon :icon-class="isDraw?'ann_gb_active':'ann_gb'"/>
      </div>
      <div class="baseMapTool">
        <div class="btnRadar" v-bind:class="{ 'btnRadar-active': isBtPlot}" @click="showdituplot()">
          <svg-icon icon-class="ann_wx"/>
          <span>已标设施</span>
          <div class="dividerDelete"></div>
        </div>
        <div class="btnGrid" v-bind:class="{ 'btnGrid-active': BtGrid}" @click="changdituGrid()">
          <svg-icon icon-class="ann_qy"/>
          <span>网格区域</span>
          <div class="dividerDelete"></div>
        </div>
        <div class="btnColumn" v-bind:class="{ 'btnColumn-active': dianji}" @click="changditu()">
          <svg-icon icon-class="ann_ss"/>
          <span>卫星影像</span>
        </div>
      </div>

    </div>
  </Modal>
</template>
<script>
  import 'ol/ol.css'
  import Map from 'ol/Map'
  import {
    getArea
  } from 'ol/sphere'

  import {get as getProj} from 'ol/proj'
  import {createXYZ,getForProjection}  from 'ol/tilegrid'
  import {
    getCenter,
    boundingExtent,
    getTopLeft
  } from 'ol/extent'
  import View from 'ol/View'
  import {
    Polygon,
    Point
  } from 'ol/geom'
  import {
    Draw
  } from 'ol/interaction'
  import {
    Tile as TileLayer,
    Vector as VectorLayer
  } from 'ol/layer'
  import {
    Vector as VectorSource,
    XYZ,WMTS
  } from 'ol/source'
  import {
    Icon,
    Fill,
    Stroke,
    Style,
    Text
  } from 'ol/style'
  import {
    queryAllList
  } from '@/api/zhsq/basicGrids/basicGrids'
  import {
    queryAllBasicFileList
  } from '@/api/zhsq/basicFile/basicFile'
  import Feature from 'ol/Feature'
  import GeoJSON from 'ol/format/GeoJSON'
  import {
    loadFile
  } from '../../../api/zhsq/basicFile/basicFile'
  import {
    nginxUrl,center
  } from '@/api/tools/tool'

  import $ from 'jquery'

  export default {
    name: 'Plot',
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modalTitle: {
        type: String,
        default: ''
      },
      // 传回来反显的 坐标点数组
      objData: {
        type: Array
      },
      // 传回来的类型  面 还是  点
      selectType: {
        type: String,
        default: ''
      },
      divId: {
        type: String,
        default: '111'
      },
      modalWidth: {
        type: Number,
        default: 800
      },
      iconPath: {
        type: String,
        default: '/img/archives/tb_dt_d.png'
      },
      buildingData: {
        type: Array
      }
    },
    data() {
      return {
        zindex: 9000,
        gbCode:"",//区域编码
        fuzzyArr:[],//预加载数组
        searchZoom:'',//搜索层级
        fuzzyShow:false,//预加载
        searchName: null,//搜索名称
        showResult:false,//是否展示搜索结果
        mapBound:"",//搜索范围
        pageNumber:0,//搜索当前页数
        pageTotal:0,//搜索分页总数
        resultPoint: [],
        resultType: '',
        show: this.value, // 是否显示
        editTitle: this.modalTitle, // 标题
        loading: true,
        height: 0,
        width: 0,
        source: new VectorSource(),
        map: null,
        zoom: 16,
        cityList: null,
        dianji: false, // 高德地图
        dianji2: false, // 2.5D
        BtGrid: false, // 网格区域
        Btzoology: false, // 生态
        Btindustry: false, // 产业
        DBdown: false, // 清除重绘
        Btplot: false, // 标绘图层
        isDraw: false,//是否点击了标绘
        isBtPlot: false, // 标绘图层
        center: null, // 中心点
        Area: null, // 面积
        modify: null,
        select: null,
        vector: new VectorLayer({
          style: new Style({
            fill: new Fill({
              color: 'rgba(18,187,194,0.3)'
            }),
            stroke: new Stroke({
              color: '#12bbc2',
              width: 2
            }),
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: this.iconPath
            })
          })
        }),
        sourceGrid: new VectorSource(), // 网格
        vectorGrid: new VectorLayer({
          style: new Style({
            stroke: new Stroke({
              color: '#ff0000',
              width: 2
            })
          })
        }),
        sourceindustry: new VectorSource(), // 产业
        vectorindustry: new VectorLayer(),
        sourcezoology: new VectorSource(), // 生态
        vectorzoology: new VectorLayer(),
        sourceplot: new VectorSource(), // 标绘
        vectorplot: new VectorLayer()
      }
    },
    watch: {
      value(val) {
        this.show = val
      },
      show(val) {
        if (val) {
          this.fuzzyArr=[]//预加载数组
          this.searchZoom=''//搜索层级
          this.fuzzyShow=false//预加载
          this.searchName= null//搜索名称
          this.showResult=false//是否展示搜索结果
          const that = this
          setTimeout(function () {
            if (that.dianji) {
              that.changditu()
            }
            if (that.BtGrid) {
              that.changdituGrid()
            }
            if (that.Btzoology) {
              that.changdituzoology()
            }
            if (that.Btindustry) {
              that.changdituindustry()
            }
            if (that.map == null) {
              that.init2()
              // that.showmodel()
            }
            if (that.DBdown) {
              that.agiandraw()
            }
            if (that.Btplot) {
              that.showdituplot()
            }
            that.init()
          }, 1)
        } else {
          this.closeModal(val)
        }
      }
    },
    created() {
      this.height = Math.floor(document.body.scrollHeight * 0.65) + 'px'
      this.width = Math.floor(document.body.scrollWidth * 0.6) + 'px'
    },
    methods: {
      // 已标绘内容
      showdituplot() {
        this.isBtPlot = !this.isBtPlot;
        if (this.Btplot == false) {
          if (this.buildingData) {
            this.buildingData.forEach(element => {
              const objData = JSON.parse(element.location)
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
              var feature = new Feature(myPolygon)
              feature.setStyle(
                new Style({
                  stroke: new Stroke({
                    color: '#faad14',
                    width: 2
                  }),
                  fill: new Fill({
                    color: 'rgba(250,173,20,0.3)'
                  }),
                  text: new Text({
                    font: 'bold 15px 宋体',
                    text: element.housingEstateName,
                    fill: new Fill({
                      color: 'rgba(14, 209, 69,1)'
                    })
                  })
                })
              )
              this.sourceplot.addFeature(feature)
            })
            this.map.addLayer(this.vectorplot)
            this.Btplot = true
          }
        } else {
          this.sourceplot.clear()
          this.map.removeLayer(this.vectorplot)
          this.Btplot = false
        }
      },
      // 生态范围区域
      changdituzoology() {
        if (this.Btzoology == false) {
          this.seachjson()
          this.map.addLayer(this.vectorzoology)
          this.Btzoology = true
        } else {
          this.map.removeLayer(this.vectorzoology)
          this.Btzoology = false
        }
      },
      // 产业区域
      changdituindustry() {
        if (this.Btindustry == false) {
          this.seachjson()
          this.map.addLayer(this.vectorindustry)
          this.Btindustry = true
        } else {
          this.map.removeLayer(this.vectorindustry)
          this.Btindustry = false
        }
      },
      // 网格范围区域
      changdituGrid() {
        if (this.BtGrid == false) {
          this.seachGrid()
          // 添加到地图上
          this.map.addLayer(this.vectorGrid)
          this.BtGrid = true
        } else {
          this.map.removeLayer(this.vectorGrid)
          this.BtGrid = false
        }
      },
      // 更换底图
      showmodel() {
        if (this.dianji2 == false) {
          // this.TiandiMap_img2 = new TileLayer({
          //   name: '2.5维图层',
          //   source: new XYZ({
          //     url: 'http://218.88.215.93:8014/sw/{z}/{x}/{y}.png',
          //     wrapX: false
          //   })
          // })
          // this.TiandiMap_img2.setZIndex(2)
          // // 添加到地图上
          // this.map.addLayer(this.TiandiMap_img2)
          this.dianji2 = true
        } else {
          this.map.removeLayer(this.TiandiMap_img2)
          this.dianji2 = false
        }
      },
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
          this.TiandiMap_img.setZIndex(1)
          this.map.addLayer(this.TiandiMap_img)
          this.dianji = true
        } else {
          this.map.removeLayer(this.TiandiMap_img)
          this.dianji = false
        }
      },
      // 清除重绘
      agiandraw() {
        this.resultPoint = []
        document.getElementsByClassName("ol-layers")[0].classList.add("canvasPoint")
        this.isDraw = true
        if (this.DBdown) {
          this.map.removeInteraction(this.Copydraw)
          this.DBdown = false
        } else {
          this.source.clear() // 清除标绘
          this.addInteraction()
          this.DBdown = true
        }
      },
      init2() {
        this.map = new Map({
          target: this.divId,
          layers: [
            new TileLayer({
              source: new XYZ({
                url: 'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'
              }),
              isGroup: true,
              name: '天地图图层'
            }),
            new TileLayer({
              source: new XYZ({
                url: 'https://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'
              }),
              isGroup: true,
              name: '标注图层'
            })
          ],
          view: new View({
            projection: 'EPSG:4326', // 使用这个坐标系
            center:center ,//[120.382609, 36.067108], // [122.03826396843246,39.95882481966137], // 泸州[105.363867, 28.75983]
            zoom: this.zoom,
            maxZoom: 18
          })
        })
        // 添加矢量图层
        this.vector.setZIndex(21)
        this.map.addLayer(this.vector)
        this.vectorplot.setZIndex(12)
        this.vectorplot.setSource(this.sourceplot)
        this.vectorGrid.setZIndex(11)
        this.vectorindustry.setZIndex(10)
        this.vectorzoology.setZIndex(9)
      },
      // 查询所有网格区域范围
      seachGrid() {
        this.sourceGrid = new VectorSource() // 网格
        queryAllList({}).then((res) => {
          if (res && res.success) {
            res.data.forEach((element) => {
              if (element.position) {
                const objData = JSON.parse(element.position)
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
                var feature = new Feature(myPolygon)
                feature.setStyle(
                  new Style({
                    stroke: new Stroke({
                      lineDash: [1, 2, 3, 4, 5, 6, 7, 8],
                      color: '#757575',
                      width: 1
                    }),
                    fill: new Fill({
                      color: '#a1a1a12a'
                    }),
                    text: new Text({
                      text: element.communityName + element.name,
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
                )
                this.sourceGrid.addFeature(feature)
              }
            })
            this.vectorGrid.setSource(this.sourceGrid)
          }
        })
      },
      // 查询所有json文件
      seachjson() {
        queryAllBasicFileList({}).then((res) => {
          const _this = this
          if (res && res.success) {
            res.data.forEach((element) => {
              const url = nginxUrl + element.filePath
              const substring = url.toString().substring(url.toString().lastIndexOf('/'), url.toString().length)
              loadFile(substring).then(res => {
                _this.SaveGeoJSON2(element, res.data)
              }).catch(res => {

              })
            })
          }
        })
      },
      // 保存GeoJSON文件中的图形
      SaveGeoJSON2(element, url) {
        this.sourceindustry = new VectorSource() // 产业
        this.sourcezoology = new VectorSource() // 生态
        let color
        if (element.fillColor) {
          color = element.fillColor
        } else {
          color = '#00ff48'
        }
        const pJSON = new GeoJSON().readFeatures(url)
        for (let i = 0; i < pJSON.length; i++) {
          if (pJSON[i] != undefined && pJSON[i] != null) {
            pJSON[i].setStyle(
              new Style({
                stroke: new Stroke({
                  color: 'black',
                  width: 1
                }),
                fill: new Fill({
                  color: color
                })
              })
            )
          }
        }
        // 产业
        if (element.type == 1) {
          this.sourceindustry.addFeatures(pJSON)
          this.vectorindustry.setSource(this.sourceindustry)
        }
        // 生态
        else if (element.type == 2) {
          this.sourcezoology.addFeatures(pJSON)
          this.vectorzoology.setSource(this.sourcezoology)
        }
      },
      addInteraction() {
        var that = this
        var draw // global so we can remove it later
        var value = this.selectType
        if (value !== 'None') {
          draw = new Draw({
            source: this.source,
            type: this.selectType
            // freehand: true//自由作画
          })
          that.Copydraw = draw
          that.map.addInteraction(draw)
        }
        draw.on('drawend', function (evt) {
          that.resultPoint = evt.feature.values_.geometry
          that.resultType = value
          // 获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
          var extent2 = boundingExtent(
            evt.feature.values_.geometry.getCoordinates()[0]
          )
          // 获取边界区域的中心位置
          that.center = getCenter(extent2)
          var area = getArea(evt.feature.values_.geometry, {
            projection: 'EPSG:4326'
          })
          // 获取所绘制面的面积单位平方米
          that.Area = Math.round(area * 100) / 100
          that.map.removeInteraction(draw)
          that.DBdown = false
        })
        draw.on('drawstart', function (evt) {
          that.source.clear() // 清除标绘
        })
      },
      // 通过名称搜索
      searchbyName() {
        this.fuzzyShow=false
        this.showResult = true;
        this.mapBound= this.getMapBound()
        this.searchZoom = Math.round(this.map.getView().getZoom());
        this.pageNumber=1
        this.pageTotal=0
        this.cityList =[]
        let specifyAdminCode=this.gbCode;
        let url=""
        if(specifyAdminCode){
           url='https://api.tianditu.gov.cn/search?postStr={"yingjiType":0,"sourceType":0,"keyWord":"'+this.searchName+'","level":'+this.searchZoom+',"mapBound":"'+this.mapBound+'","queryType":1,"start":0,"count":10,"specifyAdminCode":"'+specifyAdminCode+'","queryTerminal":10000}' +
                '}&type=query&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'
        }else{
          url='https://api.tianditu.gov.cn/search?postStr={"yingjiType":0,"sourceType":0,"keyWord":"'+this.searchName+'","level":'+this.searchZoom+',"mapBound":"'+this.mapBound+'","queryType":1,"start":0,"count":10,"queryTerminal":10000}' +
            '}&type=query&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'
        }
        if (this.searchName) {
          this.search(url)
        }
      },
      //页码更改回调
      pageNumberChange(val) {
        this.fuzzyShow=false
        if(val&&val!=0){
            let pageNumber=10*(val-1);
            let specifyAdminCode=this.gbCode;
            let url=""
            if(specifyAdminCode){
              url='https://api.tianditu.gov.cn/search?postStr={"yingjiType":0,"sourceType":0,"keyWord":"'+this.searchName+'","level":'+this.searchZoom+',"mapBound":"'+this.mapBound+'","queryType":1,"start":'+pageNumber+',"count":10,"specifyAdminCode":"'+specifyAdminCode+'","queryTerminal":10000}' +
                '}&type=query&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'
            }else{
              url='https://api.tianditu.gov.cn/search?postStr={"yingjiType":0,"sourceType":0,"keyWord":"'+this.searchName+'","level":'+this.searchZoom+',"mapBound":"'+this.mapBound+'","queryType":1,"start":'+pageNumber+',"count":10,"queryTerminal":10000}' +
                '}&type=query&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'
            }
            if (this.searchName) {
              this.search(url)
            }
        }
      },
      //获取显示范围
      getMapBound(){
          let arr= this.map.getView().calculateExtent(this.map.getSize())
          let string=arr.join(",");
          return string;
      },
      //根据预加载信息查询
      searchFuzzy(item){
          this.searchName=item.name;
          this.fuzzyShow=false;
          if(item.gbCode){
            this.gbCode=item.gbCode;
          }else{
              this.gbCode=null;
          }
          this.searchbyName();
      },
      //预加载
      fuzzyQuery(){
        this.fuzzyArr=[]
        if (this.searchName) {
          this.mapBound= this.getMapBound()
          this.searchZoom = Math.round(this.map.getView().getZoom());
          this.search(
            'https://api.tianditu.gov.cn/search?postStr={"yingjiType":0,"sourceType":0,"keyWord":"'+this.searchName+'","level":'+this.searchZoom+',"mapBound":"'+this.mapBound+'","queryType":4,"start":0,"count":300,"queryTerminal":10000}' +
            '}&type=query&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'
          ,"fuzzy")
        }else{
          this.fuzzyShow=false
        }
      },
      // 搜索功能
      search(Surl,type) {
        const _this = this
        $.ajax({
          // url中的参数含义参见百度地图官网webAPI文档
          url: Surl,
          type: 'get',
          async: false,
          dataType: "json",
          contentType: "application/json;charset=UTF-8", //类型必填
          success: function (data) {
            if(type&&type=="fuzzy"){
                if(data.suggests){
                  _this.fuzzyShow=true
                  _this.fuzzyArr=data.suggests;
                }
            }
            if (data.count == "0") {

            }
            else if (data.area)
            {
                _this.pageTotal=Number(data.count)
                data.area["address"]=data.area.name
                _this.cityList = [data.area]
                _this.flyto(data.area);
            }
            else if (data.pois&&data.pois.length>0)
            {
                _this.pageTotal=Number(data.count)
                _this.cityList =data.pois
                _this.flyto(data.pois[0]);
            }
          },
          error: function (data) {
          }
        })
      },
      init() {
        var that = this
        this.map.getTargetElement().style.cursor="auto"
        this.source.clear() // 清除标绘
        // this.source = new VectorSource();
        var feature
        if (this.objData && this.objData.length != 0) {
          if (that.selectType == 'Point') {
            var mypoint = new Point(this.objData)
            this.resultPoint = mypoint
            feature = new Feature(mypoint)
            // 坐标点样式
            const pointStyle = new Style({
              image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: this.iconPath
              })
            })
            feature.setStyle(pointStyle)
          }
          if (that.selectType == 'Polygon') {
            var arr = []
            var newArr = []
            for (let i = 0; i < this.objData.length; i++) {
              newArr.push(this.objData[i])
              if (i % 2 == 1) {
                arr.push(newArr)
                newArr = []
              }
            }
            var myPolygon = new Polygon([arr])
            this.resultPoint = myPolygon
            feature = new Feature(myPolygon)
          }
          this.source.addFeatures([feature])
        } else {
          this.resultPoint = []
        }
        this.vector.setSource(this.source)
        // 反显定位
        if (this.objData && this.objData.length != 0) {
          this.map.getView().setCenter([this.objData[0], this.objData[1]])
          this.map.getView().setZoom(16)
        } else {
          this.map.getView().setCenter(center)//泸州
          //this.map.getView().setCenter([120.382609, 36.067108])// 青岛
          this.map.getView().setZoom(14)
        }
        // this.addInteraction();
      },
      closeModal(val) {
        this.$emit('input', val)
      },
      ok() {
        this.$emit('resultPoint', this.resultPoint, this.resultType)
        this.closeModal(false)
      },
      cancel() {
        document.getElementsByClassName("ol-layers")[0].classList.remove("canvasPoint")
        this.closeModal(false)
      },
      //定位
      flyto(val) {
        if(val&&val.lonlat){
            let str=val.lonlat.replace(",", " ")
            let loatlist=str.split(" ");
            if(loatlist&&loatlist.length==2){
                 this.map.getView().setCenter(loatlist)
            }
        }
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
      }
    }
  }
</script>
<style lang="less">
  .tPlot {
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

    // .ivu-select-input {
    //   height: 48px;
    //   line-height: 48px;
    // }
    .ivu-input{
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

    .queryclass {
      width: 420px;
      height: 48px;
    }
    .serch{
      position: absolute;
      top: 10px;
      z-index: 9999;
      left: 10px;
    }
    .suggests{
      width: 420px;
      background: #fff;
      border: 1px solid #dcdee2;
      overflow-x: hidden;
      border-top: 0;
      line-height: 34px;
      max-height: 200px;
      //滚动条样式
      &::-webkit-scrollbar {
        width: 0;
      }
      li:hover{
        background: #f2f2f2;
        cursor: pointer;
      }
      li .name{
          font-size: 14px;
          line-height: 34px;
          margin-left: 10px;
      }
      li .address{
          font-size: 12px;
          color: #b8b8b8;
      }
    }
    .suggests:hover {
      overflow-y: scroll;
    }
    .suggests:hover::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    // .suggests:-webkit-scrollbar {
    //     display: none;
    // }

    .suggests:hover::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #aaa;
    }

    .suggests:hover::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      background: #ededed;
      display: none;
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
      right: 112px;
      width: 346px;
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
        width: 110px;

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

    .ivu-drawer-content {
      width: 280px;
      height: 70%;
      position: absolute;
      top: 0;
      bottom: 0;
      background-color: #fff;
      border: 0;
      background-clip: padding-box;
      box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
      top: 14%;
      left: 16px;
	  }

	.pager {
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 12px;
	}

	.pager a {
		text-decoration: none;
		padding: 4px 8px;
		border: 1px solid #ccc;
		color: #000;
		margin: 0 1px;
	}

	.content {
		padding: 10px 0;
		line-height: 24px;
	}

	.content:hover {
		background-color: #f1f1f1;
		cursor: pointer;
	}

	.content span {
		display: block;
	}

	.content .place_name {
		color: #2f87eb;
	}
  .ivu-page{
    text-align: center;
  }
	.list_icon {
		margin-top: 8px;
		margin-left: 20px;
		width: 26px;
		height: 30px;
		float: left;

		background-repeat: no-repeat;
	}

	.ivu-drawer-body {
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.ivu-drawer-body::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 5px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}

	.ivu-drawer-body:-webkit-scrollbar {
		display: none;
	}

	.ivu-drawer-body::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #aaa;
	}

	.ivu-drawer-body::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 5px;
		background: #ededed;
		display: none;
	}
  }
</style>
