<template>
  <div class="ruralLocalLeft">
    <div style="width: 85%;float: left;">
      <div class="titleName">
        <p class="name gradient-blue">{{data.left.name}}</p>
        <p class="en">
          <span>{{data.left.englishname}}</span>
          <span></span>
        </p>
      </div>
      <div class="overview">
        <!-- <img src="../../../assets/layerManagement/dashunxiang.jpeg" class="img" style="margin-top: 10px;"> -->
        <img :src="'/tempfile'+data.left.img1" class="img" style="margin-top: 10px;">
        <h2>          
           <font v-for="(item,i) in data.left.label1" :style="{color:item.color,fontWeight:item.fontWeight}" :key="i" >{{item.text}}</font>
          <!-- <b class="name">大顺乡</b>位于重庆市涪陵区西南边陲，幅员面积<b class="fontBlue">96.9平方公里</b>与青羊镇、龙潭镇、增福乡、新妙镇、南川区太平镇、乾丰乡接壤。项目区位优势突出，距重庆主城<b class="fontBlue">70公里</b>。 -->
        </h2>
        <span>&emsp;</span>        
        <img :src="'/tempfile'+data.left.img2" class="img">
        <h2>
         <font v-for="(item,i) in data.left.label2" :style="{color:item.color,fontWeight:item.fontWeight}" :key="i" >{{item.text}}</font>
        <!-- <h2><b class="name">新兴村</b>位于大顺乡中东部，天宝湖水库东侧，距乡政府<b class="fontBlue">4公里</b>，幅员面积<b class="fontBlue">8.46平方公里</b>。东与新妙镇中观村相接，南与双兴村接壤，西与柏坪村相邻，北与天宝寺村相连。</h2> -->
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "left",
        data() {
          return {
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
          // this.data = this.$parent.dataarr.xcbd;// require('./新兴村.json');
        }
    }
</script>

<style lang="less" scoped>
  .ruralLocalLeft{
    font-family: Adobe 黑体 Std R;
    margin-top: 4vh;
    position: absolute;
    bottom: 0;
    width: 25%;
    /*height: 100%;*/
    z-index: 100;
    left: 0;
    top: 0;
    background: url("../../../assets/layerManagement/left-shadow.png") repeat-y 100%;
    background-size: 100% auto;
    padding: 25px 25px 0 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-x: hidden;
    //滚动条样式
    &::-webkit-scrollbar {
      width: 0;

      .logo{
      position: absolute;
      top: 25px;
      z-index: 101;
      left: 20px;
    }
    }
    /*.subLogo {
      !*padding-left: 20px;*!
      display: inline-block;
      color: #fff;
      font-size: 30px;
      vertical-align: super;
      text-shadow: 0 1px 1px #1b4487;
    }*/
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
          font-size: 0.6vw;
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
    .gradient-blue {
      background-image: -webkit-gradient(linear,0 0,0 bottom,from(#02e4ff),to(#035cff));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .overview{
      .img{
        margin-bottom: 1vh;
        height: 200px;
        width: 100%;
        /*padding-right: 10px;*/
      }
      h2{
        text-shadow: rgba(0,0,0,.8) 1px 5px 5px;
        font-weight: 400;
        font-size: 0.9vw;
        line-height: 2.6vh;
        font-family: Adobe 黑体 Std R;
        color: #fff;
        text-align: justify;
        text-indent: 1.8vw;
      }
      
    }
    .fontBlue{
      color: #00afff;
      font-weight: 900;
    }
  }
</style>
