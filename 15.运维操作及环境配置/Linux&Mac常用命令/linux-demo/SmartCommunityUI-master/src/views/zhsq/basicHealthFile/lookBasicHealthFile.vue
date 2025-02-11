<style lang="less">
  .basicHealthFileLook {
    .ivu-modal {
      width: 660px !important;
      top: 50%;
      transform: translateY(-50%);
    }

    .ivu-form-item {
      margin-bottom: 0px !important;
    }

    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 180px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }

    .ivu-form-item .ivu-form-item-content .item_span {
      margin-top: 6px;
      width: 550px;
      height: 40px !important;
      overflow: auto;
      overflow-x: hidden;
      line-height: 150%;
      border: 0px solid rgb(222, 222, 222);
    }

    .imgWrap {
      margin-left: 68px !important;
    }

    .noImg {
      border: 1px dashed #cccccc;
      //margin-left: 68px;
      height: 93px;
      line-height: 93px;
      margin-top: 10px;
      text-align: center;
      color: #ccc;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      width: 160px;
      height: 116px;
      background: #f5f6f7;
      img{
        margin-left: 40px;
        margin-top: 10px;
      }
      .imgLabel{
        position: absolute;
        top: 56px;
        left: 72px;
      }
    }

    .img {
      width: 85px;
      /*margin-left: 110px;*/
      /*margin-top: 10px;*/
      /*border: 1px dashed #ccc;*/
      padding: 2px;
      display: block;
    }


  }
  .basicHealthFileLookBox{
    max-height:600px;
    overflow-y:auto;
    overflow-x:hidden;
    overflow:hidden;
  }
  .basicHealthFileLookBox:hover{
    overflow-y:scroll;
  }
  .basicHealthFileLookBox:hover::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .basicHealthFileLookBox:hover::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #535353;
  }
  .basicHealthFileLookBox:hover::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background   : #ededed;
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" draggable width="660">
    <div class="basicHealthFileLookBox">
      <Form ref="basicHealthFileForm" :model="basicHealthFileForm" class="basicHealthFileLook" :label-width="110">
        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">基本信息</Divider>
        <Row>
          <Col span="12">
            <Row>
              <FormItem label="姓名">
                {{basicHealthFileForm.personName}}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="性别">
                {{basicHealthFileForm.sex}}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="出生日期">
                {{basicHealthFileForm.birthDate}}
              </FormItem>
            </Row>
          </Col>

          <Col span="12">
            <Row>
              <FormItem label="身高">
                {{basicHealthFileForm.height}}厘米
              </FormItem>
            </Row>
            <Row>
              <FormItem label="体重">
                {{basicHealthFileForm.bodyWeight}}千克
              </FormItem>
            </Row>
            <Row>
              <FormItem label="血型">
                {{basicHealthFileForm.bloodType}}型
              </FormItem>
            </Row>
          </Col>
          <!--        <Col span="12">-->
          <!--          <Row>-->
          <!--            <FormItem label="腰围">-->
          <!--              {{basicHealthFileForm.waistline}}CM-->
          <!--            </FormItem>-->
          <!--          </Row>-->
          <!--          <Row>-->
          <!--            <FormItem label="视力">-->
          <!--              {{basicHealthFileForm.vision}}-->
          <!--            </FormItem>-->
          <!--          </Row>-->
          <!--          <Row>-->
          <!--            <FormItem label="血压">-->
          <!--              {{basicHealthFileForm.bloodPressure}}-->
          <!--            </FormItem>-->
          <!--          </Row>-->
          <!--        </Col>-->
        </Row>

        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">医疗信息</Divider>
        <Row>
          <Col span="24">
            <FormItem label="过敏反应">
              <p class="item_span">
                {{basicHealthFileForm.allergies}}
              </p>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="家族病史">
              <p class="item_span">
                {{basicHealthFileForm.familyHistory}}
              </p>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="既往病史">
              <p class="item_span">
                {{basicHealthFileForm.pastMedicalHistory}}
              </p>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="健康状态">
              <p class="item_span">
                {{basicHealthFileForm.healthStatus}}
              </p>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="当前用药">
              <p class="item_span">
                {{basicHealthFileForm.currentMedication}}
              </p>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="体检报告">
              <div v-if="imgShow" v-viewer="{movable: false}" class="imgWrap">
                <img :src="basicHealthFileForm.medicalReport" class="img">
              </div>
              <div class="noImg" v-if="divShow">
                <img src='/img/bg_mr2.png' class="img">
                <div class="imgLabel">
                  暂无图片
                </div>


              </div>
            </FormItem>
          </Col>
        </Row>

        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">生活史</Divider>
        <Row>
          <Col span="24">
            <FormItem label="抽烟情况">
              <p class="item_span">
                {{basicHealthFileForm.smokingStatus}}
              </p>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="饮酒情况">
              <p class="item_span">
                {{basicHealthFileForm.drinkingStatus}}
              </p>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="心理情况">
              <p class="item_span">
                {{basicHealthFileForm.psychologicalStatus}}
              </p>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="运动情况">
              <p class="item_span">
                {{basicHealthFileForm.movementStatus}}
              </p>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="饮食情况">
              <p class="item_span">
                {{basicHealthFileForm.dietStatus}}
              </p>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>

  </Modal>
