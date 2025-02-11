<style lang="less" scoped>
.tZhsqMerchantProfile {
}
</style>
<template>
  <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="false" :width="900">
    <Form ref="tZhsqMerchantProfileForm" :model="tZhsqMerchantProfileForm" :rules="tZhsqMerchantProfileFormRule"
          class="tZhsqMerchantProfile" :label-width="110">
      <Row>
        <Col span="8">
          <Row>
            <FormItem label="商户类别" prop="merchantSort">
              <Select v-model="tZhsqMerchantProfileForm.merchantSort" placeholder="请选择商户类别" clearable>
                <Option v-for="(item, i) in merchantSortPriority" :key="item.id.toString()"
                        :value="item.number.toString()">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人身份证号" prop="legalId">
              <Input type="text" :maxlength=50 v-model="tZhsqMerchantProfileForm.legalId" placeholder="请输入法人身份证号"/>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人电话" prop="legalPhone">
              <Input type="text" :maxlength=50 v-model="tZhsqMerchantProfileForm.legalPhone" placeholder="请输入法人电话"/>
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <Row>
            <FormItem label="商户名称" prop="merchantName">
              <Input type="text" :maxlength=50 v-model="tZhsqMerchantProfileForm.merchantName" placeholder="请输入商户名称"/>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人姓名" prop="legalEntity">
              <Input type="text" :maxlength=50 v-model="tZhsqMerchantProfileForm.legalEntity" placeholder="请输入法人姓名"/>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="经纬度" prop="location">
              <Input type="text" :maxlength=50 v-model="tZhsqMerchantProfileForm.location" placeholder="请输入经纬度"
                     icon="md-map" :readonly="true" @on-click="checkMap"/>
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <FormItem label="图片">
            <uploadHeaderImg v-model="tZhsqMerchantProfileForm.headPortrait" @uploadSuccess="onFileUploadSuccess" @uploadError="onFileUploadError" @removePath="onRemovePath"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="streetId">
            <Select v-model="tZhsqMerchantProfileForm.streetId" placeholder="请选择所属街道" clearable
                    @on-change="streetChange" :label-in-value="true" @on-clear="clearStreet">
              <Option v-for="(item, i) in streetData" :key="item.id.toString()" :lable="item.name" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="legalCommunityId">
            <Select v-model="tZhsqMerchantProfileForm.legalCommunityId" placeholder="请选择所属社区" ref="legalCommunity"
                    clearable label-in-value  @on-change="selectCommunity" >
              <Option v-for="(item, i) in legalCommunityPriority" :key="item.id.toString()" :lable="item.name" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="gridId">
            <Select v-model="tZhsqMerchantProfileForm.gridId" placeholder="请选择所属网格" ref="grid" :label-in-value="true"
                    clearable @on-change="selectGrid">
              <Option v-for="(item, i) in legalGridPriority" :key="i" :value="item.id" :lable="item.name" >{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="商户地址" prop="merchantAddress">
            <Input type="text" :maxlength=50 v-model="tZhsqMerchantProfileForm.merchantAddress" placeholder="请输入商户地址"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="经营范围" prop="businessScope">
            <Input type="textarea" :maxlength=500 v-model="tZhsqMerchantProfileForm.businessScope"
                   placeholder="请输入经营范围"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>

    <plot v-model="ShowMap" modalTitle="选择坐标点" @resultPoint="getPosition" divId="tZhsqMerchantProfile"
          :objData="pointArr" iconPath="/img/archives/shanghu.png" :selectType="selectTypee"></plot>

  </Modal>
</template>
<script>
import {
  addTZhsqMerchantProfile,
  updateTZhsqMerchantProfile,
  getTZhsqMerchantProfile
} from '@/api/zhsq/tZhsqMerchantProfile/tZhsqMerchantProfile'
import { getDictDataByType } from '@/api/index'
import { nginxUrl } from '@/api/tools/tool'
import { queryAllList } from '@/api/zhsq/basicGrids/basicGrids'
import plot from '@/views/gismap/components/plot'
import { getStreet, getCommunity, getDictionary } from '@/api/index'
import uploadHeaderImg from '@/components/uploadHeaderImg'
export default {
  name: 'updateTZhsqMerchantProfile',
  components: {
    uploadHeaderImg,
    plot
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TZhsqMerchantProfileId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      imageUrlList: [],
      show: this.value,
      editTitle: this.modalTitle,
      loading: true,
      tZhsqMerchantProfileForm: {
        houseId: '',
        merchantSort: '',
        merchantName: '',
        merchantAddress: '',
        businessScope: '',
        legalEntity: '',
        legalPhone: '',
        lagalId: '',
        location: '',
        street: '',
        streetId: '',
        legalCommunityId: '',
        legalCommunity: '',
        legalGrid: '',
        gridId: '',
        headPortrait: ''
      },
      tZhsqMerchantProfileFormRule: this.getTZhsqMerchantProfileFormRule(),
      merchantSortPriority: [],//商户类别子项
      streetData: [],
      legalCommunityPriority: [],//所属社区子项
      legalGridPriority: [],//所属网格子项
      ShowMap: false,
      pointArr: [],
      selectTypee: 'Point',
      //头像是否被修改
      imageIsUpdate: false
    }
  },
  methods: {
    clearCommunity() {//清空社区
      this.tZhsqMerchantProfileForm.legalCommunityId = ''
      this.tZhsqMerchantProfileForm.legalCommunity = ''
      this.tZhsqMerchantProfileForm.gridId = ''
      this.tZhsqMerchantProfileForm.legalGrid = ''
      this.legalGridPriority = null
    },
    clearStreet() {//清空街道
      this.$refs.legalCommunity.clearSingleSelect()
      this.$refs.grid.clearSingleSelect()
      this.tZhsqMerchantProfileForm.streetId = ''
      this.tZhsqMerchantProfileForm.street = ''
      this.tZhsqMerchantProfileForm.legalCommunityId = ''
      this.tZhsqMerchantProfileForm.legalCommunity = ''
      this.tZhsqMerchantProfileForm.gridId = ''
      this.tZhsqMerchantProfileForm.legalGrid = ''
      this.legalCommunityPriority = null
      this.legalGridPriority = null
    },
    getStreetData() {//获取街道数据
      getStreet().then(res => {
        this.streetData = res.data
      })
    },
    streetChange(e) {//选择街道
      if (e) {
        this.tZhsqMerchantProfileForm.street = e.label
        this.tZhsqMerchantProfileForm.streetId = e.value
        getCommunity({ streetId: e.value }).then(res => {
          if (res && res.success) {
            this.legalCommunityPriority = res.data
          }
        })
        this.tZhsqMerchantProfileForm.legalCommunityId = ''
        this.tZhsqMerchantProfileForm.legalCommunity = ''
        this.legalGridPriority = null
        this.tZhsqMerchantProfileForm.legalGrid = ''
        this.tZhsqMerchantProfileForm.gridId = ''
      } else {
        this.legalCommunityPriority = null
        this.tZhsqMerchantProfileForm.street = ''
        this.tZhsqMerchantProfileForm.streetId = ''
      }

    },
    selectCommunity(v) {//选择所属社区
      if (v) {
        this.gridItem(v)
        this.tZhsqMerchantProfileForm.legalCommunity = v.label
        this.tZhsqMerchantProfileForm.legalCommunityId = v.value
        this.tZhsqMerchantProfileForm.legalGrid = ''
        this.tZhsqMerchantProfileForm.gridId = ''
      } else {
        this.legalGridPriority = []
        this.tZhsqMerchantProfileForm.legalCommunityId = ''
        this.tZhsqMerchantProfileForm.legalCommunity = ''
      }
    },
    selectGrid(v) {//选择网格
      if (v) {
        this.tZhsqMerchantProfileForm.legalGrid = v.label
        this.tZhsqMerchantProfileForm.gridId = v.value
      }
    },
    getPosition(obj, type) {
      this.tZhsqMerchantProfileForm.location = JSON.stringify(obj.flatCoordinates)
    },
    //点击地图图标
    checkMap() {
      if (this.tZhsqMerchantProfileForm.location) {
        this.pointArr = JSON.parse(this.tZhsqMerchantProfileForm.location)
      }
      this.ShowMap = true
    },

    //网格数据
    gridItem(v) {
      if (v) {
        queryAllList({ 'communityId': v.value }).then(res => {
          if (res && res.success) {
            this.legalGridPriority = res.data
          } else {
            this.$Message.error('获取网格数据失败，请重新刷新')
          }
        })
      }
    },
    handelSubmit() {
      this.$refs['tZhsqMerchantProfileForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.TZhsqMerchantProfileId != null && this.TZhsqMerchantProfileId.trim().length > 0) {
            this.tZhsqMerchantProfileForm.id = this.TZhsqMerchantProfileId
            if (this.imageIsUpdate) {
              //用于判断图片是否修改
              this.tZhsqMerchantProfileForm['imageIsUpdate'] = this.imageIsUpdate
            }
            updateTZhsqMerchantProfile(this.tZhsqMerchantProfileForm).then(res => {
              this.loading = false
              if (res && res.code == 200) {
                this.closeModal(false)
                this.$emit('handleSearch')
                this.$Message.success('保存成功')
              } else {
                this.$Message.error(res.msg)
              }
            }).catch(error => {
              this.loading = false
            })
          } else {
            addTZhsqMerchantProfile(this.tZhsqMerchantProfileForm).then(res => {
              this.loading = false
              if (res && res.code == 200) {
                this.closeModal(false)
                this.$emit('handleSearch')
                this.$Message.success('保存成功')
              } else {
                this.$Message.error(res.msg)
              }
            }).catch(error => {
              this.loading = false
            })
          }
        } else {
          this.$Message.error('表单验证不通过！')
        }
      })
    },
    closeModal(val) {
      this.$emit('input', val)
    },
    getMerchantSortPriority() {//获取商户类别
      getDictionary({ 'fieldName': 'merchantSortData' }).then(res => {
        if (res && res.success) {
          this.merchantSortPriority = res.data
        }
      })
    },
    initForm() {
      this.pointArr = null
      this.imageUrlList = []
      this.imageIsUpdate = false
      this.legalGridPriority = []
      this.tZhsqMerchantProfileForm = {
        houseId: '',
        merchantSort: '',
        merchantName: '',
        merchantAddress: '',
        businessScope: '',
        legalEntity: '',
        legalPhone: '',
        legalId: '',
        location: '',
        streetId: '',
        street: '',
        legalCommunity: '',
        legalCommunityId: '',
        legalGrid: '',
        gridId: '',
        headPortrait: ''
      }
      this.getStreetData()
      this.getMerchantSortPriority()
    },
    getTZhsqMerchantProfileFormRule() {
      return {
        merchantSort: [
          { required: true, message: '商户类别不能为空！', trigger: 'changer' }
        ],
        merchantName: [
          { required: true, message: '商户名称不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '商户名称的最大长度为50！', trigger: 'blur' }
        ],
        merchantAddress: [
          { required: true, message: '商户地址不能为空！', trigger: 'blur' },
          { type: 'string', max: 100, message: '商户地址的最大长度为100！', trigger: 'blur' }
        ],
        businessScope: [
          { required: true, message: '经营范围不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '经营范围的最大长度为50！', trigger: 'blur' }
        ],
        legalEntity: [
          { required: true, message: '法人姓名不能为空！', trigger: 'blur' },
          { type: 'string', max: 10, message: '法人姓名的最大长度为10！', trigger: 'blur' }
        ],
        legalPhone: [
          { required: true, message: '法人联系电话不能为空！', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入数字格式', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '联系电话格式不正确', trigger: 'blur' },
          { type: 'string', max: 11, message: '联系电话的最大长度为11！', trigger: 'blur' }
        ],
        legalId: [
          { required: true, message: '法人身份证号不能为空！', trigger: 'blur' },
          {
            type: 'string',
            max: 18,
            min: 18,
            pattern: /^\d{6}(1[8-9]|[2-9][0-9])\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
            message: '请输入正确的身份证号',
            trigger: 'blur'
          },
          { type: 'string', max: 18, message: '身份证号的最大长度为18！', trigger: 'blur' }
        ],
        streetId: [
          { required: true, message: '所属街道不能为空！', trigger: 'changer' }
        ],
        legalCommunityId: [
          { required: true, message: '所属社区不能为空！', trigger: 'changer' }
        ],
        gridId: [
          { required: true, message: '所属网格不能为空！', trigger: 'changer' }
        ]
      }
    },
    onFileUploadSuccess(res, file) {
      this.tZhsqMerchantProfileForm.headPortrait = res.data
    },
    onFileUploadError(file) {
      this.$Message.error('图片上传失败！')
    },
    onRemovePath() {
      this.tZhsqMerchantProfileForm.headPortrait = ''
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.initForm()
      this.loading = false
      this.editTitle = this.modalTitle
      if (val) {
        this.$refs['tZhsqMerchantProfileForm'].resetFields()
        if (this.TZhsqMerchantProfileId != null && this.TZhsqMerchantProfileId.trim().length > 0) {
          getTZhsqMerchantProfile({ id: this.TZhsqMerchantProfileId }).then(res => {
            if (res && res.code == 200) {
              this.tZhsqMerchantProfileForm.merchantSort = res.data.merchantSort
              this.tZhsqMerchantProfileForm.merchantName = res.data.merchantName
              this.tZhsqMerchantProfileForm.merchantAddress = res.data.merchantAddress
              this.tZhsqMerchantProfileForm.businessScope = res.data.businessScope
              this.tZhsqMerchantProfileForm.houseId = res.data.houseId
              this.tZhsqMerchantProfileForm.legalEntity = res.data.legalEntity
              this.tZhsqMerchantProfileForm.legalPhone = res.data.legalPhone
              this.tZhsqMerchantProfileForm.legalId = res.data.legalId
              this.tZhsqMerchantProfileForm.location = res.data.location
              this.tZhsqMerchantProfileForm.streetId = res.data.streetId
              this.tZhsqMerchantProfileForm.street = res.data.street
              getCommunity({ streetId: this.tZhsqMerchantProfileForm.streetId }).then(res => {
                if (res && res.success) {
                  this.legalCommunityPriority = res.data
                }
              })
              this.tZhsqMerchantProfileForm.legalCommunity = res.data.legalCommunity
              this.tZhsqMerchantProfileForm.legalCommunityId = res.data.legalCommunityId
              this.gridItem({ 'value': this.tZhsqMerchantProfileForm.legalCommunityId })
              this.tZhsqMerchantProfileForm.legalGrid = res.data.legalGrid
              this.tZhsqMerchantProfileForm.gridId = res.data.gridId
              this.tZhsqMerchantProfileForm.headPortrait = res.data.headPortrait
              if (this.tZhsqMerchantProfileForm.headPortrait) {
                this.imageUrlList.push(nginxUrl + this.tZhsqMerchantProfileForm.headPortrait)
              }
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      } else {
        this.closeModal(val)
        this.legalCommunityPriority = null
        this.legalGridPriority = null
      }
    }
  }
}
</script>
