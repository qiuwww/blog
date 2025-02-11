<style lang="less">
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
<template>
  <Upload
    :headers="header"
    :action="action"
    :on-success="onFileUploadSuccess"
    :before-upload="onBeforupload"
    :on-error="onFileUploadError"
    :show-upload-list="false"
    accept=".png,.jpg,.jpeg"
  >
    <Spin v-if="uploadLoding" fix>
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load" />
      <div>上传中...</div>
    </Spin>
    <Row>
      <div v-if="imageUrlList.length>0" v-viewer="{movable: false}" class="imgWrap">
        <div class="shadow">
          <Icon type="ios-eye-outline" size="40" color="#fff" @click.stop="handleView()" />
          <Icon type="ios-trash-outline" size="40" color="#fff" @click.stop="handleRemove()" />
        </div>
        <img :src="imgUrl" class="upImg">
      </div>
      <div v-else class="noImg">{{titleName}}</div>
    </Row>
  </Upload>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'HeaderUpload',
  props: {
    value: {
      type: String,
      default: ''
    },
    titleName: {
      type: String,
      default: '点击上传头像'
    }
  },
  data() {
    return {
      imageUrlList: [],
      imgUrl: '',
      uploadLoding: false
    }
  },
  computed: {
    header() {
      return {
        Authorization: getToken(),
        'User-Type': 'Gov_User'
      }
    },
    action() {
      return `${window.location.origin}/api/download/fileUpload`
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.imgUrl = val
        this.imageUrlList.push(val)
      } else {
        this.imgUrl = ''
        this.imageUrlList = []
      }
    }
  },
  methods: {
    handleView() {
      const viewer = this.$el.querySelector('.imgWrap').$viewer
      viewer.show()
    },
    // 移除图片
    handleRemove() {
      this.imageUrlList = []
      this.src = ''
      this.$emit('removePath')
    },
    onFileUploadSuccess(res, file) {
      this.uploadLoding = false
      if (res && res.success) {
        this.imgUrl = res.data
        this.imageUrlList.push(res.data)
        this.$emit('uploadSuccess', res, file)
      }
    },
    onFileUploadError(file) {
      this.$emit('uploadError', file.name)
      this.uploadLoding = false
    },
    onBeforupload(file) {
      let s = file.name.substring(file.name.indexOf('.') + 1, file.name.length);
      s = s.toLowerCase();
      if (s != 'jpg' && s != 'png' && s != 'jpeg') {
        this.$Message.error("文件格式不正确！请选择图片文件！");
        this.fileType = false;
        return false;
      }
      this.uploadLoding = true
    }
  }
}
</script>

