<template>
  <div class="development_rightWrap">
    <fieldset class="box">
      <legend class="linethrough">{{data.right1.title}}</legend>
      <ul>
        <div class="content">
          <li v-for="(item,i) in data.right1.near" :key="i" @click="contentClick(item,i)">
            <div class="li_radius"></div>
            <div class="li_content" :title="item.name">{{item.name}}</div>
          </li>
          <span v-for="(item,i) in data.right1.near2" :key="i+'a'" title="item.name">{{item.name}}</span>
          <!-- <span title="小湾休闲小广场 ">小湾休闲小广场 </span>
          <span title="新桥退休农庄健身广场 ">新桥退休农庄健身广场 </span>
          <span title="药蔬田园养生特色农家乐">药蔬田园养生特色农家乐</span>
          <span title="中药材种植项目">中药材种植项目</span>
          <span title="石油局休闲小广场 ">石油局休闲小广场 </span>
          <span title="天河琼浆药酒文化体验中心">天河琼浆药酒文化体验中心</span>
          <span title="新兴新居休闲小广场 ">新兴新居休闲小广场 </span> -->
        </div>
      </ul>

      <div class="circle">
        <div class="mini">
          近期
        </div>
      </div>
    </fieldset>

    <fieldset class="box">
      <legend class="linethrough">{{data.right2.title}}</legend>
      <ul class="content">
        <li v-for="(item,i) in data.right2.forward" :key="i" @click="contentClick(item,i)">
          <div class="li_radius"></div>
          <div class="li_content" :title="item.name">{{item.name}}</div>
        </li>       
      </ul>
      <div class="circle">
        <div class="mini">
          远期
        </div>
      </div>
    </fieldset>
    <maplegend :legendarr="legend" v-if="legendarr && legendarr.filter(item => item.show ==true).length>0" style="min-width: 350px;margin-top: 20px;max-height: 25vh;"></maplegend>
  </div> 
</template>
<script>
import { valueOf } from 'screenfull';
    import maplegend from "./../components/maplegend";

    export default {
        data() {
            return {             
              //data:null,  
              legend:[],     
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
              type:Array,
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
        components: {
            maplegend
        },
        mounted(){
            this.legend=this.legendarr;
        },
        created(){
            //this.data =this.$parent.dataarr.xcgh; //require('./乡村规划.json');//
        },
        methods:{
          contentClick(item,i){
            this.$emit('flyTo',item,i);
          }
        },
               
    }
</script>
<style lang="less">
  .development_rightWrap {
    margin-top: 4vh;
    padding: 20px 30px 0 110px;
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
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    //滚动条样式
    &::-webkit-scrollbar {
      width: 0;
    }   
    .box {
      margin-top: 20px;
      min-width: 350px;
      min-height: 20vh;
      position: relative;
      border-radius: 4px;
      border: 1px solid #3396d8;
    }
    .circle {
      position: absolute;
      top: 50%;
      left: -38px;
      z-index: 10;
      width: 80px;
      height: 80px;
      border: 1px solid #0584E7;
      border-radius: 50%;
      transform: translateY(-50%);
    }

    .mini {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 66px;
      height: 66px;
      line-height: 45px;
      border-radius: 50%;
      border: 1px solid #0584E7;
      transform: translate(-50%, -50%);
      text-align: center;
      padding-top: 8px;
      box-sizing: border-box;
      font-weight: 700;
      color: #fff;
      font-size: 0.9vw;
      /*background-image: radial-gradient(#0972B1, #0584E7);*/
      box-shadow: inset 0 0 30px 6px #0584E7;
    }

    .content {
      margin-left: 60px;
      margin-top: -2px;
      padding: 20px 20px 20px 0;
      max-height: 40vh;
      min-height: 20vh;
      overflow: hidden;
      font-family: Adobe 黑体 Std R;


      //滚动条样式
      &::-webkit-scrollbar {
        width: 0;
      }

      .no-list {
        list-style: none;
      }
    }

    .content .li_content {
      margin-left: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      font-size: 0.9vw;
      color: #04E4E4;
      font-weight: 400;
      line-height: 2.6vh;
    }

    .content li {
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      flex-direction: row;
      align-items: center;
      white-space: nowrap;
      text-align: left;
      position: relative;
      list-style: none;
      line-height: 2.6vh;
      &:hover{
        background-color: rgba(207, 207, 207, 0.2);
        cursor: pointer;
      }
    }

    .content span {
      margin-left: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      white-space: nowrap;
      font-size: 0.9vw;
      text-align: left;
      position: relative;
      list-style: none;
      color: #fff;
      flex: 1;
      font-weight: 400;
      line-height: 2.6vh;
    }

    .li_radius {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 2px solid #04E4E4;
      box-shadow: 0 0 2px #04E4E4;
    }

    .linethrough {
      padding: 0 20px;
      text-align: center;
      color: #04E4E4;
      font-size: 1vw;
      font-weight: 600;
    }

    .content::-webkit-scrollbar {
      width: 10px;
      height: 1px;
    }
  }
</style>
