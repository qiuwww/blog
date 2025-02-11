<template>
  <div class="w100 h100 buled">
    <div class="w100 h100 bgStart" />

    <el-row class="h100 contentAll">
      <Title @return="handleReturn" @tabClick="handleTabs" />
      <el-row class="h100">
        <Base v-show="tab == 1" :tab="tab" />
<!--        <Monitor v-show="tab == 2" :tab="tab" />-->
<!--        <PartyBuilding v-show="tab == 3" :tab="tab" />-->
      </el-row>
    </el-row>
  </div>
</template>

<script>
import Title from "./header";
import Map from "./work";

import Base from "./base";
// import PartyBuilding from "./partyBuilding";
// 监控
// import Monitor from "./monitor";


export default {
  components: {
    Title,
    Base,
    Map
  },
  data() {
    return {
      tab: 1
    };
  },
  computed: {
    handleChecked() {
      return this.tab;
    }
  },
  mounted() {
    let el = document.documentElement;
    let rfs =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullScreen;

    if (rfs) {
      rfs.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
      // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
      const wscript = new ActiveXObject("WScript.Shell");
      if (wscript != null) {
        wscript.SendKeys("{F11}");
      }
    }
  },
  // async mounted() {},
  beforeDestroy() {
    const el = document;
    const cfs =
      el.cancelFullScreen ||
      el.webkitCancelFullScreen ||
      el.mozCancelFullScreen ||
      el.exitFullScreen;

    // typeof cfs != "undefined" && cfs
    if (cfs) {
      cfs.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
      // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
      const wscript = new ActiveXObject("WScript.Shell");
      if (wscript != null) {
        wscript.SendKeys("{F11}");
      }
    }
  },
  methods: {
    hand(a, b, c) {
      let baifenlv = ((a * 100) / (a + b + c)).toFixed(2);
      return baifenlv + "%";
    },

    handleTabs(tabs) {
      this.tab = tabs;
    },

    handleReturn() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotateZ(0deg); /*从0度开始*/
  }
  100% {
    transform: rotateZ(360deg); /*360度结束*/
  }
}

.bgStart {
  position: absolute;
  // height: 100%;
  // width: 56.25%;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%,-50%);
  margin: 0 auto;
  z-index: 1;
  animation: rotate 180s linear infinite;
  background: url(../../assets/background/start.png) no-repeat center;
}
.bggrid {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
}
.contentAll {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  // overflow-y:auto;
}
</style>
<style lang="scss" scoped>
.tableHeader {
  background-color: rgba(250, 250, 250, 0.1) !important;
  .cell {
    color: #71bdff;
  }
}
</style>
<style lang="scss" scoped>
html {
  overflow-y: hidden;
} // 隐藏竖滚动条
body {
  overflow-y: hidden;
} // 隐藏竖滚动条
// html {overflow-x: hidden;}   隐藏横滚动条
.rise {
  color: #ff3862;
}
.fall {
  color: #00dbc5;
}
.el-table {
  background: rgba(0, 0, 0, 0);
  border: none;
  color: white !important;
  &::before {
    display: none;
  }
  ::v-deep tbody tr:hover > td {
    background-color: rgba(250, 250, 250, 0.3) !important;
  }

  ::v-deep thead {
    text-align: center;
    color: #71bdff !important;
  }
  ::v-deep th.is-leaf {
    border-bottom: 1px solid #71bdff;
  }
  ::v-deep td {
    border-bottom: 1px solid rgba(112, 112, 112, 0.3);
  }
  ::v-deep th,
  ::v-deep tr {
    background-color: rgba(0, 0, 0, 0);
  }
  ::v-deep .el-table__header-wrapper {
    background: rgba(0, 0, 0, 0);
  }
  ::v-deep .el-table__body-wrapper {
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      width: 4px;
      background: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar-thumb {
      background: #7991b5;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    .el-table__body {
      width: calc(100% - 4px) !important;
      // .el-table__row {
      // .el-table_1_column_1 {
      //   background-color: rgba(250, 250, 250, 0.05) !important;
      // }
      // .el-table_1_column_2 {
      //   background-color: rgba(250, 250, 250, 0) !important;
      // }
      // .el-table_1_column_3 {
      //   background-color: rgba(250, 250, 250, 0.05) !important;
      // }
      // .el-table_1_column_4 {
      //   background-color: rgba(250, 250, 250, 0) !important;
      // }
      // .el-table_1_column_5 {
      //   background-color: rgba(250, 250, 250, 0.05) !important;
      // }
      // }
    }
  }
}

