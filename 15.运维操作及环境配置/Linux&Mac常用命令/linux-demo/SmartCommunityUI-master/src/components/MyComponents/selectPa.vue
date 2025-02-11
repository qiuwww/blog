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
    <el-row type="flex" justify="center">
      <el-col :span="24" class="mb15 radioTab">
        <el-radio-group v-model="userId" v-loading="loading" size="mini" class="ml20">
          <el-radio v-for="(item, i)  in dispatchList" :key="item.userId" :label="item.userId">
            <section class="w100">
              <span class="fl">
                <img :src="item.head" width="40px" height="40px" class="m10">
              </span>
              <i class="fs15">{{ item.userName }}</i>
              <i class="fs13">{{ item.time }}</i>
            </section>
          </el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button v-loading="loading" class="theme-btn" @click="handleDispatchConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import { getEmployeeTasks, getDispatch } from '@/api/pension'

export default {
  name: 'AdvDialog',
  props: ['dispatchDialog', 'nextTime'],
  data() {
    return {
      loading: true,
      checkedList: [],
      dispatchList: [],
      labelWidth: '95px',
      reminderObjects: [],
      dialogWidth: '400px',
      userId: '',
      editCheckId: {}
    }
  },
  watch: {
    dispatchDialog() {
      this.dispatchDialog && this.getDispatchs()
    }
  },
  methods: {
    handleDispatchConfirm() {
      if (this.userId) {
        this.$emit('selectId', this.userId)
      } else {
        this.$notify({
          title: '请选择派单人员',
          type: 'success'
        })
      }
    },
    onChangeTreeCheck(data, checked, indeterminate) {
      if (checked == true) {
        this.editCheckId = { id: data.id, name: data.name }
        this.$refs.tree.setCheckedKeys([data.id])
      } else {
        if (this.editCheckId.id == data.id) {
          this.$refs.tree.setCheckedKeys([data.id])
        }
      }
    },
    nodeCheck(item, node, self) {
      this.editCheckId.id = item.id
      this.$refs.tree.setCheckedKeys([data.id])
    },
    async getDispatchs() {
      const res = await getEmployeeTasks({
        propertyId: this.$store.getters.propertyInfo.id,
        nextTime: this.nextTime
      })
      this.dispatchList = res.rows
      this.loading = false
    },
    reset() {
      this.reminderObjects = []
    },
    close() {
      this.$emit('closeDispatch')
      this.userId = ''
    }
  }
}

</script>

<style scoped></style>
