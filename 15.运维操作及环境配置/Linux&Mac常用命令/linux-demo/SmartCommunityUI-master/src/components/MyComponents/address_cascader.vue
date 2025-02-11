<template>
  <el-cascader
    ref="cascader"
    @change="getNodes"
    :props="props"
    clearable
  ></el-cascader>
</template>

<script>
import {
  getAllCity,
  getAllArea,
  getAllStreet,
  getAllProvince
} from "@/api/address";

export default {
  name: "Building_unit",
  data() {
    return {
      props: {
        lazy: true,
        async lazyLoad(node, resolve) {
          let nodes = [];
          const { level, value, label } = node;
          switch (level) {
            case 1:
              const cityList = await getAllCity({
                provinceCode: value
              });
              cityList.rows.forEach(item => {
                nodes.push({
                  label: item.cityName,
                  value: item.cityCode,
                  children: []
                });
              });
              resolve(nodes);
              break;
            case 2:
              const areaList = await getAllArea({
                cityCode: value
              });
              areaList.rows.forEach(item => {
                nodes.push({
                  label: item.areaName,
                  value: item.areaCode,
                  children: []
                });
              });
              resolve(nodes);
              break;
            case 3:
              const streetList = await getAllStreet({
                areaCode: value
              });
              streetList.rows.forEach(item => {
                nodes.push({
                  label: item.streetName,
                  value: item.streetCode,
                  leaf: level >= 3
                });
              });
              resolve(nodes);
              break;
            default:
              if (level !== 4) {
                const provinceList = await getAllProvince();
                provinceList.rows.forEach(item => {
                  nodes.push({
                    label: item.provinceName,
                    value: item.provinceCode,
                    children: []
                  });
                });
              }
              resolve(nodes);
              break;
          }
        }
      }
    };
  },
  methods: {
    getNodes() {
      const [street] = this.$refs.cascader.getCheckedNodes();
      let region = "";
      if (street) {
        const area = street.parent;
        const city = area.parent;
        const province = city.parent;
        region = `${province ? province.label : ""}${city.label}${area.label}${
          street.label
        }`;
      }
      this.$emit("getRegion", region);
    }
  }
};
</script>

<style scoped lang="less"></style>
