<template>
  <el-dialog
    v-if="dispatchDialog"
    v-dialogDrag
    center
    title="派单"
    :width="dialogWidth"
    :before-close="close"
    :append-to-body="true"
    :visible.sync="dispatchDialog"
  >
    <el-row v-loading="loading" type="flex" justify="center">
      <el-col :span="24" class="mb15">
        <el-row type="flex" justify="center">
          <el-col :span="20" class="mb15">
            <section
              v-for="(item, index) in dispatchList"
              :key="index"
              style="height:40px;overflow:hidden;dispaly:inline-block;cursor:pointer;"
              @click="handleClick(item)"
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
              >{{ "" }}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button
        v-loading="loading"
        class="theme-btn"
        @click="handleDispatchConfirm"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import { getAllDispatch } from '@/api/engineering'
import { getUserList } from '@/api/system'

export default {
  name: 'AdvDialog',
  props: ['dispatchDialog', 'depatchType'],
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
    },
    checkedList(n, o) {
    }
  },
  methods: {
    hand(p) {
    },
    handleClick(item) {
      if (this.checkedList.includes(item.userId)) {
        this.checkedList.forEach((i, index) => {
          if (i == item.userId) {
            this.checkedList.splice(index, 1)
          }
        })
      } else {
        this.checkedList.push(item.userId)
      }
    },
    handleDispatchConfirm() {
      this.reminderObjects = this.checkedList.join(',')
      this.$emit('closeDispatch', this.reminderObjects)
    },

    async getDispatchs() {
     const res = await getUserList({
        fileType: this.depatchType,
        gridId: this.gridId
      })
      this.dispatchList = res.data
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
