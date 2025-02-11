<template>
  <div class="vaillage_leftComponent">
    <div style="width: 85%;float: left;">
      <div class="titleName">
        <p class="name gradient-blue">{{data.left1.name}}</p>
        <p class="en">
          <span>{{data.left1.englishname}}</span>
          <span></span>
        </p>
      </div>

      <div class="content base-info" id="base-info">
        <table>
          <tbody>
          <tr>
            <td rowspan="2">
              <div ref="visitChart" class="integral-echart"></div>
            </td>
            <td>
              <div class="ding-dan-bg"></div>
            </td>
            <td>
              <div class="ke-liu-bg"></div>
            </td>
            <td>
              <div class="pai-dui-ji-bg"></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="liang-shu-zhi" type="dingdanVal">{{data.left1.statistics.manpm}}</div>
            </td>
            <td>
              <div class="liang-shu-zhi" type="custNumVal">{{data.left1.statistics.womanpm}}</div>
            </td>
            <td>
              <div class="liang-shu-zhi" type="lineUpVal">{{data.left1.statistics.newpm}}</div>
            </td>
          </tr>
          <tr class="td-shu-zhi">
            <td class="popval">{{data.left1.table.title}}</td>
            <td>{{data.left1.table.name1}}</td>
            <td>{{data.left1.table.name2}}</td>
            <td>{{data.left1.table.name3}}</td>
          </tr>
          <tr v-for="(item,i) in data.left1.list">
            <td list class="label-name">{{item.name}}</td>
            <td colspan="3" class="label-value">
              <img v-for="index of item.star1"  src="../../../assets/bigScreenImg/star1.png">
              <img v-for="index of item.star2"  src="../../../assets/bigScreenImg/star2.png">
              <div class="score-val">{{item.score}}</div>
            </td>
          </tr>

          <!-- <tr>
            <td class="label-name">党员健康度：</td>
            <td colspan="3" class="label-value  device-score">
              <img v-for="index of 3" :key="'b'+index" src="../../../assets/bigScreenImg/star1.png"/>
              <div class="score-val">3分</div>
            </td>
          </tr>
          <tr>
            <td class="label-name">受理速度：</td>
            <td colspan="3" class="label-value avgtime">
              <img src="../../../assets/bigScreenImg/star1.png"/>
              <img src="../../../assets/bigScreenImg/star2.png"/>
              <div class="score-val">1.8分</div>
            </td>
          </tr> -->
          </tbody>
        </table>
      </div>


      <div class="titleName" style="margin-top: 20px;">
        <p class="name gradient-blue">{{data.left2.name}}</p>
        <p class="en">
          <span>{{data.left2.englishname}}</span>
          <span></span>
        </p>
      </div>

      <div class="content staff-info">
        <table>
          <tbody>
          <tr v-for="(item,i) in data.left2.list">
            <td v-for="(items,i) in item">
              <div class="staff-cust">
                <span>{{items.title}}</span>
                <br>
                <span class="number">{{items.score}}</span>
              </div>
            </td>
            <!-- <td>
              <div class="staff-cust">
                <span>36岁-45岁</span>
                <br>
                <span class="number">138</span></div>
            </td>
            <td>
              <div class="staff-cust">
                <span>46岁-54岁</span>
                <br>
                <span class="number">76</span></div>
            </td> -->
          </tr>
          <!-- <tr>
            <td>
              <div class="staff-cust">
                <span>55岁-59岁</span>
                <br>
                <span class="number">64</span>
              </div>
            </td>
            <td>
              <div class="staff-cust">
                <span>60岁-65岁</span>
                <br>
                <span class="number">98</span></div>
            </td>
            <td>
              <div class="staff-cust">
                <span>65岁以上</span>
                <br>
                <span class="number">121</span></div>
            </td>
          </tr> -->
          </tbody>
        </table>
      </div>

      <div class="titleName" style="margin-top: 20px;">
        <p class="name gradient-blue">{{data.left3.name}}</p>
        <p class="en">
          <span>{{data.left3.englishname}}</span>
          <span></span>
        </p>
      </div>

      <div ref="echarts_area" class="echarts_area"></div>
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
                    series: [{
                        type: 'pie', radius: ['65%', '80%'], color: '#E63F19', label: {normal: {position: 'center'}},
                        data: [{
                            value: 40,//当前值
                            name: '总数',
                            label: {normal: {formatter: '', textStyle: {fontSize: 14, color: '#FED546'}}}
                        }]
                    }]
                },
                areaOption: {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c} ({d}%)'
                    },
                    graphic: {       //图形中间图片
                        elements: [{
                            type: 'image',
                            style: {
                                image: 'img/echartsground.png',//你的图片地址
                                width: 200,
                                height: 200
                            },
                            left: 'center',//
                            top: 'center' //配置图片居中
                        },
                            {       //图形中间文字
                                type: "text",
                                left: "center",
                                top: "center",
                                style: {
                                    text: "",
                                    textAlign: "center",
                                    fill: "#fff",
                                    fontSize: 15
                                }
                            }]
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ['50%', '55%'],
                            center: ['50%', '50%'],
                            hoverOffset: 10,
                            labelLine:{
                                normal:{
                                    length:25,  // 改变标示线的长度
                                    lineStyle: {
                                        color: "#ccc"  // 改变标示线的颜色
                                    }
                                },
                            },
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: 15,
                                        color:'#fff'
                                    }
                                }
                            },
                            data: [],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
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
            //this.data =this.$parent.dataarr.cwgk;// require('./新兴村.json');
        },
        watch:{
            data(val){
                this.setecharts();
            }
        },
        methods:{
            setecharts(){
                this.areaOption.graphic.elements[1].style.text=this.data.left3.echarts.text;
                this.areaOption.series[0].data=this.data.left3.echarts.data;
                this.option.series[0].data[0].label.normal.formatter=this.data.left1.echarts.formatter;
                let visitChart = echarts.init(this.$refs.visitChart);
                visitChart.setOption(this.option);
                let echarts_area = echarts.init(this.$refs.echarts_area);
                echarts_area.setOption(this.areaOption);

                window.onresize = () => {
                    return (() => {
                        visitChart.resize();
                        echarts_area.resize();
                    })();
                };
            }
        },
        mounted() {          
            this.setecharts();
        }
    }
