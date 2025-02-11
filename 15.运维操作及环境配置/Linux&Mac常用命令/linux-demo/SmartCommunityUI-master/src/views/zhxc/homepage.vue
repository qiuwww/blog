<template>
  <div class="mianMapclass">
    <Map :url="configUrl" class="mapclass" @onload="onMapload" map-key="homepage"/>
    <!--弹框-->
    <my-modal v-model="modalShow" ref="myModal"></my-modal>
    <div class="office-header">
      <div class="title-info">云享乡村</div>
      <div class="analysis-info">{{systemTime}}</div>
      <div class="analysis-water"><img src="../../assets/bigScreenImg/天气.png"><span>{{todayWeather}}</span></div>
    </div>
    <div style="border-image: url(./img/favicon/bg04.png) 22 45 22 10 round;"></div>
    <div :class="showleft===true?'leftactive':'leftclose'">
      <div class="leftbtn" @click="changeleft">
        <Icon type="md-more" class="lefticon"/>
      </div>
      <div class="leftinfo">
      <div class="titleName" icon="icon-title-TE3">
        <p class="name gradient-blue">区域选择</p>
        <p class="en"><span>AREA SELECTION</span><span></span></p>
      </div>
      <Tree :data="data1" @on-select-change="shownew"></Tree>
      </div>
    </div>
    <div :class="showright === true?'pingtaiclass':'rightactive'">
      <div class="rightbtn" @click="changeright">
        <Icon type="md-more" class="lefticon"/>
      </div>
      <div class="rightinfo">
      <div class="titleName" icon="icon-title-TE3">
        <p class="name gradient-blue">平台简介</p>
        <p class="en"><span>INTRODUCTION OF PLATFORM</span><span></span></p>
      </div>
      <div class="text">
        本平台是以
        <span style="color: #00afff;">乡村本底、乡村规划、智慧运营、项目招商、村务公开</span>
        五大业务领域数十个典型场景为参考，
        通过地理信息数据和物联网设备的接入，
        实现对乡村周边基本情况、日常监测、
        开发区域统筹、用地分析、大屏展示等功能，
        可优化多种业务应用，提升乡村相关展示能力，
        构建状态全面感知、信息高效处理、 应用便捷灵活的乡村展示平台。
      </div>
      <img style="width:100%" src="../../assets/bigScreenImg/tu1.jpg">
      <div class="titleName" icon="icon-title-TE3">
        <p class="name gradient-blue">区域统计</p>
        <p class="en"><span>RANGE STATISTICS</span><span></span></p>
      </div>
      <div class="areaGeneral">
        <div>
            <i-circle
              :percent="100"
              stroke-linecap="square"
              stroke-color="#43a3fb"
              style="width: 90%; height: 80%;"
            >
              <p><span>1</span><i></i></p>
            </i-circle>
            <h1>市</h1>
        </div>
        <div>
            <i-circle
              :percent="100"
              stroke-linecap="square"
              stroke-color="#43a3fb"
              style="width: 90%; height: 80%"
            >
              <p><span>2</span><i></i></p>
            </i-circle>
            <h1>县/区</h1>
        </div>
        <div>
            <i-circle
              :percent="100"
              stroke-linecap="square"
              stroke-color="#43a3fb"
              style="width: 90%; height: 80%"
            >
              <p><span>3</span><i></i></p>
            </i-circle>
            <h1>村</h1>
        </div>
      </div>
      <img style="width:100%" src="../../assets/bigScreenImg/tu2.jpg">
      </div>
    </div>
  </div>
</template>

