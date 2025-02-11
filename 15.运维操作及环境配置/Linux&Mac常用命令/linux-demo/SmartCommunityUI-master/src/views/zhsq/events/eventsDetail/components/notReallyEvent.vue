<template>
  <!-- 受理派遣  派遣-->
  <DialogUI
    :dialog-visible="isShow"
    :has-foot="true"
    :title="'不属实审核'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="" prop="user">
        <el-select  clearable v-model="form.type">
          <el-option
            :label="'通过'"
            :value="2"
          /> 
          <el-option
            :label="'驳回'"
            :value="1"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请描述备注"
        />
      </el-form-item>
    </el-form>
  </DialogUI>
</template>

<script>
import DialogUI from '@/components/DialogUI'
import { requiredRules } from '@/utils/rules'
import { beVerified } from '@/api/events'

export default {
  components: {
    DialogUI
  },
  props: {
    accept: {
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
      form: {
        eventType: '',
        type: '',
        remark: ''
      },
    }
  },
  computed: {
    rules() {
      const { eventType, type } = requiredRules
      return { eventType, type }
    },
    isShow() {
      return this.accept
    }
  },
  watch: {
    accept(n, o) {
      if (n) {
      } else {
        this.form = {
          eventType: '',
          type: '',
          remark: '',
          user: 1
        }
      }
    }
  },
  created() {
    // this.handleGetList()
  },
  methods: {
    //   获取网格yuan
    // async handleGetList() {
    //   const res = await getUserList({
    //     fileType: 4,
    //     gridId: sessionStorage.getItem('gridId')
    //   })
    //   this.eventsList = res.data
    // },
    handleConfirm() {
      this.$refs['form'].validate(async v => {
        const data = await beVerified({
          type: this.form.type,
          remark: this.form.remark,
          detailsId: this.$route.query.id,
        })
        if (data && data.code == 200) {
          this.$notify(
            {
              title: data.msg,
              type: 'success'
            }
          )
		this.$router.go(-1)
        } else {
          this.$notify(
            {
              title: data.msg,
              type: 'success'
            }
          )
        }
        this.handleClose()
      })
    },

    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style></style>
