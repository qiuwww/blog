<template>
  <div class="inline-block">

    <el-select  clearable v-model="communityId" @change="handlePush">
      <el-option v-for="(item, i)  in communityList" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>

</template>

<script>
import { getCommunityList } from '@/api/utils'

export default {
  props: {
    streetId: {
      required: false,
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
      communityId: '',
      communityList: []
    }
  },
  watch: {
    streetId(n, o) {
      if (n) {
        this.handleGetCommunityList()
      }
    }
  },
  created() {
    // this.handleGetCommunityList()
  },
  methods: {
    async handleGetCommunityList() {
      const { data } = await getCommunityList({
        streetId: this.streetId
      })
      this.communityList = data
    },
    handlePush() {
      this.$emit('push', this.communityId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
