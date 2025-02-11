<template>
  <div class="development">
    <div class="development-left">
      <div class="titleName" icon="icon-title-TE3">
        <p class="name gradient-blue">{{data.left1.name}}</p>
        <p class="en"><span>{{data.left1.englishname}}</span><span></span></p>
      </div>
      <div class="dverview">
        <h2>
          <font v-for="(item,i) in data.left1.label" :style="{color:item.color,fontWeight:item.fontWeight}" :key="i" >{{item.text}}</font>
          <!-- 以<b class="fontBlue"
            >中药、生态、文化、教育、气养、观养、动养、食养、居养、旅居</b
          >等为特色的生态田园·天河颐养公社、
          中医药国学产学研教育示范基地、共享农庄集聚型生态田园养生村示范。 -->
        </h2>
      </div>
      <div class="titleName" icon="icon-title-TE3" style="margin-top: 20px">
        <p class="name gradient-blue">{{data.left2.name}}</p>
        <p class="en"><span>{{data.left2.englishname}}</span><span></span></p>
      </div>
      <div class="dverview">
        <h2>
          <font v-for="(item,i) in data.left2.label" :style="{color:item.color,fontWeight:item.fontWeight}" :key="'a'+i" >{{item.text}}</font>
          <!-- 以<b class="fontBlue">有机农业生产为基础，中药材种植</b
          >为特色，<b class="fontBlue">康养休闲度假</b>为引领的多元产业体系。 -->
        </h2>
      </div>
      <div class="titleName" style="margin-top: 20px">
        <p class="name gradient-blue">{{data.left3.name}}</p>
        <p class="en">
          <span>{{data.left3.englishname}}</span>
          <span></span>
        </p>
      </div>

      <div class="areaGeneral m-t-15">
        <div>
          <i-circle
            :percent="100"
            stroke-linecap="square"
            stroke-color="#43a3fb"
            style="width: 90%; height: 100%"
          >
            <p><span>{{data.left3.circle1.count}}</span><i>{{data.left3.circle1.unit}}</i></p>
          </i-circle>
          <h1>{{data.left3.circle1.name}}</h1>
        </div>
        <div>
          <i-circle
            :percent="100"
            stroke-linecap="square"
            stroke-color="#43a3fb"
            style="width: 90%; height: 100%"
          >
            <p><span>{{data.left3.circle2.count}}</span><i>{{data.left3.circle2.unit}}</i></p>
          </i-circle>
          <h1>{{data.left3.circle2.name}}</h1>
        </div>
        <div>
          <i-circle
            :percent="100"
            stroke-linecap="square"
            stroke-color="#43a3fb"
            style="width: 90%; height: 100%"
          >
            <p><span>{{data.left3.circle3.count}}</span><i>{{data.left3.circle2.unit}}</i></p>
          </i-circle>
          <h1>{{data.left3.circle2.name}}</h1>
        </div>
      </div>
      <div class="titleName" icon="icon-title-TE3" style="margin-top: 20px">
        <p class="name gradient-blue">{{data.left4.name}}</p>
        <p class="en"><span>{{data.left4.englishname}}</span><span></span></p>
      </div>
      <div class="tee-left2">
        <div ref="visitChart" style="height: 27vh; width: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      //data:null,
      visitChart: {},
      option: {
        legend: {
          textStyle: {
            color: "#ffffff",
          },
          right: 0,
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {},
        dataset: {
          source: []
        },
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontWeight: 400,
              fontSize: this.fontSize(0.14),
            },
            interval: 0,
            rotate: 45,
          },
          axisLine: {
            lineStyle: {
              color: "#535859",
            },
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: "#ffffff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#535859",
            },
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          { type: "bar", barWidth: 20, barGap: 0 },
          { type: "bar", barWidth: 20, barGap: 0 },
        ],
        color: ["rgba(24, 141, 240,1)", "rgba(46, 218, 255,1)"],
      },
    };
  },
  props: {
    data:{
        type: Object,
        default:function(){
          return {};
        }
    }
  },
  created(){
      // this.data = this.$parent.dataarr.xcgh;//require('./乡村规划.json');// 
  },
  watch:{
      data(val){
          this.setecharts();
      }
  },
  mounted() {
      this.setecharts();
  },
  methods: {
    setecharts(){
          this.option.dataset.source=this.data.left4.echarts.source
          this.visitChart = echarts.init(this.$refs.visitChart);
          this.visitChart.setOption(this.option);
          window.onresize = () => {
            return (() => {
                this.visitChart.resize();
            })();
          };
    },
    fontSize:function(res) {
      let docEl = document.documentElement,
        clientWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
  },
};
</script>
<style lang="less" scoped>
.dverview {
  padding-top: 10px;
  /*width: 100%;*/
  h2 {
    text-shadow: rgba(0, 0, 0, 0.8) 1px 5px 5px;
    font-size: 0.9vw;
    line-height: 2.6vh;
    color: #fff;
    text-align: justify;
    font-family: Adobe 黑体 Std R;
    text-indent: 1.8vw;
  }
  .fontBlue {
    color: #00afff;
    font-weight: 900;
  }
}
.development-left {
  width: 85%;
  overflow: hidden;
  font-family: Adobe 黑体 Std R;
}
.development {
  left: 0;
  padding: 25px 25px 0 10px;
  background-size: 150% auto;
  margin-top: 4vh;
  position: absolute;
  top: 0px;
  bottom: 0;
  background: url("../../../assets/layerManagement/left-shadow.png") repeat-y;
  background-size: 100%;
  width: 25%;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: Adobe 黑体 Std R;
  //滚动条样式
  &::-webkit-scrollbar {
    width: 0;
  }
}
&::-webkit-scrollbar {
  width: 0;
}
.development-img {
  position: absolute;
  z-index: 1;
  color: rgb(24 141 240);
  -webkit-transform: translate(17%, -44%);
  transform: translate(57%, -114%);
}

.gradient-blue {
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#02e4ff),
    to(#035cff)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.titleName .name {
  display: inline-block;
  font-size: 1.3vw;
  font-family: Adobe 黑体 Std R;
  font-weight: 700;
}

.titleName .en span {
  font-weight: lighter;
  letter-spacing: -0.5px;
  white-space: nowrap;
  font-size: 0.6vw;
  font-family: Adobe 黑体 Std R;
  zoom: 1;
}

.titleName .en {
  color: #919293;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-family: Adobe 黑体 Std R;
}

.titleName .en span:last-child {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background: url("../../../assets/layerManagement/title.png") 50% repeat-x;
  height: 8px;
  margin-left: 5px;
}

.titleName {
  padding-left: 0;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background: url("../../../assets/layerManagement/last.png") no-repeat 0 100%;
  background-size: 100%;
}

.m-t-15[data-v-70c05f86] {
  margin-top: 1vh;
}

.areaGeneral > div {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  color: #fff;
}

.areaGeneral,
.areaGeneral > div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 1vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.areaGeneral > div p {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.areaGeneral > div p span[data-v-70c05f86] {
  font-size: 1.3vw;
}

.areaGeneral > div p span {
  font-size: 0.9vw;
  font-family: Adobe 黑体 Std R;
  line-height: 2vh;
  display: inline-block;
  height: 2vh;
}

.areaGeneral > div p i {
  font-style: normal;
  font-weight: 400;
  font-size: 0.9vw;
}

.areaGeneral > div h1 {
  font-size: 0.9vw;
  font-weight: 400;
  line-height: 2vh;
  white-space: nowrap;
  font-family: Adobe 黑体 Std R;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