<script>
    import Map from '../../components/mars-map/Main.vue';
    import {getFirstMenu} from '@/api/zhxc/basicMenuInformation/basicMenuInformation'
    import axios from "axios";
    import {getinfobyaretype} from "@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement";
    import {getDepts} from "@/api/system/dept"
    import {getbyareaId} from '@/api/zhxc/basicViewpointInformation/basicViewpointInformation'
    import myModal from "./components/myModal";
    export default {
        name: 'index',
        components: {
            Map,
            myModal
        },
        data() {
            return {
                showright:true,
                showleft:true,
                configUrl: "../config/simpleConfig.json",
                viewer: null,
                bottomMenu: [],
                layerShow: '',
                isLoading: false,
                systemTime: '',
                todayWeather: '',
                menus:[],
                data1: [],
                nPath: "",
                data: [],//二级菜单数据
                dataSourceArr: [],//地图DataSource
                htmlStr: '',
                title: '',
                modalShow: false,
                bgColor: [],
                count: 0,
                url360: '',
                show360: false,
                loadingShow: false,
                tempPath: '',
                ctrlShow: false,
                isSingleEntry: true,
                entId: '',
                eId: '',
                lastEntity: null,
                tooltipEntity: null,
                waitFlag: true,
                legendarr:[],//未筛查图例集合
                tuceng:false,//二级图层展示
                data2:[],//二级图层菜单
                menudata:[],//二级图层
            };
        },
        created() {
            this.getlist();
            var json = this.configUrl;
            let _this = this;
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=重庆")
                .then(function (response) {
                    _this.todayWeather ='重庆'+ response.data.data.forecast[0].type + '  ' + response.data.data.wendu + '℃';
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            //获取树列表
            getlist(){
               getDepts().then(res => {
                  if(res&&res.content){
                    this.data1=[]
                    res.content.forEach(element => {
                        element.children.forEach(element2 => {
                              var data=
                              {
                                  title: element2.name,
                                  level:1,
                                  id:element2.id,
                                  expand:false,
                                  render: (h, { root, node, data }) => {
                                              return h('span', {
                                                  style: {
                                                  color: node.node.selected ? "#00afff" : "#00afff", //根据选中状态设置样式
                                                  'font-size': '0.9vw',
                                                  'font-family': 'Adobe 黑体 Std R',
                                                  }
                                              }, [
                                                  h('span', [
                                                      h('Icon', {
                                                          props: {
                                                              type: 'ios-folder-outline'
                                                          },
                                                          style: {
                                                              marginRight: '8px',
                                                          }
                                                      }),
                                                      h('span', data.title)
                                                  ])
                                              ]);
                                          },
                                  children: []
                              }
                              if(element2.children){
                                element2.children.forEach(element3 => {
                                    var children={
                                                  title: element3.name,
                                                  level:2,
                                                  area:element2.name,
                                                  id:element3.id,
                                                  router:'/bigScreen',
                                                  render: (h, { root, node, data }) => {
                                                      return h('span', {
                                                          style: {
                                                          color: '#13ce66',
                                                          'font-size': '0.9vw',
                                                          'font-family': 'Adobe 黑体 Std R',
                                                          }
                                                      }, [
                                                          h('span', [
                                                              h('Icon', {
                                                                  props: {
                                                                      type: 'ios-albums'
                                                                  },
                                                                  style: {
                                                                      marginRight: '8px',
                                                                  }
                                                              }),
                                                              h('span', data.title)
                                                          ])
                                                      ]);
                                                  },
                                              }
                                    data.children.push(children)
                              });
                              }

                              this.data1.push(data);
                        });
                    });
                  }
                });
            },
            //右边栏关闭打开
            changeright(){
                this.showright=!this.showright;
                let compass = document.querySelector(".compass");
                if (this.showright) {
                    compass.classList.remove("compass2");
                    compass.classList.add("compass1");
                } else {
                    compass.classList.remove("compass1");
                    compass.classList.add("compass2");
                }
            },
            //左边栏关闭打开
            changeleft(){
                this.showleft=!this.showleft;
            },
            initLayer(json, v) {
                var _this = this;
                if (json) {
                    //加载json数据
                    Cesium.GeoJsonDataSource.load(json, {
                        clampToGround: true
                    }).then(function (dataSource) {

                        let newDataSource = new Cesium.CustomDataSource("首页");
                        //设置样式
                        let entities = dataSource.entities.values;
                        //_this.$emit('func', entities);
                        for (let i = 0; i < entities.length; i++) {
                            let entity = entities[i];
                            if (entity) {
                                //点
                                if (entity.billboard) {
                                    _this.addPointWithStyle(newDataSource, entity, v);
                                } else if (entity.point) {

                                }
                                //线
                                else if (entity.polyline) {
                                    _this.addPolylineWithStyle(newDataSource, entity, v);
                                }
                                //面
                                else if (entity.polygon) {
                                    _this.addPolygonWithStyle(newDataSource, entity, v);
                                }
                            }
                        }
                        //文字添加成功后，设置倒三角形的背景色
                        for (let i = 1; i <= _this.count; i++) {
                            var labelColor = document.querySelector(".initLabel" + i).style.background;

                            if (labelColor) {
                                var colorArr = labelColor.replace(/rgba\(/, '').replace(/\)/, '').replace(/\s+/g, '').split(',');
                                var rgba = "rgba(" + colorArr[0] + "," + colorArr[1] + "," + colorArr[2] + "," + 0.8 + ")";
                                document.styleSheets[0].addRule('.initLabel' + i + '::before', 'border-bottom:8px solid ' + rgba + ' !important;');
                            }
                        }
                        //存储json，用于关闭
                        _this.dataSourceArr.push({
                            id: v.id,
                            dataSource: newDataSource,
                            type: "polygon"
                        })
                        //添加到地图
                        _this.viewer.dataSources.add(newDataSource);
                        //关闭loading
                        _this.loadingShow = false;

                    }).otherwise(function (error) {
                        haoutil.alert(error, "加载数据出错");
                    });
                }
            },
            //添加面并设置样式
            addPolygonWithStyle(newDataSource, entity, v) {
                var _this = this;
                if (newDataSource && entity) {
                    //去除边线
                    entity.polygon.outline = false;
                    //是否显示
                    var isDisplayState = entity.properties.isDisplayState._value;
                    if (isDisplayState != "1") {
                        entity.show = false;
                    } else {
                        //是否立体
                        var isStereoscopic = entity.properties.isStereoscopic._value;
                        if (isStereoscopic == "1") {
                            //立体
                            var height = parseFloat(entity.properties.surfaceHeight._value);
                            if (height != "NaN") {
                                //数字
                                entity.polygon.extrudedHeight = height;
                            } else {
                                entity.polygon.extrudedHeight = 0;
                            }
                        } else {
                            entity.polygon.extrudedHeight = 0;
                        }
                        //是否有边框
                        var isBorder = entity.properties.isBorder._value;

                        if (isBorder == "1") {
                            //有边框,有颜色
                            var color = entity.properties.color._value;
                            //是否虚线
                            var dashLine = entity.properties.isDashLien._value;

                            if (dashLine == "1") {
                                //虚线
                                _this.addPolyLineForPolygon(newDataSource, entity, v.id);
                            } else {
                                //实线
                                _this.addPolyLineForPolygon(newDataSource, entity, v.id, "0");
                            }
                        } else {
                            //默认添加 实线
                            _this.addPolyLineForPolygon(newDataSource, entity, v.id, "1");
                        }

                        //背景色
                        var polygonColor = entity.properties.polygonColor._value;
                        if (polygonColor == null || polygonColor == "") {
                            polygonColor = "#3B554C";//默认
                        }

                        //面透明度
                        var alpha = entity.properties.alpha._value;
                        if (alpha == null || alpha == "" || alpha == "0") {
                            alpha = 0.4;
                        }
                        //图例集合
                        _this.legendarr.push({color:polygonColor,id:v.id,alpha:alpha,label:entity.properties._name._value,show:true});
                        //面背景色
                        var color = new Cesium.Color.fromCssColorString(polygonColor).withAlpha(alpha);
                        entity._colordata = color;
                        entity.polygon.material = color;

                        if (entity.properties.name._value == "新兴村") {
                            entity.polygon.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(4000, 300000);
                        }

                        if (entity.properties.name._value == "大顺乡") {
                            entity.polygon.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(7000, 300000);
                        }
                        //添加文字
                        _this.addLabel(entity, v.id);
                        newDataSource.entities.add(entity);
                    }
                }
            },
            //初始化
            initEllipsoid(cartesian3) {
                if (!cartesian3) return;
                let ellipsoid = this.viewer.scene.globe.ellipsoid;
                return ellipsoid.cartesianToCartographic(cartesian3);
            },
            //添加线并设置样式
            addPolylineWithStyle(newDataSource, entity, v) {
                var _this = this;
                if (newDataSource && entity && entity.polyline) {
                    //是否显示
                    var isShow = entity.properties.isShow._value;
                    if (isShow == "1") {
                        //经度纬度
                        var cartesian3 = entity.polyline.positions._value;
                        //循环坐标点
                        var positions = [];
                        var pt = [];
                        for (var j = 0; j < cartesian3.length; j++) {
                            var cartographic = _this.initEllipsoid(cartesian3[j]);
                            //经度
                            var lng = Cesium.Math.toDegrees(cartographic.longitude);
                            //纬度
                            var lat = Cesium.Math.toDegrees(cartographic.latitude);

                            //是否显示label
                            var isLabel = entity.properties.isLabel._value;
                            if (isLabel == "1") {
                                //最小视距
                                var min = entity.properties.min._value;
                                if (min == null || min == "") min = 0;
                                //最大视距
                                var max = entity.properties.max._value;
                                if (max == null || max == "") max = 1000;

                                //公路添加文字
                                if (Math.ceil(cartesian3.length / 2) == j) {
                                    var text = entity.properties.name._value || '';
                                    var word = newDataSource.entities.add({
                                        position: Cesium.Cartesian3.fromDegrees(lng, lat),
                                        label: {
                                            text: text,
                                            font: "14px",
                                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                            fillColor: Cesium.Color.WHITE,
                                            outlineColor: Cesium.Color.BLACK,
                                            outlineWidth: 2,
                                            pixelOffset: new Cesium.Cartesian2(0, 0),   //偏移量  
                                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(parseFloat(min), parseFloat(max))
                                        }
                                    });
                                }
                            }
                            //线
                            positions.push(lng);
                            positions.push(lat);
                            positions.push(0);

                            //动态效果
                            pt.push([lng, lat]);
                        }

                        //线条属性
                        var width, color, length, glow;
                        //线宽
                        width = entity.properties.width._value;
                        if (width == null || width == "") {
                            width = 4;
                        }

                        //线颜色
                        color = entity.properties.color._value;
                        if (color == null || color == "") {
                            color = "#fff";
                        }

                        //动态效果
                        var isTrend = entity.properties.isTrend._value;
                        //动态
                        if (isTrend == "1") {
                            var trendLine = newDataSource.entities.add({
                                polyline: {
                                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                    width: width + 3,
                                    clampToGround: true,
                                    material: new mars3d.LineFlowMaterial({//动画线材质
                                        color: Cesium.Color.YELLOW,
                                        duration: 2000, //时长，控制速度
                                        url: "img/lineColor.png"
                                    })
                                }
                            });
                        }
                        //是否虚线
                        var isDash = entity.properties.isDash._value;
                        if (isDash != 1) {//实线
                            //光晕
                            var isGlow = entity.properties.isGlow._value;
                            if (isGlow == "1") {
                                glow = parseFloat(entity.properties.glow._value);
                                if (glow == 'NaN') {
                                    glow = 0.2;
                                }
                                var ent = newDataSource.entities.add({
                                    polyline: {
                                        positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                        width: width,
                                        material: new Cesium.PolylineGlowMaterialProperty({
                                            color: new Cesium.Color.fromCssColorString(color),
                                            //设置Glow材质
                                            glowPower: parseFloat(glow)
                                        })
                                    }
                                });
                                _this.setClickForLine(ent,entity);
                            } else {
                                //加载线属性
                                var ent = newDataSource.entities.add({
                                    polyline: {
                                        positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                        width: width,
                                        material: new Cesium.PolylineDashMaterialProperty({
                                            color: new Cesium.Color.fromCssColorString(color),
                                            dashLength: 0
                                        })
                                    }
                                });
                                _this.setClickForLine(ent,entity);
                            }
                        } else {//虚线
                            //间隙长度
                            length = entity.properties.length._value;
                            if (length == null || length == "") {
                                length = 20;
                            }

                            //加载线属性
                            var ent = newDataSource.entities.add({
                                polyline: {
                                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                    width: width,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: new Cesium.Color.fromCssColorString(color),
                                        dashLength: length
                                    })
                                }
                            });
                            _this.setClickForLine(ent,entity);
                        }
                    }
                }
            },
            //线点击事件
            setClickForLine(obj,entity){
                var _this = this;
                obj.click =function(){
                    //_this.$refs.myModal.cancelModal();
                    let desc = entity.properties.description._value;
                    if (desc != null && desc != '') {
                        _this.$refs.myModal.openModal(desc, entity.properties.name._value);
                    }
                }
            },
            //添加点并设置样式
            addPointWithStyle(newDataSource, entity, v) {
                var _this = this;
                if (newDataSource && entity && entity.billboard) {
                    //是否显示图标
                    let isShowIcon = entity.properties.isShowIcon._value;
                    if (isShowIcon == "1") {
                        //图标显示
                        entity.billboard = {
                            scale: 1.5,
                            image: entity.properties.icon._value,
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            //heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1),
                            //disableDepthTestDistance: Number.POSITIVE_INFINITY, //一直显示，不被地形等遮挡
                        }

                        //有高度，设置图片
                        var height = entity.properties.height._value;
                        if (height != null && height != "") {
                            //有高度
                            height = parseInt(height);
                            var position = entity.position._value;

                            var cartographic = _this.initEllipsoid(position);

                            //经度
                            var lng = Cesium.Math.toDegrees(cartographic.longitude);
                            //纬度
                            var lat = Cesium.Math.toDegrees(cartographic.latitude);
                            //
                            entity.position = Cesium.Cartesian3.fromDegrees(lng, lat, height);

                            //悬浮垫设置垂直虚线
                            _this.setLine(newDataSource, lng, lat, height, v.id);
                        }

                        //点击弹框
                        entity.click = function (e) {
                            //是否全景
                            var isSCennery = e.properties.isScenery._value;
                            var url = e.properties.url._value
                            if (isSCennery == "1" && url) {
                                _this.show360 = true;
                                _this.url360 = url;
                            } else {
                                //
                                //_this.$refs.myModal.cancelModal();
                                let desc = e.properties.describes._value;
                                if (desc != null && desc != '') {
                                    _this.$refs.myModal.openModal(desc, e.properties.name._value);
                                }
                            }
                        }
                        //图标添加标签
                        _this.addLabelForBillboard(newDataSource, entity);
                    } else {
                        //图标添加标签
                        _this.addLabelForBillboard(newDataSource, entity, "1");
                    }
                }
            },
            //图标添加label
            addLabelForBillboard(newDataSource, entity, type) {
                if (type == "1") {
                    entity.billboard = false;
                }
                //为图标添加标签
                var upOrDown = [10, -60];
                //标签是否显示
                if (entity.properties.titleShow._value == "1") {
                    //最小视距
                    var min = entity.properties.min._value;
                    if (min == null || min == "") min = 0;
                    //最大视距
                    var max = entity.properties.max._value;
                    if (max == null || max == "") max = 2000;
                    //名称
                    var name = entity.properties.name._value || '';
                    //背景色
                    var bgColor = entity.properties.backgroundColor._value || '#fff';
                    //位置 上或下
                    var namePosition = entity.properties.namePosition._value || 0;

                    newDataSource.entities.add({
                        position: entity.position,
                        label: {
                            text: name,
                            font: '14px', //字体样式
                            fillColor: Cesium.Color.WHITE,       //字体颜色
                            backgroundColor: Cesium.Color.RED,    //背景颜色
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,//垂直位置
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,//水平位置
                            pixelOffset: new Cesium.Cartesian2(0, upOrDown[parseInt(namePosition)]), //偏移
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(parseFloat(min), parseFloat(max)),
                            //scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1) //根据地图级别放大缩小
                        }
                    });
                }
                newDataSource.entities.add(entity);
            },
            //高亮面设置
            highlightedEntity(entity, v, type) {
                if (!entity) return;
                if (entity.polygon) {
                    if (v) {
                        if (entity.id == this.entId) {
                            return;
                        } else {
                            var color = entity.polygon.material.color;
                            var newclr = color.getValue().withAlpha(0.9);
                            color.setValue(newclr);
                            this.tooltipEntity = entity;
                        }
                    } else {
                        if (type != '1') {
                            //flyto
                            this.viewer.flyTo(entity, {
                                heading: 281.9,
                                pitch: -20.6,
                                range: 5000
                            });
                        }

                        var color = entity.polygon.material.color;
                        var newclr = color.getValue().withAlpha(0.9);
                        color.setValue(newclr);
                        this.lastEntity = entity;
                        this.entId = entity.id;
                    }
                }
            },
            //面添加文字
            addLabel(entity, menuId) {
                var _this = this;
                //点击弹框
                entity.click = function (e) {
                    //高亮
                    let eId = entity.id;
                    if (_this.eId != eId) {
                        //清除上一个高亮
                        _this.clearLastHighlightedEntity(false);
                        //添加当前
                        _this.highlightedEntity(entity, false,"1");
                    }

                   //_this.$refs.myModal.cancelModal();

                    let desc = e.properties.description._value;
                    if (desc != null && desc != '') {
                        _this.$refs.myModal.openModal(desc, e.properties.name._value);
                    }
                }

                var height = entity.polygon.extrudedHeight;
                //是否显示文字
                var isLabel = entity.properties.isLabel._value;
                if (isLabel == "1") {
                    //最小视距
                    var min = entity.properties.min._value;
                    if (min == null || min == "") min = 0;
                    //最大视距
                    var max = entity.properties.max._value;
                    if (max == null || max == "") max = 4000;

                    //求中心点
                    var positions = mars3d.draw.attr.polygon.getPositions(entity);
                    var ptcenter = mars3d.point.centerOfMass(positions, parseInt(height));
                    var text = entity.properties.name._value || '';
                }
                //面高度
                if (height == "0") {
                    //无高度
                    //添加标签
                    entity.position = ptcenter;
                    entity.label = {
                        text: text,
                        font: "14px",
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        fillColor: Cesium.Color.WHITE,
                        outlineColor: Cesium.Color.RED,//new Cesium.Color.fromCssColorString("#C5C5C4"),//
                        outlineWidth: 2,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset: new Cesium.Cartesian2(0, 0),   //偏移量  
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(parseFloat(min), parseFloat(max))
                    }

                    //存储每个entity颜色
                    var color = entity.polygon.material.color;

                    //为tooltip设置背景
                    var rgbaColor = color._value;
                    var red = Math.floor(rgbaColor.red * 255);
                    var green = Math.floor(rgbaColor.green * 255);
                    var blue = Math.floor(rgbaColor.blue * 255);
                    var alpha = 0.6;

                    //把所有entity颜色存为数组
                    _this.bgColor.push({
                        id: entity.id,
                        color: "rgba(" + red + "," + green + "," + blue + "," + alpha + ")"
                    });

                    //鼠标经过
                    entity.tooltip = {
                        html: function (ent) {
                            var inhtml = "<div id='" + ent.id + "'>" + ent.name + "</div>";
                            return inhtml;
                        },
                        anchor: [0, -10],//定义偏移像素值 [x, y]
                        onAdd: function (eleId) {
                            var oDivLabel = document.querySelector("#" + eleId);
                            var entId = oDivLabel.children[0].getAttribute("id");

                            var newEntity = _this.bgColor.filter(function (item) {
                                return item.id == entId;
                            })

                            if (newEntity != null && newEntity.length > 0) {
                                oDivLabel.parentNode.style.background = newEntity[0].color;
                                oDivLabel.parentNode.nextElementSibling.children[0].style.background = newEntity[0].color;
                            }
                            //清除上一个高亮
                            _this.clearLastHighlightedEntity(true);
                            //添加当前高亮
                            _this.highlightedEntity(entity, true, '1')
                        },
                        onRemove: function (e) {
                            _this.clearLastHighlightedEntity(true)
                        }
                    };
                } else {
                    _this.count += 1;
                    //修改背景色
                    //存储每个entity颜色
                    var color = entity.polygon.material.color;

                    //为tooltip设置背景
                    var rgbaColor = color._value;
                    var red = Math.floor(rgbaColor.red * 255);
                    var green = Math.floor(rgbaColor.green * 255);
                    var blue = Math.floor(rgbaColor.blue * 255);
                    var alpha = 0.6;
                    var bg = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";

                    var distanceCondition;
                    var flag = false;
                    // if (entity.properties.name._value == "新兴村" || entity.properties.name._value == "大顺乡") {
                    //     flag = true;
                    //     distanceCondition = new Cesium.DistanceDisplayCondition(6500, 300000);
                    // }

                    var divPoint = new mars3d.DivPoint(_this.viewer, {
                        html: "<div class='initLabel" + _this.count + "' style='background:" + bg + ";' id='" + entity.id + "'>" + text + "</div>",
                        position: ptcenter,
                        anchor: [0, 0],
                        distanceDisplayCondition: flag ? distanceCondition : ''
                    });

                    //保存divpoint
                    if (divPoint.viewer != null) {
                        _this.dataSourceArr.push({id: menuId, dataSource: divPoint, type: 'divPoint'});
                    }

                    //鼠标经过
                    entity.tooltip = {
                        html: '<div>12</div>',
                        anchor: [0, -10],//定义偏移像素值 [x, y]
                        onAdd: function (eleId) {
                            document.querySelector('.mars3d-popup-content-wrapper').style.display = "none";
                            var oDivLabel = document.querySelector("#" + eleId);
                            oDivLabel.style.display = "none";
                            oDivLabel.parentNode.nextElementSibling.children[0].style.display = "none";

                            //清除上一个高亮
                            _this.clearLastHighlightedEntity(true);
                            //添加当前高亮
                            _this.highlightedEntity(entity, true, '1')
                        },
                        onRemove: function () {
                            _this.clearLastHighlightedEntity(true)
                        }
                    };
                }
            },
            //清除高亮面
            clearLastHighlightedEntity(v) {
                if (v) {//鼠标移入
                    if (this.tooltipEntity == null) return;

                    if (this.tooltipEntity.id == this.entId) {
                        return;
                    } else {
                        var alpha = this.tooltipEntity.properties.alpha._value || 0.4;
                        var color = this.tooltipEntity.polygon.material.color;
                        var newclr = color.getValue().withAlpha(alpha);
                        color.setValue(newclr);
                        this.tooltipEntity = null;
                    }
                } else {
                    if (this.lastEntity == null) return;
                    var alpha = this.lastEntity.properties.alpha._value || 0.4;
                    var color = this.lastEntity.polygon.material.color;
                    var newclr = color.getValue().withAlpha(alpha);
                    color.setValue(newclr);

                    this.lastEntity = null;
                }
            },
            //面添加边线
            addPolyLineForPolygon(newDataSource, entity, menuId, type) {
                if (newDataSource && entity) {
                    var _this = this;
                    //高度
                    var height = entity.polygon.extrudedHeight;
                    if (height == undefined || height == null || height == '') {
                        height = 0;
                    } else {
                        height = height._value;
                    }
                    //经度纬度
                    var cartesian3 = entity.polygon.hierarchy._value.positions;
                    //循环坐标点
                    var positions = [];
                    for (var j = 0; j < cartesian3.length; j++) {
                        var cartographic = _this.initEllipsoid(cartesian3[j]);
                        //纬度
                        var lat = Cesium.Math.toDegrees(cartographic.latitude);
                        //经度
                        var lng = Cesium.Math.toDegrees(cartographic.longitude);
                        //高度
                        var alt = cartographic.height;

                        positions.push(lng);
                        positions.push(lat);
                        positions.push(alt);
                    }
                    //线宽
                    var width = entity.properties.width._value;
                    if (width == null || width == "") width = 1;
                    //颜色
                    var color = entity.properties.color._value;
                    if (color == null || color == "") color = "#fff";
                    //间隙长度
                    var dashLength = entity.properties.dashLength._value;
                    if (dashLength == null || dashLength == "") dashLength = 20;


                    //实线
                    if (type == "0") {
                        //光晕
                        var isGlow = entity.properties.isGlow._value;
                        if (isGlow == "1") {
                            var glow = parseFloat(entity.properties.glow._value);
                            if (glow == 'NaN') {
                                glow = 0.2;
                            }

                            var ent = newDataSource.entities.add({
                                polyline: {
                                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                    width: width,
                                    material: new Cesium.PolylineGlowMaterialProperty({
                                        glowPower: glow,
                                        color: new Cesium.Color.fromCssColorString(color)
                                    })
                                },
                            });
                        } else {
                            //无光晕
                            var ent = newDataSource.entities.add({
                                polyline: {
                                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                    width: width,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: new Cesium.Color.fromCssColorString(color),
                                        dashLength: 0
                                    })
                                }
                            });
                        }
                    } else if (type == "1") {
                        //默认
                        var ent = newDataSource.entities.add({
                            polyline: {
                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                width: 0,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: new Cesium.Color.fromCssColorString("#fff")
                                })
                            }
                        });
                    } else {
                        //加载虚线线属性
                        var ent = newDataSource.entities.add({
                            polyline: {
                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                width: width,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: new Cesium.Color.fromCssColorString(color),
                                    dashLength: dashLength
                                })
                            }
                        });
                    }
                }
            },
            //悬浮垫设置垂直虚线
            setLine(newDataSource, lng, lat, height, menuId) {
                var positions = [lng, lat, height, lng, lat, 0];
                var redLine = newDataSource.entities.add({
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                        width: 3,
                        material: new Cesium.PolylineDashMaterialProperty({
                            color: new Cesium.Color.fromCssColorString("#ccc"),
                            dashLength: 10
                        })
                    }
                });
            },
            //获取设置样式
            getStyle(element, attr) {
                if (element.currentStyle) {
                    return element.currentStyle[attr];
                } else {
                    return getComputedStyle(element, false)[attr];
                }
            },
            //转化颜色
            getHexColor(color) {
                var values = color
                    .replace(/rgba?\(/, '')
                    .replace(/\)/, '')
                    .replace(/[\s+]/g, '')
                    .split(',')
                var a = parseFloat(values[3] || 1),
                    r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
                    g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
                    b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
                return '#' +
                    ('0' + r.toString(16)).slice(-2) +
                    ('0' + g.toString(16)).slice(-2) +
                    ('0' + b.toString(16)).slice(-2)

            },
            //初始化GeoJson
            initGeoJson() {
                var iconGeoJson = {
                    "type": "FeatureCollection",
                    "features": []
                }
                return iconGeoJson;
            },
            //初始化feature
            initFeature(type, obj, position) {
                var feature = {
                    "type": "Feature",
                    "properties": obj,
                    "geometry": {
                        "type": type,
                        "coordinates": position ? position : []
                    }
                };
                return feature;
            },
            //打开菜单对应页面
            shownew(val){
              if(val.length>0){
                var cont=val.length-1;
                if(val[cont].level==2&&val[cont].router!=''){
                    var title="";
                    if(val[cont].area.length>1&&val[cont].title.length>1){
                        title=val[cont].area.substr(0,val[cont].area.length-1)+
                              val[cont].title.substr(0,val[cont].title.length-1)
                    };
                    this.$router.push({name:val[cont].router,params:{id:val[cont].id,title:title}})
                    val[cont].selected=false;
                } else if(val[cont].level==1){
                    val[cont].expand=!val[cont].expand;
                    val[cont].selected=false;
                }
              }
            },
            //地图构造完成回调
            onMapload(viewer) {
                this.viewer=viewer;
                getbyareaId({path:"0"}).then(res => {
                    if(res&&res.data.length>0){
                           this.center=res.data[0].perspectiveInfo
                           try{
                              viewer.mars.centerAt(JSON.parse(this.center));
                           }catch{
                              viewer.mars.centerAt({ "y": 29.150388, "x": 108.834648, "z": 6869110, "heading": 360, "pitch": -89.7, "roll": 0 });
                           }
                       }else{
                           viewer.mars.centerAt({ "y": 29.150388, "x": 108.834648, "z": 6869110, "heading": 360, "pitch": -89.7, "roll": 0 });
                       }
                })
            }
        },
        mounted() {
            let nowDate = new Date();
            let date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate()
            };
            getFirstMenu({roleId:31}).then(res=> {
                    if(!res){
                      return
                    }
                    this.menus = this.menus.filter(item => item.id == 394);
                })
            this.systemTime = date.year + '年' + date.month + '月' + date.date + '日';
            getinfobyaretype({type:0}).then(res => {
                var _this=this;
                 if (res && res.success && res.data) {
                            let polygon = res.data.Polygon;
                            let lineString = res.data.LineString;
                            let point = res.data.Point;
                            let perspective = res.data.Perspective;

                            if (polygon.length == 0 && lineString.length == 0 && point.length == 0) {
                                _this.loadingShow = false;
                            } else {
                                //构造GeoJson
                                var iconGeoJson = _this.initGeoJson();
                                //面
                                if (polygon) {
                                    for (var i = 0; i < polygon.length; i++) {
                                        let position = polygon[i].position;
                                        if (position) {
                                            position = JSON.parse(polygon[i].position)
                                            let arr = [];
                                            for (var j = 0; j < position.length; j = j + 2) {
                                                let jingdu = position[j];
                                                let weidu = position[j + 1];

                                                if (jingdu && weidu) {
                                                    arr.push([jingdu, weidu]);
                                                }
                                            }
                                            //构造feature
                                            var feature = _this.initFeature("Polygon", polygon[i]);
                                            if (arr) {
                                                feature.geometry.coordinates[0] = arr;
                                                iconGeoJson.features.push(feature);
                                            }
                                        }
                                    }
                                }
                                //线
                                if (lineString) {
                                    // _this.addPolyline(lineString, v);
                                    //获取点坐标
                                    for (var i = 0; i < lineString.length; i++) {
                                        let position = JSON.parse(lineString[i].position);
                                        if (position != null && position.length > 0) {
                                            let arr = [];
                                            for (var j = 0; j < position.length; j = j + 2) {
                                                let point = [position[j], position[j + 1]];
                                                arr.push(point);
                                            }
                                            //构造feature
                                            let feature = _this.initFeature("LineString", lineString[i]);
                                            feature.geometry.coordinates = arr;
                                            iconGeoJson.features.push(feature);
                                        }
                                    }
                                }
                                //点
                                if (point) {
                                    //获取每个图标
                                    for (let i = 0; i < point.length; i++) {
                                        var p = point[i].position;
                                        if (p != null && p != "") {
                                            //构造feature
                                            let feature = _this.initFeature("Point", point[i], JSON.parse(p));
                                            iconGeoJson.features.push(feature);
                                        }
                                    }
                                    // _this.addIconPoint(point, v);
                                }

                                //视角
                                if (perspective) {
                                    var pspArr = res.data.Perspective;
                                    if (pspArr != null && pspArr.length > 0) {
                                        var info = pspArr[0]
                                        if (info.perspective_info) {
                                            _this.viewer.mars.centerAt(JSON.parse(info.perspective_info));
                                        }
                                    }
                                }
                                if (iconGeoJson.features.length > 0) {
                                    _this.initLayer(iconGeoJson,this.menus);
                                } else {
                                    //关闭loading
                                    _this.loadingShow = false;
                                }

                            }
                        }
            })
        },
        watch: {
        }
    }
