<template>
  <el-row class="mt10">
    <div
      class="radius  fl"
      style="position:fixed;top:130px;left:10px;overflow-y:auto;
    "
    >
      <Sidebar />
    </div>
    <div class="main">
      <!-- // 面包屑 -->
      <section class="mianbaoxie">
        <!-- // 当前路由 -->
        <i class="dangqian">
          {{ dangqian.meta.title }}
        </i>
        <span class="lujin" v-for="(item, index) in mianBao" :key="index">
          <router-link class="lujin" :to="item.path">
            {{ item.meta.title }}
          </router-link>
          <span class="lujin" v-if="index + 1 != mianBao.length">
            /
          </span>
        </span>
      </section>
      <app-main />
    </div>
    <!-- <div class="flexDiv">
      <div class="sub">
         <Sidebar style="positon:fixed;" />
      </div>
      <div class="appMain">
        <app-main />
      </div>
  </div> -->
  </el-row>
</template>

<script>
import Sidebar from "./components/Sidebar";
import AppMain from "@/components/AppMainTop";
export default {
  data() {
    return {
      mianBao: [],
      dangqian: {}
    };
  },
  components: {
    Sidebar,
    AppMain
  },
  created() {
    let mianbao = [];
    mianbao = [...this.$route.matched];
    this.dangqian = mianbao[mianbao.length - 1];
    mianbao.shift();
    this.mianBao = mianbao;
  },
  watch: {
    $route(n, o) {
      let mianbao = [];
      mianbao = [...this.$route.matched];
      this.dangqian = mianbao[mianbao.length - 1];
      mianbao.shift();
      this.mianBao = mianbao;
    },
    $router(n, o) {
    }
  }
};
</script>

<style scoped>
/*滚动条的宽度*/

.radius::-webkit-scrollbar {
  width: 0;
  height: 9px;
}

/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/

.radius ::-webkit-scrollbar-track {
  display: none;
  width: 6px;
  background-color: #0d1b20;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

/*滚动条的设置*/

.radius ::-webkit-scrollbar-thumb {
  background-color: #606d71;
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*滚动条移上去的背景*/

.radius ::-webkit-scrollbar-thumb:hover {
  background-color: #fff;
}
.mianbaoxie {
  height: 46px;
  box-sizing: border-box;
  padding-left: 25px;
}
.dangqian {
  display: inline-block;
  /* width: 100px; */
  line-height: 46px;
  font-style: normal;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  font-weight: 700;
  text-align: left;
  color: #3e3e3e;
  position: relative;
  margin-right: 15px;
}
.dangqian::before {
  content: "";
  width: 1px;
  height: 40%;
  display: block;
  position: absolute;
  top: 50%;
  right: -10px;
  border-right: #3e3e3e 2px solid;
  transform: translateY(-40%);
}
.lujin {
  font-size: 18px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: left;
  color: #a0a8b5;
}
.flexDiv {
  display: flex;
  position: relative;
}
.sub {
  flex: 3;
}
.radius {
  border-radius: 12px;
  overflow-y: auto;
  width: 220px;
  height: calc(100% - 120px);
}
.main {
  margin-left: 230px;
  overflow: hidden;
  border-radius: 12px;
  width: calc(100% - 230px);
}
</style>
