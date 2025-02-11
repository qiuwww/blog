<style lang="less">
.addBasicPerson {
  .ivu-form .ivu-form-item-label {
    width: 120px;
  }

  .ivu-input-wrapper {
    width: auto !important;
  }

  .ivu-select-default.ivu-select-multiple .ivu-select-selection {
    min-height: 32px;
    max-height: 32px;
    overflow-y: auto;
  }

  .ivu-form-item {
    margin-bottom: 24px !important;
  }

  .ivu-input-group .ivu-input {
    width: 100%;
    background: #fff;
    border-radius: 3px;
    color: #515a6e;
  }

  .ivu-input-group-append, .ivu-input-group > .ivu-input:last-child {
    border-radius: 3px;
  }
  .modalDiv {
    max-height:750px;
    overflow-y:hidden;
    overflow-x:hidden;
  }
  .modalDiv:hover{
    overflow-y:scroll;
  }
  .modalDiv:hover::-webkit-scrollbar {
    display: none;

    /*滚动条整体样式*/
    width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .modalDiv:hover::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #535353;
  }
  .modalDiv:hover::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background   : #ededed;
  }

}
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="addBasicPerson" width="1103">
    <div class="modalDiv" ref="modalDiv">
      <Form ref="basicPersonForm" :model="basicPersonForm" :rules="basicPersonFormRule" :label-width="138">
        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">人口信息</Divider>
        <Row>
          <Col span="8">
            <Row>
              <FormItem label="姓名" prop="name">
                <Input
                  v-model="basicPersonForm.name"
                  type="text"
                  :maxlength="50"
                  placeholder="请输入姓名"
                  style="width: 180px"
                />
              </FormItem>
            </Row>
            <Row>
              <FormItem label="出生日期">
                <DatePicker
                  :options="birthDateOptions"
                  v-model="basicPersonForm.birth"
                  type="date"
                  placeholder="请选择"
                  format="yyyy-MM-dd"
                  style="width: 186px"
                  disabled="disabled"
                />
              </FormItem>
            </Row>
            <Row>
              <FormItem label="民族" prop="nation">
                <Select v-model="basicPersonForm.nation" placeholder="请选择" style="width: 186px" transfer>
                  <Option v-for="(item, i) in nationData" :key="item.id" :value="item.number.toString()">{{
                      item.name
                    }}
                  </Option>
                </Select>
              </FormItem>
            </Row>
          </Col>
          <Col span="8">
            <Row>
              <FormItem label="身份证号" prop="cardId">
                <Input
                  v-model="basicPersonForm.cardId"
                  type="text"
                  :maxlength="50"
                  placeholder="请输入身份证号"
                  style="width: 180px"
                  @on-change="cardIdChange"
                />
              </FormItem>
            </Row>
            <Row>
              <FormItem label="性别" >
                <RadioGroup v-model="basicPersonForm.sex" style="width: 186px" >
                  <Radio v-for="(item, i)  in sexData" :key="item.name" :value="item.name" :label="item.name" disabled="disabled"/>
                </RadioGroup>
              </FormItem>
            </Row>

            <Row>
              <FormItem label="政治面貌" prop="politicalFace">
                <Select v-model="basicPersonForm.politicalFace" placeholder="请选择" style="width: 186px" transfer
                        label-in-value>
                  <Option v-for="(item, i) in politicalData" :key="item.number" :value="item.number.toString()">
                    {{ item.name }}
                  </Option>
                </Select>
              </FormItem>
            </Row>
          </Col>
          <Col span="8">
            <FormItem label="头像" style="height: 85px ">
              <uploadHeaderImg v-model="basicPersonForm.imgPath" @uploadSuccess="onFileUploadSuccess"
                               @uploadError="onFileUploadError" @removePath="onRemovePath"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="所属街道" prop="streetId">
              <Select
                v-model="basicPersonForm.streetId"
                placeholder="请选择"
                label-in-value
                style="width: 186px"
                transfer
                @on-change="streetChange"
              >
                <Option v-for="(item, i) in streetData" :key="item.id" :value="item.id.toString()">{{
                    item.name
                  }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="所属社区" prop="communityId">
              <Select
                v-model="basicPersonForm.communityId"
                placeholder="请选择"
                style="width: 186px"
                label-in-value
                transfer
                @on-change="communityChange"
              >
                <Option v-for="(item, i) in communityData" :key="item.id" :value="item.id.toString()">{{
                    item.name
                  }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="所属网格" prop="ownedGridId">
              <Select
                v-model="basicPersonForm.ownedGridId"
                placeholder="请选择"
                style="width: 186px"
                label-in-value
                transfer
                @on-change="gridChange"
              >
                <Option v-for="(item, i) in gridData" :key="item.name" :value="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="电话号码" prop="phone">
              <Input v-model="basicPersonForm.phone" type="text" :maxlength="50" placeholder="请输入电话号码"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="特殊人群">
              <Select v-model="basicPersonForm.specialPopulation" placeholder="请选择" style="width: 186px" transfer>
                <Option v-for="(item, i) in specialPersonData" :key="item.number" :value="item.number.toString()">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否常驻网格">
              <RadioGroup v-model="basicPersonForm.residentGrid" >
                <Radio v-for="(item, i)  in isOfternData" :key="item.name" :value="item.name" :label="item.label" @click.native="residentGridClick(item.name)" />
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="兴趣爱好">
              <Select v-model="basicPersonForm.hobbys" multiple placeholder="请选择" label-in-value style="width: 186px"
                      transfer>
                <Option v-for="(item, i) in hobbyData" :key="item.id" :value="item.number.toString()">{{
                    item.name
                  }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="人群标签" prop="tableTypes">
              <Select v-model="basicPersonForm.tableTypes" multiple placeholder="请选择" style="width: 186px"
                      label-in-value transfer>
                <Option v-for="(item, i) in tableTypeData" :key="i" :value="item.number.toString()">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="人口类型" prop="personType">
              <Select
                v-model="basicPersonForm.personType" transfer
                placeholder="请选择"
                label-in-value
                style="width: 186px"
                @on-change="personTypeChange"
              >
                <Option v-for="(item, i) in personTypeData" :key="item.id" :value="item.number.toString()">{{
                    item.name
                  }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="24">
            <FormItem label="居住地址" prop="residentialAddress">
              <Input
                v-model="basicPersonForm.residentialAddress"
                type="text"
                :maxlength="50"
                placeholder="请输入居住地址"
                style="width: calc(100% - 22px)  !important;"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="16">
            <FormItem label="工作单位" prop="workAddress" >
              <Input v-model="basicPersonForm.workAddress" style="width:  543px!important;" type="text" :maxlength="50" placeholder="请输入工作单位"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="职业" prop="occupation">
              <Input v-model="basicPersonForm.occupation" type="text" :maxlength="50" placeholder="请输入职业"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="宗教信仰" prop="religiousBelief">
              <Select v-model="basicPersonForm.religiousBelief" placeholder="请选择" style="width: 186px" transfer>
                <Option v-for="(item, i) in religiousBelief" :key="i" :value="item.number.toString()">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="婚姻状况" prop="maritalStatus">
              <Select v-model="basicPersonForm.maritalStatus" placeholder="请选择" style="width: 186px" transfer>
                <Option v-for="(item, i) in maritalStatus" :key="i" :value="item.number.toString()">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="兵役情况" prop="militaryService">
              <Select v-model="basicPersonForm.militaryService" placeholder="请选择" style="width: 186px" >
                <Option v-for="(item, i) in militaryService" :key="i" :value="item.number.toString()">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="是否优抚对象" prop="isPreferentialTreatment">
              <RadioGroup v-model="basicPersonForm.isPreferentialTreatment">
                <Radio v-for="(item, i)  in isOfternData" :key="item.name" :value="item.name" :label="item.label" />
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否失独" prop="isLonely">
              <RadioGroup v-model="basicPersonForm.isLonely">
                <Radio v-for="(item, i)  in isOfternData" :key="item.name" :value="item.name" :label="item.label" />
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否低保" prop="isMinimumLiving">
              <RadioGroup v-model="basicPersonForm.isMinimumLiving">
                <Radio v-for="(item, i)  in isOfternData" :key="item.name" :value="item.name" :label="item.label" />
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="现患大病详细" prop="seriousIllness">
              <Input
                v-model="basicPersonForm.seriousIllness"
                type="text"
                :maxlength="30"
                placeholder="请输入现患大病详细"
                style="width: calc(100% - 22px)  !important;"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="是否残疾人" prop="isDisabled">
              <RadioGroup v-model="basicPersonForm.isDisabled">
                <Radio v-for="(item, i)  in isOfternData" :key="item.name" :value="item.name" :label="item.label" />
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="basicPersonForm.isDisabled=='是'">
            <FormItem label="伤残类型" prop="disabilityType">
              <Input v-model="basicPersonForm.disabilityType" type="text" :maxlength="50" placeholder="请输入伤残类型"/>
            </FormItem>
          </Col>
          <Col span="8" v-if="basicPersonForm.isDisabled=='是'">
            <FormItem label="伤残等级" prop="disabilityLevel">
              <Input v-model="basicPersonForm.disabilityLevel" type="text" :maxlength="50" placeholder="请输入伤残等级"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="党员关系管理地" prop="partyRelationshipManagemen">
              <Select v-model="basicPersonForm.partyRelationshipManagemen" placeholder="请选择" style="width: 186px" transfer>
                <Option v-for="(item, i) in partyRelationshipManagemen" :key="i" :value="item.number.toString()">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="basicPersonForm.partyRelationshipManagemen=='2'">
          <Col span="24">
            <FormItem label="党员关系管理地址" prop="partyRelationshipManagemenAddress">
              <Input
                v-model="basicPersonForm.partyRelationshipManagemenAddress"
                type="text"
                :maxlength="50"
                placeholder="请输入党员关系管理地址"
                style="width: calc(100% - 22px)  !important;"
              />
            </FormItem>
          </Col>
        </Row>
        <Divider v-if="accShow" style="margin:0 auto;color:#2d8cf0;" orientation="left">户籍信息</Divider>
        <Row v-if="accShow">
          <Col span="8">
            <FormItem label="户号" prop="accNumber">
              <Input
                v-model="basicPersonForm.accNumber"
                type="text"
                :maxlength="30"
                placeholder="请输入户号"
                style="width: 180px"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="户别" prop="accType">
              <Select v-model="basicPersonForm.accType" placeholder="请选择" style="width: 186px" transfer>
                <Option v-for="(item, i) in accTypeData" :key="item.number" :value="item.number.toString()">{{
                    item.name
                  }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="户主姓名" prop="accName">
              <Input
                v-model="basicPersonForm.accName"
                type="text"
                :maxlength="30"
                placeholder="请输入户主姓名"
                style="width: 180px"
              />
            </FormItem>
          </Col>
        </Row>
        <Row v-if="accShow">
          <Col span="8">
            <FormItem label="户主身份证号" prop="accCard">
              <Input
                v-model="basicPersonForm.accCard"
                type="text"
                :maxlength="30"
                placeholder="请输入户主身份证号"
                style="width: 180px"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="与户主关系" prop="accRelation">
              <Select v-model="basicPersonForm.accRelation" placeholder="请选择" style="width: 186px" transfer>
                <Option v-for="(item, i) in relationShipData" :key="item.number" :value="item.number.toString()">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="accShow">
          <Col span="24">
            <FormItem label="户籍地址" prop="residenceAddress">
              <Input
                v-model="basicPersonForm.residenceAddress"
                type="text"
                :maxlength="50"
                placeholder="请输入户籍地址"
                style="width: calc(100% - 22px)  !important;"
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Form ref="formDynamic" :model="formDynamic" :label-width="138" v-if="basicPersonForm.tableTypes.indexOf('2')>-1">
        <Divider style="color:#2d8cf0;" orientation="left">亲属信息</Divider>
        <Row v-for="(item, index) in formDynamic.items" v-if="item.status === 1" :key="index">
          <Col span="8">
            <FormItem label="姓名">
              <Input v-model="item.name" type="text" :maxlength="50" placeholder="请输入姓名"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系方式">
              <Input v-model="item.phone" type="text" :maxlength="50" placeholder="请输入联系方式"/>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="关系" :label-width="116">
              <Select v-model="item.relationship" placeholder="请选择" transfer>
                <Option v-for="(item, i) in relationData" :key="item.number" :value="item.number.toString()">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="1">
            <Tooltip v-if="!item.flag" content="添加" placement="top">
              <Button class="btnPrimary" icon="md-add" @click="addFromRow()"></Button>
<!--            <Icon-->
<!--              type="md-add-circle"-->
<!--              size="30"-->
<!--              color="#4EEE94"-->
<!--              style="float: right;margin-right: 15px;margin-top: 2px;"-->
<!--              @click="addFromRow()"-->
<!--            />-->
            </Tooltip>
            <Tooltip v-else content="删除" placement="top">
              <Button class="btnError" icon="ios-trash" @click="removeFromRow(index)"></Button>
            </Tooltip>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
import {
  addBasicPerson,
  updateBasicPerson,
  getBasicPerson
} from '@/api/zhsq/basicPerson/basicPerson'
import {
  sexData, isOfternData
} from '@/api/tools/zhsqSelectData'
import {queryAllList} from '@/api/zhsq/basicGrids/basicGrids'
import {formartDate,nginxUrl,getBirth,getSex} from '@/api/tools/tool'
import {getDictionary, getStreet, getCommunity,getCrowdTags} from '@/api/index'
import uploadHeaderImg from '@/components/uploadHeaderImg'

export default {
  name: 'UpdateBasicPerson',
  components: {
    uploadHeaderImg
  },
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
      birthDateOptions: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      formDynamic: {
        items: [
          {
            name: '',
            phone: '',
            relationship: '',
            index: 1,
            status: 1,
            flag: false
          }
        ]
      },
      // 爱好
      hobbyData: [],
      // 户籍人口
      accShow: false,
      // 图片显示
      imgShow: false,
      loading: true,
      // 户别
      accTypeData: [],
      // 性别
      sexData: sexData,
      // 是否常驻网格
      isOfternData: isOfternData,
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
      show: this.value,
      editTitle: this.modalTitle,
      updateHouseData: [],
      imageUrlList: [],
      basicPersonForm: {
        name: '',
        sex: '',
        birth: '',
        birthDate: '',
        nation: '',
        cardId: '',
        personType: '',
        politicalFace: '',
        residenceAddress: '',
        ownedGridId: '',
        ownedGrid: '',
        residentialAddress: '',
        streetId: '',
        streetName: '',
        communityId: '',
        communityName: '',
        specialPopulation: '',
        residentGrid: '否',
        housingName: '',
        relationShip: '',
        houseTyp: '',
        ids: '',
        buildArchiveId: '',
        personId: '',
        tableType: '',
        imgPath: '',
        phone: '',
        imageIsUpdate: false,
        accNumber: '',
        accType: '',
        accName: '',
        accRelation: '',
        accCard: '',
        hobby: '',
        hobbys: [],
        tableTypes: [],
        relativesList:[],
        workAddress:'',
        occupation:'',
        religiousBelief:'',
        maritalStatus:'',
        militaryService:'',
        isPreferentialTreatment:'否',
        isLonely:'否',
        isMinimumLiving:'否',
        seriousIllness:'',
        isDisabled:'否',
        disabilityLevel:'',
        disabilityType:'',
        partyRelationshipManagemen:'',
        partyRelationshipManagemenAddress:'',
      },
      relationData:[],
      basicPersonFormRule: this.getBasicPersonFormRule(),
      partyRelationshipManagemen:[],
      militaryService:[],
      maritalStatus:[],
      religiousBelief:[],

    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.initForm()
      this.loading = false
      this.accShow = false
      this.editTitle = this.modalTitle
      this.gridData = []

      if (val) {
        this.$refs['basicPersonForm'].resetFields()
        this.getPoliticalData()
        this.getNationData()
        this.getSpecialPopulation()
        this.getTableType()
        this.getHobbyData()
        this.getPersonType()
        this.getAccType()
        this.getRelationShipData()
        this.getStreetData()
        this.getMilitaryService()
        this.getPartyRelationshipManagemen()
        this.getMaritalStatus()
        this.getReligiousBelief()
        if (this.BasicPersonId != null && this.BasicPersonId.trim().length > 0) {
          // 获取人员档案信息
          getBasicPerson({id: this.BasicPersonId}).then(res => {
            if (res && res.code == 200) {
              this.basicPersonForm.name = res.data.name
              this.basicPersonForm.sex = res.data.sex
              this.basicPersonForm.birth = res.data.birthDate
              this.basicPersonForm.nation = res.data.nation
              this.basicPersonForm.cardId = res.data.cardId
              this.basicPersonForm.personType = res.data.personType
              this.basicPersonForm.politicalFace = res.data.politicalFace
              this.basicPersonForm.residenceAddress = res.data.residenceAddress?res.data.residenceAddress.toString():""
              this.basicPersonForm.workAddress = res.data.workAddress?res.data.workAddress.toString():""
              this.basicPersonForm.occupation = res.data.occupation?res.data.occupation.toString():""
              this.basicPersonForm.religiousBelief = res.data.religiousBelief?res.data.religiousBelief.toString():""
              this.basicPersonForm.militaryService = res.data.militaryService?res.data.militaryService.toString():""
              this.basicPersonForm.isPreferentialTreatment = res.data.isPreferentialTreatment&&res.data.isPreferentialTreatment.trim().length!=0?res.data.isPreferentialTreatment.toString():"否"
              this.basicPersonForm.isLonely = res.data.isLonely && res.data.isLonely.trim().length!=0?res.data.isLonely.toString():"否"
              this.basicPersonForm.isMinimumLiving = res.data.isMinimumLiving&&res.data.isMinimumLiving.trim().length!=0?res.data.isMinimumLiving.toString():"否"
              this.basicPersonForm.seriousIllness = res.data.seriousIllness?res.data.seriousIllness.toString():""
              this.basicPersonForm.isDisabled = res.data.isDisabled&&res.data.isDisabled.trim().length!=0?res.data.isDisabled.toString():"否"
              this.basicPersonForm.disabilityLevel = res.data.disabilityLevel?res.data.disabilityLevel.toString():""
              this.basicPersonForm.partyRelationshipManagemen = res.data.partyRelationshipManagemen?res.data.partyRelationshipManagemen.toString():""
              this.basicPersonForm.partyRelationshipManagemenAddress = res.data.partyRelationshipManagemenAddress?res.data.partyRelationshipManagemenAddress.toString():""
              this.basicPersonForm.disabilityType = res.data.disabilityType?res.data.disabilityType.toString():""
              this.basicPersonForm.residentialAddress = res.data.residentialAddress?res.data.residentialAddress.toString():""
              this.basicPersonForm.maritalStatus = res.data.maritalStatus?res.data.maritalStatus.toString():""
              // 街道
              getStreet({}).then(resp => {
                if (resp && resp.success) {
                  this.streetData = resp.data
                  this.basicPersonForm.streetId = res.data.streetId
                  this.basicPersonForm.streetName = res.data.streetName
                }
              })
              // 社区
              getCommunity({streetId: res.data.streetId}).then(resp => {
                if (resp && resp.success) {
                  this.communityData = resp.data
                  this.basicPersonForm.communityId = res.data.communityId
                  this.basicPersonForm.communityName = res.data.communityName
                }
              })

              // this.basicPersonForm.ownedStreet = res.data.ownedStreet;
              // 根据街道查询社区
              // this.communityData = communityData.filter(function (item, index) {
              //     return res.data.ownedStreet == item.street;
              // });
              // this.basicPersonForm.ownedCommunity = res.data.ownedCommunity;
              // 根据社区查询网格信息
              queryAllList({communityId: res.data.communityId}).then(res => {
                if (res && res.data && res.data.length > 0) {
                  this.gridData = res.data
                }
              })

              this.basicPersonForm.specialPopulation = res.data.specialPopulation
              this.basicPersonForm.residentGrid = res.data.residentGrid&&res.data.residentGrid.trim().length!=0?res.data.residentGrid.toString():"否"
              this.basicPersonForm.housingName = res.data.housingName
              this.basicPersonForm.relationship = res.data.relationship
              this.basicPersonForm.phone = res.data.phone
              this.basicPersonForm.tableType = res.data.tableType + ''
              this.basicPersonForm.isBind = res.data.isBind
              if (res.data.hobby) {
                this.basicPersonForm.hobbys = JSON.parse(res.data.hobby)
              }
              if (res.data.tableType) {
                this.basicPersonForm.tableTypes = res.data.tableType.split(',')
              }
              if (res.data.relativesList && res.data.relativesList.length > 0) {
                this.formDynamic.items = res.data.relativesList
                for (let i = 0; i < this.formDynamic.items.length; i++) {
                  if (i == 0) {
                    this.formDynamic.items[i].flag = false
                  } else {
                    this.formDynamic.items[i].flag = true
                  }
                  this.formDynamic.items[i].status = 1
                  this.formDynamic.items[i].index = i + 1
                }
              }
              if (res.data.personType == '1') {
                this.accShow = true
                this.basicPersonForm.accNumber = res.data.accNumber
                this.basicPersonForm.accType = res.data.accType
                this.basicPersonForm.accName = res.data.accName
                this.basicPersonForm.accRelation = res.data.accRelation
                this.basicPersonForm.accCard = res.data.accCard
              } else {
                this.accShow = false
              }
              if (res.data.imgPath) {
                this.imageUrlList.push(nginxUrl + res.data.imgPath)
                this.basicPersonForm.imgPath = res.data.imgPath
              }
              this.communityChange(res.data.ownedCommunity)
              this.basicPersonForm.ownedGrid = res.data.ownedGrid
              this.basicPersonForm.ownedGridId = res.data.ownedGridId
            } else {
              this.$Message.error(res.message)
            }
          })
        }
      } else {
        this.closeModal(val)
        this.communityData = [];
      }
    }
  },
  methods: {
    //身份证号改变事件
    cardIdChange(e){
      if(this.basicPersonForm ){
        if(this.basicPersonForm.cardId && this.basicPersonForm.cardId .trim().length==18){
          let cardId = this.basicPersonForm.cardId;
          let date = getBirth(cardId)
          date = date.substring(0,19);
          date = date.replace(/-/g,'/');
          let birth = new Date(date).getTime();
          let sex = getSex(cardId)
          this.basicPersonForm.birth = date
          this.basicPersonForm.sex = sex
        }
      }
    },
    // 添加一行亲属关系
    addFromRow() {
      const index = this.formDynamic.items.length + 1
      this.formDynamic.items.push({
        name: '',
        phone: '',
        relationship: '',
        index: index,
        status: 1,
        flag: true
      })
      this.$nextTick(() => {
        let middle= this.$refs["modalDiv"];
        middle.scrollTop = middle.scrollHeight;
      })
    },
    // 删除一行
    removeFromRow(index) {
      this.formDynamic.items[index].status = 0
      this.formDynamic.items = this.formDynamic.items.filter(item => item.status == 1)
    },
    // 民族
    getNationData() {
      getDictionary({fieldName: 'nationData'}).then(res => {
        if (res && res.success) {
          this.nationData = res.data
        }
      })
    },
    // 加载兴趣爱好
    getHobbyData() {
      getDictionary({fieldName: 'hobbyData'}).then(res => {
        if (res && res.success) {
          this.hobbyData = res.data
        }
      })
    },
    // 政治面貌
    getPoliticalData() {
      getDictionary({fieldName: 'politicalData'}).then(res => {
        if (res && res.success) {
          this.politicalData = res.data
        }
      })
    },
    // 特殊人群
    getSpecialPopulation() {
      getDictionary({fieldName: 'specialPersonData'}).then(res => {
        if (res && res.success) {
          this.specialPersonData = res.data
        }
      })
    },
    // 档案类型
    getTableType() {
      getCrowdTags().then(res => {
        if (res && res.success) {
          this.tableTypeData = res.data
        }
      })
    },
    // 人口类型
    getPersonType() {
      getDictionary({fieldName: 'personTypeDatas'}).then(res => {
        if (res && res.success) {
          this.personTypeData = res.data
        }
      })
    },
    // 户别
    getAccType() {
      getDictionary({fieldName: 'accTypeData'}).then(res => {
        if (res && res.success) {
          this.accTypeData = res.data
        }
      })
    },
    // 与户主关系
    getRelationShipData() {
      getDictionary({fieldName: 'relationShipData'}).then(res => {
        if (res && res.success) {
          this.relationShipData = res.data
        }
      })
    },
    // 宗教信仰
    getReligiousBelief() {
      let _this = this;
      getDictionary({fieldName: 'religious'}).then(res => {
        if (res && res.success) {
          _this.religiousBelief = res.data
        }
      })
    },
    // 婚姻状况
    getMaritalStatus() {
      let _this = this;
      getDictionary({fieldName: 'maritalStatus'}).then(res => {
        if (res && res.success) {
          _this.maritalStatus = res.data
        }
      })
    },
    // 兵役情况
    getMilitaryService() {
      let _this = this;
      getDictionary({fieldName: 'militaryService'}).then(res => {
        if (res && res.success) {
          _this.militaryService = res.data
        }
      })
    },
    // 党员关系管理地
    getPartyRelationshipManagemen() {
      let _this = this;
      getDictionary({fieldName: 'partyRelationshipManagemen'}).then(res => {
        if (res && res.success) {
          _this.partyRelationshipManagemen = res.data
        }
      })
    },
    // 街道
    getStreetData() {
      getStreet({}).then(res => {
        if (res && res.success) {
          this.streetData = res.data
        }
      })
    },
    gridChange(e) {
      if (e) {
        this.basicPersonForm.ownedGrid = e.label.trim()
        this.basicPersonForm.ownedGridId = e.value.trim()
      }
    },
    // 人口类型
    personTypeChange(e) {
      if (e) {
        if (e.value == '1') {
          this.accShow = true
        } else {
          this.accShow = false
        }
      }
    },
    // 街道数据改变
    streetChange(e) {
      if (e) {
        // 街道赋值
        this.basicPersonForm.streetId = e.value
        this.basicPersonForm.streetName = e.label.trim()
        // 社区
        this.basicPersonForm.communityId = ''
        this.basicPersonForm.communityName = ''
        this.communityData = []
        // 网格
        this.basicPersonForm.ownedGrid = ''
        this.basicPersonForm.ownedGridId = ''
        this.gridData = []

        getCommunity({streetId: e.value}).then(res => {
          if (res && res.success) {
            this.communityData = res.data
          }
        })
      }
    },
    // 社区改变
    communityChange(e) {
      if (e) {
        // 社区赋值
        this.basicPersonForm.communityId = e.value
        this.basicPersonForm.communityName = e.label.trim()
        // 网格
        this.basicPersonForm.ownedGrid = ''
        this.basicPersonForm.ownedGridId = ''
        this.gridData = []

        queryAllList({communityId: e.value}).then(res => {
          if (res.data.length > 0) {
            this.gridData = res.data
          }
        })
      }
    },
    // 提交
    handelSubmit() {
      this.loading = true
      this.basicPersonForm.birthDate = formartDate(this.basicPersonForm.birth, 'yyyy-MM-dd HH:mm:ss')
      let _this = this;
      this.$refs['basicPersonForm'].validate((valid) => {
        if (valid) {
          _this.cardIdChange({});
          if (_this.basicPersonForm.hobbys) {
            _this.basicPersonForm.hobby = JSON.stringify(_this.basicPersonForm.hobbys)
          }
          if (_this.basicPersonForm.tableTypes) {
            _this.basicPersonForm.tableType = _this.basicPersonForm.tableTypes.join(',')
          }
          for (let i = 0; i < this.formDynamic.items.length; i++) {
            if (this.formDynamic.items[i].status == 1 && this.formDynamic.items[i].name && this.formDynamic.items[i].phone && this.formDynamic.items[i].relationship) {
              this.basicPersonForm.relativesList.push(this.formDynamic.items[i])
            }
          }
          if (_this.BasicPersonId != null && _this.BasicPersonId.trim().length > 0) {
            _this.basicPersonForm.id = _this.BasicPersonId
            updateBasicPerson(_this.basicPersonForm).then(res => {
              _this.loading = false
              if (res && res.code == 200) {
                _this.closeModal(false)
                _this.$emit('handleSearch')
                _this.$Message.success('保存成功')
              } else if (res) {
                _this.$Message.error(res.msg)
              } else {
                _this.$Message.error('保存失败')
              }
            })
          } else {
            addBasicPerson(_this.basicPersonForm).then(res => {
              _this.loading = false
              if (res && res.code == '200') {
                _this.closeModal(false)
                _this.$emit('handleSearch')
                _this.$Message.success('保存成功')
              } else if (res) {
                _this.$Message.error(res.msg)
              } else {
                _this.$Message.error('保存失败')
              }
            })
          }
        } else {
          _this.loading = false
          _this.$Message.error('表单验证不通过！')
        }
      })
    },
    closeModal(val) {
      this.$emit('input', val)
    },
    initForm() {
      this.imageUrlList = [],

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
        streetId: '',
        streetName: '',
        communityId: '',
        communityName: '',
        ownedGridId: '',
        ownedGrid: '',
        specialPopulation: '',
        residentGrid: '否',
        housingName: '',
        relationship: '',
        houseTyp: '',
        tableType: '',
        phone: '',
        imgPath: '',
        imageIsUpdate: false,
        accNumber: '',
        accType: '',
        accName: '',
        accRelation: '',
        accCard: '',
        hobby: '',
        hobbys: [],
        birth: '',
        tableTypes:[],
        relativesList:[],
        workAddress:'',
        occupation:'',
        religiousBelief:'',
        maritalStatus:'',
        militaryService:'',
        isPreferentialTreatment:'否',
        isLonely:'否',
        isMinimumLiving:'否',
        seriousIllness:'',
        isDisabled:'否',
        disabilityLevel:'',
        disabilityType:'',
        partyRelationshipManagemen:'',
        partyRelationshipManagemenAddress:'',
      }
      this.formDynamic = {
        items: [
          {
            name: '',
            phone: '',
            relationship: '',
            index: 1,
            status: 1,
            flag: false
          }
        ]
      };
      // 加载老人亲属关系
      getDictionary({ fieldName: 'relationShipData' }).then(res => {
        if (res && res.success) {
          this.relationData = res.data.filter(item => item.number!=1 && item.number!=3);
        }
      })
    },
    getBasicPersonFormRule() {
      return {
        name: [
          {required: true, message: '姓名不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为20！', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '性别不能为空！', trigger: 'blur'}
        ],
        birth: [
          {required: true, message: '出生日期不能为空！', trigger: 'blur', type: 'date'}
        ],
        nation: [
          {required: true, message: '民族不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        cardId: [
          {required: true, message: '身份证号不能为空！', trigger: 'blur'},
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: '身份证号不正确',
            trigger: 'blur',
            max: 18
          }
        ],
        personType: [
          {required: true, message: '人口类型不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        politicalFace: [
          {required: true, message: '政治面貌不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        residenceAddress: [
          {required: true, message: '户籍地址不能为空！', trigger: 'blur'},
          {type: 'string', max: 100, message: '数据的最大长度为100！', trigger: 'blur'}
        ],
        residentialAddress: [
          {required: true, message: '居住地址不能为空！', trigger: 'blur'},
          {type: 'string', max: 100, message: '数据的最大长度为100！', trigger: 'blur'}
        ],
        streetId: [
          {required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        communityId: [
          {required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        ownedGridId: [
          {required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        specialPopulation: [
          {required: true, message: '是否特殊人群！', trigger: 'blur', pattern: /.+/}
        ],
        residentGrid: [
          {required: true, message: '是否常驻网格不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        tableTypes: [
          {required: true, message: '人群标签不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        phone: [
          {required: true, message: '电话号码不能为空！', trigger: 'blur', pattern: /.+/},
          {pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
        ],
        accNumber: [
          {required: true, message: '户号不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        hobbys: [
          {required: true, message: '爱好不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        accType: [
          {required: true, message: '户别不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        accName: [
          {required: true, message: '户主姓名不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        accRelation: [
          {required: true, message: '与户主关系不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        accCard: [
          {required: true, message: '身份证号不能为空！', trigger: 'blur', pattern: /.+/},
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: '身份证号不正确',
            trigger: 'blur'
          }
        ],
        partyRelationshipManagemenAddress: [
          {type: 'string', max: 255, message: '数据的最大长度为255！', trigger: 'blur'}
        ],
        // residenceAddress: [
        //   {type: 'string', max: 255, message: '数据的最大长度为255！', trigger: 'blur'}
        // ],
        disabilityType: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        partyRelationshipManagemen: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        disabilityLevel: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        isDisabled: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        seriousIllness: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        isMinimumLiving: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        isLonely: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        isPreferentialTreatment: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        militaryService: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        maritalStatus: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        religiousBelief: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        occupation: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        workAddress: [
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
      }
    },
    onFileUploadSuccess(res, file) {
      this.basicPersonForm.imgPath = res.data
    },
    onFileUploadError(file) {
      this.$Message.error('图片上传失败！')
    },
    onRemovePath() {
      this.basicPersonForm.imgPath = ''
    },
    //取消选择
    residentGridClick(value){
      let now = +new Date();
      if (now- this.evTimeStamp < 100) {
        return;
      }
      this.evTimeStamp = now;
      this.basicPersonForm.residentGrid  = this.basicPersonForm.residentGrid === value ? '' : value;
    }
  }
}
</script>
