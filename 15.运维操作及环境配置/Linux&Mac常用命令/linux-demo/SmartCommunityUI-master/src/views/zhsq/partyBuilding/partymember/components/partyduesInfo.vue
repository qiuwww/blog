<template>
  <div>
    <party-modal
      :title="title"
      :is-show-confirm-btn="false"
      :modal-show="modalShow"
      @close="closeModel"
    >
      <div class="formWrap">
        <el-form v-if="type !== 'info'" ref="postForm" :model="formData" :label-width="'100px'" :rules="rules">
          <el-form-item label="金额:" prop="amount">
            <el-input v-model.number="formData.amount" placeholder="金额" />
          </el-form-item>
          <el-form-item label="缴纳日期:" prop="payDate">
            <el-date-picker
              v-model="formData.payDate"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="选择时间"
              style="width: 100%;"
            />
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="formData.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入备注" />
          </el-form-item>
          <div class="text-center">
            <el-button type="primary" :loading="httpLoading" @click="postFormData">确定</el-button>
            <el-button type="" @click="closeModel">关闭</el-button>
          </div>
        </el-form>
        <el-form v-else :model="formData" class="demo-form-inline">
          <el-row>
            <el-col :span="24">
              <el-form-item label="金额:">
                <span class="color666">{{ formData.amount }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="缴纳时间:">
                <span class="color666">{{ formData.payDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注:">
                <div class="color666" v-html="formData.remark" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="text-center">
            <el-button type="primary" @click="closeModel">关闭</el-button>
          </div>
        </el-form>
      </div>
    </party-modal>
  </div>
</template>

<script>
import { partyduesAdd, partyduesEdit } from '@/api/zhsq/partymember/index'
import PartyModal from '@/components/partyModal/index'
export default {
  name: 'PartyduesInfo',
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
        payDate: [
          { type: 'string', required: true, message: '请选择缴纳日期', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请填写金额', trigger: 'blur' },
          { type: 'number', message: '金额必须为数字', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请填写备注', trigger: 'blur' }
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
            partyduesAdd(this.formData).then(res => {
              this.httpLoading = false
              this.$emit('confirmClick')
            })
          }
          if (this.type === 'edit') {
            partyduesEdit(this.formData).then(res => {
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

<style scoped>
    .formWrap{
        width: 500px;
        padding: 20px 10px;
    }
</style>
