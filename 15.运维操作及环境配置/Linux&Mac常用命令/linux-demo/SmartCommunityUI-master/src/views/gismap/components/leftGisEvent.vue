<template>
  <div class="left-class-event">

    <Row :gutter="5">
      <div class="spanTitle">今日事件处理量</div>
      <Col span="8">
        <div role="presentation" class="inner_item">
          <svg-icon icon-class="right"/>
          <div class="item_right">
            <div class="main_text">12</div>
            <div class="sub_text">未开始</div>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div role="presentation" class="inner_item">
          <svg-icon icon-class="have_hand"/>
          <div class="item_right">
            <div class="main_text">8</div>
            <div class="sub_text">进行中</div>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div role="presentation" class="inner_item">
          <svg-icon icon-class="correct"/>
          <div class="item_right">
            <div class="main_text">4</div>
            <div class="sub_text">已完成</div>
          </div>
        </div>
      </Col>
    </Row>
    <Divider size="small"/>
    <Row>
      <Row>
        <div class="spanTitle">{{ city }}</div>
      </Row>
      <Row :gutter="5">
        <Col span="12">
          <div  class="eventCity">
            <div class="">事件1</div>
            <div class="">事件1</div>
          </div>

        </col>
        <Col span="12" class="eventCity">
          <div  class="eventCity">
            <div class="">事件2</div>
            <div class="">事件2</div>
          </div>

        </col>
      </Row>
    </Row>
    <Divider size="small"/>
    <Row>
      <div class="spanTitle">今日待办</div>
      <Card :bordered="false" dis-hover v-height="306">
<!--        <div slot="title">-->
<!--          <Avatar icon="md-happy" size="small" v-color="'#597ef7'" v-bg-color="'#f0f5ff'"/>-->
<!--          <span class="ivu-pl-8">今日待办</span>-->
<!--        </div>-->
        <sentiment/>
      </Card>
    </Row>
    <Divider size="small"/>
    <Row>
      <div class="spanTitle">事件处理总量</div>
      <div ref="eventLiquidFill" class="eventLiquidFill"></div>
    </Row>
  </div>
