<style lang="less">
  .epidemicReport {
    .ivu-modal {
      width: 700px !important;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="epidemicReport">
    <Form ref="epidemicReportForm" :model="epidemicReportForm" label-position="right" :label-width="120">
      <Row>
        <Col span="12">
          <FormItem label="姓名" prop="personName">
                {{epidemicReportForm.personName}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="身份证号" prop="personIdCard">
            {{epidemicReportForm.personIdCard}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="电话号码" prop="personMobile">
            {{epidemicReportForm.personMobile}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="申报人身份" prop="personIdentity">
            {{epidemicReportForm.personIdentity}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="从事行业" prop="personIndustry">
            {{epidemicReportForm.personIndustry}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="备用手机号" prop="spareMobile">
            {{epidemicReportForm.spareMobile}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="来源地" prop="personOrigin">
            {{epidemicReportForm.personOrigin}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="来源地省" prop="originProvince">
            {{epidemicReportForm.originProvince}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="来源地市" prop="originCity">
            {{epidemicReportForm.originCity}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="来源地区" prop="originArea">
            {{epidemicReportForm.originArea}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="来源地详细地址" prop="originAddress">
            {{epidemicReportForm.originAddress}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="到泸详细地址" prop="toAddress">
            {{epidemicReportForm.toAddress}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="到泸街道" prop="toStree">
            {{epidemicReportForm.toStree}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="到泸社区" prop="toCommunity">
            {{epidemicReportForm.toCommunity}}
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="12">
          <FormItem label="泸州本地联系人姓名" prop="contactPersonName">
            {{epidemicReportForm.contactPersonName}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="泸州本地联系人电话" prop="contactPersonMobile">
            {{epidemicReportForm.contactPersonMobile}}
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="12">
          <FormItem label="离开日期" prop="leaveDateTime">
            {{epidemicReportForm.leaveDateTime}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="到泸日期" prop="arriveDateTime">
            {{epidemicReportForm.arriveDateTime}}
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="12">
          <FormItem label="交通方式" prop="transportation">
            {{epidemicReportForm.transportation}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="健康码颜色" prop="healthCodeColor">
            {{epidemicReportForm.healthCodeColor}}
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="12">
          <FormItem label="承诺日期" prop="promiseDateTime">
            {{epidemicReportForm.promiseDateTime}}
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
    import {getEpidemicReport} from '@/api/zhsq/epidemicReport/epidemicReport'
    import {formartDate} from '@/api/tools/tool'

    export default {
        name: "updateEpidemicReport",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            EpidemicReportId: {
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
                loading: true,
                disabled: false,
                epidemicReportForm: {
                    personName: '',
                    personIdCard: '',
                    personMobile: '',
                    personIdentity: '',
                    personIndustry: '',
                    spareMobile: '',
                    personOrigin: '',
                    originProvince: '',
                    originCity: '',
                    originArea: '',
                    originAddress: '',
                    toAddress: '',
                    toStree: '',
                    contactPersonName: '',
                    contactPersonMobile: '',
                    leaveDateTime: '',
                    leaveDate: '',
                    arriveDateTime: '',
                    arriveDate: '',
                    transportation: '',
                    healthCodeColor: '',
                    promiseDateTime: '',
                    promiseDate: '',
                    toCommunity: '',
                },
            }
        },
        methods: {
            setLeaveDate(e) {
                this.epidemicReportForm.leaveDate = e;
            },
            setArriveDate(e) {
                this.epidemicReportForm.arriveDate = e;
            },
            setPromiseDate(e) {
                this.epidemicReportForm.promiseDate = e;
            },
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.epidemicReportForm = {
                    personName: '',
                    personIdCard: '',
                    personMobile: '',
                    personIdentity: '',
                    personIndustry: '',
                    spareMobile: '',
                    personOrigin: '',
                    originProvince: '',
                    originCity: '',
                    originArea: '',
                    originAddress: '',
                    toAddress: '',
                    toStree: '',
                    contactPersonName: '',
                    contactPersonMobile: '',
                    leaveDateTime: '',
                    leaveDate: '',
                    arriveDateTime: '',
                    arriveDate: '',
                    transportation: '',
                    healthCodeColor: '',
                    promiseDateTime: '',
                    promiseDate: '',
                    toCommunity: '',
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
                    this.$refs['epidemicReportForm'].resetFields();
                    if (this.EpidemicReportId != null && this.EpidemicReportId.trim().length > 0) {
                        getEpidemicReport({id: this.EpidemicReportId}).then(res => {
                            if (res) {
                                if (res.code == 200) {
                                    this.epidemicReportForm.personName = res.data.personName;
                                    this.epidemicReportForm.personIdCard = res.data.personIdCard;
                                    this.epidemicReportForm.personMobile = res.data.personMobile;
                                    this.epidemicReportForm.personIdentity = res.data.personIdentity;
                                    this.epidemicReportForm.personIndustry = res.data.personIndustry;
                                    this.epidemicReportForm.spareMobile = res.data.spareMobile;
                                    this.epidemicReportForm.personOrigin = res.data.personOrigin;
                                    this.epidemicReportForm.originProvince = res.data.originProvince;
                                    this.epidemicReportForm.originCity = res.data.originCity;
                                    this.epidemicReportForm.originArea = res.data.originArea;
                                    this.epidemicReportForm.originAddress = res.data.originAddress;
                                    this.epidemicReportForm.toAddress = res.data.toAddress;
                                    this.epidemicReportForm.toStree = res.data.toStree;
                                    this.epidemicReportForm.contactPersonName = res.data.contactPersonName;
                                    this.epidemicReportForm.contactPersonMobile = res.data.contactPersonMobile;
                                    if (res.data.leaveDate != '') {
                                        this.epidemicReportForm.leaveDateTime = formartDate(new Date(res.data.leaveDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
                                        this.epidemicReportForm.leaveDate = formartDate(new Date(res.data.leaveDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
                                    }
                                    if (res.data.arriveDate != '') {
                                        this.epidemicReportForm.arriveDateTime = formartDate(new Date(res.data.arriveDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
                                        this.epidemicReportForm.arriveDate = formartDate(new Date(res.data.arriveDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
                                    }
                                    this.epidemicReportForm.transportation = res.data.transportation;
                                    this.epidemicReportForm.healthCodeColor = res.data.healthCodeColor;
                                    if (res.data.promiseDate != '') {
                                        this.epidemicReportForm.promiseDateTime = formartDate(new Date(res.data.promiseDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
                                        this.epidemicReportForm.promiseDate = formartDate(new Date(res.data.promiseDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
                                    }
                                    this.epidemicReportForm.toCommunity = res.data.toCommunity;
                                } else {
                                    this.$Message.error(res.msg);
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
