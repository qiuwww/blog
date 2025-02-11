<template>
  <div class="naranja-notification-box">
    <!-- <div v-for="(item,i) in arr" :key="i" class="naranja-notification naranja-log" style="height: 145px">
      <div class="naranja-body-notification narj-log">
        <div class="naranja-icon narj-icon-log">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="24" fill="#EEEEEE"></circle>
            <path
              d="M26.595 37.5C26.3313 37.9546 25.9528 38.332 25.4973 38.5943C25.0419 38.8566 24.5256 38.9947 24 38.9947C23.4744 38.9947 22.9581 38.8566 22.5027 38.5943C22.0472 38.332 21.6687 37.9546 21.405 37.5M39 31.5H9C10.1935 31.5 11.3381 31.0259 12.182 30.182C13.0259 29.3381 13.5 28.1935 13.5 27V19.5C13.5 16.7152 14.6062 14.0445 16.5754 12.0754C18.5445 10.1062 21.2152 9 24 9C26.7848 9 29.4555 10.1062 31.4246 12.0754C33.3938 14.0445 34.5 16.7152 34.5 19.5V27C34.5 28.1935 34.9741 29.3381 35.818 30.182C36.6619 31.0259 37.8065 31.5 39 31.5V31.5Z"
              stroke="black"
              stroke-opacity="0.73"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div class="naranja-text-and-title">
          <p class="naranja-title">{{item.title}}</p>
          <p class="naranja-parragraph">{{item.txt}}</p>
          <div class="naranja-buttons-container">
            <button @click="locate(item)">定位</button>
          </div>
        </div>
        <div class="naranja-close-icon" @click="close(i)">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.70711 1.7071C10.0976 1.31659 10.0976 0.683407 9.70711 0.292889C9.31659 -0.0976295 8.68341 -0.0976295 8.29289 0.292889L5 3.58578L1.70711 0.292889C1.31659 -0.0976295 0.68342 -0.0976295 0.292894 0.292889C-0.0976315 0.683407 -0.0976315 1.31659 0.292894 1.7071L3.58579 5L0.292894 8.29289C-0.0976315 8.68341 -0.0976315 9.31659 0.292894 9.7071C0.68342 10.0976 1.31659 10.0976 1.70711 9.7071L5 6.41421L8.29289 9.7071C8.68341 10.0976 9.31659 10.0976 9.70711 9.7071C10.0976 9.31659 10.0976 8.68341 9.70711 8.29289L6.41422 5L9.70711 1.7071Z"
              fill="black"
              fill-opacity="0.37"
            ></path>
          </svg>
        </div>
      </div>
    </div>   -->
    <div v-for="(item,i) in arr" :key="i" style="width:335px;right: 0px; z-index: 1138;"><div class="ivu-notice-notice ivu-notice-notice-closable ivu-notice-notice-with-desc"><div class="ivu-notice-notice-content ivu-notice-notice-content-with-render">
        <div class="ivu-notice-custom-content ivu-notice-with-icon ivu-notice-with-info  ivu-notice-with-desc">
            <span class="ivu-notice-icon-info" style="top: 50%;position: absolute;">
                <!-- <i  class="ivu-icon ivu-icon-ios-information-circle-outline"></i> -->
                <img src="/img/archives/jingji.png">
            </span>
            <div class="ivu-notice-title">{{item.title}}</div>
            <div class="ivu-notice-desc"></div>
        </div>
    </div> <div class="ivu-notice-content-with-icon"><div><span style="display: block; max-height: 28px;">{{item.txt}}</span><button type="button" @click="locate(item)" class="ivu-btn ivu-btn-primary ivu-btn-small" style="float: right;"><!----> <!----> <span>定位</span></button></div></div> <a class="ivu-notice-notice-close">
      <i @click="close(i)" class="ivu-icon ivu-icon-ios-close">
      </i></a> <!----></div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        //事件弹窗集合
        arr:[]
    }
  },
  props:{
  	events:{
  		type:Object,
  		default:{}
  	}
  },
  methods:{
    //定位
    locate(val){
        this.$parent.locate(val);
    },
    //关闭提示框
    close(val){      
        this.arr.splice(val,1)
    }
  },
  watch:{
      //监控新弹窗
      events(val){
          this.arr.unshift(val);
      }
  }
};
</script>
<style lang="less">
@log: #f9f9f9;
@logButtonBorder: #d2d2d2;
@logShadow: #000;

@success: #b8f4bc;
@successButtonColor: #11b674;
@successButtonBorder: #6ed69a;

