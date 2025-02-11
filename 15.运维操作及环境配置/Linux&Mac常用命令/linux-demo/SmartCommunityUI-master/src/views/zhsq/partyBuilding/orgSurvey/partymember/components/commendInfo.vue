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
          <el-form ref="postForm" class="p16" :model="formData" :label-width="'100px'" :rules="rules">
            <el-form-item label="标题:" prop="title">
              <el-input v-model="formData.title" placeholder="标题" />
            </el-form-item>
            <el-form-item label="时间:" prop="commendDate">
              <el-date-picker
                v-model="formData.commendDate"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="date"
                placeholder="选择时间"
                style="width: 100%;"
              />
            </el-form-item>
            <el-form-item label="内容:" prop="content">
              <el-input v-model="formData.content" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="内容" />
            </el-form-item>
          </el-form>
          <div class="text-right fomrFooter">
            <Button type="text" @click="closeModel">取消</Button>
            <Button type="primary" class="ml30" :loading="httpLoading" @click="postFormData">提交</Button>
          </div>
        </div>
        <div v-else>
          <el-form :model="formData" class="demo-form-inline p16">
            <el-row>
              <el-col :span="24">
                <el-form-item label="标题:">
                  <span class="color666">{{ formData.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="时间:">
                  <span class="color666">{{ formData.commendDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="内容:">
                  <div class="color666" v-html="formData.content" />
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
import { partycommendAdd, partycommendEdit } from '@/api/zhsq/partymember/index'
import PartyModal from '@/components/partyModal/index'
export default {
  name: 'CommendInfo',
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
    partyMemberId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      //  按钮加载状态
      httpLoading: false,
      // 表单数据
      formData: {},
      rules: {
        commendDate: [
          { type: 'string', required: true, message: '请选择时间', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
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
    // 提交表单
    postFormData() {
      this.formData.partyMemberId = this.partyMemberId
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          this.httpLoading = true
          if (this.type === 'add') {
            partycommendAdd(this.formData).then(res => {
              this.httpLoading = false
              this.$emit('confirmClick')
            })
          }
          if (this.type === 'edit') {
            partycommendEdit(this.formData).then(res => {
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
    width: 600px;
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
