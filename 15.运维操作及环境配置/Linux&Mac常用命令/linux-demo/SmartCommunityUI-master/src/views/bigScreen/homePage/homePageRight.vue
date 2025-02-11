<style lang="less" scoped>
  .screenRight {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 30%;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 10px 10px 0;
    color: #FFFFFF;
    font-size: 12px;

    .summary {
      width: 100%;
      border: 1px solid #FFFFFF;
      border-radius: 4px;
      padding: 5px;
      font-size: 12px;
      background: rgba(78, 120, 177, .3);

      .grid{
        margin-top: 10px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    .screenTitle {
      font-size: 14px;
    }

    .cleanTransverse {
      overflow: auto;
    }

    .transverse {
      display: inline-block;
      float: left;
    }

    .partyFlex{
      width: 50%;
      display: flex;
      justify-content:space-around;
    }

    .skyblueColor {
      color: skyblue;
    }

    .orangeColor {
      color: #EC8E5D;
    }

    .greenColor {
      color: #50F08A;
    }
  }
</style>
<template>
  <div class="screenRight">

    <!--网络概况-->
    <div class="screenTitle">
      <Icon type="md-trending-up"/>
      <span>网络概况</span>
    </div>
    <div class="cleanTransverse" style="width: 100%">
      <!--左部-->
      <div class="transverse" style="width: 60%;">

        <div class="summary">
          <p>江阳区大山坪街道大驿坝社区001网格</p>

          <div class="cleanTransverse grid">
            <div class="transverse cleanTransverse" style="width: 30%;margin-right: 5%;">
              <div class="transverse">
                <img src="">
              </div>
              <div class="transverse">
                <p>本月事件上报</p>
                <span class="skyblueColor">234</span>
              </div>
            </div>

            <div class="transverse cleanTransverse" style="width: 30%;margin-right: 5%;">
              <div class="transverse">
                <img src="">
              </div>
              <div class="transverse">
                <p>上报事件总数</p>
                <span class="skyblueColor">126,560</span>
              </div>
            </div>

            <div class="transverse cleanTransverse" style="width: 30%;">
              <div class="transverse">
                <img src="">
              </div>
              <div class="transverse">
                <p>部件总数</p>
                <span class="skyblueColor">16,560</span>
              </div>
            </div>
          </div>

          <div class="cleanTransverse" style="margin-top: 10px;">
            <div class="transverse cleanTransverse" style="width: 30%;margin-right: 5%;">
              <div class="transverse">
                <img src="">
              </div>
              <div class="transverse">
                <p>实有人口</p>
                <span class="skyblueColor">3,560</span>
              </div>
            </div>

            <div class="transverse cleanTransverse" style="width: 30%;margin-right: 5%;">
              <div class="transverse">
                <img src="">
              </div>
              <div class="transverse">
                <p>实有房屋</p>
                <span class="skyblueColor">1560</span>
              </div>
            </div>

            <div class="transverse cleanTransverse" style="width: 30%;">
              <div class="transverse">
                <img src="">
              </div>
              <div class="transverse">
                <p>实有单位</p>
                <span class="skyblueColor">860</span>
              </div>
            </div>
          </div>
        </div>

        <!--工作完成度-->
        <div class="screenTitle" style="margin-top: 20px;">
          <Icon type="md-trending-up"/>
          <span>工作完成度</span>
        </div>
        <div class="cleanTransverse" style="width: 100%">
          <div class="transverse cleanTransverse" style="width: 30%;">
            <div class="transverse">
              <img src="" style="width: 20px;height: 20px;">
            </div>
            <div class="transverse">
              <p class="orangeColor">事件响应速度</p>
              <span>本月所有事件响应速度</span>
            </div>
          </div>

          <div class="transverse cleanTransverse" style="width: 30%;margin-right: 5%;">
            <div class="transverse">
              <img src="" style="width: 20px;height: 20px;">
            </div>
            <div class="transverse">
              <p class="greenColor">事件办结率</p>
              <span>本月所有事件办结半分比</span>
            </div>
          </div>

          <div class="transverse cleanTransverse" style="width: 30%">
            <div class="transverse">
              <img src="" style="width: 20px;height: 20px;">
            </div>
            <div class="transverse">
              <p class="skyblueColor">网格员出勤率</p>
              <span>本月网员考情情况</span>
            </div>
          </div>
        </div>

        <!--党组信息-->
        <div class="screenTitle" style="margin-top: 20px;">
          <Icon type="md-trending-up"/>
          <span>党组信息</span>
        </div>
        <div class="cleanTransverse" style="width: 100%;">

          <div class="transverse partyFlex">
            <img src="" style="width: 20px;height: 20px;">
            <span>党员人数</span>
            <span class="skyblueColor">1,560</span>
          </div>

          <div class="transverse partyFlex">
            <img src="" style="width: 20px;height: 20px;">
            <span>党小组数</span>
            <span class="skyblueColor">860</span>
          </div>
        </div>

        <!--数据统计-->
        <div style="width: 100%;">
          <!--事件处理1-->
          <div ref="eventProcess1" style="width: 100%;height: 200px;"></div>

          <!--事件处理2-->
          <div ref="eventProcess2" style="width: 100%;height: 200px;"></div>
        </div>
      </div>

      <!--右部-->
      <div class="transverse" style="width: 40%;">
        <!--城市部件数量占比-->
        <div ref="cityPart" style="width: 100%;height: 200px;"></div>

        <!--部件维修情况-->
        <div ref="partRepair" style="width: 100%;height: 200px;"></div>

        <!--维修情况占比-->
        <div ref="repairSituation" style="width: 100%;height: 200px;margin-top: 20px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "homePageRight",
    data() {
      return {
        cityPartOption: {//城市部件数量占比
          title: {
            text: '城市部件数量占比',
            left: 15,
            textStyle: {
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'normal'
            }
          },
          grid: {
            top: 28,
            right: '5%',
            bottom: 20
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {d}%'
          },
          legend: {
            show: false,
            data: ['电话亭', '厕所', '宣传栏', '井盖', '路灯']
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '50%'],
              label: {
                show: true,
                formatter: '{b}{d}%'
              },
              labelLine: {
                show: true
              },
              data: [
                {value: 335, name: '电话亭'},
                {value: 310, name: '厕所'},
                {value: 234, name: '宣传栏'},
                {value: 135, name: '井盖'},
                {value: 1548, name: '路灯'}
              ]
            }
          ]
        },
        partRepairOption: {//部件维修情况
          title: {
            text: '部件维修情况',
            left: 15,
            textStyle: {
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'normal'
            }
          },
          grid: {
            top: 28,
            right: '5%',
            bottom: 20
          },
          xAxis: {
            type: 'category',
            data: ['05', '06', '07', '08', '09', '10', '11'],
            axisLine: {
              lineStyle: {
                color: "#fff",
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: "#fff",
              }
            }
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(20,82,119, 0.8)'
            }
          }],
          color: ['#87CEEB']
        },
        repairSituationOption: {//维修情况占比
          title: {
            text: '维修情况占比',
            left: 15,
            textStyle: {
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'normal'
            }
          },
          grid: {
            top: 40,
            right: '5%',
            bottom: 20
          },
          legend: {
            right: 0,
            top: 20,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: '#ffffff'
            }
          },
          tooltip: {},
          dataset: {
            source: [
              ['product', '全部部件', '维修部件'],
              ['05', 43.3, 85.8],
              ['06', 83.1, 73.4],
              ['07', 86.4, 65.2],
              ['08', 72.4, 53.9],
              ['09', 72.4, 53.9],
              ['10', 72.4, 53.9],
              ['11', 72.4, 53.9]
            ]
          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: "#fff",
              }
            }
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: "#fff",
              }
            }
          },
          series: [
            {type: 'bar'},
            {type: 'bar'}
          ],
          color: ['#52DCC1', '#DC6F55']
        },
        eventProcess1Option: {//事件处理1
          title: {
            text: '事件处理',
            left: 15,
            top: 30,
            textStyle: {
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['已处理', '已上报'],
            right: 0,
            top: 30,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: '#ffffff'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: "#fff",
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['事件采集', '事件上报', '特殊人员'],
            axisLine: {
              lineStyle: {
                color: "#fff",
              }
            }
          },
          series: [
            {
              name: '已处理',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [792, 437, 526]
            },
            {
              name: '已上报',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [95, 209, 740]
            }
          ],
          color: ['#4FF8B0', '#4FC1FD']
        },
        eventProcess2Option: {//事件处理2
          title: {
            text: '事件处理',
            left: 15,
            top: 15,
            textStyle: {
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'normal'
            }
          },
          grid: {
            top: 40,
            right: '5%',
            bottom: 20
          },
          xAxis: {
            type: 'category',
            data: ['道路积水', '商业噪音', '废弃车辆', '施工扰民', '店外经营', '道路积水'],
            axisLine: {
              lineStyle: {
                color: "#fff",
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: "#fff",
              }
            }
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110],
            type: 'bar',
            barWidth: 30,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }]
        }
      }
    },
    mounted() {
      let cityPart = echarts.init(this.$refs.cityPart);
      cityPart.setOption(this.cityPartOption);
      let partRepair = echarts.init(this.$refs.partRepair);
      partRepair.setOption(this.partRepairOption);
      let repairSituation = echarts.init(this.$refs.repairSituation);
      repairSituation.setOption(this.repairSituationOption);
      let eventProcess1 = echarts.init(this.$refs.eventProcess1);
      eventProcess1.setOption(this.eventProcess1Option);
      let eventProcess2 = echarts.init(this.$refs.eventProcess2);
      eventProcess2.setOption(this.eventProcess2Option);
      window.addEventListener('resize', () => {
        cityPart.resize();//页面大小发生变化时，刷新图表
        partRepair.resize();
        repairSituation.resize();
        eventProcess1.resize();
        eventProcess2.resize();
      })
    }
  }
</script>