@warn: #ffdd85;
@warnButtonColor: #d9993f;
@warnButtonBorder: #f5ce69;

@error: #ed9286;
@errorButtonColor: #c24343;
@errorButtonBorder: #ed8476;

.naranja-notification {
  height: 0px;
  box-sizing: content-box;
  padding: 10px 0;
  transition: padding 0.7s cubic-bezier(0, 0.5, 0, 1),
    height 0.7s cubic-bezier(0, 0.5, 0, 1);
  * {
    box-sizing: border-box;
  }
  .narj {
    &-log {
      background-color: @log;
      button {
        border: 1px solid @logButtonBorder;
        background-color: white;
        &:first-of-type {
          color: #0099e5;
        }
      }
    }
    &-success {
      background-color: @success;
      button {
        border: 1px solid @successButtonBorder;
        background-color: @success;
        opacity: 0.9;
        color: @successButtonColor;
        &:first-of-type {
          opacity: 1;
        }
      }
    }
    &-warn {
      background-color: @warn;
      button {
        border: 1px solid @warnButtonBorder;
        background-color: @warn;
        opacity: 0.9;
        color: @warnButtonColor;
        &:first-of-type {
          opacity: 1;
        }
      }
    }
    &-error {
      background-color: @error;
      button {
        border: 1px solid @errorButtonBorder;
        background-color: @error;
        opacity: 0.9;
        color: @errorButtonColor;
        &:first-of-type {
          opacity: 1;
        }
      }
    }
  }

  .naranja-body-notification {
    animation: 0.4s fadeUpIn 1 cubic-bezier(0, 0.5, 0, 1);
    position: relative;
    display: flex;
    width: 310px;
    border-radius: 4px;
    padding: 7px;
    box-shadow: 0 5px 10px fade(@logShadow, 16%);
    margin-bottom: 7px;
    margin-top: 12px;
    opacity: 1;
    transition: opacity 0.15s ease, marginTop 0.3s ease, marginBottom 0.3s ease,
      padding 0.3s ease;
    &:hover {
      .naranja-close-icon {
        opacity: 0.7;
        &:hover {
          opacity: 1;
        }
      }
    }
    > div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    .naranja-text-and-title {
      padding-left: 15px;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      > p {
        margin: 5px;
        font-family: "Open Sans";
      }
      > div {
        width: 100%;
        button {
          float: right;
          margin-left: 6px;
          margin-top: 10px;
          margin-bottom: 2px;
          -webkit-appearance: none;
          -moz-appearance: none;
          -ms-appearance: none;
          -o-appearance: none;

          border-radius: 3px;
          padding: 2px 11px;
          font-size: 14px;
          text-align: center;
          outline: none;
          border-width: 1px;
          box-shadow: 0 2px 4px -2px fade(black, 20%);
          cursor: pointer;
          &:active {
            opacity: 0.7;
          }
        }
      }
    }
    .naranja-title {
      font-size: 20px;
      opacity: 1;
    }
    .naranja-parragraph {
      font-size: 14px;
      opacity: 0.6;
      padding-right: 30px;
      line-height: 1.4em;
    }
  }
}

.naranja-close-icon {
  position: absolute;
  right: 7px;
  top: 7px;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.25s ease;
}

@keyframes fadeUpIn {
  from {
    opacity: 0.2;
    box-shadow: 0 0px 0px fade(@logShadow, 50%);
    transform: scale(0.95);
  }
  75% {
    opacity: 1;
  }
  to {
    opacity: 1;
    box-shadow: 0 5px 10px fade(@logShadow, 16%);
    transform: scale(1);
  }
}

.naranja-notification-box:hover {
  overflow-y: scroll;
}
.naranja-notification-box:hover::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.naranja-notification-box:-webkit-scrollbar {
  display: none;
}

.naranja-notification-box:hover::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #aaa;
}

.naranja-notification-box:hover::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #ededed;
  display: none;
}
.naranja-notification-box {
  box-sizing: content-box;
  display: flex;
  overflow: hidden;
  flex-direction: column-reverse;
  position: fixed;
  bottom: 88px;
  right: 0;
  width: 320px;
  height: 302px;
  padding: 8px;
  z-index: 11;
  padding-top: 20px;
  .naranja-notification-advice {
    position: fixed;
    right: 138px;
    top: -39px;
    transform: translateY(0px);
    cursor: pointer;
    transition: transform 0.3s ease;
    &.active {
      transform: translateY(60px);
    }
  }
}
</style>