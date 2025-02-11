<template>
  <Modal v-model="show" title="预览页面" :mask-closable="false" width="800px" class="preview">
    <Map :url="configUrl" :widgetUrl="widgetUrl" @onload="onMapLoad" :map-key="mapKey" class="areaMap"/>
  </Modal>
</template>

<script>
  import Map from '../../../components/mars-map/Main.vue';

  export default {
    name: "preview",
    components: {
      Map
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      geometryType: {
        type: String,
        default: ""
      },
      feature: {
        type: Object,
        default: null
      },
      mapKey: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        show: this.value,
        areaTypeArr: [],
        configUrl: '/config/simpleConfig.json',
        widgetUrl: '/config/widget.json',
        viewer: null,
        bgColor: [],
        divPoint: null,
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
      }
    },
    methods: {
      //地图构造完成回调
      onMapLoad(viewer) {
        this.viewer = viewer;
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      //初始化要预览的要素
      initFeatures() {
        if (this.geometryType && this.feature) {
          //构造GeoJson
          let iconGeoJson = this.initGeoJson();
          if(iconGeoJson){
            switch (this.geometryType) {
              case "polygon": {
                let position =JSON.parse(this.feature.position) ;
                if (position) {
                  let arr = [];
                  for (let j = 0; j < position.length; j = j + 2) {
                    let jingdu = position[j];
                    let weidu = position[j + 1];
                    if (jingdu && weidu) {
                      arr.push([jingdu, weidu]);
                    }
                  }
                  //构造feature
                  let feature = this.initFeature("Polygon", this.feature);
                  if (arr) {
                    feature.geometry.coordinates[0] = arr;
                    iconGeoJson.features.push(feature);
                  }
                }
                break;
              }
              case "lineString": {
                let position = JSON.parse(this.feature.position);
                if (position && position.length > 0) {
                  let arr = [];
                  for (let j = 0; j < position.length; j = j + 2) {
                    let point = [position[j], position[j + 1]];
                    arr.push(point);
                  }
                  //构造feature
                  let feature = this.initFeature("LineString", this.feature);
                  feature.geometry.coordinates = arr;
                  iconGeoJson.features.push(feature);
                }
                break;
              }
              case "point": {
                let p = this.feature.position;
                if (p != null && p != "") {
                  //构造feature
                  let feature = this.initFeature("Point", this.feature, JSON.parse(p));
                  iconGeoJson.features.push(feature);
                }
                break;
              }
            }
            if (iconGeoJson.features.length > 0) {
              this.initLayer(iconGeoJson, {id:"feature",path:"/path"});
            }
          }

        }
      },
      //初始化GeoJson
      initGeoJson() {
        let iconGeoJson = {
          "type": "FeatureCollection",
          "features": []
        }
        return iconGeoJson;
      },
      //初始化feature
      initFeature(type, obj, position) {
        let feature = {
          "type": "Feature",
          "properties": obj,
          "geometry": {
            "type": type,
            "coordinates": position ? position : []
          }
        };
        return feature;
      },
      //初始化图层
      initLayer(json, v) {
        let _this = this;
        if (json) {
          //加载json数据
          Cesium.GeoJsonDataSource.load(json, {
            clampToGround: true
          }).then(function (dataSource) {
            let newDataSource = new Cesium.CustomDataSource(v.path);
            //设置样式
            let entities = dataSource.entities.values;

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
              let labelColor = document.querySelector(".initLabel" + i).style.background;

              if (labelColor) {
                let colorArr = labelColor.replace(/rgba\(/, '').replace(/\)/, '').replace(/\s+/g, '').split(',');
                let rgba = "rgba(" + colorArr[0] + "," + colorArr[1] + "," + colorArr[2] + "," + 0.8 + ")";
                document.styleSheets[0].addRule('.initLabel' + i + '::before', 'border-bottom:8px solid ' + rgba + ' !important;');
              }
            }
            //添加到地图
            _this.viewer.dataSources.add(newDataSource);
            _this.viewer.flyTo(newDataSource, {
              offset : {
                heading: 281.9,
                pitch: -20.6,
                range: 5000
              }
            });
          }).otherwise(function (error) {
            haoutil.alert(error, "加载数据出错");
          });
        }
      },
      //添加面并设置样式
      addPolygonWithStyle(newDataSource, entity, v) {
        let _this = this;
        if (newDataSource && entity) {
          //去除边线
          entity.polygon.outline = false;
          //是否显示
          let isDisplayState = entity.properties.isDisplayState._value;
          if (isDisplayState != "1") {
            entity.show = false;
          } else {
            //是否立体
            let isStereoscopic = entity.properties.isStereoscopic._value;
            if (isStereoscopic == "1") {
              //立体
              let height = parseFloat(entity.properties.surfaceHeight._value);
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
            let isBorder = entity.properties.isBorder._value;

            if (isBorder == "1") {
              //有边框,有颜色
              let color = entity.properties.color._value;
              //是否虚线
              let dashLine = entity.properties.isDashLien._value;

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
            let polygonColor = entity.properties.polygonColor._value;
            if (polygonColor == null || polygonColor == "") {
              polygonColor = "#3B554C";//默认
            }

            //面透明度
            let alpha = entity.properties.alpha._value;
            if (alpha == null || alpha == "" || alpha == "0") {
              alpha = 0.4;
            }
            //面背景色
            let color = new Cesium.Color.fromCssColorString(polygonColor).withAlpha(alpha);
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
        let _this = this;
        if (newDataSource && entity && entity.polyline) {
          //是否显示
          let isShow = entity.properties.isShow._value;
          if (isShow == "1") {
            //经度纬度
            let cartesian3 = entity.polyline.positions._value;
            //循环坐标点
            let positions = [];
            let pt = [];
            for (let j = 0; j < cartesian3.length; j++) {
              let cartographic = _this.initEllipsoid(cartesian3[j]);
              //经度
              let lng = Cesium.Math.toDegrees(cartographic.longitude);
              //纬度
              let lat = Cesium.Math.toDegrees(cartographic.latitude);

              //是否显示label
              let isLabel = entity.properties.isLabel._value;
              if (isLabel == "1") {
                //最小视距
                let min = entity.properties.min._value;
                if (min == null || min == "") min = 0;
                //最大视距
                let max = entity.properties.max._value;
                if (max == null || max == "") max = 1000;

                //公路添加文字
                if (Math.ceil(cartesian3.length / 2) == j) {
                  let text = entity.properties.name._value || '';
                  let word = newDataSource.entities.add({
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
            let width, color, length, glow;
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
            let isTrend = entity.properties.isTrend._value;
            //动态
            if (isTrend == "1") {
              let trendLine = newDataSource.entities.add({
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
            let isDash = entity.properties.isDash._value;
            if (isDash != 1) {//实线
              //光晕
              let isGlow = entity.properties.isGlow._value;
              if (isGlow == "1") {
                glow = parseFloat(entity.properties.glow._value);
                if (glow == 'NaN') {
                  glow = 0.2;
                }
                let ent = newDataSource.entities.add({
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
                let ent = newDataSource.entities.add({
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
              let ent = newDataSource.entities.add({
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
        let _this = this;
        obj.click =function(){
         //_this.$refs.myModal.cancelModal();
          let desc = entity.properties.description._value;
          if (desc != null && desc != '') {
            //_this.$refs.myModal.openModal(desc, entity.properties.name._value);
          }
        }
      },
      //添加点并设置样式
      addPointWithStyle(newDataSource, entity, v) {
        let _this = this;
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
            let height = entity.properties.height._value;
            if (height != null && height != "") {
              //有高度
              height = parseInt(height);
              let position = entity.position._value;

              let cartographic = _this.initEllipsoid(position);

              //经度
              let lng = Cesium.Math.toDegrees(cartographic.longitude);
              //纬度
              let lat = Cesium.Math.toDegrees(cartographic.latitude);
              //
              entity.position = Cesium.Cartesian3.fromDegrees(lng, lat, height);

              //悬浮垫设置垂直虚线
              _this.setLine(newDataSource, lng, lat, height, v.id);
            }

            //点击弹框
            entity.click = function (e) {
              //是否全景
              let isSCennery = e.properties.isScenery._value;
              let url = e.properties.url._value
              if (isSCennery == "1" && url) {
                _this.show360 = true;
                _this.url360 = url;
              } else {
                //
               //_this.$refs.myModal.cancelModal();
                let desc = e.properties.describes._value;
                if (desc != null && desc != '') {
                  //_this.$refs.myModal.openModal(desc, e.properties.name._value);
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
        let upOrDown = [10, -60];
        //标签是否显示
        if (entity.properties.titleShow._value == "1") {
          //最小视距
          let min = entity.properties.min._value;
          if (min == null || min == "") min = 0;
          //最大视距
          let max = entity.properties.max._value;
          if (max == null || max == "") max = 2000;
          //名称
          let name = entity.properties.name._value || '';
          //背景色
          let bgColor = entity.properties.backgroundColor._value || '#fff';
          //位置 上或下
          let namePosition = entity.properties.namePosition._value || 0;

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
        let _this = this;
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
            //_this.$refs.myModal.openModal(desc, e.properties.name._value);
          }
        }

        let height = entity.polygon.extrudedHeight;
        //是否显示文字
        let isLabel = entity.properties.isLabel._value;
        //最小视距
        var min = entity.properties.min._value;
        //最大视距
        var max = entity.properties.max._value;
        if (min == null || min == "") min = 0;
        if (max == null || max == "") max = 4000;
        //求中心点
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
          let color = entity.polygon.material.color;

          //为tooltip设置背景
          let rgbaColor = color._value;
          let red = Math.floor(rgbaColor.red * 255);
          let green = Math.floor(rgbaColor.green * 255);
          let blue = Math.floor(rgbaColor.blue * 255);
          let alpha = 0.6;
          let bg = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";

          let distanceCondition;
          let flag = false;

          let divPoint = new mars3d.DivPoint(_this.viewer, {
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
              let oDivLabel = document.querySelector("#" + eleId);
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
          let _this = this;
          //高度
          let height = entity.polygon.extrudedHeight;
          if (height == undefined || height == null || height == '') {
            height = 0;
          } else {
            height = height._value;
          }
          //经度纬度
          let cartesian3 = entity.polygon.hierarchy._value.positions;
          //循环坐标点
          let positions = [];
          for (let j = 0; j < cartesian3.length; j++) {
            let cartographic = _this.initEllipsoid(cartesian3[j]);
            //纬度
            let lat = Cesium.Math.toDegrees(cartographic.latitude);
            //经度
            let lng = Cesium.Math.toDegrees(cartographic.longitude);
            //高度
            let alt = cartographic.height;

            positions.push(lng);
            positions.push(lat);
            positions.push(alt);
          }
          //线宽
          let width = entity.properties.width._value;
          if (width == null || width == "") width = 1;
          //颜色
          let color = entity.properties.color._value;
          if (color == null || color == "") color = "#fff";
          //间隙长度
          let dashLength = entity.properties.dashLength._value;
          if (dashLength == null || dashLength == "") dashLength = 20;

          //实线
          if (type == "0") {
            //光晕
            let isGlow = entity.properties.isGlow._value;
            if (isGlow == "1") {
              let glow = parseFloat(entity.properties.glow._value);
              if (glow == 'NaN') {
                glow = 0.2;
              }

              let ent = newDataSource.entities.add({
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
              let ent = newDataSource.entities.add({
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
            let ent = newDataSource.entities.add({
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
            let ent = newDataSource.entities.add({
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
        let positions = [lng, lat, height, lng, lat, 0];
        let redLine = newDataSource.entities.add({
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
        let values = color
          .replace(/rgba?\(/, '')
          .replace(/\)/, '')
          .replace(/[\s+]/g, '')
          .split(',')
        let a = parseFloat(values[3] || 1),
          r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
          g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
          b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
        return '#' +
          ('0' + r.toString(16)).slice(-2) +
          ('0' + g.toString(16)).slice(-2) +
          ('0' + b.toString(16)).slice(-2)

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
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.show = val;
        if (val) {
          if( this.viewer){
            this.viewer.dataSources.removeAll();
          }

          if (this.feature && this.geometryType && this.geometryType.trim().length > 0) {
            if(this.feature.position==undefined ||this.feature.position==null || this.feature.position.length<2 ){
              this.$Message.error("参数错误请联系管理员！！！");
              this.closeModal(false);
              return
            }
            this.initFeatures();
          } else {
            this.$Message.error("参数错误请联系管理员！！！");
            this.closeModal(false);
          }
        }
        else {
          this.closeModal(val);
        }
      }
    }
  }
</script>

<style lang="less">
  .preview {
    .areaMap {
      height: 600px;

      .cesium-viewer-toolbar {
        display: none;
      }

      .compass-outer-ring-background {
        display: none;
      }
    }
  }
</style>
