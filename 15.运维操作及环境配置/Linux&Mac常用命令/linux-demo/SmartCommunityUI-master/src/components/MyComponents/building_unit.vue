<template>
  <el-cascader ref="cascader" :props="props" clearable @change="getNodes" />
</template>

<script>
import { getHousingUnit, getHousingCode } from '@/api/building'

export default {
  name: 'BuildingUnit',
  data() {
    return {
      props: {
        lazy: true,
        async lazyLoad(node, resolve) {
          const nodes = []
          const { level, value, label } = node
          switch (level) {
            case 1:
              const housingCodeList = await getHousingCode({
                buildingId: value
              })
              housingCodeList.rows.forEach(item => {
                nodes.push({
                  label: `${item.housingNum}号`,
                  value: item.id,
                  leaf: level >= 1
                })
              })
              resolve(nodes)
              break
            default:
              if (level !== 4) {
                const housingUnitList = await getHousingUnit({
                  propertyId: sessionStorage.getItem('propertyId')
                })
                housingUnitList.rows.forEach(item => {
                  nodes.push({
                    label: item.unitName,
                    value: item.id,
                    children: []
                  })
                })
                resolve(nodes)
              }
              break
          }
        }
      }
    }
  },
  methods: {
    getNodes(val) {
      const [node] = this.$refs.cascader.getCheckedNodes()
      this.$emit('getHouseId', node ? node.value : '')
      this.$emit('getBuildingId', node ? node.parent.value : '')
    }
  }
}
</script>

<style scoped lang="less">
</style>
