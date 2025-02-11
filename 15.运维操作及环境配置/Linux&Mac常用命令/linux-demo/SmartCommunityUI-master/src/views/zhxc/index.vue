<template>
  <div class="mianMapDiv">
    <div id="centerDiv" class="mapcontainer">
      <Map :url="configUrl" class="mapclass" @onload="onMapload"/>
      <!--等待层-->
      <div class="modals" v-show="loadingShow">
        <div class="modals-wrap">
          <Icon type="ios-loading" size=30 class="demo-spin-icon-load" color="#3F96F1"></Icon>
          <div class="modals-text">Loading</div>
        </div>
      </div>

      <!--360全景-->
      <div class="scennery" v-show="show360">
        <div class="mt-header">
          <Icon type="md-close-circle" @click="close360()"/>
        </div>
        <div class="mt-body">
          <iframe id="iframe" :src="url360"></iframe>
        </div>
      </div>
    </div>
    <div class="contentInfo">
      <div class="ql-container ql-snow" v-if="editorContent">
        <div class="ql-editor" v-html="editorContent">
        </div>
      </div>
    </div>
    <!--左侧公司名称-->
    <div ref="left" class="contentInfo-left">
      <ul>
      </ul>
    </div>
    <my-modal v-model="show" :title="title" :htmlStr="htmlStr"></my-modal>
  </div>
</template>

