<style lang="less">
  @import "../../../styles/table-common.less";
</style>
<template>
  <div class="search">
    <!-- 审批操作 -->
    <Modal :title="editTitle" v-model="show" :mask-closable="false" :width="500">
      <Form ref="tWorkOrderForm" :model="form" :label-width="85" :rules="formValidate">
        <FormItem label="处理意见" prop="reason">
          <Input type="textarea" v-model="form.comment" :rows="4"/>
        </FormItem>
        <FormItem label="下一级处理人" prop="assignees">
          <Select
            v-model="form.assignees"
            placeholder="请选择或输入搜索"
            filterable
            clearable
            multiple
            :loading="loading"
            @on-change="userSelectChange"
          >
            <Option v-for="(item, i) in assigneeList" :key="i" :value="item.id">{{item.username}}</Option>
          </Select>
        </FormItem>
        <FormItem label="消息通知">
          <Checkbox v-model="form.sendMessage">站内消息通知</Checkbox>
          <Checkbox v-model="form.sendSms">短信通知</Checkbox>
          <Checkbox v-model="form.sendEmail">邮件通知</Checkbox>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="show=false">取消</Button>
        <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    import {
        getNextNode,
    } from "@/api/activiti";
    import {pass} from "@/api/zhgw/tWorkOrderTask/tWorkOrderTask"
    import {getTWorkOrder} from '@/api/zhgw/tWorkOrder/tWorkOrder'

    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            modalTitle: {
                type: String
            },
            taskObj: {
                type: Object
            }
        },
        name: "todo-manage",
        data() {
            return {
                tObj: {},
                show: this.value,
                editTitle: this.modalTitle,
                loading: false, // 表单加载状态
                assigneeList: [],
                form: {
                    id: '',
                    procInstId: '',
                    comment: '',
                    assignees: [],
                    backTaskKey: -1,
                    sendMessage: false,
                    sendSms: false,
                    sendEmail: false,
                    procDefId: "",
                    type:''
                },
                formValidate: {
                    // 表单验证规则
                    assignees: [
                        {required: true, message: '处理人不能为空！', trigger: 'blur', pattern: /.+/}
                    ]
                },
            };
        },
        methods: {
            userSelectChange(val) {
                // this.form.assignees = val.join(",");
            },
            handelSubmit() {
                this.$refs['tWorkOrderForm'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.form.id = this.TWorkOrderId;
                        this.form.procInstId = this.taskObj.procInstId;
                        this.form.procDefId = this.taskObj.procDefId;
                        this.form.id = this.taskObj.id;
                        this.form.type = this.taskObj.name;
                        pass(this.form).then(res => {
                            if (res && res.success) {
                                this.show = false;
                                this.$Message.success("审批成功");
                                this.$emit("handleSearch");
                            } else {
                                this.$Message.error("审批失败");
                            }
                        });
                        this.loading = false;
                    } else {
                        this.$Message.error('表单验证不通过！');
                        this.loading = false;
                    }
                })
            },
            initForm() {
                this.form = {
                    id: '',
                    procInstId: '',
                    comment: '',
                    assignees: [],
                    backTaskKey: -1,
                    sendMessage: true,
                    sendSms: true,
                    sendEmail: true,
                    procDefId: "",
                    type:''
                }
            },
            getHandlePerson(v) {
                getNextNode(this.tObj.procDefId, 'sid-E41A4807-48B4-4417-A60D-E9C5CDB3B76B').then(res => {
                    if (res && res.success) {
                        if (res.data.users && res.data.users.length > 0) {
                            this.assigneeList = res.data.users;
                        } else {
                            this.form.assignees = [];
                        }
                    }
                });
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
                this.initForm();
                this.tObj = this.taskObj;
                this.editTitle = this.modalTitle;
                this.getHandlePerson();
                if (val) {
                    if (this.TWorkOrderId != null && this.TWorkOrderId.trim().length > 0) {
                        getTWorkOrder({id: this.TWorkOrderId}).then(res => {
                            if (res && res.code == 200) {
                                this.form.level = res.data.level;
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
    };
</script>
