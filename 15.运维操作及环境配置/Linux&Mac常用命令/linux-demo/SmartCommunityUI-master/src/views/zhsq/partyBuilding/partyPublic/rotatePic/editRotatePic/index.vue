<template>
  <Modal v-model="show" :title="title" :mask-closable="false" width="600" :key="'rotatePic'">
      <div class="formWrap">
        <div v-if="type !== 'info'">
          <el-form v-if="type !== 'info'" ref="postForm" class="p16" :model="formData" :label-width="'70px'" :rules="rules">
            <el-form-item label="标题:" prop="title">
              <el-input v-model="formData.title" placeholder="标题" />
            </el-form-item>
            <el-form-item label="图片:" prop="imgUrl">
              <a v-loading.fullscreen.lock="fullscreenLoading" class="uploadBtn" @click="uploadFileBtn">上传</a><input id="uploadInput" ref="uploadInput" type="file" @change="uploadFile($event)">
              <div class="mt20">
                <el-image v-if="formData.imgUrl" :src="formData.imgUrl" style="max-width: 400px">
                  <div slot="error" class="image-slot"></div>
                </el-image>
              </div>
              <el-input v-model="formData.imgUrl" style="display: none" />
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
          <el-form :model="formData" class="demo-form-inline p16">
            <el-form-item label="标题:">
              <span>{{ formData.title }}</span>
            </el-form-item>
            <el-form-item label="图片:">
              <img :src="formData.imgUrl" style="max-width: 400px">
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <Button type="text" @click="closeModel">取消</Button>
        <Button type="primary" class="ml30" v-if="type !== 'info'" :loading="httpLoading" @click="postFormData">提交</Button>
      </div>
    </Modal>
</template>

<script>
import { uploadImg } from '@/api/zhsq/common/fileManage'
import {
  getPartyBannerAdd,
  getPartyBannerEdit
} from '@/api/zhsq/partyPublic/index'
export default {
  name: 'EditRotatePic',
  props: {
  //  弹窗标题
    title: {
      type: String,
      default: ''
    },
    //  弹窗显示条件
    value: {
      type: Boolean,
      default: false
    },
    //  弹窗显示条件
    modalShow: {
      type: Boolean,
      default: false
    },
    //  弹窗类型-----add新增，-----edit编辑, ----info查看
    type: {
      type: String,
      default: ''
    },
    // 查看编辑对象
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: this.value,
      //  按钮加载状态
      httpLoading: false,
      // 表单数据
      formData: {},
      // 加载层
      fullscreenLoading: false,
      rules: {
        title: [
          { required: true, message: '请填写标题 ', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请上传图片 ', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show: function(val) {
      if (val) {
        this.formData = {}
        this.httpLoading = false
        if (this.type !== 'add') {
          this.$nextTick(() => {
            this.formData = { ...this.data }
          })
        }
      } else {
        this.$emit('input', false)
      }
    }
  },
  methods: {
  // 关闭
    closeModel() {
      this.$emit('input', false)
    },
    // 上传
    uploadFileBtn() {
      this.$refs.uploadInput.click()
    },
    // 上传文件
    async uploadFile(e) {
      const self = this
      self.fullscreenLoading = true
      setTimeout(() => {
        self.fullscreenLoading = false
      }, 10000)
      const formData = new FormData()
      formData.append('file', this.$refs.uploadInput.files[0])
      uploadImg(formData).then(res => {
        self.fullscreenLoading = false
        if (res && res.code === 200) {
          self.formData.imgUrl = res.data
          self.formData = this.obj = Object.assign({}, self.formData)
        }
      })
    },
    // 提交表单
    postFormData() {
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          this.httpLoading = true
          if (this.type === 'add') {
            getPartyBannerAdd(this.formData).then(res => {
              this.httpLoading = false
              this.$emit('confirmClick')
            })
          }
          if (this.type === 'edit') {
            getPartyBannerEdit(this.formData).then(res => {
              this.httpLoading = false
              this.$emit('confirmClick')
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .p16{
    padding: 16px;
  }
  .formWrap{
    width: 600px;
    .fomrFooter{
      padding: 14px 30px;
      background: #F8F9FA !important;
      border-radius: 0 0 12px 12px;
      /deep/.ivu-btn-primary{
        border-radius: 100px;
        padding: 0 40px;
      }
      /deep/.ivu-btn-text{
        border-radius: 100px;
        background: #ffffff;
        padding: 0 30px;
      }
    }
  }
    .uploadBtn{
        display: inline-block;
        cursor: pointer;
        width: 79px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        background: #1890ff;
        border-radius: 4px;
    }
#uploadInput{
    display: none;
}
  /deep/.ivu-modal-footer{
    border-top: none;
    padding: 14px 30px;
    background: #F8F9FA !important;
    border-radius: 0 0 12px 12px;
    text-align: right;
    /deep/.ivu-btn-primary{
      border-radius: 100px;
      padding: 0 40px;
    }
    /deep/.ivu-btn-text{
      border-radius: 100px;
      background: #ffffff;
      padding: 0 30px;
    }
  }
</style>
