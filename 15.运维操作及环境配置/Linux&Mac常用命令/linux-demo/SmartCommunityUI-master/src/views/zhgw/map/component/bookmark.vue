<template>
    <div id="bmDiv" v-show="showBm">
      <div class="closeBook">
        <p class="esri-icon-close" style="line-height: 35px;cursor:pointer" @click="closeBm"></p>
      </div>
    </div>
</template>
<script>
export default {
    props:['showBm'],
    data() {
        return {
            
        }
    },
    methods:{
        //关闭视角书签
        closeBm(){
            this.$parent.showBm = false;
        }
    },
    mounted() {
        window.closeBm = this.closeBm;
    }
}
</script>
<style lang="less" scoped>
    .closeBook{
        height:35px;
        background-color: white;
        border-bottom: 1px solid #cccccc;
        padding-left:10px
    }
</style>