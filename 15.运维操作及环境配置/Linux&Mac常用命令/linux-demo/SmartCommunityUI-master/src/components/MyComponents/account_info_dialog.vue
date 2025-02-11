<template>
  <el-dialog
    v-if="detailDialog"
    v-dialogDrag
    v-loading="loading"
    center
    title="账号信息"
    :width="dialogWidth"
    :before-close="close"
    :visible.sync="detailDialog"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="right"
      class="mt20 overflow pl15 pr15"
    >
      <el-row type="flex" justify="space-around">
        <el-col :span="18" class="form-inp">
          <el-row type="flex" justify="space-around">
            <el-col :span="18" class="form-inp">
              <el-form-item
                label="我的账号："
                prop="userName"
                :label-width="labelWidth"
              >
                <el-tag type="info"> {{ form.userName  }}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="18" class="form-inp">
              <el-form-item
                label="姓名："
                prop="realName"
                :label-width="labelWidth"
              >
                <el-tag type="info">{{ form.realName  }} </el-tag>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="18" class="form-inp">
              <el-form-item label="性别：" prop="sex" :label-width="labelWidth">
                <el-tag type="info">{{ form.sex  }} </el-tag>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="18" class="form-inp">
              <el-form-item
                prop="phone"
                label="手机号码："
                :label-width="labelWidth"
              >
                <el-tag type="info">
                  {{ form.phone  }}
                </el-tag>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="18" class="form-inp">
              <el-form-item
                label="部门："
                prop="deptName"
                :label-width="labelWidth"
              >
                <el-tag type="info"> {{ form.deptName  }}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="18" class="form-inp">
              <el-form-item
                label="工号："
                prop="workCode"
                :label-width="labelWidth"
              >
                <el-tag type="info"> {{ form.workCode  }}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="form-inp">
          <el-form-item>
            <el-tooltip
              effect="dark"
              placement="top"
              content="点击图片修改头像(png/jpeg/jpg)"
            >
              <AvatarUpload
                :max-size="imageMaxSize"
                :accept-type="['png', 'jpeg', 'jpg']"
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button v-loading="loading" @click="handleModifyPhone">修改手机号</el-button>
      <el-button
        v-loading="loading"
        class="theme-btn"
        @click="handleModifyPassword"
      >修改密码</el-button>
      <el-button class="theme-btn" @click="handleLogout">退出账号</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import { mapGetters } from 'vuex'
import { getLoginUserInfo } from '@/api/user'
import AvatarUpload from '@/components/Mycomponents/avatar_upload'
import { imageFormatIsCorrect } from '@/utils/image_verification.js'

export default {
  name: 'AccountInfoDialog',
  data() {
    return {
      form: {},
      imageMaxSize: 1024,
      labelWidth: '110px',
      dialogWidth: '640px'
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'loading'])
  },
  watch: {
    detailDialog() {
      this.resetForm()
      if (this.detailDialog) {
        this.form = this.userInfo
        this.$store.dispatch('load/setLoading', false)
      }
    }
  },
  methods: {
    handleLogout() {
      this.$router.push('/login')
      this.$store.dispatch('permission/logout')
    },
    handleModifyPassword() {
      this.$emit('modifyPassword')
    },
    handleModifyPhone() {
      this.$emit('modifyPhone')
    },
    close() {
      this.$emit('close')
    },
    resetForm() {
      this.form = {}
    }
  },
  components: {
    AvatarUpload
  },
  props: ['detailDialog', 'loading']
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
