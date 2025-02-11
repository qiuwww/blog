<template>
<div class="statisticsPage">
  <div class="scrollsidebar" id="scrollsidebar">
    <div class="side_content">
      <div class="side_list">
        <div class="side_title"><a title="隐藏" class="close_btn"></a></div>
        <div class="side_center">
          <div class="other">
            <p><img src="/img/zhsqImage/qrcode.png" width="120"/></p>
          </div>
        </div>
        <div class="side_bottom"></div>
      </div>
    </div>
    <div class="show_btn"><span>APP下载</span></div>
  </div>
  <Row :gutter="16" class-name="twoRows">
    <Col :xs="24" :sm="12" :md="12" :lg="12"  :xl="6"  >
      <Card  class="colHeight">
        <p slot="title">本周数量</p>
        <p style="font-size: 1vw;">5</p>
        <div>
          <Progress style="margin-top: 8%;" stroke-color="" :percent="25" hide-info />
          <div style="font-size: 0.7vw;display: flex;font-weight: 100;">与上周相比 <p style="color: #52C41A">1.08%</p></div>
        </div>
      </Card>
    </Col>
    <Col :xs="24" :sm="12" :md="12" :lg="12"  :xl="6" >
      <Card class="colHeight">
        <p slot="title">本月数量</p>
        <p style="font-size: 1vw;">9</p>
        <Progress style="margin-top: 8%;" stroke-color="#ffbf00" :percent="40" hide-info />
        <div style="font-size: 0.7vw;display: flex;font-weight: 100;">与上月相比 <p style="color: #F5222D">1.08%</p></div>
      </Card>
    </Col>
    <Col :xs="24" :sm="12" :md="12" :lg="12"  :xl="6" >
      <Card class="colHeight">
        <p slot="title">本年数量</p>
        <p style="font-size: 1vw;">9</p>
        <Progress style="margin-top: 8%;" stroke-color="#34c9c9" :percent="60" hide-info />
        <div style="font-size: 0.7vw;display: flex;font-weight: 100;">与上年相比 <p style="color: #52C41A">1.08%</p></div>
      </Card>
    </Col>
    <Col :xs="24" :sm="12" :md="12" :lg="12"  :xl="6" >
      <Card class="colHeight">
        <p slot="title">本季度数量</p>
        <p style="font-size: 1vw;">9</p>
        <Progress style="margin-top: 8%;" stroke-color="#6ad37a" :percent="55" hide-info />
        <div style="font-size: 0.7vw;display: flex;font-weight: 100;">与上季度相比 <p style="color: #52C41A">1.08%</p></div>
      </Card>
    </Col>
  </Row>
  <Row :gutter="16" class-name="threeRows">
    <Col :xs="24" :sm="24" :md="24" :lg="24"  :xl="16" class-name="colHeight">
      <Card class="colHeight">
        <p slot="title">
          <Button style="display: contents" class="active" type="text">本月汇总</Button>
          <Button style="display: contents" type="text">季度汇总</Button>
