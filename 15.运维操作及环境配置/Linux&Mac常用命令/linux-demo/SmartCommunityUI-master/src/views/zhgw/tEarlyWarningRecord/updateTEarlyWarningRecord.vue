<style lang="less">
  .tEarlyWarningRecord {
    .form-item-input {
      width: 200px;
    }

    /*.ivu-form-item-error-tip {
      left: 80px;
    }*/

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 100%;
    }

    .ivu-input-number {
      width: 100% !important;
    }

    .mapcontainer {
      position: fixed;
      z-index: 999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="600px">
    <Form ref="tEarlyWarningRecordForm" :label-width="90" :model="tEarlyWarningRecordForm"
          :rules="tEarlyWarningRecordFormRule" class="tEarlyWarningRecord">
      <Row>
        <Col span="12">
          <FormItem label="名称" prop="name">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEarlyWarningRecordForm.name"
                   placeholder="请输入名称"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="状态" prop="state">
            <Select v-bind:disabled="disabled" v-model="tEarlyWarningRecordForm.state" placeholder="请选择" clearable>
              <Option v-for="(item, i) in statePriority" :key="item.value" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <!--				<Col span="12">-->
        <!--					<FormItem label="编号" prop="number">-->
        <!--						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="tEarlyWarningRecordForm.number" placeholder="请输入编号"/>-->
        <!--					</FormItem>-->
        <!--				</Col>-->
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="通信状态" prop="conmmunicationStatus">
            <Select v-bind:disabled="disabled" v-model="tEarlyWarningRecordForm.conmmunicationStatus" placeholder="请选择"
                    clearable>
              <Option v-for="(item, i) in conmmunicationStatusPriority" :key="item.value" :value="item.id.toString()">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="设备类型" prop="type">
            <Select v-bind:disabled="disabled" v-model="tEarlyWarningRecordForm.type" placeholder="请选择" clearable>
              <Option v-for="(item, i) in typePriority" :key="item.value" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="告警原因" prop="reason">
            <Select v-bind:disabled="disabled" v-model="tEarlyWarningRecordForm.reason" placeholder="请选择" clearable>
              <Option v-for="(item, i) in reasonPriority" :key="item.value" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="告警时间" prop="alarmTime">
            <DatePicker v-bind:disabled="disabled" style="width:100%;" type="datetime" placeholder="请输入告警时间"
                        v-model="tEarlyWarningRecordForm.alarmTimeTime " @on-change="setAlarmTime"
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
    addTEarlyWarningRecord,
    updateTEarlyWarningRecord,
    getTEarlyWarningRecord
  } from '@/api/zhgw/tEarlyWarningRecord/tEarlyWarningRecord'
  import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'

  export default {
    name: "updateTEarlyWarningRecord",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TEarlyWarningRecordId: {
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
        typePriority: [],
        reasonPriority: [],
        statePriority: [],
        tEarlyWarningRecordForm: {
          name: '',
          number: '',
          conmmunicationStatus: '',
          type: '',
          reason: '',
          state: '',
          alarmTimeTime: '',
          alarmTime: null,
        },
        tEarlyWarningRecordFormRule: this.getTEarlyWarningRecordFormRule()
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
      getTypePriority() {
        getDictDataByType('equipment_type').then(res => {
          if (res && res.success) {
            this.typePriority = res.data;
          }
        });
      },
      getReasonPriority() {
        getDictDataByType('cause_of_alarm').then(res => {
          if (res && res.success) {
            this.reasonPriority = res.data;
          }
        });
      },
      getStatePriority() {
        getDictDataByType('processing_status').then(res => {
          if (res && res.success) {
            this.statePriority = res.data;
          }
        });
      },
      setAlarmTime(e) {
        if (e){
          this.tEarlyWarningRecordForm.alarmTime = e;
        }else {
          this.tEarlyWarningRecordForm.alarmTime = null;
        }
      },
      handelSubmit() {
        this.$refs['tEarlyWarningRecordForm'].validate((valid) => {
          this.loading = true;
          if (valid) {
            if (this.TEarlyWarningRecordId != null && this.TEarlyWarningRecordId.trim().length > 0) {
              this.tEarlyWarningRecordForm.id = this.TEarlyWarningRecordId;
              updateTEarlyWarningRecord(this.tEarlyWarningRecordForm).then(res => {
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
              addTEarlyWarningRecord(this.tEarlyWarningRecordForm).then(res => {
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
        this.tEarlyWarningRecordForm = {
          name: '',
          number: '',
          conmmunicationStatus: '',
          type: '',
          reason: '',
          state: '',
          alarmTimeTime: '',
          alarmTime: null,
        };
      },
      getTEarlyWarningRecordFormRule() {
        return {
          name: [
            {required: true, message: '名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          number: [
            {required: true, message: '编号不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          conmmunicationStatus: [
            {required: true, message: '通信状态不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          type: [
            {required: true, message: '设备类型不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          reason: [
            {required: true, message: '告警原因不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          state: [
            {required: true, message: '状态不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          alarmTimeTime: [
            {required: true, message: '告警时间不能为空！', trigger: 'blur', pattern: /.+/},
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
          this.getTypePriority(),
          this.getReasonPriority(),
          this.getStatePriority(),
          this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.$refs['tEarlyWarningRecordForm'].resetFields();
          if (this.TEarlyWarningRecordId != null && this.TEarlyWarningRecordId.trim().length > 0) {
            getTEarlyWarningRecord({id: this.TEarlyWarningRecordId}).then(res => {
              if (res && res.code == 200) {
                this.tEarlyWarningRecordForm.name = res.data.name;
                this.tEarlyWarningRecordForm.number = res.data.number;
                this.tEarlyWarningRecordForm.conmmunicationStatus = res.data.conmmunicationStatus;
                this.tEarlyWarningRecordForm.type = res.data.type;
                this.tEarlyWarningRecordForm.reason = res.data.reason;
                this.tEarlyWarningRecordForm.state = res.data.state;
                if (res.data.alarmTime != '') {
                  this.tEarlyWarningRecordForm.alarmTimeTime = formartDate(new Date(res.data.alarmTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                  this.tEarlyWarningRecordForm.alarmTime = formartDate(new Date(res.data.alarmTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
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
