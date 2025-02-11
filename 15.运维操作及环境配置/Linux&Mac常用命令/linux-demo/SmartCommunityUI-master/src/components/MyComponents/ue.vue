<template>
  <div class="editorTextArea">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      style="height: 200px;"
      :options="editorOption"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
    >
      <!-- 自定义toolar -->
      <div id="toolbar" slot="toolbar">
        <!-- Add a bold button -->
        <!-- You can also add your own -->
      </div> 
    </quill-editor>
  </div>
</template>

<script>
import {
  Quill,
  quillEditor
} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//引入font.css 
import '@/assets/css/font.css'

// 自定义字体大小
let Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
Quill.register(Size, true)

// 自定义字体类型
var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
  '宋体', '黑体'
]
var Font = Quill.import('formats/font')
Font.whitelist = fonts
Quill.register(Font, true)

export default {
  name: 'FuncFormsEdit',
  components: {
    quillEditor
  },
  data() {
    return {
      content: this.editCount,
      editorOption: {
        placeholder: "请输入套餐详情",
        theme: "snow", // or 'bubble' 
        modules: { toolbar: [] }
      }
    }
  },
  watch: {
    editCount: {
      handler(n, o) {
        this.content = n
      },
      deep: true
    }
  },
  methods: {
    onEditorBlur() {//失去焦点事件
      this.$emit("liEditorBlur", this.content)
    },
    onEditorChange() {//内容改变事件
      this.$emit("onEditorChange", this.content)
    }
  },
  props: [
    "editCount"
  ]


}
</script>

<style scoped>
</style>

