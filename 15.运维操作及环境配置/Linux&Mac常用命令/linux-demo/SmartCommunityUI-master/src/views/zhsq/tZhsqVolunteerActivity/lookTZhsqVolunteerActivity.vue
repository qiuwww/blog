<style lang="less">
  .tZhsqVolunteerActivityLook {
    .ivu-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 0px;
    }

    .ivu-form-item {
      margin-bottom: 0px !important;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 200px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }

    .ivu-form-item .ivu-form-item-content .item_span {
      margin-top: 6px;
      width: 844px;
      height: 90px !important;
      overflow: auto;
      overflow-x: hidden;
      line-height: 150%;
      border: 1px solid rgb(222, 222, 222);
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tZhsqVolunteerActivityLook"
         width="1000" :z-index="1211">
    <Form ref="tZhsqVolunteerActivityForm" :model="tZhsqVolunteerActivityForm" :label-width="120">
      <Row>
        <Col span="8">
          <FormItem label="活动名称" prop="name">
            {{tZhsqVolunteerActivityForm.name}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="活动地址" prop="activitiyAddress">
            {{tZhsqVolunteerActivityForm.activitiyAddress}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="组织者" prop="organizer">
            {{tZhsqVolunteerActivityForm.organizer}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="活动开始时间" prop="startDateTime">
            {{tZhsqVolunteerActivityForm.startDate1}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="活动开始时间" prop="startDateTime">
            {{tZhsqVolunteerActivityForm.endDate1}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="参与志愿者" prop="participant">
            <Tooltip :content="participantName" placement="top">
              {{tZhsqVolunteerActivityForm.participantName}}
            </Tooltip>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Row>
          <FormItem label="排序" prop="orderNumber">
            {{tZhsqVolunteerActivityForm.orderNumber}}
          </FormItem>
        </Row>
      </Row>
      <Row>
        <FormItem label="活动简介" prop="activityProfile">
          <p class="item_span">
            {{tZhsqVolunteerActivityForm.activityProfile}}
          </p>
        </FormItem>
        <!--        <FormItem label="地图标注" prop="position">-->
        <!--          <Input type="text" :maxlength=50 v-model="tZhsqVolunteerActivityForm.position"-->
        <!--                 placeholder="请输入地图标注"/>-->
        <!--        </FormItem>-->
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
  import {
    addTZhsqVolunteerActivity,
    updateTZhsqVolunteerActivity,
    getTZhsqVolunteerActivity
  } from '@/api/zhsq/tZhsqVolunteerActivity/tZhsqVolunteerActivity'
  import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'

  export default {
    name: "updateTZhsqVolunteerActivity",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TZhsqVolunteerActivityId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        participantPriority: [],
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        tZhsqVolunteerActivityForm: {
          name: '',
          activitiyAddress: '',
          startDateTime: '',
          startDate: '',
          endDateTime: '',
          endDate: '',
          organizer: '',
          participant: '',
          activityProfile: '',
          position: '',
          orderNumber: 1,
        },
        participantName: "",
      }
    },
    methods: {
      setStartDate(e) {
        this.tZhsqVolunteerActivityForm.startDate = e;
      },
      setEndDate(e) {
        this.tZhsqVolunteerActivityForm.endDate = e;
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.tZhsqVolunteerActivityForm = {
          name: '',
          activitiyAddress: '',
          startDateTime: '',
          startDate: '',
          endDateTime: '',
          endDate: '',
          organizer: '',
          participant: '',
          activityProfile: '',
          position: '',
          orderNumber: 1,
        };
      },
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.$refs['tZhsqVolunteerActivityForm'].resetFields();
          if (this.TZhsqVolunteerActivityId != null && this.TZhsqVolunteerActivityId.trim().length > 0) {
            getTZhsqVolunteerActivity({id: this.TZhsqVolunteerActivityId}).then(res => {
              if (res && res.code == 200) {
                this.tZhsqVolunteerActivityForm.name = res.data.name;
                this.tZhsqVolunteerActivityForm.activitiyAddress = res.data.activitiyAddress;
                if (res.data.startDate != '') {
                  this.tZhsqVolunteerActivityForm.startDate1 = formartDate(new Date(res.data.startDate1).getTime(), 'yyyy-MM-dd hh:mm:ss');
                }
                if (res.data.endDate != '') {
                  this.tZhsqVolunteerActivityForm.endDate1 = formartDate(new Date(res.data.endDate1).getTime(), 'yyyy-MM-dd hh:mm:ss');
                }
                this.tZhsqVolunteerActivityForm.organizer = res.data.organizer;
                this.tZhsqVolunteerActivityForm.participant = res.data.participant;
                if(res.data.participantName){
                  this.tZhsqVolunteerActivityForm.participantName = res.data.participantName.length>10?res.data.participantName.substring(0,10)+"... ":res.data.participantName;
                }
                this.participantName = res.data.participantName;
                this.tZhsqVolunteerActivityForm.activityProfile = res.data.activityProfile;
                this.tZhsqVolunteerActivityForm.position = res.data.position;
                this.tZhsqVolunteerActivityForm.orderNumber = res.data.orderNumber;
              } else {
                this.$Message.error(res.message);
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
