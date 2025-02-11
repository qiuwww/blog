<template>
  <el-dialog
    v-if="dispatchDialog"
    v-dialogDrag
    center
    title="派单"
    :width="dialogWidth"
    :before-close="close"
    :visible.sync="dispatchDialog"
  >
    <el-row v-loading="loading" type="flex" justify="center">
      <el-col :span="24" class="mb15">
        <el-row type="flex" justify="center">
          <el-col :span="20" class="mb15">
            <section
              v-for="(item, index) in dispatchList"
              :key="index"
              style="height:40px;overflow:hidden;dispaly:inline-block"
            >
              <span class="fs12 gray mb05">{{ item.workCode }}</span>
              <span class="mb05">{{ item.userName }}</span>
              <section class="fr" style="text-align:left;width:110px;">
                <span>{{ item.time }}</span>
              </section>

            </section>
          </el-col>
          <el-col :span="4" class="mb15">
            <el-checkbox-group v-model="checkedList" @change="hand">
              <el-checkbox
                v-for="(item, i)  in dispatchList"
                :key="item.userId"
                :label="item.userId"
                class="ml10"
                style="height:40px;overflow:hidden;dispaly:inline-block"
              >{{ '' }}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button
        class="theme-btn"
        @click="handleDispatchConfirm"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import { getReminderDispatch } from '@/api/engineering'

export default {
  name: 'ReminderDialog',
  props: ['dispatchDialog', 'depatchType', 'id'],
  data() {
    return {

      loading: true,
      checkedList: [],
      dispatchList: [],
      labelWidth: '95px',
      reminderObjects: '',
      dialogWidth: '400px',

      defaultProps: {
        children: 'employeeList',
        label: 'name'
      },
      rules: {
        status: {
          required: true,
          message: '请选择状态',
          trigger: 'blur'
        },
        residentTime: {
          required: true,
          message: '请输入停留时间',
          trigger: 'blur'
        },
        level: {
          required: true,
          message: '请选择广告排序',
          trigger: 'blur'
        }
      }
    }
  },
  watch: {
    dispatchDialog() {
      this.dispatchDialog && this.getDispatchs()
    }
  },
  methods: {
    hand(p) {
      // //console.log(p)
    },
    handleDispatchConfirm() {
      this.reminderObjects = this.checkedList.join(',')
      this.$emit('setReminder', this.reminderObjects)
      this.close()
    },

    async getDispatchs() {
      // const res = await getReminderDispatch({
      //   cood: this.depatchType,
      //   id:this.id,
      //   propertyId: +sessionStorage.getItem("propertyId")
      // });
      // this.dispatchList = res.rows;
      this.dispatchList = [{
        userName: '高文山',
        userId: 1
      }]
      this.loading = false
    },
    reset() {
      this.reminderObjects = []
    },
    close() {
      this.$emit('closeDispatch')
    }
  }
}
</script>

<style scoped></style>
