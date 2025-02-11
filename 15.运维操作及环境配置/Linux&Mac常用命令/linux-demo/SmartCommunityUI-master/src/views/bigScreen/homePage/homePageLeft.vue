<style lang="less" scoped>
  .screenLeft {
    padding: 10px 0 10px 10px;
    height: 100%;
    width: 30%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    color: #FFFFFF;
    font-size: 12px;

    .screenTitle {
      font-size: 14px;

      span {
        margin-left: 5px;
      }
    }

    .eventProcess {
      width: 100%;
      font-size: 0;

      .eventAlready, .eventNot {
        font-size: 12px;
        border: 1px solid #FFFFFF;
        padding: 5px 8px;
        display: inline-block;
        border-radius: 4px;
        background: rgba(78, 120, 177, .3);
      }

      .eventAlready {
        width: 25%;
        margin-right: 1%;
      }

      .eventNot {
        vertical-align: top;
        width: 22%;

        .eventLine {
          line-height: 10px;
        }
      }
    }

    .basicsData {
      .fontLine {
        font-size: 30px;
        line-height: 30px;

        .fontDisplay {
          font-size: 9px;
          display: inline-block;
        }
      }
    }

    .eventFrame {
      border: 1px solid #FFFFFF;
      width: 22%;
      margin-right: 4%;
      border-radius: 5px;
      padding: 5px;
      background: rgba(78, 120, 177, .3);
    }

    .eventFrame:last-child {
      margin-right: 0;
    }

    .bigFontC {
      width: 100%;
      text-align: center;
      line-height: 30px;
      font-size: 30px;
      display: inline-block;
    }

    .rightF {
      float: right;
    }

    .modelTop {
      width: 100%;
      margin-top: 20px;
    }

    .cleanTransverse {
      overflow: auto;
    }

    .transverse {
      display: inline-block;
      float: left;

      img {
        margin: 5px 10px;
      }
    }

    .skyblueColor {
      color: skyblue;
    }

    .redColor {
      color: red;
    }

    .greenColor {
      color: green;
    }

    .bigFont {
      font-size: 20px;
      color: skyblue;
      line-height: 20px;
    }

    .miniFont {
      font-size: 8px;
    }
  }
