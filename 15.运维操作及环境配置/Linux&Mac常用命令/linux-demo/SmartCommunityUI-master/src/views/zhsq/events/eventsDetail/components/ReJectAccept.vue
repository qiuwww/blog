<template>
  <!-- 受理派遣  派遣-->
  <DialogUI
    :dialog-visible="isShow"
    :has-foot="false"
    :title="'事件驳回'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-row>
      <el-row>
<!--        <el-col :span="16">-->
<!--          <span class="label">标题</span>-->
<!--          <span class="bold">酒店乱刀垃圾</span>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <el-col :span="16">-->
<!--          <span class="label">当前状态</span>-->
<!--          <span class="bold">待驳回</span>-->
<!--        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="16">
          <span class="label">备注</span>
          <span style="display:inline-block;" class="fr">
            <el-input v-model="remark" type="textarea" :rows="5" />
          </span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-button @click="handleConfirm">
            驳回
          </el-button>
          <el-button @click="handleClose">
            关闭
          </el-button>
        </el-col>

      </el-row>
    </el-row>
  </DialogUI>
</template>

<script>
import DialogUI from '@/components/DialogUI'
import { requiredRules } from '@/utils/rules'
import { acceptDispatch } from '@/api/events'
export default {
  components: {
    DialogUI
  },
  props: {
    reject: {
      type: Boolean,
      required: false
    },
    theDetail: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      remark: '',
      eventsList: []
    }
  },
  computed: {
    isShow() {
      return this.reject
    }
  },
  watch: {
    reject(n, o) {}
  },
  created() {},
  methods: {
    async handleConfirm() {
      const data = await acceptDispatch({
        type: 2,
        remark: this.remark,
        detailsId: this.$route.query.id
      })
      if (data && data.code == 200) {
        this.$notify({
          title: data.msg,
          type: 'success'
        })
      } else {
        this.$notify({
          title: data.msg,
          type: 'warning'
        })
      }
      this.handleClose()
    },

    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .el-col{
    margin: 10px;
  }
  .el-textarea{
    width: 323px;
  }
</style>
