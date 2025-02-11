<template>
  <el-dialog
    v-if="modifyPhoneDialog"
    v-dialogDrag
    v-loading="loading"
    center
    title="修改手机号"
    :width="dialogWidth"
    :before-close="close"
    :visible.sync="modifyPhoneDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      class="mt20 overflow pl15 pr15"
    >
      <el-row type="flex" justify="space-around">
        <el-col :span="18" class="form-inp">
          <el-form-item
            prop="oldPhone"
            label="当前手机号："
            :label-width="labelWidth"
          >
            <span>{{ userInfo.phone  }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="18">
          <el-form-item
            label="验证码："
            prop="verifyCode"
            :label-width="labelWidth"
          >
            <el-input
              v-model.trim="form.verifyCode"
              maxlength="8"
              class="medium-inp"
              placeholder="输入验证码"
            />
            <el-button
              v-if="liked"
              @click="handleGetCheckCode"
            >获取验证码</el-button>
            <span v-else class="ml20 theme">{{ count }}s后重试</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="18" class="form-inp">
          <el-form-item
            prop="newPhone"
            label="新手机号："
            :label-width="labelWidth"
          >
            <el-input
              v-model.trim="form.newPhone"
              autocomplete="off"
              placeholder="请输入新手机号"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button @click="handleReset">重 置</el-button>
      sessionStorage.getItem('gridId') class="theme-btn" @click="handleModifyPhone">修 改</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import { mapGetters } from 'vuex'
import { sendCheckCode, modifyPhone } from '@/api/user'
import { vlength, vPhone } from '@/utils/verification.js'

export default {
  name: 'MofifyPhoneDialog',
  data() {
    return {
      form: {
        oldPhone: '',
        newPhone: '',
        verifyCode: ''
      },
      count: 60,
      liked: true,
      labelWidth: '110px',
      dialogWidth: '540px',
      rules: {
        newPhone: {
          validator: vPhone,
          trigger: 'blur'
        },
        verifyCode: {
          validator: vlength(4, 4, '请输入验证码！'),
          trigger: 'blur'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    modifyPhoneDialog() {
      this.form.oldPhone = JSON.parse(JSON.stringify(this.userInfo.phone))
    }
  },
  methods: {
    handleGetCheckCode() {
      sendCheckCode({ phone: this.form.oldPhone }).then(_ => {
        const liked = this.liked
        if (!liked) return
        this.countDown()
      })
    },
    countDown() {
      const count = this.count
      if (count === 1) {
        this.count = 60
        this.liked = true
      } else {
        this.count = count - 1
        this.liked = false
        setTimeout(this.countDown.bind(this), 1000)
      }
    },
    handleModifyPhone() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const params = {
            id: sessionStorage.getItem('userId'),
            checkCode: this.form.verifyCode,
            oldPhone: this.form.oldPhone,
            newPhone: this.form.newPhone
          }

          this.$store.dispatch('load/setLoading', true)
          modifyPhone(params).then(res => {
            if (res && res.code === '200') {
              this.$notify({
                title: '成功',
                message: res.msg,
                type: 'success'
              })
              this.$emit('close')
              this.$store.dispatch(
                'user/getLoginUserInfo',
                sessionStorage.getItem('userId')
              )
            }
          })
        }
      })
    },
    close() {
      this.$emit('close')
    },
    handleReset() {
      this.form = {
        oldPhone: '',
        newPhone: '',
        verifyCode: ''
      }
    }
  },
  props: ['modifyPhoneDialog', 'loading']
}
</script>
<style scoped></style>
