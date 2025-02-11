<template>
  <el-dialog
    center
    v-dialogDrag
    title="导入数据"
    v-if="importDialog"
    :width="dialogWidth"
    v-loading="loading"
    :before-close="close"
    :visible.sync="importDialog"
  >
    <div>
      注意：请先下载EXCEL的格式文件（
      <a :href="href" class="theme pointer">点此下载</a>），
      然后根据格式文件填写数据后进行上传。
    </div>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button @click="close">取消</el-button>
      <el-button class="theme-btn" @click="handleUpload">选择文件</el-button>
      <input
        type="file"
        @change="handleClick"
        ref="excel-upload-input"
        style="display: none;"
      />
    </span>
  </el-dialog>
</template>

<script>
import "@/utils/drag.js";
import setting from "@/../config/setting";

export default {
  name: "Import_dialog",
  data() {
    return {
      dialogWidth: "540px"
    };
  },
  methods: {
    handleClick(e) {
      this.$emit("upload", e);
      this.$emit("close");
    },
    handleUpload() {
      this.$refs["excel-upload-input"].click();
    },
    close() {
      this.$emit("close");
    }
  },
  props: ["importDialog", "href", "loading"]
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
