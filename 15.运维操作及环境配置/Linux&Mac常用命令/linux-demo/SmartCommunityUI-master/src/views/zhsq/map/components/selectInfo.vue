<template>
  <Modal class="selectModelDiv"  v-model="modalShow"  width="40"
          scrollable footer-hide  :mask="false" title="框选统计">
    <div slot="header">
      <span>框选统计</span>
      <span style="float: right;margin-right: 2vw;">
          <Icon type="md-refresh" />
          <span>刷新  </span>
          <Icon type="md-expand" />
          <span>全屏</span>
      </span>
    </div>
    <row class="text" >
      <Col style="display: grid;"  span="6" v-for="(item,i) in selectList">
        <a><img style="height: 1.2vw;" :src=item.icon />  {{ item.name }}</a>
        <span>事件总数:100</span>
        <span>未办结:87</span>
        <span>已办结:13</span>
        <span>办结率:13%</span>
      </Col>
    </row>
    <row class="text" >
      <div class="color-lump">一标三实</div>
      <Col style="display: grid;" span="6" v-for="(item,i) in oneList" >
        <a><img style="height: 1.2vw;" :src=item.icon />  {{ item.name }}</a>
        <span v-for="(items,j) in item.field">{{ items.name }}:{{items.value}}</span>
      </Col>
    </row>
    <row class="text" >
      <div class="color-lump">部件</div>
      <Col span="8" v-for="(item,i) in bjList" >
        <a><img style="height: 1.2vw;" :src=item.icon />  {{ item.name }}:{{item.value}}</a>
      </Col>
    </row>
  </Modal>
</template>

<script>
  export default {
		name: "selectModel",
    props: {
      value:{
        type:Boolean,
        default: true
      }
    },
    data() {
      return{
        modalShow:false,
        selectList:[
          {name:'城市管理',icon:require("@/assets/images/csgl.png"),value:"156",color:'#f0f0f0'},
          {name:'其它',icon:require("@/assets/images/others.png"),value:"435",color:'#f0f0f0'},
        ],
        oneList:[
          {name:'实有单位',icon:require("@/assets/images/sydw.png"),field:[{name:"单位总数",value:3981},{name:"学校机关",value:10021},{name:"政务机关",value:10021}]},
          {name:'实有人口',icon:require("@/assets/images/renkou.png"),field:[{name:"人口总数",value:85921},{name:"流动人口",value:11},{name:"户籍人口",value:21}]},
          {name:'实有房屋',icon:require("@/assets/images/juminlou.png"),field:[{name:"房屋总数",value:1021},{name:"学校机关",value:20},{name:"厂房",value:21}]},
        ],
        bjList:[
          {name:'摄像头',icon:require("@/assets/images/sxt.png"),value:"156",color:'#f0f0f0'},
          {name:'井盖',icon:require("@/assets/images/jg.png"),value:"435",color:'#f0f0f0'},
          {name:'交通信号设施',icon:require("@/assets/images/jg.png"),value:"453",color:'#f0f0f0'},
        ],
      }
    },
    created(){

    },
    mounted() {

    },
    methods:{
      //全屏
      showAll() {
        if (!screenfull.enabled) {
          this.$message({
            message: '浏览器不支持全屏',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      },
      closeModal(val) {
        this.$emit('input', val)
      },
    },
    watch: {
      value(val) {
        this.modalShow = val;
      },
      modalShow(val) {
        if(val) {

        } else {
          this.closeModal(val);
        }
      }
    }
	}
</script>

<style lang="less">
.selectModelDiv{
  .ivu-modal-header p, .ivu-modal-header-inner {
    font-size: 0.9vw;
    font-weight: 600;
  }
  .ivu-modal-body {
    max-height: 60vh;
    overflow: auto;
  }
  .text{
    text-align: left;
  }
  .text span{
    font-size: 0.7vw;
  }
  .text a{
      font-size: 0.9vw;
      line-height: 2vw;
  }
  .color-lump{
    height: 0.9vw;
    width: 100%;
    background-position: 2vw 2vw;
    background: linear-gradient(to right, #1d79ff 0%,#1d79ff 4px,white 4px,white 100%);
    text-indent: 10px;
    font-weight: 600;
    font-size: 0.9vw;
  }
  .ivu-col{
    margin: 1vh 0;
  }
  //.ivu-modal-content{
  //  width: 50% !important;
  //}
}
</style>
