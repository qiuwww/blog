<template>
  <div v-if="modalShow">
    <div class="yge-modal-mask" />
    <transition name="el-zoom-in-center">
      <div :ref="uniqueId" class="yge-modal">
        <div class="yge-modal-con">
          <!-- <div class="yge-modal-head" v-drag="uniqueId"> -->
          <div class="yge-modal-head">
            <div class="title text-left">{{ title }}</div>
            <div class="close" @click="close"><i class="el-icon-close" /></div>
          </div>
          <div ref="ygemodalpage" class="yge-modal-page">
            <div>
              <slot />
            </div>
          </div>
          <div v-if="isShowConfirmBtn || isShowCloseBtn" class="yge-modal-btn-box">
            <el-button v-if="isShowConfirmBtn" type="primary" @click="confirmClick">{{ confirmBtnName }}</el-button>
            <el-button v-if="isShowCloseBtn" @click="close">{{ closeBtnName }}</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { uniqueId } from 'lodash'
export default {
  name: 'PartyModal',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    width: {
      type: String,
      default: '600px'
    },
    height: {
      type: String,
      default: '400px'
    },
    // 显示隐藏
    modalShow: {
      type: Boolean,
      default: true
    },
    isShowConfirmBtn: {
      type: Boolean,
      default: false
    },
    confirmBtnName: {
      type: String,
      default: '确认'
    },
    isShowCloseBtn: {
      type: Boolean,
      default: false
    },
    closeBtnName: {
      type: String,
      default: '关闭'
    },
    top: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // modalShow: true
      uniqueId: uniqueId('ygemodal')
    }
  },
  computed: {
    maxPageHeight() {
      return document.body.offsetHeight * 0.8
    }
  },
  watch: {
    modalShow: function(val) {
      const self = this
      if (val === true) {
        self.$nextTick(() => {
          if (self.top) {
            self.$refs[self.uniqueId].style.top = '8%'
            self.$refs[self.uniqueId].style.marginLeft = -self.$refs[self.uniqueId].offsetWidth / 2.0 + 'px'
          } else {
            self.$refs[self.uniqueId].style.marginTop = -self.$refs[self.uniqueId].offsetHeight / 2.0 + 'px'
            self.$refs[self.uniqueId].style.marginLeft = -self.$refs[self.uniqueId].offsetWidth / 2.0 + 'px'
          }
        })
      }
    }
  },
  methods: {
    close() {
      // this.modalShow = false
      this.$emit('close')
    },
    confirmClick() {
      this.$emit('confirmClick')
    },
    resize() {
      this.$refs[this.uniqueId].style.marginLeft = -this.$refs[this.uniqueId].offsetWidth / 2.0 + 'px'
      this.$refs[this.uniqueId].style.marginTop = -this.$refs[this.uniqueId].offsetHeight / 2.0 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.yge-modal-mask{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.6);
}
.yge-modal-mask::before {
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.yge-modal{
    position: fixed;
    z-index: 2001;
    left: 50%;
    top: 50%;
    // transform: translate(-50%, -50%);
    .yge-modal-head{
        position: relative;
        color: #555C66;
        padding: 14px 16px 14px 20px;
        .title{
          font-size: 14px;
          color: #A0A8B5;
          line-height: 1;
          font-family: regular, 'Microsoft YaHei';
        }
        .close{
            position: absolute;
            right: 16px;
            top: 11px;
            cursor: pointer;
            .el-icon-close{
                font-size: 18px;
            }
        }
    }
    .yge-modal-con{
        width: 100%;
        height: 100%;
        padding-right: 0;
        border-radius: 12px;
        box-sizing: border-box;
        background: #ffffff;
    }
    .el-scrollbar{
        height: calc(100% - 80px);
        /deep/ .el-scrollbar__wrap{
            overflow-x: hidden
        }
    }
    .yge-modal-page{
        /*padding: 20px 0 0 0;*/
      padding: 0;
        .padR20{
            padding-right: 20px;
        }
    }
    .yge-modal-btn-box{
        .el-button{
            width: 100px;
            height: 34px;
            &+.el-button{
                margin-left: 100px;
            }
        }
    }
}
  /deep/.el-dialog__headerbtn{
    top: 13px;
    right: 16px;
  }
  /deep/.el-dialog__header{
    padding: 16px !important;
  }
  /deep/.el-dialog__title{
    line-height: 1;
    font-size: 14px;
    color: #A0A8B5;
    font-family: regular, 'Microsoft YaHei';
  }
  /deep/.el-dialog__footer{
    border-radius: 0 0 12px 12px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 14px;
    padding-bottom: 14px;
  }
  /deep/.el-button + .el-button{
    margin-left: 20px;
  }
  /deep/.dialog-footer{
    justify-content: flex-end;
  }

/deep/.el-select .el-input .el-select__caret{
  transform: rotateZ(0deg);
}
/deep/.el-icon-arrow-up:before{
  content: "";
  box-sizing: inherit;
}
/deep/.el-select .el-input .el-select__caret.is-reverse{
  transform: rotateZ(180deg);
}
</style>
