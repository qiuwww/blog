<template>
  <el-dialog
    v-if="editDialog"
    v-dialogDrag
    center
    title="设置关联部门"
    :width="dialogWidth"
    :before-close="close"
    :visible.sync="editDialog"
  >
    <el-form
      ref="form"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-position="right"
      class="mt20 overflow pl15 pr15"
    >
      <el-row type="flex" justify="center">
        <el-col :span="18" class="mb15">
          <el-form-item label="关联部门：" prop="name" :label-width="labelWidth">
            <!-- <el-select  clearable v-model="form.departmentIds"  placeholder="请选择关联部门">
              <el-option
                :key="item.id"
                :value="index"
                :label="item.name"
                v-for="(item,index) in deptList"
              ></el-option>
            </el-select> -->
            <GetDept @getDept="handleGetDept" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button @click="close">取 消</el-button>
      <el-button v-loading="loading" class="theme-btn" @click="handleConfirm('form')">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import { mapGetters } from 'vuex'

import GetDept from '@/components/Mycomponents/selectDept'
import { setRelativeDept, getRelativeDept } from '@/api/engineering'

export default {
  name: 'DeptDialog',
  data() {
    return {
      form: {
        departmentIds: []
      },
      deptList: [],
      labelWidth: '95px',
      dialogWidth: '640px',
      dialogVisible: false,
      rules: {
        departmentIds: {
          required: true,
          message: '请选择关联部门',
          trigger: 'blur'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  watch: {

  },
  methods: {

    handleGetDept(departmentIds) {
      this.form.departmentIds = departmentIds
    },
    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$store.dispatch("load/setLoading", true);
          this.editRelativeDept()
        }
      })
    },
    editRelativeDept() {
      this.$emit('getDepId', this.deptList[this.form.departmentIds])
      this.$emit('close')
    },
    close() {
      this.$emit('close')
    },
    resetForm() {
      this.form = {
        departmentIds: []
      }
    }
  },
  components: {
    GetDept
  },
  props: ['editDialog']
}
</script>

<style scoped>
</style>
