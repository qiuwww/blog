<template>
  <div>
    <el-cascader
      clearable
      ref="cascader"
      :props="props"
      @change="getNodes"
      v-model="buildingFloor"
    ></el-cascader>
  </div>
</template>

<script>
import { getHousingFloor } from "@/api/building";

export default {
  name: "Building_floor",
  data() {
    return {
      buildingFloor: [],
      housingCodeList: [],
      props: {
        lazy: true,
        async lazyLoad(node, resolve) {
          let nodes = [];
          const { level, value, label } = node;
          switch (level) {
            case 1:
              const { countFloor } = this.housingCodeList.find(
                item => item.id === value
              );

              let i = 0;
              while (i < countFloor) {
                i++;
                nodes.push({
                  label: `${i}楼`,
                  value: `${i}v`,
                  leaf: true
                });
              }

              resolve(nodes);
              break;
            default:
              if (level !== 4) {
                const housingUnitList = await getHousingFloor({
                  propertyId: sessionStorage.getItem("propertyId")
                });
                this.housingCodeList = housingUnitList.rows;

                housingUnitList.rows.forEach(item => {
                  nodes.push({
                    label: item.unitName,
                    value: item.id,
                    children: []
                  });
                });
                resolve(nodes);
              }
              break;
          }
        }
      }
    };
  },
  props: ["echo"],
  watch: {
    echo() {
      this.buildingFloor = this.echo ? this.echo : "";
    }
  },
  methods: {
    getNodes() {
      this.$emit("getHouseId", this.buildingFloor);
    }
  }
};
</script>

<style scoped lang="less"></style>
