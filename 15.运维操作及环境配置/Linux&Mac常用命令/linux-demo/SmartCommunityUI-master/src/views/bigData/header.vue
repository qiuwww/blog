<template>
  <el-row class="headerBig">
    <div class="bigDataLogo logomargin" style="margin-top: -12px;"></div>

	<div class="time">
      <!-- <span class="mr10 time-content fs16">{{ date }} </span> -->
      <span class=" time-content">{{ time }}</span>
  </div>

	<h2 class="title logotitle">智慧治理网格平台</h2>

    <div class="tabs">
      <Tab @tabClick="handleTabClick" :tab="tab" />
    </div>

    <div class="return-btn-warp" @click="handleReturn">

    </div>
  </el-row>
</template>

<script>
import Tab from "./tab";
export default {
  components: {
    Tab
  },
  props: ["tab"],
  data() {
    return {
      time: "",
      date: "",
      week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      timerID: ""
    };
  },
  created() {
    this.timerId = setInterval(this.updateTime, 1000);
  },
  methods: {
    handleTabClick(tab) {
      this.$emit("tabClick", tab);
    },
    handleReturn() {
      this.$router.push({path: "/statisticsPage"});
    },
    updateTime() {
      var cd = new Date();
      this.time =
	  this.zeroPadding(cd.getFullYear(), 4) +
	  "-" +
	  this.zeroPadding(cd.getMonth() + 1, 2) +
	  "-" +
	  this.zeroPadding(cd.getDate(), 2)+ ":" +
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.week[cd.getDay()] +
        " " +
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " ";
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>
<style scoped>
.title {
  position: absolute;
  display: inline;

  font-weight: bold;
  color: white;
  margin-left: 15px;
}
</style>

<style lang="scss" scoped>
	.logotitle{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0px;
		left: 50%;
		margin-left: -300px;
	}
.title {
  width: 600px;
  font-size:44px;

  letter-spacing:8px;
  font-family: Adobe Heiti Std;
  font-weight: bold;
  color: #FFFFFF;
  background: linear-gradient(92deg, #0072FF 0%, #00EAFF 33.4716796875%, #95F4FC 49.853515625%, #00EAFF 65.1611328125%, #01AAFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}
.headerBig {
  width: 1920px;
  height:153px;
  /*background: pink;*/
  float: left;
  position: relative;
  top: 8px;
  z-index: 20;
  background-image: url('../../assets/background/shead.png');
  background-size: 100% 100%;
  // border-bottom: none;
  // margin-bottom: 20px;
  display: flex;
  padding-left: 20px;
  line-height: 76px;

  .tabs {
    width: 473px;
    height: 30px !important;
    position: absolute;
	top: 23px;
    right: 101px;
    display: flex;
    justify-content: space-between;

    .tabs-item {
      width: 131px;
      height: 30px !important;
      line-height: 42px;
      text-shadow: 0px 0px 10px #13c2ff;
      background-image: url("../../assets/background/dsj_btn_ms1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: #13c2ff;
      font-size: 16px;
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
    left:351px;
    top: 50%;
	margin-top: -9px;
	width: 300px;
    transform: translateY(-50%);
    .time-content {
		height: 14px;
		font-size: 18px;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #2AAEF2;
		line-height: 44px;
      text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
    }
  }

  .return-btn-warp {
    display: inline-block;
    position: absolute;
    cursor: pointer;
    top: 50%;
	margin-top: -23px;
	padding-left: 10px;
    transform: translateY(-50%);
    right: 50px;
    width: 30px;
    height: 30px;
    background-image: url('../../assets/background/off.png');
    background-size: 100% 100%;
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
::v-deep.tabItem{
	height: 32px !important;

}
</style>
