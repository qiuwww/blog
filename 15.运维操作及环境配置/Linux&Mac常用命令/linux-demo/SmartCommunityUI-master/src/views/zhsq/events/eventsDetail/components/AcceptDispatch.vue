<template>
  <!-- 受理派遣  派遣-->
  <DialogUI
    :dialog-visible="isShow"
    :has-foot="true"
    :title="'受理派遣'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="派遣至" prop="user">
        <el-select  clearable v-model="form.user">
          <el-option
            v-for="(item, i)  in eventsList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
import { acceptDispatch } from '@/api/events'
import { getUserList } from '@/api/system'
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
      eventsList: [
        {
          id: 1,
          name: '印度阿叁'
        }
      ]
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
    this.handleGetList()
  },
  methods: {
    //   获取网格yuan
    async handleGetList() {
      const res = await getUserList({
        fileType: 4,
        gridId: sessionStorage.getItem('gridId')
      })
      this.eventsList = res.data
    },
    handleConfirm() {
      this.$refs['form'].validate(async v => {
        const data = await acceptDispatch({
          type: 1,
          remark: this.form.remark,
          detailsId: this.$route.query.id,
          beUserId:this.form.user
        })
        if (data && data.code == 200) {
          this.$notify(
            {
              title: data.msg,
              type: 'success'
            }
          )
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
