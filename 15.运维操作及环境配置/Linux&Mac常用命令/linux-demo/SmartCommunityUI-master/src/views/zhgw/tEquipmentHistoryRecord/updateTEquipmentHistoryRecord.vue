<style lang="less">
  .tEquipmentHistoryRecord {
    .tZhsqVolunteer {
      .ivu-modal {
        width: 1060px !important;
      }

      .form-item-input {
        width: 200px;
      }

      .ivu-form-item-error-tip {
        left: 80px;
      }


      .ivu-select {
        width: 180px;
      }

      .ivu-input-wrapper {
        width: 180px !important;
      }

      .ivu-form .ivu-form-item-label {
        width: 120px !important;
      }
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="1060px">
    <Form ref="tEquipmentHistoryRecordForm" :model="tEquipmentHistoryRecordForm"
          :rules="tEquipmentHistoryRecordFormRule" class="tEquipmentHistoryRecord" :label-width="120">
      <Row>
        <Col span="8">
          <FormItem label="通信状态" prop="conmmunicationStatus">
            <Select v-bind:disabled="disabled" v-model="tEquipmentHistoryRecordForm.conmmunicationStatus" placeholder="请选择" clearable>
              <Option v-for="(item, i) in conmmunicationStatusPriority" :key="item.value" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="水位1" prop="waterLevel1">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.waterLevel1" placeholder="请输入水位1（米）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="水位2" prop="waterLevel2">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.waterLevel2" placeholder="请输入水位2（米）"/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem label="气温" prop="airTemperature">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.airTemperature" placeholder="请输入气温（摄氏度）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="湿度" prop="humidity">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEquipmentHistoryRecordForm.humidity"
                   placeholder="请输入湿度（百分比）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="流速1" prop="currentSpeed1">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.currentSpeed1" placeholder="请输入流速1（米/秒）"/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem label="流速2" prop="currentSpeed2">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.currentSpeed2" placeholder="请输入流速2（米/秒）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="流量1" prop="flowRate1">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEquipmentHistoryRecordForm.flowRate1"
                   placeholder="请输入流量1（立方米/秒）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="流量2" prop="flowRate2">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEquipmentHistoryRecordForm.flowRate2"
                   placeholder="请输入流量2（立方米/秒）"/>
          </FormItem>
        </Col>
      </Row>


      <Row>
        <Col span="8">
          <FormItem label="电源电压" prop="voltage">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEquipmentHistoryRecordForm.voltage"
                   placeholder="请输入电源电压（伏特）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="累计流量1" prop="cumulativeFlow1">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.cumulativeFlow1" placeholder="请输入累计流量1（立方米）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="累计流量2" prop="cumulativeFlow2">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.cumulativeFlow2" placeholder="请输入累计流量2（立方米）"/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem label="水温" prop="waterTemperature">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.waterTemperature" placeholder="请输入水温（摄氏度）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="设备温度" prop="equipmentTemperature">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.equipmentTemperature" placeholder="请输入设备温度（摄氏度）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="信号强度" prop="signalIntensity">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.signalIntensity" placeholder="请输入信号强度（百分比）"/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem label="pm2.5" prop="pm25">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEquipmentHistoryRecordForm.pm25"
                   placeholder="请输入pm2.5（微克/立方米）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="pm10" prop="pm10">
            <Input v-bind:disabled="disabled" type="text" :maxlength=80 v-model="tEquipmentHistoryRecordForm.pm10"
                   placeholder="请输入pm10（微克/立方米）"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="闸门开启高度" prop="gateOpeningHeight">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50
                   v-model="tEquipmentHistoryRecordForm.gateOpeningHeight" placeholder="请输入闸门开启高度(米)"/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem label="采集时间" prop="collectionTimeTime">
            <DatePicker v-bind:disabled="disabled" style="width:100%;" type="datetime" placeholder="请输入采集时间"
                        v-model="tEquipmentHistoryRecordForm.collectionTimeTime " @on-change="setCollectionTime"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="上传时间" prop="uploadTimeTime">
            <DatePicker v-bind:disabled="disabled" style="width:100%;" type="datetime" placeholder="请输入上传时间"
                        v-model="tEquipmentHistoryRecordForm.uploadTimeTime " @on-change="setUploadTime"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import {
    addTEquipmentHistoryRecord,
    updateTEquipmentHistoryRecord,
    getTEquipmentHistoryRecord
  } from '@/api/zhgw/tEquipmentHistoryRecord/tEquipmentHistoryRecord'
  import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'

  export default {
    name: "updateTEquipmentHistoryRecord",
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
        loading: true,
        disabled: false,
        conmmunicationStatusPriority: [],
        tEquipmentHistoryRecordForm: {
          name: '',
          dataNumber: '',
          conmmunicationStatus: '',
          collectionTimeTime: '',
          collectionTime: '',
          waterLevel1: '',
          waterLevel2: '',
          airTemperature: '',
          humidity: '',
          currentSpeed1: '',
          currentSpeed2: '',
          flowRate1: '',
          flowRate2: '',
          voltage: '',
          cumulativeFlow1: '',
          cumulativeFlow2: '',
          waterTemperature: '',
          equipmentTemperature: '',
          signalIntensity: '',
          pm25: '',
          pm10: '',
          gateOpeningHeight: '',
          uploadTimeTime: '',
          uploadTime: '',
        },
        tEquipmentHistoryRecordFormRule: this.getTEquipmentHistoryRecordFormRule()
      }
    },
    methods: {
      getConmmunicationStatusPriority() {
        getDictDataByType('conmmunication_status').then(res => {
          if (res && res.success) {
            this.conmmunicationStatusPriority = res.data;
          }
        });
      },
      setCollectionTime(e) {
        this.tEquipmentHistoryRecordForm.collectionTime = e;
      },
      setUploadTime(e) {
        this.tEquipmentHistoryRecordForm.uploadTime = e;
      },
      handelSubmit() {
        this.$refs['tEquipmentHistoryRecordForm'].validate((valid) => {
          this.loading = true;
          if (valid) {
            if (this.TEquipmentHistoryRecordId != null && this.TEquipmentHistoryRecordId.trim().length > 0) {
              this.tEquipmentHistoryRecordForm.id = this.TEquipmentHistoryRecordId;
              updateTEquipmentHistoryRecord(this.tEquipmentHistoryRecordForm).then(res => {
                this.loading = false;
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              })
            } else {
              addTEquipmentHistoryRecord(this.tEquipmentHistoryRecordForm).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              })
            }
          } else {
            this.loading = false;
            this.$Message.error('表单验证不通过！');
          }
        });
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.tEquipmentHistoryRecordForm = {
          name: '',
          dataNumber: '',
          conmmunicationStatus: '',
          collectionTimeTime: '',
          collectionTime: '',
          waterLevel1: '',
          waterLevel2: '',
          airTemperature: '',
          humidity: '',
          currentSpeed1: '',
          currentSpeed2: '',
          flowRate1: '',
          flowRate2: '',
          voltage: '',
          cumulativeFlow1: '',
          cumulativeFlow2: '',
          waterTemperature: '',
          equipmentTemperature: '',
          signalIntensity: '',
          pm25: '',
          pm10: '',
          gateOpeningHeight: '',
          uploadTimeTime: '',
          uploadTime: '',
        };
      },
      getTEquipmentHistoryRecordFormRule() {
        return {
          name: [
            {required: true, message: '名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          dataNumber: [
            {required: true, message: '编号不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          conmmunicationStatus: [
            {required: true, message: '通信状态不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          collectionTimeTime: [
            {required: true, message: '采集时间不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          waterLevel1: [
            {required: true, message: '水位1（米）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          waterLevel2: [
            {required: true, message: '水位2（米）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          airTemperature: [
            {required: true, message: '气温（摄氏度）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          humidity: [
            {required: true, message: '湿度（百分比）不能为空！', trigger: 'blur'},
            {
              pattern: /^100$|^(\d|[1-9]\d)(\.\d+)*$/,
              message: '百分数不能小于0大于一百',
              trigger: 'blur'
            }
          ],
          currentSpeed1: [
            {required: true, message: '流速1（米/秒）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          currentSpeed2: [
            {required: true, message: '流速2（米/秒）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          flowRate1: [
            {required: true, message: '流量1（立方米/秒）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          flowRate2: [
            {required: true, message: '流量2（立方米/秒）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          voltage: [
            {required: true, message: '电源电压（伏特）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          cumulativeFlow1: [
            {required: true, message: '累计流量1（立方米）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          cumulativeFlow2: [
            {required: true, message: '累计流量2（立方米）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          waterTemperature: [
            {required: true, message: '水温（摄氏度）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          equipmentTemperature: [
            {required: true, message: '设备温度（摄氏度）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          signalIntensity: [
            {required: true, message: '信号强度（百分比）不能为空！', trigger: 'blur'},
            {pattern: /^100$|^(\d|[1-9]\d)(\.\d+)*$/,
              message: '百分数不能小于0大于一百',
              trigger: 'blur'}
          ],
          pm25: [
            {required: true, message: 'pm2.5（微克/立方米）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          pm10: [
            {required: true, message: 'pm10（微克/立方米）不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          gateOpeningHeight: [
            {required: true, message: '闸门开启高度(米)不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          uploadTimeTime: [
            {required: true, message: '上传时间不能为空！', trigger: 'blur', pattern: /.+/},
          ],
        }
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.getConmmunicationStatusPriority(),
          this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.$refs['tEquipmentHistoryRecordForm'].resetFields();
          if (this.TEquipmentHistoryRecordId != null && this.TEquipmentHistoryRecordId.trim().length > 0) {
            getTEquipmentHistoryRecord({id: this.TEquipmentHistoryRecordId}).then(res => {
              if (res && res.code == 200) {

                this.tEquipmentHistoryRecordForm.conmmunicationStatus = res.data.conmmunicationStatus;
                if (res.data.collectionTime != '') {
                  this.tEquipmentHistoryRecordForm.collectionTimeTime = formartDate(new Date(res.data.collectionTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                  this.tEquipmentHistoryRecordForm.collectionTime = formartDate(new Date(res.data.collectionTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                }
                this.tEquipmentHistoryRecordForm.waterLevel1 = res.data.waterLevel1;
                this.tEquipmentHistoryRecordForm.waterLevel2 = res.data.waterLevel2;
                this.tEquipmentHistoryRecordForm.airTemperature = res.data.airTemperature;
                this.tEquipmentHistoryRecordForm.humidity = res.data.humidity;
                this.tEquipmentHistoryRecordForm.currentSpeed1 = res.data.currentSpeed1;
                this.tEquipmentHistoryRecordForm.currentSpeed2 = res.data.currentSpeed2;
                this.tEquipmentHistoryRecordForm.flowRate1 = res.data.flowRate1;
                this.tEquipmentHistoryRecordForm.flowRate2 = res.data.flowRate2;
                this.tEquipmentHistoryRecordForm.voltage = res.data.voltage;
                this.tEquipmentHistoryRecordForm.cumulativeFlow1 = res.data.cumulativeFlow1;
                this.tEquipmentHistoryRecordForm.cumulativeFlow2 = res.data.cumulativeFlow2;
                this.tEquipmentHistoryRecordForm.waterTemperature = res.data.waterTemperature;
                this.tEquipmentHistoryRecordForm.equipmentTemperature = res.data.equipmentTemperature;
                this.tEquipmentHistoryRecordForm.signalIntensity = res.data.signalIntensity;
                this.tEquipmentHistoryRecordForm.pm25 = res.data.pm25;
                this.tEquipmentHistoryRecordForm.pm10 = res.data.pm10;
                this.tEquipmentHistoryRecordForm.gateOpeningHeight = res.data.gateOpeningHeight;
                if (res.data.uploadTime != '') {
                  this.tEquipmentHistoryRecordForm.uploadTimeTime = formartDate(new Date(res.data.uploadTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                  this.tEquipmentHistoryRecordForm.uploadTime = formartDate(new Date(res.data.uploadTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
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
