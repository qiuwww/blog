<style lang="less">
  .test {
    .ivu-modal-body {
      height: 500px;
      overflow-y: auto;
    }
    .tWorkOrder {
      margin-right: 10px;

      .mt-step {
        padding: 20px;
        margin: 0 20px;
      }

      .mt-content {
        width: 100%;
        border-radius: 10px;
        background: #F0F3F7;
        padding: 10px;

        .mt-card {
          margin-bottom: 10px;
        }

        .mt-left {
          width: 100%;
          border: 1px solid #CCCCCC;
          border-radius: 10px;

          .mt-left-title {
            border-bottom: 1px solid #CCCCCC;
            padding: 10px 10px 10px 4px;
            margin: 0 10px;
            font-weight: bold;
            font-size: 14px;
          }

          .mt-left-body {
            .ivu-form-item-content:nth-child(1) {
              width: 80%;
              height: 70px;
              overflow-x: hidden;
              overflow-y: auto;
            }

            .mt-act-img {
              padding: 10px;
              width: 100%;
              height: auto;

              img {
                width: 100%;
              }
            }
          }
        }

        .mt-right {
          padding: 16px;

          .mt-right-title {
            border-bottom: 1px solid #CCCCCC;
            padding: 10px 10px 10px 4px;
            margin: 0 10px;
            font-weight: bold;
            font-size: 14px;
          }

          .mt-right-body {
            padding: 10px;
            height: 36vh;
            overflow-x: hidden;
            overflow-y: auto;

            .ivu-timeline-item-head {
              color: #DFE4ED !important;
              background-color: #DFE4ED !important;
            }

            .ivu-timeline-item-head-blue {
              border-color: #F0F3F7 !important;
            }
          }
        }
      }

      ::-webkit-scrollbar {
        width: 4px;
        height: 10px;
      }

      ::-webkit-scrollbar-track {
        background: rgb(239, 239, 239);
        border-radius: 2px;
      }

      ::-webkit-scrollbar-thumb {
        background: #bfbfbf;
        border-radius: 10px;
      }

      .form-item-input {
        width: 200px;
      }

      .ivu-form-item {
        margin-bottom: 10px !important;
      }
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="900px" class="test">
    <div class="tWorkOrder">
      <Row class="mt-step">
        <Steps :current="current=='0'?0:parseInt(current) ">
          <Step v-for="(item,index) in status" :key="item.id" :title="item.label" :content="item.label"></Step>
        </Steps>
      </Row>
      <Row class="mt-content">
        <Col :span="16">
          <Card :bordered="false" class="mt-card">
            <div class="mt-left">
              <div class="mt-left-title">基本信息</div>
              <div class="mt-left-body">
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
              </div>
            </div>
          </Card>

          <Card :bordered="false" class="mt-card">
            <div class="mt-left">
              <div class="mt-left-title">实时流程图</div>
              <div class="mt-left-body">
                <div class="mt-act-img">
                  <img :src="imgUrl"/>
                  <!--                  <Spin size="large" fix v-if="loadingImg"></Spin>-->
                </div>
              </div>
            </div>
          </Card>

        </Col>
        <Col :span="8">
          <div class="mt-right">
            <div class="mt-right-title">事件信息</div>
            <div class="mt-right-body">
              <Timeline>
                <TimelineItem v-for="(item,i) in data" :key="item.id.toString()">
                  <p class="time">{{item.startTime}}</p>
                  <p class="content">{{item.deleteReason == null || item.deleteReason == ""
                    ?"提交":item.name+' : '+item.deleteReason}}</p>
                </TimelineItem>
              </Timeline>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <!--      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>-->
    </div>
  </Modal>
</template>
<script>
    import {getTWorkOrder} from '@/api/zhgw/tWorkOrder/tWorkOrder'
    import {getDictDataByType} from '@/api/index';
    import {historicFlow} from "@/api/zhgw/tWorkOrderTask/tWorkOrderTask"
    import {getHighlightImg} from "@/api/activiti";
    import {getToken} from "@/utils/auth.js"

    export default {
        name: "handleTWorkOrder",
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
            tStatus: {
                type: String
            }
        },
        data() {
            return {
                current: 0,
                imgUrl: "",
                data: [],
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                disabled: false,
                tWorkOrderForm: {
                    title: '',
                    number: '',
                    remarks: '',
                    type: '',
                    handlePerson: '',
                    time: '',
                    level: '',
                },
                type: [],
                level: [],
                status: []
            }
        },
        methods: {
            init() {
                this.imgUrl =
                    getHighlightImg +
                    this.procInstId +
                    "?accessToken=" +
                    getToken() +
                    "&time=" +
                    new Date();
            },
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
                getDictDataByType('work_order_status').then(res => {
                    if (res && res.success) {
                        if (res.data && res.data.length > 0) {
                            this.status = res.data;
                            res.data.map((item, index) => {
                                if (item.id == this.tStatus) {
                                    this.current = parseInt(item.value);
                                }
                            });
                        }
                    }
                });
            },
            getDataList() {
                this.loading = true;
                historicFlow({id: this.procInstId}).then(res => {
                    this.loading = false;
                    if (res && res.success) {
                        this.data = res.data;
                        if (!res.data || res.data.length == 0) {
                            this.$Modal.info({
                                title: "未找到该记录审批历史数据",
                                content: "历史数据可能已被删除"
                            });
                        }
                    }
                });
            },
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.tWorkOrderForm = {
                    title: '',
                    number: '',
                    remarks: '',
                    type: '',
                    handlePerson: '',
                    time: '',
                    level: '',
                };
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.init();
                this.getDataList();
                this.getTypePriority();
                this.initForm();
                this.current = parseInt(this.tStatus);
                this.loading = false;
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