</script>
<style lang="less">
  .vaillage_leftComponent {
    font-family: Adobe 黑体 Std R;
    margin-top: 4vh;
    padding: 25px 25px 0 10px;
    left: 0;
    background: url("../../../assets/layerManagement/left-shadow.png") repeat-y 100%;
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


    .content {
      height: 25vh;
      min-height: 230px;
      line-height: 4vh;
      vertical-align: middle;
    }

    .content.base-info table {
      width: 98%;
    }

    .integral-echart {
      width: 100px;
      height: 100px;
      z-index: 2;
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
      font-weight: lighter;
      letter-spacing: -0.5px;
      white-space: nowrap;
      font-size: 0.6vw;
      zoom: 1;
    }

    .titleName .en p {
      width: 96px;
      height: 36px;
    }

    .titleName .en span:last-child {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAABCAYAAAA4l4ckAAAAE0lEQVQokWP8//+/GcMoGAVUAgBnXAM143UjwAAAAABJRU5ErkJggg==) 50% repeat-x;
      height: 8px;
      margin-left: 5px;
    }


    .base-info .ding-dan-bg {
      height: 60px;
      background: url(../../../assets/bigScreenImg/ding-dan.png) no-repeat center center;
      background-size: 50px 44px;
    }

    .base-info .ke-liu-bg {
      height: 60px;
      background: url(../../../assets/bigScreenImg/ke-liu.png) no-repeat center center;
      background-size: 50px 44px;
    }

    .base-info .pai-dui-ji-bg {
      height: 60px;
      background: url(../../../assets/bigScreenImg/pai-dui-ji.png) no-repeat center center;
      background-size: 33px 44px;
    }

    .base-info .liang-shu-zhi {
      height: 3vh;
      line-height: 3vh;
      vertical-align: middle;
      color: #00A8FE;
      text-align: center;
      font-size: 1.2vw;
      font-weight: 600;
    }

    .content.base-info table td {
      width: 25%;
      height: 20px;
      font-size: 0.7vw;
    }

    .content.base-info .td-shu-zhi {
      color: #fff;
      text-align: center;
      height: 20px;
    }

    .content.base-info .channel-star-level {
      font-size: 1vw;
      color: #fff;
      padding-left: 20px;
    }

    .content.base-info .label-name {
      text-align: right;
      color: #fff;
      white-space: nowrap;
      padding-left: 20px;
    }

    .content.base-info img {
      float: left;
      width: 21px;
      height: 20px;
      margin-top: 3px;
    }

    .content.base-info .score-val {
      float: left;
      padding-left: 5px;
      height: 30px;
      line-height: 30px;
      color: #fff;
    }

    .staff-info {
      height: 15vh;
      min-height: 15vh;
      line-height: 4vh;
      vertical-align: middle;
    }

    .content.staff-info table {
      width: 95%;
    }

    .content.staff-info table td {
      width: 33%;
      height: 20px;
    }

    .staff-info .staff-cust {
      margin-top: 20px;
      height: 6vh;
      line-height: 3vh;
      margin-left: 5px;
      margin-right: 5px;
      vertical-align: middle;
      text-align: center;
      color: #fff;
      background: #22284A;
      border-radius: 6px;
    }

    .echarts_area {
      width: 100%;
      height: 30vh;
      margin: 20px auto;
    }

    .staff-cust .age {
      font-size: 1vw;
    }

    .staff-cust .number {
      font-size: 1.2vw;
      color: #00A8FE;
      font-weight: 600;
    }
  }
</style>
