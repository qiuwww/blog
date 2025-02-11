<style lang="less" scoped>
  .looktZhsqTaskList {
    .form-item-input {
      width: 200px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 180px;
    }

    .ivu-description-term {
      padding-bottom: 30px !important;
    }

    .ivu-form-item {
      margin-bottom: 0 !important;
    }
  }

</style>
<template>
  <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="true" class="looktZhsqTaskList"
         :width="900">
    <Form ref="tZhsqTaskListForm" :model="tZhsqTaskListForm" :label-width="125">
      <Row>
        <Col span="8">
          <FormItem label="任务分类" prop="merchantSort">
            {{tZhsqTaskListForm.taskSort}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="任务名称" prop="taskName">
            {{tZhsqTaskListForm.taskName}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属街道">
            {{tZhsqTaskListForm.houseStreet}}
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属社区" prop="community">
            {{tZhsqTaskListForm.community}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="grid">
            {{tZhsqTaskListForm.grid}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="发起人" prop="sponsor">
            {{tZhsqTaskListForm.sponsor}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="任务开始时间" prop="taskStartingTime">
            {{tZhsqTaskListForm.taskStartingTime}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="任务结束时间" prop="taskEndTime">
            {{tZhsqTaskListForm.taskEndTime}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="执行人" prop="executor">
            {{tZhsqTaskListForm.executor}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="任务状态" prop="taskStatus">
            {{tZhsqTaskListForm.taskStatus}}
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" v-if="false">确定</Button>
    </div>
  </Modal>
</template>
<script>
  import {getTZhsqTaskList} from '@/api/zhsq/tZhsqTaskList/tZhsqTaskList'
  import {formartDate} from '@/api/tools/tool'

  export default {
    name: "looktZhsqTaskList",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TZhsqTaskListId: {
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
        tZhsqTaskListForm: {
          houseStreet: '',
          taskSort: '',
          taskName: '',
          community: '',
          grid: '',
          sponsor: '',
          taskStartingTime: '',
          taskEndTime: '',
          executor: '',
          taskStatus: '',
        }
      }
    },
    methods: {
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.tZhsqTaskListForm = {
          houseStreet: '',
          taskSort: '',
          taskName: '',
          community: '',
          grid: '',
          sponsor: '',
          taskStartingTime: '',
          taskEndTime: '',
          executor: '',
          taskStatus: '',
        };
      },
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.editTitle = this.modalTitle;
        if (val) {
          if (this.TZhsqTaskListId != null && this.TZhsqTaskListId.trim().length > 0) {
            getTZhsqTaskList({id: this.TZhsqTaskListId}).then(res => {
              if (res && res.code == 200) {
                this.tZhsqTaskListForm.taskSort = res.data.taskSort;
                this.tZhsqTaskListForm.taskName = res.data.taskName;
                this.tZhsqTaskListForm.houseStreet = res.data.houseStreet;
                this.tZhsqTaskListForm.community = res.data.community;
                this.tZhsqTaskListForm.grid = res.data.grid;
                this.tZhsqTaskListForm.sponsor = res.data.sponsor;
                if (res.data.taskStartingTime) {
                  this.tZhsqTaskListForm.taskStartingTime = formartDate(new Date(res.data.taskStartingTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                }
                if (res.data.taskEndTime) {
                  this.tZhsqTaskListForm.taskEndTime = formartDate(new Date(res.data.taskEndTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                } else {
                  this.tZhsqTaskListForm.taskEndTime = null;
                }
                this.tZhsqTaskListForm.executor = res.data.executor;
                if (res.data.taskStatus == 0) {
                  this.tZhsqTaskListForm.taskStatus = "处理中";
                } else if (res.data.taskStatus == 1) {
                  this.tZhsqTaskListForm.taskStatus = "已完成"
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
