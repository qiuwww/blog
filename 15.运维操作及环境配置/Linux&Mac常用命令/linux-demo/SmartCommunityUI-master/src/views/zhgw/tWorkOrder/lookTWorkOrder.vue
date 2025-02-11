<style lang="less" scoped>
  .tWorkOrder {
    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-form-item {
      margin-bottom: 10px !important;
    }

    .ivu-form-item-content:nth-child(1) {
      height: 50px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="700px">
    <Form ref="tWorkOrderForm" :label-width="90" :model="tWorkOrderForm" class="tWorkOrder">
      <Row>
        <Col span="12">
          <FormItem label="工单标题">
            {{tWorkOrderForm.title}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="编号">
            {{tWorkOrderForm.number}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="工单级别">
            {{tWorkOrderForm.level}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="工单类型">
            {{tWorkOrderForm.type}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="工单时间">
            {{tWorkOrderForm.time}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="工单描述">
            {{tWorkOrderForm.remarks}}
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
    import {getTWorkOrder} from '@/api/zhgw/tWorkOrder/tWorkOrder'
    import {getDictDataByType} from '@/api/index';

    export default {
        name: "looktWorkOrder",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            TWorkOrderId: {
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
                tWorkOrderForm: {
                    number: '',
                    remarks: '',
                    type: '',
                    handlePerson: '',
                    time: '',
                    level: '',
                    title: ''
                },
            }
        },
        methods: {
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.tWorkOrderForm = {
                    number: '',
                    remarks: '',
                    type: '',
                    handlePerson: '',
                    time: '',
                    level: '',
                    title: ''
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
                    this.$refs['tWorkOrderForm'].resetFields();
                    if (this.TWorkOrderId != null && this.TWorkOrderId.trim().length > 0) {
                        getTWorkOrder({id: this.TWorkOrderId}).then(res => {
                            if (res && res.code == 200) {
                                this.tWorkOrderForm.number = res.data.number;
                                this.tWorkOrderForm.remarks = res.data.remarks;
                                this.tWorkOrderForm.handlePerson = res.data.handlePerson;
                                this.tWorkOrderForm.time = res.data.time;
                                this.tWorkOrderForm.title = res.data.title;
                                //工单类型
                                getDictDataByType('word_order_type').then(re => {
                                    if (re.success) {
                                        let arr = re.data.filter(item => item.id == res.data.type);
                                        if (arr.length > 0) {
                                            this.tWorkOrderForm.type = arr[0].label;
                                        }
                                    }
                                });
                                //工单级别
                                getDictDataByType('work_order_level').then(re => {
                                    if (re.success) {
                                        let arr = re.data.filter(item => item.id == res.data.level);
                                        if (arr.length > 0) {
                                            this.tWorkOrderForm.level = arr[0].label;
                                        }
                                    }
                                });
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