</template>
<script>
    import {getBasicHealthFileByPersonId} from '@/api/zhsq/basicHealthFile/basicHealthFile'
    import {nginxUrl} from "../../../api/tools/tool";

    export default {
        name: "lookBasicHealthFile",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            BasicPersonId: {
                type: String
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                imgShow: false,
                divShow: true,
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                basicHealthFileForm: {
                    height: '未列明',
                    bodyWeight: '未列明',
                    bloodType: '未列明',
                    waistline: '未列明',
                    vision: '未列明',
                    bloodPressure: '未列明',
                    allergies: '',

                    personName: '',
                    sex: '',
                    birthDate: '',
                    familyHistory: '未列明',
                    pastMedicalHistory: '未列明',
                    healthStatus: '未列明',
                    currentMedication: '未列明',
                    medicalReport: '',
                    smokingStatus: '',
                    drinkingStatus: '',
                    psychologicalStatus: '',
                    movementStatus: '',
                    dietStatus: '',

                },
            }
        },
        methods: {
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.basicHealthFileForm = {
                  height: '-',
                  bodyWeight: '-',
                  bloodType: '-',
                  waistline: '未列明',
                  vision: '未列明',
                  bloodPressure: '未列明',
                  allergies: '',

                  personName: '',
                  sex: '',
                  birthDate: '',
                  familyHistory: '未列明',
                  pastMedicalHistory: '未列明',
                  healthStatus: '未列明',
                  currentMedication: '未列明',
                  medicalReport: '',
                  smokingStatus: '未列明',
                  drinkingStatus: '未列明',
                  psychologicalStatus: '未列明',
                  movementStatus: '未列明',
                  dietStatus: '未列明',
                };
            },
            //图片查看
            handleView() {
                const viewer = this.$el.querySelector('.imgWrap').$viewer;
                viewer.show()
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
                if (val) {
                    this.$refs['basicHealthFileForm'].resetFields();
                    if (this.BasicPersonId != null && this.BasicPersonId.trim().length > 0) {
                        getBasicHealthFileByPersonId({personId: this.BasicPersonId}).then(res => {
                            if (res && res.code == 200) {
                                if (res.data) {
                                    this.basicHealthFileForm = {
                                        height: res.data.height,
                                        bodyWeight: res.data.bodyWeight,
                                        bloodType: res.data.bloodType,
                                        waistline: res.data.waistline,
                                        vision: res.data.vision,
                                        bloodPressure: res.data.bloodPressure,
                                        allergies: res.data.allergies,

                                        personName: res.data.personName,
                                        sex: res.data.sex,
                                        birthDate: res.data.birthDate,
                                        familyHistory: res.data.familyHistory,
                                        pastMedicalHistory: res.data.pastMedicalHistory,
                                        healthStatus: res.data.healthStatus,
                                        currentMedication: res.data.currentMedication,
                                        medicalReport: res.data.medicalReport,
                                        smokingStatus: res.data.smokingStatus,
                                        drinkingStatus: res.data.drinkingStatus,
                                        psychologicalStatus: res.data.psychologicalStatus,
                                        movementStatus: res.data.movementStatus,
                                        dietStatus: res.data.dietStatus,
                                    };

                                    if (res.data.medicalReport != null && res.data.medicalReport != '') {
                                        this.imgShow = true;
                                        this.basicHealthFileForm.medicalReport = res.data.medicalReport;
                                    } else {
                                        this.divShow = true;
                                    }
                                }
                            } else {
                                this.$Message.error("查看健康档案：" + res.msg);
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
