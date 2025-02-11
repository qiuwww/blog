<style lang="less">
.tBuildingArchives {
  .ivu-form-item-content {
    .tips {
      position: relative;
      line-height: 16px !important;
      font-size: 10px;
    }

    .span_text {
      font-weight: bold;
      margin-left: 2px;
      font-size: 14px;
      color: #b4b4b4;
    }

    .ivu-input-number {
      width: 110px;
    }
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

  .ivu-form-item-error-tip {
    width: 162px;
  }
}
</style>
<template>
  <Modal v-model="show" class="tBuildingArchives" :draggable="false" :title="editTitle" :mask-closable="false"
         width="970" transfer>
    <div style="max-height:800px;overflow-y:auto;overflow-x:hidden;" ref="tBuildingArchives">
      <Divider style="color:#2d8cf0;" orientation="left">楼栋信息</Divider>
      <Form
        ref="tBuildingArchivesForm"
        :model="tBuildingArchivesForm"
        :rules="tBuildingArchivesFormRule"
        class="tBuildingArchives"
        :label-width="100"
      >
        <Row>
          <Col span="8">
            <Row>
              <FormItem label="建筑用途" prop="buildingType">
                <Select
                  v-model="tBuildingArchivesForm.buildingType"
                  class="select-form"
                  placeholder="请选择"
                  style="width: 160px"
                  transfer
                >
                  <Option v-for="(item, i) in buildingTypeData" :key="item.id" :value="item.number.toString()">
                    {{ item.name }}
                  </Option>
                </Select>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="所属街道" prop="streetId">
                <Select
                  v-model="tBuildingArchivesForm.streetId"
                  class="select-form"
                  placeholder="请选择"
                  style="width: 160px"
                  label-in-value
                  transfer
                  @on-change="onStreetChange"
                >
                  <Option v-for="(item, i) in streetArr" :key="item.id" :value="item.id.toString()">{{
                      item.name
                    }}
                  </Option>
                </Select>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="所属网格" prop="grid">
                <Select
                  v-model="tBuildingArchivesForm.grid"
                  style="width: 160px"
                  label-in-value
                  transfer
                  @on-change="onGridsChange"
                >
                  <Option v-for="(option, index) in gridArr" :key="option.id.toString()" :value="option.id.toString()">
                    {{ option.name }}
                  </Option>
                </Select>
              </FormItem>
            </Row>
          </Col>
          <Col span="8">
            <Row span="8">
              <FormItem label="建筑年代" prop="buildingYear">
                <DatePicker :options="buildingYearOptions"
                            v-model="tBuildingArchivesForm.buildingYear"
                            type="year"
                            placeholder="请选择年代"
                            style="width: 160px"
                >
                  <span slot="append">年</span>
                </DatePicker>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="所属社区" prop="communityId">
                <Select
                  v-model="tBuildingArchivesForm.communityId"
                  class="select-form"
                  placeholder="请选择"
                  style="width: 160px"
                  label-in-value
                  transfer
                  @on-change="onCommunityChange"
                >
                  <Option v-for="(item, i) in communityArr" :key="item.id" :value="item.id.toString()">{{
                      item.name
                    }}
                  </Option>
                </Select>
              </FormItem>

            </Row>
            <FormItem label="所属小区" prop="housingEstate">
              <Select v-model="tBuildingArchivesForm.housingEstate" style="width: 160px" transfer>
                <Option v-for="(option, index) in housingEstateData" :key="index" :value="option.id.toString()">
                  {{ option.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="图片" style="height: 85px ">
              <uploadHeaderImg v-model="tBuildingArchivesForm.imgPath" @uploadSuccess="onFileUploadSuccess"
                               @uploadError="onFileUploadError" @removePath="onRemovePath" titleName="点击上传相关楼栋图片"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="楼栋号" prop="buildingName"
                      :rules="[{required: true, message: '楼栋号不能为空！', trigger: 'blur', pattern: /.+/},{validator: validateNumber, trigger: 'blur'}]">
              <Input v-model="tBuildingArchivesForm.buildingName" type="number" style="width: 160px;">
                <span slot="append">号</span>
              </Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="建筑面积" prop="area">
              <Input v-model="tBuildingArchivesForm.area" type="number" style="width: 160px;">
                <span slot="append">平米</span>
              </Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="建筑结构" style="width: 90%;" prop="buildingStructure">
              <Select
                v-model="tBuildingArchivesForm.buildingStructure"
                class="select-form"
                placeholder="请选择"
                style="width: 160px"
                transfer
              >
                <Option v-for="(item, i) in buildingStructureData" :key="item.id" :value="item.number.toString()">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="建筑性质" style="width: 90%;" prop="buildingNature">
              <Select
                v-model="tBuildingArchivesForm.buildingNature"
                class="select-form"
                placeholder="请选择"
                style="width: 160px"
              >
                <Option v-for="(item, i) in buildingNatureData" :key="item.id" :value="item.number.toString()">
                  {{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="电梯数">
              <Input v-model="tBuildingArchivesForm.elevatorNumber" type="number" style="width: 160px;">
                <span slot="append">台</span>
              </Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="车位数">
              <Input v-model="tBuildingArchivesForm.parkPlaceNumber" type="number" style="width: 160px;">
                <span slot="append">个</span>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="楼栋长姓名" style="width: 90%;">
              <Input
                v-model="tBuildingArchivesForm.managerName"
                :disabled="disabled"
                type="text"
                :maxlength="50"
                placeholder="请输入楼栋长姓名"
                style="width: 160px"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="楼栋长电话" style="width: 90%;">
              <Input
                v-model="tBuildingArchivesForm.managerPhone"
                :disabled="disabled"
                type="text"
                :maxlength="50"
                placeholder="请输入楼栋长电话"
                style="width: 160px"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="地图标注">
              <Input
                v-model="tBuildingArchivesForm.location"
                :disabled="disabled"
                type="text"
                icon="md-flag"
                placeholder="请输入地图标注"
                style="width: 160px"
                @on-click="checkMap"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="建筑地址" prop="buildingAddress" style="width: 97%">
              <Input v-model="tBuildingArchivesForm.buildingAddress" type="text" placeholder="请输入建筑地址"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="简介" prop="profile" style="width: 97%">
              <Input v-model="tBuildingArchivesForm.profile" :rows="3" type="textarea" placeholder="请输入简介"/>
            </FormItem>
          </Col>
        </Row>
      </Form>


      <Divider style="color:#2d8cf0;" orientation="left">单元信息</Divider>
      <Form ref="formDynamic" :model="formDynamic" :label-width="100">
        <Row v-for="(item, index) in formDynamic.items" v-if="item.status === 1" :key="index">
          <Col span="8">
            <FormItem label="单元名称" :prop="'items.' + index + '.name'"
                      :rules="[{required: true, message: '单元名称不能为空！', trigger: 'blur', pattern: /.+/},{validator: validateNumber, trigger: 'blur'}]">
              <!--              <Input v-model="item.name" type="number" style="width: 170px;" placeholder="请输入单元名称">-->
              <!--                <span slot="append">单元</span>-->
              <!--              </Input>-->
              <Select v-model="item.name" class="select-form" placeholder="-请选择-"  @on-open-change="unitClick">
                <Option v-for="(item, i) in 9" :key="i" :value="item.toString()">{{ item
                  }}单元
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="楼层数" :prop="'items.' + index + '.floorNumber'"
                      :rules="[{required: true, message: '楼层数不能为空！', trigger: 'blur', pattern: /.+/},{validator: validateNumber, trigger: 'blur'}]">
              <Input v-model="item.floorNumber" type="number" style="width: 160px;" placeholder="本单元楼层数">
                <span slot="append">层</span>
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem style="margin-left: -57px;" label="层户数" :label-width="110" :prop="'items.' + index + '.householdsNumber'"
                      :rules="[{required: true, message: '层户数不能为空！', trigger: 'blur', pattern: /.+/},{validator: validateNumber, trigger: 'blur'}]">
              <Input v-model="item.householdsNumber" type="number" style="width: 160px;" placeholder="每层户数">
                <span slot="append">户</span>
              </Input>
            </FormItem>
          </Col>
          <Col span="2" style="margin-left: -10px;">
            <Icon
              v-if="!item.flag"
              type="md-add-circle"
              size="30"
              color="#4EEE94"
              style="float: right;margin-right: 25px;margin-top: 2px;"
              @click="addFromRow()"
            />
            <Icon
              v-if="item.flag"
              type="md-remove-circle"
              size="30"
              color="#FF0000"
              style="float: right;margin-right: 24px;margin-top: 2px;"
              @click="removeFromRow(index)"
            />
          </Col>

        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
    <plot
      v-model="mapShow"
      :obj-data="locationArr"
      :select-type="selectType"
      :building-data="buildingData"
      div-id="updateTBuildingArchives"
      modal-title="选择坐标点"
      @resultPoint="getResultPoint"
    />
  </Modal>
</template>
<script>
import {
  addTBuildingArchives,
  updateTBuildingArchives,
  getTBuildingArchives,
  getOtherPolygonData
} from '@/api/zhsq/tBuildingArchives/tBuildingArchives'

import {queryAllList} from '@/api/zhsq/basicHousingEstate/basicHousingEstate'
import {queryAllList as gridsQueryAllList} from '@/api/zhsq/basicGrids/basicGrids'
import plot from '@/views/gismap/components/plot'
import * as olExtent from 'ol/extent'
import {formartDate} from '@/api/tools/tool'
import {getDictionary, getStreet, getCommunity} from '@/api/index'
import uploadHeaderImg from '@/components/uploadHeaderImg'

export default {
  name: 'UpdateTBuildingArchives',
  components: {
    plot,
    uploadHeaderImg
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TBuildingArchivesId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    const validateNumber = (rule, value, callback) => {
      if (value == undefined || value == null || value.toString().trim() === '') {
        callback(new Error('不能为空'));
      } else if (value.toString().length > 2) {

        callback(new Error('格式不正确，长度最大为2'));
      } else {
        callback();
      }
    };
    return {
      validateNumber: validateNumber,
      formDynamic: {
        items: [
          {
            name: '',
            floorNumber: '',
            householdsNumber: '',
            index: 1,
            status: 1,
            flag: false
          }
        ]
      },
      buildingYearOptions: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      imgShow: false,
      selectType: 'Polygon',
      locationArr: [],
      buildingData: [],
      mapShow: false,
      show: this.value,
      editTitle: this.modalTitle,
      loading: false,
      disabled: false,
      tBuildingArchivesForm: {
        id: '',
        buildingType: '',
        buildingName: '',
        buildingAddress: '',
        community: '',
        communityId: '',
        grid: '',
        gridId: '',
        location: '',
        housingEstate: '',
        street: '',
        streetId: '',
        centerPoint: '',
        streetNumber: null,
        managerName: '',
        managerPhone: '',
        imgPath: '',
        imageIsUpdate: false,
        buildingYear: '',
        area: null,
        buildingNature: '',
        buildingStructure: '',
        elevatorNumber: '',
        parkPlaceNumber: null,
        profile: '',
        unitList: []
      },
      tBuildingArchivesFormRule: this.getTBuildingArchivesFormRule(),
      // 建筑用途
      buildingTypeData: [],
      // 社区数据
      communityArr: [],
      // 街道数据
      streetArr: [],
      // 网格数据
      gridData: [],
      gridArr: [],

      housingEstateData: [],
      // 建筑结构
      buildingStructureData: [],
      // 建筑性质
      buildingNatureData: [],
      imageUrlList: [],

    }
  },
  watch: {
    'tBuildingArchivesForm.buildingName'(val) {
      // this.tBuildingArchivesForm.buildingName = Math.abs(val)
    },
    'tBuildingArchivesForm.area'(val) {
      this.tBuildingArchivesForm.area = Math.abs(val)
    },
    'tBuildingArchivesForm.elevatorNumber'(val) {
      this.tBuildingArchivesForm.elevatorNumber = Math.abs(val)
    },
    'tBuildingArchivesForm.parkPlaceNumber'(val) {
      this.tBuildingArchivesForm.parkPlaceNumber = Math.abs(val)
    },
    value(val) {
      this.show = val
    },
    show(val) {
      this.initForm()
      this.loading = false
      this.editTitle = this.modalTitle
      this.tBuildingArchivesForm.imgPath = ''

      if (val) {
        this.getBuildingTypeData()
        this.getStreetData()
        this.getBuildingNature()
        this.getBuildingStructure()
        this.$refs['tBuildingArchivesForm'].resetFields()


        if (this.TBuildingArchivesId != null && this.TBuildingArchivesId.trim().length > 0) {
          getTBuildingArchives({id: this.TBuildingArchivesId}).then(res => {
            if (res && res.code == 200) {
              this.tBuildingArchivesForm.buildingType = res.data.buildingType
              // this.tBuildingArchivesForm.buildingName = parseInt(res.data.buildingName)
              this.tBuildingArchivesForm.buildingName = parseInt(res.data.buildingName)
              this.tBuildingArchivesForm.buildingAddress = res.data.buildingAddress
              this.tBuildingArchivesForm.location = res.data.location
              this.tBuildingArchivesForm.centerPoint = res.data.centerPoint
              this.tBuildingArchivesForm.imgPath = res.data.imgPath
              // 街道
              getStreet({}).then(resp => {
                if (res && res.success) {
                  this.streetArr = resp.data
                  this.tBuildingArchivesForm.street = res.data.street
                  this.tBuildingArchivesForm.streetId = res.data.streetId
                }
              })
              // 社区
              getCommunity({streetId: res.data.streetId}).then(resp => {
                if (res && res.success) {
                  this.communityArr = resp.data
                  this.tBuildingArchivesForm.communityId = res.data.communityId
                  this.tBuildingArchivesForm.community = res.data.community
                }
              })

              // this.onStreetChange({value: res.data.streetId});
              // this.tBuildingArchivesForm.community = res.data.community;
              // 网格
              this.onCommunityChange({value: res.data.communityId})
              this.tBuildingArchivesForm.grid = res.data.grid
              // gridsQueryAllList({communityId: res.data.communityId}).then(resp => {
              //     if (resp && resp.success) {
              //         this.gridData = res.data;
              //
              //     }
              // });
              // 小区
              this.onGridsChange({value: res.data.grid})
              this.tBuildingArchivesForm.housingEstate = res.data.housingEstate

              this.tBuildingArchivesForm.streetNumber = res.data.streetNumber
              this.tBuildingArchivesForm.managerName = res.data.managerName
              this.tBuildingArchivesForm.managerPhone = res.data.managerPhone
              this.tBuildingArchivesForm.parkPlaceNumber = res.data.parkPlaceNumber
              this.tBuildingArchivesForm.elevatorNumber = res.data.elevatorNumber
              this.tBuildingArchivesForm.buildingNature = res.data.buildingNature
              this.tBuildingArchivesForm.buildingStructure = res.data.buildingStructure
              this.tBuildingArchivesForm.buildingYear = res.data.buildingYear
              this.tBuildingArchivesForm.profile = res.data.profile
              if (res.data.buildingYear) {
                this.tBuildingArchivesForm.buildingYear = formartDate(res.data.buildingYear, 'yyyy')
              }
              this.tBuildingArchivesForm.area = res.data.area

              if (res.data.unitList && res.data.unitList.length > 0) {
                this.formDynamic.items = res.data.unitList
                for (let i = 0; i < this.formDynamic.items.length; i++) {
                  this.formDynamic.items[i].name = this.formDynamic.items[i].name.toString();
                  if(this.formDynamic.items[i].householdsNumber){
                    this.formDynamic.items[i].householdsNumber = this.formDynamic.items[i].householdsNumber.toString();
                  }
                  if(this.formDynamic.items[i].floorNumber){
                    this.formDynamic.items[i].floorNumber = this.formDynamic.items[i].floorNumber.toString();
                  }
                  if (i == 0) {
                    this.formDynamic.items[i].flag = false
                  } else {
                    this.formDynamic.items[i].flag = true
                  }
                  this.formDynamic.items[i].status = 1
                  this.formDynamic.items[i].index = i + 1
                }
              }
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      } else {
        this.closeModal(val)
        this.gridArr = []
        this.communityArr = []
        this.housingEstateData = []
      }
    }
  },
  methods: {
    // 建筑结构
    getBuildingStructure() {
      getDictionary({fieldName: 'buildingStructureData'}).then(res => {
        if (res && res.success) {
          this.buildingStructureData = res.data
        }
      })
    },
    // 建筑性质
    getBuildingNature() {
      getDictionary({fieldName: 'buildingNatureData'}).then(res => {
        if (res && res.success) {
          this.buildingNatureData = res.data
        }
      })
    },
    // 获取街道数据
    getStreetData() {
      getStreet({}).then(res => {
        this.streetArr = res.data
      })
    },
    // 获取建筑类型
    getBuildingTypeData() {
      getDictionary({fieldName: 'building_type'}).then(res => {
        if (res && res.success) {
          this.buildingTypeData = this.buildingTypeData = res.data.filter(item => item.number && item.number == 1)
        }
      })
    },
    // 添加一行单元信息
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
    },
    // 删除一行单元信息
    removeFromRow(index) {
      this.formDynamic.items[index].status = 0
      this.formDynamic.items = this.formDynamic.items.filter(item => item.status == 1)
    },
    // 提交
    handelSubmit() {
      this.loading = true
      this.$refs['tBuildingArchivesForm'].validate((valid) => {
        if (valid) {
          this.$refs['formDynamic'].validate((valid) => {
            if (valid) {
              this.tBuildingArchivesForm.unitList = [];
              for (var i = 0; i < this.formDynamic.items.length; i++) {
                if (this.formDynamic.items[i].status == 1 && this.formDynamic.items[i].name.toString().trim().length > 0) {
                  this.tBuildingArchivesForm.unitList.push(this.formDynamic.items[i])
                }
              }
              if (this.tBuildingArchivesForm.unitList.length == 0) {
                this.$Message.error('请填加单元！！')
                this.loading = false
                return
              }
              var find = false
              for (var ii = 0; ii < this.tBuildingArchivesForm.unitList.length; ii++) {
                for (var j = ii + 1; j < this.tBuildingArchivesForm.unitList.length; j++) {
                  if (this.tBuildingArchivesForm.unitList[ii].name == this.tBuildingArchivesForm.unitList[j].name) {
                    find = true
                    break
                  }
                }
                if (find) break
              }
              if (find) {
                this.$Message.error('单元名重复！！')
                this.loading = false
                return
              }
              if (this.TBuildingArchivesId != null && this.TBuildingArchivesId.trim().length > 0) {
                this.tBuildingArchivesForm.id = this.TBuildingArchivesId
                this.tBuildingArchivesForm.isUpdateLocation = 1
                updateTBuildingArchives(this.tBuildingArchivesForm).then(res => {
                  this.loading = false
                  if (res) {
                    if (res && res.code == 200) {
                      this.closeModal(false)
                      this.$emit('handleSearch')
                      this.$Message.success('保存成功')

                    } else {
                      this.$Message.error(res.msg)
                    }
                  } else {
                    this.$Message.error('保存失败')
                  }
                })
              } else {
                addTBuildingArchives(this.tBuildingArchivesForm).then(res => {
                  this.loading = false
                  if (res) {
                    if (res && res.code == 200) {
                      this.closeModal(false)
                      this.$emit('handleSearch')
                      this.$Message.success('保存成功')

                    } else {
                      this.$Message.error(res.msg)
                    }
                  } else {
                    this.$Message.error('保存失败')
                  }
                })
              }
            } else {
              this.loading = false
              this.$Message.error('表单验证不通过！')
            }
          });
        } else {
          this.loading = false
          this.$Message.error('表单验证不通过！')
        }
      })
    },
    closeModal(val) {
      this.$emit('input', val)
    },
    // 重置表单
    initForm() {
      this.tBuildingArchivesForm = {
        id: '',
        buildingType: '1',
        buildingName: '',
        buildingAddress: '',
        community: '',
        communityId: '',
        grid: '',
        gridId: '',
        location: '',
        housingEstate: '',
        street: '',
        streetId: '',
        centerPoint: '',
        streetNumber: null,
        managerName: '',
        managerPhone: '',
        imgPath: '',
        imageIsUpdate: false,
        buildingYear: '',
        area: null,
        buildingNature: '',
        buildingStructure: '',
        elevatorNumber: '',
        parkPlaceNumber: null,
        profile: '',
        unitList: []
      }
      this.locationArr = null

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
      }
    },
    getTBuildingArchivesFormRule() {
      let _this = this;
      return {
        buildingType: [
          {required: true, message: '建筑类型不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        buildingName: [
          {required: true, message: '楼栋号不能为空！', trigger: 'blur', pattern: /.+/},
          {validator: _this.validateNumber, trigger: 'blur', pattern: /.+/}
        ],
        buildingAddress: [
          {required: true, message: '建筑地址不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        communityId: [
          {required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        grid: [
          {required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        location: [
          {required: true, message: '地图标注（地理坐标）不能为空！', trigger: 'blur'}
        ],
        area: [
          {required: true, message: '建筑面积不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        streetId: [
          {required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        housingEstate: [
          {required: true, message: '所属小区不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        buildingYear: [
          {required: true, message: '建筑年代不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        managerName: [
          {required: true, message: '楼栋长姓名不能为空！', trigger: 'blur', pattern: /.+/},
          {type: 'string', message: '街道号最大长度为10', trigger: 'blur'}
        ],
        managerPhone: [
          {required: true, message: '楼栋长电话不能为空！', trigger: 'blur', pattern: /.+/},
          {pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
        ],
        buildingNature: [
          {required: true, message: '建筑性质不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        buildingStructure: [
          {required: true, message: '建筑结构不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        elevatorNumber: [
          {required: true, message: '电梯数不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        parkPlaceNumber: [
          {required: true, message: '车位数不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        name: [
          {required: true, message: '单元名称不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        floorNumber: [
          {required: true, message: '楼层数不能为空！', trigger: 'blur', pattern: /.+/}
        ],
        householdsNumber: [
          {required: true, message: '层户数不能为空！', trigger: 'blur', pattern: /.+/}
        ]
      }
    },
    // 街道改变
    onStreetChange(e) {
      if (e) {
        this.tBuildingArchivesForm.street = e.label.trim()
        this.tBuildingArchivesForm.streetId = e.value
        // 社区
        this.tBuildingArchivesForm.community = ''
        this.tBuildingArchivesForm.communityId = ''
        this.communityArr = []
        // 网格
        this.tBuildingArchivesForm.grid = ''
        this.gridArr = []
        // 小区
        this.tBuildingArchivesForm.housingEstate = ''
        this.housingEstateData = []

        getCommunity({streetId: e.value}).then(res => {
          if (res && res.success) {
            this.communityArr = res.data
          }
        })
      }
    },
    // 社区改变
    onCommunityChange(e) {
      if (e) {
        if (e.label) {
          this.tBuildingArchivesForm.community = e.label.trim()
        }
        this.tBuildingArchivesForm.communityId = e.value.trim()
        // 网格
        this.tBuildingArchivesForm.grid = ''
        this.gridArr = []
        // 小区
        this.housingEstateData = []
        this.tBuildingArchivesForm.housingEstate = ''

        // this.gridArr = this.gridData.filter(item => item.communityId == e.value)
        gridsQueryAllList({communityId:this.tBuildingArchivesForm.communityId }).then(res => {
          if (res && res.success) {
            this.gridArr = res.data
          }
        })
      }
    },
    // 网格
    onGridsChange(e) {
      if (e) {
        // 小区
        this.housingEstateData = []
        this.tBuildingArchivesForm.housingEstate = ''

        // 获取小区数据
        queryAllList({gridId: e.value}).then(res => {
          if (res && res.success) {
            this.housingEstateData = res.data
          } else {
            this.$Message.error('获取小区数据失败，请重新刷新')
          }
        })
      }
    },
    // 联动结束
    checkMap: function () {
      if (this.tBuildingArchivesForm.location) {
        this.locationArr = JSON.parse(this.tBuildingArchivesForm.location)
      }

      getOtherPolygonData({id: this.tBuildingArchivesForm.id}).then(res => {
        if (res && res.success) {
          this.buildingData = res.data
          this.mapShow = true
        }
      })
    },
    getResultPoint(obj, type) {
      const arr = obj.flatCoordinates
      this.tBuildingArchivesForm.location = JSON.stringify(arr)
      var data = []
      var newArr = []
      for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i])
        if (i % 2 == 1) {
          data.push(newArr)
          newArr = []
        }
      }
      var extentData = olExtent.boundingExtent(data) // 获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
      var center = olExtent.getCenter(extentData)
      this.tBuildingArchivesForm.centerPoint = JSON.stringify(center)
      console.log(JSON.stringify(center))
      this.selectType = type
    },
    onFileUploadSuccess(res, file) {
      this.tBuildingArchivesForm.imgPath = res.data
    },
    onFileUploadError(file) {
      this.$Message.error('图片上传失败！')
    },
    onRemovePath() {
      this.tBuildingArchivesForm.imgPath = ''
    },
    //number 输入框限定长度
    limitOrder() {
      // 要做长度判断
      if (this.$refs.order.value.length > 2) {
        this.$refs.order.value = this.$refs.order.value.slice(0, 2)
        this.order = this.$refs.order.value
      }
    },
    //单元下拉框打开事件
    unitClick(value){
      if(value){
        this.$nextTick(() => {
          let middle= this.$refs["tBuildingArchives"];
          middle.scrollTop = middle.scrollHeight;
        })
      }
    },
  }
}
</script>