</style>
<template>
  <div class="screenLeft">
    <!--事件处理-->
    <div class="screenTitle">
      <Icon type="md-trending-up"/>
      <span>事件处理</span>
    </div>
    <div class="eventProcess">

      <div class="eventAlready">
        <div class="cleanTransverse">
          <div class="transverse">
            <img src="" style="width: 20px;height: 20px;">
          </div>
          <div class="transverse">
            <p>今日新增事件</p>
            <span class="bigFont">234</span>
          </div>
        </div>
        <div class="cleanTransverse miniFont">
          <div class="transverse">
            <span>本周新增</span>
            <span class="skyblueColor">56</span>
          </div>
          <div class="transverse rightF">
            <span>本月新增</span>
            <span class="skyblueColor">430</span>
          </div>
        </div>
      </div>

      <div class="eventAlready">
        <div class="cleanTransverse">
          <div class="transverse">
            <img src="" style="width: 20px;height: 20px;">
          </div>
          <div class="transverse">
            <p>最近一年事件</p>
            <span class="bigFont">126.560</span>
          </div>
        </div>
        <div class="cleanTransverse miniFont">
          <div class="transverse">
            <span>累计总数</span>
            <span class="skyblueColor">172.865</span>
          </div>
          <div class="transverse rightF">
            <span>环比</span>
            <span class="redColor"><Icon type="md-arrow-dropdown"/>11%</span>
          </div>
        </div>
      </div>

      <div class="eventAlready">
        <div class="cleanTransverse">
          <div class="transverse">
            <img src="" style="width: 20px;height: 20px;">
          </div>
          <div class="transverse">
            <p>办结率</p>
            <span class="bigFont">234</span>
          </div>
        </div>
        <div class="cleanTransverse miniFont">
          <div class="transverse">
            <span>周同比</span>
            <span class="greenColor"><Icon type="md-arrow-dropup"/>12%</span>
          </div>
          <div class="transverse rightF">
            <span>日环比</span>
            <span class="redColor"><Icon type="md-arrow-dropdown"/>11%</span>
          </div>
        </div>
      </div>

      <div class="eventNot">
        <div class="cleanTransverse">
          <div class="transverse">
            <p class="eventLine">未办结事件</p>
            <span class="redColor eventLine">239</span>
            <p class="eventLine">待办结总数</p>
            <span class="skyblueColor eventLine">239</span>
          </div>
          <div class="transverse">
            <img src="" style="width: 20px;height: 20px;">
          </div>
        </div>
      </div>

    </div>

    <div class="cleanTransverse modelTop">
      <!--事件办理情况-->
      <div class="transverse" style="width: 60%">
        <div style="height: 200px;width: 100%">
          <Icon type="md-trending-up" style="position: absolute"/>
          <div ref="eventHandle" style="width: 100%;height: 100%"></div>
        </div>
      </div>

      <!--党支部数量-->
      <div class="transverse" style="width: 40%">
        <div class="screenTitle">
          <Icon type="md-trending-up"/>
          <span>党支部数量</span>
        </div>
        <span class="skyblueColor bigFontC">1,857</span>
        <div class="cleanTransverse">
          <div class="transverse">
            <span>党小组数</span>
            <span class="skyblueColor">2,563</span>
          </div>
          <div class="transverse rightF" style="float: right">
            <span>党员总数</span>
            <span class="skyblueColor">26,563</span>
          </div>
        </div>
      </div>
    </div>

    <div class="cleanTransverse modelTop">

      <!--事件类型变化趋势-->
      <div class="transverse" style="width: 49%">
        <div ref="eventType" style="width: 100%;height: 200px;"></div>
      </div>

      <!--事件处理情况(近一年)-->
      <div class="transverse" style="width: 49%">
        <div ref="eventProcess" style="width: 100%;height: 200px;"></div>
      </div>

    </div>

    <!--基础数据-->
    <div class="cleanTransverse modelTop basicsData">
      <div class="screenTitle">
        <Icon type="md-trending-up"/>
        <span>基础数据</span>
      </div>
      <div class="transverse" style="width: 70%;">

        <div class="cleanTransverse" style="width: 100%">

          <div class="transverse" style="width: 30%">
            <span>网格员总数</span>
            <div>
              <span class="skyblueColor fontLine">234</span>
              <div class="fontDisplay">
                <div>
                  <span>周同比</span>
                  <span class="greenColor"><Icon type="md-arrow-dropup"/>12%</span>
                </div>
                <div>
                  <span>日环比</span>
                  <span class="redColor"><Icon type="md-arrow-dropdown"/>11%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="transverse" style="margin-left: 5%;width: 30%">
            <span>网格总数</span>
            <div>
              <span class="skyblueColor fontLine">2,258</span>
              <div class="fontDisplay">
                <div>
                  <span>街道总数</span>
                  <span class="skyblueColor">12%</span>
                </div>
                <div>
                  <span>社区总数</span>
                  <span class="skyblueColor">11%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="transverse" style="margin-left: 5%;width: 30%">
            <span>党支部数量</span>
            <div>
              <span class="skyblueColor fontLine">1,258</span>
              <div class="fontDisplay">
                <p>党员总数</p>
                <p class="skyblueColor">26,364</p>
              </div>
            </div>
          </div>

        </div>

        <div class="cleanTransverse modelTop">
          <div class="transverse eventFrame">
            <p>实有人口总数</p>
            <p class="skyblueColor">6,560</p>
            <span>特殊人员</span>
            <span class="skyblueColor">8,430</span>
          </div>
          <div class="transverse eventFrame">
            <p>实有房屋总数</p>
            <span class="skyblueColor">6,560</span>

          </div>
          <div class="transverse eventFrame">
            <p>实有单位总数</p>
            <span class="skyblueColor">6,560</span>

          </div>
          <div class="transverse eventFrame">
            <p>城市部件总数</p>
            <span class="skyblueColor">6,560</span>

          </div>
        </div>
      </div>

      <!--事件占比-->
      <div class="transverse" style="width: 29%;height: 200px;">
        <div ref="eventProportion" style="width: 100%;height: 100px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "homePageLeft",
    data() {
      return {
        eventHandleOption: {//事件办理情况
          title: {
            text: '事件办理情况',
            left: 15,
            textStyle: {
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'normal'
            }
          },
          legend: {
            right: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: '#ffffff'
            }
          },
          grid: {
            top: 28,
            right: 0,
            bottom: 20
          },
          dataset: {
            dimensions: ['product', '已办结', '未办结'],
            source: [
              {product: '信息采集', '已办结': 530, '未办结': 1900},
              {product: '政策宣传', '已办结': 1000, '未办结': 600},
              {product: '综治平安', '已办结': 1200, '未办结': 1000},
              {product: '城市管理', '已办结': 1950, '未办结': 1650},
              {product: '环境环保', '已办结': 500, '未办结': 500},
              {product: '城市管理', '已办结': 1300, '未办结': 400},
              {product: '其他', '已办结': 500, '未办结': 650},
            ]
          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: "#fff",
              }
            },
            axisLabel: {
              fontSize: 10,
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
            {type: 'bar', barWidth: 15},
            {type: 'bar', barWidth: 15}
          ],
          color: ['#4AFAA8', '#3398DB']
        },
        eventTypeOption: {//事件类型变化趋势
          title: {
            text: '事件类型变化趋势',
            // left: 15,
            textStyle: {
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            right: 0,
            itemWidth: 20,
            textStyle: {
              color: '#ffffff'
            },
            data: ['已办结', '未办结']
          },
          grid: {
            top: 28,
            bottom: 20,
            right: 0
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2020.06', '2020.07', '2020.08', '2020.09', '2020.10', '2020.11'],
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
          series: [
            {
              name: '已办结',
              type: 'line',
              symbol: 'none',
              smooth: true,
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230]
            },
            {
              name: '未办结',
              type: 'line',
              symbol: 'none',
              smooth: true,
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330]
            },
            {
              name: '视频广告',
              type: 'line',
              symbol: 'none',
              smooth: true,
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330]
            },
            {
              name: '直接访问',
              type: 'line',
              symbol: 'none',
              smooth: true,
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330]
            },
            {
              name: '搜索引擎',
              type: 'line',
              symbol: 'none',
              smooth: true,
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330]
            }
          ]
        },
        eventProcessOption: {//事件处理情况
          title: {
            text: '事件处理情况（近一年）',
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
            data: ['信息采集', '政策宣传', '综合平安', '城市管理', '信息采集', '环境保护', '其他'],
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
              color: 'rgba(51, 152, 219, 0.8)'
            }
          }]
        },
        eventProportionOption: {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            show: false,
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      let eventHandle = echarts.init(this.$refs.eventHandle);
      eventHandle.setOption(this.eventHandleOption);
      let eventType = echarts.init(this.$refs.eventType);
      eventType.setOption(this.eventTypeOption);
      let eventProcess = echarts.init(this.$refs.eventProcess);
      eventProcess.setOption(this.eventProcessOption);
      let eventProportion = echarts.init(this.$refs.eventProportion);
      eventProportion.setOption(this.eventProportionOption);
      window.addEventListener('resize', () => {
        eventHandle.resize();//页面大小发生变化时，刷新图表
        eventType.resize();
        eventProcess.resize();
        eventProportion.resize();
      })
    }
  }
</script>
