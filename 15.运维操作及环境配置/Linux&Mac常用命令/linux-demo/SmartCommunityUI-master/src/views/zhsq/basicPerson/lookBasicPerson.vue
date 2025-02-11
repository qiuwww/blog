<style lang="less">
  .basicPersonView {
    .ivu-input {
      width: 180px;
    }

    .ivu-form .ivu-row .ivu-form-item-label {
      width: 70px !important;
    }

    .ivu-form-item {
      margin-bottom: 0px !important;
    }

    .noImg {
      width: 85px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 120px;
      line-height: 93px;
      margin-top: 10px;
      text-align: center;
      color: #ccc;
      user-select: none;
      height: 100px;
    }

    .img {
      width: 85px;
      margin-top: 10px;
      border: 1px dashed #ccc;
      padding: 2px;
      display: block;
      height: 100px;
    }

    .ivu-table-tip {
      overflow-x: hidden !important;
    }

    .modalDiv {
      max-height: 750px;
      overflow-y: hidden;
      overflow-x: hidden;
    }

    .modalDiv:hover {
      overflow-y: scroll;
    }

    .modalDiv:hover::-webkit-scrollbar {
      display: none;
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }

    .modalDiv:hover::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }

    .modalDiv:hover::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }

    .modalDiv {
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
        width: 100%;
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
    .imgDiv{
      width: 130px;
      height: 142px;
      background: #f9fafc;
      padding: 20px;
      margin-left: 20px;
      padding-top: 10px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicPersonView" :draggable="false"
         width="650">
    <div class="modalDiv">
      <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">人员信息</Divider>
      <Form ref="basicPersonForm" :model="basicPersonForm">
        <Row>
          <Col span="8">
            <Row>
              <Row class="rowLabel">姓名</Row>
              <Row class="rowValue">{{ basicPersonForm.name }}</Row>
            </Row>
            <Row>
              <Row class="rowLabel">性别</Row>
              <Row class="rowValue">{{ basicPersonForm.sex }}</Row>
            </Row>
            <Row>
              <Row class="rowLabel">出生日期</Row>
              <Row class="rowValue">{{ basicPersonForm.birthDate }}</Row>
            </Row>
          </Col>
          <Col span="8">
            <Row>
              <Row class="rowLabel">民族</Row>
              <Row class="rowValue">{{ basicPersonForm.nation }}</Row>
            </Row>
            <Row>
              <Row class="rowLabel">身份证号</Row>
              <Row class="rowValue">{{ basicPersonForm.cardId }}</Row>
            </Row>
            <Row>
              <Row class="rowLabel">兴趣爱好</Row>
              <Row class="rowValue"><Tooltip :content=" basicPersonForm.hobby " transfer placement="bottom">{{basicPersonForm.hobby&& basicPersonForm.hobby.length>10?basicPersonForm.hobby.substring(0,10)+"...":basicPersonForm.hobby }}</Tooltip></Row>
            </Row>
          </Col>
          <Col span="8">
            <div v-viewer="{movable: true}" class="imgDiv">
              <img v-if="basicPersonForm.imgPath" :src="basicPersonForm.imgPath" class="img">
              <img v-else src="/img/tx_wzp2.png" class="img">
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <Row class="rowLabel">政治面貌</Row>
            <Row class="rowValue">{{ basicPersonForm.politicalFace }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">党员关系管理地</Row>
            <Row class="rowValue">{{ basicPersonForm.partyRelationshipManagemen }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel"><span v-if="basicPersonForm.partyRelationshipManagemen=='非本社区'">党员关系管理地址</span></Row>
            <Row class="rowValue"><span v-if="basicPersonForm.partyRelationshipManagemen=='非本社区'">{{ basicPersonForm.partyRelationshipManagemenAddress }}</span></Row>
          </Col>
        </Row>
        <Row>
          <Row class="rowLabel">人群标签</Row>
          <Row class="rowValue">{{ basicPersonForm.tableType }}</Row>
        </Row>
        <Row>
          <Col span="8">
            <Row class="rowLabel">人口类型</Row>
            <Row class="rowValue">{{ basicPersonForm.personType }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">特殊人群</Row>
            <Row class="rowValue">{{ basicPersonForm.specialPopulation }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">联系电话</Row>
            <Row class="rowValue">{{ basicPersonForm.phone }}</Row>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <Row class="rowLabel">所属街道</Row>
            <Row class="rowValue">{{ basicPersonForm.streetName }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">所属社区</Row>
            <Row class="rowValue">{{ basicPersonForm.communityName }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">所属网格</Row>
            <Row class="rowValue">{{ basicPersonForm.ownedGrid }}</Row>
          </Col>
        </Row>
        <Row>
          <Col span="16">
            <Row class="rowLabel">居住地址</Row>
            <Row class="rowValue">{{ basicPersonForm.residentialAddress }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">是否常驻网格</Row>
            <Row class="rowValue">{{ basicPersonForm.residentGrid }}</Row>
          </Col>

        </Row>
        <Row>
          <Col span="8">
            <Row class="rowLabel">工作单位</Row>
            <Row class="rowValue">{{ basicPersonForm.workAddress }}</Row>
          </Col>
          <Col span="16">
            <Row class="rowLabel">职业</Row>
            <Row class="rowValue">{{ basicPersonForm.occupation }}</Row>
          </Col>

        </Row>
        <Row>
          <Col span="8">
            <Row class="rowLabel">宗教信仰</Row>
            <Row class="rowValue">{{ basicPersonForm.religiousBelief }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">婚姻状况</Row>
            <Row class="rowValue">{{ basicPersonForm.maritalStatus }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">兵役情况</Row>
            <Row class="rowValue">{{ basicPersonForm.militaryService }}</Row>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <Row class="rowLabel">是否优抚对象</Row>
            <Row class="rowValue">{{ basicPersonForm.isPreferentialTreatment }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">是否失独</Row>
            <Row class="rowValue">{{ basicPersonForm.isLonely }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">是否低保</Row>
            <Row class="rowValue">{{ basicPersonForm.isMinimumLiving }}</Row>
          </Col>
        </Row>
        <Row>
          <Row class="rowLabel">现患大病详细</Row>
          <Row class="rowValue">{{ basicPersonForm.seriousIllness }}</Row>
        </Row>
        <Row>
          <Col span="8">
            <Row class="rowLabel">是否残疾人</Row>
            <Row class="rowValue">{{ basicPersonForm.isDisabled }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel"> <span v-if="basicPersonForm.isDisabled=='是'">伤残类型</span></Row>
            <Row class="rowValue"><span v-if="basicPersonForm.isDisabled=='是'">{{ basicPersonForm.disabilityType }}</span></Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel"><span v-if="basicPersonForm.isDisabled=='是'">伤残等级</span></Row>
            <Row class="rowValue"><span v-if="basicPersonForm.isDisabled=='是'">{{ basicPersonForm.disabilityLevel }}</span></Row>
          </Col>
        </Row>
        <Divider v-if="accShow" style="margin:0 auto;color:#2d8cf0;" orientation="left">户籍信息</Divider>
        <Row v-if="accShow">
          <Col span="8">
            <Row class="rowLabel">户号</Row>
            <Row class="rowValue">{{ basicPersonForm.accNumber }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">户别</Row>
            <Row class="rowValue">{{ basicPersonForm.accType }}</Row>
          </Col>
          <Col span="8">
            <Row class="rowLabel">户主姓名</Row>
            <Row class="rowValue">{{ basicPersonForm.accName }}</Row>
          </Col>

        </Row>
        <Row v-if="accShow">
          <Col span="8">
            <Row class="rowLabel">户主身份证号</Row>
            <Row class="rowValue">{{ basicPersonForm.accCard }}</Row>
          </Col>
          <Col span="16">
            <Row class="rowLabel">与户主关系</Row>
            <Row class="rowValue">{{ basicPersonForm.accRelation }}</Row>
          </Col>
        </Row>
        <Row v-if="accShow">
          <Col span="24">
            <Row class="rowLabel">户籍地址</Row>
            <Row class="rowValue">{{ basicPersonForm.residenceAddress }}</Row>
          </Col>
        </Row>
        <Form ref="formDynamic" :model="formDynamic"
              v-if="basicPersonForm.tableType && basicPersonForm.tableType.indexOf('老人')>-1" :label-width="70">
          <Divider style="margin-top: 0;color:#2d8cf0;" orientation="left">亲属信息</Divider>
          <Row v-for="(item, index) in formDynamic.items" v-if="item.status === 1" :key="index">
            <Col span="8">
              <FormItem label="姓名">
                {{ item.name }}
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="电话号码">
                {{ item.phone }}
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="关系" :label-width="60">
                {{ item.relationship }}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider style="margin-top: 0;color:#2d8cf0;" orientation="left">房屋信息</Divider>
        <!--房屋列表-->
        <Table
          ref="table"
          :loading="loading"
          stripe :columns="columns"
          :data="data"
          height="200"
          @on-row-dblclick="dblClick"
        />
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
  import {getBasicPerson} from '@/api/zhsq/basicPerson/basicPerson'
  import {getHouseByPersonId} from '@/api/zhsq/basicHouse/basicHouse'
  import {
    houseType,
    sexData, isOfternData
  } from '@/api/tools/zhsqSelectData'
  import {nginxUrl} from '../../../api/tools/tool'
  import {queryAllList} from '@/api/zhsq/basicGrids/basicGrids'
  import {getDictionary, getStreet, getCommunity,getCrowdTags} from '@/api/index'

  export default {
    name: 'LookBasicPerson',
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
        formDynamic: {
          items: []
        },
        imageUrlList: [],
        divShow: false,
        accShow: false,
        title: '',
        BasicHousingManageId: '',
        houseShow: false,
        // 档案类型
        tableTypeData: [],
        data: [],
        columns: this.getBasicHousingManageColumns(),
        sexData: sexData,
        isOfternData: isOfternData,
        // 民族
        nationData: [],
        personTypeData: [],
        politicalData: [],
        streetData: [],
        communityData: [],
        gridData: [],
        housingData: [],
        houseTypeData: [],
        specialPersonData: [],
        relationShipData: [],
        hobbyData: [],
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
          streetName: '',
          streetId: '',
          communityId: '',
          communityName: '',
          ownedGrid: '',
          ownedHousing: '',
          specialPopulation: '',
          residentGrid: '',
          housingName: '',
          relationship: '',
          houseTyp: '',
          imgPath: '',
          accName: '',
          accNumber: '',
          accType: '',
          accCard: '',
          phone: '',
          accRelation: '',
          tableTypes: [],
          workAddress: '',
          occupation: '',
          religiousBelief: '',
          maritalStatus: '',
          militaryService: '',
          isPreferentialTreatment: '',
          isLonely: '',
          isMinimumLiving: '',
          seriousIllness: '',
          isDisabled: '',
          disabilityLevel: '',
          disabilityType: '',
          partyRelationshipManagemen: '',
          partyRelationshipManagemenAddress: '',
          tableType: '',
        },
        gridsIdPriority: [],
        relationData: []
      }
    },
    watch: {
      value(val) {
        this.show = val
      },
      show(val) {
        this.initForm()
        this.imageUrlList = []
        this.divShow = false
        this.loading = false
        this.editTitle = this.modalTitle
        this.houseType = houseType

      }
    },
    methods: {
      // 街道
      getStreetData() {
        getStreet({}).then(res => {
          if (res && res.success) {
            this.streetData = res.data
          }
        })
      },
      dblClick(row) {
        this.houseShow = true
        this.BasicHousingManageId = row.id
        this.title = '房屋信息查看'
      },
      // 获取列表字段
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
            sortable: false,
            render: (h, param) => {
              if (param.row.houseType) {
                const tempArr = this.houseTypeData.filter(item => item.number.toString() === param.row.houseType.toString())
                if (tempArr.length > 0) {
                  return h('span', tempArr[0].name)
                } else {
                  return h('span', '暂无')
                }
              } else {
                return h('span', '暂无')
              }
            }
          }, {
            title: '与户主关系',
            align: 'center',
            key: 'relationship',
            render: (h, param) => {
              if (param.row.relationship) {
                const tempArr = this.relationShipData.filter(item => item.number.toString() === param.row.relationship.toString())
                if (tempArr.length > 0) {
                  return h('span', tempArr[0].name)
                } else {
                  return h('span', '暂无')
                }
              } else {
                return h('span', '暂无')
              }
            }
          }
        ]
      },

      closeModal(val) {
        this.$emit('input', val)
      },
      initForm() {
        this.accShow = false
        this.gridsIdPriority = []
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
          streetName: '',
          streetId: '',
          communityId: '',
          communityName: '',
          ownedGrid: '',
          ownedHousing: '',
          specialPopulation: '',
          residentGrid: '',
          housingName: '',
          relationship: '',
          houseTyp: '',
          tableType: '',
          imgPath: '',
          accName: '',
          accNumber: '',
          accType: '',
          accCard: '',
          accRelation: '',
          tableTypes: [],
        }
        // 加载老人亲属关系
        getDictionary({fieldName: 'relationShipData'}).then(res => {
          if (res && res.success) {
            this.relationData = res.data.filter(item => item.number != 1 && item.number != 3);
            this.initData();
          }
        })
      },

      //初始化数据
      initData(){
        if (this.show) {
          // this.$refs['basicPersonForm'].resetFields()
          queryAllList({}).then(res => {
            if (res && res.success) {
              for (let i = 0; i < res.data.length; i++) {
                this.gridsIdPriority.push({id: res.data[i].id, name: res.data[i].name})
              }
            }
          })
          if (this.BasicPersonId != null && this.BasicPersonId.trim().length > 0) {
            getBasicPerson({id: this.BasicPersonId}).then(res => {
              if (res && res.code == 200) {
                this.basicPersonForm.name = res.data.name
                this.basicPersonForm.sex = res.data.sex
                this.basicPersonForm.birthDate = res.data.birthDate
                this.basicPersonForm.imgPath = res.data.imgPath
                this.basicPersonForm.workAddress = res.data.workAddress
                this.basicPersonForm.occupation = res.data.occupation
                this.basicPersonForm.religiousBelief = res.data.religiousBelief
                this.basicPersonForm.militaryService = res.data.militaryService
                this.basicPersonForm.isPreferentialTreatment = res.data.isPreferentialTreatment&&res.data.isPreferentialTreatment.trim().length!=0?res.data.isPreferentialTreatment.toString():"否"
                this.basicPersonForm.isLonely = res.data.isLonely && res.data.isLonely.trim().length!=0?res.data.isLonely.toString():"否"
                this.basicPersonForm.isMinimumLiving = res.data.isMinimumLiving&&res.data.isMinimumLiving.trim().length!=0?res.data.isMinimumLiving.toString():"否"
                this.basicPersonForm.seriousIllness = res.data.seriousIllness?res.data.seriousIllness.toString():""
                this.basicPersonForm.isDisabled = res.data.isDisabled&&res.data.isDisabled.trim().length!=0?res.data.isDisabled.toString():"否"
                this.basicPersonForm.disabilityLevel = res.data.disabilityLevel
                this.basicPersonForm.partyRelationshipManagemen = res.data.partyRelationshipManagemen
                this.basicPersonForm.partyRelationshipManagemenAddress = res.data.partyRelationshipManagemenAddress
                this.basicPersonForm.disabilityType = res.data.disabilityType
                this.basicPersonForm.residentialAddress = res.data.residentialAddress
                this.basicPersonForm.maritalStatus = res.data.maritalStatus
                this.formDynamic.items = res.data.relativesList
                this.basicPersonForm.cardId = res.data.cardId
                this.basicPersonForm.residenceAddress = res.data.residenceAddress
                this.basicPersonForm.residentialAddress = res.data.residentialAddress
                this.basicPersonForm.streetName = res.data.streetName
                this.basicPersonForm.communityName = res.data.communityName
                this.basicPersonForm.ownedGrid = res.data.ownedGrid
                this.basicPersonForm.residentGrid = res.data.residentGrid&&res.data.residentGrid.trim().length!=0?res.data.residentGrid.toString():"否"
                this.basicPersonForm.housingName = res.data.housingName
                this.basicPersonForm.relationship = res.data.relationship
                this.basicPersonForm.phone = res.data.phone
                this.basicPersonForm.tableType = res.data.tableType

                if (this.formDynamic.items) {
                  for (let i = 0; i < this.formDynamic.items.length; i++) {
                    if (i == 0) {
                      this.formDynamic.items[i].flag = false
                    } else {
                      this.formDynamic.items[i].flag = true
                    }
                    this.formDynamic.items[i].status = 1
                    this.formDynamic.items[i].index = i + 1
                    // 亲属关系
                    const filter1 = this.relationData.filter(item => item.number == this.formDynamic.items[i].relationship)
                    if (filter1 && filter1.length > 0) {
                      this.formDynamic.items[i].relationship = filter1[0].name
                    }
                  }
                }

                // 房屋类型
                getDictionary({fieldName: 'houseType'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    this.houseTypeData = resp.data
                  }
                })
                // 民族
                getDictionary({fieldName: 'nationData'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.nation)
                    if(temp && temp.length>0){
                      this.basicPersonForm.nation = temp[0].name
                    }
                  }
                })
                // 政治面貌
                getDictionary({fieldName: 'politicalData'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    if (resp.data) {
                      let temp = resp.data.filter(item => item.number == res.data.politicalFace)
                      if(temp && temp.length>0){
                        this.basicPersonForm.politicalFace = temp[0].name
                      }
                    }

                  }
                })
                // 是否特殊人群
                getDictionary({fieldName: 'specialPersonData'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.specialPopulation)
                    if(temp && temp.length>0){
                      this.basicPersonForm.specialPopulation = temp[0].name
                    }
                  }
                })

                // 人口类型
                getDictionary({fieldName: 'personTypeDatas'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.personType)
                    if(temp && temp.length>0){
                      this.basicPersonForm.personType = temp[0].name
                    }
                  }
                })
                // 爱好
                if (res.data.hobby) {
                  getDictionary({fieldName: 'hobbyData'}).then(resp => {
                    if (resp && resp.success && resp.data && resp.data.length > 0) {
                      const parse = JSON.parse(res.data.hobby)
                      this.basicPersonForm.hobby = ''
                      for (let i = 0; i < parse.length; i++) {
                        const filter = resp.data.filter(item => item.number.toString() == parse[i].toString())
                        if (filter && filter.length > 0) {
                          this.basicPersonForm.hobby += ',' + filter[0].name
                        }
                      }
                      if (this.basicPersonForm.hobby != '') {
                        this.basicPersonForm.hobby = this.basicPersonForm.hobby.substring(1)
                      }
                    }
                  })
                }
                // 人群标签
                if (res.data.tableType) {
                  getCrowdTags().then(resp => {
                    if (resp && resp.success && resp.data && resp.data.length > 0) {
                      this.basicPersonForm.tableType = ''
                      let filter = resp.data.filter(item => res.data.tableType.indexOf(item.number)>-1)
                      if (filter && filter.length > 0) {
                        for (let i = 0; i < filter.length; i++) {
                          if (i == 0) {
                            this.basicPersonForm.tableType = filter[i].name
                          } else {
                            this.basicPersonForm.tableType += ',' + filter[i].name
                          }
                        }
                      }
                    }
                  })
                }

                getDictionary({fieldName: 'relationShipData'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    this.relationShipData = resp.data
                    // 与户主关系
                    const temp = this.relationShipData.filter(item => item.number == res.data.accRelation)
                    if (temp.length > 0) {
                      this.basicPersonForm.accRelation = temp[0].name
                    }
                  }
                })

                if (res.data.personType == '1') {
                  this.accShow = true
                  this.basicPersonForm.accNumber = res.data.accNumber
                  // 户别
                  getDictionary({fieldName: 'accTypeData'}).then(resp => {
                    if (resp && resp.success) {
                      let temp = resp.data.filter(item => item.number == res.data.accType)
                      if(temp && temp.length>0){
                        this.basicPersonForm.accType = temp[0].name
                      }
                    }
                  })
                  this.basicPersonForm.accName = res.data.accName

                  this.basicPersonForm.accCard = res.data.accCard
                }


                getHouseByPersonId({personId: this.BasicPersonId}).then(res => {
                  this.data = res.data
                })

                // 宗教信仰
                getDictionary({fieldName: 'religious'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.religiousBelief)
                    if(temp && temp.length>0){
                      this.basicPersonForm.religiousBelief = temp[0].name
                      this.$forceUpdate();//重新渲染数据
                    }
                  }
                })
                // 婚姻状况
                getDictionary({fieldName: 'maritalStatus'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.maritalStatus)
                    if(temp && temp.length>0){
                      this.basicPersonForm.maritalStatus = temp[0].name
                      this.$forceUpdate();//重新渲染数据
                    }
                  }
                })
                // 兵役情况
                getDictionary({fieldName: 'militaryService'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.militaryService)
                    if(temp && temp.length>0){
                      this.basicPersonForm.militaryService = temp[0].name
                      this.$forceUpdate();//重新渲染数据
                    }
                  }
                })
                // 党员关系管理地
                getDictionary({fieldName: 'partyRelationshipManagemen'}).then(resp => {
                  if (resp && resp.success && resp.data && resp.data.length > 0) {
                    let temp = resp.data.filter(item => item.number == res.data.partyRelationshipManagemen)
                    if(temp && temp.length>0){
                      this.basicPersonForm.partyRelationshipManagemen = temp[0].name
                      this.$forceUpdate();//重新渲染数据
                    }
                  }
                })
              } else {
                this.$Message.error(res.message)
              }
            })
          }
        } else {
          this.closeModal(this.show)
        }
      }

    }
  }
</script>
