<template>
  <Modal v-model="show" :title="title" :mask-closable="false" width="740" :key="keyId">
      <div class="formWrap">
        <div v-show="modelType !== 'info'">
          <el-form ref="postForm" class="p16" :model="formData" :label-width="'90px'" :rules="rules">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="标题:" prop="title">
                  <Input v-model="formData.title" placeholder="标题" style="width: 250px" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="党委名称:" prop="partyCommitteeId">
                  <el-select v-model="formData.partyCommitteeId" placeholder="党委名称" @change="selectComminttee">
                    <el-option v-for="(item, i)  in committees" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支部名称:" prop="partBranchId">
                  <el-select v-model="formData.partBranchId" placeholder="支部名称" @change="selectBranch">
                    <el-option v-for="(item, i)  in branchs" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分类:" prop="partyCategoryId">
                  <el-select v-model="formData.partyCategoryId" placeholder="支部名称" @change="selectCategory">
                    <el-option v-for="(item, i)  in categorys" :key="item.id" :label="item.partyCategoryName" :value="item.partyCategoryId" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="内容" prop="content">
              <tinymce-affairs :id="'publickTinymce'" v-model="formData.content" ref="content" :height="250" />
            </el-form-item>
          </el-form>
<!--          <div class="text-center fomrFooter">-->
<!--            <Button type="text" @click="closeModel">取消</Button>-->
<!--            <Button type="primary" :loading="httpLoading" @click="postFormData">提交</Button>-->
<!--          </div>-->
        </div>
        <div v-show="modelType === 'info'">
          <el-form :model="formDataShow" class="demo-form-inline p16">
            <el-row>
              <el-col :span="12">
                <el-form-item label="标题:">
                  <span class="color666">{{ formDataShow.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="党委名称:">
                  <span class="color666">{{ formDataShow.partyCommitteeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支部名称:">
                  <span class="color666">{{ formDataShow.partBranchName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分类:">
                  <span class="color666">{{ formDataShow.partyCategoryName }}</span>
                </el-form-item>
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
      </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" v-if="modelType !== 'info'" :loading="httpLoading" @click="postFormData">提交</Button>
    </div>
  </Modal>
</template>

<script>
import { partyWorkAdd, partyWorkEdit } from '@/api/zhsq/partyPublic/index'
import { getPartyBranchList } from '@/api/zhsq/partyManage/index'
import TinymceAffairs from '@/views/zhsq/partyBuilding/partyPublic/partyAffairs/TinymceAffairs/index'
export default {
  name: 'EditPartyPublic',
  components: { TinymceAffairs },
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
    modelType: {
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
      //  按钮加载状态
      httpLoading: false,
      // 表单数据
      formData: {
        partyCommitteeId: '',
        partBranchId: '',
        content: ''
      },
      formDataShow: {},
      branchs: [],
      rules: {
        partBranchId: [
          { required: true, message: '请选择党委支部', trigger: 'change' }
        ],
        partyCategoryId: [
          { required: true, message: '请选择党员分类', trigger: 'change' }
        ],
        partyCommitteeId: [
          { required: true, message: '请选择党员', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请编辑内容', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入合法手机号/电话号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      const self = this
      if (val) {
        self.$refs.content.destroyTinymce()
        self.$refs.content.initTinymce()
        self.$refs['postForm'].clearValidate()
        self.formData = {
          partyCommitteeId: '',
          partBranchId: '',
          content: ''
        }
        self.httpLoading = false
        self.$nextTick(() => {
          if (self.$refs.content && self.modelType === 'add') {
            self.$refs.content.setContent('')
          }
        })
        if (self.modelType === 'info') {
          self.formDataShow = {}
          self.$nextTick(() => {
            self.formDataShow = { ...self.data }
          })
        }
        if (self.modelType === 'edit') {
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
      this.formData.partBranchName = ''
      this.formData.partBranchId = ''
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
          this.formData.partBranchName = ele.name
        }
      })
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
          if (this.modelType === 'add') {
            partyWorkAdd(this.formData).then(res => {
              this.httpLoading = false
              this.closeModal(false)
              this.$emit('confirmClick')
            })
          }
          if (this.modelType === 'edit') {
            partyWorkEdit(this.formData).then(res => {
              this.httpLoading = false
              this.closeModal(false)
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
    width: 700px;
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
  /deep/.el-input__suffix{
    top: 3px;
  }
  /deep/.el-select{
    width: 100%;
  }
  /deep/.el-select > .el-input {
    width: 100%;
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
  /deep/.el-select .el-input .el-select__caret{
    transform: rotateZ(0deg);
  }
  /deep/.el-icon-arrow-up:before{
    content: "";
    box-sizing: inherit;
  }
  /deep/.el-select .el-input .el-select__caret.is-reverse{
    transform: rotateZ(180deg);
  }
</style>