<!--          <Button  type="text">年度汇总</Button>-->
        </p>
        <Row :gutter="16" style="height: 100%;">
          <Col span="8"  style="height: 100%">
            <div style="height: 100%;display: flex;">
              <div style="height: 100%;width: 100%;"  ref="gaugeChart"></div>
            </div>
          </Col>
          <Col span="16" style="height: 100%">
            <div style="height: 100%;width: 100%;"  ref="listChart"></div>
          </Col>
        </Row>
      </Card>
    </Col>
    <Col :xs="24" :sm="24" :md="24" :lg="24"  :xl="8" class-name="colHeight">
      <Card class="colHeight">
        <p slot="title">快捷入口</p>
        <Row style="height: 50%">
          <Col span="6" style="height: 100%;padding: 8px;">
            <div  style="height: 100%;background: #1ca3fe;border-radius: 6px;">
              <div class="kjrk" @click="changeRouter('bigData')">
                <img src="/img/zhsqImage/icon_dsjfx.png"/>
                <p>大数据分析</p>
              </div>
            </div>
          </Col>
          <Col span="6" style="height: 100%;padding: 8px;">
            <div style="height: 100%;background: #6b5af4;border-radius: 6px;">
              <div class="kjrk" @click="changeRouter('gridePeoson')">
                <img src="/img/zhsqImage/icon_wgy.png"/>
                <p>网格员管理</p>
              </div>
            </div>
          </Col>
          <Col span="6" style="height: 100%;padding: 8px;">
            <div style="height: 100%;background: #F84F78;border-radius: 6px;">
              <div class="kjrk" @click="changeRouter('eventQuery')">
                <img src="/img/zhsqImage/icon_wgsj.png"/>
                <p>网格事件</p>
              </div>
            </div>
          </Col>
          <Col span="6" style="height: 100%;padding: 8px;">
            <div style="height: 100%;background: #1CA3FE;border-radius: 6px;">
              <div class="kjrk" @click="changeRouter('dailyTasks/dailyTasks')" >
                <img src="/img/zhsqImage/icon_wgrw.png"/>
                <p>网格任务</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row style="height: 50%">
          <Col span="6" style="height: 100%;padding: 8px;">
            <div style="height: 100%;background: #26D6BF;border-radius: 6px;">
              <div class="kjrk" @click="changeRouter('orgSurvey/partyManage')">
                <img src="/img/zhsqImage/icon_dzz.png"/>
                <p>党组织</p>
              </div>
            </div>
          </Col>
          <Col span="6" style="height: 100%;padding: 8px;">
            <div style="height: 100%;background: #FFBF00;border-radius: 6px;">
              <div class="kjrk" @click="changeRouter('peopleInfo')">
                <img src="/img/zhsqImage/icon_syrk.png"/>
                <p>实有人口</p>
              </div>
            </div>
          </Col>
          <Col span="6" style="height: 100%;padding: 8px;">
            <div style="height: 100%;background: #1CA3FE;border-radius: 6px;">
              <div class="kjrk" @click="changeRouter('tConstruct')">
                <img src="/img/zhsqImage/icon_syfw.png"/>
                <p>实有房屋</p>
              </div>
            </div>
          </Col>
          <Col span="6" style="height: 100%;padding: 8px;">
            <div style="height: 100%;background: #6AD37A;border-radius: 6px;">
              <div class="kjrk" @click="changeRouter('organization')">
                <img src="/img/zhsqImage/icon_sydw.png"/>
                <p>实有单位</p>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
  <Row :gutter="16" class-name="fourRows">
    <Col span="16" class-name="colHeight">
      <Card class="colHeight">
        <p slot="title">网格事件</p>
        <Tabs :animated="false"  @on-click="tabsChange">
          <TabPane  label="今日新增" class="tab">

          </TabPane>
          <TabPane  label="网格事件"  class="tab">

          </TabPane>
        </Tabs>
            <div style="height: 100%;width: 100%;"  ref="Chart"></div>
      </Card>
    </Col>
    <Col span="8" class-name="colHeight">
      <Card class="colHeight">
        <Tabs :animated="false">
          <TabPane label="党建引领" class="tab">
            <div style="padding: 1vw;">
              <p>党员人数</p>
              <p class="number" >34769</p>
              <Progress :percent="90" :stroke-color="['#FF4900', '#FEED00']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>社区党员</p>
              <p class="number">12054</p>
              <Progress :percent="80" :stroke-color="['#FF4900', '#FEED00']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>机关工委</p>
              <p class="number">100</p>
              <Progress :percent="50" :stroke-color="['#FF4900', '#FEED00']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>党支部</p>
              <p class="number">90</p>
              <Progress :percent="40" :stroke-color="['#FF4900', '#FEED00']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>社区党支部</p>
              <p class="number">70</p>
              <Progress :percent="30" :stroke-color="['#FF4900', '#FEED00']" style="margin-bottom: 1.5vh;" hide-info/>
            </div>
          </TabPane>
          <TabPane label="一标三实"  class="tab">
            <div style="padding: 1vw;">
              <p>实有单位</p>
              <p class="number" >34769</p>
              <Progress :percent="90" :stroke-color="['#1C95FE', '#00FFF6']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>退役军人</p>
              <p class="number">12054</p>
              <Progress :percent="80" :stroke-color="['#1C95FE', '#00FFF6']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>实有人口</p>
              <p class="number">1000</p>
              <Progress :percent="50" :stroke-color="['#1C95FE', '#00FFF6']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>高龄老人</p>
              <p class="number">90</p>
              <Progress :percent="40" :stroke-color="['#1C95FE', '#00FFF6']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>实有房屋</p>
              <p class="number">705</p>
              <Progress :percent="60" :stroke-color="['#1C95FE', '#00FFF6']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>特殊人员</p>
              <p class="number">70</p>
              <Progress :percent="30" :stroke-color="['#1C95FE', '#00FFF6']" style="margin-bottom: 1.5vh;" hide-info/>
            </div>
          </TabPane>
          <TabPane label="基层网格"  class="tab">
            <div style="padding: 1vw;">
              <p>网格员</p>
              <p class="number" >34769</p>
              <Progress :percent="90" :stroke-color="['#FFE600', '#FFE38F']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>网格数量</p>
              <p class="number">12054</p>
              <Progress :percent="80" :stroke-color="['#FFE600', '#FFE38F']" style="margin-bottom: 1.5vh;" hide-info/>
              <p>城市部件</p>
              <p class="number">1000</p>
              <Progress :percent="50" :stroke-color="['#FFE600', '#FFE38F']" style="margin-bottom: 1.5vh;" hide-info/>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </Col>
  </Row>
