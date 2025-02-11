<style lang="less">
  .tZhsqGridMemberLook {
    .noImg {
      width: 80px;
      height: 100px;
      border: 1px dashed rgb(204, 204, 204);
      margin: 10px 0 0 30px;
      line-height: 93px;
      text-align: center;
      color: #ccc;
      user-select: none;
      height: 93px;
    }

    .img {
      width: 85px;
      margin-top: 10px;
      border: 1px dashed #ccc;
      padding: 2px;
      display: block;
      height: 93px;
    }

    .ivu-form-item {
      margin-bottom: 0px !important;
    }

    .ivu-form-item .ivu-form-item-content .item_span {
      width: 700px;
      margin-top: 6px;
      line-height: 150%;
      height: 40px !important;
      word-break: break-all;
      overflow-x: hidden;
      overflow-y: auto;
      border: 1px solid rgb(222, 222, 222);
    }

    .ivu-form-item-label {
      width: 120px !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="900" height="600" class="tZhsqGridMemberLook">
    <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">基本信息</Divider>
    <Form ref="tZhsqGridMemberForm" :model="tZhsqGridMemberForm" :label-width="90">
      <Row>
        <Col span="8">
          <Row>
            <FormItem label="姓名" prop="name">
              {{tZhsqGridMemberForm.name}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="政治面貌" prop="type">
              {{tZhsqGridMemberForm.type}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="手机号" prop="phone">
              {{tZhsqGridMemberForm.phone}}
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <Row>
            <FormItem label="性别" prop="sex">
              {{tZhsqGridMemberForm.sex}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="民族" prop="nation">
              {{tZhsqGridMemberForm.nation}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="身份证号" prop="idCard">
              {{tZhsqGridMemberForm.idCard}}
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <FormItem label="头像">
<!--            <div v-if="tZhsqGridMemberForm.headPortrait" v-viewer="{movable: true}">-->
<!--              <img :src="tZhsqGridMemberForm.headPortrait" class="img">-->
<!--            </div>-->
<!--            <div class="noImg" v-if="!tZhsqGridMemberForm.headPortrait">暂无头像</div>-->
            <div v-viewer="{movable: true}">
              <img v-if="tZhsqGridMemberForm.headPortrait" :src="tZhsqGridMemberForm.headPortrait" class="img">
              <img v-else src="/img/tx_wzp2.png" class="img">
            </div>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="个人简介" prop="personalProfile">
            <p class="item_span">
              {{tZhsqGridMemberForm.personalProfile}}
            </p>
          </FormItem>
        </Col>
      </Row>
      <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">部门&岗位</Divider>
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="houseStreet">
            {{tZhsqGridMemberForm.streetName}}
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="所属社区" prop="houseCommunity">
            {{tZhsqGridMemberForm.communityName}}
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="所属岗位" prop="post">
            {{tZhsqGridMemberForm.post}}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="所属网格" prop="grid">
            {{tZhsqGridMemberForm.grid}}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="职责范畴" prop="responsibilities">
            <p class="item_span">
              {{tZhsqGridMemberForm.responsibilities}}
            </p>
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
    import {
        addTZhsqGridMember,
        updateTZhsqGridMember,
        getTZhsqGridMember
    } from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
    import {getDictDataByType} from '@/api/index';
    import {nginxUrl} from '@/api/tools/tool'
    import {queryAllList as gridsQueryAllList} from '@/api/zhsq/basicGrids/basicGrids'
    import {
        gridMemberLevel,
        politicalData,
        postData,
        departmentData,
        sexData,
        nationData,
        streetData,
        communityData
    } from '@/api/tools/zhsqSelectData'
    import {getCommunity, getDictionary, getStreet} from "../../../api";

    export default {
        name: "updateTZhsqGridMember",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            TZhsqGridMemberId: {
                type: String
            },
            modalTitle: {
                type: String
            },
            tabPaneTitle: {
                type: String
            }
        },
        data() {
            return {
                show: this.value,
                editTitle: this.modalTitle,
                loading: false,
                disabled: false,
                tZhsqGridMemberForm: {
                    name: '',
                    type: '',
                    nation: '',
                    sex: '',
                    idCard: '',
                    phone: '',
                    personalProfile: '',
                    headPortrait: '',
                    streetName: '',
                    communityName: '',
                    grid: [],
                    post: '',
                    responsibilities: '',
                },
                //性别下拉数据
                sexArr: [],
                //民族下拉数据
                nationArr: [],
                //部门下拉数据
                departmentArr: [],
                //政治面貌下拉数据
                politicalArr: [],
                //岗位下拉数据
                postArr: [],
                //级别下拉数据
                gridMemberLevelArr: [],
                //街道下拉数据
                streetArr: [],
                //社区下拉数据
                communityArr: [],
                gridPriority: [],//所属网格
                imageUrlList: [],
                imageIsUpdate: false,
            }
        },
        methods: {
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.imageUrlList = [];
                this.imageIsUpdate = false;
                this.tZhsqGridMemberForm = {
                    name: '',
                    type: '',
                    sex: '',
                    nation: '',
                    idCard: '',
                    phone: '',
                    personalProfile: '',
                    headPortrait: '',
                    streetName: '',
                    communityName: '',
                    post: '',
                    grid: [],
                    // postLevel:'',
                    responsibilities: '',
                };
            },
            initSelectData() {
                //民族下拉数据
                getDictionary({fieldName: 'nationData'}).then(res => {
                    if (res && res.success) {
                        this.nationArr = res.data;
                    }
                });

                //政治面貌下拉数据
                getDictionary({fieldName: 'politicalData'}).then(res => {
                    if (res && res.success) {
                        this.politicalArr = res.data;
                    }
                });
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (val) {
                    this.initForm();
                    this.initSelectData();
                    this.$refs['tZhsqGridMemberForm'].resetFields();
                    if (this.TZhsqGridMemberId != null && this.TZhsqGridMemberId.trim().length > 0) {
                        getTZhsqGridMember({id: this.TZhsqGridMemberId}).then(res => {
                            if (res && res.code == 200) {
                                this.tZhsqGridMemberForm.name = res.data.name;

                                let filter = this.politicalArr.filter(item => item.number == res.data.type);
                                if (filter && filter.length > 0) {
                                    this.tZhsqGridMemberForm.type = filter[0].name;
                                }
                                this.tZhsqGridMemberForm.sex = res.data.sex;
                                filter = this.nationArr.filter(item => item.number == res.data.nation);
                                if (filter && filter.length > 0) {
                                    this.tZhsqGridMemberForm.nation = filter[0].name;
                                }
                                this.tZhsqGridMemberForm.idCard = res.data.idCard;
                                this.tZhsqGridMemberForm.phone = res.data.phone;
                                this.tZhsqGridMemberForm.personalProfile = res.data.personalProfile;
                                this.tZhsqGridMemberForm.headPortrait = res.data.headPortrait;
                                this.tZhsqGridMemberForm.streetName = res.data.streetName;
                                this.tZhsqGridMemberForm.communityName = res.data.communityName;
                                this.tZhsqGridMemberForm.post = res.data.post;
                                this.tZhsqGridMemberForm.responsibilities = res.data.responsibilities;
                                if (res.data.gridsPersonGrids) {
                                    let tempArr = "";
                                    res.data.gridsPersonGrids.forEach(function (item, index) {
                                        tempArr += "," + item.gridsName;
                                    });
                                    if(tempArr != ""){
                                        tempArr = tempArr.substring(1);
                                    }
                                    this.tZhsqGridMemberForm.grid = tempArr;
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
