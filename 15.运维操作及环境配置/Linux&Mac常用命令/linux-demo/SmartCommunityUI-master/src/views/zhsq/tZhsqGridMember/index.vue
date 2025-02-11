
<style lang="less">
  .grid-member{
    .ivu-input-group{
      width: 260px;
    }
  }
</style>

<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <div class="grid-member">
    <Tabs  value="name1" @on-click="clickTabs" style="margin-top: 5px;">
      <TabPane label="网格长管理" icon="md-person" name="name1">
        <tZhsqGridMemberList  v-if="permitIds.includes('archive_staff_renyuan')"   :tabPaneTitle="title"></tZhsqGridMemberList>
      </TabPane>
      <TabPane  label="网格员管理" icon="ios-people" name="name2"  >
        <tZhsqGridMemberList v-if="permitIds.includes('archive_staff_renyuan')"  :tabPaneTitle="title1"></tZhsqGridMemberList>
      </TabPane>
      <TabPane  label="网格队伍管理" icon="ios-list-box-outline" name="name3"  >
        <gridMemberCensusList v-if="permitIds.includes('archive_staff_renyuan')" :tabPaneTitle="title" ></gridMemberCensusList>
      </TabPane>
    </Tabs>
  </div>

</template>
<script>
  import {mapGetters} from "vuex";

  const tZhsqGridMemberList = () => import('./tZhsqGridMemberList');
  const gridMemberCensusList = () => import('./gridMemberCensusList');
  export default {
    components: {
      tZhsqGridMemberList,
      gridMemberCensusList
    },
    computed: {
      ...mapGetters(['permitIds'])
    },
    data() {
      return{
        index:0,
        title:"网格长",
        title1:"网格员",
        title2:"网格队伍",
      }
    },
    methods:{
      //点击Tabs
      clickTabs(e){
        if(e == "name1"){
          this.title="网格长"
        }else if(e == "name2"){
          this.title="网格员"
        }else if(e == "name3"){
          this.title="网格队伍"
        }
      },
    },

  }
</script>
