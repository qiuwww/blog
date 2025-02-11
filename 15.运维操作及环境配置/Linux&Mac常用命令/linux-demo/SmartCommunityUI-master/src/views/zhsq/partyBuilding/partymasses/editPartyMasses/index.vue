<template>
  <Modal v-model="show" :title="title" :mask-closable="false" width="840" :key="keyId">
      <div class="formWrap">
        <div v-show="modalType !== 'info'">
          <el-form ref="postForm" class="p16" :model="formData" :label-width="'90px'" :rules="rules" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="标题:" prop="title">
                  <Input v-model="formData.title" placeholder="标题" style="width: 250px" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动时间:" prop="activityDate">
                  <DatePicker
                    type="datetime"
                    style="width:250px;"
                    :editable="false"
                    placeholder="请输入申请时间"
                    v-model="formData.activityDate"
                    @on-change="setleactivityDate"
                    format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="党委名称:" prop="partyCommitteeId">
                  <Select v-model="formData.partyCommitteeId" placeholder="党委名称" style="width: 250px" @on-change="selectComminttee">
                    <Option v-for="(item, i)  in committees" :key="item.id" :value="item.id">{{ item.name }}</Option>
                  </Select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支部名称:" prop="partyBranchId">
                  <Select v-model="formData.partyBranchId" placeholder="支部名称" style="width: 250px" @on-change="selectBranch">
                    <Option v-for="(item, i)  in branchs" :key="item.id" :value="item.id">{{ item.name }}</Option>
                  </Select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分类:" prop="partyCategoryId">
                  <Select v-model="formData.partyCategoryId" placeholder="分类" style="width: 250px" @on-change="selectCategory">
                    <Option v-for="(item, i)  in categorys" :key="item.id" :value="item.partyCategoryId">{{ item.partyCategoryName }}</Option>
                  </Select>
                </el-form-item>
              </el-col>
              <el-col />
            </el-row>
            <el-form-item label="内容" prop="content">
              <tinymce-masses :id="'massesTinymce'" v-model="formData.content" ref="content" :height="250" />
            </el-form-item>
          </el-form>
