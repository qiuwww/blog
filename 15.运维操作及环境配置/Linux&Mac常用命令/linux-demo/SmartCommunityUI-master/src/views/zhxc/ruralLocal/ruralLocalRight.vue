<template>
  <div class="ruralLocalRight">
    <div style="width: 85%;float: right;">
      <div class="titleName">
        <p class="name gradient-blue">{{data.right1.name}}</p>
        <p class="en">
          <span>{{data.right1.englishname}}</span>
          <span></span>
        </p>
      </div>
      <div class="park-planning">
        <div class="park-card" v-for="(item,i) in data.right1.trafficLineData" :key="i" @click="traffic(item,i)">
          <div :title=data.right1.startname class="park-btn">{{data.right1.startname}}</div>
          <div class="park-center">
            <div class="park-center-img">
              <img src="../../../assets/layerManagement/car.png">{{item.distance}}({{item.time}})
            </div>
          </div>
          <div :title="item.endName" :class="{'park-btn':true,'org':true,'center':item.center,'fly':item.fly}">{{item.endName}}</div>
        </div>
      </div>

      <div class="titleName">
        <p class="name gradient-blue">{{data.right2.name}}</p>
        <p class="en">
          <span>{{data.right2.englishname}}</span>
          <span></span>
        </p>
      </div>
      <div class="dverview">
        <h2>
          <font v-for="(item,i) in data.right2.label1" :style="{color:item.color,fontWeight:item.fontWeight}" :key="i" >{{item.text}}</font>
          <!-- <b class="name">大顺乡</b>全乡海拔在<b class="fontBlue">207米</b>至<b class="fontBlue">836米</b>之间，林地面积<b class="fontBlue">70000余亩</b>，森林覆盖率为<b class="fontBlue">50%</b>左右，辖区内有<b class="fontBlue">15座</b>小二型以上水库，
          山坪塘<b class="fontBlue">414口</b>，水面<b class="fontBlue">60000余亩</b>。有最适合城里人居住的人居环境 -->
        </h2>
        <span>&emsp;</span>
        <h2>
          <font v-for="(item,i) in data.right2.label2" :style="{color:item.color,fontWeight:item.fontWeight}" :key="i" >{{item.text}}</font>
          <!-- <b class="name">新兴村</b>属于亚热带湿润季风气候，年平均气温<b class="fontBlue">16.5℃</b>，雨量充沛，年均降水量<b class="fontBlue">1185mm</b>。年日照<b class="fontBlue">1273小时</b>，无霜期为<b class="fontBlue">300天</b>。
          水体总体为<b class="fontBlue">Ⅲ类</b>水质，境内有天宝寺水库、大湾水库等多个水库。森林覆盖率达到<b class="fontBlue">68%</b>，空气中负氧离子含量高达<b class="fontBlue">2万</b>以上。 -->
        </h2>
      </div>
      <div v-if="legend!=[]&&legend.filter(item => item.show ==true).length>0">
      <div class="titleName">
        <p class="name gradient-blue">地图图例</p>
        <p class="en">
          <span>MAP LEGEND</span>
          <span></span>
        </p>
      </div>
      <maplegend :legendarr="legend" style="min-width: 350px;margin-top: 20px;max-height: 12.5vh;"></maplegend>
      </div>
    </div>
  </div>
</template>

<script>
  import maplegend from "./../components/maplegend";
  export default {
    name: "right",
    components: {
          maplegend
        },
    data() {
      return {
          //data:null, 
          legend:this.legendarr, 
      }
    },
    props: {
        data:{
            type: Object,
            default:function(){
                return {};
              }
        },
        legendarr:{
            type: Array,
            default:function(){
                return [];
              }
        }
    },
    watch:{
        legendarr(val){
            this.legend=val
        }
    },
    created(){
        //this.data =this.$parent.dataarr.xcbd; //require('./新兴村.json');
    },
    methods:{
      //交通点击事件
      traffic(item,i){
        this.$emit('flyTo',item,i);
      },
    }
  }
</script>

