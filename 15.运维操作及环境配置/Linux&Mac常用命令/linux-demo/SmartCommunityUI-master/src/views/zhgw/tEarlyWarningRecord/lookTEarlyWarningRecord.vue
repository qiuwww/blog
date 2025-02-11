<style lang="less" scoped>
  .tEarlyWarningRecord {
    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="600px">
    <Form ref="tEarlyWarningRecordForm" :label-width="90" :model="tEarlyWarningRecordForm" class="tEarlyWarningRecord">
      <Row>
        <Col span="12">
          <FormItem label="设备名称">
            {{tEarlyWarningRecordForm.name}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="处理状态">
            {{tEarlyWarningRecordForm.state}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="设备类型">
            {{tEarlyWarningRecordForm.type}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="通信状态">
            {{tEarlyWarningRecordForm.conmmunicationStatus}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="告警时间">
            {{tEarlyWarningRecordForm.alarmTime}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="告警原因">
            {{tEarlyWarningRecordForm.reason}}
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
  import {getTEarlyWarningRecord} from '@/api/zhgw/tEarlyWarningRecord/tEarlyWarningRecord'
  import {formartDate} from "@/api/tools/tool";
  import {getDictDataByType} from '@/api/index';

  export default {
    name: "lookTEarlyWarningRecord",
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
        disabled: false,
        tEarlyWarningRecordForm: {
          number: '',
          name: '',
          conmmunicationStatus: '',
          equipmentPosition: '',
          alarmTime: '',
          type: '',
          state: '',
        },
      }
    },
    methods: {
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.tEarlyWarningRecordForm = {
          number: '',
          name: '',
          conmmunicationStatus: '',
          equipmentPosition: '',
          alarmTime: '',
          type: '',
          state: '',
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
          this.$refs['tEarlyWarningRecordForm'].resetFields();
          if (this.TEarlyWarningRecordId != null && this.TEarlyWarningRecordId.trim().length > 0) {
            getTEarlyWarningRecord({id: this.TEarlyWarningRecordId}).then(res => {
              if (res && res.success) {
                this.tEarlyWarningRecordForm.state = res.data.stateName;
                this.tEarlyWarningRecordForm.name = res.data.name;
                this.tEarlyWarningRecordForm.type = res.data.typeName;
                this.tEarlyWarningRecordForm.reason = res.data.reasonName;
                this.tEarlyWarningRecordForm.conmmunicationStatus = res.data.conmmunicationStatusName;

                this.tEarlyWarningRecordForm.alarmTime = res.data.alarmTime;

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