</div>
</template>

<script>
import echarts from 'echarts'
import {eventsMap} from '@/api/events'
import {getStatisticsPage} from '@/api/events'
export default {
  name: "index",
  data() {
    return {
      Chart:null,
      listChart:null,
      gaugeChart:null,
    }
  },
  mounted() {
      this.serviceOnline().init();
      this.SetSearchChart();
      this.setGaugeChart();
      this.setListChart();
       getStatisticsPage({}).then((res) => {
        console.log(res)
      })
      let that=this
      window.onresize = function () {
        that.listChart.resize();
        that.Chart.resize();
        that.gaugeChart.resize();
      };
  },
  methods: {
    //悬浮窗
    serviceOnline() {
      var sideContent = document.querySelector(".side_content");
      var show_btn = document.querySelector(".show_btn");
      var close_btn = document.querySelector(".close_btn");
      var timer = null;

      //悬浮匀速移动
      var startMove = function(argument) {
        var scrollsidebar = document.getElementById("scrollsidebar");
        clearInterval(timer);
        timer = setInterval(function() {
          var speed = (argument - scrollsidebar.offsetTop) / 4;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          if (argument == scrollsidebar.offsetTop) {
            clearInterval(timer);
          } else {
            scrollsidebar.style.top = scrollsidebar.offsetTop + speed + "px";
          }
        }, 20);
      };

      //鼠标移动
      var scrollMove = function() {
        window.onscroll = window.onload = function() {
          var scrollsidebar = document.getElementById("scrollsidebar");
          var scrolltop =
            document.body.scrollTop || document.documentElement.scrollTop;
          startMove(
            parseInt(
              (document.documentElement.clientHeight -
                scrollsidebar.offsetHeight) /2 +scrolltop
            )
          );
        };
      };

      //悬浮显示
      var slideShow = function() {
        if (!show_btn) return false;
        show_btn.addEventListener(
          "click",
          function() {
            show_btn.style.width = 0;
            sideContent.style.width = "154px";
          },
          false
        );
      };

      //悬浮隐藏
      var slideClose = function() {
        if (!close_btn) return false;
        close_btn.addEventListener(
          "click",
          function() {
            sideContent.style.width = 0;
            show_btn.style.width = "25px";
          },
          false
        );
      };

      //返回出来的方法
      return {
        init: function() {
          scrollMove();
          slideClose();
          slideShow();
        }
      };
    },
    //路由跳转
    changeRouter(name){
      this.$router.push(name)
    },
    //事件点击切换
    tabsChange(val){
      if(val==0){
        this.SetSearchChart();
      }else if(val==1) {
        this.changeChart();
      }
    },
    //设置柱状图
    SetSearchChart () {
      this.Chart = echarts.init(this.$refs.Chart);
      this.Chart.clear()
      const option = {
        grid:{
          left:30,
          top:30,
          right:30,
          bottom:62
        },
        xAxis: {
          type: 'category',
          data: ['政策安全', '消防安全', '食品安全', '城市管理', '便民服务', '文明创建', '信息采集'],
          axisLabel: {
            textStyle: {
              color: '#9998B1',//坐标值得具体的颜色
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#9998B1',//坐标值得具体的颜色
            }
          },
          axisLine:{
            show:false //y轴线消失
          },
          axisTick: {
            show:false //y轴坐标点消失
          },
        },
        series: [
          {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                // { offset: 0, color: 'rgba(84,186,255,0.65)' },
                // { offset: 0.5, color: 'rgba(155,253,223,0.08)' },
                // { offset: 1, color: 'rgba(184,254,232,0.00)' }
                { offset: 0, color: '#2c8cf0' },
                { offset: 0.5, color: 'rgba(155,253,223,0.72)' },
                { offset: 1, color: 'rgba(184,254,232,0.47)' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2c8cf0' },
                  { offset: 0.5, color: 'rgba(155,253,223,0.72)' },
                  { offset: 1, color: 'rgba(184,254,232,0.47)' }
                ])
              }
            },
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth:30,
            showBackground: true,
          }
        ]
      };
      this.Chart.setOption(option);
    },
    //柱状图改折线图
    changeChart(){
      this.Chart = echarts.init(this.$refs.Chart);
      this.Chart.clear()
      const color = ['#0090FF', '#FFC005', '#36CE9E', '#FF515A', '#8B5CFF', '#00CA69']

      const xAxisData = ['1', '2', '3', '4', '5', '6', '7']

      const yAxisData1 = [400, 368, 350, 273, 280, 250, 278]
      const yAxisData2 = [50, 60, 90, 80, 60, 50, 70]
      const yAxisData3 = [233, 100, 182, 198, 234, 210, 230]
      const yAxisData4 = [100, 50, 20, 10, 30, 54, 12]
      const hexToRgba = (hex, opacity) => {
        let rgbaColor = ''
        const reg = /^#[\da-f]{6}$/i
        if (reg.test(hex)) {
          rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt('0x' + hex.slice(5, 7))},${opacity})`
        }
        return rgbaColor
      }
      const lineStyle = (index) => {
        return {
          normal: {
            color: color[index],
            shadowColor: hexToRgba(color[index], 0.5),
            shadowBlur: 3,
            shadowOffsetY: 8
          }
        }
      }
      const areaStyle = (index) => {
        return {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
              [{
                offset: 0,
                color: hexToRgba(color[index], 0.3)
              }, {
                offset: 1,
                color: hexToRgba(color[index], 0.1)
              }]
            ),
            shadowColor: hexToRgba(color[index], 0.1),
            shadowBlur: 10
          }
        }
      }

      const option = {
        backgroundColor: '#fff',
        color: color,
        grid:{
          left:30,
          top:30,
          right:30,
          bottom:62
        },
        legend: {
          icon: 'rect',
          itemHeight: 12,
          itemWidth: 12,
          top: 10,
          right: 10,
          textStyle: {
            fontSize: 12,
            color: '#567'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          extraCssText: 'font-size:14px;line-height:24px;color:#567;background:#fff;box-shadow:0 0 3px rgba(0, 0, 0, 0.2)',
          formatter: function(params) {
            let html = ''
            params.forEach(v => {
              html += `<div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>${v.seriesName}<span style="color:${color[v.componentIndex]};font-size:18px;font-weight:700">${v.value}</span>万`
            })
            return html
          }
        },
        xAxis: {
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#9998B1',//坐标值得具体的颜色
            }
          },
          axisLine:{
            show:false //y轴线消失
          },
          axisTick: {
            show:false //y轴坐标点消失
          },
        },
        series: [{
          name: '事件总数',
          type: 'line',
          data: yAxisData1,
          smooth: true,
          symbolSize: 6,
          lineStyle: lineStyle(0),
          areaStyle: areaStyle(0)
        }, {
          name: '已办结',
          type: 'line',
          data: yAxisData2,
          smooth: true,
          symbolSize: 6,
          lineStyle: lineStyle(1),
          areaStyle: areaStyle(1)
        }, {
          name: '未办结',
          type: 'line',
          data: yAxisData3,
          smooth: true,
          symbolSize: 6,
          lineStyle: lineStyle(2),
          areaStyle: areaStyle(2)
        }, {
          name: '超期事件',
          type: 'line',
          data: yAxisData4,
          smooth: true,
          symbolSize: 6,
          lineStyle: lineStyle(3),
          areaStyle: areaStyle(3)
        }]
      };
      this.Chart.setOption(option);
    },
    //设置仪表盘
    setGaugeChart(){
      this.gaugeChart = echarts.init(this.$refs.gaugeChart);
      this.gaugeChart.clear()
      var dataArr = [
        {
          value: 50,
          name: '排名',
        },
      ];
      var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: '#5CF9FE', // 0% 处的颜色
        },
        {
          offset: 0.17,
          color: '#468EFD', // 100% 处的颜色
        },
        {
          offset: 0.9,
          color: '#468EFD', // 100% 处的颜色
        },
        {
          offset: 1,
          color: '#5CF9FE', // 100% 处的颜色
        },
      ]);
      var colorSet = [
        [1, color],
        // [0.91, color],
        // [1, '#FFF']
      ];
      var rich = {
        white: {
          fontSize: 8,
          color: '#000',
          fontWeight: '500',
          padding: [-150, 0, 0, 0],
        },
        bule: {
          fontSize: 16,
          fontFamily: 'DINBold',
          color: '#000',
          fontWeight: '700',
          padding: [-80, 0, 0, 0],
        },
        bule2: {
          fontSize: 12,
          fontFamily: 'DINBold',
          color: '#000',
          fontWeight: '700',
          textAlign:'center',
          padding: [-140, 0, 0, 0],
        },
        radius: {
          width: 350,
          height: 80,
          // lineHeight:80,
          borderWidth: 1,
          borderColor: '#0092F2',
          fontSize: 8,
          color: '#fff',
          backgroundColor: '#1B215B',
          borderRadius: 20,
          textAlign: 'center',
        },
        size: {
          height: 400,
          padding: [100, 0, 0, 0],
        },
      };
      let option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
          {
            type: 'gauge',
            name: '外层辅助',
            radius: '100%',
            startAngle: '225',
            endAngle: '-45',
            splitNumber: '120',
            pointer: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 1,
              },
            ],
            // data: [{value: 1, name: 90}],
            title: {
              show: true,
              offsetCenter: [0, 30],
              textStyle: {
                color: '#000',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 8,
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, '#00FFFF']],
                width: 2,
                opacity: 1,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: '#051932',
                width: 0,
                type: 'solid',
              },
            },
            axisLabel: {
              show: false,
            },
          },
          {
            type: 'gauge',
            radius: '86%',
            startAngle: '225',
            endAngle: '-45',
            pointer: {
              show: true,
            },
            detail: {
              formatter: function (value) {
                var num = Math.round(value);
                return '{bule|85分}\n{bule2|当前排名:第三}';
              },
              rich: rich,
              offsetCenter: ['0%', '-70%'],
            },
            data: dataArr,
            title: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colorSet,
                width: 10,
                // shadowBlur: 15,
                // shadowColor: '#B0C4DE',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
              },
            },
            itemStyle: {
              opacity: 0,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              length: 25,
              lineStyle: {
                color: '#00377a',
                width: 2,
                type: 'solid',
              },
            },
            axisLabel: {
              show: false,
            },
            animationDuration: 4000,
          },
          {
            name: '灰色内圈', //刻度背景
            type: 'gauge',
            z: 2,
            radius: '76%',
            startAngle: '225',
            endAngle: '-45',
            //center: ["50%", "75%"], //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, '#018DFF']],
                fontSize: 8,
                width: 2,
                opacity: 1, //刻度背景宽度
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            detail: {
              show: 0,
            },
          },
          {
            name: '白色圈刻度',
            type: 'gauge',
            radius: '76%',
            startAngle: 225, //刻度起始
            endAngle: -45, //刻度结束
            min: 0,
            max: 100,
            splitNumber: 1,
            z: 4,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 4, //刻度节点线长度
              lineStyle: {
                width: 2,
                color: '#018DFF',
              }, //刻度节点线
            },
            axisLabel: {
              color: 'rgba(0,0,0,8)',
              fontSize: 8,
            }, //刻度节点文字颜色
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: '',
              },
            ],
          },
        ],
      };
      this.gaugeChart.setOption(option);
      this.getTime()
    },
    //获取时间查询条件
    getTime(){
      let myDate = new Date();
      let currMonth= myDate.getMonth(); //获取当前月份(0-11,0代表1月)
      let currYear=myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      let currQuarter = Math.floor( ( currMonth % 3 == 0 ? (currMonth / 3 ) : (currMonth / 3 + 1)));
      console.log(currQuarter,currYear);
    },
    //设置横向图表
    setListChart(){
      this.listChart = echarts.init(this.$refs.listChart);
      this.listChart.clear()
      let chart = [
        {
          name: '待办',
          value: 40 // 百分比
        },
        {
          name: '运行',
          value: 50 // 百分比
        },
        {
          name: '上报',
          value: 60 // 百分比
        },
        {
          name: '结案',
          value: 70 // 百分比
        },
      ]
      let startAngle = [90, 90, 90, 90] // 起始角度
      let centerX = [12.5, 37.5, 62.5, 87.5] // 每个圆心的x位置
      let centerY = [50, 50, 50, 50] // 每个圆心的Y位置
      let color=['#70a1f6','#32c5ff','#6ad37a','#ffbf00']
      let color2=["#dbe7fd","#d6f4ff","#d9f4dd","#ffefbf"]
      let text=["待办","已办","超期","结案"];
      let dataValue = [4, 5, 2, 5];
      let seriesAll = []
      chart.forEach((item, i) => {
        if (i < 4) {
          let pie = {
            name: '',
            type: 'pie',
            z: 10,
            radius: ['68%', '82%'],
            center: [`${centerX[i]}%`, `${centerY[i]}%`],
            startAngle: startAngle[i],
            avoidLabelOverlap: false,
            data: [{
              value: 100 - chart[i].value,
              name: chart[i].name,
              itemStyle: {
                color: "transparent"
              },
              tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
              {
                value:chart[i].value,
                name: '',
                itemStyle: {
                  color: color[i]
                },
                //'#70a1f6','#32c5ff','#6ad37a','#ffbf00'
                tooltip: {
                  show: false
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
            ]

          }
          let pie2 = {
            name: '',
            type: 'pie',
            z: 10,
            radius: ['90%', '96%'],
            center: [`${centerX[i]}%`, `${centerY[i]}%`],
            startAngle: startAngle[i],
            avoidLabelOverlap: false,
            data: [{
              value: 100,
              name: chart[i].name,
              itemStyle: {
                color: color2[i],
              },
              tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            ]
          }
          let gauge = {
            name: '',
            z: -1,
            type: 'gauge',
            radius: '0%',
            center: [`${centerX[i]}%`, `${centerY[i]}%`],
            startAngle: 0,
            endAngle: 359.9,
            splitNumber: 30,
            title: {
              show: false
            },
            // 中间的百分比
            detail: {
              formatter: [
                '{a|'+dataValue[i]+'}',
                '{b|'+text[i]+'}'
              ].join('\n'),
              //'{value}\n待办',
              offsetCenter: [0, 0],
              color: '#000',
              rich: {
                a: {
                  color: color[i],
                  fontSize: 32,
                  fontWeight:700,
                  lineHeight:48,
                },
                b: {
                  fontSize: 16,
                },
              }
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false,
              length: 1,
              lineStyle: {
                color: '#32c5ff'
              }
            },
            axisLabel: {
              show: false
            },
            data: [{
              value: chart[i].value,
              name: chart[i].name
            }]
          }
          seriesAll.push(pie2)
          seriesAll.push(pie)
          seriesAll.push(gauge)
        }
      })
        let option = {
        color: '#000',
        tooltip: {
          show:false,
        },
        title: {
          left: '0%',
          bottom: '8%',
          textStyle: {
            rich: {
              a: {
                color: '#000',
                fontSize: 12,
                padding: [0, 10, 0, 0]
              },
              b: {
                color: '#000',
                fontSize: 16,
                fontStyle: 'italic',
                fontFamily: 'DINPro-Light',
                padding: [0, 3, 0, 0]
              },
              c: {
                color: '#000',
                fontSize: 12
              },
              d: {
                color: '#000',
                fontSize: 12,
                padding: [0, 10, 0, 100]
              }
            }
          }
        },
        series: seriesAll
      }
      this.listChart.setOption(option);

    }
  }
}
</script>
<style lang="less">
.statisticsPage{
  .custom_service p img {display: inline; vertical-align:middle;}
  .scrollsidebar{position:absolute; z-index:999; bottom: 50px;right:0}
  .side_content{width:0px; height:auto; overflow:hidden; float:left; }
  .side_content .side_list {width:154px;overflow:hidden;}
  .show_btn{ width:25px; height:112px; overflow:hidden; margin-top:50px; float:left; cursor:pointer;}
  .show_btn span { display:none;}
  .close_btn{width:24px;height:24px;cursor:pointer;}
  .side_title,.side_bottom,.close_btn,.show_btn {background:url(/img/zhsqImage/sidebar_bg.png) no-repeat;}
  .side_title {height:46px;}
  .side_bottom { height:8px;}
  .side_center {font-family:Verdana, Geneva, sans-serif; padding:5px 12px; font-size:12px;}
  .close_btn { float:right; display:block; width:21px; height:16px; margin:16px 10px 0 0; _margin:16px 5px 0 0;}
  .close_btn span { display:none;}
  .side_center .custom_service p { text-align:center; padding:6px 0; margin:0; vertical-align:middle;}
  .other  { text-align:center;border-bottom:1px solid #ddd;border-top:1px solid #ddd}
  .other p { padding:5px 0; _height:16px; margin:0;color: #666666;}
  .msgserver { text-align:center; margin-bottom:5px;}
  .msgserver a { background:url(/img/zhsqImage/sidebar_bg.png) no-repeat -119px -115px; padding-left:22px;}

  /* blue skin as the default skin */
  .side_title, .side_blue .side_title {background-position:-195px 0;}
  .side_center, .side_blue .side_center {background:url(/img/zhsqImage/blue_line.png) repeat-y center;}
  .side_bottom, .side_blue .side_bottom {background-position:-195px -50px;}
  .close_btn, .side_blue .close_btn {background-position:-44px 0;}
  .close_btn:hover, .side_blue .close_btn:hover {background-position:-66px 0;}
  .show_btn , .side_blue .show_btn {background-position:-119px 0;}
  .msgserver a, .side_blue .msgserver a {color:#06C;}

  /* green skin  */
  .side_green .side_title {background-position:-349px 0;}
  .side_green .side_center {background:url(/img/zhsqImage/green_line.png) repeat-y center;}
  .side_green .side_bottom {background-position:-349px -50px;}
  .side_green .close_btn {background-position:-44px -23px;}
  .side_green .close_btn:hover {background-position:-66px -23px;}
  .side_green .show_btn {background-position:-147px 0;}
  .side_green .msgserver a {color:#76a20c;}

  height: calc(100vh - 50px);
  .ivu-tabs-bar {
    border-bottom: 0;
  }
  .ivu-tabs-ink-bar {
    height: 0;
  }
  .ivu-tabs-tab {
    color: #7286A7;
  }
  .ivu-tabs-tab-active {
    color: #314360;
    font-size: 20px;
    font-weight: 700;
  }
  .colHeight{
    height: 100%;
    display: flex;
    flex-direction: column;
    font-weight: 700;
    .active{
      color:#314360;
      font-weight: 700;
      font-size: 16px;
    }
  }
  .colHeight p{
    color:#314360;
    font-weight: 700;
  }
  .text{
    height: 5%;
  }
  .twoRows{
    padding-top: 1%;
  }
  .threeRows{
    margin-top: 1%;
    height: 27%;
  }
  .fourRows{
    margin-top: 1%;
    height: 42%;
  }
  .ivu-card-body{
    height: 100%;
  }
  .kjrk{
    text-align: center;
    padding: 0.5vw 0 0 0;
  }
  .kjrk img{
    height: 2vw;
  }
  .kjrk p{
    text-align: center;
    color: #ffffff;
  }
  .kjrk:hover{
    cursor: pointer;
  }
  .tab p{
    font-size: 0.7vw;
    color: #7286a7;
    float: left;
  }
  .tab {
    .number{
      float: right;
      color: #FE9400;
      font-weight: 700;
    }
  }
}

</style>
