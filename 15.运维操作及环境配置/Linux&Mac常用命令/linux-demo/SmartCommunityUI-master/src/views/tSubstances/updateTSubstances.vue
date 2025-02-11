<style lang="less">
  .tSubstances {
    .ivu-modal {
      width: 580px !important;
      top: 50%;
      transform: translateY(-50%);
    }

    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 80px;
    }

    .ivu-select {
      width: 180px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }

    .ivu-form-item-content .address_class input, .ivu-form-item-content .address_class textarea {
      width: 458px;
    }

    .mapContainer {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
    }

    .closeBtn {
      position: absolute;
      top: -12px;
      right: -10px;
      font-size: 20px;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background-color: #303833;
    }

    .closeBtn:active {
      background-color: #7f8a83;
    }

  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tSubstances">
    <Form ref="tSubstancesForm" :model="tSubstancesForm" :rules="tSubstancesFormRule">
      <Row>
        <Col span="12">
          <FormItem label="物质名称" prop="name">
            <Input type="text" :maxlength=50 v-model="tSubstancesForm.name" placeholder="请输入物质名称"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="规格型号" prop="specificationModel">
            <Input type="text" :maxlength=50 v-model="tSubstancesForm.specificationModel" placeholder="请输入规格型号"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="标准" prop="standard">
            <Input type="text" :maxlength=50 v-model="tSubstancesForm.standard" placeholder="请输入标准"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="所属单位" prop="affiliatedUnit">
            <Input type="text" :maxlength=50 v-model="tSubstancesForm.affiliatedUnit" placeholder="请输入所属单位"/>
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="12">
          <FormItem label="数量">
            <Input type="number" :maxlength=50 v-model="tSubstancesForm.numbers" placeholder="请输入数量"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="单位" prop="unit">
            <Input type="text" :maxlength=50 v-model="tSubstancesForm.unit" placeholder="请输入单位"/>
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="12">
          <FormItem label="存放位置" prop="parkingPosition">
            <Input type="text" :maxlength=50 v-model="tSubstancesForm.parkingPosition" placeholder="请输入存放位置"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="地图位置" prop="mapLocation">
            <Input type="text" :maxlength=50 v-model="tSubstancesForm.mapLocation" placeholder="请输入地图位置"
                   icon="ios-map-outline" @on-click="chooseMap" style="width: 184px!important;"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="备注" prop="remark">
            <Input :rows="2" type="textarea" v-model="tSubstancesForm.remark" placeholder="请输入备注"
                   class="address_class"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>

    <div id="centerDiv" class="mapContainer" :style="{width:width,height:height}" v-show="mapShow">
      <Map :url="configUrl" :widgetUrl="widgetUrl" @onload="mapLoad"/>
      <span class="closeBtn" @click="closeMap">×</span>
    </div>
  </Modal>
