<template>
  <el-dialog
    v-if="isShow"
    v-dialogDrag

    :title="title"
    :width="dialogWidth"
    :before-close="close"
    :visible.sync="isShow"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      class="mt20 overflow pl15 pr15 changedetailButton"
    >
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15">
          <el-row type="flex" justify="center">
            <el-col :span="24" class="mb15">
              <el-form-item
                label="开始时间："
                :label-width="labelWidth"
                prop="beginDate"
              >
                <el-date-picker
                  v-model="form.beginDate"
                  placeholder="选择时间"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="24" class="mb15">
              <el-form-item
                prop="cycleNum"
                label="重复周期："
                class="inline-block required"
                :label-width="labelWidth"
              >
                <el-input
                  v-model.trim="form.cycleNum"
                  type="number"
                  class="medium-inp"
                  autocomplete="off"
                  placeholder="请输入重复周期"
                />
              </el-form-item>
              <el-form-item class="inline-block" prop="cycleType">
                <el-select
                  v-model="form.cycleType"
                  class="mini-select"
                  placeholder="单位"
                >
                  <el-option label="天" :value="1" />
                  <el-option label="周" :value="2" />
                  <el-option label="月" :value="3" />
                  <el-option label="年" :value="4" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="meterType" type="flex" justify="center">
            <el-col :span="24" class="mb15 form-select">
              <el-form-item
                label="表类型："
                :label-width="labelWidth"
                prop="meterType"
              >
                <el-select  clearable v-model="form.meterType" class>
                  <el-option
                    v-for="(item, index) in meterTypeList"
                    :key="index"
                    :label="item.name"
                    :value="item.number"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block ">
      <el-button @click="close"  type="info" round>取 消</el-button>
      <el-button
        class=" " type="primary" round
        @click="handleSetReminder('form')"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import { vIntNumber } from '@/utils/verification.js'

export default {
  name: 'ReminderDialog',
  props: [
    'ids',
    'title',
    'meterType',
    'reminderForm',
    'meterTypeList',
    'reminderDialog',
    'theRow'
  ],
  data() {
    return {
      form: {
        cycleNum: '',
        cycleType: '',
        beginDate: '',
        meterType: '',
        departmentIds: []
      },
      deptList: [],
      labelWidth: '140px',
      dialogWidth: '480px',
      rules: {
        meterType: {
          required: true,
          message: '请选择表类型',
          trigger: 'blur'
        },
        cycleNum: {
          validator: vIntNumber(1, 10, '请输入重复周期'),
          trigger: 'blur'
        },
        cycleType: {
          required: true,
          message: '请选择检修提醒周期类型',
          trigger: 'blur'
        },
        beginDate: {
          required: true,
          message: '请选择开始时间',
          trigger: 'blur'
        }

      }
    }
  },
  computed: {
    isShow() {
      return this.reminderDialog
    }

  },
  watch: {
    reminderDialog(n, o) {
      this.reminderDialog && this.resetForm()
      if (n) {
        this.theRow.id ? this.form = this.theRow : ''
        this.form = this.reminderForm
        this.form.cycleType = + this.form.cycleType
      }
    }

  },
  methods: {
    handleSetReminder(formName) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('close')
          this.$emit('getReminderInfo', this.form)
        }
      })
    },
    close() {
      this.$emit('close')
      this.resetForm()
    },
    resetForm() {
      this.form = {
        cycleNum: '',
        cycleType: '',
        beginDate: ''
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mini-select{
    width: 60px;
  }
  .medium-inp{
    width: 150px;
    margin-right: 10px;
  }
  .changedetailButton{
	  margin-left: -50px;
  }
  .backtobtn{
  	width: 80px;
  	height: 32px;
  	background: #ffffff;
  	border: 1.3px solid #C3C3C3;
  	border-radius: 16px;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  }
  .surebtn{
  	width: 120px;
  	height: 32px;
  	background: #3083F2;
  	line-height: 12px;
  	display: flex;
	color: #fff;
  	justify-content: center;
  	align-items: center;
  	border-radius: 16px;
  	letter-spacing:5px
  }
  .dialog-footer{
  	display: flex;
  	justify-content: center;
  	margin-left: 65%;
  }
</style>
