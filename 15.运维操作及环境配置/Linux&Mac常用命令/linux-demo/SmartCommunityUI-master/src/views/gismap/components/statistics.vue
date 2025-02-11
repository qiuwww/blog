<template>
  <div id="Statistics" class="Statistics-body" :style="{top:marginTop +'px'}">
    <div>
      <transition name="plus-icon">
        <Row class="card-static">
          <div class="title-class">辖区概况</div>
          <Col span="6">
            <i-circle
              :percent="100"
              :size="60"
              :trail-width="1"
              stroke-color="#9b9b98"
              style="transform: translateX(-50%);left: 50%;"
            >
              <span class="demo-Circle-inner">
                <i-circle
                  :percent="100"
                  :size="45"
                  :trail-width="8"
                  :stroke-width="60"
                  stroke-color="#00a8f3"
                  style="transform: translateY(2%);"
                >
                  <span class="demo-Circle-inner" style="color:white">{{cirrclenumb1}}</span>
                </i-circle>
              </span>
            </i-circle>
            <p class="text-tile">党员</p>
          </Col>
          <Col span="6">
            <i-circle
              :percent="100"
              :size="60"
              :trail-width="1"
              stroke-color="#9b9b98"
              style="transform: translateX(-50%);left: 50%;"
            >
              <span class="demo-Circle-inner" style>
                <i-circle
                  :percent="100"
                  :size="45"
                  :trail-width="8"
                  :stroke-width="60"
                  stroke-color="#ff6800"
                  style="transform: translateY(2%);"
                >
                  <span class="demo-Circle-inner" style="color:white">{{cirrclenumb2}}</span>
                </i-circle>
              </span>
            </i-circle>
            <p class="text-tile">干部</p>
          </Col>
          <Col span="6">
            <i-circle
              :percent="100"
              :size="60"
              :trail-width="1"
              stroke-color="#9b9b98"
              style="transform: translateX(-50%);left: 50%;"
            >
              <span class="demo-Circle-inner" style>
                <i-circle
                  :percent="100"
                  :size="45"
                  :trail-width="8"
                  :stroke-width="60"
                  stroke-color="#0ed145"
                  style="transform: translateY(2%);"
                >
                  <span class="demo-Circle-inner" style="color:white">{{cirrclenumb3}}</span>
                </i-circle>
              </span>
            </i-circle>
            <p class="text-tile">网格员</p>
          </Col>
          <Col span="6">
            <i-circle
              :percent="100"
              :size="60"
              :trail-width="1"
              stroke-color="#9b9b98"
              style="transform: translateX(-50%);left: 50%;"
            >
              <span class="demo-Circle-inner" style>
                <i-circle
                  :percent="100"
                  :size="45"
                  :trail-width="8"
                  :stroke-width="60"
                  stroke-color="#ff7f27"
                  style="transform: translateY(2%);"
                >
                  <span class="demo-Circle-inner" style="color:white">{{cirrclenumb4}}</span>
                </i-circle>
              </span>
            </i-circle>
            <p class="text-tile">志愿者</p>
          </Col>
        </Row>
      </transition>
      <!-- 间隔 -->
      <div style="height:5px;width:100%"></div>
      <!-- 人口统计 -->
      <transition name="plus-icon">
        <Row v-if="renkoutongji" class="card-static">
          <div class="title-class">人口总数</div>
          <Card
            :shadow="true"
            :padding="0"
            style="left: 20px;width: 92%;background-color: rgba(0, 0, 0, 0);"
          >
            <Progress :percent="percent1" :hide-info="true" />
            <p>常住人口: {{Resident_population}}人</p>
            <Progress :percent="percent2" :hide-info="true" />
            <p>流动人口: {{floating_population}}人</p>
          </Card>
        </Row>
      </transition>
      <!-- 间隔 -->
      <div style="height:5px;width:100%"></div>
      <!-- 柱状图 -->
      <transition name="plus-icon">
        <!-- v-show="shequshixiang" -->
        <Row class="card-static" v-show="shequshixiang">
          <div class="title-class">社区事项</div>
          <div ref="visitChart2" style="height: 250px;width:420px;"></div>
        </Row>
      </transition>
      <!-- 间隔 -->
      <div style="height:5px;width:100%"></div>
      <transition name="plus-icon">
        <Row class="card-static">
          <div class="title-class">突发事件</div>
          <div ref="visitChart" style="height: 200px;width: 420px;"></div>
        </Row>
      </transition>
      <!-- 间隔 -->
      <div style="height:5px;width:100%"></div>
      <transition name="plus-icon">
        <Row class="card-static" v-show="jianzhuleixing">
          <div class="title-class">建筑类型</div>
          <Col span="12">
            <div ref="visitChart3" style="height: 180px;width: 210px;"></div>
          </Col>
          <Col span="12">
            <div ref="visitChart4" style="height: 180px;width: 210px"></div>
          </Col>
        </Row>
      </transition>
      <!-- 间隔 -->
      <div style="height:5px;width:100%"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { statisticsGridPerson2 } from "@/api/zhsq/basicPerson/basicPerson";
