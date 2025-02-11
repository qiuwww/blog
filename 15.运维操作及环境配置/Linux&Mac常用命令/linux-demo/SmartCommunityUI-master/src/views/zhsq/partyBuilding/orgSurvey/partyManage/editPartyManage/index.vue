<template>
  <div>
    <party-modal
      :title="title"
      :is-show-confirm-btn="false"
      :modal-show="modalShow"
      @close="closeModel"
    >
      <div class="formWrap">
        <div v-if="type !== 'info'">
          <el-form ref="postForm" class="p16" :inline="true" :model="formData" :label-width="'90px'" :rules="rules">
            <el-form-item label="组织名称:" prop="name">
              <el-input v-model="formData.name" placeholder="组织名称" style="width: 246px" />
            </el-form-item>
            <el-form-item label="所属街道:" prop="streetId">
              <el-select v-model="formData.streetId" clearable placeholder="请选择所属街道" style="width: 246px" @change="selectStreet">
                <el-option v-for="(item, index) in streets" :key="index" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="所属社区:" prop="communityId">
              <el-select v-model="formData.communityId" clearable placeholder="请选择所属社区" style="width: 246px" @change="areaChange">
                <el-option v-for="(item, index) in areas" :key="index" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="地址:" prop="address">
              <el-input v-model="formData.address" placeholder="地址"  style="width: 246px"/>
            </el-form-item>
            <el-form-item label="电话:" prop="phoneNumber">
              <el-input v-model="formData.phoneNumber" placeholder="电话" style="width: 246px" />
            </el-form-item>
            <el-form-item label="书记:" prop="secretary">
              <el-input v-model="formData.secretary" placeholder="书记"  style="width: 246px"/>
            </el-form-item>
            <el-form-item label="性别:" prop="gender">
              <el-select v-model="formData.gender" clearable placeholder="请选择性别" style="width: 246px">
                <el-option v-for="(item, index) in genders" :key="index" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-form>
          <div class="text-right fomrFooter">
            <Button type="text" @click="closeModel">取消</Button>
            <Button type="primary" class="ml30" :loading="httpLoading" @click="postFormData">提交</Button>
          </div>
        </div>
        <div v-else>
          <el-form :inline="true" :model="formData" class="demo-form-inline p16">
            <el-row>
              <el-col :span="12">
                <el-form-item label="组织名称:">
                  <span class="color666">{{ formData.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别:">
                  <span class="color666">{{ formData.gender === 1 ? '男' : '女' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属街道:">
                  <span class="color666">{{ formData.streetName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属辖区:">
                  <span class="color666">{{ formData.communityName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址:">
                  <span class="color666">{{ formData.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话:">
                  <span class="color666">{{ formData.phoneNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="书记:">
                  <span class="color666">{{ formData.secretary }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="text-right fomrFooter">
            <Button type="text" @click="closeModel">取消</Button>
          </div>
        </div>
      </div>
    </party-modal>
  </div>
</template>

<script>
import {
  getPartyCommitteeAdd,
  getLoadCommunityDeptByStreet,
  getPartyCommitteeEdit
} from '@/api/zhsq/partyManage/index'
import PartyModal from '@/components/partyModal/index'

export default {
  name: 'EditPartyManage',
  components: {
    PartyModal
  },
  props: {
  //  弹窗标题
    title: {
      type: String,
      default: ''
    },
    // 查看编辑对象
    data: {
      type: Object,
      default: () => {}
    },
    //  弹窗显示条件
    modalShow: {
      type: Boolean,
      default: false
    },
    //  弹窗类型-----add新增，-----edit编辑, ----info查看
    type: {
      type: String,
      default: ''
    },
    // 街道
    streets: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      //  按钮加载状态
      httpLoading: false,
      // 表单数据
      formData: {},
      // 性别
      genders: [
        { name: '男', id: 1 },
        { name: '女', id: 2 }
      ],
      // 辖区集合
      areas: [],
      // 表单验证规则
      rules: {
        communityId: [
          { required: true, message: '请选择社区', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        streetId: [
          { required: true, message: '请选择街道', trigger: 'change' }
        ],
        secretary: [
          { required: true, message: '请填写书记', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写组织名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写地址 ', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入合法手机号/电话号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    modalShow: function(newVaule, oldValue) {
      if (newVaule) {
        this.areas = []
        this.formData = {}
        this.httpLoading = false
        if (this.type !== 'add') {
          this.$nextTick(() => {
            this.formData = { ...this.data }
          })
        }
        if (this.type == 'edit') {
          this.getLoadCommunityDeptByStreetFun(this.data.streetId)
        }
      }
    }
  },
  methods: {
  // 关闭
    closeModel() {
      this.$emit('close')
    },
    //  选择街道
    selectStreet(id) {
      const self = this
      this.streets.forEach(ele => {
        if (ele.id === id) {
          self.formData.streetName = ele.name
        }
      })
      this.getLoadCommunityDeptByStreetFun(id)
    },
    //  根据街道ID查询辖区
    getLoadCommunityDeptByStreetFun(id) {
      getLoadCommunityDeptByStreet({ id: id }).then(res => {
        this.areas = res.data
      })
    },
    // 辖区选择时间
    areaChange(val) {
      const self = this
      this.areas.forEach(ele => {
        if (ele.id === val) {
          self.formData.communityName = ele.name
        }
      })
    },
    // 提交表单
    postFormData() {
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          this.httpLoading = true
          if (this.type === 'add') {
            getPartyCommitteeAdd(this.formData).then(res => {
              this.httpLoading = false
              this.$emit('confirmClick')
            })
          }
          if (this.type === 'edit') {
            getPartyCommitteeEdit(this.formData).then(res => {
              this.httpLoading = false
              this.$emit('confirmClick')
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .p16{
    padding: 16px;
  }
.formWrap{
  width: 400px;
  .fomrFooter{
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
}
</style>
