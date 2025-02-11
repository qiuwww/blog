<template>
  <DialogUI
    :dialog-visible="addType"
    :hasFoot='true'
    v-if="addType"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="部门类型名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </DialogUI>
</template>

<script>
import DialogUI from '@/components/DialogUI'
export default {
  components: {
    DialogUI
  },
  props: {
    addType: { type: Boolean, required: true }
  },
  data() {
    return {
      form: {
        name: ''
      },
      rules: {
        name: {
          required: true,
          message: '请输入部门名称'
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
      this.form = {
        name: ''
      }
    },
    handleConfirm() {
      this.$refs['form'].validate(v => {
        if (v) {
          this.$emit('confirm', this.form.name)
        }
      })
    }
  }
}
</script>

<style></style>