import { formartDate } from "@/api/tools/tool";
export default {
  props: {
    echarscolor: {
      type: String,
      default: "#ffffff",
    },
    marginTop: {
      type: Number,
      default: 70,
    },
    echarschart: {
      type: Array,
      default: ["人口", 55],
    },
  },
  data() {
    return {
      visitChart: {},
      visitChart2: {},
      visitChart3: {},
      visitChart4: {},
      cirrclenumb1: '', //党员
      cirrclenumb2: '',
      cirrclenumb3: '',
      cirrclenumb4: '',
      renkoutongji: true,
      shequshixiang: true,
      jianzhuleixing:false,
      Resident_population: 700,
      floating_population: 300,
      percent1: 0,
      percent2: 0,
      //柱状
      optionColumnar: {
        grid: {
          left: "3%",
          right: "4%",
          top: 25,
          bottom: 0,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "30%"],
        },
        textStyle: {
          color: this.echarscolor,
        },
        visualMap: {
          type: "piecewise",
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 1,
              lt: 3,
              color: "rgba(0, 180, 0, 0.5)",
            },
            {
              gt: 5,
              lt: 7,
              color: "rgba(0, 180, 0, 0.5)",
            },
          ],
        },
        series: [
          {
            type: "line",
            smooth: 0.6,
            symbol: "none",
            lineStyle: {
              color: "green",
              width: 5,
            },
            markLine: {
              symbol: ["none", "none"],
              label: { show: false },
              data: [
                { xAxis: 1 },
                { xAxis: 2 },
                { xAxis: 3 },
                { xAxis: 4 },
                { xAxis: 5 },
                { xAxis: 6 },
                { xAxis: 7 },
              ],
            },
            areaStyle: {},
            data: [
              ["10/10", 200],
              ["10/11", 400],
              ["10/12", 650],
              ["10/13", 500],
              ["10/14", 250],
              ["10/15", 300],
              ["10/16", 450],
              ["10/17", 300],
              ["10/18", 100],
            ],
          },
        ],
      },
      //饼状
      option2pie: {
        textStyle: {
          color: this.echarscolor,
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
          confine: true,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "90%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "一类" },
              { value: 310, name: "二类" },
              { value: 234, name: "三类" },
            ],
            color: [
              "rgba(255, 127, 39,1)",
              "rgba(31, 132, 239,1)",
              "rgba(14, 209, 69,1)",
            ],
            label: {
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffset: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      //单线
      option3: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          //left: "20%",
          right: "5%",
          bottom: "0%",
          width: "100%",
          top: 0,
          containLabel: true,
        },
        textStyle: {
          color: this.echarscolor,
        },
        xAxis: {
          type: "category",
          data: ["七月", "八月", "九月"],
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            name: "日常任务",
            type: "bar",
            stack: "总量",
            barWidth: "40%",
            label: {
              show: true,
              center: ["50%", "50%"],
            },
            data: [2, 2, 3],
            color: "#0ed145",
          },
          {
            name: "社区走访",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              center: ["50%", "50%"],
            },
            data: [1, 3, 1],
            color: "#1f84ef",
          },
          // {
          //   name: "联盟广告",
          //   type: "bar",
          //   stack: "总量",
          //   label: {
          //     show: true,
          //     position: "insideRight",
          //   },
          //   data: [2, 2, 1],
          //   color: "#ff6800",
          // },
        ],
      },
    };
  },
  methods: {
    //加载echars图表
    layermanageInit() {
      this.visitChart = echarts.init(this.$refs.visitChart);
      this.visitChart.setOption(this.optionColumnar);
      this.visitChart2 = echarts.init(this.$refs.visitChart2);
      this.visitChart2.setOption(this.option3);
      this.visitChart3 = echarts.init(this.$refs.visitChart3);
      this.visitChart3.setOption(this.option2pie);
      this.visitChart4 = echarts.init(this.$refs.visitChart4);
      this.visitChart4.setOption(this.option2pie);
    },
    //判断当前选中类型
    JudgmentEcharschart(val) {
      if (val[0] == "人口") {
        this.renkoutongji = true;
        this.shequshixiang = true;
        this.jianzhuleixing=false;
      } else if (val[0] == "房屋") {
        this.renkoutongji = false;
        this.shequshixiang = false;
        this.jianzhuleixing=true;
      } else if (val[0] == "设施") {
        this.renkoutongji = true;
        this.shequshixiang = false;
        this.jianzhuleixing=true;
      } else if (val[0] == "商户") {
        this.renkoutongji = false;
        this.shequshixiang = false;
        this.jianzhuleixing=true;
      }
    },
    //进度条参数更改
    progressjindu() {
      this.percent1 =
        (this.Resident_population /
          (this.Resident_population + this.floating_population)) *
        100;
      this.percent2 =
        (this.floating_population /
          (this.Resident_population + this.floating_population)) *
        100;
    },
     //获取后台信息
     Getbackgroundinformation(val){
       statisticsGridPerson2({ community: val[1] }).then((res) => {
        if (res && res.success) {
          this.cirrclenumb1 = res.data.party_member; //党员
          this.cirrclenumb2 = res.data.cadre;//干部
          this.cirrclenumb3 = res.data.Grid_people;//网格员
          this.cirrclenumb4 = res.data.volunteer;//志愿者
        } else {
          console.log("统计失败");
        }
      });
     }
  },
  mounted() {
    this.layermanageInit();
  },
  watch: {
    echarscolor(val) {
      this.layermanageInit();
    },
    echarschart(val) {
      this.Getbackgroundinformation(val);
      this.JudgmentEcharschart(val);
    },
  },
  created() {
    this.JudgmentEcharschart(this.echarschart);
    this.progressjindu();
    this.Getbackgroundinformation(this.echarschart);
  },
};
</script>
<style>
.Statistics-body {
  border-radius: 5px;
  width: 420px;
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  top: 70px;
  right: 10px;
  height: calc(100% - 100px);
  overflow-y: auto;
  overflow-x: hidden;
}
.text-class {
  position: absolute;
  transform: translateY(-150%);
  left: 50%;
}
.agine2 {
  left: -58px;
  position: absolute;
}
.title-class {
  margin-bottom: 15px;
  font-size: 16px;
  padding-top: 10px;
  padding-left: 10px;
}
.text-tile {
  transform: translateX(34px);
}
.card-static {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  width: 100%;
  padding-bottom: 10px;
}
.Statistics-body::-webkit-scrollbar {
  width: 4px;
}
.Statistics-body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.8);
}
.Statistics-body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.2);
}
/* 动画效果 */
.plus-icon-enter-active {
  /* 出现速度 */
  transition: opacity 1s;
}
.plus-icon-enter {
  opacity: 0;
}
.plus-icon-leave-active {
  /* 消失速度 */
  transition: opacity 0s;
}
.plus-icon-leave-to {
  opacity: 0;
}
</style>
