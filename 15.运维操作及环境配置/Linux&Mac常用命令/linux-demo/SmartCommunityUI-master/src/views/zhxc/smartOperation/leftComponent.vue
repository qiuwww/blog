<template>
  <div class="leftComponent">
    <section class="leftWrap">
      <div class="box">
        <div class="titleName">
          <p class="name gradient-blue">{{data.right1.name}}</p>
          <p class="en">
            <span>{{data.right1.englishname}}</span>
            <span></span>
          </p>
        </div>
        <div ref="right" class="contentInfo-right">
          <ul>
            <li class="info-item" v-for="(item,i) in data.right1.label" :key="'a'+i">
              <div class="info-bg" style="background: rgb(19,230,154);"></div>
              <div class="info-text" style="background: rgba(19,230,154,0.1);" :title=item.name>{{item.name}}</div>
            </li>
            <!-- <li class="info-item">
              <div class="info-bg" style="background: rgb(19,230,154);"></div>
              <div class="info-text" style="background: rgba(19,230,154,0.1);" title="太极集团有限公司">太极集团有限公司</div>
            </li> -->
          </ul>
        </div>

        <div class="titleName" style="margin-top: 15px;">
          <p class="name gradient-blue">{{data.right2.name}}</p>
          <p class="en">
            <span>{{data.right2.englishname}}</span>
            <span></span>
          </p>
        </div>
        <table class="my-table">
          <thead class="table-title">
          <tr>
            <th>{{data.right2.table.name1}}</th>
            <th>{{data.right2.table.name2}}</th>
            <th>{{data.right2.table.name3}}</th>
          </tr>
          </thead>
          <tbody class="table-content">
          <tr v-for="(item,i) in data.right2.projects" :key="i" @click="tableClick(item,i)">
            <td class="green" :title="item.name">{{item.name}}</td>
            <td class="textOverflow" :title="item.amount">{{item.amount}}</td>
            <td class="textOverflow" :title="item.time">{{item.time}}</td>
          </tr>
          </tbody>
        </table>

      </div>
    </section>
  </div>
</template>

<script>
export default {
    name: "rightComponent",
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
       // this.data =this.$parent.dataarr.xmzs; //require('./新兴村.json');
    },
    methods: {
      //项目点击事件
      tableClick(item,i){
        this.$emit('flyTo',item,i);
      }
    }
  }
</script>


<style lang="less" scoped>
.leftComponent{
  .leftWrap{
    margin-top: 4vh;
    left: 0;
    padding: 25px 25px 0 10px;
    background: url("../../../assets/layerManagement/left-shadow.png") repeat-y 100%;
    background-size: 100% auto;
    top: 0;
    z-index: 100;
    width: 25%;
    position: absolute;
    bottom: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-x: hidden;
    font-family: "Adobe 黑体 Std R";
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .box{
    color: #fff;
    width: 85%;
    /*margin-top: 30px;*/
    font-size: .9vw;
    text-align: left;
    float: left;
    
  }
  
.titleName,.titleName>p{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .titleName {
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
    /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY8AAAACCAYAAACgw1BVAAAAQklEQVRIie3SsQ2AMBADwItEEZagZQImYKYMyGSfFSjSgHy1ZcmSW1WJiIhf23HjXDVyw/MyO/KtiIjPOXChL2vEBPqoBQdAU67mAAAAAElFTkSuQmCC) no-repeat 0 100%;*/
    background: url('../../../assets/layerManagement/line1.png') no-repeat 0 100%;
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
        /*background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAABCAYAAAA4l4ckAAAAE0lEQVQokWP8//+/GcMoGAVUAgBnXAM143UjwAAAAABJRU5ErkJggg==) 50% repeat-x;*/
        background: url('../../../assets/layerManagement/line.png') 50% repeat-x;
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
  .te-rightBox {
    height: 220px;
    width: 100%;
  }
  .m-t-15 {
    margin-top: 15px;
  }
  .echarts-height{
    height: 240px;
  }
  .yqss {
    color: #fff;
    padding-top: 30px;
    li{
      list-style: none;
      border-bottom: 1px solid hsla(0,0%,100%,.24);
      padding: 15px 0;
    }
    .yqss li:after {
      content: "";
      display: block;
      clear: both;
    }
    img,span{
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .contentInfo-right {
    max-height: 190px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 10px;
    &::-webkit-scrollbar {
      width: 0;
    }
    .info-item {
      display: flex;
      height: 3.8vh;
      line-height: 3.8vh;
      margin-top: 10px;
      .info-bg {
        width: 4px;
        background: rgba(22, 230, 154, 1);
      }
      .info-text {
        padding: 0 14px;
        background: rgba(22, 230, 154, .3);
        color: #fff;
        font-size: .9vw;
        /*line-height: 35px;*/
        text-shadow: 1px 1px black;
        user-select: none;
        width: 100%;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
    }
  }
  .my-table{
    text-align: center;
    width: 100%;
    table-layout:fixed;
    margin-top: 15px;
    .table-title{
      background: rgba(0,85,189,.53);
      color: #fff;
      line-height: 4.8vh;
      font-size: .9vw;
      display: table;
      width: 100%;
      table-layout: fixed;
      th{
        text-align: center;
      }
    }
    .table-content{
      line-height: 3.8vh;
      display: block;
      max-height: 200px;
      font-size: .9vw;
      overflow-y: scroll;
      .green{
        color: #00bb4f;
        word-break:keep-all;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .textOverflow{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      tr{
        border-bottom: 1px solid hsla(0,0%,100%,.24);
        display: table;
        width: 100%;
        table-layout: fixed;
        &:hover{
          background-color: rgba(207, 207, 207, 0.2);
          cursor: pointer;
        }
      }
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }

}
</style>
