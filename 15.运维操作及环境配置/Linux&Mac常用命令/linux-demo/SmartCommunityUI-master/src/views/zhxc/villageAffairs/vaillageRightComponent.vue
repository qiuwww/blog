<template>
  <div class="village_rightWrap">
    <div style="width: 85%;float: right;">
      <div class="titleName">
        <p class="name gradient-blue">{{data.right1.name}}</p>
        <p class="en">
          <span>{{data.right1.englishname}}</span>
          <span></span>
        </p>
      </div>

      <div class="content deviceInfo">
        <div class="swiper-container">
          <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">
            <div class="swiper-slide swiper-slide-active">
              <table>
                <tbody>
                <tr>
                  <td rowspan="3" class="device-img">
                    <img src="../../../assets/bigScreenImg/device-green.png">
                  </td>
                  <td>
                    <div class="label-name"></div>
                  </td>
                  <td rowspan="3" colspan="2" class="kuan-dai">
                    <div class="progress-label">{{data.right1.table.name}}</div>
                      <div class="progress" style="float:left;height:8px;width:100%;background-color:#383E60;">
                        <div class="progress-bar progress-bar-striped" :style="{width:data.right1.table.width}">
                        </div>
                    </div>
                    <div class="progress-label">{{data.right1.table.name2}}</div>
                      <div class="progress" style="float:left;height:8px;width:100%;background-color:#383E60;">
                        <div class="progress-bar progress-bar-striped" :style="{width:data.right1.table.width2}">
                        </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="label-name score">{{data.right1.table.score}}</td>
                </tr>
                <tr>
                  <td class="label-name">
                    <div class="os-name"></div>
                  </td>
                </tr>
                <tr class="device-use">
                  <td></td>
                  <td>
                    <div class="nei-cun-size"><span>{{data.right1.table.list.score1}}</span></div>
                  </td>
                  <td>
                    <div class="cpu-use"><span>{{data.right1.table.list.score2}}</span></div>
                  </td>
                  <td>
                    <div class="nei-cun-use"><span>{{data.right1.table.list.score3}}</span></div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div class="labe-value">{{data.right1.table.list.title1}}</div>
                  </td>
                  <td>
                    <div class="labe-value">{{data.right1.table.list.title2}}</div>
                  </td>
                  <td>
                    <div class="labe-value">{{data.right1.table.list.title3}}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <div class="split-line"></div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <div class="titleName" style="margin-top: 0 !important;">
        <p class="name gradient-blue">{{data.right2.name}}</p>
        <p class="en"><span>{{data.right2.englishname}}</span><span></span></p>
      </div>

      <div class="content deviceInfo">
        <div class="swiper-container">
          <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">
            <div class="swiper-slide swiper-slide-active">
              <table>
                <tbody>
                <tr>
                  <td rowspan="3" class="device-img">
                    <img src="../../../assets/bigScreenImg/device-green.png">
                  </td>
                  <td>
                    <div class="label-name"></div>
                  </td>
                  <td rowspan="3" colspan="2" class="kuan-dai">
                    <div class="progress-label">{{data.right2.table.name}}</div>
                    <div class="progress" style="float:left;height:8px;width:100%;background-color:#383E60;">
                      <div class="progress-bar progress-bar-striped" :style="{width:data.right2.table.width}">
                      </div>
                    </div>
                    <div class="progress-label">{{data.right2.table.name2}}</div>
                    <div class="progress" style="float:left;height:8px;width:100%;background-color:#383E60;">
                      <div class="progress-bar progress-bar-striped" :style="{width:data.right2.table.width}">
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="label-name score">{{data.right2.table.score}}</td>
                </tr>
                <tr>
                  <td class="label-name">
                    <div class="os-name"></div>
                  </td>
                </tr>
                <tr class="device-use">
                  <td></td>
                  <td>
                    <div class="nei-cun-size"><span>{{data.right2.table.list.score1}}</span></div>
                  </td>
                  <td>
                    <div class="cpu-use"><span>{{data.right2.table.list.score2}}</span></div>
                  </td>
                  <td>
                    <div class="nei-cun-use"><span>{{data.right2.table.list.score3}}</span></div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div class="labe-value">{{data.right2.table.list.title1}}</div>
                  </td>
                  <td>
                    <div class="labe-value">{{data.right2.table.list.title2}}</div>
                  </td>
                  <td>
                    <div class="labe-value">{{data.right2.table.list.title3}}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">
                    <div class="split-line"></div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <div class="titleName" style="margin-top: 0 !important;"><p class="name gradient-blue">统计报表</p>
        <p class="en"><span>STATISTICAL REPORT</span><span></span></p>
      </div>
      <div ref="visitChart" class="visitChart"></div>
    </div>
  </div>
