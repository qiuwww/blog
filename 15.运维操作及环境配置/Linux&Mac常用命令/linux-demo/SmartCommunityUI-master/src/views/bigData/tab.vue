<template>
  <div class="tab">
    <div :class="{ tabItem: true, isActive: tab == 1 }" @click="handleTab(1)">
      基础数据
    </div>
    <div :class="{ tabItem: true, isActive: tab == 2 }" @click="handleTab(1)">
      物联数据
    </div>
    <div :class="{ tabItem: true, isActive: tab == 3 }" @click="handleTab(1)">
      党建数据
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1
    };
  },
  computed: {},
  methods: {
    handleTab(tab) {
      this.tab = tab;
      this.$emit("tabClick", tab);
      console.log(this.tab);
    }
  }
};
</script>

<style scoped lang="scss">
.tab {
  width: 374px;
  height: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  div{
	  height: 30px !important;
  }
}
.tabItem {
  width: 120px;
  height: 30px;
  display: flex;
  margin-top: 10px;

  justify-content: center;
  align-items: center;
  line-height: 52px;
  text-shadow: 0px 0px 10px #13c2ff;
  background-image: url("../../assets/background/qian@2x.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #13c2ff;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}
.tabItem:hover {
  transition: all 0.3s;
  background: url(../../assets/background/liang@2x.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 18px;
  font-weight: regular;
  color: #fff;
}
.isActive {
  transition: all 0.3s;
  color: #00000C;
  background: url(../../assets/background/liang@2x.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
