<template>
    <Modal v-model="show" :title="title" :mask-closable="false" width="920" :key="keyId">
      <div class="formWrap">
        <div v-show="type !== 'info'">
          <el-form v-if="type !== 'info'" ref="postForm" class="p16" :model="formData" :label-width="'90px'" :rules="rules">
            <el-form-item label="标题:" prop="title">
              <el-input v-model="formData.title" placeholder="标题" />
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
              <el-input v-model="formData.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注" />
            </el-form-item>
            <el-form-item label="内容:" prop="content">
              <tinymce-study :id="'studyTinymce'" v-model="formData.content" ref="content" :height="250" />
            </el-form-item>
          </el-form>
<!--          <div class="text-center fomrFooter">-->
<!--            <Button type="text" @click="closeModel">取消</Button>-->
<!--            <Button type="primary" :loading="httpLoading" @click="postFormData">提交</Button>-->
<!--          </div>-->
        </div>
        <div v-show="type === 'info'">
          <el-form :model="formDataShow" class="demo-form-inline p16">
            <el-row>
              <el-col :span="24">
                <el-form-item label="标题:">
                  <span class="color666">{{ formDataShow.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注:">
                  <span class="color666">{{ formDataShow.remark }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-link type="primary mb20" @click="openStydyPeople">完成学习人员列表</el-link>
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
      <study-people
        :id="formDataShow.id"
        :modal-show="studyPeopleModal"
        @close="cloaseStydyPeople"
      />
      <div slot="footer">
        <Button type="text" @click="show=false">取消</Button>
        <Button type="primary" v-if="type !== 'info'" :loading="httpLoading" @click="postFormData">提交</Button>
      </div>
    </Modal>
</template>

<script>
import {
  learningCenterAdd,
  learningCenterEdit
} from '@/api/zhsq/learningCenter/index'
import StudyPeople from '../studyPeople/index'
import TinymceStudy from '@/views/zhsq/partyBuilding/learningcenter/studyCenter/TinymceStudy/index'
export default {
  name: 'EditStudyCenter',
  components: {
    TinymceStudy,
    StudyPeople
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
    // 查看编辑对象
    data: {
      type: Object,
      default: () => {}
    },
    //  弹窗显示条件
    value: {
      type: Boolean,
      default: false
    },
    //  弹窗类型-----add新增，-----edit编辑, ----info查看
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      keyId: this.id,
      show: this.value,
      // 按钮状态
      httpLoading: false,
      // 表单数据
      formData: {},
      formDataShow: {},
      // 表单验证规则
      rules: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请编辑内容', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请填写备注', trigger: 'blur' }
        ]
      },
      //  完成学习人员单床
      studyPeopleModal: false
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      const self = this
      if (val) {
        if (self.$refs.content) {
          self.$refs.content.destroyTinymce()
          self.$refs.content.initTinymce()
        }
        this.formData = {}
        this.httpLoading = false
        self.$nextTick(() => {
          if (self.$refs.content && self.type === 'add') {
            self.$refs.content.setContent('')
          }
        })
        if (self.type === 'info') {
          self.formDataShow = {}
          self.$nextTick(() => {
            self.formDataShow = { ...self.data }
          })
        }
        if (self.type === 'edit') {
          self.$nextTick(() => {
            self.$refs.content.setContent(self.data.content)
            self.formData = { ...self.data }
          })
        }
      } else {
        this.closeModal(val)
      }
    }
  },
  methods: {
  // 关闭
    closeModal(val) {
      this.$emit('input', val)
    },
    // 提交表单
    postFormData() {
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          this.httpLoading = true
          if (this.type === 'add') {
            learningCenterAdd(this.formData).then(res => {
              this.httpLoading = false
              this.closeModal(false)
              this.$emit('confirmClick')
            })
          }
          if (this.type === 'edit') {
            learningCenterEdit(this.formData).then(res => {
              this.httpLoading = false
              this.closeModal(false)
              this.$emit('confirmClick')
            })
          }
        }
      })
    },
    openStydyPeople() {
      this.studyPeopleModal = true
    },
    cloaseStydyPeople() {
      this.studyPeopleModal = false
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
    padding: 14px 30px;
    background: #F8F9FA !important;
    border-radius: 0 0 12px 12px;
    border-top: none;
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
</style>
