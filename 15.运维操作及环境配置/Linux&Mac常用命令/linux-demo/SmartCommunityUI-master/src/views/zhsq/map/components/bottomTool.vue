<template>
<div class="bottomToolDiv">
  <div class="button-group">
    <Button v-for="(item,i) in treeData"  @click="show(i)"><Icon :type="item.icon" :style="{color:item.color}"/>
      {{ item.name }}</Button>
  </div>
  <Card v-if="cardShow" class="toolCard">
    <Button @click="cardShow=false" style="position: absolute;right: 0;top: 0;" shape="circle"
            size="small" icon="md-close" ghost></Button>
    <div v-for="(item,i) in showList">
        <div v-if="item.typeId!='6'" class="titleName">{{ item.name }}</div>
        <Checkbox v-model="checkedList[items.id]" v-if="items.typeId=='0'"  v-for="(items,j) in item.children" @on-change="seach(items)">
          <img style="height:14px;" :src=items.icon />
          {{ items.name }}</Checkbox>
    </div>
  </Card>
</div>
</template>
<script>
  import { getBasicGrids } from '@/api/zhsq/basicGrids/basicGrids'
  import {Polygon, Point} from 'ol/geom'
  import Feature from 'ol/Feature'
  import {Fill, Icon, Stroke, Style, Text,Circle} from 'ol/style'
  import {Vector as VectorSource} from "ol/source";
  import VectorLayer from "ol/layer/Vector";
  import {Map, View} from "ol";
  import {treeData} from '@/api/zhsq/tZhsqBottomTool/tZhsqBottomTool';

  import TileLayer from 'ol/layer/Tile';
  import WMTS from 'ol/source/WMTS';
  import ImageWMS from 'ol/source/ImageWMS';
  import WMTSTileGrid from 'ol/tilegrid/WMTS';
  import {TileArcGISRest} from 'ol/source';
  import {Image as ImageLayer} from 'ol/layer';
  import {ImageArcGISRest} from 'ol/source';
  import { get as getProjection } from 'ol/proj';
  import { getWidth, getTopLeft } from 'ol/extent';

  import {sendAjax} from "../../tBottomToolManagement/dataMapping";
  import {fromLonLat} from 'ol/proj';
	export default {
		name: "bottomTool",
    data() {
      return {
          showList:[],
          cardShow:false,
          checkID:null,
          icon:"/tempfile/img/archives/jianzhu.png",//require("@/assets/map/icon_yaosu_dangzhibu.png"),
          treeData:[],
          checkedList: {},
          layerlist: this.$parent.layerlist,
      }
    },
    created() {
      treeData().then(res => {
        if (res && res.success) {
          //this.treeLoading = false;
          this.treeData = res.data.records;
        }else{
          //this.treeLoading = false;
        }
      });
    },
    mounted() {

    },
    methods: {
      //遍历查询修改
      setTreeData(data) {//初始化树结构
        if (data) {
          for (let i in data) {
            if (this.checkedList[data[i].id]){
              this.checkedList[data[i].id]=false
              data[i].pick=false
              this.$parent.map.removeLayer(this.layerlist[data[i].id])
            }
            if (data[i].children) {
              data[i].children = this.setTreeData(data[i].children);
            }
          }
        }
        return data
      },
      //展示弹出窗口
      show(val){
        if(this.checkID!=val){
          this.showList=this.treeData[val].children;
          this.cardShow=true
          this.checkID=val
        }else{
          this.cardShow=false
          this.checkID=null
        }
      },
		  //关闭所有按钮
      closeAll(){
        this.setTreeData(this.showList)
        console.log(this.showList)
        console.log(this.checkedList)
      },
      //查询
      seach(e){
        e.pick=!e.pick
        let map=this.$parent.map;
        if (!this.layerlist[e.id]){
          let layer=null;
          switch(e.typeId) {
            case "0":
              layer=this.draw(e)
              break;
            case "1":
              layer=this.createXYZLayer()
              break;
            case "2":
              layer=this.createTdtWMTSLayer(e)
              break;
            case "3":
              layer=this.createTdtWMSLayer()
              break;
            case "4":
              layer=this.craetTileArcGISRest()
              break;
            case "5":
              layer=this.createImageArcGISRest()
              break;
            default:
              break;
          }
          if (layer){
            this.layerlist[e.id]=layer;
          }
        }else{
          if(e.pick){
            map.addLayer(this.layerlist[e.id])
          }else {
            map.removeLayer(this.layerlist[e.id])
          }
        }
      },
      //xyz加载
      createXYZLayer(){
        var layer= new ol.layer.Tile({
          source : new ol.source.XYZ({
            url : 'http://localhost:8080/baseMap/{z}/{x}/{y}.png'
          })
        });
        return layer;
      },
      //加载arcgis切片服务
      craetTileArcGISRest(){
        var layer=new TileLayer({
            //extent: [107.66615218883604, 16.780085439091835, 113.39113536886373, 20.948901121306612],
            source: new TileArcGISRest({
              url: 'http://localhost:6080/arcgis/rest/services/layer_base/MapServer'
            })
        })
        return layer;
      },
      //加载动态渲染服务
      createImageArcGISRest(){
        var layer=new ImageLayer({
          source: new ImageArcGISRest({
            ratio: 1,
            params: {},
            url: 'http://localhost:6080/arcgis/rest/services/layer_hainan/MapServer'
          })
        })
        return layer;
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
      createTdtWMSLayer(){
        var layer = new ImageLayer({
          source: new ImageWMS({
            crossOrigin: 'anonymous',
            url: 'http://192.168.0.250:6080/arcgis/services/test/MapServer/WMSServer',
            params: {
              'FORMAT': 'image/png',
              'VERSION': '1.1.1',
              "LAYERS": '0,1,2,3,4,5,6,7,8,9,10'
            }
          })
        })
        return layer;
      },
      //创建图层
      creatLayer(res3){
        let data;
        let features=[]
        if (res3.data.length){
          for (var i=0;i<res3.data.length;i++){
            data = res3.data[i];
            if (data.location){
              let position =JSON.parse(data.location);
              let coordinates=[];
              for(let i=1;i<position.length;){
                coordinates.push([position[i-1],position[i]])
                i=i+2
              }
              var polygon = new Polygon([coordinates]);
              let feature=new Feature(polygon)
              feature.property=data
              features.push(feature)
            }else if (data.position){
              const position =JSON.parse(data.position);
              const coordinates=[];
              for(let i=1;i<position.length;){
                coordinates.push([position[i-1],position[i]])
                i=i+2
              }
              var polygon = new Polygon([coordinates]);
              features.push(new Feature(polygon))
            }
          }
        }else{
          for (var i=0;i<res3.data.records.length;i++){
            data = res3.data.records[i];
            if (data.location){
              let position =JSON.parse(data.location);
              let coordinates=[];
              for(let i=1;i<position.length;){
                coordinates.push([position[i-1],position[i]])
                i=i+2
              }
              var polygon = new Point([coordinates]);
              let feature=new Feature(polygon)
              feature.property=data
              features.push(feature)
            }else if (data.position){
              var position =JSON.parse(data.position);
              var point = new Point(position);
              var feature=new Feature(point)
              feature.parameters=data;
              features.push(feature)
            }
          }
        }

        let minX = null; let minY = null; let maxX = null; let maxY = null
        features.forEach(item => {
          let boundsArry = item.getGeometry().getExtent()
          if (minX === null) {
            minX = boundsArry[0]
            minY = boundsArry[1]
            maxX = boundsArry[2]
            maxY = boundsArry[3]
          } else {
            minX = Math.min(boundsArry[0], minX)
            minY = Math.min(boundsArry[1], minY)
            maxX = Math.max(boundsArry[2], maxX)
            maxY = Math.max(boundsArry[3], maxY)
          }
        })
        const bounds = [minX, minY, maxX, maxY]

          this.$parent.map.getView().fit(bounds, {
            'duration': 2000,
            'padding': [200, 200, 200, 200]
          })

        var polygonSource = new VectorSource({
          features:features,
        });
        let vectorLayer = new VectorLayer({
          source: polygonSource,
          style: new Style({
            stroke: new Stroke({
              color: 'rgba(0, 0, 255, 0.1)',
              width: 2
            }),
            // image: new Circle({
            //   src:"/img/zhsqImage/icon_map_point4_1@2x.png",
            //   fill: new Fill({
            //     color: 'rgba(192, 192, 192, 0.5)'
            //   }),
            //   stroke: new Stroke({
            //     color: 'rgba(192, 0, 0, 1)',
            //     width: 2
            //   }),
            //   radius: 10,
            // }),
            image: new Icon({
              src:"/img/zhsqImage/icon_map_point4_1.png",
            }),
            fill: new Fill({
              color: 'rgba(117, 117, 117, 0.2)'
            })
          })
        });
        return vectorLayer;
      },
      //画线
      draw(res3){
        let layer =null;
        let _this=this;
        let map=this.$parent.map;
        var type="get"
        if (res3.url=="/api/cameraInfo/loadAllByQuery"){
          type="post"
        }
        sendAjax({
          url: res3.url,
          type:type,
          data:JSON.stringify({ pageNum: 1,
            pageSize: 2,
            gridId: null}) ,
          contentType: "application/json",
          success: function (result) {
            let layer =_this.creatLayer(result)
            _this.layerlist[res3.id]=layer;
            if(res3.pick){
              map.addLayer(_this.layerlist[res3.id])
            }else {
              map.removeLayer(_this.layerlist[res3.id])
            }
          },
        });
      },
    },
    watch: {

    }
	}
</script>

<style lang="less">
.bottomToolDiv{
  position: fixed;
  width: 780px;
  bottom: 20px;
  left: 50%;
  margin-left: -390px;
  z-index: 11;
  height: 40px;
  .button-group{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    .ivu-btn{
      height: 40px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: center;
      justify-content: center;
      width: 120px;
    }
    .ivu-icon{
      font-family :"Ionicons";
      font-size :14px;
      margin-right: 5px;
    }
    .icon-wangge{
      color: #1885ff;
    }
    .icon-shijian{
      color: #29d293;
    }
    .icon-dangzuzhi{
      color: #ff2d0d;
    }
    .icon-jianzhu{
      color: #ff9a01;

    }
    .icon-bujian{
      color: #6c2cdc;
    }
    .icon-qita{
      color: #69c7e5;
    }

  }
  .toolCard{
    width: 560px;
    max-height: 600px;
    position: absolute;
    bottom: 50px;
    left: 105px;
    overflow-y: auto;
  }
  .titleName{
    font-size: 1vw;
    font-weight: 600;
    margin-bottom:10px;
  }
  .gap{
    margin-bottom:10px;
  }
}
</style>
