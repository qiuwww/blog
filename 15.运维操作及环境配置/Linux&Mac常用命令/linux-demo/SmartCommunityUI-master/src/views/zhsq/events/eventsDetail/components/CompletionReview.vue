<template>
  <!-- 办结审核 -->
  <DialogUI
    :dialog-visible="isShow"
    :has-foot="true"
    :title="'确认'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="办结审核" prop="eventType">
        <el-radio-group v-model="radio">
          <el-radio :label="1">审核通过</el-radio>
          <el-radio :label="2">驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="任务核查图片" prop="type">
        <UpLoadImg
          class="mt15"
          :limit="3"
          :img-src="photoArr"
          :max-size="1024"
          :accept-type="['png', 'jpeg', 'jpg']"
          @uploadChange="handleUploadChange"
        />
      </el-form-item>
      <el-form-item label="办结审核情况" prop="type">
        <el-input v-model="form.remark" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
  </DialogUI>
</template>

<script>
import DialogUI from '@/components/DialogUI'
import UpLoadImg from '@/components/UpLoadImg'
import { requiredRules } from '@/utils/rules'
import { examine } from '@/api/events'

export default {
  components: {
    DialogUI,
    UpLoadImg
  },
  props: {
    completionReview: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      form: {
        remark: ''
      },
      radio: 1,
      photo: [],
      eventsList: [],
      photoArr: []
    }
  },
  computed: {
    rules() {
      const { remark, type } = requiredRules
      return { remark }
    },
    isShow() {
      return this.completionReview
    },
    mediaAddress() {
      return JSON.stringify(this.photo.map(i => {
        return { address: i, type: '1' }
      }))
    }
  },
  watch: {
    completionReview(n, o) {}
  },
  created() {},
  methods: {
    handleConfirm() {
      this.$refs['form'].validate(v => {
        if (v) {
          this.handleSet()
        }
      })
    },
    async handleSet() {
      const data = await examine({
        type: this.radio,
        userId: +sessionStorage.getItem('userId'),
        remark: this.form.remark,
        detailsId: this.$route.query.id,
        mediaAddress: this.mediaAddress
      })
      if (data && data.code == 200) {
        this.$notify({
          title: data.msg,
          type: data.succcess ? 'success' : 'warning'
        })
        this.handleClose()
      }
    },
    handleUploadChange(val) {
      // //console.log(val)
      this.photo = val
    },
    handleClose() {
      this.$emit('close')
      this.form.remark = ''
    }
  }
}
</script>

<style></style>