<script>
    import {getPolygonAndPolyLineAndPoint} from "@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement";
    import {getBasicMenuInformationByMenuPath} from "@/api/zhxc/basicMenuInformation/basicMenuInformation";
    import Map from '../../components/mars-map/Main.vue';
    import myModal from "./components/myModal";
    import {centerPoint} from "@/api/zhxc/tScenicSpotManagement/centerPoint";

    export default {
        name: 'index',
        components: {
            myModal,
            Map
        },
        data() {
            return {
                loadingShow: true,
                show: false,
                configUrl: "../config/simpleConfig.json",
                height: 800,
                bgColor: [],
                editorContent: '',
                htmlStr: '',
                title: '',
                data: [],
                viewer: null,
                divPoints: [],
                count: 0,
                path: '',
                flag: false,
                url360: '',
                show360: false
            };
        },
        created() {
            this.height = window.innerHeight - 50 + "px";
            getBasicMenuInformationByMenuPath({path: this.$route.path.substring(1, this.$route.path.length)}).then(res => {
                if (res && res.success && res.data) {
                    this.editorContent = res.data.content;
                } else {
                    this.editorContent = "";
                }
            });
        },
        methods: {
            //初始化加载数据
            initScenicSpotAndBasicInfomation(val) {
                var _this = this;
                if (val) {
                    _this.path = val.path.substring(1, val.path.length);
                } else {
                    _this.path = this.$route.path.substring(1, this.$route.path.length);
                }
                getPolygonAndPolyLineAndPoint({path: _this.path,type:''}).then(res => {
                    if (res && res.success && res.data) {
                        //清除其他菜单图层
                        _this.viewer.dataSources.removeAll();
                        _this.viewer.entities.removeAll();

                        //飞到指定区域
                        let centerPoints = centerPoint;
                        for (let i = 0; i < centerPoints.length; i++) {
                            if (centerPoints[i].code == _this.path) {
                                _this.viewer.mars.centerAt(centerPoints[i].position);
                            }
                        }
                        //清除divPoint
                        if (_this.divPoints.length > 0) {
                            for (var i = 0; i < _this.divPoints.length; i++) {
                                _this.divPoints[i].destroy();
                            }
                            _this.divPoints = [];
                        }
                        //清除count计数
                        _this.count = 0;
                        //清除div
                        document.querySelector(".contentInfo-left").querySelector("ul").innerHTML = "";

                        if (res.data.Polygon) {
                            //面
                            _this.addPolygon(res.data.Polygon);
                        }
                        if (res.data.LineString) {
                            //线
                            _this.addPolyline(res.data.LineString);
                        }
                        if (res.data.Point) {
                            //点
                            _this.addIconPoint(res.data.Point)
                        }
                        //地图上无图层，关闭loading
                        if (_this.flag) {
                            _this.loadingShow = false;
                        }
                    }
                });
            },
            //地图构造完成回调
            onMapload(viewer) {
                this.viewer = viewer;
                this.initScenicSpotAndBasicInfomation();
            },
            //添加面
            addPolygon(data) {
                var _this = this;
                if (data != null && data.length > 0) {
                    //构造GeoJson
                    var polyGonGeoJson = _this.initGeoJson();
                    for (var i = 0; i < data.length; i++) {
                        var position = data[i].position;

                        if (position) {
                            position = JSON.parse(data[i].position)
                            var arr = [];
                            for (var j = 0; j < position.length; j = j + 2) {
                                var jingdu = position[j];
                                var weidu = position[j + 1];

                                if (jingdu && weidu) {
                                    arr.push([jingdu, weidu]);
                                }
                            }
                            //构造feature
                            var feature = _this.initFeature("Polygon", data[i]);
                            if (arr) {
                                feature.geometry.coordinates[0] = arr;
                                polyGonGeoJson.features.push(feature);
                            }
                        }
                    }

                    //加载json数据
                    Cesium.GeoJsonDataSource.load(polyGonGeoJson, {
                        clampToGround: true
                    }).then(function (dataSource) {
                        _this.viewer.dataSources.add(dataSource);


                        var entities = dataSource.entities.values;
                        for (var i = 0; i < entities.length; i++) {
                            var entity = entities[i];

                            var isDisplayState = entity.properties.isDisplayState._value;
                            //是否显示
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
                                if (isBorder == 1) {
                                    //有边框,有颜色
                                    var color = entity.properties.color._value;
                                    //是否虚线
                                    var dashLine = entity.properties.isDashLien._value;
                                    if (dashLine == "1") {
                                        //虚线
                                        _this.addPolyLienForPolygon(entity);
                                    } else {
                                        //实线
                                        entity.polygon.outline = true;
                                        entity.polygon.outlineColor = new Cesium.Color.fromCssColorString(color).withAlpha(0.8);
                                    }
                                } else {
                                    entity.polygon.outline = true;
                                    entity.polygon.outlineColor = new Cesium.Color.fromCssColorString("rgba(255,255,0,1)").withAlpha(0.5);
                                }

                                //背景色
                                var polygonColor = entity.properties.polygonColor._value;
                                if (polygonColor == null || polygonColor == "") {
                                    polygonColor = "#3B554C";//默认
                                }

                                //面透明度
                                var alpha = entity.properties.alpha._value;
                                if (alpha == null || alpha == "" || alpha == "0") {
                                    alpha = 0.8;
                                }

                                //面背景色
                                var color = new Cesium.Color.fromCssColorString(polygonColor).withAlpha(alpha);
                                entity._colordata = color;
                                entity.polygon.material = color;

                                //添加文字
                                _this.addLabel(entity);
                            }
                        }

                        //文字添加成功后，设置倒三角形的背景色
                        for (var i = 1; i <= _this.count; i++) {
                            var labelColor = document.querySelector(".initLabel" + i).style.background;

                            if (labelColor) {
                                var colorArr = labelColor.replace(/rgba\(/, '').replace(/\)/, '').replace(/\s+/g, '').split(',');
                                var rgba = "rgba(" + colorArr[0] + "," + colorArr[1] + "," + colorArr[2] + "," + 0.8 + ")";
                                document.styleSheets[0].addRule('.initLabel' + i + '::before', 'border-bottom:8px solid ' + rgba + ' !important;');
                            }
                        }
                        //关闭loading
                        _this.loadingShow = false;

                    }).otherwise(function (error) {
                        haoutil.alert(error, "加载数据出错");
                    });
                } else {
                    _this.flag = true;
                }
            },
            //面添加文字
            addLabel(entity) {
                var _this = this;
                //点击弹框
                entity.click = function (e) {
                    var desc = e.properties.description._value;
                    if (desc != null && desc != '') {
                        _this.show = true;
                        _this.htmlStr = desc;
                        _this.title = e.properties.name._value;
                    }
                }

                //求中心点
                var height = entity.polygon.extrudedHeight;
                var positions = mars3d.draw.attr.polygon.getPositions(entity);
                var ptcenter = mars3d.point.centerOfMass(positions, parseInt(height));
                var text = entity.properties.name._value || '';
                //面高度
                if (height == "0") {
                    //无高度
                    //添加标签
                    entity.position = ptcenter;
                    entity.label = {
                        text: text,
                        font: 'normal small-caps normal 14px 楷体',
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        fillColor: Cesium.Color.AZURE,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 2,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset: new Cesium.Cartesian2(0, 0),   //偏移量  
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000)
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

                    var divPoint = new mars3d.DivPoint(_this.viewer, {
                        html: "<div class='initLabel" + _this.count + "' style='background:" + bg + ";' id='" + entity.id + "'>" + text + "</div>",
                        position: ptcenter,
                        anchor: [0, 0],
                        click: function (e) {//单击后的回调

                        }
                    });
                    if (divPoint.viewer != null) {
                        _this.divPoints.push(divPoint);
                    }
                }
            },
            //面添加虚线
            addPolyLienForPolygon(entity) {
                var _this = this;
                //高度
                var height = entity.polygon.extrudedHeight;
                if (height == undefined) {
                    height = 0;
                } else {
                    height = height._value;
                }
                //经度纬度
                var cartesian3 = entity.polygon.hierarchy._value.positions;
                var ellipsoid = _this.viewer.scene.globe.ellipsoid;

                //循环坐标点
                var positions = [];
                for (var j = 0; j < cartesian3.length; j++) {
                    var cartographic = ellipsoid.cartesianToCartographic(cartesian3[j]);
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
                if (width == null || width == "") width = 2;
                //颜色
                var color = entity.properties.color._value;
                if (color == null || color == "") color = "#fff";
                //间隙长度
                var dashLength = entity.properties.dashLength._value;
                if (dashLength == null || dashLength == "") dashLength = 20;

                //加载线属性
                _this.viewer.entities.add({
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                        width: width,
                        material: new Cesium.PolylineDashMaterialProperty({
                            color: new Cesium.Color.fromCssColorString(color),
                            dashLength: dashLength
                        })
                    }
                });
            },
            //添加线
            addPolyline(data) {
                var _this = this;
                if (data != null && data.length > 0) {
                    //构造线GeoJson
                    var lineGeoJson = _this.initGeoJson();

                    //获取点坐标
                    for (var i = 0; i < data.length; i++) {
                        var position = JSON.parse(data[i].position);
                        if (position != null && position.length > 0) {
                            var arr = [];
                            for (var j = 0; j < position.length; j = j + 2) {
                                var point = [position[j], position[j + 1]];
                                arr.push(point);
                            }
                            //构造feature
                            var feature = _this.initFeature("LineString", data[i]);

                            feature.geometry.coordinates = arr;
                            lineGeoJson.features.push(feature);
                        }
                    }

                    //加载json
                    Cesium.GeoJsonDataSource.load(lineGeoJson, {
                        clampToGround: true
                    }).then(function (dataSource) {

                        //获取线实体
                        var entities = dataSource.entities.values;
                        //为线添加样式
                        for (var i = 0; i < entities.length; i++) {
                            var entity = entities[i];

                            if (entity && entity.polyline) {
                                //是否显示
                                var isShow = entity.properties.isShow._value;
                                if (isShow == "1") {
                                    //经度纬度
                                    var cartesian3 = entity.polyline.positions._value;
                                    //循环坐标点
                                    var positions = [];
                                    for (var j = 0; j < cartesian3.length; j++) {
                                        var ellipsoid = _this.viewer.scene.globe.ellipsoid;
                                        var cartographic = ellipsoid.cartesianToCartographic(cartesian3[j]);
                                        //经度
                                        var lng = Cesium.Math.toDegrees(cartographic.longitude);
                                        //纬度
                                        var lat = Cesium.Math.toDegrees(cartographic.latitude);

                                        positions.push(lng);
                                        positions.push(lat);
                                        positions.push(0);
                                    }
                                    //线条属性
                                    var width, color, length, glow;

                                    //是否虚线
                                    var isDash = entity.properties.isDash._value;
                                    if (isDash != 1) {

                                        //实线
                                        width = entity.properties.width._value;//线宽
                                        if (width == null || width == "") {
                                            width = 2;
                                        }

                                        //线颜色
                                        color = entity.properties.color._value;
                                        if (color == null || color == "") {
                                            color = "#fff";
                                        }
                                        //光晕效果

                                        glow = entity.properties.glow._value;
                                        if (glow == null && glow == "") {
                                            glow = 1;
                                        }
                                        //加载线属性
                                        _this.viewer.entities.add({
                                            polyline: {
                                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                                width: width,
                                                material: new Cesium.PolylineGlowMaterialProperty({
                                                    color: new Cesium.Color.fromCssColorString(color),
                                                    //设置Glow材质
                                                    glowPower: parseInt(glow),
                                                })
                                            }
                                        });
                                    } else {
                                        //虚线
                                        width = entity.properties.width._value;//线宽
                                        if (width == null || width == "") {
                                            width = 2;
                                        }
                                        //线颜色
                                        color = entity.properties.color._value;
                                        if (color == null || color == "") {
                                            color = "#fff";
                                        }
                                        //间隙长度
                                        length = entity.properties.length._value;
                                        if (length == null || length == "") {
                                            length = 20;
                                        }
                                        //加载线属性
                                        _this.viewer.entities.add({
                                            polyline: {
                                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                                                width: width,
                                                material: new Cesium.PolylineDashMaterialProperty({
                                                    color: new Cesium.Color.fromCssColorString(color),
                                                    dashLength: length
                                                })
                                            }
                                        });
                                    }
                                }
                            }

                            var text = entity.properties.name._value || '';
                            var positions = mars3d.draw.attr.polyline.getPositions(entity);
                            var ptcenter = mars3d.point.centerOfMass(positions);
                            var cartographic = ellipsoid.cartesianToCartographic(ptcenter);
                            //经度
                            var lng = Cesium.Math.toDegrees(cartographic.longitude);
                            //纬度
                            var lat = Cesium.Math.toDegrees(cartographic.latitude);
                            //高度
                            var alt = cartographic.height;

                            _this.viewer.entities.add({
                                position: Cesium.Cartesian3.fromDegrees(lng, lat),
                                label: {
                                    text: text,
                                    font: 'normal small-caps normal 14px 楷体',
                                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                    fillColor: Cesium.Color.AZURE,
                                    outlineColor: Cesium.Color.BLACK,
                                    outlineWidth: 2,
                                    pixelOffset: new Cesium.Cartesian2(0, 0),   //偏移量  
                                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
                                    clampToGround: true
                                }
                            });
                        }
                        //关闭loading
                        _this.loadingShow = false;
                    })
                } else {
                    _this.flag = true;
                }
            },
            //添加点
            addIconPoint(data) {
                var _this = this;
                if (data != null && data.length > 0) {
                    //构造GeoJson
                    var iconGeoJson = _this.initGeoJson();

                    //获取每个图标
                    for (var i = 0; i < data.length; i++) {
                        var p = data[i].position;
                        if (p != null && p != "") {
                            //构造feature
                            var feature = _this.initFeature("Point", data[i], JSON.parse(p));
                            iconGeoJson.features.push(feature);
                        }
                    }

                    Cesium.GeoJsonDataSource.load(iconGeoJson, {
                        clampToGround: true
                    }).then((dataSource) => {
                        _this.viewer.dataSources.add(dataSource);
                        _this.loadingShow = false;
                        var entities = dataSource.entities.values;

                        for (let i = 0; i < entities.length; i++) {
                            var entity = entities[i];
                            //图标显示
                            entity.billboard = {
                                image: entity.properties.icon._value,
                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
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
                                    var desc = e.properties.describes._value;
                                    if (desc != null && desc != '') {
                                        _this.show = true;
                                        _this.htmlStr = desc;
                                        _this.title = e.properties.name._value;
                                    }
                                }
                            }
                            //为图标添加标签
                            var position = JSON.parse(entity.properties.position._value);
                            var upOrDown = [30, -30];

                            //标签是否显示
                            if (entity.properties.titleShow._value == "1") {
                                if (position) {
                                    entity.position = Cesium.Cartesian3.fromDegrees(position[0], position[1], 0);
                                    //名称
                                    var name = entity.properties.name._value || '';
                                    //背景色
                                    var bgColor = entity.properties.backgroundColor._value || '#fff';
                                    //位置 上或下
                                    var namePosition = entity.properties.namePosition._value || 0;

                                    entity.label = {
                                        text: name,
                                        font: '14px', //字体样式
                                        fillColor: new Cesium.Color.fromCssColorString(bgColor),//字体颜色
                                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,//label样式
                                        outlineColor: Cesium.Color.WHITE,
                                        outlineWidth: 1,
                                        pixelOffset: new Cesium.Cartesian2(10, upOrDown[parseInt(namePosition)]), //偏移
                                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 8000)
                                    }
                                }
                            }
                        }
                    });

                    //关闭loading
                    _this.loadingShow = false;

                    //渲染左边dom
                    if (_this.path == "yykf") {
                        _this.initLeftDom(data);
                    }
                } else {
                    _this.flag = true;
                }
            },
            //左侧公司名称
            initLeftDom(data) {
                var _this = this;
                var oUl = document.querySelector(".contentInfo-left").querySelector("ul");
                var rgbaArr = ['19,230,154', '29,235,30', '229,133,20', '230,217,19'];
                for (let i = 0; i < data.length; i++) {
                    //创建li元素
                    var oLi = document.createElement("li");

                    //绑定事件
                    oLi.addEventListener("click", function () {
                        if (data[i].position) {
                            var position = JSON.parse(data[i].position);
                            _this.viewer.camera.flyTo({
                                destination: Cesium.Cartesian3.fromDegrees(position[0], position[1], 5000),
                                duration: 2
                            });
                        }
                    });

                    //样式
                    oLi.className = "info-item";

                    //背景条
                    var oDivBg = document.createElement("div");
                    oDivBg.className = "info-bg";
                    oDivBg.style.background = "rgba(" + rgbaArr[i % 4] + ",1)";
                    oLi.appendChild(oDivBg);

                    //文字
                    var oDivText = document.createElement("div");
                    oDivText.className = "info-text";
                    oDivText.style.background = "rgba(" + rgbaArr[i % 4] + ",.3)";

                    //内容
                    oDivText.innerText = data[i].name;
                    oLi.appendChild(oDivText);

                    oUl.appendChild(oLi);
                }
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
            close360() {
                this.show360 = false;
                this.url360 = "";
            }
        },
        watch: {
            $route: {
                handler(val, oldval) {
                    //loading
                    this.loadingShow = true;
                    //关闭360弹框
                    this.close360();
                    //关闭内容
                    this.show = false;
                    //加载点线面
                    this.initScenicSpotAndBasicInfomation(val);

                    getBasicMenuInformationByMenuPath({path: val.path.substring(1, val.path.length)}).then(res => {
                        if (res && res.success && res.data) {
                            this.editorContent = res.data.content;
                        } else {
                            this.editorContent = "";
                        }
                    });
                },
                // 深度观察监听
                deep: true
            }
        }
    }
