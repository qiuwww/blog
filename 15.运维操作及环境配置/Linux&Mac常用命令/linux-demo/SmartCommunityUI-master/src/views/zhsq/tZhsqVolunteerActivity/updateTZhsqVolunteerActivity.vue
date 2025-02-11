<style lang="less">
  .tZhsqVolunteerActivity {
    .ivu-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 120px;
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

    .ivu-form-item .ivu-form-item-content .ivu-input-type-textarea textarea {
      width: 862px;
      height: 90px !important;
    }

    .ivu-select-default.ivu-select-multiple .ivu-select-selection {
      min-height: 32px;
      max-height: 32px;
      overflow-y: auto;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tZhsqVolunteerActivity" width="1028">
    <Form ref="tZhsqVolunteerActivityForm" :model="tZhsqVolunteerActivityForm" :rules="tZhsqVolunteerActivityFormRule">
      <Row>
        <Col span="8">
          <FormItem label="活动名称" prop="name">
            <Input type="text" :maxlength=50 v-model="tZhsqVolunteerActivityForm.name"
                   placeholder="请输入活动名称"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="活动地址" prop="activitiyAddress">
            <Input type="text" :maxlength=50
                   v-model="tZhsqVolunteerActivityForm.activitiyAddress" placeholder="请输入活动地址"/>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="组织者" prop="organizer">
            <Input type="text" :maxlength=50 v-model="tZhsqVolunteerActivityForm.organizer"
                   placeholder="请输入组织者"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="活动开始时间" prop="startDate1">
            <DatePicker style="width:150px" type="date" placeholder="请输入活动开始时间" @on-change="handleSearchStartTime"
                        v-model="tZhsqVolunteerActivityForm.startDate1"
                        format="yyyy-MM-dd" :options="buildingYearOptionsStart"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="活动结束时间" prop="endDate1">
            <DatePicker style="width:150px;" type="date" placeholder="请输入活动结束时间"
                        v-model="tZhsqVolunteerActivityForm.endDate1" @on-change="handleSearchEndTime"
                        format="yyyy-MM-dd" :options="buildingYearOptionsEnd"></DatePicker>

          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="参与志愿者" prop="participant">
            <Select v-model="tZhsqVolunteerActivityForm.participantArr" placeholder="请选择" multiple clearable>
              <Option v-for="(item, i) in participantPriority" :key="item.value" :value="item.id">{{ item.name }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
      </Row>
      <Row>
        <FormItem label="排序" prop="orderNumber">
          <InputNumber :max="1000" :min="0" v-model="tZhsqVolunteerActivityForm.orderNumber"
                       style="width: 200px"></InputNumber>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="活动简介" prop="activityProfile">
          <Input type="textarea" v-model="tZhsqVolunteerActivityForm.activityProfile" :maxlength=500
                 placeholder="请输入活动简介"/>
        </FormItem>
        <!--        <FormItem label="地图标注" prop="position">-->
        <!--          <Input type="text" :maxlength=50 v-model="tZhsqVolunteerActivityForm.position"-->
        <!--                 placeholder="请输入地图标注"/>-->
        <!--        </FormItem>-->
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
    addTZhsqVolunteerActivity,
    updateTZhsqVolunteerActivity,
    getTZhsqVolunteerActivity
  } from '@/api/zhsq/tZhsqVolunteerActivity/tZhsqVolunteerActivity'
  import {formartDate} from '@/api/tools/tool'

  import {queryAllList} from '@/api/zhsq/tZhsqVolunteer/tZhsqVolunteer'

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
      const validateEndDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('活动结束时间不能为空'));
        }
        if (value == undefined || value == null || value.toString().trim() === '') {
          callback(new Error('不能为空'));
        } else if (this.tZhsqVolunteerActivityForm && this.tZhsqVolunteerActivityForm.startDate1 != "" && this.tZhsqVolunteerActivityForm.startDate1 > value.toString()) {

          callback(new Error('活动结束时间不得早于开始时间'));
        } else {
          callback();
        }
      };
      return {
        //时间控件限定
        buildingYearOptionsStart: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        //时间控件限定
        buildingYearOptionsEnd: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now();
          }
        },
        validateEndDate: validateEndDate,
        participantPriority: [],
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        tZhsqVolunteerActivityForm: {
          name: '',
          activitiyAddress: '',
          startDate1: '',
          endDate1: '',
          organizer: '',
          participant: '',
          participantArr: [],
          activityProfile: '',
          position: '',
          orderNumber: 1,
        },
        tZhsqVolunteerActivityFormRule: this.getTZhsqVolunteerActivityFormRule()
      }
    },
    mounted() {
      queryAllList({state: "1"}).then(res => {
        if (res && res.success) {
          this.participantPriority = res.data;
        }
      })
    },
    methods: {
      //开始时间改变
      handleSearchStartTime() {
        let _this = this;
        this.buildingYearOptionsEnd= {
          disabledDate (date) {
            return date && date.valueOf() <= _this.tZhsqVolunteerActivityForm.startDate1;
          }
        };//时间控件限定
        this.tZhsqVolunteerActivityForm.endDate=null
      },
      //结束时间改变
      handleSearchEndTime(){
        if(this.tZhsqVolunteerActivityForm.startDate1==null || this.tZhsqVolunteerActivityForm.startDate1==""){
          this.$Message.error("请先选择开始时间")
          this.tZhsqVolunteerActivityForm.endDate1=null
        }
      },
      //提交
      handelSubmit() {
        this.$refs['tZhsqVolunteerActivityForm'].validate((valid) => {
          this.loading = true;

          if (valid) {
            this.tZhsqVolunteerActivityForm.participant = "";
            if (this.tZhsqVolunteerActivityForm.participantArr) {
              for (let i = 0; i < this.tZhsqVolunteerActivityForm.participantArr.length; i++) {
                this.tZhsqVolunteerActivityForm.participant += "," + this.tZhsqVolunteerActivityForm.participantArr[i];
              }
              if (this.tZhsqVolunteerActivityForm.participant != "") {
                this.tZhsqVolunteerActivityForm.participant = this.tZhsqVolunteerActivityForm.participant.substring(1);
              }
            }
            if (this.tZhsqVolunteerActivityForm.startDate1 && this.tZhsqVolunteerActivityForm.endDate1) {
              if (this.tZhsqVolunteerActivityForm.startDate1 > this.tZhsqVolunteerActivityForm.endDate1) {
                this.loading = false;
                this.$Message.error('活动结束时间不得早于开始时间！');
                return;
              }
            }

            this.tZhsqVolunteerActivityForm.startDate1 = formartDate(this.tZhsqVolunteerActivityForm.startDate1, 'yyyy-MM-dd HH:mm:ss');
            this.tZhsqVolunteerActivityForm.endDate1 = formartDate(this.tZhsqVolunteerActivityForm.endDate1, 'yyyy-MM-dd HH:mm:ss');
            var startDate1 = JSON.parse(JSON.stringify(this.tZhsqVolunteerActivityForm.startDate1));
            var endDate1 = JSON.parse(JSON.stringify(this.tZhsqVolunteerActivityForm.endDate1));
            this.tZhsqVolunteerActivityForm.startDate1 = new Date(startDate1);
            this.tZhsqVolunteerActivityForm.endDate1 = new Date(endDate1);

            if (this.TZhsqVolunteerActivityId != null && this.TZhsqVolunteerActivityId.trim().length > 0) {
              this.tZhsqVolunteerActivityForm.id = this.TZhsqVolunteerActivityId;
              updateTZhsqVolunteerActivity(this.tZhsqVolunteerActivityForm).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.message);
                }
              }).finally(res => {
                this.loading = false;
              })
            } else {
              addTZhsqVolunteerActivity(this.tZhsqVolunteerActivityForm).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.message);
                }
              }).finally(res => {
                this.loading = false;
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
        this.tZhsqVolunteerActivityForm = {
          name: '',
          activitiyAddress: '',
          startDate1: '',
          endDate1: '',
          organizer: '',
          participant: '',
          activityProfile: '',
          position: '',
          orderNumber: 1,
        };
      },
      getTZhsqVolunteerActivityFormRule() {
        var _this = this;
        return {
          name: [
            {required: true, message: '活动名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          activitiyAddress: [
            {required: true, message: '活动地址不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          startDate1: [
            {required: true, message: '活动开始时间不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          endDate1: [
            {required: true, message: '活动结束时间不能为空！', trigger: 'blur', pattern: /.+/},
            // {validator: _this.validateEndDate, trigger: 'blur'}
          ],
          organizer: [
            {required: true, message: '组织者不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          // participant: [
          //     {required: true, message: '参与志愿者不能为空！', trigger: 'blur', pattern: /.+/},
          // ],
          activityProfile: [
            {required: true, message: '活动简介不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          // position: [
          //     {required: true, message: '地图标注不能为空！', trigger: 'blur'},
          //     {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          // ],

        }
      }
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
                if (res.data.startDate1 != '') {
                  this.tZhsqVolunteerActivityForm.startDate1 = formartDate(new Date(res.data.startDate1).getTime(), 'yyyy-MM-dd');
                }
                if (res.data.endDate1 != '') {
                  this.tZhsqVolunteerActivityForm.endDate1 = formartDate(new Date(res.data.endDate1).getTime(), 'yyyy-MM-dd');
                }
                this.tZhsqVolunteerActivityForm.organizer = res.data.organizer;

                if (res.data.participant) {
                  let strings = res.data.participant.split(',');
                  this.tZhsqVolunteerActivityForm.participantArr = strings;
                } else {
                  this.tZhsqVolunteerActivityForm.participantArr = [];
                }
                this.tZhsqVolunteerActivityForm.activityProfile = res.data.activityProfile;
                this.tZhsqVolunteerActivityForm.position = res.data.position;
                this.tZhsqVolunteerActivityForm.orderNumber = res.data.orderNumber;
                queryAllList({state: "1"}).then(res => {
                  if (res && res.success) {
                    this.participantPriority = res.data;
                  }
                })
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
