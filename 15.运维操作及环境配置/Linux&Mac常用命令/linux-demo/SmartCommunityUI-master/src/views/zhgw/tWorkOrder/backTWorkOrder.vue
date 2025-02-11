<style lang="less">
  @import "../../../styles/table-common.less";
</style>
<template>
  <div class="search">
    <!-- 审批操作 -->
    <Modal :title="editTitle" v-model="show" :mask-closable="false" :width="500">
      <Form ref="tWorkOrderForm" :model="form" :label-width="85">
        <!--一级审批-->
        <FormItem label="审批意见" prop="reason">
          <Input type="textarea" v-model="form.comment" :rows="4"/>
        </FormItem>
        <FormItem label="驳回至">
          <Select
            v-model="form.backTaskKey"
            filterable
            :loading="loading"
            @on-change="backChange"
          >
            <Option v-for="(item, i) in backList" :key="i" :value="item.key">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="指定原节点审批人" prop="assignees" v-show="form.backTaskKey!=-1">
          <Select
            v-model="form.assignees"
            placeholder="请选择或输入搜索"
            filterable
            clearable
            multiple
            :loading="loading"
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
        todoList,
        pass,
        getBackList,
        delegate,
        getNextNode,
        getNode,
        passAll,
        backAll,
        deleteTask,
        applyBusiness
    } from "@/api/activiti";
    import {back, backToTask} from "@/api/zhgw/tWorkOrderTask/tWorkOrderTask"


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
            procInstId: {
                type: String
            },
            taskObj: {
                type: Object
            }
        },
        name: "todo-manage",
        data() {
            return {
                backList: [
                    {
                        key: "-1",
                        name: "发起人"
                    }
                ],
                show: this.value,
                editTitle: this.modalTitle,
                openSearch: true,
                openTip: true,
                loading: false, // 表单加载状态
                userList: [],
                assigneeList: [],
                form: {
                    id: "",
                    procInstId: "",
                    comment: "",
                    sendMessage: true,
                    sendSms: true,
                    sendEmail: true,
                    priority: '',
                    assignees: [],
                    procDefId: '',
                    backTaskKey: '-1'
                }
            };
        },
        methods: {
            backChange(v) {
                if (v == "-1") {
                    return;
                }
                // this.userLoading = true;
                getNode(v).then(res => {
                    this.userLoading = false;
                    if (res && res.success) {
                        if (res.data.users && res.data.users.length > 0) {
                            this.assigneeList = res.data.users;
                            // 默认勾选
                            let ids = [];
                            res.data.users.forEach(e => {
                                ids.push(e.id);
                            });
                            this.form.assignees = ids;
                        }
                    }
                });
            },
            handelSubmit() {
                this.loading = true;
                //驳回到发起人
                if (this.form.backTaskKey == '-1') {
                    this.form.procInstId = this.taskObj.procInstId;
                    this.form.id = this.taskObj.id;

                    back(this.form).then(res => {
                        this.loading = false;
                        if (res && res.success) {
                            this.$Message.success("驳回成功");
                            this.show = false;
                            this.$emit("handleSearch");
                            this.loading = false;
                        } else {
                            this.$Message.success("驳回失败");
                            this.loading = false;
                        }
                    });
                } else {
                    //自定义驳回
                    this.form.procInstId = this.taskObj.procInstId;
                    this.form.procDefId = this.taskObj.procDefId;
                    this.form.id = this.taskObj.id;
                    backToTask(this.form).then(res => {
                        if (res && res.success) {
                            this.$Message.success("驳回成功");
                            this.show = false;
                            this.$emit("handleSearch");
                            this.loading = false;
                        } else {
                            this.$Message.success("驳回失败");
                        }
                    })
                }
            },
            getBack() {
                this.loading = true;
                getBackList(this.procInstId).then(res => {
                    this.loading = false;
                    if (res && res.success) {
                        res.data.forEach(e => {
                            this.backList.push(e);
                        });
                    }
                });
            },
            initForm() {
                this.backList = [
                    {
                        key: "-1",
                        name: "发起人"
                    }
                ],
                    this.form = {
                        id: "",
                        procInstId: '',
                        comment: "",
                        sendMessage: true,
                        sendSms: true,
                        sendEmail: true,
                        priority: '',
                        assignees: [],
                        procDefId: '',
                        backTaskKey: '-1'
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
                this.initForm();
                this.getBack();
                this.editTitle = this.modalTitle;
                if (val) {

                } else {
                    this.closeModal(val);
                }
            }
        }
    };
</script>