.background1 {
  background: #088ff8;
  box-shadow: 0 5px 10px 1px #088ff8;
}
.background2 {
  background: #ffcc00;
  box-shadow: 0 5px 10px 1px #ffcc00;
}
.background3 {
  background: #7991b5;
  box-shadow: 0 5px 10px 1px #7991b5;
}

.buled {
  overflow: hidden;
  background: url(../../assets/background/BG.png) no-repeat;
  // background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  min-height: 1080px;
  z-index: 1;
  // overflow-y:auto;
}

.header {
  width: 100%;
  height: 56px;
  /*background: pink;*/
  float: left;
  position: relative;
  border-bottom: none;
  margin-bottom: 20px;

  .title {
    font-size: 26px;
    font-weight: bold;
    color: white;
    margin-left: 15px;
  }

  .tabs {
    width: 473px;
    height: 52px;
    position: absolute;
    bottom: -26px;
    right: 400px;
    display: flex;
    justify-content: space-between;

    .tabs-item {
      width: 131px;
      height: 52px;
      line-height: 52px;
      text-shadow: 0px 0px 10px #13c2ff;
      background-image: url("../../assets/background/dsj_btn_ms1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: #13c2ff;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
    }

    .checked {
      color: #ffffff;
      font-weight: bold;
      background-image: url("../../assets/background/dsj_btn_rk2.png");
    }
  }

  .time {
    position: absolute;
    right: 150px;
    top: 50%;
    transform: translateY(-50%);
    .time-content {
      color: #daf6ff;
      text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
    }
  }

  .return-btn-warp {
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
    width: 40px;
    height: 40px;
    border: 3px solid rgba(113, 189, 255, 0.5);
    border-radius: 20px;
    box-shadow: 0px 0px 10px 5px rgba(113, 189, 255, 0.5);
    transition: all 0.3s;

    .return-btn {
      display: inline-block;
      color: #13c2ff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-shadow: 0px 0px 10px 3px rgba(113, 189, 255, 0.4);
    }

    &:hover {
      box-shadow: 0px 0px 6px 5px rgba(113, 189, 255, 0.8);
      .return-btn {
        text-shadow: 0px 0px 10px 3px rgba(113, 189, 255, 1);
      }
    }
  }
}

.img {
  background-image: url("../../assets/background/dsj@2x.png");
  background-repeat: repeat;
  background-size: 100% 100%;
}
.p3 {
  box-sizing: border-box;
  padding: 3px;
}
.charts {
  height: 80%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.person-attribute-warp {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: left;
  flex-direction: row;
  flex-wrap: wrap;
  .person-attribute {
    width: 33%;
    display: inline-block;
    .name {
      color: #71bdff;
    }
  }

  .right-border {
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 1px;
      height: 30%;
      position: absolute;
      right: 20px;
      top: 30%;
      background: #3083f2;
      transform: translateY(-50%);
    }
  }
}

.left {
  width: 434px;
  /*background: pink;*/
  .sex-ring {
    position: relative;
    height: 55%;
    margin-bottom: 15px;
  }

  .population-rose {
    position: relative;
    height: 40%;
    .left-top {
      height: 20%;
      padding-left: 20px;
      padding-right: 20px;
      & > .warp {
        display: flex;
        .everyOne {
          margin: 2px;
          min-width: 60px;
          overflow: hidden;
          .name {
            color: #71bdff;
          }
        }
      }
    }
    .left-bottom {
      height: 80%;
    }
  }
}
.center {
  text-align: center;
}
.middle {
  position: relative;
  width: 994px;
  height: 95%;
  margin: 0 10px;
  z-index: 10;
  .middle-top {
    width: 100%;
    height: 72%;
    box-sizing: border-box;
    padding-bottom: 10px;
    .sheshi {
      position: absolute;
      top: 0;
      width: 100%;
      height: 54px;
      display: flex;
      justify-content: space-around;
      .sheshi-everyOne {
        position: relative;
        width: 120px;
        height: 54px;
        .sheshi-content {
          opacity: 0.8;
          background: #080843;
          border: 1px solid #131d81;
          height: 48px;
          line-height: 48px;
          .sheshi-name {
            font-size: 13px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #71bdff;
            font-style: normal;
            text-align: center;
            display: inline-block;
            width: 50%;
          }
          .sheshi-number {
            font-size: 18px;
            font-family: Roboto, Roboto-Regular;
            font-weight: 400;
            text-align: right;
            color: #ffffff;
            font-style: normal;
            text-align: center;
            display: inline-block;
            width: 50%;
          }
        }
      }
    }
  }
  .middle-bottom {
    position: absolute;
    z-index: 5;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 28%;
    .middle-bottom-left {
      width: 70%;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100%;
      z-index: 4;
    }
    .middle-bottom-right {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 28%;
      height: 100%;
      // background: #ffcc00;
      z-index: 4;
      .volunteer {
        position: absolute;
        width: 80%;
        height: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .gridPerson {
          position: relative;
          width: 100%;
          height: 50%;
          background: url(./dk_rs.svg) no-repeat center;
          background-size: 100% 100%;
          .personNumber {
            display: inline-block;
            color: #ffffff;
            font-size: 16px;
            position: absolute;
            font-style: normal;
            width: 50%;
            text-align: center;
            top: 20%;
            left: 0;
          }
          .personUnit {
            display: inline-block;
            color: #ffffff;
            font-size: 16px;
            position: absolute;
            width: 50%;
            text-align: center;
            bottom: 25%;
            left: 0;
            font-style: normal;
          }
          .title {
            position: absolute;
            display: inline-block;
            color: #ffffff;
            font-size: 16px;
            font-style: normal;
            width: 40%;
            height: 100%;

            text-align: center;
            top: 50%;
            right: 10%;
            display: inline-block;
          }
        }
      }
    }
  }
}
.mid-bottom-left-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 60%;
}
.right {
  width: 434px;
  height: 100%;
  .population-attribute {
    position: relative;
    margin-bottom: 15px;
    height: 55%;
    .right-charts-title-top {
      height: 70%;
      width: 100%;
    }
    .right-charts-title-bottom {
      height: 30%;
      width: 100%;
      position: relative;

      .grid-task-warp {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 80%;
        width: 80%;
        .grid-task {
          width: 25%;
          box-sizing: border-box;
          padding-right: 10px;
          .name {
            color: #71bdff;
          }
          .taskNumber {
            border-radius: 5px;
            padding: 2px;
            text-align: center;
            border: #71bdff 1px solid;
          }
        }
      }
      &::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 80%;
        height: 0;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        border-top: #ccc 1px solid;
      }
    }
  }

  .volunteer-grid-person {
    position: relative;
    height: 40%;
    .right-charts-title-top {
      height: 60%;
      width: 100%;
    }
    .right-charts-title-bottom {
      height: 40%;
      width: 100%;
      position: relative;

      .grid-task-warp {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 80%;
        width: 80%;
        .grid-task {
          width: 25%;
          box-sizing: border-box;
          padding-right: 10px;
          .name {
            color: #71bdff;
          }
          .taskNumber {
            border-radius: 5px;
            padding: 2px;
            text-align: center;
            border: #71bdff 1px solid;
          }
        }
      }
      &::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 80%;
        height: 0;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        border-top: #ccc 1px solid;
      }
    }
  }
}

