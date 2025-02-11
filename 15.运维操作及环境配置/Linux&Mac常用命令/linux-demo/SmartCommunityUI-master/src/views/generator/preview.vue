<template>
  <Tabs v-model="activeName" type="card">
    <TabPane v-for="(item, i)  in data" :key="item.name" :lazy="true" :label="item.name" :name="item.name">
      <Java :value="item.content" :height="height" />
    </TabPane>
  </Tabs>
</template>

<script>
import Java from '@/components/JavaEdit/index'
import { generator } from '@/api/generator/generator'
export default {
  name: 'Preview',
  components: { Java },
  data() {
    return {
      data: null, height: '', activeName: 'Entity'
    }
  },
  created() {
    this.height = document.documentElement.clientHeight - 180 + 'px'
    const tableName = this.$route.params.tableName
    generator(tableName, 1).then(data => {
      this.data = data
    }).catch(() => {
      this.$router.go(-1)
    })
  }
}
</script>
