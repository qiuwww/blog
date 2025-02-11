<template>
  <div class="container">
    <div class="layerManagement" :style="{right: $parent.isOpen? '22%' : '20px'}" v-show="show && data.length>0">
      <div v-if="!tuceng" class="titl">图层</div>
      <ul v-if="!tuceng">
        <li v-for="(item,index) in data" :key="index">
          <div class="map-check-lis">
            <span @click="openchildren(item)">{{item.name}}</span>
            <div class="switch_color">
              <i-switch size="large"
                        true-color="#13ce66"
                        false-color="#ff4949"
                        true-value="1"
                        false-value="0"
                        :value="item.value"
                        @on-change="switchChange(item)">
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </i-switch>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="tuceng" class="titl">二级图层</div>
      <ul v-if="tuceng">
        <li v-for="(item,index) in menudata" :key="index">
          <div class="map-check-lis">
            <span>{{item.name}}</span>
            <div class="switch_color">
              <i-switch size="large"
                        true-color="#13ce66"
                        false-color="#ff4949"
                        true-value="1"
                        false-value="0"
                        :value="item.value"
                        @on-change="switchChange(item)">
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </i-switch>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="funcManagement">
      <!--弹框-->
      <my-modal v-model="modalShow" ref="myModal"></my-modal>

      <!--360全景-->
      <div class="scennery" v-show="show360">
        <div class="mt-header">
          <Icon type="md-close-circle" @click="close360()"/>
        </div>
        <div class="mt-body">
          <iframe id="iframe" :src="url360"></iframe>
        </div>
      </div>

      <!--图层开关-->
      <div class="controller" :style="{right: $parent.isOpen? '22%' : '20px'}" @click="show=!show,tuceng=false" v-show="ctrlShow"
           title="图层控制面板">
        <Icon type="ios-settings"/>
      </div>

      <!--侧边栏开关-->
      <div class="sidebar" :style="{right: $parent.isOpen? '24%' : '60px'}" @click="$parent.isOpen = !$parent.isOpen"
           title="侧边栏展示">
        <Icon type="ios-bulb"/>
      </div>

      <!--常驻图层开关-->
      <div class="sidebar-map" :style="{right: $parent.isOpen? '26%' : '100px'}" @click="$parent.isshowbasicsmap = !$parent.isshowbasicsmap"
            title="基础图层展示">
        <Icon type="ios-map"/>
      </div>

      <!--等待层-->
      <div class="modals" v-show="loadingShow">
        <div class="modals-wrap">
          <Icon type="ios-loading" size=30 class="demo-spin-icon-load" color="#3F96F1"></Icon>
          <div class="modals-text">Loading</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {getSecondMenuByPath} from "@/api/zhxc/basicMenuInformation/basicMenuInformation";
    import {getPolygonAndPolyLineAndPoint} from "@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement";
    //import {centerPoint} from "@/api/zhxc/tScenicSpotManagement/centerPoint";
    import myModal from "./myModal";

    export default {
        name: 'layerManagement',
        components: {
            myModal
        },
        props: {
            layerShow: {
                type: String,
                default: "",
            },
            viewer: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                show: false,
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
            }
        },
        methods: {
            //点击打开子图层
            openchildren(menuItem){
                this.menudata=[];
                this.menudata=  this.data2.filter(item => item.pid == menuItem.id);
                if(this.menudata&&this.menudata.length>0){
                    this.tuceng=!this.tuceng
                }
            },
            //图例数组去重
            cleanarr(){
                var _this=this;
                for (var i = 0; i <_this.legendarr.length; i++) {
                    var flag = false;
                    for (var member of _this.$parent.legendarr) {
                        if (member.color == _this.legendarr[i].color&&member.label== _this.legendarr[i].label) {
                            flag = true;
                            break
                            }
                        }
                        if (!flag) {
                            _this.$parent.legendarr.push(_this.legendarr[i])
                        }
                }
            },
            //基础图层切换
            Changemap(menuItem,val){
                let _this = this;
                _this.loadingShow = true;
                _this.legendarr=[];
                if (val) {
                    //展示图例
                    _this.$parent.legendarr.forEach(function (item2) {
                                    if (item2.id == menuItem.id) {
                                        item2.show=true
                                    }
                                });
                    //是否已经加载资源
                    if (_this.dataSourceArr.length > 0) {
                        //已缓存
                        let newDataSource = _this.dataSourceArr.filter(function (item) {
                            return item.id == menuItem.id;
                        })
                        //渲染到地图
                        if (newDataSource != null && newDataSource.length > 0) {
                            for (let i = 0; i < newDataSource.length; i++) {
                                let dt = newDataSource[i];
                                if (dt.type == "polygon") {
                                    //面
                                    dt.dataSource.show = true;
                                } else if (dt.type == "polyline") {
                                    //线
                                    _this.viewer.entities.getById(dt.dataSource.id).show = true;
                                } else if (dt.type == "point") {
                                    //点
                                    dt.dataSource.show = true;
                                } else if (dt.type == "divPoint") {
                                    //divPoint
                                    dt.dataSource.visible = true;
                                }
                            }
                            _this.loadingShow = false;
                        } else {
                            //如本地无，重新请求
                            _this.initScenicSpotAndBasicInfomation(menuItem);
                        }
                    } else {
                        //本地无，重新请求
                        _this.initScenicSpotAndBasicInfomation(menuItem);
                    }
                } else {
                    //已缓存
                    let newDataSource = _this.dataSourceArr.filter(function (item) {
                        return item.id == menuItem.id;
                    })
                    _this.$parent.legendarr.forEach(function (item2) {
                                    if (item2.id == menuItem.id) {
                                        item2.show=false
                                    }
                                });
                    //隐藏图层
                    if (newDataSource != null && newDataSource.length > 0) {
                        for (let i = 0; i < newDataSource.length; i++) {
                            let dt = newDataSource[i];
                            if (dt.type == "polygon") {
                                //面
                                dt.dataSource.show = false;
                            } else if (dt.type == "polyline") {
                                //线
                                _this.viewer.entities.getById(dt.dataSource.id).show = false;
                            } else if (dt.type == "point") {
                                //点
                                dt.dataSource.show = false;
                            } else if (dt.type == "divPoint") {
                                //divPoint
                                dt.dataSource.visible = false;
                            }
                        }
                    }
                    //loading
                    _this.loadingShow = false;
                    //divPoint计数
                    _this.count = 0;
                }
            },
            //改变开关状态
            switchChange(menuItem) {
                //判断是否存在二级图层
                if(menuItem.level==1){
                    var data=this.data2.filter(item => item.pid == menuItem.id)
                    if(data.length>0){
                        if(menuItem.value=="1"){
                            menuItem.value = "0";
                            data.forEach(element => {
                                if(element.value=="1"){
                                    this.switchChange(element);
                                }
                            });
                        }else{
                            menuItem.value = "1";
                            data.forEach(element => {
                                if(element.value=="0"){
                                    this.switchChange(element);
                                }
                            });
                        }
                        return;
                    }
                }
                let _this = this;
                _this.legendarr=[]
                if (menuItem.path == "qwtj") {
                    //交通点击路线，只有区位条件才能点击
                    _this.$parent.traficLineFilterByPath(menuItem.path);
                } else {
                    _this.$parent.traficLineFilterByPath('');
                }
                _this.loadingShow = true;
                //内容框
                _this.$refs.myModal.cancelModal();
                //改变开关状态
                if (menuItem.value == "0") {
                    // _this.loadingShow = true;
                    //打开开关
                    menuItem.value = "1";
                    //判断图例展示
                    _this.$parent.legendarr.forEach(function (item2) {
                                    if (item2.id == menuItem.id) {
                                        item2.show=true
                                    }
                                });
                    //打开所有二级图层按钮后联动关闭一级图层
                    if(menuItem.level==2){
                        var data=this.menudata.filter(item => item.value =="1");
                        if(data.length!=0){
                            for(var i=0;this.data.length>i;i++){
                                if(this.data[i].id==menuItem.pid){
                                    this.data[i].value="1"
                                }
                            }
                        }
                    }
                    //是否已经加载资源
                    if (_this.dataSourceArr.length > 0) {
                        //已缓存
                        let newDataSource = _this.dataSourceArr.filter(function (item) {
                            return item.id == menuItem.id;
                        })
                        //渲染到地图
                        if (newDataSource != null && newDataSource.length > 0) {
                            for (let i = 0; i < newDataSource.length; i++) {
                                let dt = newDataSource[i];
                                if (dt.type == "polygon") {
                                    //面
                                    dt.dataSource.show = true;
                                } else if (dt.type == "polyline") {
                                    //线
                                    _this.viewer.entities.getById(dt.dataSource.id).show = true;
                                } else if (dt.type == "point") {
                                    //点
                                    dt.dataSource.show = true;
                                } else if (dt.type == "divPoint") {
                                    //divPoint
                                    dt.dataSource.visible = true;
                                }
                            }
                            _this.loadingShow = false;
                        } else {
                            //如本地无，重新请求
                            _this.initScenicSpotAndBasicInfomation(menuItem);
                        }
                    } else {
                        //本地无，重新请求
                        _this.initScenicSpotAndBasicInfomation(menuItem);
                    }
                } else {
                    //关闭开关
                    menuItem.value = "0";
                    //已缓存
                    let newDataSource = _this.dataSourceArr.filter(function (item) {
                        return item.id == menuItem.id;
                    })
                    //关闭对应图例
                    _this.$parent.legendarr.forEach(function (item2) {
                                    if (item2.id == menuItem.id) {
                                        item2.show=false
                                    }
                                });
                    //关闭所有二级图层按钮后联动关闭一级图层
                    if(menuItem.level==2){
                        var data=this.menudata.filter(item => item.value =="1");
                        if(data.length==0){
                            for(var i=0;this.data.length>i;i++){
                                if(this.data[i].id==menuItem.pid){
                                    this.data[i].value="0"
                                }
                            }
                        }
                    }
                    //隐藏图层
                    if (newDataSource != null && newDataSource.length > 0) {
                        for (let i = 0; i < newDataSource.length; i++) {
                            let dt = newDataSource[i];
                            if (dt.type == "polygon") {
                                //面
                                dt.dataSource.show = false;
                            } else if (dt.type == "polyline") {
                                //线
                                _this.viewer.entities.getById(dt.dataSource.id).show = false;
                            } else if (dt.type == "point") {
                                //点
                                dt.dataSource.show = false;
                            } else if (dt.type == "divPoint") {
                                //divPoint
                                dt.dataSource.visible = false;
                            }
                        }
                    }
                    //loading
                    _this.loadingShow = false;

                    //divPoint计数
                    _this.count = 0;
                }
            },
            //获取二级菜单
            initSecondMenu() {
                getSecondMenuByPath({path: this.nPath}).then(res => {
                    if (res && res.success) {
                        let tempData = res.data;
                        tempData.map((item) => {
                            item.value = "0";
                        })
                        //获取二级菜单
                        this.data = tempData.filter(item => item.level == 1);
                        //获取三级菜单
                        this.data2= tempData.filter(item => item.level == 2);
                        //this.data = tempData;
                        if (tempData != null && tempData.length > 0) {
                            this.switchChange(tempData[0]);
                        }
                    }
                })
            },
            //初始化加载数据
            initScenicSpotAndBasicInfomation(v) {
                var _this = this;
                if (v) {
                    getPolygonAndPolyLineAndPoint({path: v.path,type:_this.$parent.pageinformation.id}).then(res => {
                        if (res && res.success && res.data) {
                            let polygon = res.data.Polygon;
                            let lineString = res.data.LineString;
                            let point = res.data.Point;
                            var perspective =null; //res.data.Perspective;

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
                                    _this.initLayer(iconGeoJson, v);
                                } else {
                                    //关闭loading
                                    _this.loadingShow = false;
                                }

                            }
                            _this.cleanarr();
                        }
                    });
                }
            },
            initLayer(json, v) {
                var _this = this;
                if (json) {
                    //加载json数据
                    Cesium.GeoJsonDataSource.load(json, {
                        clampToGround: true
                    }).then(function (dataSource) {
                        let newDataSource = new Cesium.CustomDataSource(v.path);
                        //设置样式
                        let entities = dataSource.entities.values;
                        _this.$emit('func', entities);
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
                    _this.$refs.myModal.cancelModal();
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
                            image: '/tempfile'+entity.properties.icon._value,
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
                                _this.$refs.myModal.cancelModal();
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

                    _this.$refs.myModal.cancelModal();

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

                    //相机距离
                    //var distanceDisplayCondition;
                    // if (entity.properties.name._value == "新兴村") {
                    //     distanceDisplayCondition = new Cesium.DistanceDisplayCondition(5784, 300000);
                    // }
                    // if (entity.properties.name._value == "大顺乡") {
                    //     distanceDisplayCondition = new Cesium.DistanceDisplayCondition(20000, 300000);
                    // }

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
            //关闭360全景
            close360() {
                this.show360 = false;
                this.url360 = "";
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
                        //var newclr = color.getValue().withAlpha(0.3);//3dtitle展示
                        color.setValue(newclr);
                        this.lastEntity = entity;
                        this.entId = entity.id;
                    }
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
            //加载大顺乡,新兴村边界线
            loadDashunXiangBoundry() {
                var _this = this;

                Cesium.GeoJsonDataSource.load("config/dashunxiang.json", {
                    clampToGround: true
                }).then(function (dataSource) {

                    _this.viewer.dataSources.add(dataSource);

                    let entities = dataSource.entities.values;

                    for (let i = 0; i < entities.length; i++) {
                        let entity = entities[i];
                        entity.polyline.width = 8;
                        entity.polyline.material = new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.RED,
                            dashLength: 0
                        })
                        entity.polyline.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(30000, 300000);
                    }
                })
            }
        },
        watch: {
            layerShow(v) {
                var _this = this;
                //关闭弹框
                _this.$refs.myModal.cancelModal();
                if (_this.waitFlag) {
                    _this.waitFlag = false;
                    //大顺乡边界
                    // _this.loadDashunXiangBoundry();
                    //关闭弹框
                    _this.$refs.myModal.cancelModal();
                    if (_this.isSingleEntry) {
                        _this.isSingleEntry = false;
                        //是否显示、路径
                        let showAndPath = v;
                        var showStr = showAndPath.split(',')[0];
                        var pathStr = showAndPath.split(',')[1];
                        //第一次
                        if (_this.tempPath == "") {
                            if (showStr == "1") {
                                _this.ctrlShow = true;
                                _this.show = false;
                                _this.nPath = pathStr;
                                _this.initSecondMenu();
                            } else {
                                _this.show = false;
                                _this.ctrlShow = false;
                                //根据路径获取没有二级菜单的一级菜单的视角
                                _this.initScenicSpotAndBasicInfomation({id: pathStr, path: pathStr});
                            }
                        } else {
                            _this.loadingShow = true;
                            //非第一次
                            if (_this.tempPath != v) {
                                //关闭所有图例
                                _this.$parent.legendarr.forEach(function (item2) {
                                       item2.show=false
                                });
                                //清除图层1
                                _this.viewer.dataSources.removeAll();
                                _this.viewer.entities.removeAll();
                                //清除divPoint
                                for (let i = 0; i < _this.dataSourceArr.length; i++) {
                                    let dt = _this.dataSourceArr[i];
                                    //所点击按钮
                                    if (dt.type == "divPoint") {
                                        //divPoint
                                        dt.dataSource.destroy();
                                    }
                                }
                                //面
                                _this.dataSourceArr = [];
                                //divpoint计数
                                _this.count = 0;

                                if (showStr == "1") {
                                    _this.ctrlShow = true;
                                    _this.show = false;
                                    _this.nPath = pathStr
                                    _this.initSecondMenu();
                                } else {
                                    _this.show = false;
                                    _this.ctrlShow = false;
                                    //根据路径获取没有二级菜单的一级菜单的视角
                                    _this.initScenicSpotAndBasicInfomation({id: pathStr, path: pathStr});
                                }
                            }
                            if(_this.$parent.isshowbasicsmap){
                                    _this.$parent.showbasicsmap();
                                }
                        }
                        _this.tempPath = showAndPath;
                        _this.isSingleEntry = true;
                    }
                    _this.waitFlag = true;
                }
            }
        }
    }
