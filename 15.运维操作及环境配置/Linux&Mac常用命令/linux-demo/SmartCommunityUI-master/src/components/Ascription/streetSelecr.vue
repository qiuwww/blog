<template>
  <div class="inline-block">
    <el-select  clearable v-model="streetId" @change="handlePush" :disabled="true">
      <el-option v-for="(item, i)  in streetList" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>

</template>

<script>
import { getLoadStreetDept } from '@/api/utils'

export default {
  data() {
    return {
      streetId: '',
      streetList: ''
    }
  },
  watch: {

  },
  created() {
    this.handleGetGrids()
  },
  methods: {
    async handleGetGrids() {
      const { data } = await getLoadStreetDept({})
      this.streetList = data
      this.streetId = data[0].id
    },
    handlePush() {
      this.$emit('push', this.streetId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