</script>

<style lang="less">
  .mianMapDiv {
    position: relative;
    padding: 0px 0px 10px;
    background: #e6ebf5;
    height: calc(100vh - 51px);

    .modals {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .3);
      z-index: 13;

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

    .mapcontainer {
      position: relative;
      height: 100%;
      overflow: hidden;
      width: calc(100% - 380px);
      float: left;
      padding: 10px;
      height: calc(100vh - 51px);
      background-color: white;
      border-radius: 0px 0px 0px 0px;
      padding-right: 5px;
    }

    .mapclass {
      border-radius: 8px;
    }

    .contentInfo {
      width: 380px;
      float: right;
      padding: 10px;
      height: calc(100vh - 51px);
      padding-left: 5px;
      background-color: #fff;

      font[size="2"] {
        font-size: 14px;
      }

      p {
        text-align: justify;
        text-justify: inter-ideograph;
      }

      font {
        text-align: justify;
        text-justify: inter-ideograph;
      }

      .ql-container.ql-snow {
        border-radius: 8px;
        border: 0px solid #ccc;
        background: #e6ebf5;

        .img_parent {
          border-radius: 8px;

          img {
            border-radius: 8px;
          }
        }

        .ql-editor {
          padding: 0px 15px;
          padding-top: 10px;
        }
      }

      //滚动条样式
      ::-webkit-scrollbar {
        width: 0px;
      }
    }

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

    .text {
      width: 100%;
      height: 100%;
    }

    .contentInfo-left {
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
      height: 92%;
      overflow-y: auto;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        width: 0px;
      }

      .info-item {
        display: flex;
        height: 50px;
        line-height: 50px;
        margin-left: 20px;
        margin-bottom: 40px;

        .info-bg {
          width: 4px;
          background: rgba(22, 230, 154, 1);
        }

        .info-text {
          padding: 0 14px;
          text-align: center;
          background: rgba(22, 230, 154, .3);
          color: #fff;
          font-weight: bold;
          font-size: 20px;
          text-shadow: 1px 1px black;
          user-select: none;

          &:hover {
            opacity: .5;
          }
        }
      }
    }

    .scennery {
      position: absolute;
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
        color: rgba(95,113,90, .3);

        &:hover {
          color: rgba(255,255,255, 1);
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
  }
</style>
