<template>
  <el-dialog
    v-if="dispatchDialog"
    v-dialogDrag
    center
    title="选择人员"
    :width="dialogWidth"
    :before-close="close"
    :append-to-body="true"
    :visible.sync="dispatchDialog"
  >
    <el-row type="flex" justify="center">
      <el-col :span="24" class="mb15">
        <el-row type="flex" justify="center">
          <el-col :span="20" class="mb15">
            <section
              v-for="(item, index) in dispatchList"
              :key="index"
              style="height:40px;overflow:hidden;dispaly:inline-block"
            >
              <!--              <span class="fs12 gray mb05">{{ item.workCode }}</span>-->
              <span class="mb05">{{ item.name }}</span>
              <!--              <section class="fr" style="text-align:left;width:110px;">-->
              <!--                <span>{{item.time}}</span>-->
              <!--              </section>-->

            </section>
          </el-col>
          <el-col :span="4" class="mb15">
            <el-radio-group v-model="checkedList" @change="hand">

              <el-radio
                v-for="(item, i)  in dispatchList"
                :key="item.userId"
                :label="item.userId"
                class="ml10"
                style="height:40px;overflow:hidden;dispaly:inline-block"
              >{{ '' }}</el-radio>
            </el-radio-group>
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
// import { getUserList } from "@/api/engineering";
import { getUserList } from '@/api/system'
import { mapGetters } from 'vuex'

export default {
  name: 'AdvDialog',
  props: ['dispatchDialog', 'depatchType','gridId'],
  data() {
    return {
      checkedList: '',
      dispatchList: [],
      labelWidth: '95px',
      reminderObjects: '',
      dialogWidth: '400px',
      defaultProps: {
        children: 'employeeList',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  watch: {
    dispatchDialog() {
      // alert('??')
      this.dispatchDialog && this.getDispatchs()
    }
  },
  methods: {
    hand(p) {
    },
    handleDispatchConfirm() {
      this.reminderObjects = this.checkedList
      this.$emit('closeDispatch', this.checkedList)
    },

    async getDispatchs() {
      const res = await getUserList({
        fileType: this.depatchType,
        gridId: this.gridId
      })
      this.dispatchList = res.data
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
