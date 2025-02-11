<template>
  <el-scrollbar class="sidebar-container">
    <el-menu :collapse="isCollapse" class="el-menu-vertical" :unique-opened="true">
      <el-menu-item index="0" class="home theme" @click="handleGoHome">
        <router-link :to="{ path: '/index' }" tag="span" class="fs16 text-bold white">
          <img class="home-logo inline-block" src="@/assets/logo.png" alt="logo" />
        </router-link>
      </el-menu-item>

      <el-submenu
        :unique-opened="true"
        v-for="(layerOne, indexOne) in permitMenuList.children"
        :key="indexOne"
        :index="String(indexOne + 1)"
      >
        <template slot="title">
          <img class="logo inline-block mr10" :src="iconUrl(layerOne.meta.icon)" alt="logo" />
          <span slot="title">{{ layerOne.meta.title }}</span>
        </template>
        <span v-for="(layerTwo, indexTwo) in layerOne.children" :key="indexTwo">
          <el-menu-item-group v-if="layerTwo.meta.index">
            <router-link :to="{ name: layerTwo.name }" tag="span">
              <el-menu-item :index="layerTwo.meta.index">
                {{
                layerTwo.meta.title
                }}
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </span>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sider",
  computed: {
    permitMenuList() {
      const [permitMenuList] = this.addRoutes;
      permitMenuList.children.pop()
      return permitMenuList;
    },
    ...mapGetters(["addRoutes"])
  },
  methods: {
    iconUrl(icon) {
      return `./static/icons/${icon}`;
    },
    handleGoHome() {
      this.$router.push({ name: "index" });
    }
  },
  props: ["isCollapse"]
};
</script>

<style scoped></style>