</template>
<script>
  import cardInfo from "./cardInfo.vue";
  import sentiment from './sentiment';
  import echarts from "echarts";
  import 'echarts-liquidfill/src/liquidFill.js'; //在这里引入
  export default {
    components: {
      sentiment,
      cardInfo
    },
    data() {
      return {
        icons: {
          icon1: require("@/assets/dashboard/fee.png"),
          icon2: require("@/assets/dashboard/department.png"),
          icon3: require("@/assets/dashboard/console.png"),
          icon4: require("@/assets/dashboard/user.png")
        },
        city: "智慧治理平台",
        liquidFill:null,//水球图
      }
    },

    mounted() {
      this.liquidFill = echarts.init(this.$refs.eventLiquidFill);
      this.initLiquidFill();
    },
    created() {

    },
    methods: {
      initLiquidFill(){
        let option = {
          backgroundColor: "#ffffff",
          title: [{
            text: "今日",
            left: "12%",
            top: "65%",
            textAlign: "center",
            textStyle: {
              color: "#999B9C",
              fontSize: 12,
            },
          },
            {
              text: "本月",
              left: "42%",
              top: "65%",
              textAlign: "center",
              textStyle: {
                color: "#999B9C",
                fontSize: 12,
              },
            },
            {
              text: "本年",
              left: "73%",
              top: "65%",
              textAlign: "center",
              textStyle: {
                color: "#999B9C",
                fontSize: 12,

              },
            },
          ],

          series: [{
            type: "liquidFill",

            radius: "30%",
            // 水球颜色
            color: ["#28b2b6"],
            center: ["15%", "50%"],
            label: {
              normal: {
                textStyle: {
                  color: "#28b2b6",
                  insideColor: "#28b2b6",
                  fontSize: 10,
                },
              },
            },
            backgroundStyle: {
              color: "transparent", //图表的背景颜色
              //borderWidth: '10',//图表的边框宽度
              //borderColor: '#000',//图表的边框颜色
              itemStyle: {
                shadowBlur: 20, //设置无用
                shadowColor: "#072F3A", //设置无用
                opacity: 1, //设置无用
              },
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: "#072F3A", //阴影颜色
            },
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderColor: "#28b2b6", //边框的颜色
                borderWidth: 1, //边框的宽度
                //shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                //shadowColor: '#000' //外部轮廓的阴影颜色
              },
            },
            emphasis: {
              itemStyle: {
                opacity: 1, //鼠标经过波浪颜色的透明度
              },
            },


            data: [0.6, 0.6244, 0.5804, 0.5604, 0.5514],
            amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            backgroundStyle: {
              borderWidth: 2,
              borderColor: "#28b2b6",
              color: "#000f1c", //9EBB29
            },
            direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: "linear", //初始动画
            animationEasingUpdate: "quarticInOut", //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300, //数据更新动画的时长
          },

            {
              type: "liquidFill",

              radius: "30%",
              // 水球颜色
              color: ["#198bdb"],
              center: ["45%", "50%"],
              label: {
                normal: {
                  textStyle: {
                    color: "#198bdb",
                    insideColor: "#198bdb",
                    fontSize: 10,
                  },
                },
              },
              backgroundStyle: {
                color: "transparent", //图表的背景颜色

                itemStyle: {
                  shadowBlur: 20, //设置无用
                  shadowColor: "#072F3A", //设置无用
                  opacity: 1, //设置无用
                },
              },
              itemStyle: {
                opacity: 0.5, //波浪的透明度
                shadowBlur: 10, //波浪的阴影范围
                shadowColor: "#072F3A", //阴影颜色
              },
              outline: {
                show: true, //是否显示轮廓 布尔值
                borderDistance: 0, //外部轮廓与图表的距离 数字
                itemStyle: {
                  borderColor: "#198bdb", //边框的颜色
                  borderWidth: 1, //边框的宽度

                },
              },
              emphasis: {
                itemStyle: {
                  opacity: 1, //鼠标经过波浪颜色的透明度
                },
              },

              data: [0.3, 0.3444, 0.3404, 0.3904, 0.3014],
              amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
              waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
              backgroundStyle: {
                borderWidth: 2,
                borderColor: "#198bdb",
                color: "#000f1c", //9EBB29
              },
              direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
              waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
              animationEasing: "linear", //初始动画
              animationEasingUpdate: "quarticInOut", //数据更新的动画效果
              animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
              animationDurationUpdate: 300, //数据更新动画的时长
            },

            {
              type: "liquidFill",

              radius: "30%",
              // 水球颜色
              color: ["#26d08b"],
              center: ["75%", "50%"],
              label: {
                normal: {
                  textStyle: {
                    color: "#26d08b",
                    insideColor: "#26d08b",
                    fontSize: 10,
                  },
                },
              },
              backgroundStyle: {
                color: "transparent", //图表的背景颜色

                itemStyle: {
                  shadowBlur: 20, //设置无用
                  shadowColor: "#072F3A", //设置无用
                  opacity: 1, //设置无用
                },
              },
              itemStyle: {
                opacity: 0.5, //波浪的透明度
                shadowBlur: 10, //波浪的阴影范围
                shadowColor: "#072F3A", //阴影颜色
              },
              outline: {
                show: true, //是否显示轮廓 布尔值
                borderDistance: 0, //外部轮廓与图表的距离 数字
                itemStyle: {
                  borderColor: "#26d08b", //边框的颜色
                  borderWidth: 1, //边框的宽度

                },
              },
              emphasis: {
                itemStyle: {
                  opacity: 1, //鼠标经过波浪颜色的透明度
                },
              },

              data: [0.28, 0.2544, 0.2504, 0.2804, 0.3014],
              amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
              waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
              backgroundStyle: {
                borderWidth: 2,
                borderColor: "#26d08b",
                color: "#000f1c", //9EBB29
              },
              direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
              waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
              animationEasing: "linear", //初始动画
              animationEasingUpdate: "quarticInOut", //数据更新的动画效果
              animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
              animationDurationUpdate: 300, //数据更新动画的时长
            },

          ],
        };
        this.liquidFill.setOption(option);
      }
    }
  }
</script>

<style lang="less">
  .left-class-event {
    width: 300px;
    /*height: 100%;*/
    position: absolute;
    z-index: 9;
    left: 0px;
    top: 20px;
    background-color: #f8f8f7e6;
    padding: 20px;
    height: calc(100vh - 30px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 40px;
    .spanTitle {
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #3e3e3e;
      line-height: 26px;
      margin-bottom: 10px;
    }

    .inner_item {
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: row;
      flex-direction: row;
      -webkit-align-items: flex-start;
      align-items: flex-start;
      .svg-icon {
        margin-top: 12px;
      }
      .item_right {
        margin-left: 5px;

        .main_text {
          height: 22px;
          line-height: 22px;
          width: 100%;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sub_text {
          font-size: 14px;
          color: #909090;
          font-weight: 500;
        }
      }
    }
    .eventCity{
      background: #FFFFFF;
      padding-right: 10px;
    }
    .eventLiquidFill{
      width: 100%;
      height: 200px;
    }
  }

  .left-class-event {
    overflow: hidden;
  }

  .left-class-event:hover {
    overflow-y: scroll;
  }

  .left-class-event:hover::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .left-class-event:hover::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #aaa;
  }

  .left-class-event:hover::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: #ededed;
    display: none;
  }
</style>
