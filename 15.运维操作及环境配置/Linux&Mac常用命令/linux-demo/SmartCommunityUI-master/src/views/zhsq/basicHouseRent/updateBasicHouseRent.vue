<style lang="less" scoped>
  .basicHousingManage {
    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-content .ivu-form-item-error-tip {
      left: 0px;
    }

    .ivu-form .ivu-form-item-label {
      width: 90px;
    }

    .ivu-select {
      width: 186px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }

    .ivu-table-tip {
      overflow-x: hidden !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="false" class="basicHousingManage" width="970">
    <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">基本信息</Divider>
    <Form ref="basicHousingManageForm" :model="basicHousingManageForm" :rules="basicHousingManageFormRule">
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="houseStreet">
            <Select v-model="basicHousingManageForm.houseStreet" placeholder="请选择" clearable @on-change="streetChange">
              <Option v-for="(item, i) in streetData" :key="item.name" :value="item.name">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="houseCommunity">
            <Select v-model="basicHousingManageForm.houseCommunity" placeholder="请选择" clearable
                    @on-change="communityChange">
              <Option v-for="(item, i)  in communityData" :key="item.name" :value="item.name">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="houseGridId">
            <Select v-model="basicHousingManageForm.houseGridId" placeholder="请选择" clearable label-in-value
                    @on-change="gridChange">
              <Option v-for="(item, i) in gridData" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="街道号" prop="streetNumber">
            <InputNumber v-model="basicHousingManageForm.streetNumber" :min="1" :max="99999"
                         @on-change="streetNumberChange"
                         placeholder="请输入如，136" style="width: 186px;"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="小区名称" prop="houseId">
            <Select v-model="basicHousingManageForm.houseId" placeholder="请选择" clearable label-in-value
                    @on-change="houseChange">
              <Option v-for="(item, i) in houseName" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="楼栋" prop="buildArchiveId">
            <Select v-model="basicHousingManageForm.buildArchiveId" placeholder="请选择" clearable label-in-value
                    @on-change="buildArchivesChange">
              <Option v-for="(item, i) in buildArchives" :key="item.id.toString()" :value="item.id.toString()">{{item.buildingName}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="单元" prop="unit">
            <Select v-model="basicHousingManageForm.unit" placeholder="请选择" @on-change="unitChange" allow-create
                    filterable @on-create="createUnit" @keydown.native.enter.prevent="keyDownEvent">
              <Option v-for="(item,i) in unitData" :key="Math.random()" :value="item.unit">{{item.unit}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="楼层" prop="floor">
            <InputNumber v-model="basicHousingManageForm.floor" :min="1" :max="99" placeholder="请输入如，4"
                         style="width: 186px;"
                         @on-change="floorChange"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="门牌号" prop="doorNumber">
            <Input type="text" :maxlength=50 v-model="basicHousingManageForm.doorNumber" @on-change="doorNumChange"
                   placeholder="请输入如，501"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="租用状态" prop="rentStatus">
            <Select v-model="basicHousingManageForm.rentStatus" placeholder="请选择" clearable
                    label-in-value ref="houseType">
              <Option v-for="(item, i) in rentStatus" :key="item.name" :value="item.name">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="16">
          <FormItem label="房屋详址" prop="houseAddress">
            <Input type="text" :maxlength=50 v-model="basicHousingManageForm.houseAddress"
                   style="width: 497px !important;"
                   placeholder="请输入房屋详址"/>
          </FormItem>
        </Col>
      </Row>

      <Divider style="margin-top: 0;color:#2d8cf0;margin-bottom:-10px;" orientation="left">租客信息</Divider>
      <Row>
        <Icon type="md-add-circle" size="24" color="#4EEE94"
              style="float: right;margin-right: 50px;margin-top: 6px;" @click="addRow"/>
      </Row>
      <!--房屋列表-->
      <Table :loading="loading" stripe :columns="columns" :data="data" ref="table" height="200">
        <template slot-scope="{ row, index }" slot="action">
          <Icon type="md-remove-circle" size="24" color="#FF0000" @click="removeRow(row, index)"/>
        </template>
      </Table>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
    <updateBasicPerson v-model="addPersonShow" :modalTitle="title"
                       v-on:loadCustomerPerson="loadCustomerPerson"></updateBasicPerson>
  </Modal>
</template>
<script>
  import {
    addBasicHousing,
    updateBasicHousingCustomer,
    getBasicHousing,
    getUnitByBuildArchiveId
  } from '@/api/zhsq/basicHouse/basicHouse'

  import { getPersonByHouseId } from '@/api/zhsq/basicPerson/basicPerson'

  import { queryAllList as gridAllList } from '@/api/zhsq/basicHousingEstate/basicHousingEstate'
  import { queryTBuildingArchivesAll } from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
  import { houseType, communityData, streetData, rentStatus } from '@/api/tools/zhsqSelectData'
  import { queryAllList } from '@/api/zhsq/basicGrids/basicGrids'
  import updateBasicPerson from './updateBasicPerson'

  export default {
    components: {
      updateBasicPerson
    },
    name: 'updateBasicHousing',
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
      }
    },
    data() {
      return {
        title: '',
        addPersonShow: false,
        data: [],
        isRenter: false,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        houseName: [],
        gridData: [],
        streetData: [],
        rentStatus: [],
        communityData: [],
        houseType: [],
        buildArchives: [],
        unitData: [],
        basicHousingManageForm: {
          houseStreet: '',
          houseCommunity: '',
          houseGridId: '',
          houseGrid: '',
          streetNumber: 0,
          houseId: '',
          houseName: '',
          houseAddress: '',
          customerName: '',
          customerCard: '',
          customerMobile: '',
          rentStatus: '',
          buildArchiveId: '',
          buildArchiveName: '',
          doorNumber: '',
          unit: '',
          floor: 0,
          personData: []
        },
        basicHousingManageFormRule: this.getBasicHousingManageFormRule(),
        columns: this.getBasicHousingManageColumns()
      }
    },
    mounted() {

    },
    methods: {
      removeRow(row, index) {
        this.data = this.data.filter((item, i, arr) => {
          return index !== i
        })
      },
      //加载租客..子页面添加
      loadCustomerPerson(str) {
        let person = JSON.parse(str)
        if (person) {
          this.data.push(person)
        }
      },
      //添加租客行
      addRow() {
        this.title = '租客添加'
        this.addPersonShow = true
      },
      //获取列表字段
      getBasicHousingManageColumns() {
        return [
          {
            title: '人口类型',
            align: 'center',
            key: 'personType',
            tooltip: true
          },
          {
            title: '姓名',
            align: 'center',
            key: 'name',
            sortable: false,
            tooltip: true
          },
          {
            title: '性别',
            align: 'center',
            key: 'sex',
            tooltip: true
          },
          {
            title: '出生日期',
            key: 'birthDate',
            align: 'center',
            tooltip: true
          },
          {
            title: '身份证号',
            align: 'center',
            key: 'cardId',
            tooltip: true
          },
          {
            title: '户籍地址',
            align: 'center',
            key: 'residenceAddress',
            tooltip: true
          },
          {
            title: '居住地址',
            align: 'center',
            key: 'residentialAddress',
            tooltip: true
          }, {
            title: '操作',
            align: 'center',
            slot: 'action'
          }
        ]
      },
      //空方法，防止刷新
      keyDownEvent() {

      },
      //街道号码改变
      streetNumberChange(e) {
        let form = this.basicHousingManageForm
        if (e) {
          form.houseAddress = form.houseStreet.trim() + e + '号'
          //清空后边项
          form.buildArchiveName = ''
          form.buildArchiveId = ''
          form.unit = ''
          form.floor = 0
          form.doorNumber = ''
        }
      },
      //楼栋改变
      buildArchivesChange(e) {
        let form = this.basicHousingManageForm
        if (e) {
          if (e.label) {
            form.buildArchiveName = e.label.trim()
          }
          form.buildArchiveId = e.value.trim()

          form.houseAddress = form.houseStreet + form.streetNumber + '号' + e.label.trim()
          //清空后边项
          form.unit = ''
          form.floor = 0
          form.doorNumber = ''

          this.getUnitByBuildArchiveId(e.value)
        }
      },
      //房屋里边找单元
      getUnitByBuildArchiveId(buildArchiveId) {
        if (buildArchiveId != null && buildArchiveId != '') {
          getUnitByBuildArchiveId({ buildArchiveId: buildArchiveId }).then(res => {
            if (res && res.success) {
              this.unitData = res.data
            }
          })
        }
      },
      //根据房屋 数据库加载租客
      getCustomerPerson(houseId) {
        getPersonByHouseId({ basicHouseId: houseId }).then(res => {
          if (res && res.success) {
            this.data = res.data
          }
        })
      },
      //单元格新建条目
      createUnit(val) {
        if (val != '') {
          this.basicHousingManageForm.unit = val
          this.unitData.push({ unit: val })
        }
        //console.log(this.unitData)
      },
      //单元改变
      unitChange(e) {
        let form = this.basicHousingManageForm
        if (e) {
          form.houseAddress = form.houseStreet + form.streetNumber + '号' + form.buildArchiveName + e.trim()
          //清空后边项
          form.floor = 0
          form.doorNumber = ''
        }
      },
      //楼层改变
      floorChange(e) {
        let form = this.basicHousingManageForm
        if (e) {
          form.houseAddress = form.houseStreet + form.streetNumber + '号' + form.buildArchiveName + form.unit + e + '层'
          //清空后边项
          form.doorNumber = ''
        }
      },
      //门牌号改变
      doorNumChange(e) {
        let form = this.basicHousingManageForm
        if (!form.doorNumber.startsWith(form.floor)) {
          this.$Message.error('楼层和门牌号不匹配，请重新输入！')
          return false
        }
        form.houseAddress = form.houseStreet + form.streetNumber + '号' + form.buildArchiveName + form.unit + form.floor + '层' + form.doorNumber
      },
      houseChange(e) {
        if (e) {
          let data = {}
          if (e != '1') {
            this.basicHousingManageForm.houseName = e.label.trim()
            this.basicHousingManageForm.houseId = e.value.trim()
            data.housingEstate = e.value
          }
          queryTBuildingArchivesAll(data).then(res => {
            if (res.data.records.length > 0) {
              this.buildArchives = res.data.records
            } else {
              //建筑
              this.basicHousingManageForm.buildArchiveName = ''
              this.basicHousingManageForm.buildArchiveId = ''
              this.buildArchives = []
              this.$message.error('请录入' + e.label.trim() + '的楼栋信息！')
              return false
            }
          })
        }
      },
      //網格
      gridChange(e) {
        let data = {}
        if (e) {
          this.basicHousingManageForm.houseGridId = e.value.trim()
          this.basicHousingManageForm.houseGrid = e.label.trim()
          data.grid = e.value
        }
        gridAllList(data).then(res => {
          if (res.data.length > 0) {
            this.houseName = res.data
          } else {
            this.basicHousingManageForm.houseName = ''
            this.houseName = []
            //建筑
            this.basicHousingManageForm.buildArchiveName = ''
            this.basicHousingManageForm.buildArchiveId = ''
            this.buildArchives = []
          }
        })
      },
      //社区
      communityChange(e) {
        let data = {}
        if (e) {
          data.communityId = e.replaceAll(/\s+/g, '')
        }
        queryAllList(data).then(res => {
          if (res.data.length > 0) {
            this.gridData = res.data
          } else {
            this.basicHousingManageForm.houseGrid = ''
            this.gridData = []
            this.basicHousingManageForm.houseName = ''
            this.houseName = []
            //建筑
            this.basicHousingManageForm.buildArchiveName = ''
            this.basicHousingManageForm.buildArchiveId = ''
            this.buildArchives = []
          }
        })
      },
      //街道
      streetChange(e) {
        let form = this.basicHousingManageForm
        if (e) {
          form.houseAddress = e.trim()
          //重置后边的地址
          form.streetNumber = 0
          form.buildArchiveName = ''
          form.buildArchiveId = ''
          form.unit = ''
          form.floor = 0
          form.doorNumber = ''

          form.houseCommunity = ''
          form.houseGrid = ''
          form.houseName = ''
          form.buildArchiveName = ''
          form.buildArchiveId = ''
          this.buildArchives = []
          this.communityData = []
          this.gridData = []
          this.houseName = []

          this.communityData = communityData.filter(function(item, index) {
            return item.street == e.trim()
          })
        }
      },
      handelSubmit() {
        this.$refs['basicHousingManageForm'].validate((valid) => {
          if (valid) {
            let form = this.basicHousingManageForm
            if (!form.doorNumber.startsWith(form.floor)) {
              this.$Message.error('楼层和门牌号不匹配，请重新输入！')
              return false
            }
            if (this.BasicHousingManageId != null && this.BasicHousingManageId.trim().length > 0) {
              this.basicHousingManageForm.id = this.BasicHousingManageId
              this.basicHousingManageForm.personData = this.data
              //console.log(this.basicHousingManageForm)
              updateBasicHousingCustomer(JSON.stringify(this.basicHousingManageForm)).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false)
                  this.$emit('handleSearch')
                  this.$Message.success('保存成功')
                } else {
                  this.$Message.error(res.msg)
                }
              })
            } else {
              this.basicHousingManageForm.personData = this.data
              addBasicHousing(JSON.stringify(this.basicHousingManageForm)).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false)
                  this.$emit('handleSearch')
                  this.$Message.success('保存成功')
                } else {
                  this.$Message.error(res.msg)
                }
              })
            }
          } else {
            this.loading = false
            this.$Message.error('表单验证不通过！')
          }
        })
      },
      closeModal(val) {
        this.$emit('input', val)
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
          customerName: '',
          customerCard: '',
          customerMobile: '',
          rentStatus: '',
          buildArchiveId: '',
          buildArchiveName: '',
          doorNumber: '',
          unit: '',
          floor: 0
        }
      },
      getBasicHousingManageFormRule() {
        return {
          streetNumber: [
            {
              required: true, type: 'number', message: '街道号不能为空！', trigger: 'blur', transfer(value) {
                return Number(value)
              }
            }
          ],
          unit: [
            { required: true, message: '单元不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          floor: [
            {
              required: true, type: 'number', message: '楼层不能为空！', trigger: 'blur', transfer(value) {
                return Number(value)
              }
            }
          ],
          houseStreet: [
            { required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          houseCommunity: [
            { required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          houseGridId: [
            { required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          houseName: [
            { required: true, message: '小区名称不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
          ],
          houseAddress: [
            { required: true, message: '房屋详址不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
          ],
          customerName: [
            { required: true, message: '房主姓名不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
          ],
          customerCard: [
            { required: true, message: '身份证号不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' },
            {
              pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
              message: '身份证号不正确',
              trigger: 'blur'
            }
          ],
          customerMobile: [
            { required: true, message: '电话号码不能为空！', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
          ],
          rentStatus: [
            { required: true, message: '租用状态不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          doorNumber: [
            { required: true, message: '门牌号不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          buildArchiveId: [
            { required: true, message: '楼栋不能为空！', trigger: 'blur', pattern: /.+/ }
          ]
        }
      }
    },
    watch: {
      value(val) {
        this.show = val
      },
      show(val) {
        this.initForm()
        this.data = []
        this.loading = false
        this.editTitle = this.modalTitle
        this.streetData = streetData
        this.houseType = houseType
        this.rentStatus = rentStatus
        if (this.editTitle.indexOf('编辑') > -1) {
          this.communityData = communityData
          this.communityChange()
          this.gridChange()
          this.houseChange('1')
        } else {
          this.communityData = []
          this.gridData = []
        }
        if (val) {
          this.$refs['basicHousingManageForm'].resetFields()
          if (this.BasicHousingManageId != null && this.BasicHousingManageId.trim().length > 0) {

            getBasicHousing({ id: this.BasicHousingManageId }).then(res => {
              if (res && res.code == 200) {
                this.basicHousingManageForm.houseStreet = res.data.houseStreet
                this.basicHousingManageForm.houseCommunity = res.data.houseCommunity
                this.basicHousingManageForm.houseGrid = res.data.houseGrid
                this.basicHousingManageForm.houseGridId = res.data.houseGridId
                this.basicHousingManageForm.streetNumber = res.data.streetNumber == '' ? res.data.streetNumber : parseInt(res.data.streetNumber)
                this.basicHousingManageForm.houseName = res.data.houseName
                this.basicHousingManageForm.houseId = res.data.houseId
                this.basicHousingManageForm.buildArchiveId = res.data.buildArchiveId
                this.basicHousingManageForm.buildArchiveName = res.data.buildArchiveName
                this.basicHousingManageForm.unit = res.data.unit
                this.basicHousingManageForm.floor = res.data.floor == '' ? res.data.floor : parseInt(res.data.floor)
                this.basicHousingManageForm.doorNumber = res.data.doorNumber
                this.basicHousingManageForm.customerName = res.data.customerName
                this.basicHousingManageForm.customerCard = res.data.customerCard
                this.basicHousingManageForm.rentStatus = res.data.rentStatus
                this.basicHousingManageForm.customerMobile = res.data.customerMobile
                this.basicHousingManageForm.houseAddress = res.data.houseAddress

                this.getUnitByBuildArchiveId(res.data.buildArchiveId)
                this.getCustomerPerson(this.BasicHousingManageId)
              } else {
                this.$Message.error(res.msg)
              }
            })
          }
        } else {
          this.closeModal(val)
        }
      }
    }
  }
</script>
