<style lang="less" scoped>
  .tEquipmentHistoryRecord {
    .form-item-input {
      width: 200px;
    }
    .ivu-form .ivu-row .ivu-form-item-label {
      width: 120px !important;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-select {
      width: 180px;
    }
    .ivu-form-item {
      margin-bottom: 0px !important;
    }
    .ivu-input-wrapper {
      width: 180px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="1060px">
    <Form ref="tEquipmentHistoryRecordForm" :label-width="100" :model="tEquipmentHistoryRecordForm" class="tEquipmentHistoryRecord">
      <Row>
        <Col span="8">
          <FormItem label="通信状态">
            {{tEquipmentHistoryRecordForm.conmmunicationStatus}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="水位1">
            {{tEquipmentHistoryRecordForm.waterLevel1+" 米"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="水位2">
            {{tEquipmentHistoryRecordForm.waterLevel2+" 米"}}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem label="气温">
            {{tEquipmentHistoryRecordForm.airTemperature+" 摄氏度"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="湿度">
            {{tEquipmentHistoryRecordForm.humidity+" %"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="流速1">
            {{tEquipmentHistoryRecordForm.currentSpeed1+" 米/秒"}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="流速2">
            {{tEquipmentHistoryRecordForm.currentSpeed2+" 米/秒"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="流量1">
            {{tEquipmentHistoryRecordForm.flowRate1+" 立方米/秒"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="流量2">
            {{tEquipmentHistoryRecordForm.flowRate2+" 立方米/秒"}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="电源电压">
            {{tEquipmentHistoryRecordForm.voltage+" 伏特"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="累计流量1">
            {{tEquipmentHistoryRecordForm.cumulativeFlow1+" 立方米"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="累计流量2">
            {{tEquipmentHistoryRecordForm.cumulativeFlow2+" 立方米"}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="pm2.5">
            {{tEquipmentHistoryRecordForm.pm25+" 微克/立方米"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="pm10">
            {{tEquipmentHistoryRecordForm.pm10+" 微克/立方米"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="水温">
            {{tEquipmentHistoryRecordForm.waterTemperature+" 摄氏度"}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="设备温度">
            {{tEquipmentHistoryRecordForm.equipmentTemperature+" 摄氏度"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="信号强弱">
            {{tEquipmentHistoryRecordForm.signalIntensity+" %"}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="闸门开启高度">
            {{tEquipmentHistoryRecordForm.gateOpeningHeight+" 米"}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="采集时间">
            {{tEquipmentHistoryRecordForm.collectionTime}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="上传时间">
            {{tEquipmentHistoryRecordForm. uploadTime}}
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
  import {getTEquipmentHistoryRecord} from '@/api/zhgw/tEquipmentHistoryRecord/tEquipmentHistoryRecord'
  import {formartDate} from "@/api/tools/tool";
  import {getDictDataByType} from '@/api/index';

  export default {
    name: "lookTEquipmentHistoryRecord",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TEquipmentHistoryRecordId: {
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
        disabled: false,
        tEquipmentHistoryRecordForm: {


          conmmunicationStatus: '',
          equipmentPosition: '',
          alarmTime: '',
          type: '',
          waterLevel2:'',
          waterLevel1:'',
          uploadTime:'',
          gateOpeningHeight:'',
          signalIntensity:'',
          equipmentTemperature:'',
          waterTemperature:'',
          pm10:'',
          pm25:'',
          cumulativeFlow2:'',
          cumulativeFlow1:'',
          voltage:'',
          flowRate2:'',
          flowRate1:'',
          currentSpeed2:'',
          currentSpeed1:'',
          humidity:'',
          airTemperature:'',
          collectionTime:'',
          dataNumber: '',
        },
      }
    },
    methods: {
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.tEquipmentHistoryRecordForm = {


          conmmunicationStatus: '',
          equipmentPosition: '',
          alarmTime: '',
          type: '',
          waterLevel1:'',
          uploadTime:'',
          gateOpeningHeight:'',
          signalIntensity:'',
          equipmentTemperature:'',
          waterTemperature:'',
          pm10:'',
          pm25:'',
          cumulativeFlow2:'',
          cumulativeFlow1:'',
          voltage:'',
          flowRate2:'',
          flowRate1:'',
          currentSpeed2:'',
          currentSpeed1:'',
          humidity:'',
          airTemperature:'',
          waterLevel2:'',
          collectionTime:'',
          dataNumber: '',
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
        if (val) {
          this.$refs['tEquipmentHistoryRecordForm'].resetFields();
          if (this.TEquipmentHistoryRecordId != null && this.TEquipmentHistoryRecordId.trim().length > 0) {
            getTEquipmentHistoryRecord({id: this.TEquipmentHistoryRecordId}).then(res => {
              if (res && res.code == 200) {
                this.tEquipmentHistoryRecordForm.datanumber = res.data.datanumber;
                this.tEquipmentHistoryRecordForm.name = res.data.name;
                this.tEquipmentHistoryRecordForm.waterLevel1 = res.data.waterLevel1;
                this.tEquipmentHistoryRecordForm.humidity = res.data.humidity;
                this.tEquipmentHistoryRecordForm.currentSpeed1 = res.data.currentSpeed1;
                this.tEquipmentHistoryRecordForm.currentSpeed2 = res.data.currentSpeed2;
                this.tEquipmentHistoryRecordForm.flowRate1 = res.data.flowRate1;
                this.tEquipmentHistoryRecordForm.flowRate2 = res.data.flowRate2;
                this.tEquipmentHistoryRecordForm.voltage = res.data.voltage;
                this.tEquipmentHistoryRecordForm.cumulativeFlow1 = res.data.cumulativeFlow1;
                this.tEquipmentHistoryRecordForm.cumulativeFlow2 = res.data.cumulativeFlow2;
                this.tEquipmentHistoryRecordForm.pm25 = res.data.pm25;
                this.tEquipmentHistoryRecordForm.pm10 = res.data.pm10;
                this.tEquipmentHistoryRecordForm.waterTemperature = res.data.waterTemperature;
                this.tEquipmentHistoryRecordForm.equipmentTemperature = res.data.equipmentTemperature;
                this.tEquipmentHistoryRecordForm.signalIntensity = res.data.signalIntensity;
                this.tEquipmentHistoryRecordForm.gateOpeningHeight = res.data.gateOpeningHeight;
                this.tEquipmentHistoryRecordForm. uploadTime = res.data. uploadTime;
                this.tEquipmentHistoryRecordForm.airTemperature = res.data.airTemperature;
                this.tEquipmentHistoryRecordForm.waterLevel2 = res.data.waterLevel2;
                this.tEquipmentHistoryRecordForm.collectionTime = res.data.collectionTime;

                if (res.data.collectionTime != "") {
                  this.tEquipmentHistoryRecordForm.collectionTime = formartDate(
                    new Date(res.data.collectionTime).getTime(),
                    "yyyy-MM-dd hh:mm:ss"
                  );
                }

                this.tEquipmentHistoryRecordForm.conmmunicationStatus = res.data.conmmunicationStatusName;
                this.tEquipmentHistoryRecordForm.uploadTime = res.data.uploadTime;
                if (res.data.uploadTime != "") {
                  this.tEquipmentHistoryRecordForm.uploadTime = formartDate(
                    new Date(res.data.uploadTime).getTime(),
                    "yyyy-MM-dd hh:mm:ss"
                  );
                }
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        } else {
          this.closeModal(val);
        }
      }
    }
  }
</script>
