<style lang="less" scoped>
  .basicPersonView {
    .ivu-form .ivu-form-item-label {
      width: 120px !important;
    }

    .ivu-form-item {
      margin-bottom: 0px !important;
    }

    .noImg {
      width: 85px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 130px;
      height: 93px;
      line-height: 93px;
      margin-top: 10px;
      text-align: center;
      color: #ccc;
      user-select: none;
    }

    .img {
      display: block;
      width: 85px;
      margin-left: 130px;
      margin-top: 10px;
      border: 1px dashed #ccc;
      padding: 2px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicPersonView" width="970">
    <Form ref="basicPersonForm" :model="basicPersonForm">
      <Row>
        <Col span="8">
          <Row>
            <FormItem label="姓名">
              {{basicPersonForm.name}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="性别">
              {{basicPersonForm.sex}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="出生日期">
              {{basicPersonForm.birthDate}}
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <Row>
            <FormItem label="民族">
              {{basicPersonForm.nation}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="身份证号">
              {{basicPersonForm.cardId}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="人口类型">
              {{basicPersonForm.personType}}
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <FormItem label="头像">
            <div v-if="basicPersonForm.imgPath" v-viewer="{movable: true}">
              <img :src="basicPersonForm.imgPath" class="img">
            </div>
            <div class="noImg" v-if="!basicPersonForm.imgPath">暂无头像</div>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem label="政治面貌">
            {{basicPersonForm.politicalFace}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="户籍地址">
            {{basicPersonForm.residenceAddress}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="居住地址">
            {{basicPersonForm.residentialAddress}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属街道">
            {{basicPersonForm.ownedStreet}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区">
            {{basicPersonForm.ownedCommunity}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="是否特殊人群">
            {{basicPersonForm.specialPopulation}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="是否常驻网格">
            {{basicPersonForm.residentGrid}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="档案类型">
            {{ basicPersonForm.tableType}}
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
    import {getBasicPerson} from '@/api/zhsq/basicPerson/basicPerson'
    import {
        houseType,
        streetData,
        tableTypeData
    } from '@/api/tools/zhsqSelectData'
    import {nginxUrl} from "../../../api/tools/tool";

    export default {
        name: "updateBasicPerson",
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
            },
            gridName: {
                type: String
            }
        },
        data() {
            return {
                divShow: false,
                imgShow: false,
                tableTypeData: tableTypeData,
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                basicPersonForm: {
                    name: '',
                    sex: '',
                    birthDate: '',
                    nation: '',
                    cardId: '',
                    personType: '',
                    politicalFace: '',
                    residenceAddress: '',
                    residentialAddress: '',
                    ownedStreet: '',
                    ownedCommunity: '',
                    ownedGrid: this.gridName,
                    ownedHousing: '',
                    specialPopulation: '',
                    residentGrid: '',
                    housingName: '',
                    relationship: '',
                    houseTyp: ''
                },
            }
        },
        methods: {
            //获取列表字段
            getBasicHousingManageColumns() {
                return [
                    {
                        title: '小区名称',
                        align: 'center',
                        key: 'houseName',
                        tooltip: true,
                        sortable: false
                    },
                    {
                        title: '房屋详址',
                        align: 'center',
                        key: 'houseAddress',
                        tooltip: true,
                        sortable: false
                    },
                    {
                        title: '房主姓名',
                        align: 'center',
                        key: 'hostName',
                        tooltip: true,
                        sortable: false
                    },
                    {
                        title: '房屋类型',
                        align: 'center',
                        key: 'houseType',
                        tooltip: true,
                        sortable: false
                    }, {
                        title: '与户主关系',
                        align: 'center',
                        key: 'relationship'
                    }
                ]
            },

            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.basicPersonForm = {
                    name: '',
                    sex: '',
                    birthDate: '',
                    nation: '',
                    cardId: '',
                    personType: '',
                    politicalFace: '',
                    residenceAddress: '',
                    residentialAddress: '',
                    ownedStreet: '',
                    ownedCommunity: '',
                    ownedGrid: '',
                    ownedHousing: '',
                    specialPopulation: '',
                    residentGrid: '',
                    housingName: '',
                    relationship: '',
                    houseTyp: '',
                    tableType: '',
                    imgPath: ''
                };
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.initForm();
                this.divShow = false;
                this.imgShow = false;
                this.loading = false;
                this.editTitle = this.modalTitle;
                this.streetData = streetData;
                this.houseType = houseType;
                if (val) {
                    this.$refs['basicPersonForm'].resetFields();
                    if (this.BasicPersonId != null && this.BasicPersonId.trim().length > 0) {
                        getBasicPerson({id: this.BasicPersonId}).then(res => {
                            if (res && res.code == 200) {
                                this.basicPersonForm.name = res.data.name;
                                this.basicPersonForm.sex = res.data.sex;
                                this.basicPersonForm.birthDate = res.data.birthDate;
                                this.basicPersonForm.nation = res.data.nation;
                                this.basicPersonForm.cardId = res.data.cardId;
                                this.basicPersonForm.imgPath = res.data.imgPath;
                                this.basicPersonForm.personType = res.data.personType;
                                this.basicPersonForm.politicalFace = res.data.politicalFace;
                                this.basicPersonForm.residenceAddress = res.data.residenceAddress;
                                this.basicPersonForm.residentialAddress = res.data.residentialAddress;
                                this.basicPersonForm.ownedStreet = res.data.ownedStreet;
                                this.basicPersonForm.ownedCommunity = res.data.ownedCommunity;
                                this.basicPersonForm.specialPopulation = res.data.specialPopulation;
                                this.basicPersonForm.residentGrid = res.data.residentGrid;
                                this.basicPersonForm.housingName = res.data.housingName;
                                this.basicPersonForm.relationship = res.data.relationship;
                                if (res.data.tableType) {
                                    this.tableTypeData.map(item => {
                                        if (item.name == res.data.tableType) {
                                            this.basicPersonForm.tableType = item.label;
                                        }
                                    })
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
