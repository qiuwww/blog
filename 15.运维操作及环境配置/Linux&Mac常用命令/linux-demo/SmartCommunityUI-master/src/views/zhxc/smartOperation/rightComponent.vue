<template>
  <div class="rightComponent">
    <section class="rightWrap">
      <div class="box">
        

        <div v-for="(item,i) in data.left1.label" :key="i" class="b-l-box" style="margin-top: 10px;">
          <p class="textOverflow" :title=item.title>{{item.title}}</p>
          <div class="textOverflow" :title=item.subhead>
            <font v-for="(items,i) in item.label" :key="'s'+i" :style="{marginLeft:items.left}" :class=[items.class]>{{items.text}}</font>            
          </div>
        </div>
        <div class="titleName">
          <p class="name gradient-blue">{{data.left2.name}}</p>
          <p class="en">
            <span>{{data.left2.englishname}}</span>
            <span></span>
          </p>
        </div>
        <div class="areaGeneral" style="margin-top: 20px;">
          <div class="flex">
            <div>
              <span>{{data.left2.circle1.count}}</span>
              <i>{{data.left2.circle1.unit}}</i>
            </div>
            <label :title=data.left2.circle1.name>{{data.left2.circle1.name}}</label>
          </div>
          <div class="flex">
            <div>
              <span>{{data.left2.circle2.count}}</span>
              <i>{{data.left2.circle2.unit}}</i>
            </div>
            <label :title=data.left2.circle1.name >{{data.left2.circle2.name}}</label>
          </div>
          <div class="flex">
            <div>
              <span>{{data.left2.circle3.count}}</span>
              <i>{{data.left2.circle3.unit}}</i>
            </div>
            <label :title=data.left2.circle3.name>{{data.left2.circle3.name}}</label>
          </div>
        </div>

        <div class="titleName">
          <p class="name gradient-blue">{{data.left3.name}}</p>
          <p class="en">
            <span data-v-8e1ccbda="">{{data.left3.englishname}}</span>
            <span data-v-8e1ccbda=""></span>
          </p>
        </div>
        <div class="te-rightBox">
          <div ref="visitChart" style="height: 200px; width: 100%;"></div>
        </div>

        <!-- <img :src="'/tempfile'+data.right2.picture" style="width: 100%;margin-top: 20px;"> -->
      </div>
    </section>

  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "leftComponent",
  data(){
    return{
      option:{
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          },
          axisLabel:{
            fontSize: 14,
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          },
          splitLine:{
            show:false //取消分割线
          }
        },
        grid: {//设置边距
          top: 20,
          bottom: 20,
          right: 0,
          left: 40
        },
        series: [{
          data: [],
          type: 'line',
          areaStyle: {
            normal:{
              color: '#8FD6FF',
              opacity: 0.4
            },
          },
          smooth: true,
          symbol: 'none',  //取消折点圆圈
          itemStyle:{
            normal:{
              color: '#0096f5'
            },
          }
        }],
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        }
      },
      visitChart:{},
      //data:null,
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
      //this.data =this.$parent.dataarr.xmzs;// require('./新兴村.json');
  },
  watch:{
      data(val){
          this.setecharts()
      }
  },
  methods:{
      setecharts(){
          this.option.xAxis.data=this.data.left3.echarts.xname;
          this.option.series[0].data=this.data.left3.echarts.data;
          this.visitChart = echarts.init(this.$refs.visitChart);
          this.visitChart.setOption(this.option);
          window.addEventListener('resize',() => {
            this.visitChart.resize();//页面大小发生变化时，刷新图表
          })
      }
  },
  mounted() {
      this.setecharts()
  }
}

</script>

<style lang="less" scoped>
.rightComponent{
  .rightWrap{
    margin-top: 4vh;
    right: 0;
    padding: 25px 10px 0 25px;
    background: url("../../../assets/layerManagement/right-shadow.png") repeat-y 0;
    background-size: 100% auto;
    top: 0;
    z-index: 100;
    width: 25%;
    position: absolute;
    bottom: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: rgba(143, 214, 255, 0.8);
    overflow-x: hidden;
    font-family: "Adobe 黑体 Std R";
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .box{
    width: 85%;
    float: right;
    text-align: left;
    h3,label{
      font-size: 1.1vw;
      font-weight: 400;
    }
    h3{
      line-height: 3vh;
    }
    p{
      margin: 0 0;
      font-size: 1.1vw;
    }
    span{
      font-size: 1.1vw;
    }
    .b-l-box {
      border-left: 5px solid #0096f5;
      padding: 10px 30px;
      margin-bottom: 20px;
      background: url("../../../assets/layerManagement/dev-blue.png");
      p{
        margin: 0 0 10px;
      }
    }
    .big{
      display: inline-block;
      font-size: 2.1vw;
      line-height: 4.1vh;
      letter-spacing: -3px;
      padding: 0 10px;
    }
    .small{
      display: inline-block;
      font-size: 0.9vw;
      text-align: right;
    }
    .textOverflow{
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
  .color-gradient{
    //font-size: 2vw;
    line-height: 3vh;
    font-weight: 400;
    background: -webkit-gradient(linear,left bottom,left top,from(#007aff),to(#00d2ff));
    background: linear-gradient(0deg,#007aff,#00d2ff);
    -webkit-background-clip: text;
    color: transparent;
  }
  .titleName,.titleName>p{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .titleName{
    padding-left: 0;
    width: 100%;
    /*height: 55px;*/
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    /*margin-top: 20px;*/
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY8AAAACCAYAAACgw1BVAAAAQklEQVRIie3SsQ2AMBADwItEEZagZQImYKYMyGSfFSjSgHy1ZcmSW1WJiIhf23HjXDVyw/MyO/KtiIjPOXChL2vEBPqoBQdAU67mAAAAAElFTkSuQmCC) no-repeat 0 100%;
    background-size: 100%;
    .name{
      display: inline-block;
      font-size: 1.3vw;
      font-weight: 700;
    }
    .en{
      color: #919293;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      span{
        font-weight: lighter;
        letter-spacing: -.5px;
        white-space: nowrap;
        font-size: .6vw;
        zoom: 1;
      }
      span:last-child {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAABCAYAAAA4l4ckAAAAE0lEQVQokWP8//+/GcMoGAVUAgBnXAM143UjwAAAAABJRU5ErkJggg==) 50% repeat-x;
        height: 15px;
        margin-left: 5px;
      }
    }
  }
  .gradient-blue {
    background-image: -webkit-gradient(linear,0 0,0 bottom,from(#02e4ff),to(#035cff));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .areaGeneral,
  .areaGeneral > .flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .areaGeneral > .flex {
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
    label {
      font-size: .9vw;
      padding: 6px 0;
      white-space:nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    div {
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
      /*height: 85px;*/
      height: 4.7vw;
      width: 72%;
      background: url("../../../assets/layerManagement/circulor.png") 50% no-repeat;
      background-size: 100% auto;
      span {
        font-size: 1.7vw;
        line-height: 4.1vh;
        display: inline-block;
        margin-top: 0.5vw;
      }
      i {
        font-style: normal;
        font-weight: 400;
        font-size: .7vw;
        margin-top: 3px;
      }
    }
  }

}
</style>
