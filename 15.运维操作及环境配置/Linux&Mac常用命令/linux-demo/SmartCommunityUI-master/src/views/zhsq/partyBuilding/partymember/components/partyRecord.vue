<template>
  <div class="partyWrap">
    <div>
      <party-table
        :border="true"
        :table-list="tableList"
        :columns="columns"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartyRecord',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      // 编辑对象
      editData: {},
      // 视图数据集合
      tableList: [],
      // 通过表单
      inoutadoptForm: {},
      // 通过弹窗状态
      dialogFormVisible: false,
      // 视图数据表头
      columns: [
        {
          prop: '',
          label: '时间',
          render: (h, parms) => {
            var _item = /\d{4}-\d{1,2}-\d{1,2}/g.exec(parms.row.time)
            return h(
              'span', {},
              [_item]
            )
          }
        },
        {
          prop: 'name',
          label: '内容'
        }
      ]
    }
  },
  mounted() {
    if (this.data.id) {
      this.tableList = []
      if (this.data.intoTime && this.data.intoTime !== '') {
        this.tableList.push({
          time: this.data.intoTime,
          name: '迁入'
        })
      }
      if (this.data.partyDate && this.data.partyDate !== '') {
        this.tableList.push({
          time: this.data.partyDate,
          name: '入党'
        })
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