</script>

<style lang="less">
  .mianMapclass {
    position: relative;
    height: 100%;
    font-family: Adobe 黑体 Std R;
    .titleName .name {
      display: inline-block;
      font-size: 1.3vw;
      font-family: Adobe 黑体 Std R;
      font-weight: 700;
      color: rgba(255, 255, 255, 1);
    }

    .titleName .en span {
      font-weight: lighter;
      letter-spacing: -0.5px;
      white-space: nowrap;
      font-size: 0.6vw;
      font-family: Adobe 黑体 Std R;
      zoom: 1;
    }
    .distance-legend{
        left: 0!important;
    }
    .titleName .en {
      color: #919293;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-family: Adobe 黑体 Std R;
    }

    .titleName .en span:last-child {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      background: url("../../assets/layerManagement/title.png") 50% repeat-x;
      height: 8px;
      margin-left: 5px;
    }

    .titleName {
        padding-left: 0;
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        background: url("../../assets/layerManagement/last.png") no-repeat 0 100%;
        background-size: 100%;
    }
    .compass {
      top: 8% !important;
      right: 19.5vw !important;
      z-index: 110 !important;
      width: 3.5vw !important;
      height: 3.5vw !important;
    }
    .compass1{
      transition: transform 0.5s;
      transform: translate(0vw,0px);
    }
    .compass2{
      transition: transform 0.5s;
      transform: translate(19vw,0px);
    }
    .compass-outer-ring-background {
      width: 2.2vw !important;
      height: 2.2vw !important;
      border: 0.55vw solid rgba(47,53,60,.8) !important;
    }
    .leftbtn{
        float: right;
        width: 5%;
        height: 100%;
    }
    .leftbtn:hover{
        background-color:rgba(155, 155, 155, 0.5);
        cursor: pointer;
        .lefticon{
          color:rgb(0, 0, 0);
        }
    }
    .lefticon{
      transform: translateY(24vw);
      color:rgba(155, 155, 155, 0)
    }
    .leftinfo{
      float: left;
      width: 95%;
      height: 100%;
      padding: 1vw 1vw 1vw 1vw;
      background-color: rgba(0, 48, 64, 0.4);
      border: 1px solid #73ffff !important;
      border-radius: 5px!important;
    }
    .rightinfo{
      float: right;
      width: 95%;
      height: 100%;
      padding: 1vw 1vw 1vw 1vw;
      background-color: rgba(0, 48, 64, 0.4);
      border: 1px solid #73ffff !important;
      border-radius: 5px!important;
      overflow-y: auto;
         //滚动条样式
        &::-webkit-scrollbar {
        width: 0;
        }
    }
    .rightbtn{
        float: left;
        width: 5%;
        height: 100%;
        border-radius: 5px 0 0 5px;
    }
    .rightbtn:hover{
        background-color:rgba(155, 155, 155, 0.5);
        cursor: pointer;
        .lefticon{
          color:rgb(0, 0, 0);
        }
    }
    .rightactive{
        transition: transform 0.5s;
        transform: translate(95%,0px);
    }
    .pingtaiclass{
        position: absolute;
        transition: transform 0.5s;
    }
    .leftactive{
        transition: transform 0.5s;
        transform: translate(0%,0px);
    }
    .leftclose{
        transition: transform 0.5s;
        transform: translate(-95%,0px);
    }
    .leftactive,.leftclose{
        position: absolute;
        top: 8% ;
        left: -1px;
        width: 20%;
        max-height: 82%;
        overflow-y: auto;
         //滚动条样式
        &::-webkit-scrollbar {
        width: 0;
        }
    }
    .rightactive,.pingtaiclass{
        position: absolute;
        right: 0;
        top: 8%;
        width: 20%;
        height: 82%;
        overflow-y: auto;
         //滚动条样式
        &::-webkit-scrollbar {
        width: 0;
        }
    }
    .text{
        font-size: 0.9vw;
        font-family: Adobe 黑体 Std R;
        font-weight: 400;
        color: #fff;
        line-height: 2.6vh;
        text-align: justify;
        text-indent: 1.8vw;
        overflow-y: auto;
         //滚动条样式
        &::-webkit-scrollbar {
        width: 0;
        }
    }
    .title{
        font-size: 1.2vw;
        font-family: Adobe 黑体 Std R;
        font-weight: 700;
        color: rgb(255, 175, 81);
        margin-bottom: 1vw;
        line-height: 2.6vh;
        //text-align: center;
        overflow-y: auto;
         //滚动条样式
        &::-webkit-scrollbar {
        width: 0;
        }
    }
    .ivu-tree-title{
        color: rgb(255, 255, 255) !important;
        left: 1% !important;
        border-bottom: 1px solid #f2f2f2;
    }

    .ivu-tree-arrow i {
        color: aliceblue;
    }

    .ivu-tree-title-selected, .ivu-tree-title-selected:hover,.ivu-tree-title:hover {
        background-color: rgba(0, 247, 255, 0.4) !important;
    }

    .areaGeneral > div {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          color: #fff;
        }

        .areaGeneral,
        .areaGeneral > div {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          margin-top: 1vh;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .areaGeneral > div p {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
        }

        .areaGeneral > div p span[data-v-70c05f86] {
          font-size: 1.3vw;
        }

        .areaGeneral > div p span {
          font-size: 0.9vw;
          font-family: Adobe 黑体 Std R;
          line-height: 2vh;
          display: inline-block;
          height: 2vh;
        }

        .areaGeneral > div p i {
          font-style: normal;
          font-weight: 400;
          font-size: 0.9vw;
        }

        .areaGeneral > div h1 {
          font-size: 0.9vw;
          font-weight: 400;
          line-height: 2vh;
          white-space: nowrap;
          font-family: Adobe 黑体 Std R;
          overflow: hidden;
          text-overflow: ellipsis;
    }

    .office-header {
      top: 0;
      position: absolute;
      height: 6vh;
      width: 100%;
      background: url("../../assets/bigScreenImg/head_bg.png") no-repeat;
      z-index: 888;
      background-size: 100% 100%;
    }

    .analysis-info {
      position: absolute;
      top: 8px;
      right: 20px;
      font-size: 0.9vw;
      color: #fff;
    }

    .analysis-water {
      height: 2vh;
      line-height: 2vh;
      position: absolute;
      top: 8px;
      left: 20px;
      color: #fff;
    }

    .analysis-water span {
      text-align: center;
      margin-left: 10px;
      font-size: 0.9vw;
    }

    .office-header .title-info {
      height: 2em;
      color: #FFF;
      text-align: center;
      font-size: 1.6vw;
      font-family: 'KaiTi';
      font-weight: 900;
      line-height: 2em;
      vertical-align: middle;
      width: 100%;
      letter-spacing: 0;
      position: absolute;
      bottom: 5px;
      /*text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;*/
    }

    #nav {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 160px;
      background: url(../../assets/bigScreenImg/bottom.png) bottom;
    }

    .navWrap {
      position: absolute;
      bottom: 0;
      padding-bottom: 20px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);

      .mainNav {
        display: flex;

        li {
          position: relative;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: end;
          -ms-flex-pack: end;
          justify-content: flex-end;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding: 12px 20px;
        }

        .nav-box {
          text-align: center;
        }

        li .label {
          margin-top: 10px;
        }

        .nav-box span {
          font-size: 16px;
          display: block;
          text-align: center;
          color: #d0d0d0;
          user-select: none;
        }

        .nav-box.active span, .nav-box:hover span {
          color: #41b0ff;
        }

        .icon-nav, .nav-box i {
          width: 66px;
          height: 89px;
          display: inline-block;
        }

        .icon-nav {
          vertical-align: middle;
          margin: 0 auto;
          cursor: pointer;
        }
      }
    }
  }
</style>