</script>
<style lang="less">
  //divpoint样式
  div[class^='initLabel'] {
    position: relative;
    left: -50%;
    top: -20px;
    height: 30px;
    line-height: 20px;
    padding: 4px 14px;
    color: #fff;
    border-radius: 16px;
    border: 1px solid #fff;
    background: #00a0e9;
    z-index: 2;
    user-select: none;
    font-size: 14px;
  }

  div[class^='initLabel']::before {
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: 27px;
    left: 50%;
    padding: 0;
    border-bottom: 8px solid #00a0e9;
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    display: block;
    content: '';
    z-index: 12;
    transform: translate(-50%, 0) rotate(180deg);
  }

  div[class^='initLabel']::after {
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: 28px;
    left: 50%;
    padding: 0;
    border-bottom: 9px solid #fff;
    border-top: 9px solid transparent;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    display: block;
    content: '';
    z-index: 10;
    transform: translate(-50%, 0) rotate(180deg);
  }

  .container {
    .layerManagement {
      box-sizing: border-box;
      position: absolute;
      width: 225px;
      z-index: 102;
      bottom: 18%;
      right: 22%;
      padding: 20px 10px 0;
      background: url("../../../assets/layerManagement/legendCenter.png") repeat-y;

      &::before {
        content: "";
        width: 236px;
        display: inline-block;
        position: absolute;
        left: 0px;
        height: 38px;
        top: -38px;
        background: url("../../../assets/layerManagement/legend-top3.png") no-repeat;
      }

      &::after {
        content: "";
        width: 236px;
        display: inline-block;
        position: absolute;
        left: 0px;
        height: 37px;
        bottom: -37px;
        background: url("../../../assets/layerManagement/legend-bottom3.png") no-repeat;
      }

      .titl {
        position: absolute;
        top: -20px;
        left: 30px;
        font-size: 20px;
        color: #ccf2ff;
      }

      ul {
        li {
          list-style: none;
          color: #76ddff;
          font-size: 14px;
          text-align: left;
          padding: 5px 20px;
          cursor: pointer;
          margin-bottom: 2px;

          .map-check-lis {
            height: 25px;
            line-height: 25px;

            .switch_color {
              display: inline-block;
              float: right;
            }

            .el-switch {
              height: 24px;
              cursor: pointer;
              float: right;

              .el-switch__core {
                background: url("../../../assets/layerManagement/switch-on.png") no-repeat;
                background-size: 100% 100%;
                height: 26px;

                &::after {
                  top: 3px;
                  left: 43px;
                  width: 20px;
                  height: 20px;
                  background: url("../../../assets/layerManagement/switch-btn.png") no-repeat;
                  background-size: 100% 100%;
                }

                .ivu-switch {
                  border: 2px solid rgba(0, 0, 0, .2);
                  box-shadow: 0 0 1px 2px #445251;
                }
              }
            }
          }
        }
      }
    }

    .funcManagement {
      //360全景展示
      .scennery {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        height: 600px;
        border-radius: 10px;

        .mt-header {
          position: absolute;
          top: -6px;
          right: 0px;
          font-size: 25px;
          color: rgba(95, 113, 90, .3);

          &:hover {
            color: rgba(255, 255, 255, 1);
          }
        }

        .mt-body {
          width: 100%;
          height: 100%;

          iframe {
            width: 100%;
            height: 100%;
            border: 0;
          }
        }
      }

      //等待层
      .modals {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .3);
        z-index: 21;

        .modals-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;

          .modals-text {
            font-size: 30px;
            color: #3F96F1;
            user-select: none;
          }

          .demo-spin-icon-load {
            animation: ani-demo-spin 1s linear infinite;
          }

          @keyframes ani-demo-spin {
            from {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(90deg);
            }
            50% {
              transform: rotate(180deg);
            }
            75% {
              transform: rotate(270deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        }
      }

      //控制图层按钮
      .controller {
        position: fixed;
        right: 22%;
        bottom: 3%;
        font-size: 40px;
        color: rgba(204, 204, 204, 0.8);
        z-index: 102;
        animation: rotate 12s linear infinite;

        &:hover {
          color: rgba(204, 204, 204, 0.4);
          animation-play-state: paused;
        }

        @keyframes rotate {
          0% {
          }
          100% {
            transform: rotateZ(360deg);
          }
        }
      }

      .sidebar {
        position: fixed;
        right: 24%;
        bottom: 3%;
        font-size: 40px;
        color: rgba(204, 204, 204, 0.8);
        z-index: 102;

        &:hover {
          color: rgba(204, 204, 204, 0.4);
          animation-play-state: paused;
        }
      }
      .sidebar-map {
        position: fixed;
        bottom: 3%;
        font-size: 40px;
        color: rgba(204, 204, 204, 0.8);
        z-index: 102;

        &:hover {
          color: rgba(204, 204, 204, 0.4);
          animation-play-state: paused;
        }
      }
    }
  }
</style>
