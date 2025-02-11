<style lang="less">
  .basicHousingEstate {
    .distpicker-address-wrapper select {
      width: 180px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #3e3e3e;
      padding: 0px;
      margin-bottom: 20px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="false" width="900">
    <Form
      ref="basicHousingEstateForm"
      :model="basicHousingEstateForm"
      :rules="basicHousingEstateFormRule"
      class="basicHousingEstate"
      :label-width="120"
    >
      <Row>
        <Col span="8">
          <FormItem label="小区名称" prop="name">
            <Input v-model="basicHousingEstateForm.name" type="text" :maxlength="50" placeholder="请输入小区名称"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="物业名称" prop="propertyNameId">
            <Select
              v-model="basicHousingEstateForm.propertyNameId"
              filter
              placeholder="请选择物业名称"
              label-in-value
              @on-change="propertyNameChange"
            >
              <Option v-for="(item, i)  in propertyList" :key="item.id" :value="item.id">{{ item.propertyName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="物业类型" prop="propertyType">
            <Select v-model="basicHousingEstateForm.propertyType" filter placeholder="请选择物业类型">
              <Option v-for="(item, i)  in propertyTypePriority" :key="item.id.toString()" :value="item.number.toString()">{{
                item.name }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="streetId">
            <Select v-model="basicHousingEstateForm.streetId" class="select-form" placeholder="请选择所属街道"
                    :label-in-value="true" clearable @on-clear="closeStreet" @on-change="streetChange">
              <Option v-for="(item, i) in streetData" :key="item.id.toString()" :value="item.id.toString()">{{ item.name
                }}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="communityId">
            <Select
              ref="closeCommunity"
              v-model="basicHousingEstateForm.communityId"
              class="select-form"
              placeholder="请选择所属社区"
              clearable
              :label-in-value="true"
              @on-change="selectCommunity"
              @on-clear="clearCommunity"
            >
              <Option v-for="(item, i) in communityPriority" :key="item.id.toString()" :value="item.id.toString()">{{
                item.name }}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="gridId">
            <Select
              ref="closeGrid"
              v-model="basicHousingEstateForm.gridId"
              class="select-form"
              placeholder="请选择所属网格"
              clearable
              :label-in-value="true"
              @on-change="selectGrid"
            >
              <Option v-for="(item, i) in gridPriority" :key="i" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="物业负责人" prop="propertyPerson">
            <Input
              v-model="basicHousingEstateForm.propertyPerson"
              type="text"
              :maxlength="50"
              placeholder="请输入物业负责人"
            />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="物业电话" prop="propertyPhone">
            <Input
              v-model="basicHousingEstateForm.propertyPhone"
              type="text"
              :maxlength="50"
              placeholder="请输入物业电话"
            />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="经纬度">
            <Input
              v-model="basicHousingEstateForm.location"
              type="text"
              icon="md-flag"
              placeholder="请输入经纬度"
              @on-click="checkMap"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="账号">
            <Input v-model="basicHousingEstateForm.userName" type="text" :maxlength="50" placeholder="请输入账号"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="密码">
            <Input v-model="basicHousingEstateForm.password" type="password" :maxlength="50" placeholder="请输入密码"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="人脸识别库的id">
            <Input v-model="basicHousingEstateForm.recognitionFaceId" type="text" :maxlength="50"
                   placeholder="请输入人脸识别库的id"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="小区地址" prop="address" v-if="reFresh">
          <v-distpicker v-if="BasicHousingEstateId != null && BasicHousingEstateId.trim().length > 0"  @province="province" @city="city" @area="area" :province="placeholders.province" :city="placeholders.city" :area="placeholders.area"></v-distpicker>
          <v-distpicker v-else :placeholders="placeholders"   @province="province" @city="city" @area="area" province="" city="" area=""></v-distpicker>
          <Input v-model="basicHousingEstateForm.address" type="text" :maxlength="50" placeholder="请输入小区详细地址"/>
        </FormItem>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>

    <plot
      v-model="mapShow"
      :obj-data="locationArr"
      :select-type="selectType"
      :building-data="buildingData"
      :div-id="divId"
      modal-title="选择坐标点"
      @resultPoint="getResultPoint"
    />
  </Modal>
</template>
<script>
  import {
    addBasicHousingEstate,
    queryBasicHousingEstateList,
    updateBasicHousingEstate,
    getBasicHousingEstate
  } from '@/api/zhsq/basicHousingEstate/basicHousingEstate'
  import { queryAllList as propertyManagementAllList } from '@/api/zhsq/tZhsqPropertyManagement/tZhsqPropertyManagement'
  import { queryAllList as gridsQueryAllList } from '@/api/zhsq/basicGrids/basicGrids'
  import plot from '@/views/gismap/components/plot'
  import { getStreet, getCommunity } from '@/api/index'
  import { getDictionary } from '@/api/index'
  import VDistpicker from 'v-distpicker'

  export default {
    name: 'UpdateBasicHousingEstate',
    components: {
      plot, VDistpicker
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      BasicHousingEstateId: {
        type: String
      },
      modalTitle: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        divId: 'basicHousingEstate',
        selectType: 'Polygon',
        show: this.value,
        editTitle: this.modalTitle,
        loading: false,
        disabled: false,
        propertyTypePriority: [], // 物业类型
        communityPriority: [], // 所属社区
        gridPriority: [], // 所属网格
        streetData: [], // 所属街道
        basicHousingEstateForm: {
          name: '',
          address: '',
          propertyName: '',
          propertyNameId: '',
          propertyType: '',
          propertyPerson: '',
          propertyPhone: '',
          community: '',
          communityId: '',
          grid: '',
          gridId: '',
          location: '',
          street: '', // 所属街道
          streetId: '', // 所属街道
          streetNumber: null,
          userName: '',
          password: '',
          recognitionFaceId: '',
          province: '',
          city: '',
          county: ''
        },
        basicHousingEstateFormRule: this.getBasicHousingEstateFormRule(),
        // 物业列表
        propertyList: [],
        locationArr: [],
        buildingData: [],
        mapShow: false,
        placeholders: {
          province: '-请选择省份-',
          city: '-请选择城市-',
          area: '-请选择区/县-'
        },
        reFresh:true,//是否刷新
      }
    },
    watch: {
      value(val) {
        this.show = val
      },
      show(val) {
        this.getPropertyList()
        this.initForm()
        this.loading = false
        this.editTitle = this.modalTitle
        if (val) {
          this.reFresh = true;
          this.$forceUpdate();//重新渲染数据

          let _this = this;
          _this.$refs['basicHousingEstateForm'].resetFields()
          if (_this.BasicHousingEstateId != null && _this.BasicHousingEstateId.trim().length > 0) {
            getBasicHousingEstate({ id: this.BasicHousingEstateId }).then(res => {
              if (res && res.code == 200) {
                _this.basicHousingEstateForm.name = res.data.name
                _this.basicHousingEstateForm.location = res.data.location
                _this.basicHousingEstateForm.address = res.data.address
                _this.basicHousingEstateForm.propertyName = res.data.propertyName
                _this.basicHousingEstateForm.propertyNameId = res.data.propertyNameId

                _this.basicHousingEstateForm.propertyType = res.data.propertyType
                _this.basicHousingEstateForm.propertyPerson = res.data.propertyPerson
                _this.basicHousingEstateForm.propertyPhone = res.data.propertyPhone

                _this.basicHousingEstateForm.streetNumber = res.data.streetNumber

                _this.basicHousingEstateForm.street = res.data.street
                _this.basicHousingEstateForm.streetId = res.data.streetId
                _this.basicHousingEstateForm.userName = res.data.userName
                _this.basicHousingEstateForm.password = res.data.password
                _this.basicHousingEstateForm.recognitionFaceId = res.data.recognitionFaceId
                _this.basicHousingEstateForm.province = res.data.province
                _this.basicHousingEstateForm.city = res.data.city
                _this.basicHousingEstateForm.county = res.data.county

                _this.placeholders.province = res.data.province
                _this.placeholders.city = res.data.city
                _this.placeholders.area = res.data.county

                // 社区
                getCommunity({ streetId: res.data.streetId }).then(r => {
                  if (r.success) {
                    _this.communityPriority = r.data
                    _this.basicHousingEstateForm.communityId = res.data.communityId
                    _this.basicHousingEstateForm.community = res.data.community
                    _this.$forceUpdate();//重新渲染数据
                  }
                })


                // this.getGridsData({communityId:res.data.communityId});
                gridsQueryAllList({ 'communityId': res.data.communityId }).then(r => {
                  if (r&&r.success) {
                    _this.gridPriority = r.data
                    _this.basicHousingEstateForm.grid = res.data.grid
                    _this.basicHousingEstateForm.gridId = res.data.gridId
                    _this.$forceUpdate();//重新渲染数据
                  }
                })
                _this.$forceUpdate();//重新渲染数据
              } else {
                _this.$Message.error(res.msg)
              }
            })
          }
        } else {
          this.closeModal(val)
        }
      }
    },
    methods: {
      // 获取物业类型
      getPropertyType() {
        getDictionary({ 'fieldName': 'communityPriorityData' }).then(res => {
          if (res && res.success) {
            this.propertyTypePriority = res.data
          }
        })
      },
      clearCommunity() { // 清空社区
        this.$refs.closeGrid.clearSingleSelect()
        this.basicHousingEstateForm.communityId = ''
        this.basicHousingEstateForm.community = ''
        this.basicHousingEstateForm.gridId = ''
        this.basicHousingEstateForm.grid = ''
        this.gridPriority = null
      },
      closeStreet() { // 清空街道
        this.$refs.closeCommunity.clearSingleSelect()
        this.$refs.closeGrid.clearSingleSelect()
        this.basicHousingEstateForm.streetId = ''
        this.basicHousingEstateForm.street = ''
        this.basicHousingEstateForm.communityId = ''
        this.basicHousingEstateForm.community = ''
        this.basicHousingEstateForm.gridId = ''
        this.basicHousingEstateForm.grid = ''
        this.communityPriority = null
        this.gridPriority = null
      },
      // 物业名改变，带出物业类型、负责人、电话
      propertyNameChange(e) {
        if (e) {
          this.basicHousingEstateForm.propertyNameId = e.value.trim()
          this.basicHousingEstateForm.propertyName = e.label.trim()
          const newData = this.propertyList.filter(function(item, index, arr) {
            return item.id == e.value
          })

          if (newData != null && newData.length > 0) {
            this.basicHousingEstateForm.propertyType = newData[0].propertyType
            this.basicHousingEstateForm.propertyPerson = newData[0].propertyPrincipal
            this.basicHousingEstateForm.propertyPhone = newData[0].propertyPrincipalPhone
          }
        }
      },
      // 获取物业列表
      getPropertyList() {
        const _this = this
        propertyManagementAllList().then(res => {
          if (res && res.success) {
            _this.propertyList = res.data
          }
        })
      },
      getStreetData() { // 获取街道数据
        getStreet().then(res => {
          this.streetData = res.data
        })
      },
      streetChange(e) { // 选择街道
        if (e) {
          this.basicHousingEstateForm.street = e.label
          this.basicHousingEstateForm.streetId = e.value
          getCommunity({ streetId: e.value }).then(res => {
            if (res && res.success) {
              this.communityPriority = res.data
            }
          })
          this.basicHousingEstateForm.communityId = ''
          this.basicHousingEstateForm.community = ''
          this.basicHousingEstateForm.gridId = ''
          this.basicHousingEstateForm.grid = ''
          this.gridPriority = null
        } else {
          this.communityPriority = null
          this.basicHousingEstateForm.street = ''
          this.basicHousingEstateForm.streetId = ''
        }
      },
      selectCommunity(v) { // 选择社区
        if (v) {
          this.getGridsData(v)
        } else {
          this.gridPriority = null
          this.basicHousingEstateForm.community = ''
          this.basicHousingEstateForm.communityId = ''
        }
      },
      selectGrid(v) { // 网格选择
        if (v) {
          this.basicHousingEstateForm.grid = v.label
          this.basicHousingEstateForm.gridId = v.value
        } else {
          this.basicHousingEstateForm.grid = ''
          this.basicHousingEstateForm.gridId = ''
        }
      },
      // 获取网格数据
      getGridsData(data) {
        this.basicHousingEstateForm.community = data.label
        this.basicHousingEstateForm.communityId = data.value
        gridsQueryAllList({ 'communityId': data.value }).then(res => {
          if (res && res.success) {
            this.gridPriority = res.data
          } else {
            this.$Message.error('获取网格数据失败，请重新刷新')
          }
        })
        this.basicHousingEstateForm.grid = ''
        this.basicHousingEstateForm.gridId = ''
      },
      handelSubmit() {
        this.loading = true
        this.$refs['basicHousingEstateForm'].validate((valid) => {
          let _this = this
          if (valid) {

            if (!_this.basicHousingEstateForm.province || _this.basicHousingEstateForm.province.trim().indexOf('-') > -1 || _this.basicHousingEstateForm.province.trim().indexOf('选择') > -1|| _this.basicHousingEstateForm.province.trim()=="省"
              || !_this.basicHousingEstateForm.city || _this.basicHousingEstateForm.city.trim().indexOf('-') > -1 || _this.basicHousingEstateForm.city.trim().indexOf('选择') > -1|| _this.basicHousingEstateForm.city.trim()=="市"
              || !_this.basicHousingEstateForm.county || _this.basicHousingEstateForm.county.trim().indexOf('-') > -1 || _this.basicHousingEstateForm.county.trim().indexOf('选择') > -1|| _this.basicHousingEstateForm.county.trim()=="区") {
              _this.$Message.error('请选择省/市/区！！')
              _this.loading = false
              return
            }
            if (_this.BasicHousingEstateId != null && _this.BasicHousingEstateId.trim().length > 0) {
              _this.basicHousingEstateForm.id = _this.BasicHousingEstateId
              updateBasicHousingEstate(_this.basicHousingEstateForm).then(res => {
                _this.loading = false
                if (res && res.code == 200) {
                  _this.closeModal(false)
                  _this.$emit('handleSearch')
                  _this.$Message.success('保存成功')
                } else {
                  _this.$Message.error(res.msg)
                }
              })
            } else {
              addBasicHousingEstate(_this.basicHousingEstateForm).then(res => {
                _this.loading = false
                if (res && res.code == 200) {
                  _this.closeModal(false)
                  _this.$emit('handleSearch')
                  _this.$Message.success('保存成功')
                } else {
                  _this.$Message.error(res.msg)
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
        this.basicHousingEstateForm = {
          name: '',
          address: '',
          propertyName: '',
          propertyNameId: '',
          propertyType: '',
          propertyPerson: '',
          propertyPhone: '',
          community: '',
          communityId: '',
          grid: '',
          gridId: '',
          location: '',
          street: '', // 所属街道
          streetId: '', // 所属街道
          streetNumber: null,
          userName: '',
          password: '',
          recognitionFaceId: '',
          province: '-请选择省份-',
          city: '-请选择城市-',
          county: '-请选择区/县-'
        }
        this.locationArr = null
        this.getStreetData()
        this.communityPriority = null
        this.gridPriority = null
        this.getPropertyType()
        this.placeholders = {
          province: '-请选择省份-',
          city: '-请选择城市-',
          area: '-请选择区/县-'
        }
        this.reFresh = false;
      },
      getBasicHousingEstateFormRule() {
        return {
          name: [
            { required: true, message: '小区名称不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '小区地址不能为空！', trigger: 'blur' },
            { type: 'string', max: 255, message: '数据的最大长度为255！', trigger: 'blur' }
          ],
          propertyNameId: [
            { required: true, message: '物业名称不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
          ],
          propertyType: [
            { required: true, message: '物业类型不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
          ],
          propertyPerson: [
            { required: true, message: '物业负责人不能为空！', trigger: 'blur' },
            { type: 'string', max: 20, message: '数据的最大长度为20！', trigger: 'blur' }
          ],
          propertyPhone: [
            { required: true, message: '物业电话不能为空！', trigger: 'blur' },
            { max: 11, message: '数据的最大长度为11！', trigger: 'blur' }
            // { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' },
          ],
          streetId: [
            { required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          communityId: [
            { required: true, message: '所属社区不能为空！', trigger: 'changer', pattern: /.+/ }
          ],
          gridId: [
            { required: true, message: '所属网格不能为空！', trigger: 'changer' }
          ],
          location: [
            { required: true, message: '经纬度不能为空', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '省 不能为空！', trigger: 'changer', pattern: /.+/ }
          ],
          city: [
            { required: true, message: '市不能为空！', trigger: 'changer' }
          ],
          area: [
            { required: true, message: '区不能为空', trigger: 'blur' }
          ],
          streetNumber: [
            { required: true, message: '街道号不能为空！', trigger: 'blur', pattern: /.+/ },
            { pattern: /^[1-9]\d{0,4}$/, message: '街道号最大长度为5', trigger: 'blur' }
          ]
        }
      },
      checkMap: function() {
        if (this.basicHousingEstateForm.location) {
          this.locationArr = JSON.parse(this.basicHousingEstateForm.location)
        }
        queryBasicHousingEstateList({}).then(res => {
          this.buildingData = []
          if (res && res.success) {
            res.data.records.forEach(element => {
              if (element.location) {
                this.buildingData.push({
                  housingEstateName: element.name,
                  location: element.location
                })
              }
            })
            this.mapShow = true
          }
        })
      },
      getResultPoint(obj, type) {
        const arr = obj.flatCoordinates
        this.basicHousingEstateForm.location = JSON.stringify(arr)
        this.selectType = type
      },
      //省市区选择事件
      distPickerSelected(data) {
        this.basicHousingEstateForm.province = data.province.value
        this.basicHousingEstateForm.city = data.city.value
        this.basicHousingEstateForm.county = data.area.value
      },
      //省选择事件
      province(data) {
        this.basicHousingEstateForm.province = data.value
        this.placeholders.province = data.value
        this.basicHousingEstateForm.city = ""
        this.basicHousingEstateForm.county = ""

      },
      //市选择事件
      city(data) {
        this.basicHousingEstateForm.city = data.value
        this.placeholders.city = data.value
        this.basicHousingEstateForm.county = ""
      },
      //区选择事件
      area(data) {
        this.basicHousingEstateForm.county = data.value
        this.placeholders.county = data.value
      },
    }
  }
</script>
