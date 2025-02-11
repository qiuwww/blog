<style lang="less">
	.tBasicPolylineManagement{
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
      width: 196px;
    }
    .mapcontainer {
      position: relative;
      height: 400px;
      overflow: hidden;
      width: 100%;
      float: left;
      background-color: white;
      border-radius: 0px 8px 8px 0px;
    }
	}
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="false" width="1000px" class="tBasicPolylineManagement">
		<Form ref="tBasicPolylineManagementForm" :model="tBasicPolylineManagementForm" :label-width="110" style="margin-right: 50px;">
			<Row>
        <Col span="8">
          <FormItem label="菜单名称">
            {{tBasicPolylineManagementForm.menuName}}
          </FormItem>
        </Col>
				<Col span="8">
					<FormItem label="线状名称">
						{{tBasicPolylineManagementForm.name}}
					</FormItem>
				</Col>
        <Col span="8">
          <FormItem label="所属区域">
            {{tBasicPolylineManagementForm.areaType}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="是否显示线">
            <div v-text="tBasicPolylineManagementForm.isDisplayState?'显示':'隐藏'"></div>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="线状位置">
            <div v-text="tBasicPolylineManagementForm.position !=''?'已标注':'未标注'"></div>
          </FormItem>
        </Col>
      </Row>
      <!--<Row>
        <Col span="8">
          <FormItem label="线宽度">
            {{tBasicPolylineManagementForm.width}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="线颜色">
            <ColorPicker v-model="tBasicPolylineManagementForm.color" disabled :recommend="true" format="hex"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="线状位置">
            <div v-text="tBasicPolylineManagementForm.position !=''?'已标注':'未标注'"></div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="是否显示">
            <div v-text="tBasicPolylineManagementForm.isDisplayState?'显示':'隐藏'"></div>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="是否为虚线">
            <div v-text="tBasicPolylineManagementForm.isDash?'是':'否'"></div>
          </FormItem>
        </Col>
        <Col span="8" v-if="tBasicPolylineManagementForm.isDash">
          <FormItem label="虚线间隙长度">
            {{tBasicPolylineManagementForm.length}}
          </FormItem>
        </Col>
			</Row>-->
      <Row>
        <Col span="24" v-show="tBasicPolylineManagementForm.isDisplayState&&tBasicPolylineManagementForm.position.length>0">
          <FormItem label="线状展示">
            <div id="centerDiv" class="mapcontainer">
              <Map :url="configUrl" :widgetUrl="widgetUrl" class="mapclass" map-key="lookTBasicPolylineManagement" @onload="onMapload"/>
            </div>
          </FormItem>
        </Col>
      </Row>
			<Row>
				<Col span="24">
          <FormItem label="详情内容">
            <div class="ql-container ql-snow" style="user-select: none;">
              <div class="ql-editor" v-html="tBasicPolylineManagementForm.description"></div>
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
  import Map from '@/components/mars-map/Main.vue';
	import {getTBasicPolylineManagement} from '@/api/zhxc/tBasicPolylineManagement/tBasicPolylineManagement'
  import myModal from "@/views/zhxc/components/myModal";
	export default {
		name: "lookTBasicPolylineManagement",
    components: {
      myModal,
      Map
    },
		props: {
			value: {
				type: Boolean,
				default: false
			},
			TBasicPolylineManagementId: {
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
        configUrl: "config/simpleConfig.json",
        widgetUrl: 'config/widget.json',
        viewer: null,
        lineData:[],
				tBasicPolylineManagementForm: {
					name:'',
					position:'',
					description:'',
					isDash:0,
					width:null,
					color:'',
					menuName:'',
          isDisplayState:0,
          areaType:'',
          length:null,
          isShow:0,
				},
			}
		},
		methods: {
      //地图构造完成回调
      onMapload(viewer) {
        this.viewer = viewer;

      },
      initScenicSpotAndBasicInfomation(val) {
        var _this = this;
        /*var path = "";
        if (val) {
          path = val.path.substring(1, val.path.length);
        } else {
          path = this.$route.path.substring(1, this.$route.path.length);
        }*/

        // var lineData = this.lineData;
         _this.addPolyline(_this.viewer, val);
      },
      addPolyline(viewer, data) {
        var _this = this;
        if (data != null) {
          //构造线GeoJson
          var lineGeoJson = {
            "type": "FeatureCollection",
            "name": "xzq",
            "crs": {
              "type": "name",
              "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
              }
            },
            "features": []
          }

          };

          //获取点坐标
            var position = JSON.parse(data.position);
            if (position != null && position.length > 0) {
              var arr = [];
              for (var j = 0; j < position.length; j = j + 2) {
                var point = [position[j], position[j + 1]];
                arr.push(point);
              }

              //贴地
              data.style = {
                "clampToGround": true
              };
              //构造feature
              var feature = {
                "type": "Feature",
                "properties": data,
                "geometry": {
                  "type": "LineString",
                  "coordinates": []
                }
              };
              feature.geometry.coordinates = arr;
              lineGeoJson.features.push(feature);
          }

          //加载json
          Cesium.GeoJsonDataSource.load(lineGeoJson, { clampToGround: true }).then(function (dataSource) {
            //获取线实体
            var entities = dataSource.entities.values[0];
            //为线添加样式
              var entity = entities;
              if (entity ) {
                //求中心点
                var positions = mars3d.draw.attr.polyline.getPositions(entity);
                //视角飞行定位到entiy处
                let centerPoint = mars3d.point.centerOfMass(positions,1000);
                _this.viewer.camera.flyTo({destination:centerPoint});

                //是否显示
                var isShow = entity.properties.isShow._value;
                if (isShow != null && isShow != "" && isShow == "1") {
                  //经度纬度
                  var cartesian3 = entity.polyline.positions._value;
                  //循环坐标点
                  var positions = [];
                  for (var j = 0; j < cartesian3.length; j++) {
                    var ellipsoid = viewer.scene.globe.ellipsoid;
                    var cartographic = ellipsoid.cartesianToCartographic(cartesian3[j]);
                    //经度
                    var lng = Cesium.Math.toDegrees(cartographic.longitude);
                    //纬度
                    var lat = Cesium.Math.toDegrees(cartographic.latitude);
                    positions.push(lng);
                    positions.push(lat);
                    positions.push(0);
                  }

                  var width, color, length;
                  //是否虚线

                  var isDash = entity.properties.isDash._value;
                  if ( isDash == '0') {
                    //实线
                     width = entity.properties.width._value;//线宽
                    if (width == null || width == "") {
                      width = 20;
                    }

                    //线条样式
                     color = entity.properties.color._value;
                    if (color == null || color == "") {
                      color = "#fff";
                    }

                    //间隙长度
                    length = 0;
                    _this.viewer.entities.add({
                      polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                        width: width,
                        material: new Cesium.PolylineGlowMaterialProperty({
                          color: new Cesium.Color.fromCssColorString(color),
                          //设置Glow材质
                          glowPower: 0.06,
                        })
                      }
                    });
                  } else if(isDash == '1'){
                        //虚线

                           width = entity.properties.width._value;//线宽
                          if (width == null || width == "") {
                            width = 2;
                          }

                          //线条样式
                           color = entity.properties.color._value;
                          if (color == null || color == "") {
                            color = "#fff";
                          }

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

          })
      },
			closeModal(val) {
				this.$emit('input', val);
			},
			initForm(){
				this.tBasicPolylineManagementForm= {
					name:'',
					position:'',
					description:'',
					isDash:0,
					width:null,
					color:'',
          menuName:'',
          isDisplayState:0,
          areaType:'',
          length:null,
          isShow:0,
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
					if(this.TBasicPolylineManagementId!=null&&this.TBasicPolylineManagementId.trim().length>0){
						getTBasicPolylineManagement({id: this.TBasicPolylineManagementId}).then(res => {
							if (res && res.code == 200) {
								this.tBasicPolylineManagementForm.name = res.data.name;
								/*if(res.data.position){
									this.tBasicPolylineManagementForm.position = "已标注"
								}else{
									this.tBasicPolylineManagementForm.position = "未标注"
								}*/
                this.tBasicPolylineManagementForm.position = res.data.position;
								this.tBasicPolylineManagementForm.description = res.data.description;
								this.tBasicPolylineManagementForm.isDash = res.data.isDash;
								this.tBasicPolylineManagementForm.width = res.data.width;
								this.tBasicPolylineManagementForm.color = res.data.color;
								this.tBasicPolylineManagementForm.menuName = res.data.menuName;
                this.tBasicPolylineManagementForm.isDisplayState = res.data.isShow;
                if(res.data.areaType=="0"){
                    this.tBasicPolylineManagementForm.areaType  ="首页"
                }else{
                  this.tBasicPolylineManagementForm.areaType = res.data.areaTypeName;
                }
                this.tBasicPolylineManagementForm.length = res.data.length;
                this.tBasicPolylineManagementForm.isShow = res.data.isShow;
                if (res.data.position.length>0){
                  this.initScenicSpotAndBasicInfomation(this.tBasicPolylineManagementForm);
                }

							} else {
								this.$Message.error(res.msg);
							}
						});
					}
				} else {
				  if (this.viewer != null){
            this.viewer.dataSources.removeAll();
            this.viewer.entities.removeAll();
          }
					this.closeModal(val);
				}
			}
		}
	}
</script>
