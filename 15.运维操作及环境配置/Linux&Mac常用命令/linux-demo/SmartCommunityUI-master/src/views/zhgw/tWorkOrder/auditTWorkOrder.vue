<style lang="less">
  @import "../../../styles/table-common.less";
</style>
<template>
  <div class="search">
    <!-- 审批操作 -->
    <Modal :title="editTitle" v-model="show" :mask-closable="false" :width="500">
      <Form ref="tWorkOrderForm" :model="form" :label-width="85" :rules="formValidate">
        <!--一级审批-->
        <div>
          <FormItem label="工单级别" prop="level">
            <Select v-model="form.level" placeholder="请选择" clearable>
              <Option v-for="(item, i) in tWorkOrderLevel" :key="i" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="下一处理人" prop="handlePersonId">
            <Select
              v-model="assignees"
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
        </div>
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
        todoList,
        pass,
        back,
        getBackList,
        backToTask,
        delegate,
        getNextNode,
        getNode,
        passAll,
        backAll,
        deleteTask,
        applyBusiness
    } from "@/api/activiti";
    import {searchUserByName, getDictDataByType} from "@/api/index";
    import {apply} from "@/api/zhgw/tWorkOrderBusiness/tWorkOrderBusiness"
    import {
        addTWorkOrder,
        updateTWorkOrder,
        getTWorkOrder
    } from '@/api/zhgw/tWorkOrder/tWorkOrder'

    export default {
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
        name: "todo-manage",
        data() {
            return {
                show: this.value,
                editTitle: this.modalTitle,
                openSearch: true,
                openTip: true,
                loading: false, // 表单加载状态
                userList: [],
                assigneeList: [],
                assignees: [],
                form: {
                    id: "",
                    sendMessage: true,
                    sendSms: true,
                    sendEmail: true,
                    handlePersonId: '',
                    procDefId: '',
                    level: ''
                },
                formValidate: {
                    // 表单验证规则
                    level: [
                        {required: true, message: '工单级别不能为空！', trigger: 'blur', pattern: /.+/}
                    ],
                    handlePersonId: [
                        {required: true, message: '处理人不能为空！', trigger: 'blur', pattern: /.+/}
                    ]
                },
                tWorkOrderLevel: []
            };
        },
        methods: {
            getTWorkOrderLevel() {
                getDictDataByType('work_order_level').then(res => {
                    if (res && res.success) {
                        this.tWorkOrderLevel = res.data;
                    }
                });
            },
            userSelectChange(val) {
                this.form.handlePersonId = val.join(",");
            },
            handelSubmit() {
                this.$refs['tWorkOrderForm'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.form.procDefId = this.procDefId;
                        this.form.id = this.TWorkOrderId;
                        apply(this.form).then(res => {
                            if (res && res.success) {
                                this.$Message.success("操作成功");
                                this.show = false;
                                this.loading = false;
                                this.$emit("handleSearch");
                            } else {
                                this.loading = false;
                                this.$Message.error("工单指派失败");
                            }
                        });
                    } else {
                        this.$Message.error('表单验证不通过！');
                        this.loading = false;
                    }
                })
            },
            initForm() {
                this.form = {
                    id: "",
                    sendMessage: true,
                    sendSms: true,
                    sendEmail: true,
                    handlePersonId: '',
                    procDefId: '',
                    level: ''
                }
            },
            getHandlePerson(v) {
                getNextNode(v, 'sid-A0E587E4-E8EA-41A5-BE2E-6D10A5EB86D3').then(res => {
                    this.userLoading = false;
                    if (res && res.success) {
                        if (res.data.users && res.data.users.length > 0) {
                            this.assigneeList = res.data.users;
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
                this.getTWorkOrderLevel();
                this.editTitle = this.modalTitle;
                this.getHandlePerson(this.procDefId);
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
