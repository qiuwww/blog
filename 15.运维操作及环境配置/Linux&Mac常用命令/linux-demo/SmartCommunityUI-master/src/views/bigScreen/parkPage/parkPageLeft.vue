<style lang="less" scoped>
  .parkLeft {
    height: 100%;
    width: 25%;
    position: absolute;
    top: 0;
    left: 0;
    color: #FFFFFF;
    font-size: 14px;
    padding-top: 4.1vh;

    .parkPart {
      background: rgba(40, 40, 55, 0.6);
      padding: 4%;
      height: 100%;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 0;
      }
      .parkBox {
        display: inline-block;
        float: left;
        width: 25%;

        .boxLeft {
          padding: 5% 10%;
          border-left: 1px solid #2daeff;
          border-top: 1px solid #2daeff;
          border-bottom: 1px solid #2daeff;
          text-align: center;
          margin-bottom: 10px;

          &:first-child {
            border-bottom: 0;
          }

          &:last-child {
            border-top: 0;
          }

          p:first-child {
            color: #43D7EF
          }
        }

        .boxRight {
          padding: 5% 10%;
          border-right: 1px solid #2daeff;
          border-top: 1px solid #2daeff;
          border-bottom: 1px solid #2daeff;
          text-align: center;
          margin-bottom: 10px;

          &:first-child {
            border-bottom: 0;
          }

          &:last-child {
            border-top: 0;
          }

          p:first-child {
            color: #43D7EF;
          }
        }
      }

      .parkBoxCenter {
        display: inline-block;
        float: left;
        width: 50%;
        padding: 0 10px;

        .boxWord {
          text-align: center;
          padding: 10px 0;

          span:last-child {
            font-size: 20px;
            color: orange;
          }
        }

        img {
          width: 100%;
          height: 100px;
        }
      }

      .parkFrame{
        margin-top: 10px;
        background: rgba(78, 120, 177, .3);
        border: 1px solid #0791ae;
        .frameTop {
          display: flex;
          border-bottom: 1px solid #fff0ff;
          padding-bottom: 5px;
          margin-top: 10px;

          .frameHalf {
            width: 50%;
            display: flex;
            justify-content: center;
            font-size: 16px;

            i {
              color: #43D7EF;
            }

            span{
              margin: 0 10%;
            }

            span:last-child {
              color: #3EE26F;
              margin: 0;
            }
          }
        }

        .frameBottom {
          display: flex;
          justify-content: space-around;
          margin: 5px 0 10px 0;


          div {
            text-align: center;
          }
        }
      }

      .parkTitle {
        border-left: 3px solid #FFFFFF;
        padding-left: 10px;
        font-size: 16px;
      }
    }
  }
</style>
<template>
  <div class="parkLeft">
    <div class="parkPart">
      <div>
        <span class="parkTitle">停车</span>
        <div style="overflow: auto;margin-top: 10px;">
          <div class="parkBox">
            <div class="boxLeft">
              <p>1400</p>
              <p>停车位</p>
            </div>
            <div class="boxLeft">
              <p>1400</p>
              <p>停车位</p>
            </div>
            <div class="boxLeft">
              <p>1400</p>
              <p>停车位</p>
            </div>
          </div>

          <div class="parkBoxCenter">
            <div class="boxWord">
              <span>停车位：</span>
              <span>3.8</span>
            </div>
            <img src="../../../assets/bigScreenImg/keshihua.png">
          </div>

          <div class="parkBox">
            <div class="boxRight">
              <p>1400</p>
              <p>停车位</p>
            </div>
            <div class="boxRight">
              <p>1400</p>
              <p>停车位</p>
            </div>
            <div class="boxRight">
              <p>1400</p>
              <p>停车位</p>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 10px;">
        <span class="parkTitle">停车概述</span>
        <div class="parkFrame">
          <div class="frameTop">
            <div class="frameHalf">
              <Icon type="ios-car"/>
              <span>停车</span>
              <span>1024</span>
            </div>

            <div class="frameHalf">
              <Icon type="ios-car"/>
              <span>停车</span>
              <span>1024</span>
            </div>
          </div>

          <div class="frameBottom">
            <div>
              <p style="color: #B32EE9">25400</p>
              <p>最大周总量</p>
            </div>
            <div>
              <p style="color: #009AE4">25400</p>
              <p>最大天总量</p>
            </div>
            <div>
              <p style="color: #E5962F">25400</p>
              <p>最大时总量</p>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <span class="parkTitle">停车量</span>
        <div ref="parkCar" style="width: 100%;height: 200px;"></div>
      </div>

      <div style="margin-top: 20px;">
        <span class="parkTitle">停车趋势</span>
        <div ref="park" style="width: 100%;height: 200px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "parkPageLeft",
    data() {
      return {
        parkCarOption: {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: '5%',
            left: 0,
            right: 0,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: "#fff",
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: "#fff",
                }
              }
            }
          ],
          series: [
            {
              name: '停车位',
              type: 'bar',
              barWidth: '30%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        },
        parkOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            }
          },
          grid: {
            top: '5%',
            left: 0,
            right: 0,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              axisLine: {
                lineStyle: {
                  color: "#fff",
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: "#fff",
                }
              }
            }
          ],
          series: [
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              smooth: true,
              itemStyle: {
                normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0, color: '#167327' // 0% 处的颜色
                    }, {
                      offset: 0.5, color: '#167327' // 100% 处的颜色
                    }, {
                      offset: 1, color: '#ABADAE' // 100% 处的颜色
                    }]
                  )
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      let parkCar = echarts.init(this.$refs.parkCar);
      parkCar.setOption(this.parkCarOption);
      let park = echarts.init(this.$refs.park);
      park.setOption(this.parkOption);
      window.addEventListener('resize', () => {
        parkCar.resize();
        park.resize();
      });
    }
  }
</script>
