<template>
  <div class="showtuli">    
      <div v-for="(person,  index) in legendarr" v-if="person.show" class="tuliborder">
        <div class="tuliclass" >
        <div :style="{background:person.color,opacity:person.opacity}" class="colourspot"></div>
        </div>
        <span :title='person.label' class="tuliname">{{person.label}}</span>
      </div>     
  </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        props: {     
          legendarr:{
              type: Array,
              default:function(){
                return [];
              }
          }
        },
    }
</script>
<style lang="less">
  .showtuli{
      &::-webkit-scrollbar {
      width: 0;
      }
      border: 1px solid #0584E7;
      overflow-y: auto;      
      padding: 2%;
    }
    .colourspot{
      height:100%;
      width: 100%;
    }
    .tuliborder{
      width: 49%;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .tuliname{
      display: inline-block;
      transform: translateY(-0.5vw);
      font-size: 0.66vw;
      line-height: 2.6vh;
      color: #fff;text-align: justify;
      font-family: Adobe 黑体 Std R;
    }
    .tuliclass{
      display: inline-block;
      padding:0.3vw 0;
      height: 1.7vw;
      width: 1.7vw;
    }
</style>