</template>
<script>
  import {addTSubstances, updateTSubstances, getTSubstances} from '@/api/tSubstances/tSubstances'
  import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool';
  import Map from "../../components/mars-map/Main.vue";

  export default {
    name: "updateTSubstances",
    components: {
      Map
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TSubstancesId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        show: this.value,//是否显示
        editTitle: this.modalTitle,//标题
        loading: true,
        tSubstancesForm: {
          name: '',
          specificationModel: '',
          standard: '',
          numbers: '',
          unit: '',
          affiliatedUnit: '',
          parkingPosition: '',
          mapLocation: '',
          remark: '',
        },
        tSubstancesFormRule: this.getTSubstancesFormRule(),
        mapShow: false,
        width: "",
        height: "",
        configUrl: "../config/config.json",
        widgetUrl: "../config/widgetRiskSources.json",
        handler: null,//地图点击事件
        viewer: null,//地图容器
        pointArr: []
      }
    },
    methods: {
      //提交数据
      handelSubmit() {
        this.loading = true;
        var that = this;
        this.$refs['tSubstancesForm'].validate((valid) => {

          if (valid) {
            this.tSubstancesForm.number = this.tSubstancesForm.numbers;
            if (this.TSubstancesId != null && this.TSubstancesId.trim().length > 0) {
              this.tSubstancesForm.id = this.TSubstancesId;
              updateTSubstances(this.tSubstancesForm).then(res => {
                that.loading = false;
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.message);
                }
              })
            } else {
              addTSubstances(this.tSubstancesForm).then(res => {
                that.loading = false;
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.message);
                }
              })
            }
          } else {
            this.loading = false;
            this.$Message.error('表单验证不通过！');
          }

        });
      },
      //提交数据
      closeModal(val) {
        this.$emit('input', val);
      },
      //初始化表单
      initForm() {
        this.tSubstancesForm = {
          name: '',
          specificationModel: '',
          standard: '',
          numbers: '',
          unit: '',
          affiliatedUnit: '',
          parkingPosition: '',
          mapLocation: '',
          remark: '',
        };
      },
      //获取验证
      getTSubstancesFormRule() {
        return {
          name: [
            {required: true, message: '物质名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          specificationModel: [
            {required: true, message: '规格型号不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          standard: [
            {required: true, message: '标准不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          numbers: [
            {required: true, message: '数量不能为空！', trigger: 'blur'},
            {type: 'number', trigger: 'blur'}
          ],
          unit: [
            {required: true, message: '单位不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          affiliatedUnit: [
            {required: true, message: '所属单位不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          parkingPosition: [
            {required: true, message: '存放位置不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          mapLocation: [
            {required: true, message: '地图位置不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '备注不能为空！', trigger: 'blur', pattern: /.+/},
          ],
        }
      },
      //地图选择
      chooseMap() {
        this.$Notice.open({
          title: '提示',
          desc: '单击地图选择点位，双击或再次点击图标保存点位信息'
        });
        this.mapShow = true;
        if (this.tSubstancesForm.mapLocation || this.tSubstancesForm.mapLocation.trim().length > 0) {
          let parse = JSON.parse(this.tSubstancesForm.mapLocation);
          let lonlat2cartesian = mars3d.pointconvert.lonlat2cartesian(parse);
          this.addEntieyPoint(lonlat2cartesian);
        }
      },
      //关闭地图
      closeMap() {
        this.mapShow = false;
        if (this.handler && this.viewer) {
          this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
          this.handler.destroy();
        }
      },
      //地图构造完成回调
      mapLoad(viewer) {
        this.viewer = viewer;
        var _this = this;
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        this.handler.setInputAction(function (movement) {
          var ray = viewer.camera.getPickRay(movement.position);
          var position = viewer.scene.globe.pick(ray, viewer.scene);

          if (!position) {
            return null;
          }

          const cartographic = Cesium.Cartographic.fromCartesian(position);
          const lng = Cesium.Math.toDegrees(cartographic.longitude);//经度值
          const lat = Cesium.Math.toDegrees(cartographic.latitude);//纬度值

          for (let i = 0; i < _this.pointArr.length; i++) {
            viewer.entities.remove(_this.pointArr[i]);
          }
          position = Cesium.Cartesian3.fromDegrees(lng,lat);
          position = mars3d.point.getSurfaceHeight(viewer.scene, position, {
            asyn: true,     //是否异步求准确高度
            has3dtiles: true,   //是否先求贴模型上（无模型时改为false，提高效率）
            calback: function (newHeight, cartOld) {

              var positionNew = Cesium.Cartesian3.fromRadians(cartOld.longitude, cartOld.latitude, newHeight);
              _this.addEntieyPoint(positionNew);
            }
          });
          //_this.addEntieyPoint(position);

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      },
      //添加实体
      addEntieyPoint(position) {
        if (this.viewer == null) {
          return;
        }
        let formatPositon = mars3d.point.formatPositon(position);
        let _this = this;
        var entitie = this.viewer.entities.add({
          name: "",
          position: position,
          // point: {
          //     color: new Cesium.Color.fromCssColorString("#3388ff"),
          //     pixelSize: 10,
          //     outlineColor: new Cesium.Color.fromCssColorString("#ffffff"),
          //     outlineWidth: 2,
          //     heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          //     //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.2)
          // },
          billboard: {
            image: '../img/marker/mark3.png',
            scale: 0.8,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
          },
          tooltip: {
            html: '<table style="width: 200px;">' +
              '   <tr>'
              + '<th scope="col" colspan="4" style="text-align:center;font-size:15px;"></th></tr><tr>'
              + '<td >经度：</td><td >' + formatPositon.x + '</td></tr><tr>'
              + '<td >纬度：</td><td >' + formatPositon.y + '</td></tr><tr>'
              + '<td >高层：</td><td >' + formatPositon.z + '</td></tr><tr>'
              + ' </tr>' +
              '</table>',
            anchor: [0, -12],
          },
          click: function (entity) {//单击
            _this.$Message.info("坐标信息已保存");
            _this.tSubstancesForm.mapLocation = '[' + formatPositon.x + ',' + formatPositon.y + ',' + formatPositon.z + "]";
          }
        });
        this.pointArr.push(entitie);
      },
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (val) {
          this.$refs['tSubstancesForm'].resetFields();
          if (this.TSubstancesId != null && this.TSubstancesId.trim().length > 0) {
            getTSubstances({id: this.TSubstancesId}).then(res => {
              if (res && res.code == 200) {
                this.tSubstancesForm.name = res.data.name;
                this.tSubstancesForm.specificationModel = res.data.specificationModel;
                this.tSubstancesForm.standard = res.data.standard;
                this.tSubstancesForm.numbers = res.data.number;
                this.tSubstancesForm.unit = res.data.unit;
                this.tSubstancesForm.affiliatedUnit = res.data.affiliatedUnit;
                this.tSubstancesForm.parkingPosition = res.data.parkingPosition;
                this.tSubstancesForm.mapLocation = res.data.mapLocation;
                this.tSubstancesForm.remark = res.data.remark;
              } else {
                this.$Message.error(res.message);
              }
            });
          }
        } else {
          this.closeModal(val);
        }
      }
    },
    created() {
      this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
      this.width = Math.floor(document.body.scrollWidth * 0.95) + "px";
    },
  }
</script>
