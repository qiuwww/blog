<template>
  <div class="right-tool">
    <div class="data-tabs">
      <div class="data-tabs-item">
        <button  @click="claerAll" href="javascript:void(0)">
          <Icon type="ios-trash" class="icon-qingchu"/>
          清空
        </button>
      </div>
      <div class="data-tabs-item">
        <Dropdown trigger="click">
          <button href="javascript:void(0)">
            <Icon type="ios-pricetags" class="icon-celiang"/>
            测量
          </button>
          <DropdownMenu slot="list" style="margin-top: 10px">
            <DropdownItem  @click.native="huiz">测距</DropdownItem>
            <DropdownItem  @click.native="mianji">测面</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="data-tabs-item">
        <button @click="select" href="javascript:void(0)">
          <Icon type="md-brush" class="icon-kuangxuan"/>
          框选
        </button>
      </div>
      <div class="data-tabs-item">
        <Dropdown trigger="click">
          <button href="javascript:void(0)">
            <Icon type="md-list-box" class="icon-show"/>
            显示
          </button>
          <DropdownMenu slot="list" style="margin-top: 10px">
            <DropdownItem @click.native="heatMap">热力图</DropdownItem>
            <DropdownItem>区域图</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="data-tabs-item">
        <button @click="showView" href="javascript:void(0)">
          <Icon type="md-map" class="icon-shitu"/>
          视图
        </button>
        <Tree v-if="listTree" @on-check-change="treeCheck" style="margin-top: 10px;position: absolute;right: 0; width:10vw;background-color: white;" :data="treeDataList" show-checkbox ></Tree>
      </div>
      <div class="data-tabs-item">
        <button @click="showAll" href="javascript:void(0)">
          <Icon type="ios-expand" class="icon-qingchu"/>
          全屏。
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Draw from 'ol/interaction/Draw'
  import VectorSource from 'ol/source/Vector';
  import VectorLayer from 'ol/layer/Vector';
  import Point from "ol/geom/Point";
  import {unByKey} from 'ol/Observable';
  import Overlay from 'ol/Overlay';
  import {Feature } from "ol";
  import {getLength,getArea} from 'ol/sphere';
  import LineString from 'ol/geom/LineString';
  import Polygon from 'ol/geom/Polygon';
  import {DragBox, Select} from 'ol/interaction';
  import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
  import screenfull from 'screenfull';
  import {treeData} from '@/api/zhsq/tZhsqBottomTool/tZhsqBottomTool';
  export default {
    name: "rightTool",
    data() {
      return {
        vectorList:[],
        overlayList:[],
        listTree:false,
        treeData:[],
        treeDataList:[],
        layerlist: this.$parent.layerlist,
        showHeatMap:false,
        dragBox:new DragBox({})
      }
    },
    created() {
      let _this=this;
      treeData().then(res => {
        if (res && res.success) {
          _this.treeDataList=[]
          _this.treeData = _this.setTreeData(res.data.records);
        }
      });
    },
    moutend(){

    },
    methods: {
      //清除相关框选功能
      clearDragBox(){
        this.$parent.map.removeInteraction(this.dragBox);
      },
      //heatMap
      heatMap(){
        this.clearDragBox();
        let map=this.$parent.map;
        if(!this.showHeatMap){
          let layer=this.$parent.creatHeatmap();
          this.layerlist['热力图']=layer;
          map.addLayer( this.layerlist['热力图'])
        }else{
          map.removeLayer( this.layerlist['热力图'])
        }
        this.showHeatMap=!this.showHeatMap
      },
      //点击树结构
      treeCheck(val,e){
        debugger
        let map=this.$parent.map;
        let layer=null;
        if (!this.layerlist[e.id]){
          switch(e.typeId) {
            case "1":
              layer=this.createXYZLayer()
              break;
            case "2":
              layer=this.$parent.createTdtWMTSLayer(e)
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
          this.layerlist[e.id]=layer;
        }
        if(e.checked){
          map.addLayer(this.layerlist[e.id])
        }else {
          map.removeLayer(this.layerlist[e.id])
        }
      },
      //获取树结构
      setTreeData(data) {//初始化树结构
        if (data) {
          for (let i in data) {
            var item = data[i];
            data[i].title = data[i].name;
            data[i].value = data[i].id;
            if(data[i].typeId!="0"&&data[i].level==3){
              this.treeDataList.push(data[i])
            }
            data[i].expand = false;
            if (data[i].children) {
              data[i].children = this.setTreeData(data[i].children);
            }
          }
        }
        return data;
      },
      //全屏
      showAll() {
        if (!screenfull.enabled) {
          this.$message({
            message: '浏览器不支持全屏',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      },
      //图层集合
      showView(){
        this.clearDragBox();
        this.listTree=!this.listTree;
        for (let i=0;i<this.vectorList.length;i++){
          console.log(this.vectorList[i].getVisible())
          console.log(this.vectorList[i].get('name'))
        }
      },
      //清除
      claerAll(){
        this.clearDragBox();
        this.$parent.clearVector();
        for (let i=0;i<this.vectorList.length;i++){
          if (this.vectorList[i]){
            this.$parent.map.removeLayer(this.vectorList[i])
          }
        }
        this.vectorList=[];
        for (let i=0;i<this.overlayList.length;i++){
          if (this.overlayList[i]){
            this.$parent.map.removeOverlay(this.overlayList[i])
          }
        }
        this.overlayList=[];
      },
      //测距
      huiz(){
        this.clearDragBox();
        this.measure(this.$parent.map ,"LineString");
      },
      //侧面
      mianji(){
        this.clearDragBox();
        this.measure(this.$parent.map, "area");
      },
      //测量主要代码
      measure(map, measureType) {
        let _this=this;
        var source = new VectorSource();
        let vector = new VectorLayer({
          id:'lineAndArea',
          name:"测量图层",
          source: source,
          style: new Style({
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new Stroke({
              color: 'red',
              width: 2
            }),
            image: new CircleStyle({
              radius: 7,
              fill: new Fill({
                color: '#ffcc33'
              })
            })
          }),
          zIndex:16
        });
        this.vectorList.push(vector);
        map.addLayer(vector)
        /**
         * Currently drawn feature.
         * @type {module:ol/Feature~Feature}
         */
        var sketch;

        /**
         * The help tooltip element.
         * @type {Element}
         */
        var helpTooltipElement;


        /**
         * Overlay to show the help messages.
         * @type {module:ol/Overlay}
         */
        var helpTooltip;


        /**
         * The measure tooltip element.
         * @type {Element}
         */
        var measureTooltipElement;


        /**
         * Overlay to show the measurement.
         * @type {module:ol/Overlay}
         */
        var measureTooltip;


        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        var continuePolygonMsg = '';


        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        var continueLineMsg = '';

        createMeasureTooltip();
        createHelpTooltip();

        /**
         * Handle pointer move.
         * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
         */
        var pointerMoveHandler = function (evt) {
          if (evt.dragging) {
            return;
          }
          /** @type {string} */
          var helpMsg = '请点击开始绘制';

          if (sketch) {
            var geom = (sketch.getGeometry());
            if (geom instanceof Polygon) {
              helpMsg = continuePolygonMsg;
            } else if (geom instanceof LineString) {
              helpMsg = continueLineMsg;
            }
          }

          helpTooltipElement.innerHTML = helpMsg;
          helpTooltip.setPosition(evt.coordinate);

          helpTooltipElement.classList.remove('hidden');
        };

        map.on('pointermove', pointerMoveHandler);

        map.getViewport().addEventListener('mouseout', function () {
          helpTooltipElement.classList.add('hidden');
        });

        var draw;

        var formatLength = function (line) {
          //获取投影坐标系
          var sourceProj = map.getView().getProjection();
          //ol/sphere里有getLength()和getArea()用来测量距离和区域面积，默认的投影坐标系是EPSG:3857, 其中有个options的参数，可以设置投影坐标系
          var length = getLength(line, {projection: sourceProj});
          //var length = getLength(line);
          var output;
          if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
              ' ' + 'km';
          } else {
            output = (Math.round(length * 100) / 100) +
              ' ' + 'm';
          }
          return output;
        };

        var formatArea = function (polygon) {
          //获取投影坐标系-
          var sourceProj = map.getView().getProjection();
          var area = getArea(polygon, {projection: sourceProj})
          //var area = getArea(polygon);
          //console.info(area)
          var output;
          if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
              ' ' + 'km<sup>2</sup>';
          } else {
            output = (Math.round(area * 100) / 100) +
              ' ' + 'm<sup>2</sup>';
          }
          return output;
        };
        var source;
        // var layer ;
        // 获取存放feature的vectorlayer层。map初始化的时候可以添加好了
        for(let layerTmp of map.getLayers().getArray()){
          if(layerTmp.get("name")=="feature"){
            // layer = layerTmp;
            // layerTmp.setSource(null)
            source= layerTmp.getSource();
          }
        }
        function addInteraction() {
          var type = (measureType == 'area' ? 'Polygon' : 'LineString');
          draw = new Draw({
            source: source,
            type: type,
            style: new Style({
              fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
              }),
              stroke: new Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
              }),
              image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                  color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new Fill({
                  color: 'rgba(255, 255, 255, 0.2)'
                })
              })
            })
          });
          map.addInteraction(draw);

          var listener;
          draw.on('drawstart',
            function (evt) {
              // set sketch
              sketch = evt.feature;

              /** @type {module:ol/coordinate~Coordinate|undefined} */
              var tooltipCoord = evt.coordinate;

              listener = sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof Polygon) {
                  output = formatArea(geom);
                  tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof LineString) {
                  output = formatLength(geom);
                  tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
              });

              //地图双击事件
              map.on('dblclick', function (evt) {
                var point = new Point(evt.coordinate);
                source.addFeature(new Feature(point));
                //idea = false;

                // alert(idea)
              });

            }, this);
          //
          //
          draw.on('drawend',
            function () {
              measureTooltipElement.className = 'tooltip tooltip-info';
              measureTooltip.setOffset([0, -7]);
              // unset sketch
              sketch = null;
              // unset tooltip so that a new one can be created
              measureTooltipElement = null;
              createMeasureTooltip();
              unByKey(listener);
              map.un('pointermove', pointerMoveHandler);
              map.removeInteraction(draw);
              helpTooltipElement.classList.add('hidden');
            }, this);
        }

        function createHelpTooltip() {
          if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
          }
          helpTooltipElement = document.createElement('div');
          helpTooltipElement.className = 'tooltip hidden';
          helpTooltip = new Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
          });
          map.addOverlay(helpTooltip);
          _this.overlayList.push(measureTooltip);
        }

        function createMeasureTooltip() {
          if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
          }
          measureTooltipElement = document.createElement('div');
          measureTooltipElement.className = 'tooltip-info';
          measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
          });
          map.addOverlay(measureTooltip);
          _this.overlayList.push(measureTooltip);
        }
        // 量测调用
        addInteraction();
        $(document).keyup(function (event) {
          if (event.keyCode == 27)
            draw.abortDrawing();
          else if (event.keyCode == 90 && event.ctrlKey) {
            console.log(draw);
            if (typeSelect.value== 'Circle')
              draw.abortDrawing();
            else
              draw.removeLastPoint()
          }
        })
        //绘制结束
      },
      //框选
      select(){
        let map=this.$parent.map
        let select=this.$parent.select
        let _this=this;
        // a normal select interaction to handle click
        const selectedFeatures = select.getFeatures();
        map.removeInteraction(_this.dragBox);
        map.addInteraction(_this.dragBox);
        _this.dragBox.on('boxend', function () {
          //与盒子几何形状相交的特征被添加到
          //选择特性的集合
          //如果视图不是倾斜旋转的盒子几何和
          //它的范围是相等的，所以交叉的特征可以
          //直接添加到集合
          const rotation = map.getView().getRotation();
          const oblique = rotation % (Math.PI / 2) !== 0;
          const candidateFeatures = oblique ? [] : selectedFeatures;
          const extent = _this.dragBox.getGeometry().getExtent();
          //传入数据集合信息(暂时注释)
          // vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
          //    candidateFeatures.push(feature);
          // });
          _this.$parent.selectModel=true;
          //当视图被倾斜旋转时，方框扩展将会
          //超过它的几何形状，所以盒子和候选
          //特征几何围绕一个公共锚旋转
          //确认，与方框几何对齐
          //长度，几何图形相交
          if (oblique) {
            const anchor = [0, 0];
            const geometry = _this.dragBox.getGeometry().clone();
            geometry.rotate(-rotation, anchor);
            const extent = geometry.getExtent();
            candidateFeatures.forEach(function (feature) {
              const geometry = feature.getGeometry().clone();
              geometry.rotate(-rotation, anchor);
              if (geometry.intersectsExtent(extent)) {
                selectedFeatures.push(feature);
              }
            });
          }
          map.removeInteraction(_this.dragBox);
        });
      }
    },
    watch: {

    }
  }
