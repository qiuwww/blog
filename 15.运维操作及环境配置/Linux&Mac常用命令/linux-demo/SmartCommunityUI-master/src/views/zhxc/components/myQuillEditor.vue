<template>
  <div style="height: 100%;">
    <!--    <img src="../assets/images/dp.png" style="object-fit: fill; height: calc(100vh - 64px);width:100%;"/>-->
    <div v-loading="quillUpdateImg" element-loading-text="请稍等，图片上传中" style="height: 100%;">
      <!-- 图片上传组件辅助-->
      <Upload
        style="display: none;"
        class="avatar-uploader"
        :action="serverUrl"
        name="file"
        :headers="header"
        :show-upload-list="false"
        :data="uploadData"
        accept="image/*"
        :on-error="uploadError"
        :before-upload="beforeUpload">
      </Upload>
      <quillEditor
        class="myEditor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @ready="onEditorReady($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">

        <!-- 自定义toolar -->
        <div id="toolbar" slot="toolbar">
          <!-- Add a bold button -->
          <button class="ql-code" title="编辑HTML代码"></button>
          <button class="ql-bold" title="加粗">Bold</button>
          <button class="ql-italic" title="斜体">Italic</button>
          <button class="ql-underline" title="下划线">underline</button>
          <button class="ql-strike" title="删除线">strike</button>
          <button class="ql-blockquote" title="引用"></button>
          <button class="ql-header" value="1" title="标题1"></button>
          <button class="ql-header" value="2" title="标题2"></button>
          <!--Add list -->
          <button class="ql-list" value="ordered" title="有序列表"></button>
          <button class="ql-list" value="bullet" title="无序列表"></button>
          <!-- Add font size dropdown -->
          <select class="ql-header" title="段落格式" style="line-height: initial;">
            <option selected>段落</option>
            <option value="1">标题1</option>
            <option value="2">标题2</option>
            <option value="3">标题3</option>
            <option value="4">标题4</option>
            <option value="5">标题5</option>
            <option value="6">标题6</option>
          </select>
          <select class="ql-size fontSize" title="字体大小" style="line-height: initial;">
            <option
              v-for="(item, i)  in fontSizeArr"
              :value="item"
              :key="item"
            >{{ item }}
            </option>
          </select>
          <select class="ql-font" title="字体" style="line-height: initial;">
            <option value="SimSun">宋体</option>
            <option value="SimHei">黑体</option>
            <option value="Microsoft-YaHei">微软雅黑</option>
            <option value="KaiTi">楷体</option>
            <option value="FangSong">仿宋</option>
            <option value="Arial">Arial</option>
          </select>
          <select class="ql-color" value="color" title="字体颜色">
            <option
              v-for="(item, index) in color"
              :key="index"
              :value="item"
              :selected="index === 0"
            >{{ item }}
            </option>
          </select>
          <select class="ql-background" value="background" title="背景颜色">
            <option
              v-for="(item, index) in color"
              :key="index"
              :value="item"
              :selected="index === 0"
            >{{ item }}
            </option>
          </select>
          <select class="ql-align" value="align" title="对齐"></select>
          <button class="ql-image" title="图片"></button>
          <select class="ql-lineHeight">
            <option
              v-for="(item, index) in lineHeight"
              :key="index"
              :value="item"
              :selected="index === 0"
            >{{ item }}
            </option>
          </select>
        </div>
      </quillEditor>
    </div>

    <Modal
      title="编辑html代码"
      v-model="showHTMLModal"
      :mask-closable="false"
      :width="900">
      <Input v-model="dataEdit" :rows="20" type="textarea" style="max-height:60vh;overflow:auto;"/>
      <div slot="footer">
        <Button type="text" @click="showHTMLModal=false">取消</Button>
        <Button @click="editHTMLOk" type="primary" icon="md-checkmark-circle-outline">确定保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
    import {Quill} from 'vue-quill-editor'
    import {quillEditor} from 'vue-quill-editor';
    import ImageResize from 'quill-image-resize-module'
    import {nginxUrl} from '@/api/tools/tool'

    import {uploadImages} from '@/api/zhxc/basicMenuInformation/basicMenuInformation'

    Quill.register('modules/imageResize', ImageResize);

    var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'sans-serif'];
    var Font = Quill.import('formats/font');
    Font.whitelist = fonts; //将字体加入到白名单
    Quill.register(Font, true);

    import lineHeight from '../../components/lineHeight';


    var BlockEmbed = Quill.import('blots/block/embed');

    class ImageBlot extends BlockEmbed {
        static create(value) {
            let parentNode = document.createElement("div");
            parentNode.setAttribute('class', "img_parent");
            let node = super.create();
            node.setAttribute('src', value.url);
            node.setAttribute('width', value.width);
            parentNode.setAttribute('width', value.width);
            node.setAttribute('height', value.height);
            parentNode.appendChild(node);
            return parentNode;
        }

        static value(node) {
            if (node.tagName == "IMG") {
                return {
                    url: node.getAttribute('src'),
                    width: node.getAttribute('width'),
                    height: node.getAttribute('height')
                }
            } else {
                let children = node.children;
                return {
                    url: children[0].getAttribute('src'),
                    width: children[0].getAttribute('width'),
                    height: children[0].getAttribute('height')
                }
            }
        }
    }

    ImageBlot.blotName = 'image';
    ImageBlot.tagName = 'img';
    Quill.register(ImageBlot);


    // 工具栏配置
    // const toolbarOptions = [
    //     ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
    //     ["blockquote", "code"], // 引用  代码块
    //     [{header: 1}, {header: 2}], // 1、2 级标题
    //     [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
    //     [{script: "sub"}, {script: "super"}], // 上标/下标
    //     [{indent: "-1"}, {indent: "+1"}], // 缩进
    //     // [{'direction': 'rtl'}],                         // 文本方向
    //     [{size: ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '32px', '48px']}], // 字体大小
    //     [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
    //     [{
    //         color: []
    //     }, {
    //         background: []
    //     }], // 字体颜色、字体背景颜色
    //     [{font: fonts}], // 字体种类
    //     [{align: []}], // 对齐方式
    //     ["clean"], // 清除文本格式
    //     ["image"] // 链接、图片、视频
    // ];
    // 标题
    const titleConfig = [
        {Choice: '.ql-bold', title: '加粗'},
        {Choice: '.ql-italic', title: '斜体'},
        {Choice: '.ql-underline', title: '下划线'},
        {Choice: '.ql-header', title: '段落格式'},
        {Choice: '.ql-strike', title: '删除线'},
        {Choice: '.ql-blockquote', title: '块引用'},
        {Choice: '.ql-code', title: '编辑HTML代码'},
        {Choice: '.ql-font', title: '字体'},
        {Choice: '.ql-size', title: '字体大小'},
        {Choice: '.ql-list[value="ordered"]', title: '编号列表'},
        {Choice: '.ql-list[value="bullet"]', title: '项目列表'},
        {Choice: '.ql-direction', title: '文本方向'},
        {Choice: '.ql-header[value="1"]', title: 'h1'},
        {Choice: '.ql-header[value="2"]', title: 'h2'},
        {Choice: '.ql-align', title: '对齐方式'},
        {Choice: '.ql-color', title: '字体颜色'},
        {Choice: '.ql-background', title: '背景颜色'},
        {Choice: '.ql-image', title: '图像'},
        {Choice: '.ql-video', title: '视频'},
        {Choice: '.ql-link', title: '添加链接'},
        {Choice: '.ql-formula', title: '插入公式'},
        {Choice: '.ql-clean', title: '清除字体格式'},
        {Choice: '.ql-script[value="sub"]', title: '下标'},
        {Choice: '.ql-script[value="super"]', title: '上标'},
        {Choice: '.ql-indent[value="-1"]', title: '向左缩进'},
        {Choice: '.ql-indent[value="+1"]', title: '向右缩进'},
        {Choice: '.ql-header .ql-picker-label', title: '标题大小'},
        {Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一'},
        {Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二'},
        {Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三'},
        {Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四'},
        {Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五'},
        {Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六'},
        {Choice: '.ql-header .ql-picker-item:last-child', title: '标准'},
        {Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号'},
        {Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号'},
        {Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号'},
        {Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准'},
        {Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐'},
        {Choice: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐'},
        {Choice: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐'},
        {Choice: '.ql-align .ql-picker-item[data-value="justify"]', title: '两端对齐'},
        {Choice: '.ql-lineHeight', title: '行间距'}
    ];

    export default {
        name: 'dashboard-console',
        components: {
            quillEditor,
            ImageResize
        },
        props: {
            editorContent: {
                type: String,
                default: ""
            },
        },
        data() {
            return {
                color: ["#000000",
                    "#000033",
                    "#000066",
                    "#000099",
                    "#0000CC",
                    "#0000FF",
                    "#003300",
                    "#003333",
                    "#003366",
                    "#003399",
                    "#0033CC",
                    "#0033FF",
                    "#006600",
                    "#006633",
                    "#006666",
                    "#006699",
                    "#0066CC",
                    "#0066FF",
                    "#009900",
                    "#009933",
                    "#009966",
                    "#009999",
                    "#0099CC",
                    "#0099FF",
                    "#00CC00",
                    "#00CC33",
                    "#00CC66",
                    "#00CC99",
                    "#00CCCC",
                    "#00CCFF",
                    "#00FF00",
                    "#00FF33",
                    "#00FF66",
                    "#00FF99",
                    "#00FFCC",
                    "#00FFFF",
                    "#330000",
                    "#330033",
                    "#330066",
                    "#330099",
                    "#3300CC",
                    "#3300FF",
                    "#333300",
                    "#333333",
                    "#333366",
                    "#333399",
                    "#3333CC",
                    "#3333FF",
                    "#336600",
                    "#336633",
                    "#336666",
                    "#336699",
                    "#3366CC",
                    "#3366FF",
                    "#339900",
                    "#339933",
                    "#339966",
                    "#339999",
                    "#3399CC",
                    "#3399FF",
                    "#33CC00",
                    "#33CC33",
                    "#33CC66",
                    "#33CC99",
                    "#33CCCC",
                    "#33CCFF",
                    "#33FF00",
                    "#33FF33",
                    "#33FF66",
                    "#33FF99",
                    "#33FFCC",
                    "#33FFFF",
                    "#660000",
                    "#660033",
                    "#660066",
                    "#660099",
                    "#6600CC",
                    "#6600FF",
                    "#663300",
                    "#663333",
                    "#663366",
                    "#663399",
                    "#6633CC",
                    "#6633FF",
                    "#666600",
                    "#666633",
                    "#666666",
                    "#666699",
                    "#6666CC",
                    "#6666FF",
                    "#669900",
                    "#669933",
                    "#669966",
                    "#669999",
                    "#6699CC",
                    "#6699FF",
                    "#66CC00",
                    "#66CC33",
                    "#66CC66",
                    "#66CC99",
                    "#66CCCC",
                    "#66CCFF",
                    "#66FF00",
                    "#66FF33",
                    "#66FF66",
                    "#66FF99",
                    "#66FFCC",
                    "#66FFFF",
                    "#990000",
                    "#990033",
                    "#990066",
                    "#990099",
                    "#9900CC",
                    "#9900FF",
                    "#993300",
                    "#993333",
                    "#993366",
                    "#993399",
                    "#9933CC",
                    "#9933FF",
                    "#996600",
                    "#996633",
                    "#996666",
                    "#996699",
                    "#9966CC",
                    "#9966FF",
                    "#999900",
                    "#999933",
                    "#999966",
                    "#999999",
                    "#9999CC",
                    "#9999FF",
                    "#99CC00",
                    "#99CC33",
                    "#99CC66",
                    "#99CC99",
                    "#99CCCC",
                    "#99CCFF",
                    "#99FF00",
                    "#99FF33",
                    "#99FF66",
                    "#99FF99",
                    "#99FFCC",
                    "#99FFFF",
                    "#CC0000",
                    "#CC0033",
                    "#CC0066",
                    "#CC0099",
                    "#CC00CC",
                    "#CC00FF",
                    "#CC3300",
                    "#CC3333",
                    "#CC3366",
                    "#CC3399",
                    "#CC33CC",
                    "#CC33FF",
                    "#CC6600",
                    "#CC6633",
                    "#CC6666",
                    "#CC6699",
                    "#CC66CC",
                    "#CC66FF",
                    "#CC9900",
                    "#CC9933",
                    "#CC9966",
                    "#CC9999",
                    "#CC99CC",
                    "#CC99FF",
                    "#CCCC00",
                    "#CCCC33",
                    "#CCCC66",
                    "#CCCC99",
                    "#CCCCCC",
                    "#CCCCFF",
                    "#CCFF00",
                    "#CCFF33",
                    "#CCFF66",
                    "#CCFF99",
                    "#CCFFCC",
                    "#CCFFFF",
                    "#FF0000",
                    "#FF0033",
                    "#FF0066",
                    "#FF0099",
                    "#FF00CC",
                    "#FF00FF",
                    "#FF3300",
                    "#FF3333",
                    "#FF3366",
                    "#FF3399",
                    "#FF33CC",
                    "#FF33FF",
                    "#FF6600",
                    "#FF6633",
                    "#FF6666",
                    "#FF6699",
                    "#FF66CC",
                    "#FF66FF",
                    "#FF9900",
                    "#FF9933",
                    "#FF9966",
                    "#FF9999",
                    "#FF99CC",
                    "#FF99FF",
                    "#FFCC00",
                    "#FFCC33",
                    "#FFCC66",
                    "#FFCC99",
                    "#FFCCCC",
                    "#FFCCFF",
                    "#FFFF00",
                    "#FFFF33",
                    "#FFFF66",
                    "#FFFF99",
                    "#FFFFCC",
                    "#FFFFFF"],
                lineHeight: ['1', '1.5','1.8', '2', '2.5', '2.6', '2.7', '2.8', '2.9', '3'],
                fontSizeArr: ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '32px', '48px'],
                dataEdit: '',
                imgTypeArr: ["image/png", "image/jpg", "image/jpeg"],//上传图片类型限制
                uploadData: {},      // 图片文件
                //serverUrl: "http://otp.cdinfotech.top/file/upload_images", // 这里写你要上传的图片服务器地址
                serverUrl: "",
                header: {   // 有的图片服务器要求请求头需要有token，有的可以加上
                    Authorization: 'Bearer '
                },
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                content: '',        // 内容
                editorOption: {          // 配置项
                    theme: "snow", // or 'bubble'
                    placeholder: "请输入文章内容",
                    modules: {
                        clipboard: {
                            matchVisual: false,
                        },
                        toolbar: {
                            container: "#toolbar",
                            handlers: {
                                image: function (value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector(".avatar-uploader input").click();
                                    } else {
                                        this.quill.format("image", false);
                                    }
                                },
                                code: function () {

                                }
                            },
                            theme: 'snow'
                        },
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        }
                    }
                },
                showHTMLModal: false
            }
        },
        mounted() {
            autotip:{
                document.getElementsByClassName('myEditor')[0].dataset.placeholder = '';
                for (let item of titleConfig) {
                    let tip = document.querySelector('.quill-editor ' + item.Choice);
                    if (!tip) continue;
                    tip.setAttribute('title', item.title);
                }
            }
            let _this = this;
            document.querySelector(".ql-code").addEventListener("click", function () {
                _this.dataEdit = _this.content;
                _this.showHTMLModal = true;
            });

            Quill.register("formats/lineHeight", lineHeight, true);
        },
        methods: {
            editHTMLOk() {
                this.showHTMLModal = false;
                this.content = this.dataEdit;
            },
            onEditorReady() {
                this.content = this.value;
            },
            getEditorContent() {
                return this.content;
            },
            onEditorBlur(editor) {
                //失去焦点事件
            },
            onEditorFocus(editor) {
                //获得焦点事件
            },
            onEditorChange(editor) {
                //内容改变事件
            },
            // 富文本图片上传前
            beforeUpload(res) {
                let _this = this;
                // 控制文件上传格式
                var imgType = this.imgTypeArr.indexOf(res.type) !== -1
                if (!imgType) {
                    this.$Message.error({
                        content: '文件  ' + res.name + '  格式不正确, 请选择jpg或png.',
                        duration: 3
                    });
                    return false;
                }
                // 显示loading动画
                this.quillUpdateImg = true;
                var reader = new FileReader();
                reader.readAsDataURL(res);
                reader.onload = () => {
                    uploadImages({imgUrl: reader.result}).then(res => {
                        _this.uploadSuccess(res.data);
                    }).catch(res => {
                        _this.quillUpdateImg = false;
                    });
                };
                return false;
            },
            uploadSuccess(res) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill;
                // 如果上传成功
                if (res) {
                    //let url = "http://otp.cdinfotech.top" + res.url;
                    let url = nginxUrl + res;
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', {url: url});
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false;
            },
            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false;
                this.$message.error("图片插入失败");
            }
        },
        watch: {
            editorContent: {
                handler(val, oldVal) {
                    this.content = val;
                },
                deep: true
            },

        }
    }
</script>
<style lang="less">
  .myEditor {
    line-height: normal !important;
    height: calc(100% - 75px);
    width: 90%;
    margin: 0px auto;
  }
  .ql-container {
    min-height: 350px;
    font-size: 16px;
    line-height: 1.4;
  }

  /** 设置行高 */

  .ql-toolbar {
    text-align: left;
  }

  .ql-lineHeight {
    margin: 6px 0 0 0;

    .ql-picker-options {
      height: 200px;
      overflow: auto;
    }
  }

  .ql-lineHeight::before {
    content: "行高：";
    position: relative;
    top: -2px;
    left: 8px;
  }

  .ql-lineHeight .ql-picker-label {
    left: 50px;
    top: -25px;
  }

  .ql-lineHeight .ql-picker-options {
    left: 50px;
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value='1']::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value='1']::before {
    content: "1.0";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="1.1"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="1.1"]::before {
    content: "1.1";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="1.2"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="1.2"]::before {
    content: "1.2";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="1.3"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="1.3"]::before {
    content: "1.3";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="1.4"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="1.4"]::before {
    content: "1.4";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="1.5"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="1.5"]::before {
    content: "1.5";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="1.6"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="1.6"]::before {
    content: "1.6";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="1.7"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="1.7"]::before {
    content: "1.7";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="1.8"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="1.8"]::before {
    content: "1.8";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="1.9"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="1.9"]::before {
    content: "1.9";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2"]::before {
    content: "2.0";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2.1"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2.1"]::before {
    content: "2.1";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2.2"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2.2"]::before {
    content: "2.2";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2.3"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2.3"]::before {
    content: "2.3";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2.4"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2.4"]::before {
    content: "2.4";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2.5"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2.5"]::before {
    content: "2.5";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2.6"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2.6"]::before {
    content: "2.6";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2.7"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2.7"]::before {
    content: "2.7";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2.8"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2.8"]::before {
    content: "2.8";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="2.9"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="2.9"]::before {
    content: "2.9";
  }

  .ql-picker.ql-lineHeight .ql-picker-label[data-value="3"]::before,
  .ql-picker.ql-lineHeight .ql-picker-item[data-value="3"]::before {
    content: "3.0";
  }


  /*编辑器内容用*/

  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:" !important;
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存' !important;
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:" !important;
  }

  .ql-snow .ql-picker.ql-size {
    width: 70px !important;
  }

  .ql-snow .ql-picker.ql-header {
    width: 80px !important;
  }

  .ql-snow .ql-picker.ql-font {
    width: 90px !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='12px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before {
    content: '12px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='14px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='14px']::before {
    content: '14px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='16px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before {
    content: '16px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='18px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='18px']::before {
    content: '18px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
    content: '20px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='22px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='22px']::before {
    content: '22px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='24px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='24px']::before {
    content: '24px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='26px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='26px']::before {
    content: '26px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='32px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='32px']::before {
    content: '32px' !important;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='48px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='48px']::before {
    content: '48px' !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
    content: "宋体";
    font-family: "SimSun";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
    content: "黑体";
    font-family: "SimHei";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
    content: "微软雅黑";
    font-family: "Microsoft YaHei";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
    content: "楷体";
    font-family: "KaiTi";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
    content: "仿宋";
    font-family: "FangSong";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
    content: "Arial";
    font-family: "Arial";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
    content: "sans-serif";
    font-family: "sans-serif";
  }

  .ql-font-SimSun {
    font-family: "SimSun";
  }

  .ql-font-SimHei {
    font-family: "SimHei";
  }

  .ql-font-Microsoft-YaHei {
    font-family: "Microsoft YaHei";
  }

  .ql-font-KaiTi {
    font-family: "KaiTi";
  }

  .ql-font-FangSong {
    font-family: "FangSong";
  }

  .ql-font-Arial {
    font-family: "Arial";
  }

  .ql-font-Times-New-Roman {
    font-family: "Times New Roman";
  }

  .ql-font-sans-serif {
    font-family: "sans-serif";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5' !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6' !important;
  }
</style>


<!--<template>-->
<!--    <div>-->
<!--&lt;!&ndash;        <img src="../assets/images/dp.png"  style="object-fit: fill; height: calc(100vh - 64px);width:100%;"/>&ndash;&gt;-->

<!--      <myWangEditor v-model="detail" :isClear="isClear" @change="change"></myWangEditor>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--    import myWangEditor from "../components/wangEnduit/myWangEditor";-->
<!--    export default {-->
<!--        name: 'dashboard-console',-->
<!--        components: {myWangEditor},-->
<!--        data () {-->
<!--            return {-->
<!--                isClear: false,-->
<!--                detail:""-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            change(val) {-->
<!--            },-->
<!--        },-->
<!--        watch: {-->
<!--            // 监听路由变化-->
<!--            $route(to, from) {-->
<!--                window.location.reload();-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->
<!--<style lang="less">-->
<!--    .dashboard-console-visit{-->
<!--        .ivu-radio-group-button .ivu-radio-wrapper{-->
<!--            border: none !important;-->
<!--            box-shadow: none !important;-->
<!--            padding: 0 12px;-->
<!--        }-->
<!--        .ivu-radio-group-button .ivu-radio-wrapper:before, .ivu-radio-group-button .ivu-radio-wrapper:after{-->
<!--            display: none;-->
<!--        }-->
<!--    }-->
<!--</style>-->
