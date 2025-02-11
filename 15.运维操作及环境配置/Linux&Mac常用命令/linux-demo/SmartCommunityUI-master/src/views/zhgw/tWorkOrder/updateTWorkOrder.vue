<style lang="less">
  .tWorkOrder {
    margin-right: 10px;

    .form-item-input {
      width: 200px;
    }

    .ivu-form-item {
      margin-bottom: 24px !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="700px">
    <Form ref="tWorkOrderForm" :label-width="90" :model="tWorkOrderForm" :rules="tWorkOrderFormRule" class="tWorkOrder">
      <Row>
        <Col span="24">
          <FormItem label="工单标题" prop="title">
            <Input v-bind:disabled="disabled" :maxlength=50 v-model="tWorkOrderForm.title"
                   placeholder="请输入工单标题"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="编号" prop="number">
            <Input v-bind:disabled="true" type="text" :maxlength=20 v-model="tWorkOrderForm.number"
                   placeholder="请输入编号"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="工单级别" prop="level">
            <Select v-bind:disabled="disabled" v-model="tWorkOrderForm.level" placeholder="请选择工单级别" clearable>
              <Option v-for="(item, i)  in level" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="工单类型" prop="type">
            <Select v-bind:disabled="disabled" v-model="tWorkOrderForm.type" placeholder="请选择工单类型" clearable>
              <Option v-for="(item, i)  in type" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="工单时间" prop="time">
            <DatePicker
              v-model="tWorkOrderForm.time"
              type="datetime"
              placeholder="请选择"
              format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="工单描述" prop="remarks">
            <Input type="textarea" v-bind:disabled="disabled" :maxlength=20 v-model="tWorkOrderForm.remarks"
                   placeholder="请输入工单描述"/>
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
        addTWorkOrder,
        updateTWorkOrder,
        getTWorkOrder, getNumber
    } from '@/api/zhgw/tWorkOrder/tWorkOrder'
    import {getDictDataByType} from '@/api/index';
    import {formartDate} from '@/api/tools/tool'

    export default {
        name: "updateTWorkOrder",
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
            },
            procDefId: {
                type: String
            }
        },
        data() {
            return {
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                disabled: false,
                tWorkOrderForm: {
                    number: '',
                    remarks: '',
                    type: '',
                    time: '',
                    level: '',
                    title: '',
                    procDefId: ''
                },
                tWorkOrderFormRule: this.gettWorkOrderFormRule(),
                type: [],
                level: []
            }
        },
        methods: {
            getTypePriority() {
                getDictDataByType('word_order_type').then(res => {
                    if (res && res.success) {
                        this.type = res.data;
                    }
                });
                getDictDataByType('work_order_level').then(res => {
                    if (res && res.success) {
                        this.level = res.data;
                    }
                });
            },
            handelSubmit() {
                this.$refs['tWorkOrderForm'].validate((valid) => {
                    this.loading = true;
                    if (valid) {
                        this.tWorkOrderForm.time = formartDate(this.tWorkOrderForm.time, 'yyyy-MM-dd HH:mm:ss')
                        if (this.TWorkOrderId != null && this.TWorkOrderId.trim().length > 0) {
                            this.tWorkOrderForm.id = this.TWorkOrderId;
                            updateTWorkOrder(this.tWorkOrderForm).then(res => {
                                this.loading = false;
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.error(res.msg);
                                    this.loading = false;
                                }
                            })
                        } else {
                            this.tWorkOrderForm.procDefId = this.procDefId;
                            addTWorkOrder(this.tWorkOrderForm).then(res => {
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.error(res.msg);
                                    this.loading = false;
                                }
                            });
                        }
                    } else {
                        this.loading = false;
                        this.$Message.error('表单验证不通过！');
                    }
                });
            },
            initForm() {
                this.tWorkOrderForm = {
                    TWorkOrderId: '',
                    number: '',
                    remarks: '',
                    type: '',
                    time: '',
                    level: '',
                    title: '',
                    procDefId: ''
                };
            },
            gettWorkOrderFormRule() {
                return {
                    number: [
                        {required: true, message: '编号不能为空！', trigger: 'blur'},
                        {type: 'string', max: 20, message: '数据的最大长度为20！', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '工单标题不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    remarks: [
                        {required: true, message: '工单描述不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为500！', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '工单类型不能为空！', trigger: 'blur', pattern: /.+/}
                    ],
                    time: [
                        {required: true, message: '工单时间不能为空！', trigger: 'blur', type: 'date'}
                    ],
                    level: [
                        {required: true, message: '工单级别不能为空！', trigger: 'blur', pattern: /.+/}
                    ],
                }
            },
            closeModal(val) {
                this.$emit('input', val);
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.getTypePriority();
                this.initForm();
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (this.TWorkOrderId == null || this.TWorkOrderId == "") {
                    getNumber().then(res => {
                        if (res && res.success) {
                            this.tWorkOrderForm.number = res.data;
                        }
                    });
                }
                if (val) {
                    this.$refs['tWorkOrderForm'].resetFields();
                    if (this.TWorkOrderId != null && this.TWorkOrderId.trim().length > 0) {
                        getTWorkOrder({id: this.TWorkOrderId}).then(res => {
                            if (res && res.code == 200) {
                                this.tWorkOrderForm.number = res.data.number;
                                this.tWorkOrderForm.remarks = res.data.remarks;
                                this.tWorkOrderForm.type = res.data.type;
                                this.tWorkOrderForm.time = res.data.time;
                                this.tWorkOrderForm.level = res.data.level;
                                this.tWorkOrderForm.title = res.data.title;
                                this.tWorkOrderForm.procDefId = res.data.procDefId;
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
