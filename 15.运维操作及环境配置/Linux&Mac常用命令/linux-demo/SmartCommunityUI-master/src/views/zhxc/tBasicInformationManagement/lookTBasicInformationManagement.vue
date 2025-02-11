<style lang="less">
	.tBasicInformationManagement{
		.imgStyle{
			width: 80px;
			height: 80px;
			vertical-align:top;
		}
    .ivu-modal-body{
      height: 500px !important;
      overflow-y: auto;
    }
    .ivu-color-picker-rel{
      width: 190.4px;
    }
    .areaMap{
      height: 400px;
    }
    div[class^='initLabel'] {
      position: relative;
      height: 30px;
      line-height: 20px;
      padding: 4px 14px;
      color: #fff;
      border-radius: 16px;
      border: 1px solid #fff;
      background: #00a0e9;
      z-index: 2;
      left: -50%;
      top: -20px;
      user-select: none;
    }

    div[class^='initLabel']:before {
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

    div[class^='initLabel']:after {
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

  }
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="false" width="1000px" class="tBasicInformationManagement">
		<Form ref="tBasicInformationManagementForm" :model="tBasicInformationManagementForm" :label-width="110" style="margin-right: 50px;">
			<Row>
        <Col span="8">
          <FormItem label="菜单名称">
            {{tBasicInformationManagementForm.menuName}}
          </FormItem>
        </Col>
				<Col span="8">
					<FormItem label="区域名称">
						{{tBasicInformationManagementForm.name}}
					</FormItem>
				</Col>
        <Col span="8">
          <FormItem label="所属区域">
            {{tBasicInformationManagementForm.areaType}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="是否显示区域">
            <div v-text="tBasicInformationManagementForm.isDisplayState?'显示':'隐藏'"></div>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="区域位置">
            <div v-text="tBasicInformationManagementForm.position?'已标注':'未标注'"></div>
          </FormItem>
        </Col>
      </Row>
      <!--<Row>
        <Col span="8">
          <FormItem label="区域颜色">
            <ColorPicker v-model="tBasicInformationManagementForm.polygonColor" disabled :recommend="true" format="hex"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="区域透明度">
            {{tBasicInformationManagementForm.alpha}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="区域">
            <div v-text="tBasicInformationManagementForm.position?'已标注':'未标注'"></div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="是否显示">
            <div v-text="tBasicInformationManagementForm.isDisplayState?'显示':'隐藏'"></div>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="有无边框">
            <div v-text="tBasicInformationManagementForm.isBorder?'有':'无'"></div>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="有无立体效果">
            <div v-text="tBasicInformationManagementForm.isStereoscopic?'有':'无'"></div>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="是否为虚线">
            <div v-text="tBasicInformationManagementForm.isDashLien?'是':'否'"></div>
          </FormItem>
        </Col>
        <Col span="8" v-if="tBasicInformationManagementForm.isDashLien">
          <FormItem label="虚线宽度">
            {{tBasicInformationManagementForm.width}}
          </FormItem>
        </Col>
        <Col span="8" v-if="tBasicInformationManagementForm.isDashLien">
          <FormItem label="虚线间隙长度">
            {{tBasicInformationManagementForm.dashLength}}
          </FormItem>
        </Col>
        <Col span="8" v-if="tBasicInformationManagementForm.isStereoscopic">
          <FormItem label="区域高度">
            {{tBasicInformationManagementForm.surfaceHeight}}
          </FormItem>
        </Col>
        <Col span="8" v-if="tBasicInformationManagementForm.isBorder">
          <FormItem label="线颜色" >
            <ColorPicker v-model="tBasicInformationManagementForm.color" disabled :recommend="true" format="hex"/>
          </FormItem>
        </Col>
			</Row>-->
      <Row>
        <Col span="24" v-show="tBasicInformationManagementForm.isDisplayState&&this.tBasicInformationManagementForm.position.length>0">
          <FormItem label="区域展示" prop="areaShow">
<!--            <div :id="areaShow" :style="{height: '100px', width: '100%',position:'relative'}"></div>-->
            <Map :url="configUrl" :widgetUrl="widgetUrl" @onload="onMapLoad" map-key="tBasicInformationManagementForm" class="areaMap"/>
          </FormItem>
        </Col>
      </Row>
			<Row>
				<Col span="24">
          <FormItem label="详情内容">
            <div class="ql-container ql-snow" style="user-select: none;">
              <div class="ql-editor" v-html="tBasicInformationManagementForm.description"></div>
            </div>
					</FormItem>
        </Col>
			</Row>
		</Form>
		<div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
		</div>
	</Modal>
</template>
<script>
	import {getTBasicInformationManagement} from '@/api/zhxc/tBasicInformationManagement/tBasicInformationManagement'
  import Map from '../../../components/mars-map/Main.vue';
	export default {
		name: "lookTBasicInformationManagement",
    components:{
      Map
    },
		props: {
			value: {
				type: Boolean,
				default: false
			},
			TBasicInformationManagementId: {
				type: String
			},
			modalTitle: {
				type: String
			}
		},
		data() {
			return {
				show: this.value,
				editTitle: this.modalTitle,
				tBasicInformationManagementForm: {
					name:'',
					position:[],
					description:'',
					isDashLien:0,
					width:null,
					color:'',
					dashLength:null,
					polygonColor:'',
					alpha:null,
          surfaceHeight:null,
					menuName:'',
          isStereoscopic:0,//有无立体效果
          isDisplayState:0,
          areaType:'',
          isBorder:0,
				},
        areaTypeArr:[],
        configUrl: 'config/simpleConfig.json',
        widgetUrl: 'config/widget.json',
        viewer:null,
        bgColor:[],
        divPoint:null,
			}
		},
		methods: {
      //转化颜色
      getHexColor(color) {
        var values = color
          .replace(/rgba?\(/, '')
          .replace(/\)/, '')
          .replace(/[\s+]/g, '')
          .split(',');
        var a = parseFloat(values[3] || 1),
          r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
          g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
          b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
        return '#' +
          ('0' + r.toString(16)).slice(-2) +
          ('0' + g.toString(16)).slice(-2) +
          ('0' + b.toString(16)).slice(-2)
      },
      //初始化GeoJson
      initGeoJson() {
        let iconGeoJson = {
          "type": "FeatureCollection",

          "features": []
        };
        return iconGeoJson;
      },
      //初始化feature
      initFeature(type, obj, position) {
        let feature = {
          "type": "Feature",
          "properties": obj,
          "geometry": {
            "type": type,
            "coordinates": position ? position : [],
          }
        };
        return feature;
      },
      //面添加虚线
      addPolyLienForPolygon(entity) {
        let _this = this;
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
        for (let j = 0; j < cartesian3.length; j++) {
          let cartographic = ellipsoid.cartesianToCartographic(cartesian3[j]);
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
          },
        });
      },
      //面添加文字
      addLabel(entity){
        var _this = this;

        //面高度
        var height = entity.polygon.extrudedHeight;

        //求中心点
        var positions = mars3d.draw.attr.polygon.getPositions(entity);
        var ptcenter = mars3d.point.centerOfMass(positions, height);

        //视角飞行定位到entiy处
        let centerPoint = mars3d.point.centerOfMass(positions,height+1000);
        _this.viewer.camera.flyTo({destination:centerPoint});

        var text = entity.properties.name._value || '';

        //面高度
        if (height == "0") {
          //无高度
          //添加标签
          entity.position = ptcenter;
          entity.label = {
            text: text,
            font: 'normal small-caps normal 17px 楷体',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            fillColor: Cesium.Color.AZURE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, 0),   //偏移量  
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1200)
          };

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
          //鼠标经过事件
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
              });

              if (newEntity != null && newEntity.length > 0) {
                oDivLabel.parentNode.style.background = newEntity[0].color;
                oDivLabel.parentNode.nextElementSibling.children[0].style.background = newEntity[0].color;
              }
            }
          };
        } else {
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

          _this.divPoint = new mars3d.DivPoint(_this.viewer, {
            html: "<div class='initLabel" + "' style='background:" + bg + ";' id='" + entity.id + "'>" + text + "</div>",
            position: ptcenter,
            anchor: [0, 0],
            click: function (e) {//单击后的回调
              var desc = entity.properties.description._value;
              if (_this.show) return;
              if (desc) {
                _this.show = true;
                _this.htmlStr = desc;
                _this.title = entity.properties.name._value;
              }
            }
          });
        }
      },
      //面
      addPolygon(data){
        let _this = this;
        if (data != null) {
          //构造GeoJson
          var polyGonGeoJson = _this.initGeoJson();

          if (data.position.length > 0){
            // var position = JSON.parse(data.position);
            var arr = [];
            for (let j = 0; j < data.position.length; j = j + 2) {
              let jingdu = data.position[j];
              let weidu = data.position[j + 1];
              if (jingdu && weidu){
                arr.push([jingdu, weidu]);
              }
            }
            //构造feature
            let feature = _this.initFeature("Polygon", data);
            if (arr){
              feature.geometry.coordinates[0] = arr;
              polyGonGeoJson.features.push(feature);
            }
          }
          //加载json数据
          Cesium.GeoJsonDataSource.load(polyGonGeoJson, {
            clampToGround: true
          }).then(function (dataSource) {
            _this.viewer.dataSources.add(dataSource);

            var entity = dataSource.entities.values[0];
            let isDisplayState = entity.properties.isDisplayState._value;
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
                }else{
                  entity.polygon.extrudedHeight = 0;
                }
              }else {
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
                  // outlineWidth
                }
              }else {
                entity.polygon.outline = true;
                entity.polygon.outlineColor = new Cesium.Color.fromCssColorString("rgba(255,255,0,1)").withAlpha(0.5);
              }
            }

              //面背景色
              var polygonColor = entity.properties.polygonColor._value;
              if (polygonColor == null || polygonColor == "") {
                polygonColor = "#3B554C";//默认
              }

              //面透明度
              var alpha = entity.properties.alpha._value;
              if (alpha == null || alpha == "" || alpha == "0") {
                alpha = 0.8;
              }

              //线颜色
              var color = new Cesium.Color.fromCssColorString(polygonColor).withAlpha(alpha);
              entity._colordata = color;
              entity.polygon.material = color;

              //添加文字
              _this.addLabel(entity);

              //文字添加成功后，设置倒三角形的背景色
            if (document.querySelector(".initLabel")){
              var labelColor = document.querySelector(".initLabel").style.background;
              var color16 = _this.getHexColor(labelColor);
              document.styleSheets[0].addRule('.initLabel' + ':before', 'border-bottom:8px solid ' + color16 + ' !important;');
            }
          }).otherwise(function (error) {
            haoutil.alert(error, "加载数据出错");
          });
        }
      },
      //地图构造完成回调
      onMapLoad(viewer) {
        this.viewer = viewer;
        // this.viewer.mars.location.show = false;
      },
			closeModal(val) {
				this.$emit('input', val);
			},
			initForm(){
				this.tBasicInformationManagementForm= {
					name:'',
					position:[],
					description:'',
					isDashLien:0,
					width:null,
					color:'',
					dashLength:null,
					polygonColor:'',
					alpha:null,
          surfaceHeight:null,
          menuName:'',
          isStereoscopic:0,
          isDisplayState:0,
          areaType:'',
          isBorder:0,
				};
			}
		},
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
				this.initForm();
				this.editTitle = this.modalTitle;
				if(val) {
					if(this.TBasicInformationManagementId!=null&&this.TBasicInformationManagementId.trim().length>0){
						getTBasicInformationManagement({id: this.TBasicInformationManagementId}).then(res => {
							if (res && res.code == 200) {
								this.tBasicInformationManagementForm.name = res.data.name;
								if (res.data.position.length>0){
                  this.tBasicInformationManagementForm.position = JSON.parse(res.data.position);
                }else{
								  this.tBasicInformationManagementForm.position = res.data.position;
                }
								this.tBasicInformationManagementForm.description = res.data.description;
								this.tBasicInformationManagementForm.isDashLien = res.data.isDashLien;
								this.tBasicInformationManagementForm.width = res.data.width;
								this.tBasicInformationManagementForm.color = res.data.color;
								this.tBasicInformationManagementForm.dashLength = res.data.dashLength;
								this.tBasicInformationManagementForm.polygonColor = res.data.polygonColor;
								this.tBasicInformationManagementForm.alpha = res.data.alpha;
								this.tBasicInformationManagementForm.surfaceHeight = res.data.surfaceHeight;
								this.tBasicInformationManagementForm.menuName = res.data.menuName;
								this.tBasicInformationManagementForm.isStereoscopic = res.data.isStereoscopic;
                this.tBasicInformationManagementForm.isDisplayState = res.data.isDisplayState;
                if(res.data.areaType=="0"){
                  this.tBasicInformationManagementForm.areaType ="首页"
                }else{
                  this.tBasicInformationManagementForm.areaType = res.data.areaTypeName;
                }

                this.tBasicInformationManagementForm.isBorder = res.data.isBorder;


                if (res.data.position.length>0){
                  this.addPolygon(this.tBasicInformationManagementForm);
                }
              } else {
								this.$Message.error(res.msg);
							}
						});
					}
				} else {
				  if(this.viewer != null){
            this.viewer.dataSources.removeAll();
            this.viewer.entities.removeAll();
          }
				  if (this.divPoint != null){
            this.divPoint.destroy();
            this.divPoint = null;
          }
					this.closeModal(val);
				}
			}
		}
	}
</script>
