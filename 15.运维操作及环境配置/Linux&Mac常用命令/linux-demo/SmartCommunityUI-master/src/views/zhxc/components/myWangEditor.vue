<template>
  <div class="myWangEditor" v-loading="quillUpdateImg" element-loading-text="请稍等，图片上传中">
    <div id="demo1" style="height: calc(100% - 75px);"></div>
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
    // 引入 wangEditor
    import wangEditor from 'wangeditor'
    import {uploadImages} from '@/api/zhxc/basicMenuInformation/basicMenuInformation'
    import {nginxUrl} from '@/api/tools/tool'
    // 获取必要的变量，这些在下文中都会用到
    const {$} = wangEditor;
    const {BtnMenu} = wangEditor;

    // 第一，菜单 class ，Button 菜单继承 BtnMenu class
    class AlertMenu extends BtnMenu {
        constructor(editor) {
            const $elem = wangEditor.$(
                `<div class="w-e-menu">
                <button id="editHtml" class="w-e-icon-html">HTML</button>
            </div>`
            )
            super($elem, editor)
        }

        // 菜单是否被激活（如果不需要，这个函数可以空着）
        // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
        // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
        tryChangeActive() {
            // 激活菜单
            // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
            // 2. this.this.isActive === true
            this.active()
            // // 取消激活菜单
            // // 1. 菜单 DOM 节点会删掉 .w-e-active
            // // 2. this.this.isActive === false
            // this.unActive()
        }
    };

    //菜单移入显示提示
    const titleConfig = [
        {
            Choice: '.w-e-icon-html',
            title: '编辑HTML'
        },
        {
            Choice: '.w-e-icon-header',
            title: '标题'
        },
        {
            Choice: '.w-e-icon-bold',
            title: '加粗'
        },
        {
            Choice: '.w-e-icon-italic',
            title: '斜体'
        },
        {
            Choice: '.w-e-icon-underline',
            title: '下划线'
        },
        {
            Choice: '.w-e-icon-strikethrough',
            title: '删除线'
        },
        {
            Choice: '.w-e-icon-link',
            title: '超链接'
        },
        {
            Choice: '.w-e-icon-happy',
            title: '表情'
        },
        {
            Choice: '.w-e-icon-image',
            title: '插入图片'
        },
        {
            Choice: '.w-e-icon-table2',
            title: '插入表格'
        },
        {
            Choice: '.w-e-icon-split-line',
            title: '水平分隔线'
        },
        {
            Choice: '.w-e-icon-fullscreen',
            title: '全屏'
        }
    ];

    export default {
        props: {
            editorContent: {
                type: String,
                default: ""
            },
        },
        data() {
            return {
                editor: null,
                editorData: '',
                showHTMLModal: false,
                quillUpdateImg: false,
                dataEdit: ''
            }
        },
        mounted() {
            let _this = this;
            const editor = new wangEditor(`#demo1`);
            editor.config.menus = [
                'head',
                'bold',
                'fontSize',
                'fontName',
                'italic',
                'underline',
                'strikeThrough',
                'indent',
                'lineHeight',
                'foreColor',
                'backColor',
                'link',
                'list',
                'justify',
                'emoticon',
                'image',
                'table',
                'splitLine'
            ];

            editor.config.fontSizes = {
                'x-small': { name: '10px', value: '1' },
                'small': { name: '14px', value: '2' },
                'normal': { name: '16px', value: '3' },
                'large': { name: '18px', value: '4' },
                'x-large': { name: '24px', value: '5' },
                'xx-large': { name: '32px', value: '6' },
                'xxx-large': { name: '48px', value: '7' },
            };

            // 配置行高
            editor.config.lineHeights = ['1', '1.15', '1.6','1.8', '2', '2.5', '3']

            // 配置颜色（文字颜色、背景色）
            editor.config.colors = ['#000000',
                '#0000FF',
                '#0033CC',
                '#0033FF',
                '#0066CC',
                '#0066FF',
                '#0099FF',
                '#00CC00',
                '#00FF00',
                '#00FF66',
                '#00FF99',
                '#00FFCC',
                '#00FFFF',
                '#3300FF',
                '#3333CC',
                '#3333FF',
                '#339900',
                '#339933',
                '#3399CC',
                '#3399FF',
                '#33CC00',
                '#33CC33',
                '#33CC66',
                '#33CC99',
                '#33CCCC',
                '#33CCFF',
                '#33FF00',
                '#33FF33',
                '#33FF66',
                '#33FF99',
                '#33FFCC',
                '#33FFFF',
                '#66FF00',
                '#66FF33',
                '#66FF66',
                '#66FF99',
                '#66FFCC',
                '#66FFFF',
                '#9933CC',
                '#CC0000',
                '#CC0033',
                '#CC0066',
                '#CC0099',
                '#CC00CC',
                '#CC00FF',
                '#CC3300',
                '#CC3333',
                '#CC3366',
                '#CC3399',
                '#CC33CC',
                '#CC33FF',
                '#CC6600',
                '#CC6633',
                '#CC6666',
                '#CC6699',
                '#CC66CC',
                '#CC66FF',
                '#CC9900',
                '#CC9933',
                '#CC9966',
                '#CC9999',
                '#CC99CC',
                '#CC99FF',
                '#CCCCFF',
                '#CCFF00',
                '#CCFF33',
                '#CCFF66',
                '#FF0000',
                '#FF0033',
                '#FF0066',
                '#FF0099',
                '#FF00CC',
                '#FF00FF',
                '#FF3300',
                '#FF3333',
                '#FF3366',
                '#FF3399',
                '#FF33CC',
                '#FF33FF',
                '#FF6600',
                '#FF6633',
                '#FF6666',
                '#FF6699',
                '#FF66CC',
                '#FF66FF',
                '#FF9900',
                '#FF9933',
                '#FF9966',
                '#FF9999',
                '#FFFFFF'];
            // 配置 onchange 回调函数，将数据同步到 vue 中
            // editor.config.onchange = (newHtml) => {
            //     this.editorData = newHtml
            // };
            //选择图片后的回调事件
            editor.config.customUploadImg = function (resultFiles, insertImgFn) {
                if (resultFiles) {
                    _this.quillUpdateImg = true;
                    var reader = new FileReader();
                    reader.readAsDataURL(resultFiles[0]);
                    reader.onload = () => {
                        uploadImages({imgUrl: reader.result}).then(res => {
                            insertImgFn(nginxUrl + res.data);
                        }).finally(res => {
                            _this.quillUpdateImg = false;
                        });
                    };
                }
            };

            // 注册菜单
            const menuKey = 'alertMenuKey'; // 菜单 key ，各个菜单不能重复
            editor.menus.extend('alertMenuKey', AlertMenu);
            // 将菜单加入到 editor.config.menus 中
            // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
            var newArr = [menuKey];
            editor.config.menus = newArr.concat(editor.config.menus);
            // 创建编辑器
            editor.create();
            this.editor = editor;
            autotip: {
                document.getElementById('demo1').dataset.placeholder = '';
                for (let item of titleConfig) {
                    let tip = document.querySelector(item.Choice);
                    if (!tip) continue;
                    tip.setAttribute('title', item.title);
                }
            }
            //编辑html按钮点击事件
            document.getElementById('editHtml').addEventListener("click", function (e) {
                _this.dataEdit = _this.getEditorData();
                _this.showHTMLModal = true;
            });
        },
        methods: {
            getEditorData() {
                // 通过代码获取编辑器内容
                let data = this.editor.txt.html();
                return data;
            },
            editHTMLOk() {
                this.showHTMLModal = false;
                this.editor.txt.html(this.dataEdit);
            }
        },
        beforeDestroy() {
            // 调用销毁 API 对当前编辑器实例进行销毁
            this.editor.destroy();
            this.editor = null;
        },
        watch: {
            editorContent: {
                handler(val, oldVal) {
                    this.editorData = val;
                    this.editor.txt.html(val);
                },
                deep: true
            },
        }
    }
</script>

<style lang="scss">
  .myWangEditor {
    height: 100%;
    width: 90%;
    margin: 0px auto;

    .w-e-text-container{
      height: 100% !important;
    }

    .w-e-toolbar .w-e-droplist ul.w-e-block {
      height: 400px !important;
      list-style: none;
      text-align: left;
      padding: 5px;
      overflow-y: auto;
    }

    font[size="2"] {
      font-size: 14px;
    }
  }
</style>