</script>

<style lang="less">
  .tooltip-info{
    opacity: 1;
    color: black;
    display: contents;
  }
  .right-tool {
    position: fixed;
    top: 82px;
    right: 10px;
    z-index: 10;
    width: 400px;

    .data-tabs {
      width: 100%;
      display: -ms-flexbox;
      display: flex;
      height: 40px;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: justify;
      justify-content: space-between;
      border-radius: 4px;
      box-shadow: 0 2px 4px 0 rgb(15 31 62 / 9%);
      font-size: 12px;
      background: #fff;
      padding: 0 16px;
      float: right;
      margin-bottom: 10px;
      color: #999;

      .ivu-icon {
        margin-right: 5px;
      }

      .icon-qingchu {
        font-size: 16px;
        color: #00d9bf;
      }

      .icon-celiang {
        font-size: 15px;
        color: #00d9bf;
      }

      .icon-kuangxuan {
        color: #4bb04f;
      }

      .icon-show {
        color: #ffa817;
      }

      .icon-shitu {
        color: #1885ff;
      }

      .icon-quanpin {
        color: #1885ff;
      }

      .data-tabs-item {
        height: 100%;
        cursor: pointer;

        .ivu-dropdown {
          height: 100%;

          .ivu-dropdown-rel {
            height: 100%;

          }
        }

        button {
          height: 100%;
          border: 0;
          background: transparent;
        }
      }
    }
  }
</style>