</template>
<script>
    import echarts from "echarts";

    export default {
        data() {
            return {
                //data:null,
                option: {
                    tooltip: {trigger: 'axis',},
                    grid: {top: '-5%'},
                    legend: {
                        icon: 'rect',
                        itemWidth: 14, itemHeight: 5, itemGap: 10,
                        data: [],
                        left: '10px', top: '0px',
                        textStyle: {fontSize: 12, color: '#fff'}
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisLine: {lineStyle: {color: '#57617B'}}, axisLabel: {interval: 1, textStyle: {color: '#fff',}},
                            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                        }
                    ],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {lineStyle: {color: '#57617B'}},
                        axisLabel: {margin: 10, textStyle: {fontSize: 12}, textStyle: {color: '#fff'}},
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed',
                                color: ['#25CEF3']
                            }
                        }

                    }],
                    series: [
                        {
                            name: '土地报批',
                            type: 'bar',
                            barWidth: 8,
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                )
                            },
                            data: [110, 70, 65, 11, 25, 86, 43, 19, 56, 98, 13, 42]
                        },
                        {
                            name: '项目报批',
                            type: 'bar',
                            barWidth: 8,
                            barGap: 2,
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#D8AE50'},
                                        {offset: 0.5, color: '#D8AE22'},
                                        {offset: 1, color: '#E57230'}
                                    ]
                                )
                            },
                            data: [23, 54, 85, 46, 37, 75, 72, 46, 59, 42, 19, 8]
                        }
                    ]
                }
            }
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
            //this.data = this.$parent.dataarr.cwgk;// require('./新兴村.json');
        },
        methods:{
            setecharts(){
                this.option.xAxis.data=this.data.right3.echarts.xname;
                this.option.series[0].name=this.data.right3.echarts.name1;
                this.option.series[0].data=this.data.right3.echarts.data1;
                this.option.series[1].name=this.data.right3.echarts.name2;
                this.option.series[1].data=this.data.right3.echarts.data2;
                let visitChart = echarts.init(this.$refs.visitChart);
                  visitChart.setOption(this.option);            
                  window.onresize = () => {
                      return (() => {
                          visitChart.resize();
                      })();
                  };
            }
        },
        watch:{
            data(val){
               this.setecharts()
            }
        },
        mounted() {           
           this.setecharts()
        }
    }
