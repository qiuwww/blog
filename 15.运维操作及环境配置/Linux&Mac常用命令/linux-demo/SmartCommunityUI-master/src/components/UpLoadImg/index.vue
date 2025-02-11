<template>
  <div class="img-upload-container inline-block">
    <div class="img-show-list inline-block">
      <ul class="inline-block">
        <li
          v-for="(item, index) in selfImgSrc"
          :key="index"
          :class="{
            'id-card-img': idCardClass,
            'img-box-preview-show relative pointer overflow inline-block mr10': true
          }"
        >
          <img :src="item" class="w100 h100">
          <div class="img-preview w100 h100">
            <div>
              <i class="el-icon-zoom-in mr10" @click="handleOriginal(item)" />
              <i class="el-icon-delete" @click="handleDeleteImg(item)" />
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div
      v-if="isShowUploadImg"
      :class="{
        'id-card-upload': idCardClass,
        'img-add-box inline-block relative': true
      }"
    >
      <input
        type="file"
        :accept="acceptType.join(',')"
        class="img-file pointer  h100"
        @change="handleUpload" style="width: 131px"
      >
      <div class="img-add  h100 align-center" style="width: 131px">
        <i class="el-icon-plus pointer" style="margin-left: 52px"/>
        <div class="upload-notice w100" style="margin-left: 31px" >
          <span class="accept-type-descript">{{ acceptTypeDescript }}</span>
        </div>
      </div>
    </div>
    <!-- 查看大图 -->
    <el-dialog
      v-if="isPreview"
      v-dialogDrag
      center
      :before-close="close"
      :append-to-body="true"
      :visible.sync="isPreview"
    >
      <img :src="previewUrl" class="w100">
    </el-dialog>
  </div>
</template>

<script>
import '@/utils/drag.js'
import { uploadImg, deletImg } from '@/api/utils'
import { imageFormatIsCorrect } from '@/utils/image_verification.js'

export default {
  name: 'Upload',
  props: ['type', 'limit', 'acceptType', 'imgSrc', 'maxSize', 'disabled'],
  data() {
    return {
      imgFiles: [],
      selfImgSrc: [],
      previewUrl: '',
      isPreview: false
    }
  },
  computed: {
    acceptTypeDescript() {
      let res = ''
      const acceptType = this.acceptType
      acceptType.forEach(
        (item, index) =>
          (res += index < acceptType.length - 1 ? `${item}/` : item)
      )
      return res
    },
    idCardClass() {
      return this.type === 'idCard'
    },
    isShowUploadImg() {
      // Make a judgment here:
      const disabled = this.disabled ? this.disabled : false

      return !(this.selfImgSrc.length >= this.limit || disabled)
    }
  },
  watch: {
    // imgSrc() {
    //   if (this.imgSrc) {
    //     this.selfImgSrc = this.imgSrc;
    //     this.imgFiles.push(...this.imgSrc);
    //   }
    // }
    imgSrc: {
      handler(n, o) {
        if (this.imgSrc) {
          this.selfImgSrc = this.imgSrc
          this.imgFiles.push(...this.imgSrc)
          this.$emit('uploadChange', this.imgFiles)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleOriginal(item) {
      // see original image

      this.isPreview = !this.isPreview
      this.previewUrl = item
    },
    close() {
      this.isPreview = false
    },
    handleDeleteImg(delUrl) {
      // delet image

      const imgSrc = this.selfImgSrc.filter(item => item !== delUrl)
      this.selfImgSrc = imgSrc

      const formData = new FormData()
      formData.append('url', delUrl)

      deletImg(formData).then(res => {
        if (res && +res.code === 200) {
          this.imgFiles = []
          this.isPreview = false
          this.$emit('uploadChange', this.imgFiles)
        }
      })
    },
    previewImg(imgFile) {
      // local preview

      this.selfImgSrc = this.selfImgSrc.concat(imgFile)
    },
    handleUpload(event) {
      // upload image

      const imgFile = event.target.files[0]

      if (
        !imageFormatIsCorrect(
          imgFile,
          this.acceptType,
          this.acceptTypeDescript,
          this.maxSize
        )
      ) {
        return
      }

      const formData = new FormData()
      formData.append('file', imgFile)

      uploadImg(formData).then(res => {
        if (res && +res.code === 200) {
          this.imgFiles = this.imgFiles.concat(res.data)
          this.$emit('uploadChange', this.imgFiles)
          this.previewImg(res.data)
        }
      })
    }
  }
}
</script>

<style scoped>
.img-upload-container .img-show-list ul li {
  width: 120px;
  height: 120px;
}
.img-upload-container .img-show-list ul li.id-card-img {
  width: 282px;
  height: 180px;
}
.img-upload-container .img-show-list ul li img {
  top: 0;
  left: 0;
  position: absolute;
  border-radius: 3px;
  border: 1px solid #cfcfcf;
}
.img-upload-container .img-show-list ul li:hover .img-preview {
  opacity: 1;
  border-radius: 3px;
}
.img-upload-container .img-show-list ul li .img-preview {
  top: 0;
  left: 0;
  opacity: 0;
  font-size: 20px;
  color: #ffffff;
  position: absolute;
  transition: opacity 0.3s;
  background: rgba(0, 0, 0, 0.5);
}
.img-upload-container .img-show-list ul li .img-preview div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.img-upload-container .img-file {
  top: 0px;
  left: 0px;
  opacity: 0;
  z-index: 100;
  position: absolute;
}
.img-upload-container .img-add-box {
  width: 120px;
  height: 120px;
  line-height: 120px;
}
.img-upload-container .img-add-box.id-card-upload {
  width: 282px;
  height: 180px;
  line-height: 180px;
}
.img-upload-container .img-add-box .img-add {
  top: 0px;
  left: 0px;
  z-index: 99;
  font-size: 26px;
  color: #cfcfcf;
  position: absolute;
  border-radius: 3px;
  border: 1px solid #cfcfcf;
}

.img-upload-container .img-add .upload-notice {
  top: 30px;
  left: 0px;
  position: absolute;
}
.img-upload-container .img-add .upload-notice .accept-type-descript {
  font-size: 12px;
}
</style>
