<template>
  <div id="tinymce-vue" ref="richText"></div>
</template>

<script>
import Tinymce from "tinymce/tinymce";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/themes/silver";
// import 'tinymce/themes/modern/theme'
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import 'tinymce/icons/default/icons' 
import "tinymce/plugins/wordcount";
import "tinymce/plugins/imagetools";
import "@/../static/tinymce/zh_CN.js";
import "tinymce/skins/ui/oxide/skin.min.css";
import { transformToFile } from "@/utils/data_transform";
import { uploadImg } from "@/api/information";

export default {
  data() {
    return {
      toolbar
    };
  },
  mounted() {
    let plugins = "link lists code table wordcount";
    let toolbar =
      "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink code | removeformat";

    if (this.showImgPlugins) {
      plugins = "link lists image code table wordcount";
      toolbar =
        "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat";
    }

    Tinymce.init({
      selector: "#tinymce-vue",
      language: "zh_CN",
      min_height: 300,
      plugins,
      toolbar,
      images_upload_url: "postAcceptor.php",
      images_upload_handler: (blobInfo, success, failure) => {
        const blob = blobInfo.blob();
        const name = blob.lastModifiedDate ? blob.name : "rich_text_image.jpg";

        const formData = new FormData();
        formData.append(
          "multipartFile",
          transformToFile(blob, name, blob.type)
        );

        formData.append("propertyId", this.$store.getters.propertyInfo.id);

        uploadImg(formData).then(res => {
          if (res && +res.code === 200) {
            success(res.object);
          }
        });
      }
    });
  },
  beforeDestroy() {
    Tinymce.remove();
  },
  props: ["showImgPlugins"]
};
</script>
<style scoped></style>