</script>
<style lang="less">
  .village_rightWrap {
    font-family: Adobe 黑体 Std R;
    margin-top: 4vh;
    padding: 25px 10px 0 25px;
    right: 0;
    background: url(../../../assets/bigScreenImg/right-shadow.15992b4e.png) repeat-y 0;
    background-size: 100% auto;
    top: 0;
    z-index: 100;
    width: 25%;
    position: absolute;
    bottom: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    //滚动条样式
    &::-webkit-scrollbar {
      width: 0;
    }


    .swiper-container {
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      list-style: none;
      padding: 0;
      z-index: 1;
    }

    .content.deviceInfo table {
      width: 100%;
    }

    .content.deviceInfo table td {
      width: 25%;
      height: 25px;
      padding: 0px;
      margin: 0px;
    }

    .content.deviceInfo .device-img {
      text-align: center;
    }

    .content.deviceInfo .device-img img {
      width: 85%;
    }

    .content.deviceInfo .label-name.score {
      color: #E5BB2E;
      font-size: 1.4vw;
      font-weight: 600;
      text-align: center;
    }

    .content.deviceInfo .label-name {
      font-size: 0.7vw;
      width: 2.5vw;
      /*height: 2.6vh;*/
      line-height: 2.6vh;
      vertical-align: middle;
      white-space: nowrap;
      color: #fff;
    }

    .content.deviceInfo .nei-cun-size {
      height: 100%;
      background: url(../../../assets/bigScreenImg/nei_cun_size.png) no-repeat center center;
      background-size: 60px 60px;
    }

    .content.deviceInfo .cpu-use {
      height: 100%;
      background: url(../../../assets/bigScreenImg/cpu_use.png) no-repeat center center;
      background-size: 60px 60px;
    }

    .content.deviceInfo .nei-cun-use {
      height: 100%;
      background: url(../../../assets/bigScreenImg/nei_cun_use.png) no-repeat center center;
      background-size: 60px 60px;
    }

    .swiper-slide {
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      position: relative;
      -webkit-transition-property: -webkit-transform;
      transition-property: -webkit-transform;
      -o-transition-property: transform;
      transition-property: transform;
      transition-property: transform, -webkit-transform;
    }

    .content.deviceInfo .label-name .os-name {
      width: 2.5vw;
      line-height: 2.6vh;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .content.deviceInfo .device-use span {
      display: block;
      font-size: 0.9vw;
      font-weight: 500;
      color: #fff;
      line-height: 68px;
      text-align: center;
      vertical-align: middle;
    }

    .content.deviceInfo .kuan-dai .progress-label {
      float: left;
      margin-bottom: 10px;
      text-align: left;
      color: #fff;
      font-size: 0.7vw;
      width: 100%;
      height: 2.2vh;
      line-height: 4vh;
    }

    .content.deviceInfo .labe-value {
      text-align: center;
      color: #fff;
      height: 30px;
      line-height: 2.6vh;
      vertical-align: middle;
    }

    .content.deviceInfo .split-line {
      height: 2px;
      background: linear-gradient(to left, #181C41, #7187AC, #181C41);
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

    .titleName .name {
      display: inline-block;
      font-size: 1.3vw;
      font-weight: 700;
    }

    .gradient-blue {
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#02e4ff), to(#035cff));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .titleName .en {
      color: #919293;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }

    .titleName .en span {
      letter-spacing: -.5px;
      white-space: nowrap;
      font-size: 0.6vw;
      zoom: 1;
      font-weight: 400;
    }

    .titleName .en span:last-child {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAABCAYAAAA4l4ckAAAAE0lEQVQokWP8//+/GcMoGAVUAgBnXAM143UjwAAAAABJRU5ErkJggg==) 50% repeat-x;
      height: 16px;
      margin-left: 5px;
    }

    .CarTotal, .carData {
      margin-top: 20px;
      color: #FFFFFF;
    }

    .ivu-col {
      text-align: center;
    }

    .carData p {
      font-size: 1.2vw;
      height: 60px;
      text-align: left;
      vertical-align: baseline;
      padding-top: 20px;
    }

    .carData label {
      display: inline-block;
      padding-top: 15px;
    }

    .carData span {
      float: right;
    }

    .carData big {
      font-size: 3vw;
      font-weight: 400;
      margin-right: 10px;
    }

    .carData .line {
      margin-top: 20px;
      height: 1px;
      background: hsla(0, 0%, 100%, .3);
      position: relative;
    }

    .visitChart {
      margin-top: 20px;
      width: 100%;
      height: 25rem;
    }
  }
</style>
