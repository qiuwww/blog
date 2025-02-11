<template>
  <el-dialog
    v-if="certificatesDialog"
    v-dialogDrag
    center
    title="认证信息"
    width="760px"
    :append-to-body="true"
    :visible.sync="certificatesDialog"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="房产证" prop="house">
        <div class="mt20">
          <Upload
            :img-src="deedAddress"
            :limit="10"
            :max-size="10240"
            :accept-type="['png', 'jpeg', 'jpg']"
            @uploadChange="handleUploadHouse"
          />
        </div>
        <span
          class="gray"
        >提示：文件格式为jpg,jpeg,png,pdf上传文件最大为<i
          style="color:#0994DC;"
        >10MB</i></span>
      </el-form-item>
      <el-form-item label="身份证" prop="people">
        <div class="mt20">
          <Upload
            :img-src="userIdentityPhotos"
            :limit="10"
            :max-size="10240"
            :accept-type="['png', 'jpeg', 'jpg']"
            @uploadChange="handleUploadPeople"
          />
        </div>
        <span
          class="gray"
        >提示：文件格式为jpg,jpeg,png,pdf上传文件最大为<i
          style="color:#0994DC;"
        >3MB</i></span>
      </el-form-item>
      <el-form-item label="房屋信息备注" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="5"
          show-word-limit
          :maxlength="100"
        /></el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button
        v-loading="loading"
        type="primary"
        @click="handleConfirem"
      >确认上传</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import Upload from '@/components/Mycomponents/upload'
import { mapGetters } from 'vuex'

export default {
  components: {
    Upload
  },
  props: ['certificatesDialog', 'edit'],

  data() {
    return {
      housePhoto: [],
      peoplePhoto: [],
      userIdentityPhotos: [],
      deedAddress: [],
      form: {
        housePhoto: '',
        peoplePhoto: '',
        remark: ''
      },
      rules: {
        house: {
          required: true,
          validator: (r, v, c) => {
            if (!this.housePhoto) {
              return c(new Error('请上传房产证'))
            } else {
              return c()
            }
          }
        },
        people: {
          required: true,
          validator: (r, v, c) => {
            if (!this.peoplePhoto) {
              return c(new Error('请上传身份证'))
            } else {
              return c()
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  watch: {
    housePhoto(n, o) {
      this.form.housePhoto = n.join(',')
    },
    peoplePhoto(n, o) {
      this.form.peoplePhoto = n.join(',')
    },
    certificatesDialog(n, o) {
      if (n && this.edit) {
        this.userIdentityPhotos = this.edit.userIdentityPhotos.split(',')
        this.deedAddress = this.edit.deedAddress.split(',')
        this.form.remark = this.edit.content
      }
    }
  },
  methods: {
    handleUploadHouse(prop) {
      this.housePhoto = prop
    },
    handleUploadPeople(prop) {
      this.peoplePhoto = prop
    },
    handleConfirem() {
      this.$refs.form.validate(v => {
        if (v) {
          this.$emit('confirm', this.form)
          this.close()
        }
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style></style>
