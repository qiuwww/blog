<template>
  <Modal v-model="show" :width="modalWidth" transfer draggable @on-cancel="cancelModal" class="myModal">
    <p slot="header" style="color:#fff;text-align:center;line-height: 25px;">
      <span>{{modalTitle}}</span>
    </p>
    <slot></slot>

    <div class="ql-container ql-snow" v-if="modalHtmlStr">
      <div class="ql-editor" v-html="modalHtmlStr">
      </div>
    </div>

    <div slot="footer">

    </div>
  </Modal>
</template>
<script>
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            width:{
                type:Number,
                default: 520
            },
            title:{
                type:String
            },
            htmlStr:{
                type:String
            }
        },
        data() {
            return {
                show: false,
                modalWidth: this.width,
                modalTitle:'',
                modalHtmlStr:''
            }
        },
        methods: {
            cancelModal() {
                this.show = false;
                this.$emit('input', false);
            },
            initData(){
              this.modalTitle = "";
              this.modalHtmlStr = "";
            }
        },
        mounted(){
            // let element = document.querySelector(".ivu-modal-header");
            // let content = document.querySelector(".ivu-modal-content");
            // var disX = 0;
            // var disY = 0;
            // element.onmousedown = function (ev) {
            //     var oEvent = ev || event;
            //     disX = oEvent.clientX - content.offsetLeft;
            //     disY = oEvent.clientY - content.offsetTop;
            //     document.onmousemove = function (ev) {
            //         var oEvent = ev || event;
            //         var l = oEvent.clientX - disX;
            //         var t = oEvent.clientY - disY;
            //         //此处的判断是为了防止拖拽框被拖出屏幕可视区域
            //         if (l < 0) {
            //             l = 0;
            //         } else if (l > document.documentElement.clientWidth - content.offsetWidth) {
            //             l = document.documentElement.clientWidth - content.offsetWidth;
            //         }
            //         if (t < 80) {
            //             t = 80;
            //         } else if (t > document.documentElement.clientHeight - content.offsetHeight) {
            //             t = document.documentElement.clientHeight - content.offsetHeight;
            //         }
            //         content.style.left = l + 'px';
            //         content.style.top = t + 'px';
            //     };
            //     //此处是为了防止在火狐浏览器下拖拽时会出现的两次阴影的效果，此处代码可以禁用
            //     document.onmouseup = function () {
            //         document.onmousemove = null;
            //         document.onmouseup = null;
            //     }
            // }

        },
        watch : {
            value(val) {
                this.show = val;
            },
            show(val){
              this.initData();
              this.modalTitle = this.title;
              this.modalHtmlStr = this.htmlStr;
            },
            width(val){
                this.modalWidth = val;
            }
        }
    }
</script>
<style lang="less">
  .myModal {
    .ivu-modal-close i{
      color: #fff;
    }
    .ivu-modal-header {
      max-width: 400px;
      display: inline-block;
      position: relative;
      top: -15px;
      border: 2px solid #79Fac2;
      left: 50%;
      transform: translateX(-50%);
      padding: 5px 25px;
      border-radius: 20px;
      background-image:url("../../assets/images/head_bg.png");
      user-select: none;
    }
    .ivu-modal-content {
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.4);
      background-image: url("../../assets/images/top-left.png"), url("../../assets/images/top-right.png"),url("../../assets/images/bottom-right.png"),url("../../assets/images/bottom-left.png");
      background-size: 23px;
      background-repeat: no-repeat;
      background-position:0 0, top right ,bottom right,bottom left;
    }
    .ivu-modal-body {
      max-height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .ivu-modal-footer{
      padding: 12px 18px 12px 18px;
      border: none;
    }
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
</style>
