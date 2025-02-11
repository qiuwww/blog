<template>
  <div class="img-upload-container inline-block relative">
    <div class="img-add-box inline-block relative">
      <img
        :src="avatarUrl ? avatarUrl : defualtAvatar"
        class="w100 h100 round"
      />
      <input
        type="file"
        @change="handleUpload"
        :accept="acceptType.join(',')"
        class="img-file pointer w100 h100"
      />
    </div>
  </div>
</template>

<script>
import "@/utils/drag.js";
import { mapGetters } from "vuex";
import { setHeadPortrait } from "@/api/user";
import { imageFormatIsCorrect } from "@/utils/image_verification.js";

export default {
  name: "Upload",
  data() {
    return {
      defualtAvatar:
        "data:image/jpeg;base64,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",
      avatarUrl: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    acceptTypeDescript() {
      let res = "";
      const acceptType = this.acceptType;
      acceptType.forEach(
        (item, index) =>
          (res += index < acceptType.length - 1 ? `${item}/` : item)
      );
      return res;
    }
  },
  watch: {
    userInfo: {
      handler() {
        this.avatarUrl = this.userInfo.head;
      },
      immediate: true
    }
  },
  methods: {
    handleUpload(event) {
      // upload image

      const imgFile = event.target.files[0];

      if (
        !imageFormatIsCorrect(
          imgFile,
          this.acceptType,
          this.acceptTypeDescript,
          this.maxSize
        )
      ) {
        return;
      }

      const formData = new FormData();
      formData.append("file", imgFile);
      formData.append("id", sessionStorage.getItem("userId"));

      setHeadPortrait(formData).then(res => {
        if (res && +res.code === 200) {
          this.$store.dispatch(
            "user/getLoginUserInfo",
            sessionStorage.getItem("userId")
          );
        }
      });
    }
  },
  props: ["acceptType", "maxSize", "disabled"]
};
</script>

<style scoped>
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
</style>