<style lang="less" scoped>
  .ruralLocalRight{
    font-family: Adobe 黑体 Std R;
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
    overflow-x: hidden;
    //滚动条样式
    &::-webkit-scrollbar {
      width: 0;
    }
    .titleName, .titleName>p {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
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
      /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY8AAAACCAYAAACgw1BVAAAAQklEQVRIie3SsQ2AMBADwItEEZagZQImYKYMyGSfFSjSgHy1ZcmSW1WJiIhf23HjXDVyw/MyO/KtiIjPOXChL2vEBPqoBQdAU67mAAAAAElFTkSuQmCC) no-repeat 0 100%;*/
      background: url("../../../assets/layerManagement/line1.png") no-repeat 0 100%;
      background-size: 100% auto;
      .name {
        display: inline-block;
        font-size: 1.3vw;
        font-weight: 700;
      }
      .en {
        color: #919293;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        span {
          font-weight: lighter;
          letter-spacing: -0.5px;
          white-space: nowrap;
          font-size: 0.6vw;
          zoom: 1;
        }
        span:last-child {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAABCAYAAAA4l4ckAAAAE0lEQVQokWP8GcMoGAVUAgBnXAM143UjwAAAAABJRU5ErkJggg==) 50% repeat-x;*/
          background: url("../../../assets/layerManagement/line.png") 50% repeat-x;
          height: 8px;
          margin-left: 5px;
        }
      }
    }
    .gradient-blue {
      background-image: -webkit-gradient(linear,0 0,0 bottom,from(#02e4ff),to(#035cff));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .park-card {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
      padding: 10px 0;
      &:hover {
        background-color: rgba(207, 207, 207, 0.2);
        cursor: pointer;
      }
      .park-btn {
        text-align: center;
        padding: 5px 10px;
        border-radius: 2px;
        //height: 3.4vh;
        //min-height: 100%;
        border: 1px solid #00afff;
        float: left;
        color: #fff;
        font-size: 0.66vw;
        min-width: 65px;
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;

        font-weight: 700;
        text-shadow: 0 2px 2px #000;
        background: rgba(0,174,255,.5) url("../../../assets/layerManagement/btn-bg.png") 100%;
      }
      .center{
          border-color: #ff7e00;
          background-color: rgba(255,126,0,.5);
        }
      .org{
         max-width: 99px;
        min-width: 99px;
      }
      .fly{
        border-color: #61b03e;
        background-color:rgba(97,176,62,.5) ;
      }
      .park-center {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;

        max-width: 213px;
        min-width: 213px;
        position: relative;
        padding: 0 20px 6px;
        text-align: center;
        .park-center-img {
          position: relative;
          color: #fff;
          img {
            margin-right: 10px;
          }
        }
        .park-center-img:after {
          bottom: -6px;
          left: 0;
          content: "";
          font-size: 0.66vw;
          position: absolute;
          width: 100%;
          height: 1px;
          border-bottom: 1px dashed #fff;
        }
      }
      .park-center:before,.park-center:after {
        position: absolute;
        bottom: 2px;
        content: "";
        width: 6px;
        height: 8px;
        display: inline-block;
      }
      .park-center:before {
        left: 10px;
        width: 0;
        height: 0;
        border-top: 4px solid transparent;
        border-right: 8px solid #fff;
        border-bottom: 4px solid transparent;
      }
      .park-center:after {
        right: 10px;
        width: 0;
        height: 0;
        border-top: 4px solid transparent;
        border-left: 8px solid #fff;
        border-bottom: 4px solid transparent;
      }
    }
    .titleName{
      /*margin-top: 90px;*/
      width: 100%;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY8AAAACCAYAAACgw1BVAAAAQklEQVRIie3SsQ2AMBADwItEEZagZQImYKYMyGSfFSjSgHy1ZcmSW1WJiIhf23HjXDVyw/MyO/KtiIjPOXChL2vEBPqoBQdAU67mAAAAAElFTkSuQmCC) no-repeat 0 100%;*/
      background: url("../../../assets/layerManagement/line1.png") no-repeat 0 100%;
      background-size: 100% auto;
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
        /*width: 390px !important;*/
        span{
          font-weight: lighter;
          letter-spacing: -.5px;
          white-space: nowrap;
          font-size: 10px;
          zoom: 1;
        }
        span:last-child {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAABCAYAAAA4l4ckAAAAE0lEQVQokWP8//+/GcMoGAVUAgBnXAM143UjwAAAAABJRU5ErkJggg==) 50% repeat-x;*/
          background: url("../../../assets/layerManagement/line.png") 50% repeat-x;
          height: 8px;
          margin-left: 5px;
        }
      }
    }
    .titleName>p {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .dverview {

      padding-top: 10px;
      /*width: 100%;*/
      h2{
        text-shadow: rgba(0,0,0,.8) 1px 5px 5px;
        font-size: 0.9vw;
        line-height: 2.6vh;
        font-weight: 400;
        font-family: Adobe 黑体 Std R;
        color: #fff;
        text-indent: 1.8vw;
        text-align: justify;
      }
      .fontBlue{
        color: #00afff;
        font-weight: 900;
      }
    }
    .energy_box {
      display: inline-block;
      padding: 10px 15px;
      width: 47%;
      color: #fff;
      font-size: 16px;
      line-height: 25px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAsCAYAAABPEGliAAAAJklEQVQYlWP8//+/MQMDAwMTAxSQx2D8//8/ITUsDAwMo3bhZgAAFzMNG2Q2htIAAAAASUVORK5CYII=) no-repeat 100%;
      p,div {
        white-space: nowrap;
      }
      label{
        font-size: 32px;
        margin-right: 3px;
        line-height: 32px;
        letter-spacing: -1px;
        background-image: -webkit-gradient(linear,0 0,0 bottom,from(#09e9fe),to(#019dfe));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      span{
        margin: 0 0 0 5px;
        font-size: 12px;
      }
    }
  }
</style>
