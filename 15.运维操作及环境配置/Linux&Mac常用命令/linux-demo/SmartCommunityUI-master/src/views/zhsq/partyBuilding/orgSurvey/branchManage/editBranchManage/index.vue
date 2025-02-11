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
              <el-input v-model="formData.name" placeholder="组织名称" style="width: 246px"/>
            </el-form-item>
            <el-form-item label="地址:" prop="address">
              <el-input v-model="formData.address" placeholder="地址" style="width: 246px"/>
            </el-form-item>
            <el-form-item label="电话:" prop="phoneNumber">
              <el-input v-model="formData.phoneNumber" placeholder="电话" style="width: 246px"/>
            </el-form-item>
            <el-form-item label="书记:" prop="secretary">
              <el-input v-model="formData.secretary" placeholder="书记" style="width: 246px"/>
            </el-form-item>
            <el-form-item label="性别:" prop="gender">
              <el-select v-model="formData.gender" clearable placeholder="性别" style="width: 246px">
                <el-option v-for="(item, index) in genders" :key="index" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="所属党委:" prop="partyCommitteeId">
              <el-select v-model="formData.partyCommitteeId" clearable placeholder="所属党委" @change="selectComminttee" style="width: 246px">
                <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
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
                  <span class="color666"> {{ formData.secretary }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别:">
                  <span class="color666"> {{ formData.gender === 1 ? '男' : '女' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属党委:">
                  <span class="color666">{{ formData.partyCommitteeName }}</span>
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
  getPartyBranchAdd,
  getPartyBranchEdit
} from '@/api/zhsq/partyManage/index'
import PartyModal from '@/components/partyModal/index'
export default {
  name: 'EditBranchManage',
  components: {
    PartyModal
  },
  props: {
  //  弹窗标题
    title: {
      type: String,
      default: ''
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
    // 查看编辑对象
    data: {
      type: Object,
      default: () => {}
    },
    // 党委集合
    committees: {
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
      rules: {
        partyCommitteeId: [
          { required: true, message: '请选择党委', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填写组织名称', trigger: 'blur' }
        ],
        secretary: [
          { required: true, message: '请填写书记', trigger: 'blur' }
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
        this.formData = {}
        this.httpLoading = false
        if (this.type !== 'add') {
          this.$nextTick(() => {
            this.formData = { ...this.data }
          })
        }
      }
    }
  },
  methods: {
  // 关闭
    closeModel() {
      this.$emit('close')
    },
    // 选择党委
    selectComminttee(id) {
      this.committees.forEach(ele => {
        if (ele.id === id) {
          this.formData.partyCommitteeName = ele.name
        }
      })
    },
    // 提交表单
    postFormData() {
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          this.httpLoading = true
          if (this.type === 'add') {
            getPartyBranchAdd(this.formData).then(res => {
              this.httpLoading = false
              this.$emit('confirmClick')
            })
          }
          if (this.type === 'edit') {
            getPartyBranchEdit(this.formData).then(res => {
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