.left-charts-content-top {
  background: url("../../assets/background/sdj_dk.png") repeat;
  position: relative;
  width: 100%;
  height: 60%;
  border: #2535cb 1px solid;
  border-bottom: none;
  // box-shadow: 0 0 10px 2px rgba(37, 53, 203, 0.6);

  .charts-title {
    position: absolute;
    color: white;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    text-shadow: white 0 0 5px;
    top: -10px;
  }
}

.left-charts-content-bottom {
  background: url("../../assets/background/sdj_dk.png") repeat;
  position: relative;
  width: 100%;
  height: 40%;
  border: #2535cb 1px solid;
  border-top: none;
  // box-shadow: 0 0 10px 2px rgba(37, 53, 203, 0.6);

  .charts-title {
    position: absolute;
    color: white;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    text-shadow: white 0 0 5px;
    top: -10px;
  }
}

.charts-content {
  background: url("../../assets/background/sdj_dk.png") repeat;
  position: relative;
  width: 100%;
  height: 100%;
  border: #2535cb 1px solid;
  box-shadow: 0 0 10px 2px rgba(37, 53, 203, 0.6);

  .charts-title {
    position: absolute;
    color: white;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    text-shadow: white 0 0 5px;
    top: -10px;
  }
}
// individual icon msg sociology name number compareMsg compare percent
.mid-content-left {
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  .charts-title {
    position: absolute;
    color: white;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    text-shadow: white 0 0 5px;
    top: -10px;
  }
  .individual {
    position: absolute;
    top: 0;
    height: 50%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    border-bottom: #ccc 1px;
    .icon {
      position: relative;

      width: 30%;
      height: 100%;
      .icon-warp {
        background: rgba(8, 143, 248, 0.3);
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        border-radius: 15px;
        overflow: hidden;
        i {
          font-size: 30px;
        }
      }
    }
    .msg {
      position: relative;
      width: 70%;
      box-sizing: border-box;
      padding-right: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      i {
        font-style: normal;
        margin-left: 10px;
      }
      .sociology {
        overflow: hidden;
        .name {
          float: left;
          font-size: 16px;
          font-weight: bold;
          color: white;
        }
        .number {
          float: right;
          font-size: 14px;
          color: white;
        }
      }
      .compareMsg {
        overflow: hidden;
        .compare {
          float: left;
          font-size: 12px;
          font-weight: bold;
          color: #71bdff;
          .percent {
            float: right;
            font-size: 12px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .enterprise {
    position: absolute;
    top: 50%;
    height: 50%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    border-bottom: #ccc 1px;
    .icon {
      position: relative;

      width: 30%;
      height: 100%;
      .icon-warp {
        background: rgba(8, 143, 248, 0.3);
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        border-radius: 15px;
        overflow: hidden;
        i {
          font-size: 30px;
        }
      }
    }
    .msg {
      position: relative;
      width: 70%;
      box-sizing: border-box;
      padding-right: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      i {
        font-style: normal;
        margin-left: 10px;
      }
      .sociology {
        overflow: hidden;
        .name {
          float: left;
          font-size: 16px;
          font-weight: bold;
          color: white;
        }
        .number {
          float: right;
          font-size: 14px;
          color: white;
        }
      }
      .compareMsg {
        overflow: hidden;
        .compare {
          float: left;
          font-size: 12px;
          font-weight: bold;
          color: #71bdff;
          .percent {
            float: right;
            font-size: 12px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
.mid-content-right {
  position: absolute;
  width: 50%;
  height: 100%;
  right: 0;
  .charts-title {
    position: absolute;
    color: white;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    text-shadow: white 0 0 5px;
    top: -10px;
    left: 5px;
  }
  .store {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    // background: pink;
  }
}

.top-left-title {
  position: absolute;
  top: -8px;
  left: 0;
  width: 5%;
  height: 20px;
  border-left: 2px #3083f2 solid;
}
.top-mid-title {
  position: absolute;
  z-index: 5;
  top: -8px;
  left: 0;
  width: 5%;
  height: 20px;
  border-left: 2px #3083f2 solid;
}

.mid-left-title {
  position: absolute;
  top: 60%;
  left: 0;
  width: 5%;
  height: 20px;
  transform: translateY(-50%);
  border-left: 2px #3083f2 solid;
}
.mid-mid-title {
  position: absolute;
  top: 0%;
  left: 50%;
  width: 5%;
  height: 20px;
  transform: translateY(-50%);
  border-left: 2px #3083f2 solid;
}
.top-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  border-top: 1px #3083f2 solid;
  border-left: 1px #3083f2 solid;
}

.top-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 5px;
  border-top: 1px #3083f2 solid;
  border-right: 1px #3083f2 solid;
}

.bottom-left {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 5px;
  height: 5px;
  border-bottom: 1px #3083f2 solid;
  border-left: 1px #3083f2 solid;
}

.bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 5px;
  height: 5px;
  border-bottom: 1px #3083f2 solid;
  border-right: 1px #3083f2 solid;
}
</style>
<style scoped>
.tabs-content {
  box-sizing: border-box;
  padding-left: 10px;
  display: flex;
  justify-content: space-around;
  height: calc(100% - 56px);
  /* min-height: 1024px; */
  position: relative;
  z-index: 15;
}
</style>
