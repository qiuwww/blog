<style lang="less">
  .lookHouseWithPerson {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #3e3e3e;
    line-height: 20px;
    .ivu-form {
      .ivu-form-item-label {
        padding-top: 3px;
      }
      .ivu-form-item-content {
        line-height: 20px;
        width: 141px;
      }
      .ivu-col {
        height: 50px;
      }
    }
    .ivu-col {
      height: 40px;
    }

    .ivu-table-tip {
      overflow-x: hidden !important;
    }

    .ivu-modal-footer {
      display: block;
    }

    .ModalDiv::-webkit-scrollbar {
      display: none;
    }

    .ModalDiv {
      scrollbar-width: none;
    }

    .lookHouseLeft {
      width: 100px;
      height: 100%;
      background: #f8f9fa;
      border-radius: 0px 12px 0px 12px;
      float: left;
      padding: 10px;
      height: 742px;
      margin-top: 0px;
      .personType {
        padding-top: 14px;
        .personData {
          margin-bottom: 10px;
          height: 28px;
          cursor: pointer;
          line-height: 28px;
          text-align: center;
        }
        .personData:hover,.personDataSelect {
          background: #3083f2;
          border-radius: 14px;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }

    .lookHouseRight {
      width: calc(100% - 100px);
      float: right;
      padding: 10px;
      max-height: 760px;

      .basicPersonInfoForm {
        .ivu-col {
          height: 60px;
        }
      }

      .rowLabel {
        height: 28px;
        background: #f9fafc;
        font-size: 13px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #3e3e3e;
        line-height: 28px;
        padding-left: 20px;
      }

      .rowValue {
        height: 28px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #3e3e3e;
        line-height: 28px;
        padding-left: 20px;
      }
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="lookHouseWithPerson" :draggable="false"
         width="860">
    <div style="max-height:800px;overflow-y:auto;overflow-x:hidden;" class="ModalDiv">

      <div class="lookHouseLeft">
        <div class="personType" v-if="personData.length>0">

          <Row  class="personData"  :class="{'personDataSelect':item.id==BasicPersonId}"   v-for="(item,i) in personData" style="margin-left: 5px;" @click.native="personClick(item.id)">
             {{item.name}}
          </Row>
        </div>
        <div v-else> 此房屋下暂时未绑定人口</div>
      </div>
      <div class="lookHouseRight">
        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">房屋信息</Divider>
        <Form ref="basicHousingManageForm" :model="basicHousingManageForm" :label-width="70">
          <Row>
            <Col span="8">
              <FormItem label="所属社区">
                {{ basicHousingManageForm.houseCommunity }}
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="所属网格">
                {{ basicHousingManageForm.houseGrid }}
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="所属小区">
                {{ basicHousingManageForm.houseName }}
              </FormItem>
            </Col>
          </Row>
          <Row>

            <Col span="8">
              <FormItem label="楼栋号">
                {{ basicHousingManageForm.buildArchiveName }}
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="单元">
                {{ basicHousingManageForm.unit + "单元" }}
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="房屋号">
                {{ basicHousingManageForm.doorNumber + "号" }}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">人口信息</Divider>
        <Form ref="basicPersonInfoForm" :model="basicPersonInfoForm" class="basicPersonInfoForm">
          <Row>
            <Col span="8">
              <Row class="rowLabel">现居住人姓名</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.name }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">与房主关系</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.accRelation }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">性别</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.sex }}</Row>
            </Col>

          </Row>
          <Row>
            <Col span="8">
              <Row class="rowLabel">身份证号</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.cardId }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">联系电话</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.phone }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">民族</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.nation }}</Row>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Row class="rowLabel">政治面貌</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.politicalFace }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">党员关系管理地</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.partyRelationshipManagemen }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel"><span v-if="basicPersonInfoForm.partyRelationshipManagemen=='非本社区'">党员关系管理地址</span>
              </Row>
              <Row class="rowValue"><span v-if="basicPersonInfoForm.partyRelationshipManagemen=='非本社区'">{{ basicPersonInfoForm.partyRelationshipManagemenAddress }}</span>
              </Row>
            </Col>
          </Row>
          <Row>
            <Row class="rowLabel">人群标签</Row>
            <Row class="rowValue">{{ basicPersonInfoForm.tableType }}</Row>
          </Row>
          <Row>
            <Col span="8">
              <Row class="rowLabel">人口类型</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.personType }}</Row>
            </Col>
            <Col span="16">
              <Row class="rowLabel">特殊人群</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.specialPopulation }}</Row>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Row class="rowLabel">工作单位</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.workAddress }}</Row>
            </Col>
            <Col span="16">
              <Row class="rowLabel">职业</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.occupation }}</Row>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Row class="rowLabel">宗教信仰</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.religiousBelief }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">婚姻状况</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.maritalStatus }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">兵役情况</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.militaryService }}</Row>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Row class="rowLabel">是否优抚对象</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.isPreferentialTreatment }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">是否失独</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.isLonely }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">是否低保</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.isMinimumLiving }}</Row>
            </Col>
          </Row>
          <Row>
            <Row class="rowLabel">现患大病详细</Row>
            <Row class="rowValue">{{ basicPersonInfoForm.seriousIllness }}</Row>
          </Row>
          <Row>
            <Col span="8">
              <Row class="rowLabel">是否残疾人</Row>
              <Row class="rowValue">{{ basicPersonInfoForm.isDisabled }}</Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">
                 <span v-if="basicPersonInfoForm.isDisabled=='是'">伤残类型</span>
              </Row>
              <Row class="rowValue">
                 <span v-if="basicPersonInfoForm.isDisabled=='是'">{{ basicPersonInfoForm.disabilityType }}</span>
              </Row>
            </Col>
            <Col span="8">
              <Row class="rowLabel">
                 <span v-if="basicPersonInfoForm.isDisabled=='是'">伤残等级</span>
              </Row>
              <Row class="rowValue">
                 <span v-if="basicPersonInfoForm.isDisabled=='是'">{{ basicPersonInfoForm.disabilityLevel }}</span>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
  import {getBasicHousingManage} from '@/api/zhsq/baseHouseManage/basicHousingManage'
  import {getPersonByHouseId, getBasicPerson} from '@/api/zhsq/basicPerson/basicPerson'
  import {getDictionary, getCrowdTags} from '@/api/index';

  export default {
    name: 'lookHouseWithPerson',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      BasicHousingManageId: {
        type: String
      },
      modalTitle: {
        type: String
      },
      updateModelShow: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        updateShow: false,
        isSettleShow: false,
        title: "",
        BasicPersonId: '',
        personShow: false,
        data: [],
        personData: [],
        isRenter: false,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        // 民族
        nationData: [],
        // 人口类型
        personTypeData: [],
        // 政治面貌
        politicalData: [],
        // 街道
        streetData: [],
        // 社区
        communityData: [],
        // 网格
        gridData: [],
        // 是否特殊人群
        specialPersonData: [],
        // 与户主关系
        relationShipData: [],
        // 档案类别
        tableTypeData: [],
        //党员管理地
        partyRelationshipManagemen: [],
        //兵役情况
        militaryService: [],
        //婚姻状况
        maritalStatus: [],
        //宗教信仰
        religiousBelief: [],
        // 爱好
        hobbyData: [],
        // 户别
        accTypeData: [],
        basicHousingManageForm: {
          houseStreet: '',
          houseCommunity: '',
          houseGridId: '',
          houseGrid: '',
          streetNumber: 0,
          houseId: '',
          houseName: '',
          houseAddress: '',
          hostName: '',
          hostCard: '',
          houseType: '',
          buildArchiveId: '',
          buildArchiveName: '',
          doorNumber: '',
          unit: '',
          floor: 0,
          accName: '',
          accType: '',
          accNumber: '',
          accRelation: '',
          accCard: '',
          houseClassification: '',
          hostGender: '',
          hostPermanentAddress: '',
          houseNature: '',
          houseNatureDescribe: '',
          hostCurrentAddress: '',
          haveProperty: '-',
          hostContact: '',
          isSettle: ''
        },
        basicPersonInfoForm: {
          name: '-',
          sex: '-',
          birthDate: '-',
          nation: '-',
          cardId: '-',
          personType: '-',
          politicalFace: '-',
          residenceAddress: '-',
          residentialAddress: '-',
          streetName: '-',
          streetId: '-',
          communityId: '-',
          communityName: '-',
          ownedGrid: '-',
          ownedHousing: '-',
          specialPopulation: '-',
          residentGrid: '-',
          housingName: '-',
          relationship: '-',
          houseTyp: '-',
          imgPath: '-',
          accName: '-',
          accNumber: '-',
          accType: '-',
          accCard: '-',
          phone: '-',
          accRelation: '-',
          tableTypes: [],
          tableType:'',
          workAddress: '-',
          occupation: '-',
          religiousBelief: '-',
          maritalStatus: '-',
          militaryService: '-',
          isPreferentialTreatment: '-',
          isLonely: '-',
          isMinimumLiving: '-',
          seriousIllness: '-',
          isDisabled: '-',
          disabilityLevel: '-',
          disabilityType: '-',
          partyRelationshipManagemen: '-',
          partyRelationshipManagemenAddress: '-',
          politicCountenance: '-',
        },
      }
    },
    methods: {
      //根据房屋找人
      loadPersonData(hId) {
        if (hId) {
          var _this = this;
          getPersonByHouseId({houseId: hId}).then(res => {
            if (res && res.success) {
              _this.data = res.data;
              _this.personData = JSON.parse(JSON.stringify(res.data));
              if (_this.personData && _this.personData.length > 0) {
                _this.personClick(_this.personData[0].id)
              }

            }
          })
        }
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.basicHousingManageForm = {
          houseStreet: '',
          houseCommunity: '',
          houseGridId: '',
          houseGrid: '',
          streetNumber: 0,
          houseId: '',
          houseName: '',
          houseAddress: '',
          hostName: '',
          hostCard: '',
          houseType: '',
          buildArchiveId: '',
          buildArchiveName: '',
          doorNumber: '',
          unit: '',
          floor: 0,
          area: '',
          houseProperty: '',
          houseForm: '',
          accName: '',
          accType: '',
          accNumber: '',
          accRelation: '',
          accCard: '',
          isSettle: ''
        };
        this.basicPersonInfoForm = {
          name: '-',
          sex: '-',
          birthDate: '-',
          nation: '-',
          cardId: '-',
          personType: '-',
          politicalFace: '-',
          residenceAddress: '-',
          residentialAddress: '-',
          streetName: '-',
          streetId: '-',
          communityId: '-',
          communityName: '-',
          ownedGrid: '-',
          ownedHousing: '-',
          specialPopulation: '-',
          residentGrid: '-',
          housingName: '-',
          relationship: '-',
          houseTyp: '-',
          imgPath: '-',
          accName: '-',
          accNumber: '-',
          accType: '-',
          accCard: '-',
          phone: '-',
          accRelation: '-',
          tableTypes: [],
          workAddress: '-',
          occupation: '-',
          religiousBelief: '-',
          maritalStatus: '-',
          militaryService: '-',
          isPreferentialTreatment: '-',
          isLonely: '-',
          isMinimumLiving: '-',
          seriousIllness: '-',
          isDisabled: '-',
          disabilityLevel: '-',
          disabilityType: '-',
          partyRelationshipManagemen: '-',
          partyRelationshipManagemenAddress: '-',
          politicCountenance: '-',
          tableType:'-',
        };
      },
      //初始化房屋信息
      getBasicHousingManage() {
        getBasicHousingManage({id: this.BasicHousingManageId}).then(res => {
          if (res && res.code == 200) {
            this.basicHousingManageForm.houseStreet = res.data.houseStreet;
            this.basicHousingManageForm.houseCommunity = res.data.houseCommunity;
            this.basicHousingManageForm.houseGrid = res.data.houseGrid;
            this.basicHousingManageForm.houseGridId = res.data.houseGridId;
            this.basicHousingManageForm.houseName = res.data.houseName;
            this.basicHousingManageForm.houseId = res.data.houseId;
            this.basicHousingManageForm.buildArchiveId = res.data.buildArchiveId;
            this.basicHousingManageForm.buildArchiveName = res.data.buildArchiveName;
            this.basicHousingManageForm.unit = res.data.unit;
            this.basicHousingManageForm.floor = res.data.floor == "" ? res.data.floor : parseInt(res.data.floor);
            this.basicHousingManageForm.doorNumber = res.data.doorNumber;
            this.basicHousingManageForm.hostName = res.data.hostName;
            this.basicHousingManageForm.hostCard = res.data.hostCard;
            this.basicHousingManageForm.houseClassification = res.data.houseClassification;
            this.basicHousingManageForm.hostGender = res.data.hostGender;
            this.basicHousingManageForm.hostPermanentAddress = res.data.hostPermanentAddress;
            this.basicHousingManageForm.houseNature = res.data.houseNature;
            this.basicHousingManageForm.houseNatureDescribe = res.data.houseNatureDescribe;
            this.basicHousingManageForm.haveProperty = res.data.haveProperty;
            this.basicHousingManageForm.hostCurrentAddress = res.data.hostCurrentAddress;
            this.basicHousingManageForm.hostContact = res.data.hostContact;
            //房屋类型
            getDictionary({fieldName: 'houseType'}).then(resp => {
              if (resp && resp.success) {
                let temp = resp.data.filter(item => item.number == res.data.houseType);
                if (temp.length > 0) {
                  this.basicHousingManageForm.houseType = temp[0].name;
                }
              }
            })
            //房型
            getDictionary({fieldName: 'houseFormData'}).then(resp => {
              if (resp && resp.success) {
                let temp = resp.data.filter(item => item.number == res.data.houseForm);
                if (temp.length > 0) {
                  this.basicHousingManageForm.houseForm = temp[0].name;
                }
              }
            });
            //房屋分类
            getDictionary({fieldName: 'houseClassification'}).then(resp => {
              if (resp && resp.success) {
                let temp = resp.data.filter(item => item.number == res.data.houseClassification);
                if (temp.length > 0) {
                  this.basicHousingManageForm.houseClassification = temp[0].name;
                }
              }
            });
            //房屋性质
            getDictionary({fieldName: 'houseNature'}).then(resp => {
              if (resp && resp.success) {
                let temp = resp.data.filter(item => item.number == res.data.houseNature);
                if (temp.length > 0) {
                  this.basicHousingManageForm.houseNature = temp[0].name;
                }
              }
            });
            //房屋产权
            getDictionary({fieldName: 'housePropertyData'}).then(resp => {
              if (resp && resp.success) {
                let temp = resp.data.filter(item => item.number == res.data.houseProperty);
                if (temp.length > 0) {
                  this.basicHousingManageForm.houseProperty = temp[0].name;
                }
              }
            });
            if (res.data.area != null && res.data.area != "") {
              this.basicHousingManageForm.area = res.data.area;
            }
            this.basicHousingManageForm.houseAddress = res.data.houseAddress;

            if (res.data.isSettle == "是") {
              this.isSettleShow = true;
              this.basicHousingManageForm.accName = res.data.accName;
              this.basicHousingManageForm.accType = res.data.accType;
              //户别
              getDictionary({fieldName: 'accTypeData'}).then(resp => {
                if (resp && resp.success) {
                  let temp = resp.data.filter(item => item.number == res.data.accType);
                  if (temp.length > 0) {
                    this.basicHousingManageForm.accType = temp[0].name;
                  }
                }
              });
              this.basicHousingManageForm.accNumber = res.data.accNumber;
              this.basicHousingManageForm.accRelation = res.data.accRelation;
              this.basicHousingManageForm.accCard = res.data.accCard;
              this.basicHousingManageForm.isSettle = res.data.isSettle;
            } else {
              this.basicHousingManageForm.isSettle = "否";
            }
            this.loadPersonData(res.data.id);
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      personClick(id) {

        if(id==this.BasicPersonId){
          return;
        }
        this.BasicPersonId = id;
        let person = this.personData.filter(item => item.id == id)
        if (id && person) {
          getBasicPerson({id: id}).then(res => {
            if (res) {
              if (res && res.code == 200) {
                this.basicPersonInfoForm.name = res.data.name
                this.basicPersonInfoForm.sex = res.data.sex
                this.basicPersonInfoForm.birthDate = res.data.birthDate
                this.basicPersonInfoForm.imgPath = res.data.imgPath
                this.basicPersonInfoForm.workAddress = res.data.workAddress
                this.basicPersonInfoForm.occupation = res.data.occupation
                this.basicPersonInfoForm.religiousBelief = res.data.religiousBelief
                this.basicPersonInfoForm.militaryService = res.data.militaryService
                this.basicPersonInfoForm.isPreferentialTreatment = res.data.isPreferentialTreatment&&res.data.isPreferentialTreatment.trim().length!=0?res.data.isPreferentialTreatment.toString():"否"
                this.basicPersonInfoForm.isLonely = res.data.isLonely && res.data.isLonely.trim().length!=0?res.data.isLonely.toString():"否"
                this.basicPersonInfoForm.isMinimumLiving = res.data.isMinimumLiving&&res.data.isMinimumLiving.trim().length!=0?res.data.isMinimumLiving.toString():"否"
                this.basicPersonInfoForm.seriousIllness = res.data.seriousIllness?res.data.seriousIllness.toString():""
                this.basicPersonInfoForm.isDisabled = res.data.isDisabled&&res.data.isDisabled.trim().length!=0?res.data.isDisabled.toString():"否"
                this.basicPersonInfoForm.disabilityLevel = res.data.disabilityLevel
                this.basicPersonInfoForm.partyRelationshipManagemen = res.data.partyRelationshipManagemen
                this.basicPersonInfoForm.partyRelationshipManagemenAddress = res.data.partyRelationshipManagemenAddress
                this.basicPersonInfoForm.disabilityType = res.data.disabilityType
                this.basicPersonInfoForm.residentialAddress = res.data.residentialAddress
                this.basicPersonInfoForm.maritalStatus = res.data.maritalStatus
                this.basicPersonInfoForm.cardId = res.data.cardId
                this.basicPersonInfoForm.residenceAddress = res.data.residenceAddress
                this.basicPersonInfoForm.residentialAddress = res.data.residentialAddress
                this.basicPersonInfoForm.streetName = res.data.streetName
                this.basicPersonInfoForm.communityName = res.data.communityName
                this.basicPersonInfoForm.ownedGrid = res.data.ownedGrid
                this.basicPersonInfoForm.residentGrid = res.data.residentGrid&&res.data.residentGrid.trim().length!=0?res.data.residentGrid.toString():"否"
                this.basicPersonInfoForm.housingName = res.data.housingName
                this.basicPersonInfoForm.relationship = res.data.relationship
                this.basicPersonInfoForm.phone = res.data.phone
                // this.basicPersonInfoForm.tableType = res.data.tableType
                // 民族
                getDictionary({fieldName: 'nationData'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.nation)
                    if (temp && temp.length > 0) {
                      this.basicPersonInfoForm.nation = temp[0].name
                    }
                  }
                })
                // 政治面貌
                getDictionary({fieldName: 'politicalData'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    if (resp.data) {
                      let temp = resp.data.filter(item => item.number == res.data.politicalFace)
                      if (temp && temp.length > 0) {
                        this.basicPersonInfoForm.politicalFace = temp[0].name
                      }
                    }

                  }
                })
                // 是否特殊人群
                getDictionary({fieldName: 'specialPersonData'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.specialPopulation)
                    if (temp && temp.length > 0) {
                      this.basicPersonInfoForm.specialPopulation = temp[0].name
                    }
                  }
                })
                //人员类型
                getDictionary({fieldName: 'personTypeDatas'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.personType)
                    if (temp && temp.length > 0) {
                      this.basicPersonInfoForm.personType = temp[0].name
                    }
                  }
                })

                // 爱好
                if (res.data.hobby) {
                  getDictionary({fieldName: 'hobbyData'}).then(resp => {
                    if (resp && resp.success && resp.data && resp.data.length > 0) {
                      const parse = JSON.parse(res.data.hobby)
                      this.basicPersonInfoForm.hobby = ''
                      for (let i = 0; i < parse.length; i++) {
                        const filter = resp.data.filter(item => item.number.toString() == parse[i].toString())
                        if (filter && filter.length > 0) {
                          this.basicPersonInfoForm.hobby += ',' + filter[0].name
                        }
                      }
                      if (this.basicPersonInfoForm.hobby != '') {
                        this.basicPersonInfoForm.hobby = this.basicPersonInfoForm.hobby.substring(1)
                      }
                    }
                  })
                }
                // 人群标签
                if (res.data.tableType) {
                  getCrowdTags().then(resp => {
                    if (resp && resp.success && resp.data && resp.data.length > 0) {
                      this.basicPersonInfoForm.tableType = ''
                      let filter = resp.data.filter(item => res.data.tableType.indexOf(item.id)>-1)
                      if (filter && filter.length > 0) {
                        for (let i = 0; i < filter.length; i++) {
                          if (i == 0) {
                            this.basicPersonInfoForm.tableType = filter[i].name
                          } else {
                            this.basicPersonInfoForm.tableType += ',' + filter[i].name
                          }
                        }
                      }
                    }
                  })
                }
                // 与户主关系
                getDictionary({fieldName: 'relationShipData'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    this.relationShipData = resp.data
                    // 与户主关系
                    const temp = this.relationShipData.filter(item => item.number == person[0].relationShip)
                    if (temp.length > 0) {
                      this.basicPersonInfoForm.accRelation = temp[0].name
                    }
                  }
                })


                // 宗教信仰
                getDictionary({fieldName: 'religiousData'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.religiousBelief)
                    if (temp && temp.length > 0) {
                      this.basicPersonInfoForm.religiousBelief = temp[0].name
                    }

                  }
                })
                // 婚姻状况
                getDictionary({fieldName: 'maritalStatus'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.maritalStatus)
                    if (temp && temp.length > 0) {
                      this.basicPersonInfoForm.maritalStatus = temp[0].name
                    }
                  }
                })
                // 兵役情况
                getDictionary({fieldName: 'militaryService'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {

                    let temp = resp.data.filter(item => item.number == res.data.militaryService)
                    if (temp && temp.length > 0) {
                      this.basicPersonInfoForm.militaryService = temp[0].name
                    }
                  }
                })
                // 党员关系管理地
                getDictionary({fieldName: 'partyRelationshipManagemen'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.partyRelationshipManagemen)
                    if (temp && temp.length > 0) {
                      this.basicPersonInfoForm.partyRelationshipManagemen = temp[0].name
                    }
                  }
                })
              } else {
                this.$Message.error(res.message)
              }
            }

          })
        }
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.isSettleShow = false;
        this.loading = false;
        this.updateShow = false;
        this.editTitle = this.modalTitle;
        if (val) {
          this.$refs['basicHousingManageForm'].resetFields();
          if (this.BasicHousingManageId != null && this.BasicHousingManageId.trim().length > 0) {
            this.getBasicHousingManage();
          }
        } else {
          this.closeModal(val);
        }
      }
    }
  }
</script>