<!--          <div class="text-center fomrFooter">-->
<!--            <Button type="text" @click="closeModel">取消</Button>-->
<!--            <Button type="primary" :loading="httpLoading" @click="postFormData">提交</Button>-->
<!--          </div>-->
        </div>
        <div v-show="modalType === 'info'">
          <el-form :model="formDataShow" class="demo-form-inline p16">
            <el-row>
              <el-col :span="12">
                <el-form-item label="标题1:">
                  <span class="color666">{{ formDataShow.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动时间:">
                  <span class="color666">{{ formDataShow.activityDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="党委名称:">
                  <span class="color666">{{ formDataShow.partyCommitteeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支部名称:">
                  <span class="color666">{{ formDataShow.partyBranchName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分类:">
                  <span class="color666">{{ formDataShow.partyCategoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-link type="primary" class="mb20" @click="openSingUpPeople">查看报名人员列表</el-link>
              </el-col>
              <el-col :span="24">
                <el-form-item label="内容:">
                  <div v-html="formDataShow.content" style="width: 100%;overflow: auto"></div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
<!--          <div class="text-center fomrFooter">-->
<!--            <Button type="text" @click="closeModel">取消</Button>-->
<!--          </div>-->
        </div>
        <sign-up-people
          :partymasses-id="formDataShow.id"
          v-model="signUpStatus"
          @close="closeSignUpModel"
        />
      </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" v-if="modalType !== 'info'" :loading="httpLoading" @click="postFormData">提交</Button>
    </div>
  </Modal>
</template>

<script>
import { partymassesAdd, partymassesEdit } from '@/api/zhsq/partymasses/index'
import { getPartyBranchList } from '@/api/zhsq/partyManage/index'
import SignUpPeople from '../signUpPeople/index'
import TinymceMasses from '@/views/zhsq/partyBuilding/partymasses/TinymceMasses/index'
export default {
  name: 'EditPartyMasses',
  components: {
    TinymceMasses,
    SignUpPeople
  },
  props: {
  //  弹窗标题
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    title: {
      type: String,
      default: ''
    },
    //  弹窗显示条件
    value: {
      type: Boolean,
      default: false
    },
    //  弹窗类型-----add新增，-----edit编辑, ----info查看
    modalType: {
      type: String,
      default: ''
    },
    // 查看编辑对象
    data: {
      type: Object,
      default: () => {}
    },
    // 分类集合
    categorys: {
      type: Array,
      default: () => []
    },
    // 党委集合
    committees: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      keyId: this.id,
      show: this.value,
      // 按钮状态
      httpLoading: false,
      // 表单数据
      formData: {
        partyCommitteeId: '',
        partyBranchId: ''
      },
      formDataShow: {},
      branchs: [],
      rules: {
        partyBranchId: [
          { required: true, message: '请选择党委支部', trigger: 'change' }
        ],
        partyCategoryId: [
          { required: true, message: '请选择党员分类', trigger: 'change' }
        ],
        activityDate: [
          { required: true, message: '请选择活动时间', trigger: 'change' }
        ],
        partyCommitteeId: [
          { required: true, message: '请选择党委名称', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请编辑内容', trigger: 'blur' }
        ]
      },
      // 报名人数状态
      signUpStatus: false
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      const self = this
      if (val) {
        self.$refs['postForm'].clearValidate()
        self.$nextTick(() => {
          if (self.$refs.content) {
            self.$refs.content.destroyTinymce()
          }
          self.$refs.content.initTinymce()
          if (self.modalType === 'add') {
            self.$refs.content.setContent('')
          }
        })
        self.formData = {}
        self.httpLoading = false
        if (self.modalType === 'info') {
          self.formDataShow = {}
          self.$nextTick(() => {
            self.formDataShow = { ...self.data }
          })
        }
        if (self.modalType === 'edit') {
          self.formData = { ...self.data }
          self.$nextTick(() => {
            self.$refs.content.setContent(self.data.content)
          })
          self.getPartyBranchListFun(self.data.partyCommitteeId)
        }
      } else {
        self.closeModal(val)
      }
    }
  },
  methods: {
  // 关闭
    closeModal(val) {
      this.$emit('input', val)
    },
    // 选择党委
    selectComminttee(id) {
      this.committees.forEach(ele => {
        if (ele.id === id) {
          this.formData.partyCommitteeName = ele.name
        }
      })
      this.formData.partyBranchName = ''
      this.formData.partyBranchId = ''
      this.getPartyBranchListFun(id)
    },
    // 获取支部列表
    getPartyBranchListFun(id) {
      getPartyBranchList({
        partyCommitteeId: id || '',
        current: 1,
        size: 100
      }).then(res => {
        this.branchs = [{ id: '0', name: '全部' }].concat(res.data.records)
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
    setleactivityDate(e) {
      this.formData.activityDate = e
    },
    // 选择分类
    selectCategory(id) {
      this.categorys.forEach(ele => {
        if (ele.partyCategoryId === id) {
          this.formData.partyCategoryName = ele.partyCategoryName
        }
      })
    },
    // 提交表单
    postFormData() {
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          this.httpLoading = true
          if (this.modalType === 'add') {
            partymassesAdd(this.formData).then(res => {
              this.httpLoading = false
              this.closeModal(false)
              this.$emit('confirmClick')
            })
          }
          if (this.modalType === 'edit') {
            this.formData.activityDate = this.$timeFormat(this.formData.activityDate, 'YYYY-MM-DD HH:mm:ss')
            partymassesEdit(this.formData).then(res => {
              this.httpLoading = false
              this.closeModal(false)
              this.$emit('confirmClick')
            })
          }
        }
      })
    },
    // 查看报名人数
    openSingUpPeople() {
      this.signUpStatus = true
    },
    // 关闭报名人数
    closeSignUpModel() {
      this.signUpStatus = false
    }
  }
}
</script>

<style scoped lang="less">
  .p16{
    padding: 16px;
  }
  .formWrap{
    width: 800px;
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
  /deep/.ivu-modal-content{
    border-radius: 12px;
  }
  /deep/.ivu-modal-header{
    position: relative;
    color: #555C66;
    border: none;
    padding: 14px 16px 14px 20px;
    /deep/.ivu-modal-header-inner{
      font-size: 14px;
      color: #A0A8B5;
      line-height: 1;
      font-family: regular, 'Microsoft YaHei';
    }
  }
  /deep/.ivu-modal-close{
    position: absolute;
    right: 9px;
    top: 6px;
    cursor: pointer;
    .el-icon-close{
      font-size: 18px;
    }
  }
  /deep/.ivu-modal-footer{
    border-top: none;
    padding: 14px 30px;
    background: #F8F9FA !important;
    border-radius: 0 0 12px 12px;
    text-align: right;
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
    .content{
        img{
            max-width: 100%;
        }
    }
</style>
