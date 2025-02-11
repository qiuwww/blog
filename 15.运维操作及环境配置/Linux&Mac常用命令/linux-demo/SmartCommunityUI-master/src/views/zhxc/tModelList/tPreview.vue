<style lang="less" prod>
  .tPreviewForm{
    .ivu-modal-body {
      padding: 0px !important;
    }
    .tPreview{
      background-image: url("/img/priview.png");
      height: 100%; 
      background-size: 100%;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" fullscreen class="tPreviewForm">
    <div class="tPreview">
      <!--乡村本底-->
      <rural-local-left v-if="dataarr.xcbd" :data="dataarr.xcbd"></rural-local-left>
      <rural-local-right  v-if="dataarr.xcbd" :data="dataarr.xcbd" :legendarr=[]></rural-local-right>

      <!--乡村规划-->
      <developmentleft v-if="dataarr.xcgh" :data="dataarr.xcgh"></developmentleft>
      <developementRight  v-if="dataarr.xcgh" :data="dataarr.xcgh" :legendarr=[]></developementRight>
      <!--智慧运营-->
      <IntelligenceOperationsLeft  v-if="dataarr.yykf" :data="dataarr.yykf"></IntelligenceOperationsLeft>
      <IntelligenceOperationsRight v-if="dataarr.yykf" :data="dataarr.yykf"></IntelligenceOperationsRight>
      <!--项目招商-->
      <right-component  v-if="dataarr.xmzs" :data="dataarr.xmzs"></right-component>
      <left-component v-if="dataarr.xmzs" :data="dataarr.xmzs"></left-component>

      <!--村务公开-->
      <vaillageRightComponent v-if="dataarr.cwgk" :data="dataarr.cwgk"></vaillageRightComponent>
      <vaillageLeftComponent v-if="dataarr.cwgk" :data="dataarr.cwgk"></vaillageLeftComponent>
    </div>
  </Modal>
</template>
<script>
    import developementRight from "./../developmentplans/developementRight";
    import developmentleft from './../developmentplans/developmentleft.vue';
    import ruralLocalLeft from './../ruralLocal/ruralLocalLeft';
    import ruralLocalRight from './../ruralLocal/ruralLocalRight';
    import IntelligenceOperationsLeft from "./../IntelligenceOperations/IntelligenceOperationsLeft";
    import IntelligenceOperationsRight from "./../IntelligenceOperations/IntelligenceOperationsRight";
    import leftComponent from "./../smartOperation/leftComponent";
    import rightComponent from "./../smartOperation/rightComponent";
    import vaillageRightComponent from "./../villageAffairs/vaillageRightComponent";
    import vaillageLeftComponent from "./../villageAffairs/vaillageLeftComponent";
    import {getFirstMenu} from '@/api/zhxc/basicMenuInformation/basicMenuInformation'
  export default {    
    name: "preview",//预览页面
    components: {
            developementRight,
            developmentleft,
            ruralLocalLeft,
            ruralLocalRight,
            IntelligenceOperationsLeft,
            IntelligenceOperationsRight,
            leftComponent,
            rightComponent,
            vaillageRightComponent,
            vaillageLeftComponent
        },
    data() {
      return {
          dataarr:{},
          bottomMenu:[],
          menus:[],
          show: this.value,
          editTitle:"预览页面"
      }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        previewdata:{
            type: Object,
            default:function(){
              return {};
            }
        },
        menuId:{
            type: String,
            default: ""
        }
    },
    mounted(){
        getFirstMenu({roleId:31}).then(res=> {
                    if(res){
                      this.bottomMenu=res.data;
                      this.menus=res.data;
                      this.menus = this.menus.filter(item => item.id == 394);
                      this.bottomMenu = this.bottomMenu.filter(item => item.name != '内容管理' && item.name != '数据大屏' && item.name != '系统参数'&& item.name != '基础图层');
                    }                  
                })
    },
    methods: {
          cancelModal() {
              this.$emit('input', false);
          },         
    },
    watch: {
        value(val) {
            this.show = val;
        },
        show(val){
            if(!val){
              this.cancelModal();
            }else{
              this.dataarr={};
              var menuId = this.bottomMenu.filter(item => item.id == this.menuId);
              this.dataarr[menuId[0].path]=this.previewdata
            }
        }
        // previewdata(val){
        //    debugger
        //    var menuId = this.bottomMenu.filter(item => item.id == this.menuId);
        //    this.dataarr[menuId.path]=JSON.parse(this.previewdata)
        // }
    }
  }
</script>
