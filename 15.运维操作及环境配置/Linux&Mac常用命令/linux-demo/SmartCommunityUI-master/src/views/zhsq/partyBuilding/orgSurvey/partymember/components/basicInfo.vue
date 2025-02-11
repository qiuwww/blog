<template>
  <div style="padding-bottom: 40px">
    <div v-if="type !== 'info'">
      <el-form ref="postForm" class="p16" :inline="true" :model="formData" :label-width="'100px'" :rules="rules">
        <el-form-item label="头像:" style="width: 100%" prop="headSculpture">
          <el-input v-model="formData.headSculpture" style="display: none" />
          <el-image v-if="formData.headSculpture" :src="formData.headSculpture" style="max-width: 100px;float: left"><div slot="error" class="image-slot">
          </div></el-image>
          <a v-loading.fullscreen.lock="fullscreenLoading" class="uploadBtn" @click="uploadFileBtn">上传</a><input id="uploadInput" ref="uploadInput" type="file" @change="uploadFile($event)">
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="formData.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="性别:" prop="gender">
          <el-select v-model="formData.gender" clearable placeholder="性别">
            <el-option v-for="(item, index) in genders" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="党员类型:" prop="partyCategoryId">
          <el-select v-model="formData.partyCategoryId" clearable placeholder="党员类型" @change="selectCategorys">
            <el-option v-for="(item, index) in categorys" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="文化程度:" prop="educationId">
          <el-select v-model="formData.educationId" clearable placeholder="文化程度" @change="educationChange">
            <el-option v-for="(item, index) in educationIds" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯:" prop="nativePlace">
          <el-input v-model="formData.nativePlace" placeholder="籍贯" />
        </el-form-item>
        <el-form-item label="身份证:" prop="idCardNo">
          <el-input v-model="formData.idCardNo" placeholder="身份证" />
        </el-form-item>
        <el-form-item label="手机号:" prop="phoneNumber">
          <el-input v-model="formData.phoneNumber" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="民族:" prop="nation">
          <el-select v-model="formData.nationId" placeholder="请选择" @change="selectNation">
            <el-option v-for="(item, index) in nations" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="党委名称:" prop="partyCommitteeId">
          <el-select v-model="formData.partyCommitteeId" clearable placeholder="请选择" @change="selectComminttee">
            <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="支部名称:" prop="partyBranchId">
          <el-select v-model="formData.partyBranchId" clearable placeholder="请选择" @change="selectBranch">
            <el-option v-for="(item, index) in branchs" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日:" prop="birthday">
          <el-date-picker
            v-model="formData.birthday"
            type="date"
            style="width: 160px"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>

        <el-form-item label="入党时间:" prop="partyDate" style="   margin-left: 39px;">
          <el-date-picker
            v-model="formData.partyDate"
            type="date"
            style="width: 160px  "
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="居住地址:" prop="residentialAddress">
          <el-input v-model="formData.residentialAddress" placeholder="居住地址" />
        </el-form-item>
        <el-form-item label="单位地址:" prop="unitAddress">
          <el-input v-model="formData.unitAddress" placeholder="单位地址" />
        </el-form-item>
      </el-form>
      <div class="text-right fomrFooter">
        <Button type="text" @click="closeModel">取消</Button>
        <Button type="primary" class="ml30" :loading="httpLoading" @click="postFormData">提交</Button>
      </div>
    </div>
    <div v-else>
      <el-form ref="postForm" :inline="true" :model="formData" :label-width="'100px'" class="infoForm">
        <el-form-item label="头像:" style="width: 100%">
          <el-image v-if="formData.headSculpture" :src="formData.headSculpture" style="max-width: 100px;float: left"><div slot="error" class="image-slot">
          </div></el-image>
        </el-form-item>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="姓名:">
              {{ formData.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:">
              {{ formData.gender === 1 ? '男' : '女' }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="党员类型:">
              {{ formData.partyCategoryName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文化程度:">
              {{ formData.educationName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="籍贯:">
              {{ formData.nativePlace }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证:">
              {{ formData.idCardNo }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="手机号:">
              {{ formData.phoneNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="民族:">
              {{ formData.nation }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="党委名称:">
              {{ formData.partyCommitteeName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支部名称:">
              {{ formData.partyBranchName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="生日:">
              {{ formData.birthday }}
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="入党时间:">
              {{ formData.partyDate }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="居住地址:">
              {{ formData.residentialAddress }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位地址:">
              {{ formData.unitAddress }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/zhsq/common/fileManage'
import {
  getPartyBranchList
} from '@/api/zhsq/partyManage/index'
import { partymemberAdd, partymemberEdit } from '@/api/zhsq/partymember/index'
import { validateSfz, nation } from '@/utils/party.js'
// 党员基本信息
export default {
  name: 'BasicInfo',
  props: {
  //  弹窗类型-----add新增，-----edit编辑, ----info查看
    type: {
      type: String,
      default: ''
    },
    // 党委列表
    committees: {
      type: Array,
      default: () => []
    },
    //  弹窗显示条件
    modalShow: {
      type: Boolean,
      default: false
    },
    // 查看编辑对象
    data: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      // 按钮状态
      httpLoading: false,
      //  支部数据list
      branchs: [],
      // 加载层
      fullscreenLoading: false,
      nations: nation.data,
      formData: {
        partyCommitteeId: '',
        partyBranchId: ''
      },
      // 党员类型 - 支部
      categorys: [
        { name: '支部委员', id: 1 },
        { name: '支部党员', id: 2 },
        { name: '入党积极分子', id: 3 },
        { name: '新转入党员', id: 4 },
        { name: '退出党员', id: 5 },
        { name: '退党党员', id: 6 },
        { name: '迁出党员', id: 7 },
        { name: '死亡党员', id: 8 }
      ],
      // 性别
      genders: [
        { name: '男', id: 1 },
        { name: '女', id: 2 }
      ],
      educationIds: [
        { name: '小学', id: 1 },
        { name: '初中', id: 2 },
        { name: '高中', id: 3 },
        { name: '中专', id: 4 },
        { name: '大专', id: 5 },
        { name: '本科', id: 6 },
        { name: '硕士', id: 7 },
        { name: '博士', id: 8 }
      ],
      rules: {
        partyBranchId: [
          { required: true, message: '请选择党委支部', trigger: 'change' }
        ],
        partyCategoryId: [
          { required: true, message: '请选择党员分类', trigger: 'change' }
        ],
        partyDate: [
          { type: 'string', required: true, message: '请选择入党时间', trigger: 'change' }
        ],
        birthday: [
          { type: 'string', required: true, message: '请选择生日', trigger: 'change' }
        ],
        educationId: [
          { required: true, message: '请选择文化程度', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        partyCommitteeId: [
          { required: true, message: '请选择档位名称', trigger: 'change' }
        ],
        nativePlace: [
          { required: true, message: '请填写籍贯', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '请选择民族', trigger: 'change' }
        ],
        idCardNo: [
          { required: true, message: '请填写身份证', trigger: 'blur' },
          {
            validator: validateSfz,
            trigger: 'blur'
          }
        ],
        residentialAddress: [
          { required: true, message: '请填写居住地址', trigger: 'blur' }
        ],
        unitAddress: [
          { required: true, message: '请填写单位地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请编辑内容', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '手机号不能为空！', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' },
          {  max: 11, message: '数据的最大长度为11！', trigger: 'blur' }
        ],
        headSculpture: [
          { required: true, message: '请上传头像 ', trigger: 'change' }
        ]
      }
    }
  },
  async mounted() {
    const self = this
    if (this.data.id) {
      this.httpLoading = false
      await self.getPartyBranchListFun(self.data.partyCommitteeId)
      nation.data.forEach(ele => {
        if (ele.name === self.data.nation) {
          self.data.nationId = ele.id
        }
      })
      this.formData = self.data
    }
  },
  methods: {
  // 选择文化程度
    educationChange(id) {
      this.educationIds.forEach(ele => {
        if (ele.id === id) {
          this.formData.educationName = ele.name
        }
      })
    },
    // 选择民族
    selectNation(id) {
      this.nations.forEach(ele => {
        if (ele.id === id) {
          this.formData.nation = ele.name
        }
      })
    },
    // 选择党员类型
    selectCategorys(id) {
      this.categorys.forEach(ele => {
        if (ele.id === id) {
          this.formData.partyCategoryName = ele.name
        }
      })
    },
    // 选择党委
    selectComminttee(id) {
      this.formData.partyBranchId = ''
      this.committees.forEach(ele => {
        if (ele.id === id) {
          this.formData.partyCommitteeName = ele.name
        }
      })
      this.getPartyBranchListFun(id)
    },
    // 获取支部列表
    getPartyBranchListFun(id) {
      getPartyBranchList({
        partyCommitteeId: id || '',
        current: 1,
        size: 100
      }).then(res => {
        this.branchs = res.data.records
      })
    },
    // 选择支部
    selectBranch(id) {
      this.branchs.forEach(ele => {
        if (ele.id === id) {
          this.formData.partyBranchName = ele.name
        }
      })
    },
    // 上传
    uploadFileBtn() {
      this.$refs.uploadInput.click()
    },
    // 上传文件
    async uploadFile(e) {
      const self = this
      self.fullscreenLoading = true
      setTimeout(() => {
        self.fullscreenLoading = false
      }, 10000)
      const formData = new FormData()
      formData.append('file', this.$refs.uploadInput.files[0])
      uploadImg(formData).then(res => {
        self.fullscreenLoading = false
        if (res && res.code === 200) {
          self.formData.headSculpture = res.data
          self.formData = this.obj = Object.assign({}, self.formData)
        }
      })
    },
    closeModel() {
      this.$emit('close')
    },
    // 提交表单
    postFormData() {
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          this.httpLoading = true
          if (this.type === 'add') {
            partymemberAdd(this.formData).then(res => {
              this.httpLoading = false
              this.$emit('add')
            })
          }
          if (this.type === 'edit') {
            partymemberEdit(this.formData).then(res => {
              this.httpLoading = false
              this.$emit('add')
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .fomrFooter{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14px 30px;
    background: #F8F9FA !important;
    border-radius: 0 0 12px 12px;
    /deep/.ivu-btn-primary{
      border-radius: 100px;
      padding: 0 40px;
    }
    /deep/.ivu-btn-text{
      border-radius: 100px;
      background: #ffffff;
      padding: 0 30px;
    }
  }
    .uploadBtn{
        display: inline-block;
        cursor: pointer;
        width: 79px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        background: #1890ff;
        border-radius: 4px;
        float: right;
        margin: 0px 40px;
    }
    .infoForm{
        /deep/.el-form-item__content{
            color: #999;
        }
    }
    /deep/.el-input__suffix{
      top: 1px;
    }
    /deep/.el-input__inner{
      width: 200px
    }
    #uploadInput{
        display: none;
    }
</style>
